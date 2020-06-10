import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from '../style';
import axios from 'axios';
import { url as _url } from '../../url';

const Logout: FunctionComponent<any> = () => {

  const Logout = () => {
    sessionStorage.clear()
    window.location.href='http://localhost:3000/';
  };

  Logout();

  return (
    <>
    </>
  );
};

export default Logout;
