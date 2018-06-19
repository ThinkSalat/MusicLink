import { search, retrieveArtist, retrieveRelatedArtists, retrieveArtistBio } from '../../util/util';
import axios from 'axios';
import {$,jQuery} from 'jquery';

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
retrieveArtistBio('6C403AR4y6PjN0xNNGh42m')

});

