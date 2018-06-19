import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

  const getAuthToken = url => axios.get('/authtoken', {params: {url}});
  
  const search = searchQuery => {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist`;
    getAuthToken(url)
      .then( res => {
        console.log(res.data.artists.items);
      })
      .catch( err => console.log('search query error'));
  };

  window.search = search;

  const retrieveArtist = artistId => {
    const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}`;
    getAuthToken(url)
      .then( res => {
        console.log(res.data);
      })
      .catch( err => console.log('retrieveArtist error'));
  };

  window.retrieveArtist = retrieveArtist;

    // axios.get(`/search?string=${query}`)
    // .then((response) => {
    //     console.log(response); 
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    // //Spotify Artist Info
    // let id = "6C403AR4y6PjN0xNNGh42m";
    // axios.get(`/artists/${id}`)
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    // //Spotify Related Artists
    // // let aId = "6C403AR4y6PjN0xNNGh42m";
    // axios.get(`/artists/${id}/related-artists`)
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    // axios.get(`/artists/${id}/about`)
    //   .then((response)=> {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    // });


});

