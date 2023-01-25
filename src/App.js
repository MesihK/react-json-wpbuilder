import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dexie from 'dexie';
import AppBar from './AppBar';
import Footer from './Footer';

const db = new Dexie('myDatabase');

db.version(1).stores({
  myObjectStore: 'id, data, name'
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Home(){
  const navigate = useNavigate();
  let query = useQuery();
  let jsonPath = query.get("json")

  const [data, setData] = useState({content: {}, name:'JSON-WP'});

  useEffect(() => {
    //If a json path given through the url wait for it to be loaded instead of getting data from local db
    if (!jsonPath){
      // Fetch data from the database when the component mounts
      db.myObjectStore.get(1)
      .then(dbData => {
          if (dbData) {
              setData({content:JSON.parse(dbData.data), name:dbData.name});
          }
      }).catch(error => console.log('db read error', error));
    }
  }, []);

  if (jsonPath){
    console.log("load json from:",jsonPath);
    let name = jsonPath.split('/').at(-1).split('.')[0];
    fetch(jsonPath).then(response => response.json()).then(jsonData => {
      //update the database
      db.myObjectStore.put({id:1, data: JSON.stringify(jsonData), name:name},1).then(() => {
        setData({content:jsonData, name:name});
        navigate('/');
        console.log('sucsefully json from path written to db');
      })
        .catch(error => console.log('db write error', error));;

    }).catch(error => {
      console.error(error);
    });
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      //update the database
      db.myObjectStore.put({id:1, data: e.target.result, name:file.name.split('.')[0]}).then(() => console.log('sucsefully file written to db'))
        .catch(error => console.log('db write error', error));
      setData({content:JSON.parse(e.target.result), name:file.name.split('.')[0]});
      navigate('/');
    };
    reader.readAsText(file);
  }

  const location = useLocation();
  const pathElements = location.pathname.split('/').filter(Boolean);
  let content = data.content;
  if (Object.keys(data.content).length === 0){
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
  Object.keys(data.content).forEach(key => {
    const [type, name, xs=12] = key.split(':');
    if (type == "navpage"){
        pages.push(name);
    }
  })

  return (
    <>
      <AppBar pages={pages} name={data.name} handleFileUpload={handleFileSelect}/>
      {content && <Page data={content} />}
      <Footer />
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