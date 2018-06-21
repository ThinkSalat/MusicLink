import axios from 'axios';
import { sendTracksToPlayer } from '../public/javascripts/player';

// Express Server is listening on route /authtoken
// retrieves auth token from spotify then performs api call on passed in url.
const callSpotifyAPI = url => axios.get('/authtoken', {params: {url}});

//Search Spotify api
export const search = searchQuery => {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist&limit=5`;
  return callSpotifyAPI(url);
};

//Retrieve Artist by ID
export const retrieveArtist = artistId => {
  const url = `https://api.spotify.com/v1/artists/${artistId}`;
  return callSpotifyAPI(url);
};

//Retrieve Artist's Top Songs by ID
export const retrieveArtistTopSongs = artistId => {
  const url =`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=us`;
  return callSpotifyAPI(url);
};

//Retrieve Related Artists by ID
export const retrieveRelatedArtists = artistId => {
  const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
  return callSpotifyAPI(url);
};

//Retrieve Artist Bio page by ID
const retrieveArtistBio = artistId => {
  const url = `http://open.spotify.com/artist/${artistId}/about`;
  return callSpotifyAPI(url);
};

export const getArtistBio = ({name, id, url, genres}) => {
  const artistBio = document.getElementById('artist-bio');

  //display artistBio
  $('.artist-panel').css('display','block');
  //load bio from spotify
  artistBio.innerHTML = `Loading bio for ${name}`;
  retrieveArtistBio(id)
  .then( res => {
    //parse response html
    let html = $.parseHTML(res.data);
    //set bio to the section with class bio, or artist-bio if that section doesn't exist
    let bio = $(html).find('.bio');
    if (!bio[0]) bio = $(html).find('.artist-bio');
    //Remove "Read More" button
    bio.find('button').remove();
    //Changes links from relative links to spotify links that open in new tab
    bio =  $(bio[0]).prop('outerHTML').replace(/href="/g,'target="_blank" href="https://open.spotify.com');
    //create link to artist's spotfiy page
    createArtistBioHeader(url, name);
    //add list of artist's genres
    addArtistGenres(genres);

    //set playerPanel to artist's top songs
    retrieveArtistTopSongs(id)
      .then( ({ data: { tracks }}) => {
        // send tracks to player
        sendTracksToPlayer(tracks)
        //add info to Artist Panel
        artistBio.innerHTML = bio;
      })
      .catch( err => console.log('retrieveTopSongErrors', err))
  })
  .catch( err => console.log('retrieveArtistBio error', err));
  return `retrieving artist bio from artist with id: '${id}'`;
};

export const getArtistBioByName = name => {
  const artistBio = document.getElementById('artist-bio');
  artistBio.innerHTML = `Loading bio for ${name}`;
  search(name)
    .then( res => {
      const id = res.data.artists.items.length ? res.data.artists.items[0].id : '';
      getArtistBio(id);  
    });
};

const addArtistGenres = genres => {
  const genreList = document.getElementById('artist-genres');
  //reset genrelist
  genreList.innerHTML = '';
  
  let innerText = 'Genres: ';
  innerText += genres.join(', ');
  genreList.innerText = innerText;
};

const createArtistBioHeader = (url, name) => {
  const artistBioHeader = document.getElementById('artist-bio-header');
  //reset header
  artistBioHeader.innerHTML = '';

  const artistLink = document.createElement('a');
  artistLink.href = url;
  artistLink.target = "_blank";
  artistLink.innerHTML = name;
  artistBioHeader.appendChild(artistLink);
};
