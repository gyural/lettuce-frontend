import {React} from 'react';
import styled from "styled-components";


const Button = styled.div`
    position: absolute;
    top: -4%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 130px;
    height: 50px;
    border-radius: 20px;
    /* border: 3px solid #d9dfbb; */
    /* background: #fafde6; */
    background: rgba(250, 253, 230, 0.85);
    backdrop-filter: blur(15px);
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2);


    cursor: pointer;
    p {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        height: 20px;
        color: #8C8C8C;
        text-align: center;
        font-family: Inter;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;
        user-select: none;
    }
`

function SlideButton(props){
    return(
        <Button onClick={props.onClick}>
            <p>=</p>
        </Button>
    )
}

export default SlideButton;