# MusicLink
A D3 data visualization project in JavaScript
[MusicLink](#)
**MuscLink** is a music exploration app. After searching for an artist, the user is presented with a web showing the artist they searched for connected to 10-20 related artists, represented by connected nodes. When the user clicks on an artist's node, they can view the artist's bio and a playlist of their top ten songs in the bottom left side of the screen.

Technologies implemented: 

**Axios** for ajax calls

**Spotify API** for artist data

**Express** backend to communicate with Spotify API and avoid cors issues

**D3** for data visualization

**NPM** and **Webpack** for bundling

**JavaScript** for all the rest

## Minimum Viable Products
### MusicLink
MusicLink is a music discovery and research app. Simply search for an artist you like and select them from the search results. Once selected, they'll appear with related artists, all represented as connected nodes. Selecting another artist's node will load that artist's related artists. If an artist is related to multiple artists on screen, their node will be connected to each, allowing the user to see the complex relationships between musical artists. When an artist is selected, the left hand modal housing the artist panel will show the artist's bio scraped from spotify's about page. The right hand bottom modal housing the play panel will show their top tracks allowing users to easily listen to the artist's most popular tracks.

#### 1. Search **(1 Day)**
* Asynchronously Pings Spotify API for search query string after every character typed.
* Cancels other API calls if handleInput is called multiple times in succession
* Only shows results for last input

#### 2. Artist Nodes **(1 Day)**
* Show's artist picture from Spotify
* onClick sends artist info to ArtistPanel

#### 3. ArtistPanel **(1 Day)**
* Show's artists bio scraped from spotify about page
* Show's link to artist's spotify page in either web browser link or link to open spotify player
* Concatenates if reaches bottom of page 

#### 4. Artist Links **(1 Day)**
* when Artist Node is mounted, creates new nodes for each related artist
* Connects artists that are related to each other
* Does not create duplicate nodes
* when creating node, it goes through related artists, and if the artist already exists in a node, connects to that node, otherwise it creates a new node for that artist and connects it. 
* When an artist node is created, it searches for any artists already on-screen that are in its related artists and connects to them, but does not create nodes that do no exist yet

#### 5. PlayerPanel **(1 Day)**
* Shows currently Selected Artist's top songs
* Allows to select between songs.

## Wireframes

![](https://raw.githubusercontent.com/ThinkSalat/MusicLink/master/wireframe.png)