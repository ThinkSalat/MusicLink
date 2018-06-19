import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

  const getAuthToken = url => axios.get('/authtoken', {params: {url}});
    //Spotify Search
    // let query = "Shabazz Palaces";
    // let query = "Shabazz";
    // axios.get('/authtoken')
    // .then( res => {
    //   const token = res.data;
    //   const params = { headers: { 'Authorization': 'Bearer ' + token }, json: true };
    //   axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, params )
    //     .then( succ => console.log(succ.data.artists.items.map(obj => obj.name)))
    //     .catch( err => console.log(err));
    // })
    // .catch( err => console.log(err));

const searchSpotify = searchQuery => {
  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`;
  getAuthToken(url)
    .then( res => {
      const token = res.data;
      const params = { headers: { 'Authorization': 'Bearer ' + token }, json: true };
      axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`, params )
        .then( succ => console.log(succ.data.artists.items.map(obj => obj.name)))
        .catch( err => console.log(err));
    })
    .catch( err => console.log(err));
};

window.search = searchSpotify;

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

