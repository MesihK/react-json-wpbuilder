import React from 'react';
import ReactSequenceViewer from 'react-sequence-viewer';
import BasicDataTable from './BasicDataTable';
import MUIDataTable from './MUIDataTable';

  const Page = ({ data }) => {
    return (
      <div>
        {Object.keys(data).map((key, index) => {
          const value = data[key];
          if (key.startsWith('p:')) //it's a page don't render it.
            return
          else if (key === 'Seq')
            return <ReactSequenceViewer sequence={value}  key={index} />
          else if (key === 'Table'){
            return <MUIDataTable {...value} key={index}/>
          }
          else
            return React.createElement(key, { key: index }, value)
        })}
      </div>
    );
  };

export default Page;