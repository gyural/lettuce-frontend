import {React, useState} from "react";
import styled from 'styled-components';
import sampleImage from '../../images/상품이지지 예시.jpg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 220px;
`
const Wrapper = styled.div`
    width: 300px;
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
    const title = props.title;
    const image = sampleImage
    let bgColor = '#D9D9D9';
    const [choiced, setChoiced] = useState(false)
    
    if (choiced === true) {
        bgColor = "#19ce618c"
    
    };

    const hadleClick = () =>{
        setChoiced(!choiced)
    }
    return(
        <Container>
            <Wrapper 
            style={{
                backgroundColor : choiced?  '#19ce618c' : '#D9D9D9' ,
            }}
            onClick = {
                hadleClick
            }
            >
                <img src={image} alt="상품 이미지" />
            </Wrapper>
            <p>{title}</p>
        </Container>
        

    )
}

export default ItemBox;