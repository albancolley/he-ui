import React from 'react';
import Photo from "./Photo";
import { Card } from 'semantic-ui-react'

class Photos extends  React.Component {

 render() {
  const photos = this.props.photos.map((photo, i) => <Photo photo={photo} key={i} />);

  return (
    <Card.Group itemsPerRow={4} stackable>
      {photos}
    </Card.Group>
    )
  }

};


export default Photos;
