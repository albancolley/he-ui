import React from "react";
import Photos from "./components/Photos";

import "./App.css";

import fetchJsonp from "fetch-jsonp";

require('es6-promise').polyfill();

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
    //let url = "https://api.flickr.com/services/rest/?api_key=250b611d0c93479aacfefce5b72d1ab5&method=flickr.photos.getRecent&format=json&per_page=10&page=1&extras=description,tags,url_q,owner_name&nojsoncallback=1";
    let url = "https://api.flickr.com/services/feeds/photos_public.gne?format=json";
    fetchJsonp(url, {
      jsonpCallback: 'jsoncallback',
      timeout: 3000
      })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            photos: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, photos } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Photos photos={photos}/>
        </div>
      );
    }
  }
}
export default App;
