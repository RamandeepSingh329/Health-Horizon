document.addEventListener('DOMContentLoaded', function () {
    const calorieForm = document.getElementById('calorieForm');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');

    if (calorieForm) {
        calorieForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const caloriesInput = document.getElementById('calories').value;
            const calories = parseInt(caloriesInput);
            const activityLevel = document.querySelector('input[name="activityLevel"]:checked').value;

            if (isNaN(calories) || calories < 0) {
                pushNotification('Please enter a valid positive number for calories.', 'error');
                return;
            }

            const dietPlan = suggestDietPlan(calories, activityLevel);
            document.getElementById('dietPlan').innerText = dietPlan;
        });
    }

    function suggestDietPlan(calories, activityLevel) {
        let dietPlan = '';

        // Determine diet plan based on calorie intake and activity level
        if (activityLevel === 'sports') {
            if (calories < 2500) {
                dietPlan = 'As a sports person, your calorie intake is low. Consider increasing your intake with more carbohydrates, lean proteins, and healthy fats to fuel your performance.';
                pushNotification('Increase your calorie intake with more carbs and proteins.', 'warning');
            } else if (calories >= 2500 && calories <= 3500) {
                dietPlan = 'Your calorie intake is appropriate for a sports person. Maintain a balanced diet rich in carbohydrates, proteins, and healthy fats.';
                pushNotification('Great! Your intake is suitable for your activity level.', 'success');
            } else {
                dietPlan = 'Your calorie intake is high. Consider focusing on nutrient-dense foods and avoid excessive processed foods.';
                pushNotification('Consider adjusting your diet to avoid excess calories.', 'warning');
            }
        } else if (activityLevel === 'heavyWorker') {
            if (calories < 2000) {
                dietPlan = 'As a heavy worker, your calorie intake is low. Increase your intake with hearty meals that include proteins, whole grains, and healthy fats.';
                pushNotification('Boost your calorie intake with hearty meals.', 'warning');
            } else if (calories >= 2000 && calories <= 3000) {
                dietPlan = 'Your calorie intake is within the recommended range for heavy workers. Keep up with a balanced diet.';
                pushNotification('Good job! Your intake is appropriate.', 'success');
            } else {
                dietPlan = 'Your calorie intake is high. Focus on whole foods and reduce processed snacks.';
                pushNotification('Consider reducing your calorie intake.', 'warning');
            }
        } else if (activityLevel === 'lightlyActive') {
            if (calories < 1800) {
                dietPlan = 'As a lightly active person, your calorie intake is low. Consider adding some healthy snacks to your diet, and increase your protein intake with foods like chicken, tofu, or legumes.';
                pushNotification('Increase your calorie intake with healthy snacks and more protein.', 'warning');
            } else if (calories >= 1800 && calories <= 2500) {
                dietPlan = 'Your calorie intake is appropriate for a lightly active person. Ensure a balanced diet with proteins, vegetables, whole grains, and healthy fats.';
                pushNotification('Great! Your intake is balanced for your activity level.', 'success');
            } else {
                dietPlan = 'Your calorie intake is a bit high. Consider focusing on nutrient-dense foods like vegetables, lean proteins, and reducing processed snacks.';
                pushNotification('Consider reducing your intake to maintain a healthy balance.', 'warning');
            }
        } else if (activityLevel === 'idle') {
            if (calories < 1500) {
                dietPlan = 'Your calorie intake is low for an idle lifestyle. Consider a balanced diet with adequate nutrients.';
                pushNotification('Increase your intake to meet your nutritional needs.', 'warning');
            } else if (calories >= 1500 && calories <= 2000) {
                dietPlan = 'Your calorie intake is appropriate for an idle lifestyle. Maintain a balanced diet.';
                pushNotification('Great! Your intake is suitable.', 'success');
            } else {
                dietPlan = 'Your calorie intake is high. Consider reducing portions and focusing on fruits and vegetables.';
                pushNotification('Consider adjusting your diet to lower your intake.', 'warning');
            }
        }

        return dietPlan;
    }

    function pushNotification(message, type = 'info') {
        if (!notification || !notificationText) {
            console.warn('Notification elements not found in the DOM.');
            return;
        }
        notificationText.innerText = message;
        notification.className = 'show'; // Reset existing classes
        if (type === 'success') {
            notification.classList.add('success');
        } else if (type === 'warning') {
            notification.classList.add('warning');
        } else if (type === 'error') {
            notification.classList.add('error');
        }

        setTimeout(() => {
            notification.classList.remove('show');
            notification.className = ''; // Clear all added classes
        }, 3000);
    }
});
