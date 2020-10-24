console.log('Hello from service worker!');
self.addEventListener('push', () => {
  self.registration.sendNotification('test aaaaa', {});
});
