const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const axios = require('axios');

// process.env accesses heroku's environment variables
const PORT = process.env.PORT || 8000; 

app.use(express.static('public'));

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// create route to get single book by its isbn
// app.get('/books/:isbn', (request, response) => {
//   // make api call using fetch
//   fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${request.params.isbn}&format=json&jscmd=data`)
//   .then((response) => {
//       return response.text();
//   }).then((body) => {
//       let results = JSON.parse(body);
//       console.log(results);   // logs to server
//       response.send(results); // sends to frontend
//     });
// });

// // create a search route
// app.get('/search', (request, response) => {
//   fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
//   .then((response) => {
//       return response.text();
//   }).then((body) => {
//       let results = JSON.parse(body);
//       console.log(results);
//       response.send(results);
//     });
// });

const params =  {
  client_id: '0739aaaba65d4433b97a9885a9ce26f0',
  client_secret: 'f16edd41072b47d782fde2a1dc2b58da'
}
//Spotify Search
let artist = "Shabazz Palaces";
axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, { params })
.then((response) => {
    console.log(response); 
})
.catch(function (error) {
    console.log(error);
});

//Spotify Artist Info
let artistId = "6C403AR4y6PjN0xNNGh42m";
axios.get(`/search?string=${artistId}`, { params })
.then((response) => {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});

//Spotify Related Artists
let artistId = "6C403AR4y6PjN0xNNGh42m";
axios.get(`/search?string=${artistId}/related-artists`, { params })
.then((response) => {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
