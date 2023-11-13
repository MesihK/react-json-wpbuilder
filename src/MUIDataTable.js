import * as React from 'react';
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { RenderLink } from './RenderLink';
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
    const [paginationModel, setPaginationModel] = React.useState({
      pageSize: 10,
      page: 0,
    });

    const tableData = rows.map((row, index) => {
        let obj = {id: index+1}
        columns.map((col,i)=> obj[col] = row[i])
        return obj;
    });

    // Calculate flex value for columns
    const getColumnLength = (cell, isLink) => {
      if (!cell) return 0;
      cell = cell.toString();
      if (isLink) {
        const atIndex = cell.indexOf('@');
        return atIndex !== -1 ? cell.length - atIndex - 1 : 0;
      }
      return cell.length;
    };
  
    // Calculate maximum length for each column
    const maxColumnLengths = columns.map((column, colIndex) => 
      Math.max(...rows.map(row => {
        const isLinkColumn = column.startsWith('l:');
        return getColumnLength(row[colIndex], isLinkColumn);
      }))
    );
  
    // Calculate total maximum length
    const totalMaxLength = maxColumnLengths.reduce((acc, length) => acc + length, 0);

    const colLengths = maxColumnLengths.map(column => parseFloat(column/totalMaxLength));
    //console.log(maxColumnLengths,totalMaxLength,colLengths)

    const cols = columns.map((column, index) => {
        if(column.startsWith("l:")){
            return { 
                headerName: column.substring(2), 
                field: column, 
                flex: colLengths[index],
                minWidth: 80,
                renderCell: RenderLink
            }
        }
        else{
            return { 
                headerName: column, 
                field: column, 
                flex: colLengths[index],
                headerClassName: 'b',
                minWidth: 80
            }
        }
    });


    return (
        <StripedDataGrid rows={tableData} columns={cols}    
        density="compact" 
        autoHeight={true}    
        pageSizeOptions={[10,50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
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
                typography: 'caption', 
                fontWeight: 'bold',
                whiteSpace: "normal",
                lineHeight: "normal"
            },
            '.MuiDataGrid-cellContent': {
              typography: 'caption',    
            },
            ".MuiDataGrid-columnHeader": {
              // Forced to use important since overriding inline styles
              height: "unset !important"
            },
            ".MuiDataGrid-columnHeaders": {
              // Forced to use important since overriding inline styles
              maxHeight: "168px !important"
            }
        }}/>
    );
}


export default MUIDataTable;