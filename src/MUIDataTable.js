import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
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

function MUIDataTable({columns, rows}){

    const cols = columns.map(column => {
        if(column.startsWith("l:")){
            return { 
                headerName: column.substring(2), 
                field: column, 
                flex: 1,
                minWidth: 80,
                renderCell: renderLink
            }
        }
        else{
            return { 
                headerName: column, 
                field: column, 
                flex: 1,
                headerClassName: 'b',
                minWidth: 80
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
        <Box sx={{ width: '80%' }}>
          <StripedDataGrid rows={tableData} columns={cols}    
            density="compact" 
            autoHeight={true}    
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