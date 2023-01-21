import {React, useMemo} from 'react';
import { Stage, Component } from 'react-ngl';


function PDB({path, width='600px', height='400px'}) {
    const reprList = useMemo(() => [
        {type: 'cartoon', params: {colorScheme: "sstruc", smoothSheet: true }}
    ], []);
    const params={ backgroundColor: "white" };
    console.log(path,reprList)
    return (
        <Stage width={width} height={height} params={params}>
            <Component path={path} reprList={reprList} />
        </Stage>
    );
}
export default PDB;