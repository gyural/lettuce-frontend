import React from "react";
import styled from "styled-components"


const StyleButton = styled.div`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    
    cursor: pointer;

`

function Button(props){


    const {size, title, bgcolor, color, onClick, radius} = props;
    return (
        <StyleButton 
                style ={{
                    fontSize : '{1+size}px',
                    backgroundColor : bgcolor,
                    color: color,
                    borderRadius: radius,
                }}
                onClick= {onClick}
            >{title || {title}}</StyleButton>
    )
            
}

export default Button;