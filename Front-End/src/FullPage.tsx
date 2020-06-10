import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Greeting from "./components/Pages/00Greeting";
import Service from "./components/Pages/01Service";
import MonthlyInput from "./components/Pages/05MonthlyInput";
import DailyInput from "./components/Pages/06DailyInput";
// import ResultSave from "./components/Pages/Result/ResultSave";
// import ResultFail from "./components/Pages/Result/ResultFail";
import Amount from "./components/Pages/09Amount";
import UserRank from "./components/Pages/Rank/11UserRank";
import WishListRank from "./components/Pages/Rank/10WishListRank";
import SelectStore from "./components/Store/01SelectStore";
import Recommand from "./components/Store/02Recommand";
// import StoreDetail from "./components/Store/03StoreDetail";
// import KaKaoLogin from "./components/Accounts/KaKaoLogin";
import KakaoSignUp from "./components/Accounts/KaKaoSignUp";
// import StoreDetail from "./components/Store/03StoreDetail";
import { makeStyles, Container, Grid } from "@material-ui/core";
import Survey from "./components/Accounts/Survey";
import Success from "./components/UserPage/04Success";

import ResultPage from "./components/Pages/Result/07ResultPage";
import Profile from "./components/UserPage/00ProfileMenu";

// const useStlyes = makeStyles(theme => ({

//   center :{
//     float:'center',
//   },
// }))

const Fullpage = () => (
  <ReactFullpage
    //fullpage options
    licenseKey={"YOUR_KEY_HERE"}
    // css3={false}
    // scrollingSpeed={700} /* Options here */
    scrollingSpeed={1000} /* Options here */
    navigation={true} // 오른쪽 네비게이션바 활성화
    verticalCentered={false} // css 풀린건가..?
    controlArrows={false}
    menu={"#menu"}
    anchors={[
      "firstPage",
      "secondPage",
      "thirdPage",
      "fourthPage",
      "fifthPage",
      "sixthPage",
    ]}
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section">
            <Container
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  position: "relative",
                  top: "30%",
                  textAlign: "center",
                }}
              >
                <Greeting />
              </Grid>

              <Grid item style={{ width: "10%", display: "fixed" }}>
                <Profile />
              </Grid>
            </Container>
          </div>
          <div className="section">
            <Container
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  position: "relative",
                  // top: "10%",
                  textAlign: "center",
                }}
              >
                <div className="slide">
                  <Service fullpage_api={fullpageApi} />
                </div>
                <div className="slide">
                  <Survey fullpage_api={fullpageApi} />
                </div>
                <div className="slide">
                  
                  <MonthlyInput fullpage_api={fullpageApi} />
                </div>
              </Grid>

              <Grid item style={{ width: "10%", position: "sticky" }}>
                <Profile />
              </Grid>
            </Container>
          </div>

          {/* <div className="section">
              <Container style={{height: '100%', width:'100%', display:'flex',  flexDirection:'row'}}>
                  <Grid item style={{width:'90%',height:'100%', textAlign:'center'}} >
                  <Survey />
                  </Grid>
              
              <Grid item style={{width:'10%', position:'sticky'}} >
                <Profile />
              </Grid>
              </Container>    
          </div> */}
          {/* <div className="section">
            
             <Container style={{height: '100%', width:'100%', display:'flex',  flexDirection:'row'}}>
                  <Grid item style={{width:'90%',position:'relative',  top:'20%', textAlign:'center'}} >
                    <MonthlyInput />
                  </Grid>
              
                  <Grid item style={{width:'10%', position:'sticky'}} >
                    <Profile />
                  </Grid>
              </Container>   
          
          </div> */}
          <div className="section">
            <Container
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  position: "relative",
                  top: "20%",
                  textAlign: "center",
                }}
              >
                <DailyInput fullpage_api={fullpageApi} />
              </Grid>

              <Grid item style={{ width: "10%", position: "sticky" }}>
                <Profile />
              </Grid>
            </Container>
          </div>
          <div className="section">
            <Container
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  height: "100%",
                  position: "relative",
                  top: "20%",
                  textAlign: "center",
                }}
              >
                <div className="slide">
                  <ResultPage fullpage_api={fullpageApi} />
                </div>
                <div className="slide">
                  <UserRank fullpage_api={fullpageApi} />
                </div>
              </Grid>

              <Grid item style={{ width: "10%", position: "sticky" }}>
                <Profile />
              </Grid>
            </Container>
          </div>

          <div className="section">
            <Container
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  position: "relative",
                  top: "15%",
                  textAlign: "center",
                }}
              >
                <Amount />
              </Grid>

              <Grid item style={{ width: "10%", position: "sticky" }}>
                <Profile />
              </Grid>
            </Container>
          </div>
          <div className="section">
            <Container
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  position: "relative",
                  top: "30%",
                  textAlign: "center",
                }}
              >
                <SelectStore />
              </Grid>

              <Grid item style={{ width: "10%", position: "sticky" }}>
                <Profile />
              </Grid>
            </Container>
          </div>
          <div className="section">
            <Container
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  position: "relative",
                  top: "15%",
                  textAlign: "center",
                }}
              >
                <Recommand />
              </Grid>

              <Grid item style={{ width: "10%", position: "sticky" }}>
                <Profile />
              </Grid>
            </Container>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Fullpage;
