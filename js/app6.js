function generateMeals() {
    const calorieGoal = document.getElementById('calorie-intake').value;
    if (!calorieGoal) {
        alert("Please enter your calorie goal.");
        return;
    }

    const mealSuggestionsDiv = document.getElementById('meal-suggestions');
    mealSuggestionsDiv.classList.add('loading');
    displayLoadingMessage(mealSuggestionsDiv, "Generating meal suggestions...");

    setTimeout(() => {
        const meals = simulateVegMealSuggestions(calorieGoal);
        displayMealSuggestions(meals);
        sendMealNotification(meals);
        mealSuggestionsDiv.classList.remove('loading');
        clearLoadingMessage(mealSuggestionsDiv);
    }, 1000);
}

function simulateVegMealSuggestions(calorieGoal) {
    const vegMeals = [
        { name: "Oatmeal with fruits and nuts", calories: 250, ingredients: ["oats", "berries", "almonds", "honey"] },
        { name: "Vegetable stir-fry with tofu", calories: 350, ingredients: ["tofu", "broccoli", "carrots", "peppers", "soy sauce"] },
        { name: "Lentil soup with whole-grain bread", calories: 300, ingredients: ["lentils", "vegetable broth", "carrots", "celery", "whole-grain bread"] },
        { name: "Chickpea salad sandwich", calories: 400, ingredients: ["chickpeas", "mayo", "celery", "red onion", "whole-wheat bread"] },
        { name: "Quinoa bowl with roasted vegetables", calories: 450, ingredients: ["quinoa", "sweet potatoes", "zucchini", "red onion", "olive oil"] },
        { name: "Vegetable curry with rice", calories: 400, ingredients: ["mixed vegetables", "coconut milk", "curry paste", "rice"] },
        { name: "Spinach and mushroom omelette", calories: 280, ingredients: ["eggs", "spinach", "mushrooms", "cheese"] },
        { name: "Vegetable burrito bowl", calories: 380, ingredients: ["rice", "beans", "corn", "salsa", "guacamole"] },
        { name: "Avocado toast with everything bagel seasoning", calories: 250, ingredients: ["avocado", "whole wheat toast", "everything bagel seasoning"] },
        { name: "Vegetable and bean chili", calories: 320, ingredients: ["kidney beans", "black beans", "tomatoes", "onions", "peppers"] }
    ];

    return vegMeals.filter(meal => meal.calories <= calorieGoal / 3);
}

function displayMealSuggestions(meals) {
    const mealSuggestionsDiv = document.getElementById('meal-suggestions');
    mealSuggestionsDiv.innerHTML = "<h2>Suggested Vegetarian Meals:</h2>";

    if (meals.length === 0) {
        mealSuggestionsDiv.innerHTML += "<p>No meals found matching your calorie goal.</p>";
        return;
    }

    const mealList = document.createElement('ul');
    meals.forEach(meal => {
        const mealItem = document.createElement('li');
        mealItem.classList.add('meal-item');

        const mealDetails = `
            <strong>${meal.name}</strong> - ${meal.calories} calories<br>
            Ingredients: ${meal.ingredients.join(", ")}
        `;

        mealItem.innerHTML = mealDetails;
        mealList.appendChild(mealItem);
    });

    mealSuggestionsDiv.appendChild(mealList);
}

function calculateCaloriesBurned() {
    const weight = parseFloat(document.getElementById('weight').value);
    const activityMinutes = parseFloat(document.getElementById('activity').value);
    const activityType = document.getElementById('activity-type').value;

    if (!weight || !activityMinutes) {
        alert("Please enter weight and activity minutes.");
        return;
    }

    const resultsDiv = document.getElementById('calorie-burn-results');
    resultsDiv.classList.add('loading');
    displayLoadingMessage(resultsDiv, "Calculating calories burned...");

    setTimeout(() => {
        let caloriesBurned = 0;
        switch (activityType) {
            case "walking":
                caloriesBurned = weight * 0.03 * activityMinutes;
                break;
            case "running":
                caloriesBurned = weight * 0.1 * activityMinutes;
                break;
            case "cycling":
                caloriesBurned = weight * 0.05 * activityMinutes;
                break;
            case "swimming":
                caloriesBurned = weight * 0.08 * activityMinutes;
                break;
            default:
                caloriesBurned = 0;
        }

        displayCalorieBurnResults(caloriesBurned);
        sendCalorieBurnNotification(caloriesBurned);
        resultsDiv.classList.remove('loading');
        clearLoadingMessage(resultsDiv);
    }, 1000);
}

function displayCalorieBurnResults(caloriesBurned) {
    const resultsDiv = document.getElementById('calorie-burn-results');
    const greeting = getGreeting(); // Get the greeting text
    const quote = getRandomQuote(); // Get a random motivational quote
    resultsDiv.innerHTML = `<h2>${greeting}</h2><p>You burned ${caloriesBurned.toFixed(2)} calories!</p><p class="motivational-quote">"${quote}"</p>`;
}

function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Hello!";

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning!";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon!";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good evening!";
    } else {
        greeting = "Good night!";
    }

    return greeting;
}

function getRandomQuote() {
    const quotes = [
        "The only bad workout is the one that didn't happen.",
        "Believe you can and you're halfway there.",
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "Today's actions are tomorrow's results.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "It does not matter how slowly you go as long as you do not stop.",
        "Strive for progress, not perfection.",
        "Every step forward is a victory.",
        "You are stronger than you think.",
        "Make time for your health."
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function sendMealNotification(meals) {
    if ('Notification' in window && 'speechSynthesis' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                let notificationTitle = 'Meal Suggestions Ready!';
                let notificationBody = '';
                if (meals.length > 0) {
                    const mealNames = meals.map(meal => meal.name).join(', ');
                    notificationBody = `Here are your vegetarian meal suggestions: ${mealNames}`;
                } else {
                    notificationBody = `No meals found matching your calorie goal.`;
                }

                const notification = new Notification(notificationTitle, {
                    body: notificationBody,
                    icon: 'icon.png'
                });

                // Speak the notification content (once)
                speakNotification(notificationTitle, notificationBody);
                storeNotificationDetails(notificationTitle, notificationBody);
            }
        });
    } else {
        console.log('Notifications or Speech Synthesis not supported in this browser.');
    }
}

function sendCalorieBurnNotification(caloriesBurned) {
    if ('Notification' in window && 'speechSynthesis' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const greeting = getGreeting(); // Get the greeting for the notification
                const quote = getRandomQuote(); // Get a random motivational quote for the notification
                const notificationTitle = 'Calorie Burn Results';
                const notificationBody = `${greeting} You burned ${caloriesBurned.toFixed(2)} calories! "${quote}"`;
                const notification = new Notification(notificationTitle, {
                    body: notificationBody,
                    icon: 'icon.png'
                });

                // Speak the notification content (once)
                speakNotification(notificationTitle, notificationBody);
                storeNotificationDetails(notificationTitle, notificationBody);
            }
        });
    } else {
        console.log('Notifications or Speech Synthesis not supported in this browser.');
    }
}

function displayLoadingMessage(element, message) {
    const loadingMessage = document.createElement('p');
    loadingMessage.classList.add('loading-message');
    loadingMessage.textContent = message;
    element.appendChild(loadingMessage);
}

function clearLoadingMessage(element) {
    const loadingMessage = element.querySelector('.loading-message');
    if (loadingMessage) {
        element.removeChild(loadingMessage);
    }
}

// Function to store notification details in local storage
function storeNotificationDetails(title, body) {
    const notifications = JSON.parse(localStorage.getItem('appNotifications') || '[]');
    notifications.push({ title: title, body: body, timestamp: new Date().toISOString() });
    localStorage.setItem('appNotifications', JSON.stringify(notifications));
    console.log('Notification stored:', { title, body }); // Optional: Log to console
}

// Function to retrieve and display stored notification details
function displayNotificationHistory() {
    const notificationHistoryDiv = document.getElementById('notification-history');
    if (notificationHistoryDiv) {
        notificationHistoryDiv.innerHTML = '<h2>Notification History</h2>';
        const storedNotifications = JSON.parse(localStorage.getItem('appNotifications') || '[]');
        if (storedNotifications.length === 0) {
            notificationHistoryDiv.innerHTML += '<p>No notification history available.</p>';
            return;
        }
        const historyList = document.createElement('ul');
        storedNotifications.forEach(notification => {
            const listItem = document.createElement('li');
            listItem.textContent = `${new Date(notification.timestamp).toLocaleString()} - ${notification.title}: ${notification.body}`;
            historyList.appendChild(listItem);
        });
        notificationHistoryDiv.appendChild(historyList);
    } else {
        console.log('Element with ID "notification-history" not found.');
    }
}

// Optional: Function to clear notification history
function clearNotificationHistory() {
    localStorage.removeItem('appNotifications');
    const notificationHistoryDiv = document.getElementById('notification-history');
    if (notificationHistoryDiv) {
        notificationHistoryDiv.innerHTML = '<p>Notification history cleared.</p>';
    } else {
        console.log('Element with ID "notification-history" not found.');
    }
}

// Function to speak the notification content (once)
function speakNotification(title, body) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`${title}. ${body}`);
        speechSynthesis.speak(utterance);
    } else {
        console.log('Speech Synthesis not supported.');
    }
}

// Function to repeatedly speak the latest notification (call this after a new notification is stored)
let isRepeatingSpeechEnabled = false;
let repeatingSpeechIntervalId = null;

function toggleRepeatingSpeech() {
    isRepeatingSpeechEnabled = !isRepeatingSpeechEnabled;
    if (isRepeatingSpeechEnabled) {
        repeatedlySpeakLatestNotification();
        console.log('Repeating speech enabled.');
        // Update UI to reflect the enabled state (e.g., change button text)
    } else {
        if (repeatingSpeechIntervalId) {
            clearInterval(repeatingSpeechIntervalId);
            repeatingSpeechIntervalId = null;
            console.log('Repeating speech disabled.');
            // Update UI to reflect the disabled state
        }
    }
}

function repeatedlySpeakLatestNotification(interval = 5000) { // Default interval: 5 seconds
    if ('speechSynthesis' in window && isRepeatingSpeechEnabled) {
        repeatingSpeechIntervalId = setInterval(() => {
            const storedNotifications = JSON.parse(localStorage.getItem('appNotifications') || '[]');
            if (storedNotifications.length > 0) {
                const latestNotification = storedNotifications[storedNotifications.length - 1];
                const utterance = new SpeechSynthesisUtterance(`${latestNotification.title}. ${latestNotification.body}`);
                speechSynthesis.speak(utterance);
            }
        }, interval);
    } else if (!('speechSynthesis' in window)) {
        console.log('Speech Synthesis not supported.');
    }
}

// You would need to add a button in your HTML to call toggleRepeatingSpeech():
// <button onclick="toggleRepeatingSpeech()">Toggle Repeating Speech</button>

// Optional: Call displayNotificationHistory() on page load to show any existing history
window.onload = displayNotificationHistory;