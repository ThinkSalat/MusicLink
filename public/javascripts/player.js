const addSongsToPlaylist = songUris => {

}
const removeSongsFromPlaylist = () => {
  
}

export const sendTracksToPlayer = tracks => {
  const topTrackNames = tracks.map(track => track.name);
  const trackUris = tracks.map(track => track.uri);
  console.log(trackUris);
  console.log(topTrackNames);
  //Send to player here
  const playerPanel = $(".player-panel");
  playerPanel.css('display','block');
  const embedPlayer = $(`<iframe src='https://open.spotify.com/embed/artist/${artistId}' width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
//create this w proper url
//<iframe src=`https://open.spotify.com/embed/artist/${artistId}` width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

};