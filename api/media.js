import prisma from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const id = req.query?.id || new URL(req.url, `http://${req.headers.host || 'localhost'}`).searchParams.get('id');
    if (!id) {
      return res.status(400).json({ error: 'Missing query param: id' });
    }

    const media = await prisma.media.findUnique({
      where: { id }
    });

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // data format: "data:image/webp;base64,UklGRqYAAABXRUJQVlA..."
    const base64Data = media.data.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Serve binary WebP image with cache headers for high performance
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year cache
    return res.end(imageBuffer);
  } catch (error) {
    console.error('Public media serving error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
