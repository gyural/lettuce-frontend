import React from "react";
import styled from "styled-components"
import image1 from "../../images/north_west_v2 (1).png"


const Wrapper = styled.div`
    width: 84px;
    height: 84px;
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

`
function ChoiceButton (){

    return(
        <Wrapper>
            <img 
                style={{
                    opacity:'0.4',
                }}
            src={image1} alt="선택 버튼 이미지" />
        </Wrapper>
    )

}

export default ChoiceButton;