import React from "react";
import styled from 'styled-components';
import axios from "axios";
import compareLogListData from "../../virtual_DATA/compareLog.json"
function CompareLogPage() {
    // 비교로그를 모두 받아오는 함수!!!
    const dataRecieve = async () => {
        const apiUrl = 'http://127.0.0.1:8000/api/ocr/obj/';
        const response = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "multipart/json"
            },
          })
          .then(() => {
                console.log('GET 요청 완료후 data 콘솔창 찍기!!!')
                console.log(response)
            }
          )
          .catch((e) => {
            console.log(e)
            console.log('비교 로그 불러오기 실패!!')
          });
}

    return (
        console.log(compareLogList)
        
    )

}

export default CompareLogPage;