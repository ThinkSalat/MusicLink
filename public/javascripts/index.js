import { search, retrieveArtist, retrieveRelatedArtists, retrieveArtistBio } from '../../util/util';

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
  .then( res => {
    const regEx = /<div class="bio-primary">(.+?)<\/div><\/div><button class="link expand-toggle">Read More<\/button><\/div></;
    let info = res.data.match(regEx)['1'];
    info = info.replace(/href="/g,'target="_blank" href="https://open.spotify.com');
    console.log(info);
  })
  .catch( err => console.log('retrieveArtistBio error', err));
});

