import {React, useState, useEffect, useContext} from "react";
import styled from 'styled-components';
import ItemBox from "./ItemBox";
import { ModeContext } from "../pages/ItemSelect1";
import ChoiceButton from "../ui/ChoiceButton";

const Container = styled.div`
    width: 918px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0px 0px;
    column-gap: 10px;
    row-gap: 10px;
`;
function ItemList(props) {
  const itemList = props.items;
  console.log('List에서의 전달확인!!')
  console.log(itemList)
  const mode = props.mode
  return (
    <Container>
      {itemList.map((el, index) => (
        <ItemBox
          key = {index}
          getItem={props.getItem}
          title={el.title}
          url={el.link}
          src={el.image}
          mode = {mode}
        />
      ))}
    </Container>
  );

  
  
}

export default ItemList;

