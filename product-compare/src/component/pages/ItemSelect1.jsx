import {React, useState, createContext} from "react";
import styled from 'styled-components'
import ItemInput from "../ui/ItemInput";
import ItemList from "../List/ItemList";
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";
import logoImage from "../../images/logo.png"
import ChoiceButton from "../ui/ChoiceButton";
import itemListVirtual from '../../jsons/itemListVirtual.json'
import Comparetable from "../ui/Comparetable";

const itemList = itemListVirtual

const Container = styled.div`
    width: 100%;
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

const CompareWrapper = styled.div`
    
`
export const ModeContext = createContext();
function ItemSelect1 (){
    
    const [choiceMode, setChoiceMode] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const navigate = useNavigate();
    
    //itemBox가 클릭 되었을 때 해당 itemBox의 정보를 가져오는 함수
    const getItem = (itemInfo) => {
        // 해당 itemBox info return
        setSelectedItems(selectedItems => [...selectedItems, itemInfo])
        
    };
    // Comparetable의 이전버튼이 눌러졌을때 list를 pop해주는 핸들러 함수
    const handlePop = () => {
        setSelectedItems(itemList => itemList.slice(0, -1))
    }
    return(
        <test
            style={{
                maxHeight: '80px',

            }}
        >
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
                    onClick={() => { console.log('로그인 버튼 클릭!!!'); } } />
            </Wrapper>
            <Wrapper>
                <Button
                    
                    radius={25}
                    title={" My비교 "}
                    bgcolor={'#58B37C'}
                    color={'#000000'}
                    onClick={() => { console.log('로그인 버튼 클릭!!!'); } } />
            </Wrapper>
            

        </Header>
        
        <Container style={{
            position: 'relative',
            ...(choiceMode && { marginBottom: '260px' })
            }}>
            <ItemInput
                onClick = {() =>{ 
                    navigate('/select1')
                }}
            />
            
            <ItemList
                itemList = {itemList}
                getItem = {getItem}
                mode = {choiceMode}
            ></ItemList>

            <Wrapper
                style = {{
                    display: "flex",
                    flexDirection: "column",
                    position: 'absolute',
                    right: '120px',
                    top: '200px',
                }}
                onClick = {() =>{
                    setChoiceMode(!choiceMode);
                    console.log('선택 버튼 클릭 이벤트 발생!!')
                }}
            >
                <ChoiceButton
                ></ChoiceButton>
                <p>상품 선택</p>
            </Wrapper>
            
        </Container>
        {choiceMode && <CompareWrapper style={{
            position: 'fixed',
            bottom: '0',
        }}>
            <Comparetable
                list = {selectedItems}
                mode = {choiceMode}
                pop = {handlePop}
            />
        </CompareWrapper>}
        

        </test>
        
    )
}

export default ItemSelect1