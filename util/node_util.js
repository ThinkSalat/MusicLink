import { retrieveArtist, retrieveRelatedArtists } from './util';

export const addNewPrimaryNode = artistId => {
  console.log('clearing nodes');
  window.nodes = [];
  console.log('adding primary node');
  retrieveArtist(artistId)
    .then( artistInfo => {
      window.nodes.push(artistInfo.data);
    });
  console.log(window.nodes);
  addRelatedArtistNodes('node', artistId);
};


const addRelatedArtistNodes = (primaryNode, artistId) => {
  console.log('retereiving related artsits');
  retrieveRelatedArtists(artistId)
  .then( res => {
    res.data.artists.forEach(artist => {
        // check if artist exists in nodes
        if(uniqueNode(artist.id)) window.nodes.push(artist);
        addLinksToCurrentNodes(artist);
    });
  });

};

const uniqueNode = artistId => {
  return true;
};

const addLinksToCurrentNodes = node => {
};