import { React, useMemo, useState } from 'react';
import { Stage, Component } from 'react-ngl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const debounce = (func, delay) => {
    let debounceHandler;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceHandler);
        debounceHandler = setTimeout(() => func.apply(context, args), delay);
    };
};

function PDB({ path, height = '400px', name }) {

    const reprList = useMemo(() => [
        { type: 'cartoon', params: { colorScheme: "sstruc", smoothSheet: true } }
    ], []);
    const params = { backgroundColor: "white" };

    let [cameraState, setCameraState] = useState();

    const handleCameraMove = debounce(nextCameraState => {
        setCameraState(nextCameraState);
    }, 300);

    return (
        <Paper sx={{ mb: 2 }} elevation={1}>
            <Box textAlign='center'>
                {name && <Typography variant='subtitle1'>{name}</Typography>}
                <Stage height={height} params={params} cameraState={cameraState} onCameraMove={handleCameraMove} >
                    <Component path={path} reprList={reprList} onLoad={() => {
                        if (cameraState == null) setTimeout(() => setCameraState({}), 200);
                    }} />
                </Stage>
                <Button variant="outlined" onClick={() => {
                    setCameraState({});
                }}>Reset Camera</Button>
            </Box>
        </Paper>
    );
}
export default PDB;