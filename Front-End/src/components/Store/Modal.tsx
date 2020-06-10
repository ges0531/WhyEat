import React, { useMemo, useEffect, useState } from 'react';
import './Modal.scss';
import axios from "axios";
import { url as _url } from "../../url";
import { StyledText, StyledBtn } from "../style";


const Modal = (params: any) => {
  const { close, data } = params;
  const [mean, setMean] = useState("" as any)
  const [address, setAddress] = useState("" as any)
  const [image, setImage] = useState("" as any)
  const [name, setName] = useState("" as any)

  useEffect(() => getStoreDetail(data), []);

  const getStoreDetail = (store_id: any) => {
    const response = axios({
      method: 'get',
      url: `${_url}/stores/store_detail/${store_id}/`,
      responseType: "json",
    }).then((response) => {
      setMean(response.data.score_mean)
      setAddress(response.data.score_address)
      setImage(response.data.store_image)
      setName(response.data.store_name)
    })
  }
  const showLink = (name: any) => {
    window.open(
      `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${name}` // 음식점 이름 수정
    );
  };

  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
        <StyledText>
        <h1>{name}</h1>
        <hr></hr>
        <img src={image} alt='음식점이미지'></img>
        <h3>평점 : {mean}</h3>
        <h3>주소: {address} </h3>
        <div className="button-wrapDouble">
          <button onClick={() => showLink(name)}>더 알아보기</button>
          <button onClick={close}>닫기</button>
        </div>
        </StyledText>
      </div>
    </>
  )
}

export default Modal;