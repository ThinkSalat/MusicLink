const axios = require('axios');
const path = require('path');
const fetch = require('node-fetch');

const express =  require('express');
const app = express();

// process.env accesses heroku's environment variables
const PORT = process.env.PORT || 8000; 

app.use(express.static('public'));

// AUTH

// KEYS
const username = '0739aaaba65d4433b97a9885a9ce26f0';
const password = 'f16edd41072b47d782fde2a1dc2b58da';

const authApiOptions = {
  url: "https://accounts.spotify.com/api/token",
  method: "post",
  params: {
      grant_type: "client_credentials"
  },
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
  },
  auth: {
      username,
      password
  },
  redirectUri: 'http://localhost:8000'
};


// 2. Retrieve Auth Token from Spotify
// And
// 3. Perform selected AJAX query
app.get('/authtoken', (req, res) => {
  axios(authApiOptions)
  .then( response => {
    const params = { headers: { 'Authorization': 'Bearer ' + response.data.access_token }, json: true };
    axios.get(req.query.url, params ).then( apiRes => res.send(apiRes.data))
      .catch( err => console.log('spotify api call err'));
  })
  .catch( err => console.log('api error'));
});


// Express API routes
// Send API requests here to retrieve data from Spotify's API
app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// create route to get single artist by its id
// app.get('/artists/:id', (request, response) => {
//   // make api call using fetch
//   fetch(`https://api.spotify.com/v1/artists/${request.params.id}&format=json&jscmd=data`)
//   .then((response) => {
//       return response.text();
//   }).then((body) => {
//       let results = JSON.parse(body);
//       console.log(results);   // logs to server
//       response.send(results); // sends to frontend
//     });
// });

// // Get Artist's Bio
// app.get('/artists/:id/about', (request, response) => {
//   // make api call using fetch
//   // fetch(`https://open.spotify.com/artist/${request.params.id}/about`)
//   // .then((response) => {
//   //     return response.text();
//   // }).then((body) => {
//   //     let results = JSON.parse(body);
//   //     console.log(results);   // logs to server
//   //     response.send(results); // sends to frontend
//   //   })
//   //   .catch(err => console.log('bio err',err));
// });

// // create route to get related artists
// app.get('/artists/:id/related-artists', (request, response) => {
//   // make api call using axios
//   fetch(`https://api.spotify.com/v1/artists/${request.params.id}/related-artists&format=json&jscmd=data`)
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
//   fetch(`https://api.spotify.com/v1/search?q=${request.query.string}&type=artist`)
//   .then((response) => {
//       return response.text();
//   }).then((body) => {
//       let results = JSON.parse(body);
//       console.log(results);
//       response.send(results);
//     });
// });


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
