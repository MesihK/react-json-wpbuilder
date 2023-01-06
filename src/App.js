import React, { useState } from 'react';
import Page from './Page';

function App() {
  const [data, setData] = useState(null);

  const handleFileSelect = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const json = JSON.parse(event.target.result);
      setData(json);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileSelect} />
      {data && <Page data={data} />}
    </div>
  );
}

export default App;