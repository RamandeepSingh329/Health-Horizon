const JUNK_FOOD_KEYWORDS = [
    "pizza", "burger", "fries", "soda", "coke", "pepsi", "donut", "cake", "cookie",
    "candy", "chocolate", "ice cream", "chips", "crisps", "pastry", "fried", "sugary",
    "processed", "instant noodles", "fast food", "dips", "gravy", "syrup", "artificial sweetener"
    // Add more keywords as needed
];

const HEALTH_RISKS = {
    "pizza": "High in calories, unhealthy fats, and sodium. Excessive consumption may contribute to weight gain, heart disease, and high blood pressure.",
    "burger": "Often high in saturated fat, cholesterol, and sodium. Frequent intake can increase the risk of heart disease and obesity.",
    "fries": "Typically deep-fried, leading to high levels of unhealthy fats and calories. May contribute to weight gain and increased risk of heart disease.",
    "soda": "Loaded with sugar and empty calories. Linked to weight gain, type 2 diabetes, tooth decay, and increased risk of heart disease.",
    "coke": "High in sugar and empty calories, similar risks to soda.",
    "pepsi": "High in sugar and empty calories, similar risks to soda.",
    "donut": "High in sugar and unhealthy fats. Can lead to weight gain and increase the risk of type 2 diabetes and heart disease.",
    "cake": "Often high in sugar, unhealthy fats, and refined flour. Excessive consumption can contribute to weight gain and increased risk of chronic diseases.",
    "cookie": "Many are high in sugar and unhealthy fats. Frequent consumption can lead to weight gain and other health issues.",
    "candy": "Primarily composed of sugar and artificial ingredients. Contributes to tooth decay, weight gain, and potential blood sugar imbalances.",
    "chocolate": "While dark chocolate in moderation can have benefits, many commercial chocolates are high in sugar and unhealthy fats. Excessive intake can lead to weight gain.",
    "ice cream": "High in sugar and unhealthy fats. Can contribute to weight gain and increase the risk of type 2 diabetes and heart disease.",
    "chips": "Often high in unhealthy fats and sodium. Excessive consumption can lead to weight gain and high blood pressure.",
    "crisps": "Similar to chips, high in unhealthy fats and sodium.",
    "pastry": "Typically high in unhealthy fats, sugar, and refined flour. Can contribute to weight gain and increase the risk of chronic diseases.",
    "fried": "Foods prepared by frying are generally high in unhealthy fats and calories, increasing the risk of heart disease and weight gain.",
    "sugary": "Excessive intake of sugary foods and drinks is linked to weight gain, type 2 diabetes, heart disease, and tooth decay.",
    "processed": "Processed foods often contain high levels of sodium, unhealthy fats, and artificial ingredients, increasing the risk of various health problems.",
    "instant noodles": "Often high in sodium and unhealthy fats, with low nutritional value. Frequent consumption is linked to poor diet quality and increased risk of metabolic syndrome.",
    "fast food": "Generally high in calories, unhealthy fats, sodium, and processed ingredients. Regular consumption increases the risk of obesity, heart disease, and other health issues.",
    "dips": "Many commercially prepared dips are high in unhealthy fats, sodium, and calories.",
    "gravy": "Can be high in unhealthy fats and sodium, especially when made with processed ingredients.",
    "syrup": "Typically high in sugar and empty calories, contributing to weight gain and increased risk of related health problems.",
    "artificial sweetener": "While used as a sugar substitute, some studies suggest potential links to gut health issues and increased cravings for sweet foods. More research is ongoing."
    // Add more food items and their potential risks as needed
};

function isJunkFood(foodName) {
    const lowerCaseFoodName = foodName.toLowerCase();
    return JUNK_FOOD_KEYWORDS.some(keyword => lowerCaseFoodName.includes(keyword));
}

function getPotentialRisks(foodName) {
    const lowerCaseFoodName = foodName.toLowerCase();
    for (const keyword in HEALTH_RISKS) {
        if (lowerCaseFoodName.includes(keyword)) {
            return HEALTH_RISKS[keyword];
        }
    }
    return "No specific high-risk information found for this food in our database.";
}

function provideSuggestion(foodName) {
    if (isJunkFood(foodName)) {
        const risks = getPotentialRisks(foodName);
        return `This food might be high in processed ingredients, sugar, or unhealthy fats. ${risks} Consider consuming it in moderation and balancing your diet with more fruits, vegetables, and whole grains.`;
    } else {
        return "This food doesn't strongly match our list of potentially unhealthy items. However, always maintain a balanced diet.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const detectButton = document.getElementById('detect-btn');
    const foodNameInput = document.getElementById('food-name');
    const detectionResultDiv = document.getElementById('detection-result');
    const suggestionAreaParagraph = document.getElementById('suggestion-area');
    const resultHeading = document.querySelector('.result-area h2');
    const body = document.body;

    detectButton.addEventListener('click', () => {
        const foodName = foodNameInput.value.trim();

        // Clear previous results and body classes
        detectionResultDiv.className = '';
        detectionResultDiv.innerHTML = '';
        suggestionAreaParagraph.className = '';
        suggestionAreaParagraph.textContent = '';
        resultHeading.innerHTML = '<i class="fas fa-search"></i> Detection Result:';
        body.classList.remove('unhealthy-hover', 'healthy-hover');

        if (foodName) {
            if (isJunkFood(foodName)) {
                body.classList.add('unhealthy-hover');
                resultHeading.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Detection Result:';
                const unhealthySpan = document.createElement('span');
                unhealthySpan.textContent = 'Potentially Unhealthy';
                unhealthySpan.classList.add('unhealthy-visual');
                const warningIcon = document.createElement('i');
                warningIcon.classList.add('fas', 'fa-times-circle');
                detectionResultDiv.appendChild(warningIcon);
                detectionResultDiv.appendChild(unhealthySpan);
                suggestionAreaParagraph.textContent = provideSuggestion(foodName);
                suggestionAreaParagraph.classList.add('warning-visual');
            } else {
                body.classList.add('healthy-hover');
                resultHeading.innerHTML = '<i class="fas fa-check-circle"></i> Detection Result:';
                const healthySpan = document.createElement('span');
                healthySpan.textContent = 'Likely Okay';
                healthySpan.classList.add('healthy-visual');
                const checkIcon = document.createElement('i');
                checkIcon.classList.add('fas', 'fa-check-circle');
                detectionResultDiv.appendChild(checkIcon);
                detectionResultDiv.appendChild(healthySpan);
                suggestionAreaParagraph.textContent = provideSuggestion(foodName);
            }
        } else {
            resultHeading.innerHTML = '<i class="fas fa-question-circle"></i> Detection Result:';
            detectionResultDiv.textContent = "Please enter a food name.";
        }
    });

    foodNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            detectButton.click();
        }
    });

    // Revert background on mouseout of the body (optional)
    body.addEventListener('mouseout', () => {
        body.classList.remove('unhealthy-hover', 'healthy-hover');
    });
});