import {React, useState} from "react";
import styled from "styled-components"
import searchImage from "../../images/search_image.png"

const Container = styled.div`
    max-width: 1080px; /* 너비를 1350px로 변경 */
    min-width: 512px;
    width: auto;
    margin: 0px 10px; /* 가운데 정렬을 위해 margin을 auto로 설정 */
    position: relative;
`
const StyledInput = styled.input`
    
    width: 1050px;
    height: 88px;
    border-radius: 43px;
    border: 3px #fafffc solid;
    font-size: 28px;
    padding: 12px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 2px solid;
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
    width: 88px;
    border-radius: 70px;
    height: 88px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0px;
    bottom: 0;
    position: absolute;
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
            style={{cursor: 'pointer'}}
            onClick = {handleSubmit}

            >
            <img src={searchImage} alt="돋보기" />
            </ImageWrapper>

        </Container>

    )
}

export default ItemInput;