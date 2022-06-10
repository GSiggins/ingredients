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
            //return array of objects
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
    var input = document.querySelector('.search-input').value;
    localStorage.setItem('Favorites', input);
    console.log(input)
    for (var i = 0; i < localStorage.length; i++) {
        var input = localStorage.key(i);
    }

    // document.querySelector('.search-input').value = localStorage.getItem('input');


}

function displayResult(resultArray) {
    console.log("showing index " + resultArray);
    var resultBody = document.createElement('div');
    resultBody.append.apply(resultCont);
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    resultArray.forEach(Object => {
        // Creates H3 for title within card
        var title = document.createElement('h3');
        title.textContent = resultObj.title;
        // Creates H4 for Serving sizes within card
        var servings = document.createElement('h4');
        title.textContent = resultObj.title;
        // Creates H4 for title within card
        var ingHeader = document.createElement('h4');

        var ingArr = resultObj.ingredients.split('|');
        for (let i = 0; i < 5; i++) {
            document.createElement('h3');
        }
    })
}

searchBtn.addEventListener('click', saveFavorites)




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