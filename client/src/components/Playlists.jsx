import React, { useEffect, useState } from 'react';
import { getPlaylists, postPlaylist } from '../functions/api';
import '../App.css';
import Header from './Header';

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

  useEffect(() => {
    function parseData() {
      getPlaylists().then(res => {
        setPlaylists(res.data.items)
      })
    }

    parseData()
  }, [])

  return (
    <div className='container'>
      <Header />
      <Table playlists={playlists} onClick={postPlaylist} />
    </div>
  )
}

export default Playlists;