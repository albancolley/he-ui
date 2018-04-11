import React from "react";
import { Card, Image, Popup } from "semantic-ui-react";
//import Base58 from "base58";

class Photo extends React.Component {

  trimValue(value, length)
  {
    let result = value;
    if (result.length > length) {
      result = value.substring(0, length);
      result += "...";
    }
    return result;
  }

  popup(longText, shortText, url)
  {
    return (
    <Popup placement="bottom" content={longText} basic
      trigger={
      <a
        href={url}
        target="_blank"
      >
        {shortText}
      </a>
    }
    />
  )
  }

  getDescription(fullDescription)
 {
   let descriptions = fullDescription.split(/<p>|<\/p>|¤/);
   if (descriptions.length >= 6)
   {
     return descriptions[5];
   }
   return "";
 }

  render() {
    let title = this.props.photo.title;
    if (title.length === 0) {
      title = "Untitled";
    }
    let shortTitle = this.trimValue(title,10);

    let author = this.props.photo.author;
    let shortauthor = this.trimValue(author,10);


    return (
      <Card>
          <Image centered aligned alt="filckr photo" src={this.props.photo.media.m} style={{height:240}} />
        <Card.Content>
          <Card.Header>
            Title:{" "}
            {this.popup(title, shortTitle,this.props.photo.link)}
            {" "}by{" "}
            {this.popup(author, shortauthor,"https://www.flickr.com/people/47362452@N02" + this.props.photo.author_id)}
          </Card.Header>
          <Card.Description dangerouslySetInnerHTML={{__html:this.getDescription(this.props.photo.description)}}/>
        </Card.Content>
         <Card.Content extra>
           <a>Tags: {this.props.photo.tags}</a>
         </Card.Content>
      </Card>
    );
  }
}


export default Photo;
