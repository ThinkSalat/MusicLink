import { retrieveArtist, retrieveRelatedArtists } from './util';

export const addNewPrimaryNode = artistId => {
  console.log('adding primary node');
  retrieveArtist(artistId)
    .then( artistInfo => {
      nodes.push(artistInfo.data);
    });
  console.log(nodes);
  addRelatedArtistNodes('node', artistId);
};


const addRelatedArtistNodes = (primaryNode, artistId) => {
  console.log('retereiving related artsits');
  retrieveRelatedArtists(artistId)
  .then( res => {
    res.data.artists.forEach(artist => {
        // check if artist exists in nodes
        if(uniqueNode(artist.id)) nodes.push(artist);
        addLinksToCurrentNodes(artist);
    })
  });

};

const uniqueNode = artistId => {
  console.log('checking unqiuness of node');
  return true;
}

const addLinksToCurrentNodes = node => {
 console.log('add link to primary node');
}