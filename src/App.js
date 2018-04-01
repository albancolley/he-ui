import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import Photos from "./components/Photos";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      photos: []
    };
  }

  componentDidMount() {
    fetch("https://api.flickr.com/services/rest/?api_key=250b611d0c93479aacfefce5b72d1ab5&method=flickr.photos.getRecent&format=json&per_page=50&page=2&extras=description,tags,url_q,owner_name&nojsoncallback=1")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            photos: result.photos.photo
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Photos photos={this.state.photos}/>
        </div>
      );
    }
  }
}
export default App;
