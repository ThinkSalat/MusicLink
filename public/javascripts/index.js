import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

  // Express Server is listening on route /authtoken
  // retrieves auth token from spotify then performs api call on passed in url.
  const callSpotifyAPI = url => axios.get('/authtoken', {params: {url}});

  //Search Spotify api
  const search = searchQuery => {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist`;
    callSpotifyAPI(url)
      .then( res => {
        // perform action on Spotify API response
        console.log(res.data.artists.items);
      })
      .catch( err => console.log('search query error'));
  };

  window.search = search;

  //Retrieve Artist by ID
  const retrieveArtist = artistId => {
    const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}`;
    callSpotifyAPI(url)
      .then( res => {
        // perform action on Spotify API response
        console.log(res.data);
      })
      .catch( err => console.log('retrieveArtist error'));
  };

  window.retrieveArtist = retrieveArtist;


  //Retrieve Related Artists by ID
  const retrieveRelatedArtists = artistId => {
    const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}/related-artists`;
    callSpotifyAPI(url)
      .then( res => {
        // perform action on Spotify API response
        console.log(res.data.artists);
      })
      .catch( err => console.log('retrieveRelatedArtists error'));
  };

  window.retrieveRelatedArtists = retrieveRelatedArtists;

  //Retrieve Artist Bio page by ID
  const retrieveArtistBio = artistId => {
    const url = `http://open.spotify.com/artist/${artistId}/about`;
    axios.get(url)
      .then( res => {
        // perform action on Spotify API response
        console.log(res.data.artists);
      })
      .catch( err => console.log('retrieveArtistBio error'));
  };

  window.retrieveArtistBio = retrieveArtistBio;

});

