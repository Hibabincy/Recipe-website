// Slider Images
let sliderImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // Dish 1
    "https://images.unsplash.com/photo-1554907253-5f1d721e3586", // Dish 2
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"  // Dish 3
  ];
  let currentIndex = 0;
  
  // Select Slider HTML Elements
  const sliderImg = document.getElementById("slider-img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  
  // Function to Update Slider Image
  function updateSliderImage() {
    if (sliderImages.length > 0) {
      sliderImg.src = sliderImages[currentIndex];
      sliderImg.alt = `Dish ${currentIndex + 1}`;
    } else {
      sliderImg.src = "https://via.placeholder.com/600x300?text=No+Image+Available";
      sliderImg.alt = "No Image Available";
    }
  }
  
  // Event Listeners for Slider Buttons
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
    updateSliderImage();
  });
  
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % sliderImages.length;
    updateSliderImage();
  });
  
  // Initial Slider Load
  updateSliderImage();
  
  // Select Random Recipe HTML Elements
  const recipeTitle = document.getElementById("recipe-title");
  const recipeImage = document.getElementById("recipe-image");
  const recipeInstructions = document.getElementById("recipe-instructions");
  const generateRecipeBtn = document.getElementById("generate-recipe-btn");
  
  // Default fallback image (if no image is available from the API)
  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";
  
  // Function to Fetch a Random Recipe
  async function fetchRandomRecipe() {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
  
      if (data.meals && data.meals.length > 0) {
        const recipe = data.meals[0];
  
        // Update HTML Elements with Recipe Data
        recipeTitle.textContent = recipe.strMeal;
        recipeImage.src = recipe.strMealThumb || fallbackImage; // Use the API image or fallback
        recipeImage.alt = recipe.strMeal; // Add alt text for accessibility
        recipeInstructions.textContent = recipe.strInstructions || "Instructions not available.";
      } else {
        throw new Error("No recipe data found.");
      }
    } catch (error) {
      // Display error message and fallback data
      recipeTitle.textContent = "Failed to load recipe. Please try again.";
      recipeImage.src = fallbackImage;
      recipeImage.alt = "No Image Available";
      recipeInstructions.textContent = "";
      console.error("Error fetching recipe:", error);
    }
  }
  
  // Load a Random Recipe When Page Loads
  fetchRandomRecipe();
  
  // Fetch a New Random Recipe on Button Click
  generateRecipeBtn.addEventListener("click", fetchRandomRecipe);
  
  // Select Search Recipes HTML Elements
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const searchResults = document.getElementById("search-results");
  
  // Function to Search Recipes
  async function searchRecipes() {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.innerHTML = "<p>Please enter a search term.</p>";
      return;
    }
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
  
      if (data.meals) {
        searchResults.innerHTML = data.meals
          .map(
            (meal) => `
          <div>
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 200px; border-radius: 5px;">
            <p>${meal.strInstructions.substring(0, 150)}...</p>
          </div>
        `
          )
          .join("");
      } else {
        searchResults.innerHTML = "<p>No recipes found. Try a different search term.</p>";
      }
    } catch (error) {
      searchResults.innerHTML = "<p>Failed to fetch recipes. Please try again later.</p>";
      console.error("Error fetching recipes:", error);
    }
  }
  
  // Add Event Listener to Search Button
  searchBtn.addEventListener("click", searchRecipes);
  