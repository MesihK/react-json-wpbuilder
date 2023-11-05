import React, { useState, useEffect } from 'react';
import Page from './Page';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dexie from 'dexie';
import AppBar from './AppBar';
import Footer from './Footer';
import docs from './Docs.json';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import pako from 'pako';

const theme = createTheme({
  typography: {
    h1:{
      fontSize: "2rem",
      fontWeight: 500
    },
    h2:{
      fontSize: "1.7rem",
      fontWeight: 500
    },
    h3:{
      fontSize: "1.25rem",
      fontWeight: 500
    }
  },
});

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

  const [data, setData] = useState({content: docs, name:'Docs'});

  useEffect(() => {
    //If a json path given through the url wait for it to be loaded instead of getting data from local db
    if (!jsonPath){
      // Fetch data from the database when the component mounts
      console.log('---READ DB---')
      db.myObjectStore.get(1)
      .then(dbData => {
        if (dbData) {
          try {
            // Decompress the gzipped data
            const decompressedData = pako.inflate(dbData.data, { to: 'string' });
            const jsonData = JSON.parse(decompressedData);
            setData({ content: jsonData, name: dbData.name });
          } catch (error) {
            console.error('Error decompressing data', error);
          }
        }
      })
      .catch(error => console.log('db read error', error));
    }
  }, []);

  if (jsonPath){
    console.log("load json from:",jsonPath);
    let name = jsonPath.split('/').at(-1).split('.')[0];
    fetch(jsonPath)
    .then(response => {
      // Check if the response is gzipped
      if (jsonPath.endsWith('.gz') || jsonPath.endsWith('.gzip')) {
        // If response is gzipped, we need to first convert it to a Blob, then use FileReader to read it as ArrayBuffer
        return response.blob().then(blob => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
              try {
                // Decompress the gzipped data
                const decompressed = pako.inflate(new Uint8Array(e.target.result), { to: 'string' });
                resolve(JSON.parse(decompressed));
              } catch (err) {
                reject(err);
              }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
          });
        });
      } else {
        // If response is not gzipped, we can directly parse it as JSON
        return response.json();
      }
    })
    .then(jsonData => {
      // Here we use pako to gzip compress the JSON data
      const compressedData = pako.gzip(JSON.stringify(jsonData));
  
      //update the database
      db.myObjectStore.put({ id: 1, data: compressedData, name: name }, 1).then(() => {
        setData({ content: jsonData, name: name });
        navigate('/');
        console.log('successfully json from path written to db');
      })
      .catch(error => console.log('db write error', error));
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    // Determine whether the file is gzipped based on the file extension
    const isGzipped = file.name.endsWith('.gz') || file.name.endsWith('.gzip');
  
    reader.onload = (e) => {
      let result = e.target.result;
  
      // If the file is gzipped, decompress it
      if (isGzipped) {
        try {
          const decompressed = pako.inflate(new Uint8Array(result), { to: 'string' });
          result = decompressed;
        } catch (error) {
          console.error('Error decompressing file', error);
          return;
        }
      }
  
      // Convert result to JSON and gzip compress before putting into database
      const jsonData = JSON.parse(result);
      const compressedData = pako.gzip(JSON.stringify(jsonData));
  
      // Update the database
      db.myObjectStore.put({ id: 1, data: compressedData, name: file.name.split('.')[0] })
        .then(() => {
          console.log('file json successfully written to db');
          setData({ content: jsonData, name: file.name.split('.')[0] });
          navigate('/');
        })
        .catch(error => console.log('db write error', error));
    };
  
    // Read the file as an ArrayBuffer if it's gzipped, otherwise as text
    if (isGzipped) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

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
        content = {'h2:notfound':location.pathname+' not found!'};
    });
  }

  let pages = [];
  Object.keys(data.content).forEach(key => {
    const [type, name, xs] = key.split(':');
    if (type === "navpage"){
        pages.push(name);
    }
  })

  const handleDocumentation = () => {
    db.myObjectStore.put({id:1, data: JSON.stringify(docs), name:"Docs"},1).then(() => {
      setData({content:docs, name:"Docs"});
      navigate('/');
      console.log('Load documents');
    })
  }
  console.log(content);
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar pages={pages} name={data.name} handleFileUpload={handleFileSelect} handleDocumentation={handleDocumentation}/>
        {content && <Page data={content} />}
        <Footer />
      </ThemeProvider>
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