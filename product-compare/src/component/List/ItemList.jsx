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
    padding: 10px 0px;
`;
function ItemList(props) {
  const itemList = props.itemList;
  const mode = props.mode
  return (
    <Container>
      {itemList.map((el) => (
        <ItemBox
          key = {el.id}
          getItem={props.getItem}
          title={el.productName}
          url={el.url}
          src={el.image}
          mode = {mode}
        />
      ))}
    </Container>
  );

  
  
}

export default ItemList;

