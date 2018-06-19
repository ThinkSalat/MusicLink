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

//Parameters for Spotify Client-Credential Authentication Token Retrieval
const authApiOptions = {
  url: "https://accounts.spotify.com/api/token",
  method: "post",
  params: {
      grant_type: "client_credentials"
  },
  headers: {
      "Accept": "application/json"
  },
  auth: {
      username,
      password
  }
};


// Retrieve Auth Token from Spotify
// Then
// Perform selected AJAX query
// Then send response back to requesting function
app.get('/authtoken', (req, res) => {
  axios(authApiOptions)
  .then( response => {
    //Auth Token return from Spotify auth api. Necessary for API calls
    const authToken = response.data.access_token;
    
    //Spotify API URL passed in from internal AJAX calls
    const url = req.query.url;

    //Set up headers for API call
    const params = { headers: { 'Authorization': 'Bearer ' + authToken }, json: true };
    
    // AJAX call to Spotify API
    axios.get(url, params)
      //Send back Spotify response to internal API call
      .then( apiRes => res.send(apiRes.data))
      .catch( err => console.log('spotify api call err'));
  })
  .catch( err => console.log('api error'));
});


// Express API routes
// Send API requests here to retrieve data from Spotify's API
app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Set server to listen on POST
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
