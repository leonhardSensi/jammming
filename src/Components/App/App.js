import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],

      playlistName: "",

      playlistTracks: [],

      placeHolder: "New Playlist",

      submit: false
    };

    this.addTrack = this.addTrack.bind(this);

    this.removeTrack = this.removeTrack.bind(this);

    this.updatePlaylistname = this.updatePlaylistname.bind(this);

    this.savePlaylist = this.savePlaylist.bind(this);

    this.search = this.search.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      alert("This track is already on the playlist!")
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  };

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      const updatedTracks = tracks.filter(removedTrack => removedTrack.id !== track.id)
      this.setState({playlistTracks: updatedTracks});
    }

  };

  updatePlaylistname(name) {
    this.setState({playlistName: name});
  };

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      if (!this.state.playlistName) {
        alert("Playlist must have a title!");
        return;
      } else if (this.state.playlistTracks.length === 0) {
        console.log(this.state.playlistTracks)
        alert("Playlist is empty!");
        return
      } else {
        this.setState({
          playlistName: "",
          playlistTracks: [],
          submit: true
        })
        console.log("state after setState", this.state.submit)

        setTimeout(this.handleSubmit, 2000)

      }
    })
  };

  handleSubmit() {
    console.log("handleSubmit state", this.state.submit)
    this.setState({
      submit: false
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  };


  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistname}
                      onSave={this.savePlaylist}
                      placeHolder={this.state.placeHolder}
                      submit={this.state.submit}/>
          </div>
        </div>
      </div>
    )
  };
}

export default App;