request = require('request');

beerapi = {
  getBeerDescription: function(searchTerm, callback) {
    var endpoint = 'http://api.brewerydb.com/v2/search?key=' + process.env.BEER_API_KEY + '&q=' + searchTerm + '&type=beer';
    request(endpoint, function(error, response, body) {
      if(error) {
        console.log("There was an error in the Beer API request ", response, body);
        callback("Error reaching Beer API");
        return;
      }
      var beers = JSON.parse(body).data;
      console.log(beers);

      if(beers) {
        console.log("Beer description", beers[0].description);
        callback(null, beers[0].description);
      } else {
        callback(null, "Could not find a beer for query " + searchTerm);
      }
    });
  }
}

module.exports = beerapi;
