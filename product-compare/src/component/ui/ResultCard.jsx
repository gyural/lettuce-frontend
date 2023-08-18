import {React, useEffect, useState} from 'react';
import styled, {css, keyframes} from "styled-components";
import SlideButton from "./SlideButton";
import axios from 'axios';
import Loading from './Loading';
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
    height: 105%;
    opacity: 0.98;
    /* background-color: #FAFDE7; */
    background: #50514e;
    backdrop-filter: blur(15px);
    /* box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2); */

`
const Title = styled.div`
    /* box-sizing: border-box; */
    /* position: relative; */
    width: 100px;
    height: 40px;
    /* line-height: 40px; */
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
    opacity: 1;

    box-sizing: border-box;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90%;
    min-height: 200px;
    background-color: #ffffff;
    border: 4px solid #9edf9c;
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
    height: 81%;
    padding: 0px 0px;
    margin: 0px 0px;
    animation: ${props => (props.move ? css`${slideDown} 0.5s ease-in-out`:css`${slideUp} 0.5s ease-in-out`)};
    animation-fill-mode: forwards;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2);
`
const AspectListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 0;

`;

const AspectWrapper = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  box-shadow: 3px 3px 3px #636262;
  background-color: ${(props) => (props.isFocused ? "#4b4949" : "#fff")};
  color: ${(props) => (props.isFocused ? "#fff" : "#000000")};
  margin: 4px 12px;
  border-radius: 70px;
  
`

const AspectResult = styled.div`
  /* border: 2px solid #19CE60; */
  width: 90%;
  height: 350px;
  display: flex;
  flex-direction: column;
  

`

const ImageWrapper = styled.div`
  width: 235px;
  height: 235px;
  border-radius: 18px;
  box-shadow: 3px 3px 4px 3px #727171;
  border-radius: 14px;
  position: absolute;
  top: 17%;
  left: 31%;
  img{
    width: 100%;
    height: 100%;
  }
`;

const DescriptionWrapper = styled.div`
  position: absolute;
  left: 9%;
  width: 80%;
  bottom: 3%;
`;

const Line = styled.div`

  display: block;
  width: 100%;
  height: 1px;
  background-color: #aaa7a7;
   
`;

const ItemTitle = styled.div`
  font-weight: 700;
  position: absolute;
  top: 10%;
`;
function ResultCard(props){
    const [focusedIndex, setFocusedIndex] = useState(0)
    const [compareResult, setCompareResult] = useState(undefined)
    const weight = props.weight;
    const isUp = props.isUp;  
    const result = props.aspectResult;
    const item = props.item;
    console.log('item출력')
    console.log(item)
    const onButtonClick = props.onButtonClick;
    const aspeectList = props.aspect;
    const compareId = props.compareId
    console.log('CompareId!!!')
    console.log(compareId)
    useEffect(() => {
      // 컴포넌트가 처음 렌더링될 때 '선풍기' 검색을 실행
      const apiUrl = 'http://127.0.0.1:8000/api/ocr/comparelists/';
      axios.get(apiUrl).then((res) =>{
          console.log('result데이터 찍어보기!!')
          if(res.data[compareId] !== undefined)
          {
            console.log(res.data[compareId])
            const result_json = res.data[compareId]["result"][0];
            const result_jsonValue = Object.values(Object.values(result_json))
            const resultArray = [];
            console.log(result_jsonValue)
            for (let i = 1; i <= 5; i++) {
            const resKey = `res${i}`;
            if (result_jsonValue[0].hasOwnProperty(resKey)) {
              resultArray.push(result_jsonValue[0][resKey]);
            }
          }
          console.log(resultArray)
          setCompareResult(resultArray)}
        })
    }, [compareId]);
    
    
      
    
    return (
      <Wrapper move={isUp}>
        <SlideButton onClick={() => {
          onButtonClick(!isUp);
        }} />
        <Card>
          <Container>
            <AspectListWrapper>
              {/* <Title>비교결과</Title> */}
              {aspeectList.map((el, index) => (
                <AspectWrapper
                  key={index}
                  isFocused={focusedIndex === index}
                  onClick={() => setFocusedIndex(index)}
                >
                  <p>{el}</p>
                </AspectWrapper>
              ))}
            </AspectListWrapper>
            
            
              {compareResult === undefined?  (
                <AspectResult
                  style={{
                    position: 'absolute',
                    top: '20%',
                  }}>
                  <Loading></Loading>
                  <p>{aspeectList[focusedIndex]} 측면 결과 가져오는중....</p>
                </AspectResult>
              ):
              (
                <AspectResult>
                  <ItemTitle>상품명 : {item[compareResult[focusedIndex].selected_object_num-1].object_name}</ItemTitle>
                  <ImageWrapper
                    >
                    <img
                      src={compareResult[focusedIndex].selected_obj_thumbnail}
                      alt="결과 상품 썸네일"
                      />
                  </ImageWrapper>
                  <Line
                  style= {{
                    position: 'absolute',
                    top: '65%',
                    left: '0%',
                  }}
                  />
                  <DescriptionWrapper>
                    
                    <p>선택이유는 다음과 같습니다...</p>
                    <p>{compareResult[focusedIndex].select_reason}</p>
                  </DescriptionWrapper>
                  

                </AspectResult>
              
              )}

          </Container>
        </Card>
      </Wrapper>
    );
}

export default ResultCard;