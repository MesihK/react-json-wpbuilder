import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { renderLink } from './renderLink';
import { alpha, styled } from '@mui/material/styles';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

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
                headerName: column.substring(2), 
                field: column, 
                width: 150,
                headerClassName: 'b',
                renderCell: renderLink
            }
        }
        else{
            return { 
                headerName: column, 
                field: column, 
                headerClassName: 'b',
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
        <Box sx={{ height: 600, width: '80%' }}>
          <StripedDataGrid rows={tableData} columns={cols}    
            density="compact"     
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
            },
            }}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sx={{
                '.MuiDataGrid-columnHeaderTitle': {
                    typography: 'subtitle1',    
                },
            }}/>
        </Box>
    );
}


export default MUIDataTable;