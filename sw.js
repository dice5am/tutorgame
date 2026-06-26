const CACHE_NAME = 'kids-alphabet-hub-v2';
const ASSETS_TO_CACHE = [
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap',
  // SVG Vector Assets
  'assets/images/a_apple.svg',
  'assets/images/b_ball.svg',
  'assets/images/c_cat.svg',
  'assets/images/d_dog.svg',
  'assets/images/e_elephant.svg',
  'assets/images/f_fish.svg',
  'assets/images/g_grapes.svg',
  'assets/images/h_house.svg',
  'assets/images/i_ice_cream.svg',
  'assets/images/j_jellyfish.svg',
  'assets/images/k_kite.svg',
  'assets/images/l_lion.svg',
  'assets/images/m_monkey.svg',
  'assets/images/n_nest.svg',
  'assets/images/o_owl.svg',
  'assets/images/p_penguin.svg',
  'assets/images/q_queen.svg',
  'assets/images/r_robot.svg',
  'assets/images/s_sun.svg',
  'assets/images/t_tree.svg',
  'assets/images/u_umbrella.svg',
  'assets/images/v_violin.svg',
  'assets/images/w_watermelon.svg',
  'assets/images/x_xylophone.svg',
  'assets/images/y_yacht.svg',
  'assets/images/z_zebra.svg',
  // PNG Illustrations (A-Q generated before rate-limiting)
  'assets/images/a_apple.png',
  'assets/images/b_bear.png',
  'assets/images/c_cat.png',
  'assets/images/d_dog.png',
  'assets/images/e_elephant.png',
  'assets/images/f_frog.png',
  'assets/images/g_giraffe.png',
  'assets/images/h_hippo.png',
  'assets/images/i_iguana.png',
  'assets/images/j_jellyfish.png',
  'assets/images/k_koala.png',
  'assets/images/l_lion.png',
  'assets/images/m_monkey.png',
  'assets/images/n_nest.png',
  'assets/images/o_owl.png',
  'assets/images/p_penguin.png',
  'assets/images/q_queen.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Interceptor
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        // Cache Google Fonts files dynamically on fetch
        if (e.request.url.includes('fonts.gstatic.com')) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    })
  );
});
