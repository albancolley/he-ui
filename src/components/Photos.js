import React from 'react';
import Photo from "./Photo";
import PropTypes from 'prop-types';

class Photos extends  React.Component {
  constructor(props) {
   super(props);
 }

 render() {
  const photos = this.props.photos.map((photo, i) => <Photo photo={photo} key={i} />);

  return (
    <div>
      {photos}
    </div>
    )
  }

};


export default Photos;
