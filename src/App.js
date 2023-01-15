import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Routes, Route, useLocation } from "react-router-dom";

function Home(){
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('data')) || {}
  );

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setData(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  }

  const location = useLocation();
  const pathElements = location.pathname.split('/').filter(Boolean);
  let content = data;
  pathElements.forEach(pathElement => {
    if(content.hasOwnProperty('p:'+pathElement))
      content = content['p:'+pathElement];
    else
      content = {'h2':pathElement+' not found!'};
  });
  console.log("Hello",pathElements,content)

  return (
    <>
      {<input type="file" onChange={handleFileSelect} />}
      {content && <Page data={content} />}
    </>
  )
}

function App() {

  return (
    <div className="App">
      <Routes> 
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;