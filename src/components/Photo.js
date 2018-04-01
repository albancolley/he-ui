import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

class Photo extends  React.Component {
  constructor(props) {
   super(props);
 }


 render() {
  return (
    <Card
    hoverable
    style={{ width: 150 }}
    cover={<img alt="filckr photo" src={this.props.photo.url_q} />}
    >
    <Meta
      title={this.props.photo.title}
      description={this.props.photo.title}
    />
  </Card>
  );
};
};

Photo.propTypes = {
};

export default Photo;
