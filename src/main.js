var request = require("request");

var options = { method: 'GET', url: 'https://api.upbit.com/v1/market/all' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});