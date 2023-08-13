import React from "react";
import styled from "styled-components"
import compareLogListData from "../../virtual_DATA/compareLog.json"
import ItemList from "./ItemList";

const Container = styled.div`
    width: 100%;
    position: relative; 
    padding: 8px;
`;
const LogDate = styled.div`
    text-align: start;
    font-size: 12px;
    margin-bottom: 14px;
`;

const DivideLine = styled.div`
    width: 100%; 
    height: 2px;
    background-color: #000000;
    content: '';
    margin-bottom: 4px;
`;

const Recheck = styled.div`
    position: absolute;
    right: 12px;
    top: 24px;
    width: 80px;
`;

function CompareLog(props) {
    //응답 data를 상품데이터 객체 배열로 만들어 주기 objs인 객체 가져오기
    // 하나의 비교log에 따른 objs속성을 props로 받으면 된다!!! 
    const ItemsInfo = props.objs

    console.log('comparelog에서 받은 리스트')
    console.log(ItemsInfo)    
    return (
        <Container>

            <DivideLine></DivideLine>
            <LogDate>2023년 8월 18일</LogDate>
            <ItemList
            items = {ItemsInfo}
            // getItem = {getItem}
            mode = {false}
            max = {true}
            >
            </ItemList>
            <Recheck>
                <a style ={{
                    color: '#000000',
                }}href="javascript:void()">비교 결과 다시보기</a>
            </Recheck>
        </Container>
        
    )
}

export default CompareLog;
