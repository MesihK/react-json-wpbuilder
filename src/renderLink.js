import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useNavigate } from "react-router-dom";


const Link = styled('a')({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textDecoration: 'underline',
  typography: 'caption', 
  fontSize: '12px',
  color: 'rgb(25, 118, 210)',
  //color: 'inherit',
});

export function RenderLink(params) {
  
  const navigate = useNavigate(); 

  if (params.value == null) {
    return '';
  }
  const [href, value] = params.value.split('@')

  const handleClick = (event) => {
    if(href.startsWith("http")) window.open(href, '_blank', 'noreferrer');
    else{
      if (event.ctrlKey){
        window.open(window.location.origin + href, '_blank', 'noreferrer');
      }
      else navigate(href)
    }
  };

  return (
    <Link onClick={handleClick}>
      {value}
    </Link>
  );
}