import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getSpotifyAccessLink, getYoutubeAccessLink } from '../functions/api';
import { spotifyLogOut, youtubeLogOut } from '../functions/authentication';

function Authorize() {
  const [spotifyAuth, setSpotifyAuth] = useState(false);
  const [youtubeAuth, setYoutubeAuth] = useState(false);
  const [spotifyLink, setSpotifyLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  useEffect(() => {
    getSpotifyAccessLink().then(res => {
      setSpotifyLink(res.data);
    });

    getYoutubeAccessLink().then(res => {
      setYoutubeLink(res.data);
    })

    let authInterval = setInterval(() => {
      if (sessionStorage.getItem("spotifyAccessToken")) {
        setSpotifyAuth(true);
      }
      if (sessionStorage.getItem("youtubeAccessToken")) {
        setYoutubeAuth(true);
      }
    }, 100)

    return () => clearInterval(authInterval);
  }, [])


  return (
    <div>
      {spotifyAuth && youtubeAuth ? <Navigate to='/playlists' /> : null}
      <div>
        {!spotifyAuth ? <a href={spotifyLink}>Spotify Login</a> : <button onClick={() => spotifyLogOut()}>Sign Out of Spotify</button>}
      </div>
      <div>
        {!youtubeAuth ? <a href={youtubeLink}>Youtube Login</a> : <a onClick={() => youtubeLogOut()}>Sign Out of Youtube</a>}
      </div>
    </div>
  )

}

export default Authorize;