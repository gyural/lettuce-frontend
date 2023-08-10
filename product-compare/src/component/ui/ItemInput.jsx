import {React, useState} from "react";
import styled from "styled-components"
import searchImage from "../../images/search_image.png"

const Container = styled.div`
    max-width: 1080px; /* 너비를 1350px로 변경 */
    margin: 0 auto; /* 가운데 정렬을 위해 margin을 auto로 설정 */
    position: relative;
`
const StyledInput = styled.input`
    
    width: 1080px;
    height: 88px;
    border-radius: 43px;
    border: 3px #04cf5c solid;
    font-size: 28px;
    padding: 12px;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 3px 3px 3px #727171;
    &:focus{
        outline: none;
    }
    &::placeholder{
        text-align: center;
        font-size: 24px;
    }
    `

const ImageWrapper = styled.div`
    width: 94px;
    border-radius: 70px;
    height: 94px;
    background-color: #04cf5c;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -2px;
    bottom: 0;
    position: absolute;
    z-index: 1;
`
function ItemInput (props){
    const [itemName, setItemName]= useState('')
    const onClick = props.onClick
    const getValue = props.getValue
    const handleChange = (e) => {
        const value = e.target.value
        setItemName(value)
        getValue(value)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            
          handleSubmit();
        }
      };

    const handleSubmit = () => {
        if (itemName === ''){
            return
        }

        onClick()
    }
    return(
        <Container>
            <StyledInput
            placeholder="비교하고 싶은 상품을 검색하세요"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            ></StyledInput>
            <ImageWrapper 
            onClick = {handleSubmit}
            >
            <img src={searchImage} alt="돋보기" />
            </ImageWrapper>

        </Container>

    )
}

export default ItemInput;