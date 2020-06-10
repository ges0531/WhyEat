import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";
import { url as _url } from "../../url";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const History: FunctionComponent<any> = ({}) => {
  const classes = useStyles();
  const [userHistory, setUserHistory] = useState([] as any);

  useEffect(() => getUserHistory(), []);

  const getUserHistory = () => {
    const _id = window.sessionStorage.getItem("id");
    // console.log(_id);
    axios.get(`${_url}/api/user_detail/${_id}/`).then((response) => {
      // console.log(response.data.history);
      setUserHistory(response.data.history);
    });
  };

  return (
    <>
      <StyledText>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>날 짜</StyledTableCell>
                <StyledTableCell align="center">아침</StyledTableCell>
                <StyledTableCell align="center">점심</StyledTableCell>
                <StyledTableCell align="center">저녁</StyledTableCell>
                <StyledTableCell align="center">총 합계</StyledTableCell>
                <StyledTableCell align="center">얼마 아꼈는지</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userHistory.map((row) => (
                <StyledTableRow key={row.payment_date}>
                  <StyledTableCell component="th" scope="row">
                    {row.payment_date}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.user_breakfast}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.user_lunch}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.user_dinner}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.user_breakfast + row.user_lunch + row.user_dinner}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.today_saving}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledBtn onClick={() => {window.history.back()}}>돌아가기</StyledBtn>
      </StyledText>
    </>
  );
};

export default History;
