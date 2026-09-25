import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://citycabs24.com';
const today = new Date().toISOString().split('T')[0];

const publicRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'mumbai-darshan', priority: '0.9', changefreq: 'weekly' },
  { path: 'tours', priority: '0.8', changefreq: 'weekly' },
  { path: 'lonavala-trip', priority: '0.8', changefreq: 'weekly' },
  { path: 'alibaug-sightseeing', priority: '0.8', changefreq: 'weekly' },
  { path: 'matheran-sightseeing', priority: '0.8', changefreq: 'weekly' },
  { path: 'shirdi-tour', priority: '0.8', changefreq: 'weekly' },
  { path: 'mahabaleshwar-sightseeing', priority: '0.8', changefreq: 'weekly' },
  { path: 'igatpuri-tour', priority: '0.8', changefreq: 'weekly' },
  { path: 'ashtavinayak', priority: '0.8', changefreq: 'weekly' },
  { path: '3-jyotirlinga-in-maharashtra', priority: '0.8', changefreq: 'weekly' },
  { path: 'konkan-darshan', priority: '0.8', changefreq: 'weekly' },
];

const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
];

for (const route of publicRoutes) {
  const loc = route.path ? `${BASE_URL}/${route.path}` : `${BASE_URL}/`;
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${loc}</loc>`);
  xmlLines.push(`    <lastmod>${today}</lastmod>`);
  xmlLines.push(`    <changefreq>${route.changefreq}</changefreq>`);
  xmlLines.push(`    <priority>${route.priority}</priority>`);
  xmlLines.push('  </url>');
}

xmlLines.push('</urlset>');
const xmlContent = xmlLines.join('\n') + '\n';

const publicPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, xmlContent, 'utf-8');
console.log(`✅ Generated sitemap at ${publicPath}`);

const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const distPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distPath, xmlContent, 'utf-8');
  console.log(`✅ Also mirrored sitemap to ${distPath}`);
}
