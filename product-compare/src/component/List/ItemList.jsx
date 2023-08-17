import {React, useState, useEffect, useContext} from "react";
import styled from 'styled-components';
import ItemBox from "./ItemBox";
import { ModeContext } from "../pages/ItemSelect1";
import ChoiceButton from "../ui/ChoiceButton";

const Container = styled.div`
    margin-top: 40px;
    width: ${props=>props.size}; 
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 10px;
`;

function ItemList(props) {
  
  const size = props.max ? '100%' : '1400px'; // 조건에 따라 size 변수 설정


  const getItemURL = ((productId) =>{
    return ('https://search.shopping.naver.com/catalog/' + productId)
  })
  const itemList = props.items;
  const mode = props.mode
  return (
    <Container size={size}>
      {itemList.map((el, index) => (
        <ItemBox
          key = {index}
          title = {el.title || el.object_name}
          getItem={props.getItem}
          image={el.image || el.thumbnail}
          productId={el.productId}
          mode = {mode}
          price = {el.lprice}
          itemURL = {getItemURL(el.productId)}

        />
      ))}
    </Container>
  );

  
  
}

export default ItemList;

