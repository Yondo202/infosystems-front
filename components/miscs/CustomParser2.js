import React from "react";
import { Parser } from "html-to-react";
const parser = new Parser();

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const HtmlParser = ({ data }) => {
  React.useEffect(() => {
    let tmp = document.querySelector("oembed");
    if(tmp){
      let url = tmp.getAttribute("url");
      let iframe = document.createElement("iframe");
      iframe.setAttribute("src", "//www.youtube.com/embed/" + getId(url));
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", tmp.parentElement.offsetWidth * 0.5625);
      insertAfter(iframe, tmp);
    }
    
    let tmpImg = document.querySelectorAll("figure");
    let arr = Array.from(tmpImg);

    if(arr.length > 0){
      arr.forEach(el=>{
        let img = el.querySelector("img");
        let url = img.getAttribute("src");
        if(!url.includes("http")){
          img.setAttribute("src", process.env.serverUrl+url);
        }
      })
    }


  }, [data]);
  return <div>{parser.parse(data)}</div>;
};

export default HtmlParser;