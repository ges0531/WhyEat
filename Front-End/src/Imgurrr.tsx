import React, { FunctionComponent, Component, useEffect } from "react";
// import config from "../config.js";

const Imgur: FunctionComponent<any> = () => {
  const uploadImage = () => {
    const r = new XMLHttpRequest();
    const d = new FormData();
    // @ts-ignore
    const e = document.getElementsByClassName("input-image")[0].files[0];
    var u;
    d.append("image", e);
    // console.log(e);
    // console.log(d);
    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", `Client-ID 1001abddfee2596`);
    
    r.onreadystatechange = function () {
      if (r.status === 200 && r.readyState === 4) {
        // console.log(r);
        let res = JSON.parse(r.responseText);
        u = `https://i.imgur.com/${res.data.id}.png`;
        // console.log(u);
      }
    };
    r.send(d);
    
  }
    return (
      <div className="App">
        <div className="App-header">
          <h2>사고싶은 상품 등록하기</h2>
        </div>
        <form>
          <input
            type="file"
            className="input-image"
            onChange={(e) => uploadImage.bind(e.target.value)}
          />
        </form>
      </div>
    );
  }

export default Imgur;