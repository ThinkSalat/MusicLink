const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

// process.env accesses heroku's environment variables
const PORT = process.env.PORT || 8000; 

app.use(express.static('public'));


const params =  {
  client_id: '0739aaaba65d4433b97a9885a9ce26f0',
  client_secret: 'f16edd41072b47d782fde2a1dc2b58da'
}

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// create route to get single artist by its id
app.get('/artists/:id', (request, response) => {
  // make api call using fetch
  fetch(`https://api.spotify.com/v1/artists/${request.params.id}&format=json&jscmd=data`)
  .then((response) => {
      return response.text();
  }).then((body) => {
      let results = JSON.parse(body);
      console.log(results);   // logs to server
      response.send(results); // sends to frontend
    });
});

// create a search route
app.get('/search', (request, response) => {
  fetch(`https://api.spotify.com/v1/search?q=${request.query.string}&type=artist`)
  .then((response) => {
      return response.text();
  }).then((body) => {
      let results = JSON.parse(body);
      console.log(results);
      response.send(results);
    });
});


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
