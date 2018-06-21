import axios from 'axios';
import { $ } from 'jquery';


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
  const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}`;
  return callSpotifyAPI(url);
};


//Retrieve Related Artists by ID
export const retrieveRelatedArtists = artistId => {
  const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}/related-artists`;
  return callSpotifyAPI(url);
};

//Retrieve Artist Bio page by ID
const retrieveArtistBio = artistId => {
  const url = `http://open.spotify.com/artist/${artistId}/about`;
  return callSpotifyAPI(url);
};

export const getArtistBio = ({name, id, url, genres}) => {
  const artistBio = document.getElementById('artist-bio');
  
  //load bio from spotify
  artistBio.innerHTML = `Loading bio for ${name}`;
  retrieveArtistBio(id)
  .then( res => {
    let html = $.parseHTML(res.data)
    debugger
    //create link to artist's spotfiy page
    createArtistBioHeader(url, name);
    //add list of artist's genres
    addArtistGenres(genres);
    // use regex to format response
    const info = extractDataFromResponse(res);

    artistBio.innerHTML = info;
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

const extractDataFromResponse = res => {
  let info;
  let regEx = /<div class="bio-primary">(.+?rovi)/i;
  // let regEx = /bio-primary">.+?(?=\",\")/i;
  // let regEx = /([bio-primary">|biography":"body":"][bio]*.+?)(?=\"\,\")/i;
  let regexV = 1;
  if (!res.data.match(regEx)) {
    regEx = /biography":{"body":"(.+?){/;
      regexV = 2;
    }
  
  info = res.data.match(regEx) ? res.data.match(regEx) : "Couldn't parse artist page, try spotify link above :)";
    if (info !== "Couldn't parse artist page, try spotify link above :)"){
      if (info['1']) info = info['1'].replace(/href="/g,'target="_blank" href="https://open.spotify.com');
    }
    if (regexV === 2) {
      if (info !== "Couldn't parse artist page, try spotify link above :)") info = info.match(/(.+?)","/)['1'];
    }
  return info;
};