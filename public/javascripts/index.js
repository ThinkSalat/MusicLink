import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

  const getAuthToken = url => axios.get('/authtoken', {params: {url}});

  //Search Spotify api
  const search = searchQuery => {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist`;
    getAuthToken(url)
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
    getAuthToken(url)
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
    getAuthToken(url)
      .then( res => {
        // perform action on Spotify API response
        console.log(res.data.artists);
      })
      .catch( err => console.log('retrieveArtist error'));
  };

  window.retrieveRelatedArtists = retrieveRelatedArtists;

  //Retrieve Artist Bio page by ID
  const retrieveArtistBio = artistId => {
    const url = `https://open.spotify.com/artist/${artistId}/about`;
    getAuthToken(url)
      .then( res => {
        // perform action on Spotify API response
        console.log(res.data.artists);
      })
      .catch( err => console.log('retrieveArtist error'));
  };

  window.retrieveArtistBio = retrieveArtistBio;

  

    // axios.get(`/artists/${id}/about`)
    //   .then((response)=> {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    // });


});

