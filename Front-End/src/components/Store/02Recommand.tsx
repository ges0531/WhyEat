import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

// axios import
import { url as _url } from "../../url";
import axios from "axios";
import Modal from "./Modal";
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

// materia-ui 모달 import
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";

const Recommand: FunctionComponent<any> = ({ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({} as any);
  const [storeList, setStoreList] = useState([] as any);

  useEffect(() => getRecommandStore(), [isModalOpen]);

  const openModalHandler = (data: any) => {
    setModalData(data);
    var t: any = true
    setIsModalOpen(t);
  };

  const closeModalHandler = () => setIsModalOpen(false);


  const getRecommandStore = () => {
    console.log('요청보냄')
    const _id = window.sessionStorage.getItem('id')
    const res = axios({
      method: 'get',
      url: `${_url}/stores/store_list/${_id}/`,
      responseType: "json"
    }).then((res) => {
      var temp = [] as any
      var tmp = [] as any
      res.data.map((e: any, idx: Number) => {
        const _name = e.store_name
        const _id = e.store_id
        const _img = e.store_image
        tmp.push([_name, _id, _img])
      });
      setStoreList(tmp)
      console.log('됨')
    })
  }

  const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();


  return (
    <>
      <StyledText>
        <h2>오늘 쓴 금액과 Survey 바탕으로 맛집을 추천해드릴게요</h2>
        <br></br>
        {storeList.map((e: any, idx: number) => {
          return (
            <>
              <Card className={classes.root} style={{float: "left", width: "33%"}}>
                <CardActionArea>
                  <CardMedia
                    // @ts-ignore
                    className={classes.media}
                    image={e[2]}
                    title={e[0]}
                    onClick={() => openModalHandler(e[1])}
                  >
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {e[0]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              {/* <div>
              <img
                  src={e[2]}
                  alt=""
                  width="200px"
                  onClick={() => openModalHandler(e[1])}
                />
                <div className="card-body">
                  <h2 className="card-title text-center">{e[0]}</h2>
                </div>
              </div> */}
            </>
          )
        })}
        {isModalOpen ? (
          <Modal
            close={closeModalHandler}
            data={modalData}
            openModal={openModalHandler}
          />
        ) : null}
      </StyledText>
    </>
  )
}
export default Recommand;

