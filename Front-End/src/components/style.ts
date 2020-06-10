import styled from 'styled-components';

const StyledText = styled.div`
  color: gray;
  font-size: 1rem;
  /* margin-left: 10%;
  margin-right: 10%; */
  white-space: normal;
  line-height: 230%;
  vertical-align: middle;
`;

const StyledBtn = styled.button`
  background-color: pink;
  color: white;
  border: none;
  padding: 4px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 10px;
  margin-right: 10px;
`

const StyledTextBtn = styled.button`
  background-color: white;
  color: pink;
  border: none;
  padding: 4px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
`
const StyledInput = styled.input`
  border-left-width:0;
  border-right-width:0;
  border-top-width:0;
  border-top-color:white;
  border-bottom-width:1;
  font-size:3vw;
  text-align:center;
`

export {
  StyledText,
  StyledBtn,
  StyledTextBtn,
  StyledInput
};
