import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dexie from 'dexie';
import AppBar from './AppBar';

const db = new Dexie('myDatabase');

db.version(1).stores({
  myObjectStore: 'id, data'
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Home(){
  const navigate = useNavigate();
  let query = useQuery();
  let jsonPath = query.get("json")

  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch data from the database when the component mounts
    db.myObjectStore.get(1)
    .then(dbData => {
        if (dbData) {
            setData(JSON.parse(dbData.data));
        }
    }).catch(error => console.log('db read error', error));
  }, []);

  if (jsonPath){
    console.log("load json from:",jsonPath);
    fetch(jsonPath).then(response => response.json()).then(jsonData => {
      //update the database
      db.myObjectStore.put({id:1, data: JSON.stringify(jsonData)},1).then(() => console.log('sucsefully data written to db'))
        .catch(error => console.log('db write error', error));;
      setData(jsonData);
      navigate('/');
    }).catch(error => {
      console.error(error);
    });
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      //update the database
      db.myObjectStore.put({id:1, data: e.target.result}).then(() => console.log('sucsefully data written to db'))
        .catch(error => console.log('db write error', error));
      setData(JSON.parse(e.target.result));
      navigate('/');
    };
    reader.readAsText(file);
  }

  const location = useLocation();
  const pathElements = location.pathname.split('/').filter(Boolean);
  let content = data;
  if (Object.keys(data).length === 0){
    content = {'h2:info':'Waiting for the data...'};
  } else {
    pathElements.forEach(pathElement => {
      if(content.hasOwnProperty('page:'+pathElement))
        content = content['page:'+pathElement];
      else if(content.hasOwnProperty('navpage:'+pathElement))
        content = content['navpage:'+pathElement];
      else
        content = {'h2:notfound':pathElement+' not found!'};
    });
  }

  let pages = [];
  Object.keys(data).forEach(key => {
    const [type, name, xs=12] = key.split(':');
    if (type == "navpage"){
        pages.push(name);
    }
  })

  return (
    <>
      <AppBar pages={pages} handleFileUpload={handleFileSelect}/>
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