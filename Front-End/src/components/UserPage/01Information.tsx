import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledInput, StyledBtn } from '../style';
import axios from 'axios';
import { url as _url } from '../../url';
import Imgur from "./Imgur";
import { TextField } from "@material-ui/core"
import styled from "styled-components";

import { Typography, Container, Grid, Box } from "@material-ui/core";

const Information: FunctionComponent<any> = ({ setUserImage }: any) => {
  const [userInfo, setUserInfo] = useState([] as any);
  const [isEdit, setIsEdit] = useState(false as boolean);

  const [monthlyInput, setMonthlyInput] = useState(
    userInfo.monthly_cost as any
  );
  const [item, setItem] = useState(userInfo.item as any);
  const [price, setPrice] = useState(userInfo.price as any);

  const [toggle, setToggle] = useState(true as any);

  useEffect(() => getUserInfo(), [toggle]);

  const getUserInfo = () => {
    const _id = window.sessionStorage.getItem('id');
    // const _id = "3";
    axios.get(`${_url}/api/user_detail/${_id}/`)
      .then(response => {
        setUserInfo(response.data)
        // setUserImage(response.data.profile_image)
      });
  };

  const EditUserInfo = async () => {
    const _id = window.sessionStorage.getItem('id')
    // const _id = "3"
    try {
      const res = await axios({
        method: "put",
        url: `${_url}/api/user_detail/${_id}/`,
        data: {
          password: "1234",
          nickname: userInfo.nickname,
          kakao_id: _id,
          monthly_cost: monthlyInput,
          item: item,
          price: price,
        },
        responseType: "json",
      });
      alert("회원 정보가 수정되었습니다");
      setToggle(!toggle);
    } catch (err) {
      alert(err);
      setToggle(!toggle);
    }
    // reload();
  };

  const isEditHandler = () => {
    {
      isEdit ? EditUserInfo() : console.log("회원정보 수정");
    }

    setIsEdit(!isEdit);
    console.log(isEdit)
  };

  const monthlyCostHandler = (e: any) => {
    setMonthlyInput(e.target.value);
  };

  const itemHandler = (e: any) => {
    setItem(e.target.value);
  };

  const priceHandler = (e: any) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <Grid container style={{
        textAlign: "center"
        // , width:"80%"
      }}>
        <Grid item
          style={{
            width: '54%', position: "relative",
            display: "inline-block",
            textAlign: "center",
            marginLeft: "23%",
            marginRight: "23%",
          }}>
          {isEdit
            ?
            <StyledText>
              <h1>회원정보 수정</h1>
              <hr />
              <Grid style={{ textAlign: 'center' }} >
                <Imgur isEdit={isEdit} monthlyInput={monthlyInput} item={item} price={price} />
                <img src={`${userInfo.item_image}`} alt="item_Img" width="30%" height="30%" style={{ borderRadius: "30%" }}></img>
              </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>E-mail : </h3>&nbsp;&nbsp;&nbsp;
              <h3>{userInfo.email}</h3>
              </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>닉네임 : &nbsp;&nbsp;&nbsp;
              {userInfo.nickname}</h3>
              </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>한달 식비 : &nbsp;&nbsp;&nbsp;
              <TextField id="standard-basic"
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    style={{
                      width: '10rem',
                    }}
                    placeholder={`${userInfo.monthly_cost}`} 
                    onChange={monthlyCostHandler} 
                    defaultValue={`${userInfo.monthly_cost}`}

                  >

                  </TextField></h3>
              </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>목표 상품 : &nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic"
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    style={{
                      width: '10rem',
                    }}
                    placeholder={`${userInfo.item}`} 
                    onChange={itemHandler} 
                    defaultValue={`${userInfo.item}`}
                  >

                  </TextField></h3>
              </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>가격&nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic"
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    style={{
                      width: '10rem',
                    }}
                    placeholder={`${userInfo.price}`} 
                    onChange={priceHandler} 
                    defaultValue={`${userInfo.price}`}
                  >
                  </TextField></h3>
              </Grid>
              <br></br>
              <StyledBtn onClick={() => { window.history.back() }}>돌아가기</StyledBtn>
              <StyledBtn onClick={() => isEditHandler()}>수정완료</StyledBtn>
            </StyledText>
            :
            <StyledText>
              <h1>회원정보 조회</h1>
              <hr />
              <Grid style={{ textAlign: 'center' }} >
                <Imgur isEdit={isEdit} monthlyInput={monthlyInput} item={item} price={price} />
                <img src={`${userInfo.item_image}`} alt="item_Img" width="30%" height="30%" style={{ borderRadius: "30%" }}></img>
              </Grid>

              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>E-mail :  </h3>
                <h3>&nbsp;&nbsp;&nbsp;{userInfo.email}</h3>
              </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>닉네임 : &nbsp;&nbsp;&nbsp;
          {userInfo.nickname} </h3>
              </Grid>
              {/* <h1>목표상품</h1> */}
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>한달 식비 : &nbsp;&nbsp;&nbsp;
          {userInfo.monthly_cost} </h3> </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>목표 상품 : &nbsp;&nbsp;&nbsp;
          {userInfo.item} </h3>
              </Grid>
              <Grid
                container
                style={{ flexDirection: 'row' }}
              >
                <h3>가격 : &nbsp;&nbsp;&nbsp;
          {userInfo.price}</h3>
              </Grid>
              <br></br>
              <StyledBtn onClick={() => { window.history.back() }}>돌아가기</StyledBtn>
              <StyledBtn onClick={() => isEditHandler()}>수정하기</StyledBtn>
            </StyledText>
          }
        </Grid>
      </Grid>
      {/* </Container> */}
    </>
  );
};

const Text = styled.h3`
  color: red;
  display: inline;
`;



export default Information;
