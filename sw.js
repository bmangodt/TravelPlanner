// Reisplanner service worker: app offline + kaarttegels cachen
const V = 'reisplanner-app-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
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
  if (u.origin === location.origin) {
    // eerst uit cache (snel, offline), op de achtergrond bijwerken
    e.respondWith(caches.open(V).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await c.match('./index.html') : null);
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
      return hit || (await net) || new Response('Offline', { status: 503 });
    }));
  }
});
