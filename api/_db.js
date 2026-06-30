import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

export function cleanImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://localhost:') || url.startsWith('http://127.0.0.1:')) {
    try {
      const parsed = new URL(url);
      return parsed.pathname + parsed.search;
    } catch (e) {
      return url;
    }
  }
  return url;
}
