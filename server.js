const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

const aipExclusions = [
    'milk', 'cheese', 'butter', 'cream', 'yogurt', 'whey', 'casein', 'ghee', 'soy', 
    'tofu', 'soy+sauce', 'edamame', 'peanuts', 'beans', 'lentils', 'peas', 'chickpeas', 
    'wheat', 'barley', 'rye', 'oats', 'corn', 'rice', 'quinoa', 'spelt', 'sorghum', 
    'bulgur', 'millet', 'farro', 'gluten', 'seitan', 'couscous', 'bread', 'pasta', 
    'flour', 'tomatoes', 'potatoes', 'eggplants', 'peppers', 'chili', 'jalapeno', 
    'paprika', 'cayenne', 'bell+pepper', 'sugar', 'brown+sugar', 'cane+sugar', 
    'high+fructose+corn+syrup', 'sweetener', 'aspartame', 'sucralose', 'MSG', 'maltodextrin', 
    'corn+syrup', 'agave', 'maple+syrup', 'molasses', 'canola+oil', 'vegetable+oil', 
    'margarine', 'shortening', 'corn+oil', 'soybean+oil', 'sunflower+oil', 'egg', 
    'egg+whites', 'egg+yolk', 'mayonnaise', 'bacon', 'sausage', 'ham', 'salami', 
    'hot+dog', 'deli+meat', 'processed+meat', 'mustard+seeds', 'sesame+seeds', 'sunflower+seeds', 
    'pumpkin+seeds', 'chia+seeds', 'almonds', 'cashews', 'walnuts', 'hazelnuts', 'pecans', 
    'pistachios', 'coffee', 'tea', 'beer', 'wine', 'liquors', 'artificial+flavors', 'artificial+colors',
    'preservatives', 'food+additives', 'artificial+sweeteners'
];

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch recipes
app.get('/api/recipes', async (req, res) => {
    const { query, mealType, cuisineType } = req.query;
    const API_ID = 'def157b5';  // Replace with your actual App ID
    const API_KEY = '449e8a51583638703d9c860ea75693d1';  // Replace with your actual App Key
    
    // Build the base URL for the Edamam API
    let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&q=${encodeURIComponent(query)}`;

    // Include mealType and cuisineType if provided
    if (mealType) url += `&mealType=${encodeURIComponent(mealType)}`;
    if (cuisineType) url += `&cuisineType=${encodeURIComponent(cuisineType)}`;

    // Exclude AIP-restricted ingredients
    aipExclusions.forEach(exclusion => {
        url += `&excluded=${exclusion}`;
    });

    try {
        // Fetch data from the Edamam API
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Edamam API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data from Edamam API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

