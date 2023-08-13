import {React, useState, useContext} from "react";
import styled from 'styled-components';
import parsingItemSpec from "../../APIs/ParsingItemSpec";
import ParsingItemURL from "../../APIs/ParsingItemURL";
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
// 문자열에서 HTML 태그를 제거하는 함수
function removeHtmlTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}
function ItemBox(props){
    const mode = props.mode
    const getItem = props.getItem
    const object_name = props.title;
    const thumbnail = props.image
    const productId = props.productId
    const productGateURL = props.itemURL 
    function removeQueryString(url) {
        const index = url.indexOf('?');
        if (index !== -1) {
            return url.substring(0, index);
        }
        return url;
    }

    const baseURL = 'https://search.shopping.naver.com/catalog/'
    // https://search.shopping.naver.com/catalog/34952301619
    const object_url = 'https://search.shopping.naver.com/catalog/' + productId
    // const detailURL =  parsingItemSpec(object_url) => 네이버에서 block되어서 임시 url 전송
    const detailURL = object_url
    const images = []
    images.push(detailURL)
    
    let bgColor = '#D9D9D9';
    const [choiced, setChoiced] = useState(false)
    // https://search.shopping.naver.com/catalog/37624157618
    
    const hadleClick = () =>{
        if (mode === true){
            getItem({object_name, images, thumbnail, object_url })
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
                <img src={thumbnail} alt="상품 이미지" />
            </Wrapper>
            <p>{object_name}</p>
        </Container>
    )
}
export default ItemBox;