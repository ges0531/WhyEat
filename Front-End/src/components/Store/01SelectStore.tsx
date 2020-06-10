import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";
import { Typography, Box, Container,} from '@material-ui/core';
const SelectStore: FunctionComponent<any> = ({}) => {
  return (
    <>
      <StyledText>
        {/* <StyledBtn>카페</StyledBtn>
        <StyledBtn>음식점</StyledBtn> */}
      
      <Container style={{ width:'100%', height:'100%'}}>
        
        <h1>
              결과를 바탕으로
            맛집을 추천해드릴게요
            </h1>
            
        </Container>
        </StyledText>   
    </>
  );
};

export default SelectStore;
