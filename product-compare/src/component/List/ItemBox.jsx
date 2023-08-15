import {React, useState, useEffect} from "react";
import styled from 'styled-components';
import parsingItemSpec from "../../APIs/ParsingItemSpec";
import ParsingItemURL from "../../APIs/ParsingItemURL";
import ParsingItemReview from "../../APIs/ParsingItemReview";
import axios from "axios";
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
const ItemName = styled.a`
    text-decoration-line: none;
    color: black;
    
`
// 문자열에서 HTML 태그를 제거하는 함수
function removeHtmlTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}
function ItemBox(props){
    const mode = props.mode
    const getItem = props.getItem
    const object_name = removeHtmlTags(props.title);
    const thumbnail = props.image
    const object_url = props.itemURL
    const detail_url = []
    const comments = []
    // function removeQueryString(url) {
    //     const index = url.indexOf('?');
    //     if (index !== -1) {
    //         return url.substring(0, index);
    //     }
    //     return url;
    // }
    const [choiced, setChoiced] = useState(false)
    // https://search.shopping.naver.com/catalog/37624157618
    

    const handleClick = () =>{
        if (mode === true){
            setChoiced(!choiced)
            const URL = object_url;
            axios
            .get(URL)
            .then((res) => {
                const html_doc = res.data
                detail_url.push(parsingItemSpec(html_doc)); // 상태 업데이트
                const getComments = ParsingItemReview(html_doc)
                getComments.forEach(el =>{
                    comments.push(el)
                })
            });
            getItem({object_name, detail_url, thumbnail, object_url, comments })
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
                <img src={thumbnail} alt="상품 이미지" />
            </Wrapper>

            <ItemName href={object_url} dangerouslySetInnerHTML={{ __html: object_name }}></ItemName>
        </Container>
    )
}
export default ItemBox;