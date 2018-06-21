import axios from 'axios';

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

const testHTML = html => {
  let len = html.length;
  for (let index = 0; index < len; index++) {
    const element = html[index];
    console.log(element);
    
  }
};

window.testHTML = testHTML;

export const getArtistBio = ({name, id, url, genres}) => {
  const artistBio = document.getElementById('artist-bio');
  
  //load bio from spotify
  artistBio.innerHTML = `Loading bio for ${name}`;
  retrieveArtistBio(id)
  .then( res => {
    let html = $.parseHTML(res.data);
    let bio = $(html).find('.bio');
    if (!bio[0]) bio = $(html).find('.artist-bio');
    bio.find('button').remove();
    bio =  $(bio[0]).prop('outerHTML').replace(/href="/g,'target="_blank" href="https://open.spotify.com');
    //create link to artist's spotfiy page
    createArtistBioHeader(url, name);
    //add list of artist's genres
    addArtistGenres(genres);
    //Set links to actual spotify links


    // artistBio.innerHTML = info;
    artistBio.innerHTML = bio;
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
