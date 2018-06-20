import { retrieveArtist, retrieveRelatedArtists } from './util';

export const addNewPrimaryNode = artistId => {
  console.log('adding primary node');
  retrieveArtist(artistId)
  .then( artistInfo => console.log(artistInfo.data));

  addRelatedArtistNodes('node', artistId);
};


const addRelatedArtistNodes = (primaryNode, artistId) => {
  console.log('retereiving related artsits');
  retrieveRelatedArtists(artistId)
  .then( artists => console.log(artists.data));

};