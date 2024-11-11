document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('query').value;
    const mealType = document.getElementById('mealType').value;
    const cuisineType = document.getElementById('cuisineType').value;

    try {
        const response = await fetch(`/api/recipes?query=${query}&mealType=${mealType}&cuisineType=${cuisineType}`);
        const data = await response.json();

        displayResults(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        document.getElementById('results').innerHTML = '<p>Error loading recipes.</p>';
    }
});

function displayResults(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Check if recipes data is valid
    if (!recipes || recipes.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach((recipeData) => {
        const recipe = recipeData.recipe;
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
            <h3>${recipe.label}</h3>
            <img src="${recipe.image}" alt="${recipe.label}">
            <p><a href="${recipe.url}" target="_blank">View Recipe</a></p>
        `;

        resultsContainer.appendChild(recipeDiv);
    });

}
