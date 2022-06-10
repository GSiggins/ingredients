var searchBtn = document.querySelector('.search-btn')
var landingSearch = document.getElementById('landing-search')
var resultsSearch = document.getElementById('results-search')


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

searchBtn.addEventListener('click', searchClick);



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

    resultBody.append(resultsContainer);
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    console.log(resultArray)
    var resultsContainer = document.querySelector('.results-container');

    resultArray.forEach(Element => {
        var resultCard = document.createElement('div')

        // Creates H3 for title within card, sets text, and appends

        var title = document.createElement('h3');
        title.textContent = Element.title.value;
        resultCard.append(title);

        // Creates H4 for Serving sizes within card, sets text, and appends
        var servings = document.createElement('h4');
        title.textContent = Element.servings.value;
        resultCard.append(servings);

        // Creates H4 for title within card, sets text, and appends
        var ingHeader = document.createElement('h4');
        ingHeader.textContent = "Ingredients: "
        resultCard.append(ingHeader);

        // Splits ingredient string at "|" and returns array called ingArr. 
        // Creates UL to house individual ingredients
        var ingArr = Element.ingredients.split('|');
        var ingUL = document.createElement('ul');

        // Loops ingredient list and creates li for each ingredient and appends to ul
        for (let i = 0; i < ingArr.length; i++) {
            var ingList = document.createElement('li');
            ingList.textContent = ingArr[i].value;
            ingUL.append(ingList);
        }
        // Appends all created elements in card to parent container
        resultsContainer.append(resultCard);
    })
}

// searchBtn.addEventListener('click', saveFavorites)


   
   
   
   
   
   
    
   
    
    
    
    



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