import {React, useState} from "react";
import styled from "styled-components"
import Button from "./Button";
import ItemBox from "../List/ItemBox";
import axios from 'axios';
import ParsingItemSpec from "../../ParsingFunction/ParsingItemSpec";
import ParsingItemURL from "../../ParsingFunction/ParsingItemURL";
const Wrapper = styled.div`
    width: auto;
    height: 300px;
    background-color: #f6f6f6;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border: 2px solid #90908d;
    padding: 10px 180px;
    display:flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const ItemContainer = styled.div`
    width: auto;
    height: 100%;
    display:flex;
    justify-content: center;
    gap: 4px;
    align-items: center;
    scroll-behavior:smooth;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    /* &::-webkit-scrollbar{
        // 가로 스크롤바 숨기기
    display: none; 
    } */
    
`

const ButtonWrapper = styled.div`
    
`

const CompareResult = styled.div`
    position: fixed;
    bottom: 0;
    width: 80%;
    height: 600px;
    background-color: #FAFDE7;
`

function Comparetable(props){
    console.log('comparetabe 렌더링후 selectedItems 출력!!!')
    const itemList = props.list
    const mode = props.mode
    const pop = props.pop
    const showResult = props.showResult
    const getAspect = props.getAspect
    const getCompareId = props.getCompareId
    const handleClick = () => {
        pop()
    }
        
    const dateSend = async () => {
        const apiUrl = 'http://127.0.0.1:8000/api/ocr/obj/';
        
        const sum_aspects = []
        //aspect종합해서 만들기
        itemList.forEach((element) => {
            sum_aspects.push(...element.aspects); // spread 연산자를 사용하여 각 aspects 배열을 펼쳐서 추가
        });

        // 각 값의 빈도수를 계산하여 객체로 표현
        const frequencyMap = sum_aspects.reduce((map, value) => {
            map[value] = (map[value] || 0) + 1;
            return map;
        }, {});
        
        // 빈도수가 높은 값 순서대로 정렬
        const sortedByFrequency = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
        const top5Aspects = sortedByFrequency.slice(0, 5);
        getAspect(top5Aspects)
        const objFormat = {
            images: {}, // 이미지 데이터를 객체 형태로 저장
            object_name: [],
            thumbnail: [],
            object_url: [],
            comments: {},
            obj_info: {},
            aspects: top5Aspects,
        };

        // 데이터 형식 만들기
        itemList.forEach((element, idx) => {
            objFormat.object_name.push(element.object_name);
            objFormat.object_url.push(element.object_url);
            objFormat.thumbnail.push(element.thumbnail);
            const objName = `obj${idx}`;
            objFormat.images[objName] = element.detail_url;
            objFormat.comments[objName] = element.comments;
            objFormat.obj_info[objName] = element.obj_info[2];
        });
           
        
        // 모든 이미지가 가져와지고 Promise가 resolve된 후에 데이터 전송

        const jsonData = JSON.stringify(objFormat);
        console.log('최종 보내지는 데이터!!!')
        console.log(jsonData)
        axios.post(apiUrl, jsonData,{ withCredentials: true }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log('함수 호출 전:', response.data.id);
            getCompareId(response.data.id);
            showResult()
        })
        .catch(error => {
            console.error('오류 발생:', error);
        });
        

    }
    return(
        <Wrapper>
            <ButtonWrapper
                style = {{
                    position: 'absolute',
                    bottom: '140px',
                    left: '20px'
                }}
                >
                <Button
                
                title = {'비교하기'}
                bgcolor = '#8FDEA5'
                color = '#000000'
                onClick = {dateSend}
                // alert('비교하기 창으로 넘어가기!!!')
                // post로 넘겨주기
                
            
            radius = {26}
            >
                </Button>
            </ButtonWrapper>

            <ButtonWrapper
                style = {{
                    position: 'absolute',
                    bottom: '50px',
                    left: '20px'
                }}
                >
                {/* <Button
                title = {'이전'}
                bgcolor = '#8FDEA5'
                color = '#000000'
                onClick = {handleClick}
                radius = {26}
                >
                </Button> */}
            </ButtonWrapper>
            
            <ItemContainer>
                {
                    
                itemList.map((el, index) => (
                <ItemBox
                key = {index}
                getItem={() =>{}}
                title={el.object_name}
                url={el.url}
                mode = {mode}
                image={el.thumbnail}
                productId={el.productId}
                />
                ))}
            </ItemContainer>
        </Wrapper>
    )
}

export default Comparetable;