import prisma, { cleanImageUrl } from './_db.js';

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
    const skills = await prisma.skill.findMany({
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' }
      ]
    });

    // Format the database rows to match the nested category format of the frontend
    // { title: "Frontend", skills: [...] }
    const categoriesMap = {};
    skills.forEach(skill => {
      if (!categoriesMap[skill.category]) {
        categoriesMap[skill.category] = [];
      }
      categoriesMap[skill.category].push({
        id: skill.id,
        name: skill.name,
        image: cleanImageUrl(skill.image),
      });
    });

    const formattedSkills = Object.keys(categoriesMap).map(category => ({
      title: category,
      skills: categoriesMap[category]
    }));

    return res.status(200).json(formattedSkills);
  } catch (error) {
    console.error('Public skills fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
