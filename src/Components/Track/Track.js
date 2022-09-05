import React from "react";
import "./Track.css";


class Track extends React.Component {

    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.checkNameLength = this.checkNameLength.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        if(this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    checkNameLength() {
        const titleName = this.props.track.name;
        if (titleName.length >= 45) {
            const trimmedString = titleName.substring(0, 45) + "...";
            return <h3>{trimmedString}</h3>
        } else {
            return <h3>{titleName}</h3>
        }
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    {this.checkNameLength()}
                    <p>{this.props.track.artist} |  {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;