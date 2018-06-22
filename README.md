# MusicLink
A D3 data visualization project in JavaScript

[Live Site](musiclink.trendr.com)

MusicLink's main functionality is created in JavaScript, d3.JS. I used jQuery and Axios for parsing and AJAX calls respectively
The data mostly comes from Spotify's API, which is handled in real-time by a Node.JS server running on the Express framework. 

To use the app, type an artist into the search bar. It uses an custom made autocomplete engine that pings the Spotify server to search for artists that match the query an return the five most relevenat results.
After selecting an artist, the user is presented with a web graph built with d3.JS consisting on the main artist represented as a pink outlined node, surrounded by artist's related to that artist.
If a biography of the artist is available, it will display in a biography pane, along with a link to the artist's spotify page on the left hand side.

![main functionality](https://raw.githubusercontent.com/ThinkSalat/MusicLink/master/readme%20docs/functionality.gif)

Selecting an artist kicks off a complex series of AJAX calls, sending JavaScript promises all around the app in order to get information where it needs to be.
`callSpotifyAPI` kicks things off. This takes in a Spotify API url to request info from, and returns a promise which will perform all the necessary steps to authenticate with Spotify's OAuth2 API then return the resultant data.
It serves as a connection between the frontend => the Node.js/Express server => Spotify's authentication API => back to the Node.JS Server => Spotify's Music API =>back to the Node Server again => and finally back to the function calling it.

`const callSpotifyAPI = url => axios.get('/authtoken', {params: {url}});`

Here is the server side code that authenticates and then sends the ajax call to spotify.


An issue I ran into right away is that the artist bio isn't accessible through Spotify's API, so I scraped it by cross-referencing the artist's id from that API and calling an Axios AJAX call on the spotify artist's web app url. This returns a string containing the entire contents of the HTML document.
Originally, I devised a series of regular expressions, but that required constant maintenance. jQuery has a parseHTML method, which takes in the HTML string and turns it into a jQuery element.
From there it wasn't that hard to select the proper elements and inject them into the artist bio panel.


Future updates will include: improved links between nodes, improved layout and data separation, zoom functionality, transitions for the artist bio and player panels, resizing of nodes based on number of listners or other parameters