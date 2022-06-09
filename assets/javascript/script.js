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





var searchBarInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('button')
function searchClick (event) {
    event.preventDefault();

    //onclick event
    searchBarInput.addEventListener('click', searchBtn);

    // build first url request
    
    var recipeString = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=' + searchBarInput;
    console.log(recipeString)

    // build second url request
    var nutritionString = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + searchBarInput;
    console.log(nutritionString)

    recipeQuery(recipeString);
    nutritionQuery(nutritionString);




}


    function recipeQuery() {
        //fetch with built URL to return recipe info
        fetch(recipeString,{
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

    function nutritionQuery() {
        //fetch built with URL to return nutritional info
        fetch(nutritionString,{
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


function displayRecipeResults (recipeArray) {

    // create HTML elements with cards to show recipe info w/ first 5 ingredients
    // populate cards with info from object array
    // add event listeners to both recipe buttons
    // add button for "start cooking!" and one for "favorite this recipe"

}


function recipeInfo(chosenRecipe) {

    // display recipe from chosen recipe
    // display sliced ingredient list
}


function nutritionInfo(chosenRecipeNut) {

    // display nutritional info from chosen recipe
    // populate HTML with corresponding info

}

// search button event listener