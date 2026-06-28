export function checkAuth(req, res) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'sazidadmin123';
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}
