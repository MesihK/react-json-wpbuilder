import React from 'react';
import ReactSequenceViewer from 'react-sequence-viewer';
import BasicDataTable from './BasicDataTable';
import MUIDataTable from './MUIDataTable';
import PDB from './PDB';
import MD from './MD';
import { Grid } from '@mui/material';


  const Page = ({ data }) => {
    return (
      <Grid container align="center" justify="center" direction="column">
        {Object.keys(data).map((key, index) => {
          const [type, name] = key.split(':');
          const value = data[key];
          console.log(key,type,name,value)
          if (type === 'page') //it's a page don't render it.
            return
          else if (type === 'seq')
            return <ReactSequenceViewer sequence={value}  key={key} />
          else if (type === 'table'){
            return <Grid item key={'g:'+key}><MUIDataTable {...value} key={key}/></Grid>
          }
          else if (type === 'pdb')
            return <Grid item key={'g:'+key}><PDB {...value} key={key}/></Grid>
          else if (type === 'md')
            return <MD markdown={value}  key={key} />
          else
            return React.createElement(type, { key: key }, value)
        })}
      </Grid>
    );
  };

export default Page;