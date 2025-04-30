const CALORIE_LIMIT = 500;
let speechEnabled = true; // Initial state for speech

function requestNotificationPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function speakText(text) {
    if (speechEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        // You can customize the voice, rate, pitch here if needed
        // utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Your Preferred Voice');
        window.speechSynthesis.speak(utterance);
    } else if (!('speechSynthesis' in window)) {
        console.log("Speech synthesis is not supported in this browser.");
    }
}

function showNotification(title, message, icon = './assets/goal.gif') {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: icon
        });
        speakText(`${title}. ${message}`); // Read out the notification text
    }
}

function speakGreeting() {
    if (speechEnabled && 'speechSynthesis' in window) {
        const greetingMessages = [
            "Fantastic effort! You crushed your calorie goal!",
            "Well done! You've reached your daily calorie target!",
            "Amazing! You've hit your calorie burning goal!",
            "Great job! Goal achieved for today!",
            "You're doing great! Calorie goal complete!"
        ];
        const randomGreeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
        const utterance = new SpeechSynthesisUtterance(randomGreeting);
        window.speechSynthesis.speak(utterance);
    } else if (!('speechSynthesis' in window)) {
        console.log("Speech synthesis is not supported in this browser.");
        showNotification("Congratulations!", "You've met your daily calorie burning goal!", './assets/celebration-icon.png'); // Fallback notification
    }
}

function loadProgressFromStorage() {
    const storedProgress = localStorage.getItem('workoutProgress');
    if (storedProgress) {
        const progressList = document.getElementById("progress-list");
        const progressEntries = JSON.parse(storedProgress);
        progressEntries.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `Date: ${entry.date}, Weight: ${entry.weight} kg, Calories Burned: ${entry.caloriesBurned}, Workout Type: ${entry.workoutType}`;
            progressList.appendChild(listItem);
        });
    }
}

function saveProgressToStorage(progressData) {
    const storedProgress = localStorage.getItem('workoutProgress');
    let progressEntries = storedProgress ? JSON.parse(storedProgress) : [];
    progressEntries.push(progressData);
    localStorage.setItem('workoutProgress', JSON.stringify(progressEntries));
}

function logProgress() {
    const date = document.getElementById("date").value;
    const weight = document.getElementById("weight").value;
    const caloriesBurned = parseInt(document.getElementById("calories-burned").value);
    const workoutType = document.getElementById("workout-type").value;

    if (!date || !weight || isNaN(caloriesBurned) || !workoutType) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const progressData = { date, weight, caloriesBurned, workoutType };
    const progressList = document.getElementById("progress-list");
    const listItem = document.createElement("li");
    listItem.textContent = `Date: ${date}, Weight: ${weight} kg, Calories Burned: ${caloriesBurned}, Workout Type: ${workoutType}`;
    progressList.appendChild(listItem);

    saveProgressToStorage(progressData);

    if (caloriesBurned >= CALORIE_LIMIT) {
        speakGreeting(); // Keep the specific greeting
        showNotification("Incredible effort! You've conquered your daily calorie goal and are one step closer to your fitness journey!");
    }

    if (caloriesBurned > CALORIE_LIMIT) {
        showNotification("Heads up!", "You're working out intensely! Remember to listen to your body.");
    }

    document.getElementById("progress-form").reset();
}

document.addEventListener('DOMContentLoaded', () => {
    requestNotificationPermission();
    loadProgressFromStorage();
});

// Optional: Add a way to toggle speech (e.g., a button or checkbox)
// const toggleSpeechButton = document.getElementById('toggle-speech');
// if (toggleSpeechButton) {
//     toggleSpeechButton.addEventListener('click', () => {
//         speechEnabled = !speechEnabled;
//         console.log('Speech enabled:', speechEnabled);
//         // Optionally update the button text or UI to reflect the state
//     });
// }