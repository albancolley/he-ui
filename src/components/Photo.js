import React from "react";
import {Card, Image, Popup, Label} from "semantic-ui-react";

//import Base58 from "base58";

class Photo extends React.Component {

    trimValue(value, length) {
        let result = value;
        if (result.length > length) {
            result = value.substring(0, length);
            result += "...";
        }
        return result;
    }

    popup(longText, shortText, url) {
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

    getDescription(fullDescription) {
        let descriptions = fullDescription.split(/<p>|<\/p>|¤/);
        if (descriptions.length >= 6) {
            return descriptions[5];
        }
        return "";
    }

    extractTextInQuotes( str ){
        var ret = "";

        if ( /"/.test( str ) ){
            ret = str.match( /"(.*?)"/ )[1];
        } else {
            ret = str;
        }

        return ret;
    }

    extractTags() {
        let tags = this.props.photo.tags.trim();

        let tagsHtml = "";

        if (tags) {
            tagsHtml = tags.split(' ').map(function (tag, index) {
                return <Label size="mini" as="a" key={index}>{tag}</Label>;
            });
        }

        return tagsHtml;
    }

    render() {
        let title = this.props.photo.title;
        if (title.length === 0) {
            title = "Untitled";
        }
        let shortTitle = this.trimValue(title, 10);

        let author = this.extractTextInQuotes(this.props.photo.author);
        let shortauthor = this.trimValue(author, 10);
        let tags = this.extractTags();

        return (
            <Card>
                <Image centered aligned alt="filckr photo" src={this.props.photo.media.m} style={{height: 240}}/>
                <Card.Content>
                    <Card.Header>
                        Title:{" "}
                        {this.popup(title, shortTitle, this.props.photo.link)}
                        {" "}by{" "}
                        {this.popup(author, shortauthor, "https://www.flickr.com/people/" + this.props.photo.author_id)}
                    </Card.Header>
                    <Card.Description style={{overflow: 'auto', height: 100}}
                                      dangerouslySetInnerHTML={{__html: this.getDescription(this.props.photo.description)}}/>
                </Card.Content>
                <Card.Content extra style={{overflow: 'auto', height: 50}}>
                    Tags: {tags}
                </Card.Content>
            </Card>
        );
    }


}


export default Photo;
