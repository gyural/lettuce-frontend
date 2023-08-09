import {React, useState} from "react";
import styled from "styled-components"
import Button from "./Button";
import ItemBox from "../List/ItemBox";
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
    const itemList = props.list
    const mode = props.mode
    const pop = props.pop
    const handleClick = () => {
        pop()
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
                    alert('비교하기 창으로 넘어가기!!!')
                }}
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
                {itemList.map((el) => (
                <ItemBox
                key = {el.id}
                getItem={() =>{}}
                title={el.productName}
                url={el.url}
                src={el.image}
                mode = {mode}
                />
                ))}
            </ItemContainer>
        </Wrapper>
    )
}

export default Comparetable;