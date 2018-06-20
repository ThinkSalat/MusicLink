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
  return callSpotifyAPI(url);
};

export const getArtistBio = id => {
  retrieveArtistBio(id)
  .then( res => {
    const regEx = /<div class="bio-primary">(.+?)<\/div><\/div><button class="link expand-toggle">Read More<\/button><\/div></;
    let info = res.data.match(regEx)['1'].replace(/href="/g,'target="_blank" href="https://open.spotify.com');
    // info = info.replace(/href="/g,'target="_blank" href="https://open.spotify.com');
    // console.log(info);
    const artistBio = document.getElementById('artist-bio');
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