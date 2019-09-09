import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));
    let imageUrl = getAsset(entry.getIn(["data", "block", "imageUrl"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
        image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
        <Jumbotron image={image} title={entry.getIn(["data", "title"])} subtitle={entry.getIn(["data", "subtitle"])}/>

        <div className="bg-grey pad">
          <h2>{entry.getIn(["data", "intro", "heading"])}</h2>
          <p>{entry.getIn(["data", "intro", "text"])}</p>
        </div>

        <div className="bg-grey pad">
         {(entry.getIn(["data", "block"]) || []).map((block, i) => <div key={i}>
           <img src={getAsset(block.get("image"))} alt="" style={{width: "240px"}}/>
           <h5>{block.get("title")}</h5>
           <p>{block.get("text")}</p>
           <a className="button">{block.get("link")}</a>
         </div>)}
        </div>

        <div className="pad">
          <h2>{entry.getIn(["data", "blurb", "heading"])}</h2>
          <p>{entry.getIn(["data", "blurb", "text"])}</p>
        </div>
    </div>
  }
}
