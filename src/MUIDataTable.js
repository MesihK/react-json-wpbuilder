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

function MUIDataTable({columns, rows, pageSize=10}){
    const [paginationModel, setPaginationModel] = React.useState({
      pageSize: pageSize,
      page: 0,
    });

    const tableData = rows.map((row, index) => {
        let obj = {id: index+1}
        columns.map((col,i)=> obj[col] = row[i])
        return obj;
    });

    const [colLengths, setColLengths] = React.useState([]);

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

    React.useEffect(() => {
        const averageColumnLengths = columns.map((column, colIndex) => {
            const sumLengths = rows.reduce((acc, row) => {
                const isLinkColumn = column.startsWith('l:');
                return acc + getColumnLength(row[colIndex], isLinkColumn);
            }, 0);
            return sumLengths / rows.length;
        });

        const totalAverageLength = averageColumnLengths.reduce((acc, length) => acc + length, 0);
        const calculatedColLengths = averageColumnLengths.map(column => parseFloat(column / totalAverageLength));

        setColLengths(calculatedColLengths);
        console.log(averageColumnLengths, totalAverageLength, calculatedColLengths);
    }, [columns, rows]);

    let scientificCMP = (v1, v2) => {
      if (v1 == 'NA' || v1 == '') v1 = Number.POSITIVE_INFINITY;
      if (v2 == 'NA' || v2 == '') v2 = Number.POSITIVE_INFINITY;
      const num1 = parseFloat(v1);
      const num2 = parseFloat(v2);
      return num1 - num2;
    }
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
        else if(column.startsWith("s:")){
            return {
                headerName: column.substring(2),
                field: column,
                flex: colLengths[index],
                headerClassName: 'b',
                minWidth: 80,
                sortComparator: scientificCMP
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
        disableRowSelectionOnClick
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