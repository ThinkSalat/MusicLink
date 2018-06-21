import { addNewPrimaryNode } from "../../util/node_util";
import { getArtistBio } from "../../util/util";

export default class Node {
  constructor({external_urls: { spotify }, genres, id, images, name, primary, secondary, tertiary}) {
    this.url = spotify;
    this.genres = genres;
    this.id = id;
    this.images = images;
    this.name = name;
    this.primary = primary;
    this.secondary = secondary;
    this.tertiary = tertiary;
    this.links = [];
    this.relationships = [];
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    getArtistBio(this.id);
    addNewPrimaryNode(this.id);
  }

  addLinks() {
    
  }
}