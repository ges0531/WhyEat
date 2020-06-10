import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn, StyledBtn } from "../style";
import History from "./03History";
import { Link } from "react-router-dom";
import axios from "axios";
import { url as _url } from "../../url";

import { Typography, Container, Grid, Box } from "@material-ui/core";

// import ES from "./es_component";

const PriceResult: FunctionComponent<any> = ({}) => {
  const [saveList, setSaveList] = useState([] as any);
  const [itemPrice, setItemPrice] = useState([] as any);
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const _id = window.sessionStorage.getItem("id");
  useEffect(() => onAmount(), []);
  const onAmount = () => {
    axios
      .get(`${_url}/api/user_detail/${_id}/`)
      // axios.get(`${_url}/api/user_detail/2`)
      .then((response) => {
        var temp1 = [] as any;
        var temp2: any = response.data.price;
        var temp3 = response.data.item;
        var temp4 = response.data.item_image;
        setItemPrice(temp2);
        setItemName(temp3);
        setItemImage(temp4);
        response.data.history.map((e: any) => {
          temp1.push(e.today_saving);
          setSaveList(temp1);
        });
      });
  };
  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  }
  // console.log(itemImage, 111111111)
  return (
    <>
      <Grid
        container
        style={{
          textAlign: "center",
          // , width:"80%"
        }}
      >
        <Grid
          item
          style={{
            width: "54%",
            position: "relative",
            display: "inline-block",
            textAlign: "center",
            marginLeft: "23%",
            marginRight: "23%",
            marginTop: "10%",
          }}
        >
          <StyledText>
            <h1>{itemName} 사기까지</h1>
            <img src={itemImage} width="150" />
<<<<<<< HEAD
            <h1>{itemPrice + getArraySum(saveList)} 원</h1>
            <h1>남았습니다.</h1>
=======
>>>>>>> 9236241461cb4ddf4070b4e2dbb3b0b59ca7206c

            <h1>
              {/* // @ts-ignore
              <span>{{ animatedGap }}</span> */}
              {itemPrice - getArraySum(saveList)} 원
            </h1>
            <h1>남았습니다.</h1>
            {/* <h3>히스토리 보기</h3>
        <button onClick={() => setToggle(!toggle)}>▼</button>
        {toggle ? <History /> : <div></div>} */}
            <StyledBtn
              onClick={() => {
                window.history.back();
              }}
            >
              돌아가기
            </StyledBtn>
            {/* <ES /> */}
          </StyledText>
        </Grid>
      </Grid>
    </>
  );
};

export default PriceResult;
