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
      const skills = await prisma.skill.findMany({
        orderBy: [
          { category: 'asc' },
          { sortOrder: 'asc' }
        ]
      });
      const sanitizedSkills = skills.map(skill => ({
        ...skill,
        image: cleanImageUrl(skill.image)
      }));
      return res.status(200).json(sanitizedSkills);
    }

    // Write operations require auth
    if (!checkAuth(req, res)) return;

    if (req.method === 'POST') {
      const { category, name, image, sortOrder } = req.body;
      if (!category || !name || !image) {
        return res.status(400).json({ error: 'Missing required fields: category, name, image' });
      }

      const newSkill = await prisma.skill.create({
        data: {
          category,
          name,
          image,
          sortOrder: sortOrder ? parseInt(sortOrder) : 0
        }
      });
      return res.status(201).json(newSkill);
    }

    if (req.method === 'PUT') {
      const { id, category, name, image, sortOrder } = req.body;
      if (!id || !category || !name || !image) {
        return res.status(400).json({ error: 'Missing required fields: id, category, name, image' });
      }

      const updatedSkill = await prisma.skill.update({
        where: { id },
        data: {
          category,
          name,
          image,
          sortOrder: sortOrder ? parseInt(sortOrder) : 0
        }
      });
      return res.status(200).json(updatedSkill);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing query param: id' });
      }

      await prisma.skill.delete({
        where: { id }
      });
      return res.status(200).json({ success: true, message: 'Skill deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Skills API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
