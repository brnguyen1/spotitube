import { useState, useEffect } from 'react';
import { getSpotifyAccessLink } from '../functions/api';

function Authorize() {
  const [link, setLink] = useState("")

  useEffect(() => {
    getSpotifyAccessLink().then(res => {
      setLink(res.data)
    });
  }, [])

  return (
    <a href={link}>Login</a>
  )

}

export default Authorize;