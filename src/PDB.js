import {React, useMemo} from 'react';
import { Stage, Component } from 'react-ngl';
import { Card, CardContent, Typography, Box } from '@mui/material';



function PDB({path, width='600px', height='400px'}) {
    const reprList = useMemo(() => [
        {type: 'cartoon', params: {colorScheme: "sstruc", smoothSheet: true }}
    ], []);
    const params={ backgroundColor: "white" };
    console.log(path,reprList)
    return (
        <Box sx={{ height: height, width: width }}>
            <Card>
            <CardContent>
                <Stage width={width} height={height} params={params}>
                <Component path={path} reprList={reprList} />
                </Stage>  
            </CardContent>
            </Card>
        </Box>
    );
}
export default PDB;