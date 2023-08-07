import React from "react";
import styled from 'styled-components'
import ItemInput from "../ui/ItemInput";
import ItemList from "../List/ItemList";
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";
import logoImage from "../../images/logo.png"
import ChoiceButton from "../ui/ChoiceButton";

const Container = styled.div`
    width: 100%;
    height: 1080px;
    padding: 80px 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    gap: 42px;
`;
const Header = styled.div`
    width: 100%;
    background-color: #63DE68;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 3px 3px 5px #888888
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
const ButtonWrapper = styled.div`
    display: flex;
    height: fit-content;
    justify-content: center;
    margin: 8px 12px;
    align-items: center;
    
`

function ItemSelect1 (){

    const navigate = useNavigate();
    return(
        <><Header>
            <Banner>
            <img src= {logoImage} alt="상추 이미지" />
            <p style={{
                fontSize: '36px',
                display: 'block',
                marginLeft: '30px',
            }}>상추</p>
            </Banner>
            
            <ButtonWrapper>
                <Button
                    
                    radius={25}
                    title={" 로그인 "}
                    bgcolor={'#58B37C'}
                    color={'#000000'}
                    onClick={() => {
                        navigate("/signin");
                    } } />
            </ButtonWrapper>
            <ButtonWrapper>
                <Button
                   
                    radius={25}
                    title={" 장바구니 "}
                    bgcolor={'#58B37C'}
                    color={'#000000'}
                    onClick={() => { console.log('로그인 버튼 클릭!!!'); } } />
            </ButtonWrapper>
            <ButtonWrapper>
                <Button
                    
                    radius={25}
                    title={" My비교 "}
                    bgcolor={'#58B37C'}
                    color={'#000000'}
                    onClick={() => { console.log('로그인 버튼 클릭!!!'); } } />
            </ButtonWrapper>


        </Header>
        
        <Container style={{position: 'relative'}}>
            {/* <ChoiceButton
                style={{position: 'absolute'}}>

            </ChoiceButton> */}
            <ItemInput
                onClick = {() =>{ 
                    navigate('/select1')
                }}
            />
            <ItemList></ItemList>
        </Container></>
        
    )
}

export default ItemSelect1