import { React, useMemo, useState, useEffect } from 'react';
import { Stage, Component } from 'react-ngl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { fetchPDB } from "./bio/pdb";

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
    let [textPDB, setTextPDB] = useState("");
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

    if (pdb !== null && pdb.startsWith("rcsb")) {
        pdb = pdb.split("://")[1]
        pdb = "https://files.rcsb.org/download/" + pdb + ".pdb.gz";
    }
    useEffect(() => {
        fetchPDB(pdb,setTextPDB,setErr);
    }, []);

    if (err !== "" || pdb === "" || pdb == null) return <Typography backgroundColor={red[300]}>PDB Fetch Error! message: {err}, link: {pdb}</Typography>

    let pdbFile = new Blob([textPDB], { type: 'text/plain' });

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