import React from 'react';
import ReactSequenceViewer from 'react-sequence-viewer';
import DataTable from 'react-data-table-component';

  const Page = ({ data }) => {
    return (
      <div>
        {Object.keys(data).map((key, index) => {
          const value = data[key];
          if (key === 'Page')
            return <Page data={value} key={index} />
          else if (key === 'Seq')
            return <ReactSequenceViewer sequence={value}  key={index} />
          else if (key === 'Table'){
            var columns = []
            for (var c of value['Columns']){
                var f = c["selector"].split(' => ')
                columns.push({
                    name: c["name"],
                    selector: new Function(f[0], 'return ' + f[1]),
                    sortable: true
                })
            }
            console.log(value['Columns'])
            console.log(columns)
            return <DataTable columns={columns} data={value['Data']} key={index} pagination />
          }
          else
            return React.createElement(key, { key: index }, value)
        })}
      </div>
    );
  };

export default Page;