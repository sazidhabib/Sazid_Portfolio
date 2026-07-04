import prisma, { cleanImageUrl } from '../_db.js';
import { checkAuth } from '../_auth.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const projects = await prisma.project.findMany({
        orderBy: { sortOrder: 'asc' }
      });
      const sanitizedProjects = projects.map(proj => ({
        ...proj,
        image: cleanImageUrl(proj.image)
      }));
      return res.status(200).json(sanitizedProjects);
    }

    // Write operations require auth
    if (!checkAuth(req, res)) return;

    if (req.method === 'POST') {
      const { name, description, image, media, tags, features, sourceCodeLink, liveLink, sortOrder } = req.body;
      if (!name || !description || !tags || !features) {
        return res.status(400).json({ error: 'Missing required fields: name, description, tags, features' });
      }

      const newProject = await prisma.project.create({
        data: {
          name,
          description,
          image: image || '',
          media: media || [],
          tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
          features: Array.isArray(features) ? features : [features],
          sourceCodeLink: sourceCodeLink || '',
          liveLink: liveLink || '',
          sortOrder: sortOrder ? parseInt(sortOrder) : 0
        }
      });
      return res.status(201).json(newProject);
    }

    if (req.method === 'PUT') {
      const { id, name, description, image, media, tags, features, sourceCodeLink, liveLink, sortOrder } = req.body;
      if (!id || !name || !description || !tags || !features) {
        return res.status(400).json({ error: 'Missing required fields: id, name, description, tags, features' });
      }

      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          name,
          description,
          image: image || '',
          media: media || [],
          tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
          features: Array.isArray(features) ? features : [features],
          sourceCodeLink: sourceCodeLink || '',
          liveLink: liveLink || '',
          sortOrder: sortOrder ? parseInt(sortOrder) : 0
        }
      });
      return res.status(200).json(updatedProject);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing query param: id' });
      }

      await prisma.project.delete({
        where: { id }
      });
      return res.status(200).json({ success: true, message: 'Project deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Projects API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
