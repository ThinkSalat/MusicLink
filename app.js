const axios = require('axios');
const path = require('path');
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
      .then( apiRes => {
        // console.log(apiRes);
        // console.log(apiRes.data);
        res.send(apiRes.data)
      })
      .catch( err => console.log('spotify api call err', err));
  })
  .catch( err => console.log('api error'));
});

// Express API routes
// Send API requests here to retrieve data from Spotify's API
app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// CORS settings for dev
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Set server to listen on POST
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
