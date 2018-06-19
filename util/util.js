import axios from 'axios';

// Express Server is listening on route /authtoken
// retrieves auth token from spotify then performs api call on passed in url.
const callSpotifyAPI = url => axios.get('/authtoken', {params: {url}});

//Search Spotify api
export const search = searchQuery => {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist`;
  return callSpotifyAPI(url);
};

//Retrieve Artist by ID
export const retrieveArtist = artistId => {
  const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}`;
  return callSpotifyAPI(url)
    .then( res => {
      // perform action on Spotify API response
      console.log(res.data);
    })
    .catch( err => console.log('retrieveArtist error'));
};


//Retrieve Related Artists by ID
export const retrieveRelatedArtists = artistId => {
  const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}/related-artists`;
  return callSpotifyAPI(url)
    .then( res => {
      // perform action on Spotify API response
      console.log(res.data.artists);
    })
    .catch( err => console.log('retrieveRelatedArtists error'));
};

//Retrieve Artist Bio page by ID
export const retrieveArtistBio = artistId => {
  const url = `http://open.spotify.com/artist/${artistId}/about`;
  axios.get(url)
    .then( res => {
      // perform action on Spotify API response
      console.log(res.data.artists);
    })
    .catch( err => console.log('retrieveArtistBio error'));
};
