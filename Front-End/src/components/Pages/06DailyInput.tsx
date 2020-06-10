import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledInput } from '../style';
import axios from "axios";
import { url as _url } from '../../url';
import {Typography, Box, TextField, Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
const DailyInput: FunctionComponent<any> = ({ }) => {
  var date = new Date(); 
  var year = date.getFullYear(); 
  var month = new String(date.getMonth()+1); 
  var day = new String(date.getDate());
  
  // 한자리수일 경우 0을 채워준다. 
  if(month.length == 1){ 
    month = "0" + month; 
  } 
  if(day.length == 1){ 
    day = "0" + day; 
  } 
  const _id = window.sessionStorage.getItem('id')
  const [toggle, setToggle] = useState(false as any)
  const [historyId, setHistoryId] = useState(0 as any)
  const [flag, setFlag] = useState(false as any)
  const [monthlyCost, setMonthlyCost] = useState(0 as number);
  const [dailyCost, setDailyCost] = useState(0 as number);
  const [money, setMoney] = useState(0 as any);
  useEffect(() => toggleCheck(), [money]);
  const toggleCheck = () => {
    if (toggle) {
      getData()
      onSubmit()
      setToggle(!toggle)
    } else {
      getData()
      setToggle(!toggle)
      }
  }

  const [breakfast, setBreakfast] = useState(0);
  const changeBreakfast = (e: any) => {
    // const breakfast_id = e.target.id;
    const breakfast_value = parseInt(e.target.value);
    setBreakfast(breakfast_value)
  }

  const [lunch, setLunch] = useState(0);
  const changeLunch = (e: any) => {
    // const lunch_id = e.target.id;
    const lunch_value = parseInt(e.target.value);
    setLunch(lunch_value);
  }


  const [dinner, setDinner] = useState(0);
  const changeDinner = (e: any) => {
    // const dinner_id = e.target.id;
    const dinner_value = parseInt(e.target.value);
    setDinner(dinner_value);
  }
  

  

  const calMoney = (d: any, m: any) => {
    const monthDay: any = 30
    setMoney(Math.round(Number(m) / monthDay - Number(d)))
    sessionStorage.setItem(
      "money",
      money
    );
    // if (temp <= 0) {
    //   setMoney(Math.round(Number(d) - Number(m) / monthDay))
      
    // } else {
    //   setMoney(Math.round(Number(m) / monthDay - Number(d)))
    // }
  };

  const getData = () => {
    try {
      
      const response = axios({
        method: "get",
        url: `${_url}/api/user_detail/${_id}/`,
        responseType: "json"
      }).then((res) => {
        setDailyCost(breakfast+lunch+dinner);
        setMonthlyCost(res.data.monthly_cost);
        calMoney(dailyCost, monthlyCost);
        res.data.history.forEach(element => {
          if (element.payment_date === year + "-" + month + "-" + day) {
            setHistoryId(element.id)
            setFlag(true)
          }  
        }
      )})
    } catch (err) {
      alert(err); // WTF?
    }
  }
  const onSubmit = () => {
    try {
      if (flag === true) {
        // console.log(money, 'money')
        axios({
         method: "put",
         url: `${_url}/api/history_detail/${historyId}/`,
         data: {
           kakao: _id,
           user_breakfast: breakfast,
           user_lunch: lunch,
           user_dinner: dinner,
           total_paid: dailyCost,
           today_saving: money
         },
         responseType: "json"
       });
    } else {
       const res = axios({
         method: "post",
         url: `${_url}/api/history_list/`,
         data: {
           kakao: _id,
           payment_date: date,
           user_breakfast: breakfast,
           user_lunch: lunch,
           user_dinner: dinner,
           total_paid: dailyCost,
           today_saving: money
         },
         
         responseType: "json"
       });
     }
    } catch (err) {
      alert(err); // WTF?
    }
  }
  return (
    <>
      <StyledText>
         
      <h2> 나는 오늘 아침에 <TextField id="standard-basic"
          inputProps={{min: 0, style: { textAlign: 'center' }}}
          style = {{
            width:'10rem',
          
            
        }}
        onChange={changeBreakfast}
          >
                 
                  </TextField>
                  </h2>
               <h2> 점심에 <TextField id="standard-basic"
          inputProps={{min: 0, style: { textAlign: 'center' }}}
          style = {{
            width:'10rem',
          
            
        }}
        onChange={changeLunch}
          >
                 
                  </TextField>
                  </h2>
             
               <h2> 저녁에  
                 <input onChange={changeDinner} 
                    style={{
                      outline:'0',
                      borderWidth:'0 0 2px',
                      borderColor:'gray',
                      fontSize:'2rem',
                      textAlign :'center'

                    }}
                  >  
                        
                            
                  </input> </h2>
             
                  <Button
                    onClick={toggleCheck}
                    variant="contained"
                    color="default"
                    endIcon={<SendIcon></SendIcon>}
                  
                  >
                    추가
                  </Button>
                  
              <br/>
                 <h1> 총 합: {breakfast+lunch+dinner} </h1>
                  

         
              
         
        </StyledText>
    </>
  )
}

export default DailyInput;