const fs = require('fs');
const path = require('path');
const https = require('https');
const dist = 'dist';

const distSlugs = new Set();
function walk(dir, prefix = '') {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['_astro', 'assets', 'og-images', 'scripts', 'thank-you'].includes(e.name)) continue;
      walk(p, prefix + e.name + '/');
    } else if (e.name === 'index.html') {
      distSlugs.add(prefix.replace(/\/$/, ''));
    } else if (e.name.endsWith('.html')) {
      distSlugs.add((prefix + e.name).replace(/\.html$/, ''));
    }
  }
}
walk(dist);
console.log('dist pages:', distSlugs.size);

https.get('https://lifesystemos.com/sitemap.xml', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const live = [...data.matchAll(/<loc>https:\/\/lifesystemos\.com(\/[^<]*)<\/loc>/g)].map(m => m[1].replace(/\/$/, '').replace(/^\//, ''));
    console.log('live sitemap:', live.length);
    const missing = [];
    for (const u of live) {
      const cand = u.replace(/\.html$/, '');
      if (cand && !distSlugs.has(cand)) missing.push(u);
    }
    console.log('MISSING:', missing.length);
    missing.slice(0, 20).forEach(m => console.log('  ', m));
    const extra = [...distSlugs].filter(s => !live.includes(s) && !live.includes(s + '.html') && !s.startsWith('404'));
    console.log('EXTRA (in dist, not sitemap):', extra.length);
    extra.slice(0, 10).forEach(m => console.log('  ', m));
  });
}).on('error', e => { console.error('fetch fail', e.message); process.exit(1); });
