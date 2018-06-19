import { search, retrieveArtist, retrieveRelatedArtists, retrieveArtistBio } from '../../util/util';

document.addEventListener('DOMContentLoaded', () => {

  const searchBar = document.getElementById('search');

  searchBar.addEventListener( 'input', e => {
    e.preventDefault();
    search(searchBar.value)
      .then( res => {
        const artistNameArray = res.data.artists.items.map( artist => artist.name);
        console.log(searchBar.value, artistNameArray);
      })
      .catch( err => console.log('err', err));
  });

window.search = search;
window.retrieveArtist = retrieveArtist;
window.retrieveRelatedArtists = retrieveRelatedArtists;
window.retrieveArtistBio = retrieveArtistBio;

  

});

