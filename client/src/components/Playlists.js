import React, {Component} from 'react';
import RenderList from './RenderList';
import '../App.css';
import axios from 'axios'

async function fetchToken(){
  return await fetch("http://localhost:8888/callback/token");
}

class Playlists extends Component {
    constructor(props){
      super(props);
      this.state = {accessToken: "", playlists: [], selectedPlaylist: ""};
    }

    fetchPlaylists(){
        axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + this.state.accessToken}
        })
        .then(res => this.setState({playlists: res.data.items}))
    }

    onPlaylistChange = (e) => {
      this.setState({selectedPlaylist: e.target.value})
      console.log(this.state.selectedPlaylist)
    }
  
    componentDidMount() {
      fetchToken()        
      .then(res => res.text())
      .then(res => this.setState({accessToken: res}))
      .catch(err => console.log(err))
      console.log(this.state.accessToken)
    }

    componentDidUpdate(prevProps, prevState){
      if (this.state.accessToken !== prevState.accessToken) {
        console.log(this.state.accessToken);
        this.fetchPlaylists();
        console.log(prevState.accessToken)
      }
    }
  
    render() {
      return (
        <div>
            <RenderList objects={this.state.playlists} onChange={this.onPlaylistChange} />
        </div>
      )
    }
  }

export default Playlists;