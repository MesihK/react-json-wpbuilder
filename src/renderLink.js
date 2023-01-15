import * as React from 'react';
import { styled } from '@mui/material/styles';


const Link = styled('a')({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  color: 'inherit',
});

export const DemoLink = React.memo(function DemoLink(props) {
  const handleClick = (event) => {
    //event.preventDefault();
    //event.stopPropagation();
  };
  console.log('props',props)
  return (
    <Link tabIndex={props.tabIndex} onClick={handleClick} href={props.href}>
      {props.children}
    </Link>
  );
});

export function renderLink(params) {
  if (params.value == null) {
    return '';
  }

  return (
    <DemoLink href={params.value} tabIndex={params.tabIndex}>
      {params.value}
    </DemoLink>
  );
}