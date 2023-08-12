import {React, useState} from "react";
import styled from "styled-components"
import Button from "./Button";
import ItemBox from "../List/ItemBox";
import axios from 'axios';
import ParsingItemSpec from "../../APIs/ParsingItemSpec";
import ParsingItemURL from "../../APIs/ParsingItemURL";
const Wrapper = styled.div`
    width: 1920px;
    height: 260px;
    background-color: #FAFDE7;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border: 2px solid #3b3939;
    padding: 10px 180px;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
`;

const ItemContainer = styled.div`
    max-width: 1200px;
    height: 240px;
    display:flex;
    justify-content: flex-start;
    gap: 4px;
    align-items: center;
    overflow: scroll;
    
`

const ButtonWrapper = styled.div`
    
`

function Comparetable(props){
    console.log('comparetabe 렌더링후 selectedItems 출력!!!')
    const itemList = props.list
    const mode = props.mode
    const pop = props.pop
    const query = props.query
    
    const handleClick = () => {
        pop()
    }

    // 상품상세 URL을 만들어주는 함수
    const getDetailURL = (productID) => {
        return 'https://search.shopping.naver.com/catalog/' + encodeURIComponent(productID) + '?' + encodeURIComponent(query)
    }
    const dateSend = async () => {
        const apiUrl = 'http://127.0.0.1:8000/api/ocr/obj/';
    
        try {
            const objFormat = {
                images: {}, // 이미지 데이터를 객체 형태로 저장
                object_name: [],
                thumbnail: [],
                object_url: []
            };
    
            for (const item of itemList) {
                const resolvedItem = await item;
                objFormat.object_name.push(resolvedItem.object_name);
                objFormat.object_url.push(resolvedItem.object_url);
                objFormat.thumbnail.push(resolvedItem.thumbnail);
    
                const objectName = `obj${objFormat.object_name.length}`;
                objFormat.images[objectName] = resolvedItem.images;
            }
    
            const jsonData = JSON.stringify(objFormat);
            console.log(jsonData);
    
            const response = await axios.post(
                apiUrl,
                jsonData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            console.log(response.data);
        } catch (err) {
            alert('등록을 실패하였습니다.');
        }
    };

    const dataRecieve = async () => {
            const URL = "http://127.0.0.1:8000/api/ocr/comparelists/";
            await axios
              .get(URL, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
              })
              .then((res) => {
                    console.log('GET 요청')
                    console.log(res.data)
                }
              )
              .catch((e) => {});
    }
    return(
        <Wrapper>
            <ButtonWrapper
                style = {{
                    position: 'absolute',
                    bottom: '140px',
                    left: '20px'
                }}
                >
                <Button
                
                title = {'비교하기'}
                bgcolor = '#8FDEA5'
                color = '#000000'
                onClick = {() => {
                    dateSend()
                    dataRecieve()
                }
                // alert('비교하기 창으로 넘어가기!!!')
                // post로 넘겨주기
                
            }
            radius = {26}
            >
                </Button>
            </ButtonWrapper>

            <ButtonWrapper
                style = {{
                    position: 'absolute',
                    bottom: '50px',
                    left: '20px'
                }}
                >
                <Button
                title = {'이전'}
                bgcolor = '#8FDEA5'
                color = '#000000'
                onClick = {handleClick}
                radius = {26}
                >
                </Button>
            </ButtonWrapper>
            
            <ItemContainer>
                {
                    
                itemList.map((el, index) => (
                <ItemBox
                key = {index}
                getItem={() =>{}}
                title={el.title}
                url={el.url}
                mode = {mode}
                image={el.image}
                productId={el.productId}
                />
                ))}
            </ItemContainer>
        </Wrapper>
    )
}

export default Comparetable;