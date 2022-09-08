import React from "react";
import "./Playlist.css";

import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {

    constructor(props) {
        super(props);    

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value)
    }

    handleSubmit() {
        if (!this.props.submit) {
            return "SAVE TO SPOTIFY"
        } else {
            return "PLAYLIST SAVED!"
        }
    }

    render() {
        return(
            <div className="Playlist">
                <input value={this.props.playlistName} placeholder={this.props.placeHolder} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks}
                           onRemove={this.props.onRemove}
                           isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>{this.handleSubmit()}</button>
            </div>
        )
    }
}

export default Playlist;