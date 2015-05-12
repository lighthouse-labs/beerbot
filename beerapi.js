request = require('request');

function getBeer(query, callback) {
  var endpoint = 'http://api.brewerydb.com/v2/search?key=' + process.env.BREWERY_API_KEY + '&q=' + query + '&type=beer';
  request(endpoint, function(error, response, body) {
    var beers, beer, name, description, abv;

    if(error) {
      errorMessage = "Request failed. Make sure your api key is ok"
      callback(errorMessage);
      return;
    }

    beers = JSON.parse(body);
    beer = beers.data[0];
    name = beer.name;
    description = beer.description;
    abv = beer.abv;

    callback(null, {name: name, description: description, abv: abv});
  });
}
module.exports = getBeer;
