import React from "react";
import styled from "styled-components"
import image1 from "../../images/north_west_v2 (1).png"


const Wrapper = styled.div`
    position: fixed;
    top: 20%;
    right: 50px;
    width: 50px;
    height: 50px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 70px;
    background-color: #05A929;
    img{
        height: 80%;
        width: 80%;
    }
    p{
        position: absolute;
        width: 100px;
        left: -1px;
        bottom: -40px;
    }

`
function ChoiceButton (){

    return(
        <>
        <Wrapper>
            <img 
                style={{
                    opacity:'0.4',
                }}
            src={image1} alt="선택 버튼 이미지" />
            <p>상품 선택</p>
        </Wrapper>
        
        </>
        
    )

}

export default ChoiceButton;