import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import parsingItemSpec from "../../ParsingFunction/ParsingItemSpec";
import ParsingItemReview from "../../ParsingFunction/ParsingItemReview";
import ParsingitemInfo from "../../ParsingFunction/ParsingitemInfo";
import ParsingItemAspect from "../../ParsingFunction/ParsingItemAspect";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 230px;
    position: relative;
    border-radius: 18px;
    box-shadow: 3px 3px 4px 3px #727171;
    padding: 0px 0;
    margin: 8px;
    `;


const Front = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    transition: 0.8s;
    position: absolute;
    margin-bottom: 2px;
    perspective: 500px;
    backface-visibility: hidden;
    img {
        display: block;
        border-radius: 18px;
        width: 95%;
        height: 95%;
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
    const obj_info = [];
    const aspects = [];
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
                //상품 설명 이미지 뽑아오기
                detail_url.push(parsingItemSpec(html_doc));
                //상품의 댓글 뽑아오기
                const getcomments = ParsingItemReview(html_doc)
                getcomments.forEach((el) => {
                    comments.push(el);
                });
                //상품의 기본정보 뽑아오기
                const getItemInfo = ParsingitemInfo(html_doc);
                getItemInfo.forEach((el) => {
                    obj_info.push(el);
                });
                //상품의 aspects 뽑아오기
                const getApects = ParsingItemAspect(html_doc);
                getApects.forEach((el) => {
                    aspects.push(el);
                });
            });
            getItem({
                object_name,
                detail_url,
                thumbnail,
                object_url,
                comments,
                obj_info,
                aspects,
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
                {itemInfo[0] === undefined ? (
                // 정보를 받아오기 전
                <>
                    <p>네이버 평점 계산중.....</p>
                    <p>네이버 리뷰 수 계산중.....</p>
                    <p>제품정보 계산중......</p>
                </>
                ) : (
                // 제품 정보가 있는 경우
                <>
                    <p>{itemInfo[0][0] === undefined ? '평점 가져오기 실패!!' : `네이버 평점: ${itemInfo[0][0]}`}</p>
                    <p>{itemInfo[0][1] === undefined ? '계산중...' : `총 리뷰 수: ${itemInfo[0][1]}`}</p>

                    <p>
                    {itemInfo[0][2] === undefined ? (
                        "상품 정보가 없습니다..."
                    ) : (
                        <>
                            {itemInfo[0][2].length < 5 ? (
                                itemInfo[0][2].map((info, i) => <p key={i}>{info}</p>)
                            ) : (
                                itemInfo[0][2].slice(0, 5).map((info, i) => <p key={i}>{info}</p>)
                            )}
                        </>
                    )}
                    </p>
                </>
                 )}
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
                fontWeight: '700',
                fontSize: '16px',
            }}
            href={object_url} dangerouslySetInnerHTML={{ __html: object_name }}
        />
            
            {price && <p
                style={{
                    padding: '0px',
                    display: 'block',
                    marginLeft: '6px',
                    width: '220px',
                }}
            >₩{price}</p>}
            
        </test>
        
    );
}

export default ItemBox;