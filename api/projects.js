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
    const projects = await prisma.project.findMany({
      orderBy: { sortOrder: 'asc' }
    });

    // Format fields to match what the frontend expects
    const formatted = projects.map(proj => {
      let tagsObj = [];
      try {
        tagsObj = typeof proj.tags === 'string' ? JSON.parse(proj.tags) : proj.tags;
      } catch (e) {
        tagsObj = proj.tags || [];
      }

      let mediaObj = [];
      try {
        mediaObj = typeof proj.media === 'string' ? JSON.parse(proj.media) : proj.media;
      } catch (e) {
        mediaObj = proj.media || [];
      }

      const cleanedImg = cleanImageUrl(proj.image);
      if (mediaObj.length === 0 && cleanedImg) {
        mediaObj = [{ type: 'image', src: cleanedImg }];
      }

      return {
        id: proj.id,
        name: proj.name,
        description: proj.description,
        image: cleanedImg,
        tags: tagsObj,
        features: proj.features,
        source_code_link: proj.sourceCodeLink,
        live_link: proj.liveLink,
        media: mediaObj
      };
    });

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Public projects fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
