let net;

// Updated junkFoodDetails to include 'sideEffects'
const junkFoodDetails = {
    "pizza": {
        explanation: "Often high in refined carbohydrates, unhealthy saturated fats, and sodium.",
        nutritionalAspects: ["High in calories", "High in saturated fat", "High in sodium"],
        advice: "Consume in moderation.",
        sideEffects: "Frequent consumption may lead to weight gain, increased risk of heart disease, and high blood pressure."
    },
    "burger": {
        explanation: "Typically contains a processed meat patty high in saturated fat and cholesterol.",
        nutritionalAspects: ["High in saturated fat", "High in cholesterol", "Moderate to high in sodium"],
        advice: "Choose lean meat and whole-wheat buns.",
        sideEffects: "Excessive intake may contribute to obesity and heart disease."
    },
    "fries": {
        explanation: "Deep-fried potatoes high in unhealthy fats and calories.",
        nutritionalAspects: ["High in calories", "High in unhealthy fats", "High in sodium"],
        advice: "Try baked or air-fried alternatives.",
        sideEffects: "Regular consumption can increase the risk of weight gain and cardiovascular problems."
    },
    "soda": {
        explanation: "Loaded with added sugars and empty calories.",
        nutritionalAspects: ["Extremely high in added sugars", "High in calories"],
        advice: "Limit or avoid entirely.",
        sideEffects: "Long-term consumption can lead to obesity, diabetes, and tooth decay."
    },
    "coke": {
        explanation: "Very high in added sugars and provides no nutritional benefits.",
        nutritionalAspects: ["Extremely high in added sugars", "High in calories"],
        advice: "Limit or avoid entirely.",
        sideEffects: "Can increase the risk of metabolic disorders, obesity, and type 2 diabetes."
    },
    "pepsi": {
        explanation: "Similar to Coke, high sugar content with no nutritional value.",
        nutritionalAspects: ["Extremely high in added sugars", "High in calories"],
        advice: "Limit or avoid entirely.",
        sideEffects: "Can contribute to obesity and diabetes."
    },
    "donut": {
        explanation: "Deep-fried and coated in sugar, high in unhealthy fats and added sugars.",
        nutritionalAspects: ["High in saturated and trans fats", "Very high in added sugars"],
        advice: "Consider healthier breakfast options.",
        sideEffects: "Can contribute to weight gain and increased risk of heart disease."
    },
    "cake": {
        explanation: "Often high in refined flour, sugar, and unhealthy fats.",
        nutritionalAspects: ["High in refined carbohydrates", "High in added sugars", "High in unhealthy fats"],
        advice: "Enjoy in small portions.",
        sideEffects: "Frequent consumption increases the risk of diabetes and obesity."
    },
    "cookie": {
        explanation: "Many are high in sugar and unhealthy fats.",
        nutritionalAspects: ["High in added sugars", "High in unhealthy fats"],
        advice: "Choose whole-grain options in moderation.",
        sideEffects: "Can lead to weight gain and increased risk of diabetes and heart disease."
    },
    "candy": {
        explanation: "Primarily made of sugar with no essential nutrients.",
        nutritionalAspects: ["Very high in added sugars"],
        advice: "Limit significantly.",
        sideEffects: "Contributes to tooth decay, blood sugar spikes, and potential weight gain."
    },
    "chocolate": {
        explanation: "Many commercial types are high in sugar and unhealthy fats.",
        nutritionalAspects: ["High in added sugars (most types)", "Moderate to high in unhealthy fats (most types)"],
        advice: "Choose dark chocolate in moderation.",
        sideEffects: "High sugar content can lead to obesity."
    },
    "ice cream": {
        explanation: "High in sugar and unhealthy saturated fats.",
        nutritionalAspects: ["High in added sugars", "High in saturated fat", "High in calories"],
        advice: "Enjoy as an occasional treat.",
        sideEffects: "Excessive intake can contribute to weight gain and heart disease."
    },
    "chips": {
        explanation: "Deep-fried and high in unhealthy fats and sodium.",
        nutritionalAspects: ["High in unhealthy fats", "High in sodium"],
        advice: "Opt for baked alternatives.",
        sideEffects: "Can lead to obesity and high blood pressure."
    },
    "crisps": {
        explanation: "Similar to chips, high in unhealthy fats and sodium.",
        nutritionalAspects: ["High in unhealthy fats", "High in sodium"],
        advice: "Choose healthier snack alternatives.",
        sideEffects: "Can negatively impact heart health."
    }
};

// Helper to match food keys flexibly
function getMatchingJunkFoodKey(foodName) {
    const lowerName = foodName.toLowerCase();
    for (const key in junkFoodDetails) {
        if (lowerName.includes(key)) {
            return key;
        }
    }
    return null;
}

// Function to check if a food item is considered junk food
function isJunkFood(foodName) {
    return getMatchingJunkFoodKey(foodName) !== null;
}

// Function to get potential side effects of junk food
function getJunkFoodSideEffects(foodName) {
    const matchedKey = getMatchingJunkFoodKey(foodName);
    return matchedKey ? junkFoodDetails[matchedKey].sideEffects : null;
}

// Function to analyze manually entered food name
function analyzeFoodName(foodName) {
    const cleanedFoodName = foodName.trim().toLowerCase();
    if (!cleanedFoodName) {
        alert("Please say or type a food name.");
        return;
    }

    document.getElementById("detection-result").textContent = "Analyzing food name...";
    document.getElementById("suggestion-area").textContent = '';
    document.getElementById("confidence-score").textContent = '';

    displayResult([{ className: cleanedFoodName }], 'manual');
}

// Display the results of the detection with more detail
function displayResult(predictions, source) {
    const detectionResultDiv = document.getElementById("detection-result");
    const suggestionAreaParagraph = document.getElementById("suggestion-area");
    const confidenceScoreParagraph = document.getElementById("confidence-score");

    if (predictions.length > 0) {
        const foodItem = predictions[0].className.toLowerCase();
        detectionResultDiv.textContent = `Detected: ${foodItem} (${source === 'manual' ? 'Manual Input' : 'Voice Input'})`;

        const detailedSuggestion = provideSuggestion(foodItem, source);
        suggestionAreaParagraph.innerHTML = detailedSuggestion;

        if (source === 'manual' && isJunkFood(foodItem)) {
            const sideEffects = getJunkFoodSideEffects(foodItem);
            if (sideEffects) {
                suggestionAreaParagraph.innerHTML += `<br><br><strong>Potential Health Side Effects:</strong> ${sideEffects}`;
            }
        }
    } else {
        detectionResultDiv.textContent = source === 'manual' ? "No information found for the entered food name." : "No food detected.";
        suggestionAreaParagraph.textContent = "";
        confidenceScoreParagraph.textContent = "";
    }
}

// Provide suggestion with detailed health explanation
function provideSuggestion(foodName, source) {
    const matchedKey = getMatchingJunkFoodKey(foodName);
    const details = matchedKey ? junkFoodDetails[matchedKey] : null;

    if (details) {
        return `This appears to be <strong>${foodName}</strong>. ${details.explanation} <br><strong>Nutritional aspects:</strong> ${details.nutritionalAspects.join(', ')}.<br><strong>Advice:</strong> ${details.advice}`;
    }

    return `You mentioned "<strong>${foodName}</strong>". Its health effect depends on its nutritional composition and frequency of intake.`;
}

// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Set up voice recognition to analyze food via voice input
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    const voiceButton = document.getElementById('voice-input-btn');
    voiceButton.addEventListener('click', () => {
        recognition.start();
        document.getElementById("detection-result").textContent = "Listening for food input...";
    });

    recognition.onresult = function (event) {
        const result = event.results[0][0].transcript;
        console.log("Voice input detected:", result);
        analyzeFoodName(result);
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event);
        document.getElementById("detection-result").textContent = "Error with voice recognition.";
    };

    // Event listener for manual input
    const manualButton = document.getElementById('analyze-food-btn');
    manualButton.addEventListener('click', () => {
        const foodName = document.getElementById('manual-food-name').value.trim();
        analyzeFoodName(foodName);
    });
});
