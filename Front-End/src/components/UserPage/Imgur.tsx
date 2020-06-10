import React, { Component } from "react";
import axios from 'axios';
import { url as _url } from '../../url';
// import config from "../config.js";

class Imgur extends Component<any> {

  constructor(props: any) {
    super(props);
    this.state = {
      file: "file",
    };
  };

  EditUserInfo = async () => {
    const _id = window.sessionStorage.getItem('id')
    // const _id = "3"
    const semi_nickname = window.sessionStorage.getItem("nickname");
    const _password = window.sessionStorage.getItem("password");
    try {
      const _nickname = semi_nickname
        ? semi_nickname.replace(/^"+|"+$/g, "")
        : semi_nickname;
      const res = await axios({
        method: "put",
        url: `${_url}/api/user_detail/${_id}/`,
        data: {
          password: _password,
          nickname: _nickname,
          kakao_id: _id,
          // @ts-ignore
          item_image: this.state.file,
          // monthly_cost: this.props.monthlyInput,
          // item: this.props.item,
          // price: this.props.price
        },
        responseType: "json",
      });
    }
    catch (err) {
      alert(err)
    }
  }

  uploadImage() {
    const r = new XMLHttpRequest();
    const d = new FormData();
    // @ts-ignore
    const e = document.getElementsByClassName("input-image")[0].files[0];
    var u;
    d.append("image", e);
    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", `Client-ID 1001abddfee2596`);
    r.onreadystatechange = function () {
      if (r.status === 200 && r.readyState === 4) {
        // console.log('r', r);
        let res = JSON.parse(r.responseText);
        u = `https://i.imgur.com/${res.data.id}.png`;
        // @ts-ignore
        this.setState({ file: u });
        // @ts-ignore
        // console.log('이거', this.state.file)
        this.EditUserInfo()
      }
    }.bind(this);
    alert(`${e.name} 이/가 업로드 되었습니당`)
    r.send(d);
  };


  render() {
    return (
      <div className="App">
        {(this.props.isEdit === true)
          ?
          <>
            <div className="App-header">
              <h2>이미지등록하기</h2>
            </div>
            <form>
              <input
                type="file"
                className="input-image"
                onChange={this.uploadImage.bind(this)}
                // @ts-ignore
                placeholder={this.state.file}
              />
            </form>
          </>
          :
          <>
            <div className="App-header">
            </div>
          </>
        }
      </div>
    );
  }
}

export default Imgur;