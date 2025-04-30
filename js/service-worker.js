self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'No diet suggestion available.',
        icon: 'images/icon.png', // Replace with your icon path
        badge: 'images/badge.png' // Replace with your badge path
    };
    event.waitUntil(
        self.registration.showNotification('Diet Suggestion', options)
    );
});