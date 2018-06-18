import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

    //Spotify Search
    let artist = "Shabazz Palaces";
    axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
    .then((response) => {
        console.log(response); 
    })
    .catch(function (error) {
        console.log(error);
    });

    //Spotify Artist Info
    let artistId = "6C403AR4y6PjN0xNNGh42m";
    axios.get(`https://api.spotify.com/v1/artists/${artistId}`)
    .then((response) => {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    //Spotify Related Artists
    let aId = "6C403AR4y6PjN0xNNGh42m";
    axios.get(`https://api.spotify.com/v1/artists/${aId}/related-artists`)
    .then((response) => {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    axios.get(`https://open.spotify.com/artist/${aId}/about`)
      .then((response)=> {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
});

