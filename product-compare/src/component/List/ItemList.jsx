import {React, useState, useEffect, useContext} from "react";
import styled from 'styled-components';
import ItemBox from "./ItemBox";
import { ModeContext } from "../pages/ItemSelect1";
import ChoiceButton from "../ui/ChoiceButton";

 const Container = styled.div`
    width: ${size}; 
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0px 0px;
    column-gap: 10px;
    row-gap: 10px;
`;

function ItemList(props) {
  const size = props.max ? '100%' : '918px'; // 조건에 따라 size 변수 설정
 
function ItemList(props) {

  const getItemURL = ((productId) =>{
    return ('https://search.shopping.naver.com/catalog/' + productId)
  })
  const itemList = props.items;
  const mode = props.mode
  return (
    <Container>
      {itemList.map((el, index) => (
        <ItemBox
          key = {index}
          title = {el.title || el.object_name}
          getItem={props.getItem}
          image={el.image || el.thumbnail}
          productId={el.productId}
          mode = {mode}
          itemURL = {getItemURL(el.productId)}

        />
      ))}
    </Container>
  );

  
  
}

export default ItemList;

