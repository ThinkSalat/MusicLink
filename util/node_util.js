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
      data.priority = !nodes.length ? 1 : 2;
      //return either new node or node that already existed
      const artistNode = createOrFindNode(data);
      window.nodes.push(artistNode);
      addRelatedArtistNodes(data.id);
    });
};

const addRelatedArtistNodes = (artistId) => {
  //retreiving related artists
  retrieveRelatedArtists(artistId)
  .then( res => {
    res.data.artists.forEach(artist => {
      // check if artist exists in nodes
      const artistNode = createOrFindNode(artist);
      artistNode.priority = artistNode.priority || 3;
      window.nodes.push(artistNode);
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
  window.nodes.forEach( node => {
    node.addLinks();
  });
};