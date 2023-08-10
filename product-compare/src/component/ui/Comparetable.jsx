import {React, useState} from "react";
import styled from "styled-components"
import Button from "./Button";
import ItemBox from "../List/ItemBox";
import axios from 'axios';
const Wrapper = styled.div`
    width: 1920px;
    height: 260px;
    background-color: #FAFDE7;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border: 2px solid #3b3939;
    padding: 10px 180px;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
`;

const ItemContainer = styled.div`
    max-width: 1200px;
    height: 240px;
    display:flex;
    justify-content: flex-start;
    gap: 4px;
    align-items: center;
    overflow: scroll;
    
`

const ButtonWrapper = styled.div`
    
`

function Comparetable(props){
    const itemList = props.list
    const mode = props.mode
    const pop = props.pop
    const handleClick = () => {
        pop()
    }
    const dateSend = () => {
        const apiUrl = 'http://127.0.0.1:8000/api/ocr/obj/'; // 서버 엔드포인트 주소를 여기에 입력하세요

        var formData = new FormData();
        
        // const imgList = ["src1", "src2", "src3"]
        // const TitleList = ["productName", "produceaasdf", "sdfsd"]
        
        formData.append('image', itemList.map((el) =>{
            return JSON.stringify(el.image)
        }))
        formData.append('object_name', itemList.map((el) =>{
            return JSON.stringify(el.object_name)
        
            
        }));
        
        
        axios.post(apiUrl
            , formData
            , {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).catch(err => {
            alert('등록을 실패하였습니다.');
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
                onClick = {
                    // alert('비교하기 창으로 넘어가기!!!')
                    // post로 넘겨주기
                    dateSend
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
                <Button
                title = {'이전'}
                bgcolor = '#8FDEA5'
                color = '#000000'
                onClick = {handleClick}
                radius = {26}
                >
                </Button>
            </ButtonWrapper>
            
            <ItemContainer>
                {itemList.map((el) => (
                <ItemBox
                key = {el.id}
                getItem={() =>{}}
                title={el.productName}
                url={el.url}
                src={el.image}
                mode = {mode}
                />
                ))}
            </ItemContainer>
        </Wrapper>
    )
}

export default Comparetable;