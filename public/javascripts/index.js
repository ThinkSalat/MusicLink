import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
    const params =  {
      client_id: '0739aaaba65d4433b97a9885a9ce26f0',
      client_secret: 'f16edd41072b47d782fde2a1dc2b58da'
    }
    //Spotify Search
    let artist = "Shabazz Palaces";
    axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, { params })
    .then((response) => {
        console.log(response); 
    })
    .catch(function (error) {
        console.log(error);
    });

    //Spotify Artist Info
    let artistId = "6C403AR4y6PjN0xNNGh42m";
    axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { params })
    .then((response) => {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    //Spotify Related Artists
    let aId = "6C403AR4y6PjN0xNNGh42m";
    axios.get(`https://api.spotify.com/v1/artists/${aId}/related-artists`, { params })
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

