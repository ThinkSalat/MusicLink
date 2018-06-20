import { search, retrieveArtist, retrieveRelatedArtists, retrieveArtistBio, getArtistBio, getArtistBioByName } from '../../util/util';

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

  const createAutocompleteList = artists => {
    if (!artists || !artists.length) {
      const emptyList = document.createElement('ul');
      const emptyListItem = document.createElement('li');
      emptyListItem.innerHTML = "Couldn't find artist with that name";
      emptyList.appendChild(emptyListItem);
      return emptyList;
    }
    const ul = document.createElement('ul');
    ul.setAttribute('id','name-list');
    artists.forEach( artist => {
      const listItem = createListItem(artist);
      ul.appendChild(listItem);
    });
    console.log(ul);
    return ul;
  };

  const createListItem = artist => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', 'list-item');

    const artistImage = document.createElement('img');
    artistImage.setAttribute('class', 'list-image');
    if (artist.imageUrl === 'default') {
      artistImage.setAttribute('src', 'http://groovesharks.org/assets/images/default_avatar.jpg');
    } else {
      artistImage.setAttribute('src', artist.imageUrl);
    }

    const artistName = document.createElement('span');
    artistName.innerHTML = artist.name;

    listItem.appendChild(artistImage);
    listItem.appendChild(artistName);

    return listItem;
  };

window.search = search;
window.retrieveArtist = retrieveArtist;
window.retrieveRelatedArtists = retrieveRelatedArtists;
window.retrieveArtistBio = retrieveArtistBio;

window.getArtistBioByName = getArtistBioByName;
window.getArtistBio = getArtistBio;

});

