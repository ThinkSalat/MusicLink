import { EADDRINUSE } from "constants";

export const createAutocompleteList = artists => {
  if (!artists || !artists.length) {
    const emptyList = document.createElement('ul');
    const emptyListItem = document.createElement('li');
    emptyListItem.innerHTML = "Couldn't find artist with that name";
    emptyList.appendChild(emptyListItem);
    return emptyList;
  }
  const ul = document.createElement('ul');
  ul.setAttribute('id','name-list');
  artists.forEach( artist => {
    const listItem = createListItem(artist);
    ul.appendChild(listItem);
  });
  console.log(ul);
  return ul;
};

export const createListItem = artist => {
  const listItem = document.createElement('li');
  listItem.setAttribute('id', 'list-item');

  const artistImage = document.createElement('img');
  artistImage.setAttribute('class', 'list-image');
  if (artist.imageUrl === 'default') {
    artistImage.setAttribute('src', 'http://groovesharks.org/assets/images/default_avatar.jpg');
  } else {
    artistImage.setAttribute('src', artist.imageUrl);
  }
  const artistNameContainer = document.createElement('div');
  const artistName = document.createElement('span');
  artistName.innerHTML = artist.name;
  artistNameContainer.appendChild(artistName);

  listItem.appendChild(artistImage);
  listItem.appendChild(artistNameContainer);

  return listItem;
};