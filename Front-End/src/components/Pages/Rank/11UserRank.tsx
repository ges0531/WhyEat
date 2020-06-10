import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../../style";
import axios from "axios";
import { url as _url } from "../../../url";

const UserRank: FunctionComponent<any> = ({ fullpage_api }: any) => {
  // var price_list = [] as any;
  // var user_list = [] as any;

  // useEffect(() => {}, [toggle]);

  // const onRank = () => {
  //   axios.get(`${_url}/api/rank_list/`)
  //   .then(response => {
  //     response.data.forEach((r) => {
  //       const int_kakao = parseInt(r.kakao)
  //       const total_price = parseInt(r.user_breakfast) + parseInt(r.user_lunch) + parseInt(r.user_dinner)
  //       onNickname(int_kakao)
  //       price_list.push(total_price)
  //       console.log('price_list', price_list)
  //       // const temp = price_list
  //       // setPriceList(temp)
  //       // setToggle(!toggle)
  //     }
  //   )});
  //   console.log('hit')
  // };
  // const onNickname = (k_id) => {
  //   axios.get(`${_url}/api/user_detail/${k_id}/`)
  //   .then(response => {
  //     user_list.push(response.data.nickname)
  //     console.log('user_list', user_list)

  //   });
  // };
  // onRank()

  const [priceList, setPriceList] = useState([] as any);
  const [userList, setUserList] = useState([] as any);
  const [imageList, setImageList] = useState([] as any);
  const [toggle, setToggle] = useState(false);

  useEffect(() => onRank(), []);

  const onRank = () => {
    axios.get(`${_url}/api/rank_list/`).then((response) => {
      var temp1 = [] as any;
      var temp2 = [] as any;
      var temp3 = [] as any;
      response.data.map((e: any, idx: any) => {
        const int_kakao = parseInt(e.kakao);
        const total_price =
          parseInt(e.user_breakfast) +
          parseInt(e.user_lunch) +
          parseInt(e.user_dinner);
        temp1.push(total_price);
        setPriceList(temp1);
        onNickname(int_kakao, temp2, temp3);
      });
    });
  };

  const onNickname = (k_id: any, temp2: any, temp3: any) => {
    axios.get(`${_url}/api/user_detail/${k_id}/`).then((response) => {
      temp2.push(response.data.nickname);
      setUserList(temp2);
      const _image = response.data.profile_image
        ? response.data.profile_image.replace(/^"+|"+$/g, "")
        : response.data.profile_image;
      temp3.push(_image);
      setImageList(temp3);
    });
  };
  // console.log(imageList, 111111111111)

  return (
    <>
      <StyledText>
        <h1>UserRank Page</h1>
        <h3>
          20대 다른사람들은
          <br />
          오늘 얼마나
          <br />
          아껴 썼을까요?
          <br />
        </h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {priceList.map((value, index) => {
            return (
              <li key={index}>
                {index + 1}위{" "}
                <img
                  src={imageList[index]}
                  width="30px"
                  height="30px"
                  style={{ borderRadius: "50px" }}
                />{" "}
                {userList[index]} {value}원
              </li>
            );
            // return <li key={index}>{index+1}위 {userList[index]} {value}원</li>
          })}
        </ul>
        <StyledTextBtn
          onClick={() => {
            fullpage_api.moveSlideLeft();
          }}
        >
          이전 화면으로 돌아가기
        </StyledTextBtn>
      </StyledText>
    </>
  );
};

export default UserRank;
