import { search, retrieveArtist, retrieveRelatedArtists, retrieveArtistBio, getArtistBio, getArtistBioByName } from '../../util/util';
import { createAutocompleteList } from '../../util/search_util';

document.addEventListener('DOMContentLoaded', () => {

  const searchBar = document.getElementById('search');

  searchBar.addEventListener( 'input', e => {
    e.preventDefault();
    search(searchBar.value)
      .then( res => {
        // const apiSearchUrl = res.config.params.url;
        
        //parse results of API call and return name, id and images for artists
        const artists = res.data.artists.items.map( artist => {
          const { name, id, images } = artist; 
          const imageUrl = (images[images.length-1] || {url: 'default'})['url']; 
          return {name, id, imageUrl};
        });

        //create ul containing the results of the query
        const searchResultsList = createAutocompleteList(artists);

        // select the div below the input to display results.
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        searchResults.appendChild(createAutocompleteList(artists));
        //  console.log('searched for:', searchBar.value, 'referred from ', apiSearchUrl, 'results', artistNameArray);
      })
      .catch( err => console.log('err', err));
  });


window.search = search;
window.retrieveArtist = retrieveArtist;
window.retrieveRelatedArtists = retrieveRelatedArtists;
window.retrieveArtistBio = retrieveArtistBio;

window.getArtistBioByName = getArtistBioByName;
window.getArtistBio = getArtistBio;

});

