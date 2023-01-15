import React from 'react';
import ReactSequenceViewer from 'react-sequence-viewer';
import BasicDataTable from './BasicDataTable';

  const Page = ({ data }) => {
    return (
      <div>
        {Object.keys(data).map((key, index) => {
          const value = data[key];
          if (key === 'Page')
            return
          else if (key === 'Seq')
            return <ReactSequenceViewer sequence={value}  key={index} />
          else if (key === 'Table'){
            return <BasicDataTable {...value} key={index}/>
          }
          else
            return React.createElement(key, { key: index }, value)
        })}
      </div>
    );
  };

export default Page;