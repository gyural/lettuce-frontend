import React from "react";
import styled from "styled-components"


const StyleButton = styled.div`
  padding: 8px 16px;
  box-shadow: 3px 3px 3px #636262;
  font-size: ${props => `${1 + props.size}px`};
  border-width: 1px;
  background-color: ${props => props.bgcolor || '#ffffff'};
  color: ${props => props.color || '#000000'};
  border-radius: ${props => `${props.radius}px` || '25px'};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.hoverColor || '#0dbf4b'};
  }
`;
function Button(props){


    const {size, title, bgcolor, color, onClick, radius, hovercolor=''} = props;
    return (
        <StyleButton 
                size = {size}
                bgcolor = {bgcolor}
                color = {color}
                radius = {radius}
                hoverColor = {hovercolor}
                onClick= {onClick}
            >{title || {title}}</StyleButton>
    )
            
}

export default Button;