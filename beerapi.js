var request = require('request');

var beerapi = {};
beerapi.getDescription = function(name, success){
  var description;
  var endpoint = "http://api.brewerydb.com/v2/search?key=" + process.env.BREWERY_API_KEY + "&type=beer&q="
  console.log("!!! Getting description for beer", name);
  // make a request to the beer api...
  
  // node request is automatically url encoding the endpoint + name
  request(endpoint + name, function (error, response, body) {
    var beers;
    console.log("!!! Request finished");
    if (!error && response.statusCode == 200) {
      beers = JSON.parse(body);
      description = beers.data[0].description;
    }
  });
  console.log("!!! Returning description");
  return description;
}

// attach the beerapi object
module.exports = beerapi;
