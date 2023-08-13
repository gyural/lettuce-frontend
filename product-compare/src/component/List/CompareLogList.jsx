import {React, useEffect, useState} from "react";
import styled from "styled-components"
import compareLogListData from "../../virtual_DATA/compareLog.json"
import CompareLog from "./CompareLog";
import axios from "axios"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

`;

const LogNum = styled.div`
  
`

function CompareLogList() {
  const [logList, setLogList] = useState(null); // 상태 설정

  useEffect(() => {
    const URL = "http://127.0.0.1:8000/api/ocr/comparelists/";
    axios
      .get(URL, {
        headers: {
          "Content-Type": "multipart/json",
        },
      })
      .then((res) => {
        setLogList(res.data); // 상태 업데이트
      });
  }, []); // 빈 배열은 마운트 시 한 번만 실행

  
  return (
    <Container>
    {logList &&
      logList.reverse().map((log, index) => (
        <CompareLog key={index} objs={log.objs} />
      ))}
  </Container>
  );
}

export default CompareLogList;

