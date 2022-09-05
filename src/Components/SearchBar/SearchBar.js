import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term: ""
        }

        this.search = this.search.bind(this);

        this.handleTermChange = this.handleTermChange.bind(this);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleKeyPress(event) {
        if (event.key !== "Enter") {
            return
        } else {
            this.search();
        }
    }

    handleTermChange(event) {
        this.setState({term: event.target.value})
    }

    render() {
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} autoFocus onKeyPress={this.handleKeyPress}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;