
import React from "react";
import styled from "styled-components";
import LoginCard from "../ui/LoginCard";
import logoImage from "../../images/logo.png"

const Header = styled.div`
   height: 72px;
   background-color: #63DE68;
   padding: 5px;
   display: flex;
   justify-content: center;
   align-items: center;

`;

const Container = styled.div`
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Logo = styled.div`
    width: 500px;
    font-size: 36px;
    background-color: #19CE60;
    color: #fff;
    text-align: center;
    padding: 8px;
    margin: 40px 0;
    border-radius: 14px;
`
const Line = styled.div`
    
`;

function LoginPage(){



    return(
        <>
        <Header>
            <img src= {logoImage} alt="상추 이미지" />
            <p style={{
                fontSize: '40px',
                display: 'block',
                marginLeft: '30px',
            }}>AI를 통해 상품을 비교하세요</p>
        </Header>
        <Container>
            <Logo>상추</Logo>
            <LoginCard />
            <Line/>
        </Container>
        
        </>
    );
}

export default LoginPage;