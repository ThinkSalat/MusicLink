import { search, retrieveArtist, retrieveRelatedArtists, getArtistBio, getArtistBioByName } from '../../util/util';
import { createAutocompleteList } from '../../util/search_util';
// import { redraw, clearNodes } from './d3';
import { clearNodes, createD3 } from './d3';


document.addEventListener('DOMContentLoaded', () => {
  clearNodes();
  
  // get search input element
  const searchBar = document.getElementById('search');

  // perform calls to spotify api when user enters text into search bar
  searchBar.addEventListener( 'input', e => {
    e.preventDefault();
    search(searchBar.value)
      .then( res => {
        //parse results of API call and return name, id and images for artists
        const artists = res.data.artists.items.map( artist => {
          const url = artist.external_urls['spotify'];
          const { name, id, images, genres } = artist; 
          const imageUrl = (images[images.length-1] || {url: 'default'})['url']; 
          return {name, id, imageUrl, url, genres};
        });

        //create ul containing the results of the query
        const searchResultsList = createAutocompleteList(artists);
        
        // select the div below the input to display results.
        const searchResults = document.getElementById('search-results');

        //clear old results
        searchResults.innerHTML = '';

        //add searchresults under input
        searchResults.appendChild(searchResultsList);
      })
      .catch( err => console.log('errssss', err)); 
  });

  $('.clear-button').on('click', clearNodes);

  //Resizing svg logic
  // redraw();
  // // Redraw based on the new size whenever the browser window is resized.
  // window.addEventListener("resize", redraw);

});

