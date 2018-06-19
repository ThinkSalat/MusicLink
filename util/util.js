import axios from 'axios';
import {$,jQuery} from 'jquery';


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
  return callSpotifyAPI(url);
};


//Retrieve Related Artists by ID
export const retrieveRelatedArtists = artistId => {
  const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}/related-artists`;
  return callSpotifyAPI(url);
};

//Retrieve Artist Bio page by ID
export const retrieveArtistBio = artistId => {
  const url = `http://open.spotify.com/artist/${artistId}/about`;
  callSpotifyAPI(url)
    .then( res => {
      // contains h2 and p elements
      // class="artist-about-container__paragraph"
      // this is div that contains all the above
      console.log('class="artist-about-container__about"');
      console.log('here');
      // console.log(res.data);
      console.log(jQuery);
      const fullPage = $.parseHTML(res.data)
        console.log(fullPage);
      // perform action on Spotify API response
    })
    .catch( err => console.log('retrieveArtistBio error', err));
};
