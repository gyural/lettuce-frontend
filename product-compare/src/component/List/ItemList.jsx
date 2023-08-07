import React from "react";
import styled from 'styled-components';
import itemListVirtual from '../../virtual/itemListVirtual.json'
import ItemBox from "./ItemBox";


const itemList = itemListVirtual 

const Container = styled.div`
    width: 1080px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 80px;
    
`
function ItemList() {
    return (
        <Container>
          {itemList.map((el) => {
            console.log(el.productName);
            return (
              <ItemBox
                title={el.productName}
                key={el.id} // key를 추가하여 각 아이템에 고유한 식별자 제공
              />
            );
          })}
        </Container>
      );
      
      
      
      
      
      
}

export default ItemList;
