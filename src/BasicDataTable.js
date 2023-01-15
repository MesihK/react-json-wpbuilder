import React from 'react';
import DataTable from 'react-data-table-component';

//const jsonData = '{ "columns":["column1","column2"], "rows":[[0,1],[0,2]]}';

function BasicDataTable({columns, rows}){

    const cols = columns.map(col => ({
        name: col,
        selector: row => row[col],
        sortable: true,
    }));

    const tableData = rows.map((row, index) => {
        let obj = {id: index+1}
        columns.map((col,i)=> obj[col] = row[i])
        return obj;
    });

    return (
        <DataTable columns={cols} data={tableData} pagination persistTableHead />
    )
}


export default BasicDataTable;