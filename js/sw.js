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
		caches.open('reviews-app')
		.then(cache => caches.match(event.request))
		.then(response => {return response;})
	);
});