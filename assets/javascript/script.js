var searchBtn = document.querySelector('.search-btn')
var landingSearch = document.getElementById('landing-search')
var resultsSearch = document.getElementById('results-search')
var resultsContainer = document.querySelector('.results-container');
var favoritesBtn = document.querySelector('.favorites-btn')
var modal = document.querySelector('#modal')

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
            console.log(data);
            let nutritionData = data;
            nutritionModalPop(nutritionData);
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
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
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
        title.setAttribute("id", 'title-header');
        resultCard.append(title);

        // Creates H4 for Serving sizes within card, sets text, and appends
        var servings = document.createElement('h4');
        servings.textContent = element.servings;
        servings.setAttribute("id", "servings-header");
        resultCard.append(servings);

        // Creates H4 for title within card, sets text, and appends
        var ingHeader = document.createElement('h4');
        ingHeader.textContent = "Ingredients: ";
        ingHeader.className = "ing-header";
        ingHeader.setAttribute("id", "ing-list");
        resultCard.append(ingHeader);

        // Splits ingredient string at "|" and returns array called ingArr. 
        // Creates UL to house individual ingredients
        var ingArr = element.ingredients.split('|');
        console.log(ingArr)
        var ingUL = document.createElement('ul');
        ingUL.setAttribute('id', 'recipe-card-ul')

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
        recipe.setAttribute("id", "recipe-description");
        resultCard.append(recipe);

        // Appends all created elements in card to parent container
        resultsContainer.append(resultCard);
        resultCard.className = 'recipe-card'
        var recipeCard = document.querySelector('.recipe-card');
        // Adds eventListener for each recipe card

    })

}

function recipeShow(event) {
    // Ensures click target is a recipe card, then shows the modal

    let chosenRecipe;

    if (event.target.matches(".recipe-card")) {
        console.log(event.target);
        chosenRecipe = event.target;
        modal.className = ('show');
        var recipeModal = document.createElement('div');
        recipeModal.setAttribute('id', 'recipe-modal')
        modal.append(recipeModal);
    }

    // Selects elements out of the clicked recipe and gives them variables
    var recipeTitle = chosenRecipe.querySelector('#title-header');
    var recipeServings = chosenRecipe.querySelector('#servings-header');
    var recipeDes = chosenRecipe.querySelector('#recipe-description');

    var recipeIngList = (chosenRecipe.querySelectorAll('li'))


    // Gives variables to the text content of the querySelected HTML elements
    var chosenTitle = recipeTitle.textContent;
    var chosenServings = recipeServings.textContent;
    // var chosenIng = recipeIng.innerHTML;
    var chosenDes = recipeDes.textContent;

    // Creates h3 for title within modal, sets text, and appends.
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = chosenTitle;
    modal.append(modalTitle);

    // Creates H4 for Serving sizes within modal, sets text, and appends.
    var modalServings = document.createElement('h4');
    modalServings.textContent = chosenServings;
    modal.append(modalServings);

    // Creates H4 for title within modal, sets text, and appends
    var modalIng = document.createElement('ul');
    modalIng.setAttribute("id", "ingredients-ul");
    modal.append(modalIng);

    for (let i = 0; i < recipeIngList.length; i++) {
        const lineItem = recipeIngList[i];
        modalIng.append(lineItem);
    }
   
    // Creates h4 for instructions within modal, sets text, and appends. 
    var modalInst = document.createElement('h4');
    modalInst.textContent = " Instructions: " + chosenDes;
    modal.append(modalInst);
}

// Handles populating the nutritional data within the modal
function nutritionModalPop(data) {
    console.log(data);

    // Creates h3 element that holds nutrition info title
    var nutritionTitle = document.createElement('h3');
    nutritionTitle.textContent = 'Nutrition info: ';

    //deletes name property in object so as not to be redundant
    delete data[0].name;

    // gives id and appends to modal body
    nutritionTitle.setAttribute('id', 'nutrition-title')
    console.log(nutritionTitle);
    modal.append(nutritionTitle);

    var nutritionUL = document.createElement('ul');
    nutritionUL.setAttribute('id', 'nutrition-ul')
    nutritionTitle.append(nutritionUL);


    for (let key in data[0]) {
        console.log(key + ": ", data[0][key]);
        var lineItem = document.createElement('li');
        var nutritionItem = (key + ": " + data[0][key]);
        lineItem.textContent = nutritionItem;
        nutritionUL.append(lineItem);
    }
}


function recentSearches() {
   var retrievedSearches = localStorage.getItem("favorites");
   console.log(retrievedSearches);

   if (retrievedSearches != null) {
    document.getElementById("recents").innerHTML = JSON.parse(localStorage.getItem("favorites"));
   }


}



searchBtn.addEventListener('click', recentSearches);
searchBtn.addEventListener('click', searchClick);
searchBtn.addEventListener('click', saveFavorites);
resultsContainer.addEventListener('click', recipeShow);

const input = document.querySelector('.search-input')
//const btnSearchEl = document.getElementById('btnSearch')
if (input) {
input.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    searchBtn.click()
  }
})}

var closeBtn = document.querySelector('.close')
closeBtn.addEventListener('click', closeModal)

function closeModal () {
    modal.className = ('hide');
}


