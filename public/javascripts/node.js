import { addNewPrimaryNode } from "../../util/node_util";
import { getArtistBio } from "../../util/util";
import { createD3, clearNodes } from './d3';

export default class Node {
  constructor({external_urls: { spotify }, genres, id, images, name, priority}) {
    this.url = spotify;
    this.genres = genres;
    this.id = id;
    this.images = images;
    this.name = name;
    this.priority = priority;
    this.relatedArtistIds = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (window.selectedNode === this) return

    getArtistBio({
      url: this.url,
      name: this.name,
      genres: this.genres,
      id: this.id
    });
    window.selectedNode = this;
    console.log('hey 26 node.js');
    createD3();
    // addNewPrimaryNode(this.id);
  }
  getIcon() {
   return  this.images.length ? this.images[this.images.length-1].url : 'http://groovesharks.org/assets/images/default_avatar.jpg';
  }
}