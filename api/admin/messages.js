import prisma from '../_db.js';
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

  // All operations for messages require auth
  if (!checkAuth(req, res)) return;

  try {
    if (req.method === 'GET') {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(messages);
    }

    if (req.method === 'PUT') {
      const { id, read } = req.body;
      if (!id || read === undefined) {
        return res.status(400).json({ error: 'Missing required fields: id, read' });
      }

      const updatedMsg = await prisma.contactMessage.update({
        where: { id },
        data: {
          read: !!read
        }
      });
      return res.status(200).json(updatedMsg);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing query param: id' });
      }

      await prisma.contactMessage.delete({
        where: { id }
      });
      return res.status(200).json({ success: true, message: 'Message deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Messages API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
