import { retrieveArtist, retrieveRelatedArtists } from './util';
import Node from '../public/javascripts/node';
import { createD3 } from '../public/javascripts/d3';

export const addNewPrimaryNode = artistId => {
  if (!uniqueNode(artistId)) {
    if (nodes.filter( node => {
      return node.primary || node.secondary;
    }).length > 0) {
      return false;
    }
  }


  //clearing svg canvas
  $("#d3-canvas").html('');
  // adding primary node
  retrieveArtist(artistId)
    .then( ({ data }) => {
      // set node to primary node
      if (!nodes.length) {
        data.primary = true;
        data.secondary = false;
      } else {
        data.secondary = true;
        data.primary = false;
      }
      const artistNode = new Node(data);
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
      let artistNode;
      if(uniqueNode(artist.id)) {
        artistNode = new Node(artist);
        window.nodes.push(artist);
        artist.primary = false;
        artist.secondary = false;
        artist.tertiary = true;
      } else {
        //find artist's ndoe and select it and st aristNoe to
      }
      addLinksToThisNode(artistNode);
    });
  })
  .then( () => {
    createD3();
  });
};

const uniqueNode = artistId => {
  //Must IMPLEMENT 
  window.nodes.forEach( node => {
    if (node.id !== artistId) console.log('same node~');
    if (node.id === artistId) return false;
  });
  return true;
};

const addLinksToThisNode = node => {
 //IMPLEMENT CORRECTLY
};

const getLinksForNode = node => {

};