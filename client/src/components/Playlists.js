import React, {Component} from 'react';
import RenderList from './RenderList';
import '../App.css';
import axios from 'axios'



class Playlists extends Component {
    constructor(props){
      super(props);
      this.state = {accessToken: "", playlists: [], selectedPlaylist: ""};

      this.postPlaylist = this.postPlaylist.bind(this);
    }
    fetchToken(){
      return fetch("http://localhost:8888/callback/token");
    }
    fetchPlaylists(){
        axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + this.state.accessToken}
        })
        .then(res => this.setState({playlists: res.data.items, selectedPlaylist: res.data.items[0].name}))
        .then(console.log(this.state.playlists))
    }

    onPlaylistChange = (e) => {
      this.setState({selectedPlaylist: e.target.value});
    }

    postPlaylist(){
      axios.post('http://localhost:8888/youtube/song', {
        data: this.state.playlists.find(p => p.name == this.state.selectedPlaylist),
      })
      console.log(this.state.selectedPlaylist);
    }
  
    componentDidMount() {
      this.fetchToken()        
      .then(res => res.text())
      .then(res => this.setState({accessToken: res}))
      .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState){
      if (this.state.accessToken !== prevState.accessToken) {
        this.fetchPlaylists();
      }
    }
  
    render() {
      return (
        <div>
            <RenderList objects={this.state.playlists} onChange={this.onPlaylistChange} />
            <button onClick={this.postPlaylist}>Make Playlist</button>
        </div>
      )
    }
  }

export default Playlists;