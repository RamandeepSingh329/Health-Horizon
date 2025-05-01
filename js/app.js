// app.js

// Global variables
let totalCalories = 0;
let dailyCalorieGoal = 2000; // Default calorie goal
let foodLog = []; // Array to store food items with name and calories
let enableVoiceNotifications = true; // Control voice notifications
const CALORIE_EXCEEDED_THRESHOLD = 1.05; // 5% above the goal to trigger "exceeded" alert
let exceedingIntervalId = null; // To store the interval ID for continuous notifications

// Get the loading bar element (assuming you add it to your HTML)
const loadingBar = document.getElementById('loading-bar');
const logButton = document.getElementById('log-food-btn'); // Assuming you have an ID for the log button

// Function to show the loading bar
function showLoadingBar() {
    if (loadingBar) {
        loadingBar.style.width = '0%';
        loadingBar.classList.add('loading'); // Add a class to start the animation
    }
    if (logButton) {
        logButton.disabled = true;
        logButton.textContent = "Logging..."; // Optional: Change button text during loading
    }
}

// Function to hide the loading bar
function hideLoadingBar() {
    if (loadingBar) {
        loadingBar.style.width = '100%'; // Complete the animation
        setTimeout(() => {
            loadingBar.classList.remove('loading'); // Remove the class to reset
            loadingBar.style.width = '0%';
        }, 400); // Duration of the finish animation
    }
    if (logButton) {
        logButton.disabled = false;
        logButton.textContent = "Log Food"; // Reset button text
    }
}

// Function to toggle voice notifications
function toggleVoiceNotifications() {
    enableVoiceNotifications = !enableVoiceNotifications;
    console.log('Voice notifications:', enableVoiceNotifications ? 'enabled' : 'disabled');
    // You might want to update a UI element to reflect this setting visually
}

// Calculate TDEE based on user inputs
function calculateTDEE() {
    const age = parseInt(document.getElementById("age").value);
    const weight = parseInt(document.getElementById("weight").value);
    const height = parseInt(document.getElementById("height").value);
    const activityLevel = parseFloat(document.getElementById("activity").value);

    // Input validation
    if (age < 0 || weight <= 0 || height <= 0 || activityLevel <= 0) {
        alert("Please enter valid age, weight, height, and activity level.");
        return;
    }

    // BMR calculation (Mifflin-St Jeor Equation)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // For men
    const tdee = bmr * activityLevel; // Total Daily Energy Expenditure

    // Update TDEE output
    dailyCalorieGoal = Math.round(tdee);
    document.getElementById("tdee-output").innerHTML = `Your TDEE is: ${dailyCalorieGoal} calories per day.`;

    // Update the progress bar's max value
    const calorieProgress = document.getElementById("calorie-progress");
    if (calorieProgress) {
        calorieProgress.max = dailyCalorieGoal;
    }
}

// Log food item and calories
function logFood() {
    const foodNameInput = document.getElementById("food-name");
    const caloriesInput = document.getElementById("calories");

    const foodName = foodNameInput.value;
    const calories = parseInt(caloriesInput.value);

    if (!foodName || isNaN(calories) || calories <= 0) {
        alert("Please enter valid food and calorie values.");
        return;
    }

    showLoadingBar(); // Show the loading bar

    // Simulate a short delay for the "loading" effect (you can remove this in a real app if processing is instant)
    setTimeout(() => {
        const foodItem = { name: foodName, calories: calories };
        foodLog.push(foodItem);

        // Add food to the list
        const foodList = document.getElementById("food-list");
        const listItem = document.createElement("li");
        listItem.textContent = `${foodName}: ${calories} calories`;

        // Add remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            totalCalories -= calories; // Subtract calories
            foodLog = foodLog.filter(item => item !== foodItem); // Remove item from log
            foodList.removeChild(listItem); // Remove item from list
            document.getElementById("total-calories").textContent = totalCalories; // Update total calories
            const calorieProgress = document.getElementById("calorie-progress");
            if (calorieProgress) {
                calorieProgress.value = totalCalories; // Update progress bar
            }
            provideDietSuggestions(); // Update suggestions
            checkCalorieLimit(); // Check calorie limit
            updatePieChart(); // Update pie chart
            updateBarGraph(); // Update bar graph
            checkExceededCalorieLimit(); // Check if exceeded after removal
        };

        listItem.appendChild(removeButton);
        foodList.appendChild(listItem);

        // Update total calories
        totalCalories += calories;
        document.getElementById("total-calories").textContent = totalCalories;

        // Update progress bar
        const calorieProgress = document.getElementById("calorie-progress");
        if (calorieProgress) {
            calorieProgress.value = totalCalories;
        }

        // Provide diet suggestion
        provideDietSuggestions();

        // Check calorie limit and send notification
        checkCalorieLimit();
        checkExceededCalorieLimit(); // Check if exceeded after logging

        // Update charts
        updatePieChart();
        updateBarGraph();

        // Clear input fields
        foodNameInput.value = '';
        caloriesInput.value = '';

        hideLoadingBar(); // Hide the loading bar
    }, 800); // Adjust the delay as needed
}

// Provide diet suggestions based on calories consumed
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

// Function to check calorie limit and send notification (close to goal)
function checkCalorieLimit() {
    if (totalCalories >= dailyCalorieGoal * 0.9 && totalCalories < dailyCalorieGoal) { // 90% to 100%
        sendNotification(`You're close to reaching your daily calorie goal of ${dailyCalorieGoal} calories. Be mindful of your next meal!`);
    } else if (totalCalories >= dailyCalorieGoal && totalCalories < dailyCalorieGoal * CALORIE_EXCEEDED_THRESHOLD) {
        sendNotification(`You've reached your daily calorie goal of ${dailyCalorieGoal} calories!`);
        // Clear any existing exceeding interval
        if (exceedingIntervalId) {
            clearInterval(exceedingIntervalId);
            exceedingIntervalId = null;
        }
    }
}

// New function to check if calorie consumption has exceeded the limit and continuously notify
function checkExceededCalorieLimit() {
    if (totalCalories >= dailyCalorieGoal * CALORIE_EXCEEDED_THRESHOLD) {
        // If no interval is running, start one
        if (!exceedingIntervalId) {
            exceedingIntervalId = setInterval(() => {
                sendNotification(`⚠️ Alert! You have significantly exceeded your daily calorie goal of ${dailyCalorieGoal} calories. Consider your current intake.`);
            }, 15000); // Push notification every 15 seconds (adjust as needed, but be cautious!)
        }
    } else {
        // If not exceeding the limit, clear any existing interval
        if (exceedingIntervalId) {
            clearInterval(exceedingIntervalId);
            exceedingIntervalId = null;
        }
    }
}

// Function to notify when reaching or exceeding 2000 calories (keeping this as a separate notification)
function notifyCalorieThreshold() {
    if (totalCalories >= 2000) {
        sendNotification(`🎉 Milestone! You've reached or exceeded 2000 calories today!`);
    }
}

// Function to send a notification and speak the message
function sendNotification(message) {
    console.log('sendNotification called with message:', message);
    if (Notification.permission === 'granted') {
        new Notification('Calorie Tracker Alert', {
            body: message,
            icon: './assets/fit.png'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            console.log('Permission request result:', permission);
            if (permission === 'granted') {
                sendNotification(message); // Retry sending notification
            }
        });
    } else {
        console.log('Notification permission denied by user.');
    }

    // Text-to-Speech Logic
    if ('speechSynthesis' in window && enableVoiceNotifications) {
        const speechUtterance = new SpeechSynthesisUtterance(message);
        // You can customize the voice, rate, and pitch here if needed
        window.speechSynthesis.speak(speechUtterance);
    } else if (!('speechSynthesis' in window)) {
        console.log('Text-to-speech not supported in this browser.');
    } else if (!enableVoiceNotifications) {
        console.log('Voice notifications are disabled.');
    }
}

// Function to update the pie chart
function updatePieChart() {
    const calorieBreakdown = {};
    foodLog.forEach(item => {
        calorieBreakdown[item.name] = (calorieBreakdown[item.name] || 0) + item.calories;
    });

    const foodNames = Object.keys(calorieBreakdown);
    const calories = Object.values(calorieBreakdown);
    const backgroundColors = foodNames.map(() => '#' + Math.floor(Math.random()*16777215).toString(16)); // Generate random colors

    const pieChartCanvas = document.getElementById('caloriePieChart');
    if (pieChartCanvas) {
        if (pieChartCanvas.chart) {
            pieChartCanvas.chart.destroy(); // Destroy existing chart if it exists
        }
        pieChartCanvas.chart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
                labels: foodNames,
                datasets: [{
                    data: calories,
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 1,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true, // Use circles for legend items
                            pointStyle: 'circle',
                            font: {
                                size: 10 // Smaller font size for bangle size
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Calorie Breakdown',
                        font: {
                            size: 12 // Smaller font size for bangle size
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((context.parsed / total) * 100);
                                    label += context.parsed + ' calories (' + percentage + '%)';
                                }
                                return label;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        bodyFont: {
                            size: 10 // Smaller font size for bangle size
                        },
                        titleFont: {
                            size: 12 // Smaller font size for bangle size
                        }
                    },
                    datalabels: { // Enable data labels (requires the chartjs-plugin-datalabels.min.js library in HTML)
                        color: '#fff',
                        formatter: (value, context) => {
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            return value > 0 ? `${Math.round((value / total) * 100)}%` : '';
                        },
                        font: {
                            weight: 'bold',
                            size: 8 // Smaller font size for bangle size
                        }
                    }
                }
            }
        });
    }
}

// Function to update the bar graph
function updateBarGraph() {
    const calorieBreakdown = {};
    foodLog.forEach(item => {
        calorieBreakdown[item.name] = (calorieBreakdown[item.name] || 0) + item.calories;
    });

    const foodNames = Object.keys(calorieBreakdown);
    const calories = Object.values(calorieBreakdown);
    const backgroundColors = foodNames.map(() => '#' + Math.floor(Math.random()*16777215).toString(16)); // Generate random colors

    const barChartCanvas = document.getElementById('calorieBarChart');
    if (barChartCanvas) {
        if (barChartCanvas.chart) {
            barChartCanvas.chart.destroy(); // Destroy existing chart if it exists
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
                            font: {
                                size: 10 // Smaller font size for consistency
                            }
                        },
                        ticks: {
                            font: {
                                size: 8 // Smaller font size for consistency
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 8 // Smaller font size for consistency
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false, // Hide the legend as labels are on the bars
                    },
                    title: {
                        display: true,
                        text: 'Calorie Consumption by Food Item',
                        font: {
                            size: 12 // Smaller font size for consistency
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + ' calories';
                                }
                                return label;
                            }
                        },
                        bodyFont: {
                            size: 10 // Smaller font size for consistency
                        },
                        titleFont: {
                            size: 12 // Smaller font size for consistency
                        }
                    }
                }
            }
        });
    }
}

// Example usage: Request permission for notifications and initialize charts on page load
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    updatePieChart();
    updateBarGraph();
});
