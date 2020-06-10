import React, { Component } from "react";
import styled from "styled-components";
import { url as _url } from "../../url";
import axios from "axios";
import img from "../images/kakao_login_btn_medium_narrow.png";
import { StyledText } from "../style";
import KaKaoLogin from "react-kakao-login";

declare const window: any;
interface State {
  data: any;
}

class KakaoSignUp extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "kakao",
    };
  }

  // responseKaKao = async (res: any) => {
  //   this.setState({
  //     data: res
  //   })
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: `${_url}/user_create`,
  //       data: {
  //         id: JSON.stringify(this.state.data.profile.id),
  //         nickname: JSON.stringify(this.state.data.profile.properties.nickname),
  //         profile_image: JSON.stringify(this.state.data.profile.properties.profile_image),
  //         email: JSON.stringify(this.state.data.profile.kakao_account.email),
  //         age: JSON.stringify(this.state.data.profile.kakao_account.age_range[0])
  //       },
  //       // responseType: "json"
  //     });
  //     // alert(JSON.stringify(this.state.data))
  //   }
  //   catch (err) {
  //     sessionStorage.clear()
  //     alert(err);
  // }
  // }

  responseKaKao = async (res: any) => {
    this.setState({
      data: res,
    });
    const semi_email = JSON.stringify(
      this.state.data.profile.kakao_account.email
    );
    const _email = semi_email.replace(/^"+|"+$/g, "");
    // const semi_age = JSON.stringify(this.state.data.profile.kakao_account.age_range[0])
    // const s_age = semi_age.replace(/^"+|"+$/g, '')
    // const _age = parseInt(s_age)

    try {
      alert(JSON.stringify(this.state.data.profile.id));
      const response = await axios({
        method: "get",
        // url: `${_url}/api/user_exist/`,
        // url: `${_url}/api/user_exist/${_email}/`,
        url: `${_url}/api/user_exist/${JSON.stringify(
          this.state.data.profile.id
        )}/`,
        responseType: "json",
      });
      const msg: string = JSON.stringify(response.data.message);

      if (msg == "true") {
        console.log("여기들어오나");
        console.log(msg);
        sessionStorage.setItem(
          "id",
          JSON.stringify(this.state.data.profile.id)
        );
        sessionStorage.setItem(
          "nickname",
          JSON.stringify(this.state.data.profile.properties.nickname)
        );
        sessionStorage.setItem("password", "1234");
        alert("로그인되었습니다");
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
              image: JSON.stringify(
                this.state.data.profile.properties.profile_image
              ),
              // ages: _age,
            },
            responseType: "json",
          });
          alert(signup_response);
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

  // responseKaKao = (res: any) => {
  //   this.setState({
  //     data: res
  //   })
  //   // alert(JSON.stringify(this.state.data.profile.id))  // 카카오 고유 id
  //   // alert(JSON.stringify(this.state.data.profile.properties.nickname))  // 닉네임
  //   // alert(JSON.stringify(this.state.data.profile.properties.profile_image))  // 프로필 이미지 링크
  //   // alert(JSON.stringify(this.state.data.profile.kakao_account.email))  // 이메일
  //   // alert(JSON.stringify(this.state.data.profile.kakao_account.age_range[0]))  // 연령대 (2)
  // }

  responseFail = (err) => {
    alert(err);
  };

  // loginWithKakao = () => {
  //     window.Kakao.init('baa049c9d7b8dc42694041a8b7f71232')
  //     // KaKao.Auth.cleanup();
  //     console.log('init')
  //     window.Kakao.Auth.login({
  //         success: (authObj: any) => {
  //             console.log('success')
  //             console.log(authObj.access_token);
  //             sessionStorage.setItem('jwt', authObj.access_token);
  //             window.Kakao.API.request({
  //                 url: '/v2/user/me',
  //                 success: (res: any) => {
  //                     // console.log(JSON.stringify(res));
  //                     sessionStorage.setItem('id', res.kakao_account.email);
  //                     sessionStorage.setItem('pw', '1111');

  //                     // try {
  //                     //     const isExist = async () => {
  //                     //         // console.log('들어왔다')
  //                     //         const ress = await axios({
  //                     //             method: "get",
  //                     //             url: `${_url}/member/isExist/${res.kakao_account.email}`,
  //                     //             responseType: "json"
  //                     //         });
  //                     //         if (ress.data.state === "SUCCESS") {
  //                     //             // console.log('성공하면 안되는데 성공했다^^')
  //                     //             sessionStorage.setItem("id", res.kakao_account.email);
  //                     //             sessionStorage.setItem("pw", '1111');
  //                     //             // sessionStorage.setItem('socialToken', res.accessToken);
  //                     //             this.props.history.push("/moreInfoPage");
  //                     //         } else if (ress.data.state === "FAIL") {
  //                     //             // console.log('실패했다^^')
  //                     //             sessionStorage.clear();
  //                     //             alert("이미 존재하는 계정 입니다");
  //                     //         }
  //                     //         return ress
  //                     //     }
  //                     //     isExist().then(() => {
  //                     //         console.log('결과', this.state.data)
  //                     //     })

  //                     // } catch (err) {
  //                     //     sessionStorage.clear()
  //                     //     alert(err);
  //                     // }
  //                 },
  //                 fail: function (error: any) {
  //                     alert(JSON.stringify(error));
  //                 }
  //             });
  //         },
  //         fail: function (err: any) {
  //             alert("카카오 로그인 실패");
  //         }
  //     });
  // }
  render() {
    return (
      <>
        <StyledText>
          <h1>카카오톡 간편 로그인</h1>
          <h4>로그인 후 더 많은 혜택을 누리세요!</h4>
          {/* <div>{window.sessionStorage}</div> */}
          {/* <StKaKaoLogin>
                        <img src={img} alt="a" onClick={this.loginWithKakao} />
                    </StKaKaoLogin> */}
          <br></br>
          <KaKaoBtn
            jsKey={"2b67838751764359be17923f29aa820e"}
            buttonText="KaKao"
            onSuccess={this.responseKaKao}
            onFailure={this.responseFail}
            getProfile={true}
          />
        </StyledText>
      </>
    );
  }
}
const StKaKaoLogin = styled.div`
  cursor: pointer;
  /* border-radius:10px; */
  /* width: 200px; */
  /* &:hover{
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
    } */
`;

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 190px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default KakaoSignUp;
