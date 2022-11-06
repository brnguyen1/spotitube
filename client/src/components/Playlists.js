import React, { useEffect, useState } from 'react';
import { useHref } from 'react-router-dom'
import '../App.css';
import axios from 'axios'

function Table(props) {
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>Playlists</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(props.playlists).map(item =>
          <tr key={item.name} onClick={() => props.onClick(item)}>
            <td>{item.name}</td>
          </tr>
        )}
      </tbody>

    </table>
  )
}

function Playlists() {
  const [playlists, setPlaylists] = useState({})
  // const [selectedPlaylist, setSelectedPlaylist] = useState("")

  async function fetchData() {
    let res = await axios.get("http://localhost:8888/callback/playlists")
    return res
  }

  function postPlaylists(item) {
    axios.post("http://localhost:8888/callback/tracks", { item }).then(res => {
      console.log(res.data)
      return <useHref to={res.data} />
    })
  }

  useEffect(() => {
    function parseData() {
      fetchData().then(res => {
        setPlaylists(res.data.items)
      })
    }

    parseData()
  }, [playlists])

  return (
    <div>
      <Table playlists={playlists} onClick={postPlaylists} />
    </div>
  )
}

export default Playlists;