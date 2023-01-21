import React from 'react';
import ReactSequenceViewer from 'react-sequence-viewer';
import BasicDataTable from './BasicDataTable';
import MUIDataTable from './MUIDataTable';
import PDB from './PDB';
import { Grid } from '@mui/material';


  const Page = ({ data }) => {
    return (
      <Grid container align="center" justify="center" direction="column">
        {Object.keys(data).map((key, index) => {
          const value = data[key];
          console.log(key,value)
          if (key.startsWith('p:')) //it's a page don't render it.
            return
          else if (key === 'Seq')
            return <ReactSequenceViewer sequence={value}  key={2*index} />
          else if (key === 'Table'){
            return <Grid item key={2*index}><MUIDataTable {...value} key={2*index+1}/></Grid>
          }
          else if (key === 'PDB')
            return <Grid item key={2*index}><PDB {...value} key={2*index+1}/></Grid>
          else
            return React.createElement(key, { key: 2*index }, value)
        })}
      </Grid>
    );
  };

export default Page;