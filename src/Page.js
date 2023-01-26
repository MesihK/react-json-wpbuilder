import React from 'react';
import ReactSequenceViewer from 'react-sequence-viewer';
import BasicDataTable from './BasicDataTable';
import MUIDataTable from './MUIDataTable';
import PDB from './PDB';
import MD from './MD';
import { Grid, Container, CardMedia } from '@mui/material';
import { v4 } from 'uuid';
import PlotlyChart from './PlotlyChart';
import UL from './UL';


  const Page = ({ data }) => {
    return (
      //<Grid container align="center" justify="center" direction="column">
      <Container>
      <Grid container spacing={2}>
        {Object.keys(data).map((key) => {
          const [type, name, xs=12] = key.split(':');
          const value = data[key];
          if (type === 'page' || type === 'navpage') //it's a page don't render it.
            return
          if (type === 'section') //but if it's a container page then render it
            return <Grid item  xs={xs}  key={'g:'+key}><Page data={value} key={key}/></Grid>
          else if (type === 'seq')
            return <Grid item xs={xs} key={'g:'+key}><ReactSequenceViewer sequence={value}  key={key} id={v4()} /></Grid>
          else if (type === 'table')
            return <Grid item xs={xs} key={'g:'+key}><MUIDataTable {...value} key={key}/></Grid>
          else if (type === 'pdb')
            return <Grid item  xs={xs}  key={'g:'+key}><PDB {...value} key={key}/></Grid>
          else if (type === 'md')
            return <Grid item  xs={xs}  key={'g:'+key}><MD markdown={value}  key={key} /></Grid>
          else if (type === 'plot')
            return <Grid item  xs={xs}  key={'g:'+key}><PlotlyChart {...value} key={key}/></Grid>
          else if (type === 'img')
            return <Grid item  xs={xs}  key={'g:'+key}><CardMedia component="img" image={value.src} height={value.height} sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }} key={key}/></Grid>
          else if (type === 'ul')
            return <Grid item  xs={xs}  key={'g:'+key}><UL items={value} key={key}/></Grid>
          else
            return <Grid item  xs={xs}  key={'g:'+key}>{React.createElement(type, { key: key }, value)}</Grid>
        })}
      </Grid>
      </Container>
    );
  };

export default Page;