const cacheFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];

//Install service worker and cache items
self.addEventListener('install', event => {


	event.waitUntil(
		caches.open('reviews-app').then(cache => {
			return cache.addAll(cacheFiles);
		})
	);
});

//Return cached items
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				console.log('Found it!' + event.request);
				return response;
			} else {
				console.log('Uh oh...' + event.request + 'was not found');
				return fetch(event.request).then(response => {
					caches.open('reviews-app').then(cache => {
						cache.put(event.request, response);
					});
				return response;
				})
				.catch(error => {
					console.error(error);
				});
			};
		})
	);
});