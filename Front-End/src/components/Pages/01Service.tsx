import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { url as _url } from "../../url";
import axios from "axios";
import KaKaoLogin from "react-kakao-login";
import { Grid, Typography, Box } from '@material-ui/core';

declare const window: any;
interface State {
  data: any;
}

class Service extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "kakao",
    };
  }

  responseKaKao = async (res: any) => {
    this.setState({
      data: res,
    });
    const __email = this.state.data.profile.kakaka_account.email
    if (__email == "" || __email == null || __email == undefined) {
      const semi_email = JSON.stringify(
        this.state.data.profile.kakao_account.email
      );
      var _email = semi_email.replace(/^"+|"+$/g, "");
    } else {
      var _email = '이메일이없습니다';
    }



    // const semi_age = JSON.stringify(this.state.data.profile.kakao_account.age_range[0])
    // const s_age = semi_age.replace(/^"+|"+$/g, '')
    // const _age = parseInt(s_age)

    try {
      // alert("요청보낸당");
      // console.log(this.props.fullpage_api)
      const response = await axios({
        method: "get",
        url: `${_url}/api/user_exist/${JSON.stringify(
          this.state.data.profile.id
        )}/`,
        // url: `${_url}/api/user_exist/4/`,
        responseType: "json",
      });
      const msg: string = JSON.stringify(response.data.message);
      if (msg == "true") {
        window.sessionStorage.setItem(
          "id",
          JSON.stringify(this.state.data.profile.id)
        );
        sessionStorage.setItem(
          "nickname",
          JSON.stringify(this.state.data.profile.properties.nickname)
        );
        sessionStorage.setItem("password", "1234");
        alert("로그인되었습니다");
        this.props.fullpage_api.moveSectionDown();
        // window.location.href = "http://13.125.68.151:8081/#fifthPage";
      } else {
        try {
          const signup_response = await axios({
            method: "post",
            url: `${_url}/api/user_list/`,
            data: {
              password: 1234,
              email: _email,
              kakao_id: JSON.stringify(this.state.data.profile.id),
              nickname: JSON.stringify(
                this.state.data.profile.properties.nickname
              ),
              profile_image: JSON.stringify(
                this.state.data.profile.properties.profile_image
              ),
              item: "에어팟",
              item_image: "https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/269056d2-2466-4aff-bd5f-f6c6f908bbe6.jpeg",
              // ages: _age,
            },
            responseType: "json",
          });
          // 회원가입 -> Survey 연결 부분
          alert("회원가입 되었습니다.");
          this.props.fullpage_api.moveSlideRight();
          // window.location.href='http://13.125.68.151:8081/#thirdPage';
          window.sessionStorage.setItem(
            "id",
            JSON.stringify(this.state.data.profile.id)
          );
          sessionStorage.setItem(
            "nickname",
            JSON.stringify(this.state.data.profile.properties.nickname)
          );
          sessionStorage.setItem("password", "1234");
        } catch (err) {
          sessionStorage.clear();
          alert(err);
        }
      }
    } catch (err) {
      sessionStorage.clear();
      alert(err);
    }
  };

  responseFail = (err) => {
    alert(err);
  };
  render() {
    return (
      <>
        <StyledText id="myMenu"
          style={{
            position: 'relative',
            top: '10%'
          }}

        >
          <h2>42000건의 빅데이터를 활용해<br />
            여러분의 소비를 비교/분석 해드려요.<br />
            식비 맞춤형 맛집도 추천해드립니다.<br />
            회원가입을 하면 더 많은 서비스를<br />
            이용하실 수 있어요<br />
          </h2>

          <KaKaoBtn
            jsKey={"2b67838751764359be17923f29aa820e"}
            buttonText="KaKao"
            onSuccess={this.responseKaKao}
            onFailure={this.responseFail}
            getProfile={true}
          >
            카카오 간편 로그인
          </KaKaoBtn>
        </StyledText>
      </>
    );
  }
}

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 25%;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 2vw;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default Service;
