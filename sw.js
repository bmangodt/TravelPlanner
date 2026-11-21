// Reisplanner service worker: app offline + kaarttegels cachen
const V = 'reisplanner-app-v4';
const SHELL = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V)
    .then(c => Promise.all(SHELL.map(u => fetch(u, { cache: 'reload' }).then(r => { if (r.ok) return c.put(u, r); }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== 'tiles').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
let n = 0;
async function trim(c) { if (++n % 50) return; const ks = await c.keys(); for (let i = 0; i < ks.length - 4000; i++) await c.delete(ks[i]); }
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.hostname === 'tile.openstreetmap.org') {
    e.respondWith(caches.open('tiles').then(async c => {
      const hit = await c.match(req.url);
      if (hit) return hit;
      try { const r = await fetch(req); if (r.ok || r.type === 'opaque') { c.put(req.url, r.clone()); trim(c); } return r; }
      catch (err) { return new Response('', { status: 504 }); }
    }));
    return;
  }
  if (u.origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  e.respondWith(caches.open(V).then(async c => {
    // pagina: altijd de bewaarde app tonen (werkt in vliegtuigmodus), op de achtergrond bijwerken
    const key = isPage ? './index.html' : req;
    const hit = await c.match(key, { ignoreSearch: true, ignoreVary: true }) || (isPage ? await c.match('./', { ignoreSearch: true }) : null);
    const net = fetch(req).then(r => { if (r.ok && !r.redirected) c.put(isPage ? './index.html' : req, r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || new Response('<h1>Offline</h1><p>Open de app één keer met internet.</p>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
