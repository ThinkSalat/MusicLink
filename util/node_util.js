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
      let priority = 2;
      if (Object.keys(window.nodes).length === 0 || ( window.nodes[data.id] && window.nodes[data.id].priority === 1)) {
        priority = 1;
      }
      data.priority = priority;
      //return either new node or node that already existed
      window.nodes[data.id] = new Node(data);
      addRelatedArtistNodes(data.id);
      processedArtists[data.id] = true;
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
    // reconfigureLinks();
    //add all to related artists object on parent node
    Object.keys(relatedArtistIds).forEach( id => {
      nodes[artistId].relatedArtistIds[id] = true;
    })
    createArtistLinks(artistId);
    createD3();
  });
};

const createArtistLinks = (artistId) => {
  Object.keys(nodes[artistId].relatedArtistIds).forEach( id => {
    console.log(id);
      links[`${artistId}-${id}`] = { source: artistId, target: id };
      links[`${id}-${artistId}`] = { source: id, target: artistId };
    });
};  

// const getRelatedArtistsPromise = id => {
//   return retrieveRelatedArtists(id);
// };

// const reconfigureLinks = () => {
//   const promises = [];
//   //create promises to grab related artists for each node on screen
//   //set up promises array to have all promises which will be run next
//   // adds that artist to list of processed artist to not retrieve their promise again
//   Object.values(window.nodes).forEach( node => {
//     if (!processedArtists[node.id]) {
//       promises.push(getRelatedArtistsPromise(node.id));
//       processedArtists[node.id] = true;
//     }
//   });

//   // retreive all related artist ids for all artists that are on screeen and haven't had their related artists retrieved
//   Promise.all(promises)
//   .then( values => {
//     console.log(values);
//     values.forEach(({ data: { artists }}) => {
//       artists.forEach( ({ id }) => {
//         relatedArtists[id] = true;
//       });
//     });
//   });
// };

const reconfigureLinks = () => {
  Object.values(window.nodes).forEach( artist => {
    artist.getRelatedArtistsPromise()
      .then( ({data: {artists}}) => {
        artist.relatedArtists = artists.map( ({ id }) => id);
        createArtistLinks(artist);
      });
  });
};

//this might be wrong, might want to only create artist links when target is primary.
// const createArtistLinks = artist => {
//   artist.relatedArtists.forEach( id => {
//     if (nodes[id]) {
//       links[`${artist.id}-${id}`] = { source: artist.id, target: id };
//       links[`${id}-${artist.id}`] = { source: id, target: artist.id };
//     }
//   });
// }; 
