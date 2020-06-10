import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledInput, StyledBtn } from "../style";
import axios from "axios";
import { url as _url } from "../../url";
import {Typography, Box, TextField} from '@material-ui/core';
// 프로필 메뉴
// import ProfileMenu from "../UserPage/00ProfileMenu";

const MonthlyInput = ({fullpage_api}) => {
  const [data, setData] = useState(0);
  const onChangeInput = (e: any) => {
    const monthly_data = parseInt(e.target.value);
    setData(monthly_data);
  };
  const _id = window.sessionStorage.getItem("id");
  const semi_nickname = window.sessionStorage.getItem("nickname");
  const _password = window.sessionStorage.getItem("password");
  const onSubmit = async () => {
    try {
      // console.log("여기확인");
      // console.log(_id);
      const _nickname = semi_nickname
        ? semi_nickname.replace(/^"+|"+$/g, "")
        : semi_nickname;
      // console.log(data);
      const res = await axios({
        method: "put",
        url: `${_url}/api/user_detail/${_id}/`,
        data: {
          password: _password,
          kakao_id: _id,
          nickname: _nickname,
          monthly_cost: data,
        },
        responseType: "json",
      });
      fullpage_api.moveSlideRight()
    } catch (err) {
      alert(err); // WTF?
    }
  };
  const Enter_Check = (e) => {
    if (e.keyCode == 13) {
      onSubmit(); // 실행할 이벤트
    }
  };
  return (
    <>
      <StyledText
      
      style={{
        position:'relative',
        top:'30%',
        width:'100%'
      }}>
    <h2>나는 한달 평균 식비를 <br/>
          {/* <StyledInput
            // onChange={onChangeInput}
            // onKeyDown={Enter_Check}
          ></StyledInput><br/> */}
          <TextField id="standard-basic"
          inputProps={{min: 0, style: { textAlign: 'center' }}}
          style = {{
            width:'10rem',
          
            
        }}
            onChange={onChangeInput}
            onKeyDown={Enter_Check}
          >

          </TextField>
           원 써요    
    <br/> </h2>
    <StyledBtn onClick={onSubmit}>추가</StyledBtn>
      </StyledText>
    </>
  );
};

export default MonthlyInput;
