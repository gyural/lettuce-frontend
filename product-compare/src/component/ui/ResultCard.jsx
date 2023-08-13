import {React, useState} from 'react';
import styled, {css, keyframes} from "styled-components";
import SlideButton from "./SlideButton";


const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;



const Card = styled.div`
    position: absolute;
    top: 0%;
    width: 100%;
    height: 100%;
    /* background-color: #FAFDE7; */
    background: rgba(250, 253, 230, 0.85);
    backdrop-filter: blur(15px);
    /* box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2); */

`
const Title = styled.div`
    box-sizing: border-box;
    position: relative;
    top: 50%;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 70px;
    background-color: #19CE604D;
    color: #000;
    font-family: Noto Sans;
    font-size: 16px;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    user-select: none;
`
const Container = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    
    height: auto;
    min-height: 200px;
    background-color: #C2E3C1;
    border-radius: 20px;
    /* border: 2px solid #b8d6b7; */
    padding: 10px 30px;
    justify-content: flex-start;
    align-items: center;
    p{
        margin: 5px;
    }
`

const Wrapper = styled.div`
    position: fixed;
    top: 20%;
    width: 100%;
    height: 80%;
    padding: 0px 0px;
    margin: 0px 0px;
    animation: ${props => (props.move ? css`${slideDown} 0.5s ease-in-out`:css`${slideUp} 0.5s ease-in-out`)};
    animation-fill-mode: forwards;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2);
`

function ResultCard(props){
    const weight = props.weight;
    const isUp = props.isUp;
    
    const result = props.result;
    const item = props.item;
    const onButtonClick = props.onButtonClick;
    
    return(
        <Wrapper move={isUp}>
            <SlideButton onClick={()=>{
                    onButtonClick(!isUp)
                    }}/>
            <Card>
                
                <Container>
                    <Title >비교결과</Title>
                    <p>총 {item.length}개의 상품을 비교했습니다.</p>
                    <p>{result}</p>
                </Container>
            </Card>
        </Wrapper>
    );
}

export default ResultCard;