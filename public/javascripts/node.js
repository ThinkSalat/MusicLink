import { addNewPrimaryNode } from "../../util/node_util";
import { getArtistBio } from "../../util/util";

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
    getArtistBio({
      url: this.url,
      name: this.name,
      genres: this.genres,
      id: this.id
    });
    addNewPrimaryNode(this.id);
  }
}