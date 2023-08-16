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
    background-color: #FAFDE7;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border: 2px solid #d8e0a5;
    padding: 10px 180px;
    display:flex;
    justify-content: flex-start;
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
    const handleClick = () => {
        pop()
    }
        
    const dateSend = async () => {
        const apiUrl = 'http://127.0.0.1:8000/api/ocr/obj/';

        console.log('넘어온 itemList형태 확인!!!')
        
        
        const objFormat = {
            images: {}, // 이미지 데이터를 객체 형태로 저장
            object_name: [],
            thumbnail: [],
            object_url: [],
            comments: {}
        };

        // 이미지를 가져오는 Promise 배열 생성
        itemList.forEach((element, idx) => {
            objFormat.object_name.push(element.object_name);
            objFormat.object_url.push(element.object_url);
            objFormat.thumbnail.push(element.thumbnail);
            const objName = `obj${idx}`;
            objFormat.images[objName] = element.detail_url;
            objFormat.comments[objName] = element.comments;
        });
           
        
        // 모든 이미지가 가져와지고 Promise가 resolve된 후에 데이터 전송

        const jsonData = JSON.stringify(objFormat);
        console.log(jsonData)
        const response = await axios.post(
            apiUrl,
            jsonData,
            {
            headers: {
                "Content-Type": "application/json" // 올바른 Content-Type 설정
            }
            },
            );
            
            console.log('!!!!!!!!!!!!!!!!!!제발 ㅠㅠ')
            console.log(response)
            
        };
    
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
                onClick = {() => {

                    dateSend()
                    showResult()

                }
                // alert('비교하기 창으로 넘어가기!!!')
                // post로 넘겨주기
                
            }
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