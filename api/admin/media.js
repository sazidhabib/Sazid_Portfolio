import prisma from '../_db.js';
import { checkAuth } from '../_auth.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,DELETE,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET list of media doesn't require auth (or does it? Better to make it auth-protected since it's under admin namespace)
    if (!checkAuth(req, res)) return;

    if (req.method === 'GET') {
      const mediaList = await prisma.media.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(mediaList);
    }

    if (req.method === 'POST') {
      const { name, data } = req.body; // data is base64 string
      if (!name || !data) {
        return res.status(400).json({ error: 'Missing required fields: name, data' });
      }

      // Check if data is indeed a base64 image or video data URI
      if (!data.startsWith('data:image/') && !data.startsWith('data:video/')) {
        return res.status(400).json({ error: 'Invalid data format. Expected base64 image or video data URI.' });
      }

      const newMedia = await prisma.media.create({
        data: {
          name,
          data
        },
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      });

      return res.status(201).json(newMedia);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing query param: id' });
      }

      await prisma.media.delete({
        where: { id }
      });
      return res.status(200).json({ success: true, message: 'Media deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Media Admin API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
