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
      console.log(Object.keys(nodes).length ===0 );
      let priority = 2;
      if (Object.keys(window.nodes).length === 0 || window.nodes[data.id].priority == 1) {
        priority = 1;
      }
      data.priority = priority;
      //return either new node or node that already existed
      window.nodes[data.id] = new Node(data);
      addRelatedArtistNodes(data.id);
    });
};

const addRelatedArtistNodes = (artistId) => {
  //retreiving related artists
  retrieveRelatedArtists(artistId)
  .then( res => {
    res.data.artists.forEach(artist => {
      // check if artist exists in nodes
      if (window.nodes[artist.id]) {
        var priority = window.nodes[artist.id].priority;
      }
      artist.priority = priority;
      window.nodes[artist.id] = new Node(artist);
      window.nodes[artist.id].priority = priority || 3;
    });
  })
  .then( () => {
    reconfigureLinks();
    createD3();
  });
};

const createOrFindNode = data => {
  window.nodes.forEach( node => {
    if (node.id === data.id) return node;
  });
  return new Node(data);
};

const reconfigureLinks = () => {
  Object.values(window.nodes).forEach( node => {
    node.addLinks();
  });
};