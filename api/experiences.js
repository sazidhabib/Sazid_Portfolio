import prisma from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { sortOrder: 'asc' }
    });

    // Format fields to match what the frontend expects
    const formatted = experiences.map(exp => ({
      id: exp.id,
      role: exp.role,
      company: exp.company,
      img: exp.companyLogo,
      date: exp.date,
      desc: exp.description,
      skills: exp.skills
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Public experiences fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
