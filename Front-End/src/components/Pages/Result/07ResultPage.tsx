import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../../style";

// axios import
import { url as _url } from "../../../url";
import axios from "axios";


const ResultPage: FunctionComponent<any> = ({ fullpage_api }: any) => {
  // 성공실패여부 계산
  const _id = window.sessionStorage.getItem("id");
  const [monthlyCost, setMonthlyCost] = useState(0 as number);
  const save_money = window.sessionStorage.getItem("money")

  const [dailyCost, setDailyCost] = useState(0 as number);

  const [money, setMoney] = useState(0 as number);
  const [itemName, setItemName] = useState("");
  const [toggle, setToggle] = useState(false);

  var date = new Date();
  var year = date.getFullYear();
  var month = new String(date.getMonth() + 1);
  var day = new String(date.getDate());

  // 0 처리
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  
  useEffect(() => getMonthlyCost(), []);
  // 유저 한달비용 불러오기 axios
  const getMonthlyCost = () => {
    try {
      const response = axios({
        method: "get",
        url: `${_url}/api/user_detail/${_id}/`,
        responseType: "json",
      }).then((res) => {
        var temp1 = [] as any
        var temp2 = [] as any
        setMonthlyCost(res.data.monthly_cost);
        setItemName(res.data.item);
        res.data.history.forEach(element => {
          if (element.payment_date === year + "-" + month + "-" + day) {
            setDailyCost(element.total_paid)
            setMoney(element.today_saving)
          }
        })
      });
    } catch (err) {
      alert(err);
    }
  };
  // getMonthlyCost();

  // // 월수 계산하기
  // const day1: Date = new Date();
  // const calMonthDay = () => {
  //   var days = new Date(day1.getFullYear(), day1.getMonth(), 0).getDate();
  //   setMonthDay(days);
  //   // console.log(monthDay);
  // };

  // result 성공 실패여부 계산
  // const calResult: any = () => {
  //   if (monthlyCost / monthDay >= dailyCost) {
  //     setCheckResult(true);
  //   } else {
  //     setCheckResult(false);
  //   }
  // };

  // const calMoney = () => {
  //   const temp = Number(monthlyCost) / monthDay - Number(dailyCost);
  //   // console.log(Number(monthlyCost), monthDay, Number(dailyCost));
  //   // console.log(Number(monthlyCost) / monthDay - Number(dailyCost));
  //   if (temp <= 0) {
  //     console.log(dailyCost, monthlyCost, monthDay, '처음')
  //     setMoney(Math.round(Number(dailyCost) - Number(monthlyCost) / monthDay));
  //   } else {
  //     console.log(dailyCost, monthlyCost, monthDay, '두번쨰')
  //     setMoney(Math.round(Number(monthlyCost) / monthDay - Number(dailyCost)));
  //   }
  // };
  // // getMonthlyCost()

  
  return (
    <>
      <StyledText>
          
                <h1>Result Page</h1>
         <h2>
          {(save_money ? save_money : 0)> 0
            ? "성공"
            : "실패"}
          </h2>
         <h2> 오늘 하루 식비를
          <br />
          {save_money}원<br />
          
            {(save_money ? save_money : 0) > 0
              ? "아끼셨네요"
              : "더 쓰셨다는 사실"}
          </h2>
          <br />
              <h2>
          {money > 0
            ? `먹어서 뭐해요!! 남는건 ${itemName}인데!`
            : `먹어서 뭐해요.... ${itemName} 안 살꺼에요?`}
         </h2>

        <StyledTextBtn onClick={() => fullpage_api.moveSlideRight()}>
            <h2>
              다른사람과 비교하러 가기>>
            </h2>
        </StyledTextBtn>
        <br></br>
      </StyledText>
    </>
  );
};

export default ResultPage;
