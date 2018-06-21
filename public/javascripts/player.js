export const sendTracksToPlayer = tracks => {
  console.log(tracks);
  const topTrackNames = tracks.map(track => track.name);
  const trackUris = tracks.map(track => track.uri);
  console.log(topTrackNames);
  //Send to player here
  $(".player-panel").css('display','block');
//create this w proper url
 //<iframe src="https://open.spotify.com/embed/album/6pkQfQc58FFRwpdqOxJizg" width="300" height="380" frameborder="1" allowtransparency="true"></iframe>

};