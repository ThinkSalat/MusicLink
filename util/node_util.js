import { retrieveArtist, retrieveRelatedArtists } from './util';
import Node from '../public/javascripts/node';
import { createD3 } from '../public/javascripts/d3';

export const addNewPrimaryNode = artistId => {
  //clearing svg canvas
  $("#d3-canvas").html('');
  // adding primary node
  retrieveArtist(artistId)
    .then( ({ data }) => {
      // set node to primary node
      data.primary = true;
      window.nodes.push(data);
    });
  addRelatedArtistNodes('node', artistId);
};


const addRelatedArtistNodes = (primaryNode, artistId) => {
  //retreiving related artists
  retrieveRelatedArtists(artistId)
  .then( res => {
    res.data.artists.forEach(artist => {
      // check if artist exists in nodes
      artist.primary = false;
      if(uniqueNode(artist.id)) window.nodes.push(artist);
      addLinksToCurrentNodes(artist);
    });
  })
  .then( () => {
    createD3();
  });
};

const uniqueNode = artistId => {
  //Must IMPLEMENT 
  window.nodes.forEach( node => {
    if (node.id === artistId) return false;
  });
  return true;
};

const addLinksToCurrentNodes = node => {
 //IMPLEMENT CORRECTLY
};