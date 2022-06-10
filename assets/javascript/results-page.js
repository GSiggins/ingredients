var searchParamsArr = document.location.search.split('&');

// Get the query and format values
var query = searchParamsArr[0].split('=').pop();
var format = searchParamsArr[1].split('=').pop();