import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from "../style";
import { Link } from "react-router-dom";

// 사용자 프로필 버튼
import { Avatar, ListItem } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

// 프로필 메뉴 스타일
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  buttons: {},
});

type Anchor = "right";

const ProfileMenu: FunctionComponent<any> = ({}) => {
  // 프로필 메뉴
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const _id = window.sessionStorage.getItem("id");

  // const [isLogin, setIsLogin] = useState(false)

  // const is_id = () => {
  //   if ( _id == "" || _id == null || _id == undefined) {
  //     setIsLogin(false)
  //   } else {
  //     setIsLogin(true)
  //   }
  // }

  // is_id()
  const [userImage, setUserImage] = useState("" as any);

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {})}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {_id == "" || _id == null || _id == undefined ? (
        <p>먼저 로그인 해주세요</p>
      ) : (
        <List>
          <ListItem button
            style = {{textAlign:"center"}}
          >

            <Link to="/information" props={setUserImage} style={{textAlign:"center", textDecoration:"none"}}>
              <Button>
              회원정보
              </Button>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/history" style={{textAlign:"center", textDecoration:"none"}}>
              <Button>
              히스토리
              </Button>
              </Link>
          </ListItem>
          <ListItem button>
            <Link to="/priceresult" style={{textAlign:"center", textDecoration:"none"}}><Button>달성률</Button></Link>
          </ListItem>
          <ListItem button>
            <Link to="/logout" style={{textAlign:"center", textDecoration:"none"}}><Button>로그아웃</Button></Link>
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <>
      <StyledText>
        <div>
          {(["right"] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
              {/* <Box display="flex" justifyContent="flex-end" m={1} p={1}> */}
              <Button onClick={toggleDrawer(anchor, true)}>
                {/* {userImage
                ?
                <Avatar alt="Cindy Baker" src={userImage} />
                : */}
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                {/* } */}
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                style = {{ flexShrink: 0,}}
              >
                {list(anchor)}
              </Drawer>
              {/* </Box> */}
            </React.Fragment>
          ))}
        </div>
      </StyledText>
    </>
  );
};

export default ProfileMenu;
