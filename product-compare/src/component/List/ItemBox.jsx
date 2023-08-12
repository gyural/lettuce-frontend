import {React, useState, useContext} from "react";
import styled from 'styled-components';
import { ModeContext } from "../pages/ItemSelect1";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
`
const Wrapper = styled.div`
    width: 180px;
    height: 180px;
    padding: 3px 2px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    img {
    max-width: 100%;
    max-height: 100%;
  }
`

function ItemBox(props){
    const mode = props.mode
    const getItem = props.getItem
    const object_name = props.title;
    const image = props.src
    const url = props.url
    let bgColor = '#D9D9D9';
    const [choiced, setChoiced] = useState(false)
    

    const handleClick = () =>{
        if (mode === true){
            getItem({image, object_name})
            setChoiced(!choiced)

        }
        
    
    }
    return(
        <Container
            onClick = {handleClick}>
            <Wrapper 
            style={{
                backgroundColor : choiced?  '#19ce618c' : '#D9D9D9' ,
            }}
            >
                <img src={image} alt="상품 이미지" />
            </Wrapper>
            <p dangerouslySetInnerHTML={{ __html: object_name }}></p>
        </Container>
    )
}
export default ItemBox;