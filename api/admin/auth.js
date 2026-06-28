export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || 'sazidadmin123';

    if (password === adminPassword) {
      // Return the password itself as a simple token, or a hashed version
      return res.status(200).json({ success: true, token: password });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
