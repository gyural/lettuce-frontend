import React from "react";
import styled from 'styled-components';
import axios from "axios";
import compareLogListData from "../../virtual_DATA/compareLog.json"
import CompareLogList from "../List/CompareLogList";
import logoImage from "../../images/logo.png"
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";

const dataRecieve = async () => {
    const apiUrl = 'http://127.0.0.1:8000/api/ocr/obj/';
    const response = await axios.get(apiUrl, {
        headers: {
            "Content-Type": "multipart/json"
        },
      })
      .then(() => {
            console.log('GET 요청 완료후 data 콘솔창 찍기!!!')
            console.log(response)
        }
      )
      .catch((e) => {
        console.log(e)
        console.log('비교 로그 불러오기 실패!!')
      });
}
const Container = styled.div`
    
`;
const Header = styled.div`
    width: 100%;
    height: 82px;
    background-color: #63DE68;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 3px 3px 5px #101010
    img{
        height: 100%;
    }
    
`;
const Banner = styled.div`
    height: 80px;
    margin-right: 370px;
    display: flex;
    align-items: center;
`
const Wrapper = styled.div`
    display: flex;
    height: fit-content;
    justify-content: center;
    margin: 8px 12px;
    align-items: center;
    
`


const Title = styled.div`
    padding: 24px 8px;
    font-size: 34px;
    font-weight: 700;
    
`
function CompareLogPage() {
    // 비교로그를 모두 받아오는 함수!!!
    const navigate = useNavigate();
    

    return (
        <Container>
            <Header style={{
            position: 'relative',
            }}>
            <Banner style={{
                position: 'absolute',
                right: '22%',
                }}>
            <img src= {logoImage} alt="상추 이미지" />
            <p style={{
                fontSize: '36px',
                display: 'block',
                marginLeft: '30px',
            }}>상추</p>
            </Banner>
        
            <Wrapper>
                <Button
                    
                    radius={25}
                    title={" 로그인 "}
                    bgcolor={'#58B37C'}
                    color={'#000000'}
                    onClick={() => {
                        navigate("/signin");
                    } } />
            </Wrapper>
            <Wrapper>
                <Button
                    radius={25}
                    title={" 장바구니 "}
                    bgcolor={'#58B37C'}
                    color={'#000000'}
                    onClick={() => { alert('장바구니 버튼 클릭!!!'); } } />
            </Wrapper>
            <Wrapper>
                <Button
                    
                    radius={25}
                    title={" My비교 "}
                    bgcolor={'#58B37C'}
                    color={'#000000'}
                    onClick={() => { console.log('My비교 버튼 클릭!!!'); } } />
            </Wrapper>
            

        </Header>
        <Title>최근 비교 내역</Title>
        <CompareLogList></CompareLogList>

        </Container>
    )

}

export default CompareLogPage;