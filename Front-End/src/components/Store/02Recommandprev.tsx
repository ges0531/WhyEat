import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";

// axios import
import { url as _url } from "../../url";
import axios from "axios";

// materia-ui 모달 import
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

// const checkDayli = 0;

// const storeList = [] as any;

const Recommand: FunctionComponent<any> = ({}) => {
  // 알고리즘 음식점 axios
  const _id = window.sessionStorage.getItem("id");
  const [storeIdList, setStoreIdList] = useState([] as any);
  const [storeNameList, setStoreNameList] = useState([] as any);
  const [storeImageList, setStoreImageList] = useState([] as any);

  const [storeDetail, setStoreDetail] = useState([] as any);

  useEffect(() => getRecommandStore(), []);
  // useEffect(() => getStoreDetail(), []);

  // 모달부분 - 음식점 데이터 불러오기
  const getStoreDetail = (storeId, temp) => {
    try {
      // console.log("음식점 데이터 불러오기 ING");
      const res = axios({
        method: "get",
        url: `${_url}/stores/store_detail/${storeId}/`, // 알고리즘 url
        responseType: "json",
      }).then((res) => {
        console.log("res.data", res.data);
        console.log("temp", temp)
        // setStoreDetail(res.data);
        temp.push(res.data);
        setStoreDetail(temp);
      });

      // temp.push(response.data);
      // console.log("temp", temp);
      // setStoreDetail(temp);
    } catch (err) {
      alert(err);
    }
  };

  // handleOpen();

  const getRecommandStore = () => {
    // 알고리즘 url 수정!!!!
    try {
      // console.log(_id);
      const response = axios({
        method: "get",
        url: `${_url}/stores/store_list/12341234/`,
        responseType: "json",
      }).then((res) => {
        // console.log(res.data);
        // var temp1 = [] as any;
        // var temp2 = [] as any;
        // var temp3 = [] as any;
        var temp = [] as any;
        // console.log(res.data, "res.data");
        res.data.map((e: any, idx: any) => {
          // console.log(e, "e");
          // temp1.push(e.store_id);
          // temp2.push(e.store_name);
          // temp3.push(e.store_image);
          // console.log(temp2, temp3, "temp");
          const storeId = e.store_id;
        });
        // setStoreIdList(temp1);
        // setStoreNameList(temp2);
        // setStoreImageList(temp3);
        // console.log("storeIDList", storeIdList); // 안 담김
        // console.log("storeImageList", storeImageList);
        // console.log("storeNameList", storeNameList);
        // 음식점 정보 가져오는 부분
        // console.log("디테일 뽑거랑");
        // getStoreDetail();
        // console.log('Detail', storeDetail)
      });

      // alert("알고리즘 연결성공");
    } catch (err) {
      alert(err);
    }
  };

  const [open, setOpen] = React.useState(false as boolean);

  // console.log("2", storeList);
  // 모달 부분
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    // console.log("열려라");
    // getStoreDetail(store_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showLink = () => {
    window.open(
      `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=고갯마루` // 음식점 이름 수정
    );
  };

  // console.log("storeIDList", storeIdList); // 담김
  // console.log("storeImageList", storeImageList);
  // console.log("storeNameList", storeNameList);
  // console.log("storedetail", storeDetail);

  // const stores = for (var idx = 0; i < storeList)
  // console.log(storeNameList, "storeNameList");
  // getRecommandStore();
  return (
    <>
    {console.log('이거', storeDetail)}
      <StyledText>
        {/* <button onClick={getStoreDetail}>추천</button> */}
        {storeNameList.map((value, index) => {
          return (
            <>
              <div onClick={handleOpen}>
                <h4>{value}</h4>
                <img
                  src={storeNameList[index]}
                  alt=""
                  width="200px"
                  // onClick={() => getStoreDetail(storeIdList[index])}
                  // onClick={getStoreDetail(storeIdList[index])}
                />
              </div>
            </>

          );
        })}

        
      </StyledText>
    </>
  );
};

export default Recommand;


// <Modal
// aria-labelledby="transition-modal-title"
// aria-describedby="transition-modal-description"
// className={classes.modal}
// open={open}
// onClose={handleClose}
// closeAfterTransition
// BackdropComponent={Backdrop}
// BackdropProps={{
//   timeout: 500,
// }}
// >
// <Fade in={open}>
//   <div className={classes.paper}>
//     {/* <h2 id="transition-modal-title">{storeDetail}</h2> */}
//     {/* <p id="transition-modal-description"> */}
//     <div>
//       <img src="" alt="고갯마루" width="200" />
//       <br />
//       tel
//       <br />
//       address category score_mean
//       <br />
//       <StyledBtn onClick={showLink}>더 알아보기</StyledBtn>
//     </div>
//     {/* </p> */}
//   </div>
// </Fade>
// </Modal>