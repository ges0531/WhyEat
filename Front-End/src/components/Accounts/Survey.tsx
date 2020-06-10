// import React, {
//   FunctionComponent,
//   useState,
//   useEffect,
//   Component,
// } from "react";
// import { StyledText, StyledBtn } from "../style";
// import axios from 'axios';
// import { url as _url } from '../../url';
// import Container from '@material-ui/core/Container';
// import { Typography, Grid  } from "@material-ui/core";



// const Survey: FunctionComponent<any> = ({fullpage_api}) => {
//   const [selectedFood, setSelectedFood] = useState([] as any);
//   const [toggleSelected, setToggleSelected] = useState(false);

//   // toggledSelected 값에 따라 setSelectedFood 가 selectedFood 로 바뀜
//   useEffect(() => setSelectedFood(selectedFood), [toggleSelected]);
//   // console.log('이거', selectedFood)

//   const svFood = [
//     [
//       "돈가스",
//       "https://cdndept.galleria.co.kr/upload/dept/gourmet/au/to/00000000/gourmet-store/hb82139127pr.jpg",
//       false,
//     ],
//     [
//       "떡볶이",
//       "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190121035638_photo1_b5c2cf61ba61.jpg",
//       false,
//     ],
//     [
//       "회",
//       "https://imagescdn.gettyimagesbank.com/500/201708/jv10941683.jpg",
//       false,
//     ],
//     [
//       "파스타",
//       "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/67344753_102419641078121_3977315267022583304_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=85rSuHundR8AX_PmgFW&oh=9fcabe89efb8e58e76f858d81be31a85&oe=5EAD9328",
//       false,
//     ],
//     ["곱창", "https://t1.daumcdn.net/cfile/tistory/234F5D3D586B0E6229", false],
//     [
//       "김치찌개",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLqqyU39Q_hWcL7bQAPI5pAHSYM5e_Q-eBdk44M3h5yVYwlT7T&usqp=CAU",
//       false,
//     ],
//     [
//       "피자",
//       "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F997E8F3359A4FF1E1C",
//       false,
//     ],
//     [
//       "치킨",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTz_QsUu9Hkks-QQ2L2hzWWlbrJsYNnBgdjS6Bph7wJHsgO5RmQ&usqp=CAU",
//       false,
//     ],
//     [
//       "삼겹살",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKO8j7JNOee6d3YcAVz18vMZBYIhysBFR4P0EGjnoVnU9YA1d6&usqp=CAU",
//       false,
//     ],
//     [
//       "중식",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRs5U_n_xtwQ74DDShzzDlqO94fFHbMjMfi_eemCC345cxdTz3o&usqp=CAU",
//       false,
//     ],
//     ["초밥", "https://t1.daumcdn.net/cfile/tistory/2718253A58B06DF005", false],
//     [
//       "카페",
//       "https://images.happycow.net/venues/1024/11/13/hcmp111384_618651.jpeg",
//       false,
//     ],
//     [
//       "스테이크",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXkVbVmnTCO_44gk7_9YyhZ_LkiXMV13ReKObKvDmAtZTWVb55&usqp=CAU",
//       false,
//     ],
//     [
//       "순대국",
//       "https://live.staticflickr.com/1579/24789961300_af7d884bf6_b.jpg",
//       false,
//     ],
//     [
//       "칼국수",
//       "https://t1.daumcdn.net/cfile/tistory/014AE13A508FED0012",
//       false,
//     ],
//     [
//       "쌀국수",
//       "https://rudol.net/attachmentR2/20170726/20170726RiceNoodles@Emoi.jpg.jpg",
//       false,
//     ],
//     [
//       "햄버거",
//       "https://img.etoday.co.kr/pto_db/2020/01/20200117103646_1414301_545_469.PNG",
//       false,
//     ],
//     [
//       "족발",
//       "https://d3af5evjz6cdzs.cloudfront.net/images/uploads/800x0/kakaotalk_20180817_151912354_458272c236a0645aaf0f7ae08f3df68f.jpg",
//       false,
//     ],
//   ];

//   const svList = svFood.map((e: any) => {
//     const onClickHandler = (e: any) => {
//       if (selectedFood.find((element) => element === e[0])) {
//         const sFood = selectedFood.filter((item) => item !== e[0]);
//         setSelectedFood(sFood);
//         setToggleSelected(!toggleSelected);
//         alert(`${e[0]}를 선택해제했습니다`);
//       } else {
//         const sFood = selectedFood.filter((item) => item);
//         sFood.push(e[0]);
//         setSelectedFood(sFood);
//         setToggleSelected(!toggleSelected);
//         alert(`${e[0]}를 선택했습니다`);
//       }
//     };
//     return (
//       <>
//           {/* <Grid
//             item md ={4} xs ={4}   
//             style={{
//               // height:'20%',
//               // width:'33%',
//               // position:"relative",
//               // padding:'5%'

//               filter :'blur(0px)',
//               transition :'filter 0.3s ease-in',
//               transform : 'scale(1.1)',
//               textAlign : 'center',
//               display:'block'
//             }}
//           > */}
//             <a href='#'>
//             <img src={e[1]} 
//               width="100%"
//               height="100%" 

//              onClick={() => onClickHandler(e)}></img>
//              </a>
//           {/* </Grid> */}
//       </>
//     )
//   });

//   const submitHandler = async () => {
//     (selectedFood.length === 0)
//     ? alert('최소 1개 이상의 음식을 선택해 주세요')
//     : alert(`${selectedFood} 를 선택했습니다`)
//     const _id = window.sessionStorage.getItem('id')
//     try {
//       const response = await axios({
//         method: "post",
//         url: `${_url}/stores/score_list/${_id}/`,
//         data: {
//           user_id: _id,
//           foodList: selectedFood,
//         },
//         responseType: "json"
//       })
//       fullpage_api.moveSlideRight()
//     }
//     catch (err) {
//       alert(err);
//     }
//   };

//   return (
//     <>
//     <Container style= {{ 
//       height:'100%'
//     }}>
//       {/* <StyledText> */}
//       {/* <Container style={{height:'25%'}}> */}
//        <h1>Survey</h1>
//        <h2>좋아하는 음식을 선택해주세요.</h2>
//       {/* </Container> */}
//         {/* <Container  
//         style={{  height: '100%', display: 'inline-block' }}
//         > */}

//         <Grid container style={{
//           display: 'grid',
//           height:'70%',
//           gridTemplateColumns: '33% 33% 33%',
//           gridTemplateRows : '15% 15% 15% 15% 15% 15% ',
//           // flexDirection:'row',
//           // 
//         }}
//          >
//           {svList}
//         </Grid>

//         <p style ={{
//           position:'relative'
//         }}>선택된 음식: {selectedFood}</p>
//         <StyledBtn onClick={submitHandler}>설문완료</StyledBtn>
//         {/* </Container> */}
//       {/* </StyledText> */}
//       </Container>
//     </>
//   );
// };

// export default Survey;
import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";
import axios from 'axios';
import { url as _url } from '../../url';
import Container from '@material-ui/core/Container';
import { Typography, Grid  } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Survey: FunctionComponent<any> = ({fullpage_api}) => {
  const [selectedFood, setSelectedFood] = useState([] as any);
  const [toggleSelected, setToggleSelected] = useState(false);

  // toggledSelected 값에 따라 setSelectedFood 가 selectedFood 로 바뀜
  useEffect(() => setSelectedFood(selectedFood), [toggleSelected]);
  // console.log('이거', selectedFood)

  const svFood = [
    [
      "돈가스",
      "https://cdndept.galleria.co.kr/upload/dept/gourmet/au/to/00000000/gourmet-store/hb82139127pr.jpg",
      false,
    ],
    [
      "떡볶이",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190121035638_photo1_b5c2cf61ba61.jpg",
      false,
    ],
    [
      "회",
      "https://imagescdn.gettyimagesbank.com/500/201708/jv10941683.jpg",
      false,
    ],
    [
      "파스타",
      "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/67344753_102419641078121_3977315267022583304_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=85rSuHundR8AX_PmgFW&oh=9fcabe89efb8e58e76f858d81be31a85&oe=5EAD9328",
      false,
    ],
    ["곱창", "https://t1.daumcdn.net/cfile/tistory/234F5D3D586B0E6229", false],
    [
      "김치찌개",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLqqyU39Q_hWcL7bQAPI5pAHSYM5e_Q-eBdk44M3h5yVYwlT7T&usqp=CAU",
      false,
    ],
    [
      "피자",
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F997E8F3359A4FF1E1C",
      false,
    ],
    [
      "치킨",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTz_QsUu9Hkks-QQ2L2hzWWlbrJsYNnBgdjS6Bph7wJHsgO5RmQ&usqp=CAU",
      false,
    ],
    [
      "삼겹살",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKO8j7JNOee6d3YcAVz18vMZBYIhysBFR4P0EGjnoVnU9YA1d6&usqp=CAU",
      false,
    ],
    [
      "중식",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRs5U_n_xtwQ74DDShzzDlqO94fFHbMjMfi_eemCC345cxdTz3o&usqp=CAU",
      false,
    ],
    ["초밥", "https://t1.daumcdn.net/cfile/tistory/2718253A58B06DF005", false],
    [
      "카페",
      "https://images.happycow.net/venues/1024/11/13/hcmp111384_618651.jpeg",
      false,
    ],
    [
      "스테이크",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXkVbVmnTCO_44gk7_9YyhZ_LkiXMV13ReKObKvDmAtZTWVb55&usqp=CAU",
      false,
    ],
    [
      "순대국",
      "https://live.staticflickr.com/1579/24789961300_af7d884bf6_b.jpg",
      false,
    ],
    [
      "칼국수",
      "https://t1.daumcdn.net/cfile/tistory/014AE13A508FED0012",
      false,
    ],
    [
      "쌀국수",
      "https://rudol.net/attachmentR2/20170726/20170726RiceNoodles@Emoi.jpg.jpg",
      false,
    ],
    [
      "햄버거",
      "https://img.etoday.co.kr/pto_db/2020/01/20200117103646_1414301_545_469.PNG",
      false,
    ],
    [
      "족발",
      "https://d3af5evjz6cdzs.cloudfront.net/images/uploads/800x0/kakaotalk_20180817_151912354_458272c236a0645aaf0f7ae08f3df68f.jpg",
      false,
    ],
  ];

  

  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid container style={{display:'flex', flexDirection:"row"}}>
    <Paper style={{}} className={classes.paper}>{svList.slice(0, 6)}</Paper>
        </Grid>
        <Grid container style={{display:'flex', flexDirection:"row"}}>
    <Paper className={classes.paper}>{svList.slice(6, 12)}</Paper>
        </Grid>
        <Grid container style={{display:'flex', flexDirection:"row"}}>
    <Paper className={classes.paper}>{svList.slice(12, 18)}</Paper>
        </Grid>
        {/* <Grid item xs={2}>
    <Paper className={classes.paper}>{svList.slice(9, 12)}</Paper>
        </Grid>
        <Grid item xs={2}>
    <Paper className={classes.paper}>{svList.slice(12, 15)}</Paper>
        </Grid>
        <Grid item xs={2}>
    <Paper className={classes.paper}>{svList.slice(15, 18)}</Paper>
        </Grid> */}
      </React.Fragment>
  //      <React.Fragment>
  //      <Grid item xs={2}>
  //  <Paper className={classes.paper}>{svList.slice(0, 3)}</Paper>
  //      </Grid>
  //      <Grid item xs={2}>
  //  <Paper className={classes.paper}>{svList.slice(3, 6)}</Paper>
  //      </Grid>
  //      <Grid item xs={2}>
  //  <Paper className={classes.paper}>{svList.slice(6, 9)}</Paper>
  //      </Grid>
  //      <Grid item xs={2}>
  //  <Paper className={classes.paper}>{svList.slice(9, 12)}</Paper>
  //      </Grid>
  //      <Grid item xs={2}>
  //  <Paper className={classes.paper}>{svList.slice(12, 15)}</Paper>
  //      </Grid>
  //      <Grid item xs={2}>
  //  <Paper className={classes.paper}>{svList.slice(15, 18)}</Paper>
  //      </Grid>
  //    </React.Fragment>
  
    );
  }

  const svList = svFood.map((e: any) => {
    const onClickHandler = (e: any) => {
      if (selectedFood.find((element) => element === e[0])) {
        const sFood = selectedFood.filter((item) => item !== e[0]);
        setSelectedFood(sFood);
        setToggleSelected(!toggleSelected);
        alert(`${e[0]}를 선택해제했습니다`);
      } else {
        const sFood = selectedFood.filter((item) => item);
        sFood.push(e[0]);
        setSelectedFood(sFood);
        setToggleSelected(!toggleSelected);
        alert(`${e[0]}를 선택했습니다`);
      }
    };
    return (
      <>
          {/* <Grid
            item md ={4} xs ={4}   
            style={{
              // height:'20%',
              // width:'33%',
              // position:"relative",
              // padding:'5%'

              filter :'blur(0px)',
              transition :'filter 0.3s ease-in',
              transform : 'scale(1.1)',
              textAlign : 'center',
              display:'block'
            }}
          > */}
            <a href='#'>
            <img src={e[1]} 
              // width="150rem"
              // height="150rem"
              // style={{ maxWidth: 150 ,height: 150}}
              style = {{width:'16%', height:'100%'}}
 

             onClick={() => onClickHandler(e)}></img>
             </a>
          {/* </Grid> */}
      </>
    )
  });

  const submitHandler = async () => {
    (selectedFood.length === 0)
    ? alert('최소 1개 이상의 음식을 선택해 주세요')
    : alert(`${selectedFood} 를 선택했습니다`)
    const _id = window.sessionStorage.getItem('id')
    try {
      const response = await axios({
        method: "post",
        url: `${_url}/stores/score_list/${_id}/`,
        data: {
          user_id: _id,
          foodList: selectedFood,
        },
        responseType: "json"
      })
      fullpage_api.moveSlideRight()
    }
    catch (err) {
      alert(err);
    }
  };

  return (
    <>
    <Container style= {{ 
      height:'100%'
    }}>
      {/* <StyledText> */}
      {/* <Container style={{height:'25%'}}> */}
       <h1>Survey</h1>
       <h2>좋아하는 음식을 선택해주세요.</h2>
      {/* </Container> */}
        {/* <Container  
        style={{  height: '100%', display: 'inline-block' }}
        > */}


<div className={classes.root}>
      <Grid container >
        <Grid container item xs={12} >
          <FormRow />
        </Grid>
        {/* <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid> */}
      </Grid>
    </div>
        {/* <Grid container 
        justify="center"
        spacing={5}
        style={{
          display: 'grid',
          height:'20%',
          width: '20%',
          gridTemplateColumns: '33% 33% 33%',
          gridTemplateRows : '15% 15% 15% 15% 15% 15% ',
          // flexDirection:'row',
          // 
        }}
         >
          {svList}
        </Grid> */}

        <p style ={{
          position:'relative'
        }}>선택된 음식: {selectedFood}</p>
        <StyledBtn onClick={submitHandler}>설문완료</StyledBtn>
        {/* </Container> */}
      {/* </StyledText> */}
      </Container>
    </>
  );
};

export default Survey;