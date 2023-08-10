import {React, useState, useContext} from "react";
import styled from 'styled-components';
import { ModeContext } from "../pages/ItemSelect1";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 240px;
`
const Wrapper = styled.div`
    width: 200px;
    height: 200px;
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
    // const image = props.src;
    // const image = 'https://www.hanilelec.co.kr/HanilWebFile/Admin/PRODUCT/(801867)ABFL-1430RDC.jpg'
    const url = props.url
    // console.log(`itemBox 렌더링 ${title} ${image}  ${url} ${mode}`)
    let bgColor = '#D9D9D9';
    const [choiced, setChoiced] = useState(false)
    

    const hadleClick = () =>{
        if (mode === true){
            getItem({image, object_name})
            setChoiced(!choiced)

        }
        
    
    }
    return(
        <Container
            onClick = {hadleClick}>
            <Wrapper 
            style={{
                backgroundColor : choiced?  '#19ce618c' : '#D9D9D9' ,
            }}
            >
                <img src={image} alt="상품 이미지" />
            </Wrapper>
            <p>{object_name}</p>
        </Container>
    )
}
export default ItemBox;