import {React, useState, createContext, useEffect} from "react";
import styled from 'styled-components'
import ItemInput from "../ui/ItemInput";
import ItemList from "../List/ItemList";
import Button from "../ui/Button";
import {useNavigate, useSearchParams} from "react-router-dom";
import logoImage from "../../images/logo.png"
import ChoiceButton from "../ui/ChoiceButton";
import itemListVirtual from '../../jsons/itemListVirtual.json'
import Comparetable from "../ui/Comparetable";
import ResultCard from "../ui/ResultCard";
import { useLocation } from "react-router";
import axios from 'axios';


const itemList = itemListVirtual

const Container = styled.div`
    width: auto;
    padding: 20px 40px;
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
    width: 100%;
`
function ItemSelect1 (){
    const [value, setValue] = useState('')
    const getValue = (inputValue) => {
        setValue(inputValue)
    }
    const [choiceMode, setChoiceMode] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [items, setItems] = useState([])
    const [resultMode, setResult] = useState(false)
    const [isResultUp, setIsResultUp] = useState(false);

    const navigate = useNavigate();
    //itemBox가 클릭 되었을 때 해당 itemBox의 정보를 가져오는 함수
    const getItem = (itemInfo) => {
        // 해당 itemBox info return
        
        const index = selectedItems.findIndex((el) => el.object_name === itemInfo.object_name);
        if(index === -1){
            console.log(itemInfo)
            setSelectedItems(selectedItems => [...selectedItems, itemInfo]);
        }
        else{
            // 이미 선택된 아이템이라면 선택 해제
            setSelectedItems(selectedItems => [...selectedItems.slice(0, index), ...selectedItems.slice(index + 1)]);
        }
        
    };
    // Comparetable의 이전버튼이 눌러졌을때 list를 pop해주는 핸들러 함수
    const handlePop = () => {
        setSelectedItems(selectedItems => selectedItems.slice(0, -1))
    }
    // navigate로 넘겨준 props를 console에 찍어주기
    const GetQueryString = () => {
        const [searchParams, setSearchParams] = useSearchParams();
        const query = searchParams.get("search");
        return query;
    }
    // 네이버 오픈 API로 itemList에 가져오기
    const getSearchitem = async (query) => {
        const URL = "v1/search/shop.json";
        // const URL = "https://openapi.naver.com/v1/search/shop.xml"	
        const ClientID = "UON8xyX_h_yETd2UkLyZ";
        const ClientSecret = "ZszAjOj5Km";
        await axios
          .get(URL, {
            params: {
              query: query,
              display: 100,
            },
            headers: {
              "X-Naver-Client-Id": ClientID,
              "X-Naver-Client-Secret": ClientSecret,
            },
          })
          .then((res) => {
              const filteredItems = filteringSmartStore(res.data.items)
              console.log('필터링된 아이템 목록들!!!')
              console.log(filteredItems)
              setItems(filteredItems)
            }
          )
          .catch((e) => {});
    }
    // 목록들중 비스마트 스토어들만 필터링 해주는 코드
    const filteringSmartStore = (noneFilteredList) =>{
        const filteredList = []
        for (let item of noneFilteredList){

            if(item.mallName === '네이버'){
                 filteredList.push(item) 
            } 
        }
        return filteredList;
    }
        
    
    // url만 넘겨주면 된다!!!
    const query = GetQueryString()
    //Edit 반환된 query값을 매개변수로 OPEN API 호출 마운트시에만 실행하기!!
    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 '선풍기' 검색을 실행
        getSearchitem(query);
      }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행함을 의미
    return(
        <>
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
                    onClick={() => { navigate("/mylog")} } />
            </Wrapper>
            

        </Header>
        
        <Container style={{
            position: 'relative',
            ...(choiceMode && { marginBottom: '260px' })
            }}>
            <ItemInput
                onClick = {() =>{ 
                    // getSearchitem(value);
                    // navigate('/select1', { state: value });
                    navigate(`/select1?search=${value}`)
                }}
                getValue = {getValue}
            />
            
            <ItemList
                items = {items}
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
                }}
            >
            <ChoiceButton/>
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
                query = {query}
                showResult = {(result) => {
                    setResult(true)
                    setIsResultUp(false)
                }}
            />
        </CompareWrapper>}
        {resultMode && <ResultCard result='test' item={selectedItems} weight={1} onButtonClick={(_isUp)=>{setIsResultUp(_isUp)}} isUp={isResultUp} />}
        </>

        
    )
}

export default ItemSelect1