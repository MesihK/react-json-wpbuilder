import React from 'react';
import DataTable from 'react-data-table-component';

//const jsonData = '{ "columns":["l:column1","column2"], "rows":[["link1",1],["link2",2]]}';

function BasicDataTable({columns, rows}){
    const cols = columns.map(col => {
        if(col.startsWith("l:")){
            return {
                name: col.slice(2),
                button: true,
                sortable: true,
                cell: row => (
                    <a href={row[col]} target="_blank" rel="noopener noreferrer">
                        {row[col]}
                    </a>
                ),
                sortFunction: (a, b) => {
                    if(a[col] < b[col]) return -1;
                    if(a[col] > b[col]) return 1;
                    return 0;
                }
            }
        }
        else{
            return {
                name: col,
                selector: row => row[col],
                sortable: true,
            }
        }
    });

    const tableData = rows.map((row, index) => {
        let obj = {id: index+1}
        columns.map((col,i)=> obj[col] = row[i])
        return obj;
    });

    return (
        <DataTable columns={cols} data={tableData} pagination persistTableHead dense />
    )
}


export default BasicDataTable;