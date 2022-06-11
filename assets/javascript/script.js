var searchBtn = document.querySelector('.search-btn')
var landingSearch = document.getElementById('landing-search')
var resultsSearch = document.getElementById('results-search')
var resultsContainer = document.querySelector('.results-container');

const recipeApi = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'da5647db3emsh4b6e6a9f196c9c3p10549ejsn3ebf75e33dcb',
        'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
    }
};

const nutritionApi = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'da5647db3emsh4b6e6a9f196c9c3p10549ejsn3ebf75e33dcb',
        'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
    }
};

// var userText = searchBarInput.text;
// console.log(userText)

function searchClick(event) {
    event.preventDefault();
    var searchBarInput = document.querySelector('.search-input').value;
    console.log(searchBarInput)
    // build first url request
    var recipeString = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=' + searchBarInput;
    console.log(recipeString)
    // build second url request
    var nutritionString = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + searchBarInput;
    console.log(nutritionString)
    // Call fetch functions
    recipeQuery(recipeString);
    nutritionQuery(nutritionString);
    console.log(location)
    //window.location.href = 'results-page.html';
    // return variables to use in fetch functions
    return nutritionString, recipeString;
}



function recipeQuery(recipeString) {
    //fetch with built URL to return recipe info
    fetch(recipeString, {
        headers: {
            'X-RapidAPI-Key': 'da5647db3emsh4b6e6a9f196c9c3p10549ejsn3ebf75e33dcb',
            'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
        }
    })

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var resultArray = data;
            displayResult(resultArray);
            return resultArray;
        })
}


function nutritionQuery(nutritionString) {
    //fetch built with URL to return nutritional info
    fetch(nutritionString, {
        headers: {
            'X-RapidAPI-Key': 'da5647db3emsh4b6e6a9f196c9c3p10549ejsn3ebf75e33dcb',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    })

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            //return one object
        })
}


function saveFavorites() {
    // Set variable for favorites and throw it into and array 
    var storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    // Get string from search input field   
    var favoritesText = document.querySelector('.search-input').value.trim();
    // Store the string
    storedFavorites.push(favoritesText)
    // set the key as Favorites
    localStorage.setItem('favorites',JSON.stringify(storedFavorites));
    // Log local storage
    console.log(storedFavorites)
}

function displayResult(resultArray) {
    console.log(resultArray)
    resultArray.forEach(element => {

        // Creates master div to house children
        var resultCard = document.createElement('div');
 
        // Creates H3 for title within card, sets text, and appends
        var title = document.createElement('h3');
        console.log(element.title);
        title.textContent = element.title;
        title.setAttribute = 'title-header';
        resultCard.append(title);

        // Creates H4 for Serving sizes within card, sets text, and appends
        var servings = document.createElement('h4');
        servings.textContent = element.servings;
        servings.setAttribute = "servings-header";
        resultCard.append(servings);

        // Creates H4 for title within card, sets text, and appends
        var ingHeader = document.createElement('h4');
        ingHeader.textContent = "Ingredients: ";
        ingHeader.className = "ing-header";
        ingHeader.setAttribute = "ing-list" ;
        resultCard.append(ingHeader);

        // Splits ingredient string at "|" and returns array called ingArr. 
        // Creates UL to house individual ingredients
        var ingArr = element.ingredients.split('|');
        console.log(ingArr)
        var ingUL = document.createElement('ul');

        // Loops ingredient list and creates li for each ingredient and appends to ul
        for (let i = 0; i < ingArr.length; i++) {
            var ingList = document.createElement('li');
            ingList.textContent = ingArr[i];
            ingUL.append(ingList);
        }

        // Appends the ul to the result card
        resultCard.append(ingUL);


        var recipe = document.createElement('p');
        recipe.textContent = element.instructions;
        recipe.setAttribute = "recipe-description";
        resultCard.append(recipe);

        // Appends all created elements in card to parent container
        resultsContainer.append(resultCard);
        resultCard.className = 'recipe-card'
        var recipeCard = document.querySelector('.recipe-card');
        // Adds eventListener for each recipe card
       
    })
 
}



function recipeShow(event) {
    if (event.target.matches(".recipe-card")){
        console.log(event.target);
        chosenRecipe = event.target;
        var modal = document.querySelector('.modal');
        var recipeModal = document.createElement('div');
        modal.className = ('show');
        modal.append(recipeModal);
    }

    var recipeTitle = chosenRecipe.querySelector('title-header');
    var recipeServings = chosenRecipe.querySelector('servings-header');
    var recipeIng = chosenRecipe.querySelector('ing-header');
    var recipeDes = chosenRecipe.querySelector('recipe-description');

    var modalTitle = document.createElement('h3');
    console.log(element.title);
    modalTitle.textContent = recipeTitle;
    resultCard.append(title);

    // Creates H4 for Serving sizes within card, sets text, and appends
    var Modalservings = document.createElement('h4');
    Modalservings.textContent = recipeServings;
    resultCard.append(servings);

    // Creates H4 for title within card, sets text, and appends
    var modalIng = document.createElement('h4');
    modalIng.textContent = recipeIng;
    resultCard.append(ingHeader);

    var modalInst = document.createElement('h4');
    modalInst.textContent = recipeDes;
    resultCard.append(ingHeader);

    // document.location = "./recipe-page.html"
    // var recipeContainer = document.querySelector('.recipe-container')
}

searchBtn.addEventListener('click', searchClick);
searchBtn.addEventListener('click', saveFavorites);
resultsContainer.addEventListener('click', recipeShow);

// resultArray.forEach(element => {

//     // Creates master div to house children
//     var recipeDiv = document.createElement('div');

//     // Creates H3 for title within card, sets text, and appends
//     var title = document.createElement('h3');
//     console.log(element.title);
//     title.textContent = element.title;
//     recipeDiv.append(title);

//     // Creates H4 for Serving sizes within card, sets text, and appends
//     var servings = document.createElement('h4');
//     servings.textContent = element.servings;
//     recipeDiv.append(servings);

//     // Creates H4 for title within card, sets text, and appends
//     var ingHeader = document.createElement('h4');
//     ingHeader.textContent = "Ingredients: "
//     recipeDiv.append(ingHeader);

//     // Splits ingredient string at "|" and returns array called ingArr. 
//     // Creates UL to house individual ingredients
//     var ingArr = element.ingredients.split('|');
//     console.log(ingArr)
//     var ingUL = document.createElement('ul');

//     // Loops ingredient list and creates li for each ingredient and appends to ul
//     for (let i = 0; i < ingArr.length; i++) {
//         var ingList = document.createElement('li');
//         ingList.textContent = ingArr[i];
//         ingUL.append(ingList);
//     resultCard.append(ingUL);
//     // Appends all created elements in card to parent container
//     recipeContainer.append(resultCard);
// })
// }





   
   
   
   
   
   
    
   
    
    
    
    



// function displayRecipeResults(recipeArray) {

//     // create HTML elements with cards to show recipe info w/ first 5 ingredients
//     // populate cards with info from object array
//     // add event listeners to both recipe buttons
//     // add button for "start cooking!" and one for "favorite this recipe"

// }


// function recipeInfo(chosenRecipe) {

//     // display recipe from chosen recipe
//     // display sliced ingredient list
// }


// function nutritionInfo(chosenRecipeNut) {

//     // display nutritional info from chosen recipe
//     // populate HTML with corresponding info

// }

// search button event listener