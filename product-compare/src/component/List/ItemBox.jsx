import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import parsingItemSpec from "../../ParsingFunction/ParsingItemSpec";
import ParsingItemReview from "../../ParsingFunction/ParsingItemReview";
import ParsingitemInfo from "../../ParsingFunction/ParsingitemInfo";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 240px;
    position: relative;
    border-radius: 18px;
    box-shadow: 3px 3px 4px 3px #727171;
    padding: 4px 0;
    margin: 8px;
    `;


const Front = styled.div`
    width:90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 18px;
    transition: 0.8s;
    position: absolute;
    margin-bottom: 2px;
    perspective: 500px;
    backface-visibility: hidden;
    img {
        display: block;
        width: 80%;
        height: 80%;
    }
`;

const Back = styled.div`
    width: fit-content; /* Set width to 100% */
    height: fit-content; /* Set height to 100% */
    min-width: 100%;
    min-height: 100%;
    background-color: #19ce618c;
    color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    perspective: 500px;
    backface-visibility: hidden;
    border: 2px solid #b7151533;
    box-sizing: border-box;
    z-index: 5;
    p {
        margin: 5px 0; /* Add margin for spacing between paragraphs */
    }
    `;

const ItemName = styled.a`
    text-decoration-line: none;
    color: black;
    padding: 5px; /* 아래쪽 여백을 최대로 확보하는데 도움이 됨 */
    background-color: #fff;
    backface-visibility: hidden;
    transition: .8s;
`;

function removeHtmlTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}

function ItemBox(props) {
    const mode = props.mode;
    const getItem = props.getItem;
    const object_name = removeHtmlTags(props.title);
    const thumbnail = props.image;
    const object_url = props.itemURL;
    // 제품 설명
    const detail_url = [];
    const comments = [];
    let score = undefined;
    const price = props.price
    const [choiced, setChoiced] = useState(false);
    const [isMouseInside, setIsMouseInside] = useState(false);
    const [itemInfo, setItemInfo] = useState([])
    const handleMouseEnter = async () => {
        setIsMouseInside(true);
    
        if (itemInfo.length < 1) {
            try {
                const res = await axios.get(object_url);
                const html_doc = res.data;
                const parsedInfo = ParsingitemInfo(html_doc);
                setItemInfo([...itemInfo, parsedInfo])
                }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    const handleMouseLeave = () => {
        setIsMouseInside(false);
    };

    const handleClick = () => {
        if (mode === true) {
            setChoiced(!choiced);
            const URL = object_url;
            axios.get(URL).then((res) => {
                const html_doc = res.data;
                detail_url.push(parsingItemSpec(html_doc));
                const getComments = ParsingItemReview(html_doc);
                getComments.forEach((el) => {
                    comments.push(el);
                });
            });
            getItem({
                object_name,
                detail_url,
                thumbnail,
                object_url,
                comments,
            });
        }
    };
    return (

         <test
            style ={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                }}
         >
            <Container
                style={{
                    backgroundColor: choiced ? '#19ce618c' : '#ffffff',
                    perspective: '500px',
                    transition: '1s',
                    backfaceVisibility: 'hidden',
                }}
                onClick={handleClick} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>

                <Back
                    style={{
                        transform: !mode && isMouseInside ? 'rotateY(0deg)' : 'rotateY(180deg)',
                        transition: '1s',
                    }}
                >
                    <p>네이버 평정 {itemInfo[0] === undefined? '계산중...': itemInfo[0][0]}</p>
                    <p>총 리뷰 수 : {itemInfo[0] === undefined? '계산중...': itemInfo[0][1]}</p>
                    <p>제품 정보......</p>
                    <p>{itemInfo[0] === undefined? '계산중...': itemInfo[0][2][0]}</p>
                    <p>{itemInfo[0] === undefined? '계산중...': itemInfo[0][2][1]}</p>
                    <p>{itemInfo[0] === undefined? '계산중...': itemInfo[0][2][2]}</p>
                    <p>{itemInfo[0] === undefined? '계산중...': itemInfo[0][2][3]}</p>
                    <p>{itemInfo[0] === undefined? '계산중...': itemInfo[0][2][4]}</p>
                    
                </Back>

                <Front
                    style={{
                        transform: !mode && isMouseInside ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        transition: '1s',
                    }}>
                    <img src={thumbnail} alt="상품 이미지" />
                </Front>

            </Container>
            <ItemName
            style={{
                marginLeft: '6px',
                width: '220px',
                display: 'block',
            }}
            href={object_url} dangerouslySetInnerHTML={{ __html: object_name }}
        />
            
            <p
                style={{
                    padding: '5px',
                    display: 'block',
                    marginLeft: '6px',
                    width: '220px',
                }}
            >네이버 최저가!!!{price}</p>
        </test>
        
    );
}

export default ItemBox;