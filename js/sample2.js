const mealCalories = {
    "apple": 95,
    "banana": 105,
    "chicken breast": 165,
    "steak": 679,
    "salad": 150,
    "pizza": 285,
    "pasta": 220,
    "burger": 354,
    "sandwich": 300,
    "ice cream": 207,
    "french fries": 365,
    "soda": 150,
    "donut": 250,
    "fried chicken": 400,
    "taco": 200,
    "cheeseburger": 303,
    "hot dog": 150,
    "milkshake": 350,
    "samosa": 250,
    "pani puri": 200,
    "bhel puri": 150,
    "vada pav": 300,
    "pav bhaji": 400,
    "dhokla": 120,
    "chaat": 250,
    "aloo tikki": 180,
    "paneer tikka": 300,
    "butter chicken": 400,
    "gulab jamun": 150,
    "jalebi": 300,
    "rasgulla": 125,
    "barfi": 200,
    "kheer": 250,
    "ladoos": 200,
    "peda": 120,
    "kurkure": 556,
    "banana chips": 519,
    "potato chips salted": 547,
    "chappati": 70,
    "tandoori chappati": 100,
    "missi chappati": 110,
    "aloo prantha": 150,
    "dal": 230,
    "aloo gobi": 190,
};

document.getElementById('checkCalories').addEventListener('click', function() {
    const mealInput = document.getElementById('mealInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    // Hide the result initially
    resultDiv.classList.remove('show');
    resultDiv.classList.add('hide');

    setTimeout(() => {
        if (mealCalories[mealInput]) {
            resultDiv.innerHTML = `Calories in ${mealInput}: ${mealCalories[mealInput]} kcal`;
        } else {
            resultDiv.innerHTML = `Meal not found. Please try another meal.`;
        }

        // Show the result after updating the text
        resultDiv.classList.remove('hide');
        resultDiv.classList.add('show');
    }, 300); // Delay to allow the hide transition to complete
});