import { addNewPrimaryNode } from "../../util/node_util";
import { getArtistBio } from "../../util/util";
import { retrieveRelatedArtists } from '../../util/util';

export default class Node {
  constructor({external_urls: { spotify }, genres, id, images, name, priority}) {
    this.url = spotify;
    this.genres = genres;
    this.id = id;
    this.images = images;
    this.name = name;
    this.priority = priority;
    this.links = [];
    this.relationships = [];
    this.relatedArtistIds = {};
    this.onClick = this.onClick.bind(this);
    this.getRelatedArtistsPromise = this.getRelatedArtistsPromise.bind(this);
  }

  onClick() {
    getArtistBio(this.id);
    addNewPrimaryNode(this.id);
  }
}