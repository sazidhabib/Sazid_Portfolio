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
      const experiences = await prisma.experience.findMany({
        orderBy: { sortOrder: 'asc' }
      });
      const sanitizedExperiences = experiences.map(exp => ({
        ...exp,
        companyLogo: cleanImageUrl(exp.companyLogo)
      }));
      return res.status(200).json(sanitizedExperiences);
    }

    // Write operations require auth
    if (!checkAuth(req, res)) return;

    if (req.method === 'POST') {
      const { role, company, companyLogo, date, description, skills, sortOrder } = req.body;
      if (!role || !company || !date || !description || !skills) {
        return res.status(400).json({ error: 'Missing required fields: role, company, date, description, skills' });
      }

      const newExp = await prisma.experience.create({
        data: {
          role,
          company,
          companyLogo: companyLogo || '',
          date,
          description: Array.isArray(description) ? description : [description],
          skills: Array.isArray(skills) ? skills : [skills],
          sortOrder: sortOrder ? parseInt(sortOrder) : 0
        }
      });
      return res.status(201).json(newExp);
    }

    if (req.method === 'PUT') {
      const { id, role, company, companyLogo, date, description, skills, sortOrder } = req.body;
      if (!id || !role || !company || !date || !description || !skills) {
        return res.status(400).json({ error: 'Missing required fields: id, role, company, date, description, skills' });
      }

      const updatedExp = await prisma.experience.update({
        where: { id },
        data: {
          role,
          company,
          companyLogo: companyLogo || '',
          date,
          description: Array.isArray(description) ? description : [description],
          skills: Array.isArray(skills) ? skills : [skills],
          sortOrder: sortOrder ? parseInt(sortOrder) : 0
        }
      });
      return res.status(200).json(updatedExp);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing query param: id' });
      }

      await prisma.experience.delete({
        where: { id }
      });
      return res.status(200).json({ success: true, message: 'Experience deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Experiences API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
