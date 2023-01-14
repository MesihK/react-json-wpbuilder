import React, { useState } from 'react';
import Page from './Page';
import { Routes, Route } from "react-router-dom";

function Whoops404() { 
  return ( <div> <h1>Resource not found</h1> </div>);
}

function Home(){
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
    <>
      <input type="file" onChange={handleFileSelect} />
      {data && <Page data={data} />}
    </>
  )
}

function App() {

  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;