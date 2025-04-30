// Initialize total calories and daily goal
let totalCalories = 0;
const dailyGoal = 2000;

// Initialize SpeechSynthesis API
const synth = window.speechSynthesis;

// Add meal function
function addMeal() {
    const mealName = document.getElementById("meal-name").value;
    const calories = parseInt(document.getElementById("calories").value);

    if (mealName && calories) {
        totalCalories += calories;
        const mealList = document.getElementById("meal-list");
        const mealItem = document.createElement("li");
        mealItem.textContent = `${mealName}: ${calories} calories`;
        mealList.appendChild(mealItem);
        document.getElementById("total-calories").textContent = totalCalories;
        updateGoalStatus();
        document.getElementById("meal-name").value = "";
        document.getElementById("calories").value = "";
    } else {
        alert("Please enter both the meal name and calories.");
    }
}

// Update the goal status message and speak the result
function updateGoalStatus() {
    const caloriesLeft = dailyGoal - totalCalories;
    const goalStatus = document.getElementById("goal-status");
    let message = "";

    if (caloriesLeft > 0) {
        message = `You have ${caloriesLeft} calories left today.`;
        goalStatus.textContent = message;
        goalStatus.style.color = "#28a745"; // Green
    } else if (caloriesLeft === 0) {
        message = "You have reached your daily goal!";
        goalStatus.textContent = message;
        goalStatus.style.color = "#007bff"; // Blue
    } else {
        message = `You have exceeded your daily goal by ${Math.abs(caloriesLeft)} calories!`;
        goalStatus.textContent = message;
        goalStatus.style.color = "#dc3545"; // Red
    }
    speakResult(message);
}

// Function to speak the result
function speakResult(text) {
    if (synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    } else {
        console.error("Speech synthesis is not supported in this browser.");
    }
}