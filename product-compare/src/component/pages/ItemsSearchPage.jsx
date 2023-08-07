import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components"
import Button from "../ui/Button";
import ItemInput from "../ui/ItemInput";
import logoImage from "../../images/logo.png"

const Container = styled.div`
    background-color: #63DE68;
    width: 100%;
    height: 1080px;
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

`;

const Header = styled.div`
    width: 100%;
    background-color: #63DE68;
    display: flex;
    justify-content: flex-end;

    
`;

const ImageWrapper = styled.div`
    width: 111px;
    border-radius: 43px;
    height: 111px;
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 22px 12px;
`
const Logo = styled.div`
    width: 1000px;
    height: 111px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 72px;
    font-weight: 700;
`
function ItemsSearchPage (){
    const navigate = useNavigate();

    return(
        <><Header>
            <ButtonWrapper>
                <Button
                    style={{
                        margin: '8px',
                    }}
                        radius = {25}
                        title={" 로그인 "}
                        bgcolor={'#58B37C'}
                        color={'#000000'}
                        onClick={() => {
                            navigate("/signin");
                        }} />
            </ButtonWrapper>
            <ButtonWrapper>
                <Button
                    style={{
                        margin: '8px',
                    }}
                        radius = {25}   
                        title={" 장바구니 "}
                        bgcolor={'#58B37C'}
                        color={'#000000'}
                        onClick={() => { console.log('로그인 버튼 클릭!!!'); } } />
            </ButtonWrapper>
            <ButtonWrapper>
                <Button
                    style={{
                        margin: '8px',
                    }}
                        radius = {25}
                        title={" My비교 "}
                        bgcolor={'#58B37C'}
                        color={'#000000'}
                        onClick={() => { console.log('로그인 버튼 클릭!!!'); } } />
            </ButtonWrapper>
            
            
            </Header>
            <Container>


                <Logo
                style={{ marginBottom: '0px' }}>
                <ImageWrapper><img src={logoImage} alt="돋보기" /></ImageWrapper>
                상추
                <ImageWrapper><img src={logoImage} alt="돋보기" /></ImageWrapper>
                </Logo>
                <p style={{
                fontSize: '40px',
                }}>비교하고 싶은 상품을 검색하여 AI로 비교하세요!</p>
                <ItemInput
                    onClick ={() =>{
                        navigate('/select1')
                    }}
                ></ItemInput>
            </Container>
        </>
    )
}

export default ItemsSearchPage;