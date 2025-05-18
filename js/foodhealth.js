// Complete food database with detailed information
const foodDetails = {
    // Junk and Street Foods
    "pav bhaji": {
        explanation: "A buttery mix of mashed vegetables served with soft, buttery bread rolls.",
        nutritionalAspects: ["High in butter and unhealthy fats", "High in refined carbs"],
        advice: "Opt for less butter and whole wheat bread.",
        sideEffects: "Excess butter intake may contribute to cholesterol issues."
    },
    "chole bhature": {
        explanation: "Spicy chickpea curry paired with deep-fried refined flour bread.",
        nutritionalAspects: ["High in refined carbohydrates", "High in unhealthy fats"],
        advice: "Choose whole wheat bhature or limit intake.",
        sideEffects: "Overeating can lead to bloating and weight gain."
    },
    "maggi (instant noodles)": {
        explanation: "Processed instant noodles with preservatives and sodium-heavy seasonings.",
        nutritionalAspects: ["High in sodium", "Low in nutritional value"],
        advice: "Prefer homemade wheat or millet noodles.",
        sideEffects: "May increase risk of high blood pressure."
    },
    "gulab jamun": {
        explanation: "Deep-fried milk-based sweet soaked in sugar syrup.",
        nutritionalAspects: ["Very high in sugar", "High in unhealthy fats"],
        advice: "Enjoy occasionally; consider baked alternatives.",
        sideEffects: "Excess sugar may contribute to diabetes."
    },
    "rasgulla": {
        explanation: "Sweet dumplings soaked in sugary syrup, made from cottage cheese.",
        nutritionalAspects: ["Very high in sugar", "Moderate protein"],
        advice: "Consume in moderation.",
        sideEffects: "May contribute to excessive sugar intake."
    },
    "patty (indian-style burger)": {
        explanation: "Deep-fried potato patty inside a bun with sauces.",
        nutritionalAspects: ["High in refined carbs", "High in unhealthy fats"],
        advice: "Opt for baked or grilled options.",
        sideEffects: "Can increase risk of obesity."
    },
    "kurkure": {
        explanation: "Crunchy processed snack high in artificial flavors and sodium.",
        nutritionalAspects: ["High in unhealthy fats", "High in sodium", "Contains artificial additives"],
        advice: "Limit intake and choose healthier alternatives.",
        sideEffects: "May impact gut health and sodium levels."
    },
    "bhujia": {
        explanation: "Crispy, deep-fried snack made from chickpea flour, often spiced.",
        nutritionalAspects: ["High in unhealthy fats", "High in sodium", "Contains artificial flavors"],
        advice: "Enjoy in moderation, opt for baked bhujia or similar snacks.",
        sideEffects: "Excessive consumption can lead to weight gain and digestive issues."
    },
    "chips": {
        explanation: "Thin slices of potato or other vegetables, fried and salted.",
        nutritionalAspects: ["High in unhealthy fats", "High in sodium"],
        advice: "Choose baked chips or make your own at home with less oil.",
        sideEffects: "Can contribute to high blood pressure and weight gain."
    },
    "burger": {
        explanation: "A sandwich consisting of a patty, typically made of beef, served in a bun.",
        nutritionalAspects: ["High in refined carbohydrates", "High in saturated fats"],
        advice: "Opt for grilled chicken or plant-based patties for a healthier alternative.",
        sideEffects: "Excessive consumption can lead to weight gain and heart problems."
    },
    "fried chicken": {
        explanation: "Chicken pieces breaded and deep-fried, often served with sauces.",
        nutritionalAspects: ["High in unhealthy fats", "High in calories"],
        advice: "Grilled or baked chicken is a healthier option.",
        sideEffects: "Frequent consumption may lead to high cholesterol and obesity."
    },
    "pizza": {
        explanation: "A dish of Italian origin consisting of a usually round, flat base topped with cheese, tomatoes, and other ingredients.",
        nutritionalAspects: ["High in refined carbs", "High in saturated fats"],
        advice: "Choose thin crust and load up with vegetables for a healthier option.",
        sideEffects: "Excess pizza can lead to weight gain and increased risk of heart disease."
    },
    "donuts": {
        explanation: "Fried dough pastry, often glazed with sugar.",
        nutritionalAspects: ["High in sugar", "High in unhealthy fats"],
        advice: "Enjoy occasionally, opt for baked donuts with natural sweeteners.",
        sideEffects: "Excess sugar can contribute to obesity and diabetes."
    },
    "soda": {
        explanation: "Sweetened carbonated drink often high in sugar and caffeine.",
        nutritionalAspects: ["High in sugar", "Contains caffeine and artificial flavors"],
        advice: "Choose water, coconut water, or herbal teas instead.",
        sideEffects: "Excess sugar and caffeine may lead to dehydration, weight gain, and heart problems."
    },
    // Healthy Foods
    "dal khichdi": {
        explanation: "Nutritious mix of rice and lentils, easy to digest.",
        nutritionalAspects: ["High in protein", "Rich in fiber", "Contains essential nutrients"],
        advice: "Ideal for a balanced diet.",
        sideEffects: "No major side effects."
    },
    "thepla": {
        explanation: "Gujarati flatbread made with fenugreek leaves and whole wheat flour.",
        nutritionalAspects: ["Rich in fiber", "Contains vitamins", "High in complex carbohydrates"],
        advice: "Pair with yogurt for added nutrition.",
        sideEffects: "Can be oily if prepared with excess ghee."
    },
    "ragi dosa": {
        explanation: "Healthy alternative to regular dosa made with finger millet.",
        nutritionalAspects: ["High in calcium", "Rich in fiber", "Gluten-free"],
        advice: "Pair with coconut chutney for a nutritious meal.",
        sideEffects: "Generally safe unless consumed excessively."
    },
    "fruit chaat": {
        explanation: "Fresh fruit salad spiced lightly.",
        nutritionalAspects: ["High in fiber", "Rich in vitamins", "Natural antioxidants"],
        advice: "Perfect as a snack or dessert.",
        sideEffects: "Avoid overuse of salt or spice."
    },
    "methi paratha": {
        explanation: "Whole wheat flatbread infused with fenugreek leaves.",
        nutritionalAspects: ["Rich in fiber", "Contains iron", "Good source of vitamins"],
        advice: "Use minimal oil for better health benefits.",
        sideEffects: "Excess fenugreek may cause digestive issues."
    },
    "chana (boiled chickpeas)": {
        explanation: "High-protein snack with excellent fiber content.",
        nutritionalAspects: ["High in protein", "Rich in fiber", "Low in unhealthy fats"],
        advice: "Great for weight management.",
        sideEffects: "Can cause bloating if eaten in excess."
    },
    // Additional Street Foods
    "bhel puri": {
        explanation: "A popular Indian street food made of puffed rice, vegetables, and tangy tamarind sauce.",
        nutritionalAspects: ["Rich in carbohydrates", "Contains fiber from vegetables", "Low in fats"],
        advice: "Ideal as a light snack but avoid excess tamarind or chutney for better digestion.",
        sideEffects: "Too much chutney may upset the stomach due to high acidity."
    },
    "pani puri": {
        explanation: "A crispy hollow puri filled with spicy water, chickpeas, potatoes, and tamarind.",
        nutritionalAspects: ["High in carbohydrates", "Contains fiber from chickpeas", "Rich in spices"],
        advice: "Enjoy in moderation, opt for less spicy water if sensitive to heat.",
        sideEffects: "Spicy food may irritate sensitive stomachs or lead to acid reflux."
    },
    "samosa": {
        explanation: "A deep-fried pastry filled with spiced potatoes, peas, or meat.",
        nutritionalAspects: ["High in refined carbs", "High in unhealthy fats from frying"],
        advice: "Baked samosas are a healthier option.",
        sideEffects: "Excessive consumption may lead to weight gain and digestive issues."
    },
    "kebabs": {
        explanation: "Grilled or roasted skewers of marinated meat, often served with chutneys.",
        nutritionalAspects: ["High in protein", "Contains healthy fats if grilled"],
        advice: "Opt for grilled or baked kebabs, avoid deep frying.",
        sideEffects: "Excessive consumption of meat may lead to high cholesterol."
    },
    "vada pav": {
        explanation: "A popular street food in India consisting of a spicy potato fritter in a bun.",
        nutritionalAspects: ["High in refined carbs", "High in unhealthy fats from frying"],
        advice: "Opt for baked versions or limit intake.",
        sideEffects: "May lead to weight gain and digestive discomfort if consumed frequently."
    },
    "namkeen": {
        explanation: "Assorted salty snacks like spiced nuts, lentils, or chips.",
        nutritionalAspects: ["High in sodium", "Contains unhealthy fats", "Rich in preservatives"],
        advice: "Consume in moderation or prepare homemade namkeen.",
        sideEffects: "Excess sodium can lead to high blood pressure."
    },
    // Indian Dessert Sweets
    "jalebi": {
        explanation: "Sweet, deep-fried dessert soaked in sugar syrup, often shaped in spirals.",
        nutritionalAspects: ["Very high in sugar", "Contains unhealthy fats"],
        advice: "Enjoy occasionally in moderation.",
        sideEffects: "Excess sugar may contribute to obesity and diabetes."
    },
    "ladoos": {
        explanation: "Sweet ball-shaped desserts made from ingredients like flour, ghee, and sugar.",
        nutritionalAspects: ["High in sugar", "High in ghee/fats"],
        advice: "Consume in moderation, opt for lower sugar versions.",
        sideEffects: "Excess sugar and fats may lead to weight gain and cholesterol issues."
    },
    "kheer": {
        explanation: "Rice pudding made with milk, sugar, and flavored with cardamom and saffron.",
        nutritionalAspects: ["High in sugar", "High in dairy"],
        advice: "Opt for less sugar and low-fat milk for a healthier version.",
        sideEffects: "High sugar intake can contribute to diabetes."
    },
    "barfi": {
        explanation: "A dense, milk-based sweet, often flavored with cardamom and garnished with nuts.",
        nutritionalAspects: ["High in sugar", "High in fats from condensed milk and ghee"],
        advice: "Enjoy as an occasional treat.",
        sideEffects: "Excess consumption can increase blood sugar levels."
    },
    "rasgulla": {
        explanation: "Spongy sweets made from cottage cheese soaked in sugary syrup.",
        nutritionalAspects: ["Moderate in sugar", "Contains protein from cottage cheese"],
        advice: "Consume in moderation.",
        sideEffects: "Can contribute to high sugar levels if consumed excessively."
    },
    "gulab jamun": {
        explanation: "Deep-fried dough balls made from milk solids, soaked in sugar syrup.",
        nutritionalAspects: ["Very high in sugar", "High in unhealthy fats"],
        advice: "Enjoy sparingly, as it's very rich in sugar and fats.",
        sideEffects: "Overconsumption may lead to weight gain and increased blood sugar levels."
    },
    "sandesh": {
        explanation: "A Bengali sweet made from fresh paneer or chhena, often flavored with saffron or cardamom.",
        nutritionalAspects: ["Moderate in sugar", "Contains protein from paneer"],
        advice: "Enjoy occasionally in moderation.",
        sideEffects: "Excess sugar intake can cause health issues."
    }
};

// Initialize voice recognition
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

document.getElementById("voice-input-btn").addEventListener("click", () => {
    recognition.start();
    document.getElementById("detection-result").textContent = "Listening...";
});

recognition.onresult = function (event) {
    const foodName = event.results[0][0].transcript;
    document.getElementById("detection-result").textContent = `You said: ${foodName}`;

    // Trigger detection & analysis
    analyzeFoodName(foodName);
};

// Function to analyze the food name and get data
function analyzeFoodName(foodName) {
    if (!foodName) {
        alert("Please enter a food name.");
        return;
    }

    document.getElementById("detection-result").textContent = `Analyzing: ${foodName}`;
    document.getElementById("suggestion-area").innerHTML = "";

    const foodKey = getMatchingFoodKey(foodName);
    if (foodKey) {
        const info = foodDetails[foodKey];
        document.getElementById("suggestion-area").innerHTML = `
            <strong>${foodName}</strong>: ${info.explanation} <br>
            <strong>Nutritional aspects:</strong> ${info.nutritionalAspects.join(", ")}.<br>
            <strong>Advice:</strong> ${info.advice}.<br>
            <strong>Potential Health Side Effects:</strong> ${info.sideEffects}
        `;
    } else {
        document.getElementById("suggestion-area").innerHTML = `Sorry, "${foodName}" not found in the local food list.`;
    }
}

// Function to get matching food key (more robust matching)
function getMatchingFoodKey(foodName) {
    if (!foodName) return null;

    const lowerName = foodName.toLowerCase().trim();

    // First, try for an exact match
    for (const key in foodDetails) {
        if (foodDetails.hasOwnProperty(key) && key.toLowerCase().trim() === lowerName) {
            return key;
        }
    }

    // If no exact match, try to find a key whose words are all present in the spoken name (order doesn't matter)
    const nameWords = lowerName.split(/\s+/).filter(word => word.length > 0);
    for (const key in foodDetails) {
        if (foodDetails.hasOwnProperty(key)) {
            const keyWords = key.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
            if (nameWords.length > 0 && keyWords.every(keyWord => nameWords.includes(keyWord))) {
                return key;
            }
        }
    }

    // If no strong match, try to find a key that *includes* at least one word from the spoken name (longer words prioritized)
    nameWords.sort((a, b) => b.length - a.length); // Sort by length descending
    for (const key in foodDetails) {
        if (foodDetails.hasOwnProperty(key)) {
            const lowerKey = key.toLowerCase().trim();
            if (nameWords.some(word => lowerKey.includes(word))) {
                return key;
            }
        }
    }

    return null;
}

// Manual input support
document.getElementById("analyze-food-btn").addEventListener("click", () => {
    const input = document.getElementById("manual-food-name").value.trim();
    analyzeFoodName(input);
});