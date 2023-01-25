import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useNavigate } from "react-router-dom";


const Link = styled('a')({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  'text-decoration': 'underline',
  //color: 'inherit',
});

export function RenderLink(params) {
  
  const navigate = useNavigate(); 

  if (params.value == null) {
    return '';
  }
  const [href, value] = params.value.split('@')

  const handleClick = (event) => {
    navigate(href)
  };

  return (
    <Link onClick={handleClick}>
      {value}
    </Link>
  );
}