import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Home(){
  const navigate = useNavigate()
  let query = useQuery();
  let jsonPath = query.get("json")
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('data')) || {}
  );

  
  if (jsonPath){
    console.log("load json from:",jsonPath);
    fetch(jsonPath).then(response => response.json()).then(jsonData => {
      console.log(jsonData);
      setData(jsonData);
      navigate('/');
    }).catch(error => {
      console.error(error);
    });
  }

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