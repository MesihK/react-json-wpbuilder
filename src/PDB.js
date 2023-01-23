import {React, useMemo} from 'react';
import { Stage, Component } from 'react-ngl';
import { Card, CardContent, Box } from '@mui/material';



function PDB({path, height='400px'}) {
    const reprList = useMemo(() => [
        {type: 'cartoon', params: {colorScheme: "sstruc", smoothSheet: true }}
    ], []);
    const params={ backgroundColor: "white" };
    return (
        <Card>
            <CardContent>
                <Stage  height={height} params={params} cameraState={{}} >
                <Component path={path} reprList={reprList} />
                </Stage>  
            </CardContent>
        </Card>
    );
}
export default PDB;