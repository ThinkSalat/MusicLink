import { search, retrieveArtist, retrieveRelatedArtists, retrieveArtistBio } from '../../util/util';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

  const searchBar = document.getElementById('search');

  searchBar.addEventListener( 'input', e => {
    e.preventDefault();
    search(searchBar.value)
      .then( res => {
        const artistNameArray = res.data.artists.items.map( artist => artist.name);
        const artistIdArray = res.data.artists.items.map( artist => artist.id);
        console.log(searchBar.value, artistNameArray);
        console.log(searchBar.value, artistIdArray);
      })
      .catch( err => console.log('err', err));
  });

window.search = search;
window.retrieveArtist = retrieveArtist;
window.retrieveRelatedArtists = retrieveRelatedArtists;
window.retrieveArtistBio = retrieveArtistBio;

  axios.get('https://cors-escape.herokuapp.com/http%3A//open.spotify.com/artist/13ubrt8QOOCPljQ2FL1Kca/about&callback=?')
    .then( succ => console.log(succ), err => console.log(err));

});

