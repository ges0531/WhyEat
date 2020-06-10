import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../style";
import axios from "axios";
import { url as _url } from "../../url";

import { Typography, Box, Container } from "@material-ui/core";
const Amount: FunctionComponent<any> = ({}) => {
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

  return (
    <>
      <StyledText>
        <Container style={{ width: "100%", height: "100%" }}>
          <img src={itemImage} width="30%" height="30%" />
          <h3>
            {itemPrice - getArraySum(saveList) > 0
              ? `${itemName} 사기까지 ${
                  itemPrice - getArraySum(saveList)
                }원 남았습니다.`
              : `축하합니다! 원하시는 상품을 이제 주문해보세요!`}
          </h3>
          {/* <StyledTextBtn><Box fontSize='2vw'>다른 사람은 무엇을 사고 싶어할까요?</Box></StyledTextBtn> */}
          <Typography component="div"></Typography>
        </Container>
      </StyledText>
    </>
  );
};

export default Amount;
