// Global variables
let totalCalories = 0;
let dailyCalorieGoal = 2000; // Default calorie goal
let foodLog = []; // Array to store food items with name and calories
let enableVoiceNotifications = true; // Control voice notifications
const CALORIE_EXCEEDED_THRESHOLD = 1.05; // 5% above the goal to trigger "exceeded" alert
let exceedingIntervalId = null; // To store the interval ID for continuous notifications

const loadingBar = document.getElementById('loading-bar');
const logButton = document.getElementById('log-food-btn');

// ✅ Update remaining calories display
function updateRemainingCalories() {
    const remaining = dailyCalorieGoal - totalCalories;
    const remainingDisplay = document.getElementById("remaining-calories");
    if (remainingDisplay) {
        if (remaining >= 0) {
            remainingDisplay.textContent = `Remaining Calories: ${remaining} kcal`;
            remainingDisplay.style.color = 'green';
        } else {
            remainingDisplay.textContent = `Over by ${Math.abs(remaining)} kcal`;
            remainingDisplay.style.color = 'red';
        }
    }
}

function showLoadingBar() {
    if (loadingBar) {
        loadingBar.style.width = '0%';
        loadingBar.classList.add('loading');
    }
    if (logButton) {
        logButton.disabled = true;
        logButton.textContent = "Logging...";
    }
}

function hideLoadingBar() {
    if (loadingBar) {
        loadingBar.style.width = '100%';
        setTimeout(() => {
            loadingBar.classList.remove('loading');
            loadingBar.style.width = '0%';
        }, 400);
    }
    if (logButton) {
        logButton.disabled = false;
        logButton.textContent = "Log Food";
    }
}

function toggleVoiceNotifications() {
    enableVoiceNotifications = !enableVoiceNotifications;
    console.log('Voice notifications:', enableVoiceNotifications ? 'enabled' : 'disabled');
}

function calculateTDEE() {
    const age = parseInt(document.getElementById("age").value);
    const weight = parseInt(document.getElementById("weight").value);
    const height = parseInt(document.getElementById("height").value);
    const activityLevel = parseFloat(document.getElementById("activity").value);

    if (age < 0 || weight <= 0 || height <= 0 || activityLevel <= 0) {
        alert("Please enter valid age, weight, height, and activity level.");
        return;
    }

    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const tdee = bmr * activityLevel;

    dailyCalorieGoal = Math.round(tdee);
    document.getElementById("tdee-output").innerHTML = `Your TDEE is: ${dailyCalorieGoal} calories per day.`;

    const calorieProgress = document.getElementById("calorie-progress");
    if (calorieProgress) {
        calorieProgress.max = dailyCalorieGoal;
    }

    updateRemainingCalories(); // ✅ update after TDEE
}

function logFood() {
    const foodNameInput = document.getElementById("food-name");
    const caloriesInput = document.getElementById("calories");

    const foodName = foodNameInput.value;
    const calories = parseInt(caloriesInput.value);

    if (!foodName || isNaN(calories) || calories <= 0) {
        alert("Please enter valid food and calorie values.");
        return;
    }

    showLoadingBar();

    setTimeout(() => {
        const foodItem = { name: foodName, calories: calories };
        foodLog.push(foodItem);

        const foodList = document.getElementById("food-list");
        const listItem = document.createElement("li");
        listItem.textContent = `${foodName}: ${calories} calories`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () {
            totalCalories -= calories;
            foodLog = foodLog.filter(item => item !== foodItem);
            foodList.removeChild(listItem);
            document.getElementById("total-calories").textContent = totalCalories;

            const calorieProgress = document.getElementById("calorie-progress");
            if (calorieProgress) {
                calorieProgress.value = totalCalories;
            }

            provideDietSuggestions();
            checkCalorieLimit();
            updateBarGraph();
            checkExceededCalorieLimit();
            updateRemainingCalories(); // ✅ update after removing
        };

        listItem.appendChild(removeButton);
        foodList.appendChild(listItem);

        totalCalories += calories;
        document.getElementById("total-calories").textContent = totalCalories;

        const calorieProgress = document.getElementById("calorie-progress");
        if (calorieProgress) {
            calorieProgress.value = totalCalories;
        }

        provideDietSuggestions();
        checkCalorieLimit();
        checkExceededCalorieLimit();
        updateBarGraph();
        updateRemainingCalories(); // ✅ update after adding

        foodNameInput.value = '';
        caloriesInput.value = '';

        hideLoadingBar();
    }, 800);
}

function provideDietSuggestions() {
    const suggestions = document.getElementById("suggestions");
    let message = "";

    if (totalCalories < dailyCalorieGoal) {
        const remainingCalories = dailyCalorieGoal - totalCalories;
        message = `You have ${remainingCalories} calories left today. Consider adding more protein or vegetables to your meals.`;
    } else if (totalCalories > dailyCalorieGoal) {
        const excessCalories = totalCalories - dailyCalorieGoal;
        message = `You've exceeded your daily calorie target by ${excessCalories} calories. Try to adjust your next meal.`;
    } else {
        message = "You're on track! Keep it up!";
    }

    suggestions.textContent = message;
}

function checkCalorieLimit() {
    if (totalCalories >= dailyCalorieGoal * 0.9 && totalCalories < dailyCalorieGoal) {
        sendNotification(`You're close to reaching your daily calorie goal of ${dailyCalorieGoal} calories. Be mindful of your next meal!`);
    } else if (totalCalories >= dailyCalorieGoal && totalCalories < dailyCalorieGoal * CALORIE_EXCEEDED_THRESHOLD) {
        sendNotification(`You've reached your daily calorie goal of ${dailyCalorieGoal} calories!`);
        if (exceedingIntervalId) {
            clearInterval(exceedingIntervalId);
            exceedingIntervalId = null;
        }
    }
}

function checkExceededCalorieLimit() {
    if (totalCalories >= dailyCalorieGoal * CALORIE_EXCEEDED_THRESHOLD) {
        if (!exceedingIntervalId) {
            exceedingIntervalId = setInterval(() => {
                sendNotification(`⚠️ Alert! You have significantly exceeded your daily calorie goal of ${dailyCalorieGoal} calories. Consider your current intake.`);
            }, 15000);
        }
    } else {
        if (exceedingIntervalId) {
            clearInterval(exceedingIntervalId);
            exceedingIntervalId = null;
        }
    }
}

function notifyCalorieThreshold() {
    if (totalCalories >= 2000) {
        sendNotification(`🎉 Milestone! You've reached or exceeded 2000 calories today!`);
    }
}

function sendNotification(message) {
    console.log('sendNotification called with message:', message);
    if (Notification.permission === 'granted') {
        new Notification('Calorie Tracker Alert', {
            body: message,
            icon: './assets/fit.png'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                sendNotification(message);
            }
        });
    }

    if ('speechSynthesis' in window && enableVoiceNotifications) {
        const speechUtterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(speechUtterance);
    } else if (!('speechSynthesis' in window)) {
        console.log('Text-to-speech not supported in this browser.');
    } else if (!enableVoiceNotifications) {
        console.log('Voice notifications are disabled.');
    }
}

// ✅ Only bar graph is retained
function updateBarGraph() {
    const calorieBreakdown = {};
    foodLog.forEach(item => {
        calorieBreakdown[item.name] = (calorieBreakdown[item.name] || 0) + item.calories;
    });

    const foodNames = Object.keys(calorieBreakdown);
    const calories = Object.values(calorieBreakdown);
    const backgroundColors = foodNames.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16));

    const barChartCanvas = document.getElementById('calorieBarChart');
    if (barChartCanvas) {
        if (barChartCanvas.chart) {
            barChartCanvas.chart.destroy();
        }
        barChartCanvas.chart = new Chart(barChartCanvas, {
            type: 'bar',
            data: {
                labels: foodNames,
                datasets: [{
                    label: 'Calories Consumed',
                    data: calories,
                    backgroundColor: backgroundColors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Calories',
                            font: { size: 10 }
                        },
                        ticks: { font: { size: 8 } }
                    },
                    x: {
                        ticks: { font: { size: 8 } }
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Calorie Consumption by Food Item',
                        font: { size: 12 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + ' calories';
                                }
                                return label;
                            }
                        },
                        bodyFont: { size: 10 },
                        titleFont: { size: 12 }
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    updateBarGraph();
    updateRemainingCalories();
});
document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "Your health isn’t an expense—it’s the best investment you’ll ever make. Prioritize it today for a stronger, happier future",
        "Every bite is a choice that shapes your journey—make it count, and move closer to your goal with every delicious step!",
        "Discipline is the art of choosing lasting success over fleeting desires—stay focused on what matters most!",
        "Eat to energize and nourish your body—let food be your strength, not your comfort."
    ];

    const quoteElement = document.getElementById("quote-display");
    let quoteIndex = 0;
    const typingSpeed = 50; // Adjust for typing speed (milliseconds per character)
    const pauseBetweenQuotes = 3000; // 3 seconds

    function typeWriter(text, index, callback) {
        if (index < text.length) {
            quoteElement.textContent += text.charAt(index);
            setTimeout(() => typeWriter(text, index + 1, callback), typingSpeed);
        } else if (callback) {
            setTimeout(callback, pauseBetweenQuotes);
        }
    }

    function showNextQuote() {
        if (quoteElement) {
            quoteElement.textContent = '';
            const currentQuote = quotes[quoteIndex];

            typeWriter(currentQuote, 0, () => {
                quoteIndex = (quoteIndex + 1) % quotes.length;
                setTimeout(showNextQuote, pauseBetweenQuotes);
            });
        } else {
            console.error("Error: quote-display element not found!");
        }
    }

    showNextQuote();
});