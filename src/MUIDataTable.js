import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { renderLink } from './renderLink';
import { styled } from '@mui/material/styles';

//const jsonData = '{ "columns":["l:column1","column2"], "rows":[["link1",1],["link2",2]]}';
const Link = styled('a')({
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: 'inherit',
  });
function MUIDataTable({columns, rows}){

    const cols = columns.map(column => {
        if(column.startsWith("l:")){
            return { 
                headerName: column.startsWith('l:') ? column.substring(2) : column, 
                field: column, 
                width: 150,
                renderCell: renderLink
            }
        }
        else{
            return { 
                headerName: column.startsWith('l:') ? column.substring(2) : column, 
                field: column, 
                width: 150
            }
        }
    });

    const tableData = rows.map((row, index) => {
        let obj = {id: index+1}
        columns.map((col,i)=> obj[col] = row[i])
        return obj;
    });
    console.log('table',cols,tableData)
    return (
        <Box sx={{ height: 200, width: '80%' }}>
          <DataGrid rows={tableData} columns={cols} />
        </Box>
    );
}


export default MUIDataTable;