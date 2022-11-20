import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import {Spotify} from '../../util/Spotify'

import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults:  [],
      playlistName: 'playlist1',
      playlistTracks: [] 
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }
  addTrack(track){
    let isNewTrack = this.state.playlistTracks.filter(currentTrack=>{return currentTrack.id===track.id}).length === 0
    if(isNewTrack) {
      this.state.playlistTracks.push(track)
      this.setState({playlistTracks:this.state.playlistTracks})
    }
    
  }
  removeTrack(track){
    let newPlaylistTracks =this.state.playlistTracks.filter(currentTrack=>{return currentTrack.id!==track.id})
    this.setState({playlistTracks:newPlaylistTracks})
  }
  updatePlaylistName(name){
    this.setState({playlistName:name})
  }
  savePlaylist(){
    
    let trackURIs = this.state.playlistTracks.map(track=>{return track.uri})
    Spotify.savePlayList(this.state.playlistName,trackURIs).then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }
  search(term){
    console.log(term)
    Spotify.search(term).then(searchResults=>{
      this.setState({searchResults:searchResults})
    })
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              />
          </div>
        </div>
      </div>
    );    
  }

}

export default App;
