import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

    //Spotify Search
    let query = "Shabazz Palaces";
    axios.get(`/search?string=${query}`)
    .then((response) => {
        console.log(response); 
    })
    .catch(function (error) {
        console.log(error);
    });

    //Spotify Artist Info
    let id = "6C403AR4y6PjN0xNNGh42m";
    axios.get(`/artists/${id}`)
    .then((response) => {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    //Spotify Related Artists
    // let aId = "6C403AR4y6PjN0xNNGh42m";
    axios.get(`/artists/${id}/related-artists`)
    .then((response) => {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    axios.get(`https://open.spotify.com/artist/${id}/about`)
      .then((response)=> {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
});

