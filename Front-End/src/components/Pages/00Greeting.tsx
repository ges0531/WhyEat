import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
// import ReactDOM from 'react-dom';
import img from "./DM.jpg";
import { StyledText } from "../style";
import axios from "axios";

const Greeting: FunctionComponent<any> = ({}) => {
  // 알고리즘 음식점 axios
  const send = () => {
    try {
      const response = axios({
        method: "get",
        url: `http://13.125.68.151:8000/stores/store_list/`, // 알고리즘 url
        responseType: "json",
      });
      // console.log(response);
      alert("연결성공");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <StyledText>
        <img src={img} alt="titleImage" max-width="100%" height="auto" />
      </StyledText>
    </>
  );
};

export default Greeting;
