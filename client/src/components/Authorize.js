import axios from 'axios';
import { useState, useEffect } from 'react';
import '../App.css';

function Authorize() {
  const [link, setLink] = useState("")

  useEffect(() => {
    function getAccessLink() {
      axios.get("http://localhost:8888").then(res =>
        setLink(res.data)
      )
    }

    getAccessLink();
  }, [])

  return (
    <a href={link}>Login</a>
  )

}

export default Authorize;