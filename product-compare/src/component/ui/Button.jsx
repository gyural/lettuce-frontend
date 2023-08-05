import React from "react";
import styled from "styled-components"


const StyleButton = styled.div`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    width: fit-content;
    cursor: pointer;

`

function Button(props){


    const {title, bgcolor, color, onClick} = props;

    return <StyleButton 
                style ={{
                    backgroundColor : bgcolor,
                    color: color
                }}
                onClick= {onClick}
            >{title || {title}}</StyleButton>
}

export default Button;