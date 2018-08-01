import { retrieveArtist, retrieveRelatedArtists } from './util';
import Node from '../public/javascripts/node';
import { createD3, clearNodes } from '../public/javascripts/d3';

export const addNewPrimaryNode = artistId => {
  //clearing svg canvas
  $("#d3-canvas").html('');
  clearNodes();
  // adding primary node
  retrieveArtist(artistId)
    .then( ({ data }) => {
      // set node to primary node
      let priority = 2;
      if (Object.keys(window.nodes).length === 0 || ( window.nodes[data.id] && window.nodes[data.id].priority === 1)) {
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
  const relatedArtistIds = {};
  retrieveRelatedArtists(artistId)
  .then( res => {
    res.data.artists.forEach(artist => {
      relatedArtistIds[artist.id] = true;
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
    //add all to related artists object on parent node
    Object.keys(relatedArtistIds).forEach( id => {
      nodes[artistId].relatedArtistIds[id] = true;
    })
    createArtistLinks(artistId);
    createD3();
  });
};
//review
const createArtistLinks = (artistId) => {
  Object.keys(nodes[artistId].relatedArtistIds).forEach( id => {
    //duplicating links
      links[`${artistId}-${id}`] = { source: artistId, target: id };
      links[`${id}-${artistId}`] = { source: id, target: artistId };
    });
};  