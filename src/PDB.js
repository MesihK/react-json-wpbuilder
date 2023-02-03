import { React, useMemo, useState } from 'react';
import { Stage, Component } from 'react-ngl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const debounce = (func, delay) => {
    let debounceHandler;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceHandler);
        debounceHandler = setTimeout(() => func.apply(context, args), delay);
    };
};

function PDB({ pdb, name,
    repr = { type: 'cartoon', params: { colorScheme: "sstruc", smoothSheet: true } },
    height = '400px' }) {

    const reprList = useMemo(() => [
        repr
    ], []);
    const params = { backgroundColor: "white" };

    let [cameraState, setCameraState] = useState();
    let [textPDB, setTextPDB] = useState([pdb,""]);
    let [err, setErr] = useState("");

    const handleCameraMove = debounce(nextCameraState => {
        setCameraState(nextCameraState);
    }, 300);

    let loadFileParams = {
        name: '',
        status: '',
        visible: true,
        ext: "pdb"
    };

    if (pdb.startsWith("rcsb")) {
        pdb = pdb.split("://")[1]
        pdb = "https://files.rcsb.org/download/" + pdb + ".pdb";
    }
    
    if (pdb.startsWith("http")) {
        if (textPDB[1] === "" || textPDB[0] !== pdb)
            fetch(pdb).then(response => {
                if (!response.ok) throw new Error("Fetch error!", { cause: response });
                else return response.text()
            }).then(response => {
                setTextPDB([pdb,response]);
                setErr("");
            }).catch(error => setErr(error.message));
    } else {
        textPDB[1] = pdb;
    }

    let pdbFile = new Blob([textPDB[1]], { type: 'text/plain' });

    if (err !== "") return <Typography backgroundColor={red[300]}>PDB Fetch Error! message: {err}, link: {pdb}</Typography>
    return (
        <Paper elevation={1}>
            <Box textAlign='center'>
                {name && <Typography variant='subtitle1'>{name}</Typography>}
                <Stage height={height} params={params} cameraState={cameraState} onCameraMove={handleCameraMove} >
                    <Component path={pdbFile} reprList={reprList} loadFileParams={loadFileParams} onLoad={() => {
                        if (cameraState == null) setTimeout(() => setCameraState({}), 200);
                    }} />
                </Stage>
                <Button variant="outlined" sx={{ mb: 1 }} onClick={() => {
                    setCameraState({});
                }}>Reset Camera</Button>
            </Box>
        </Paper>
    );
}
export default PDB;