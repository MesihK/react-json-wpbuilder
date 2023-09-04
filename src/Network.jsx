import { React, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import CytoscapeComponent from 'react-cytoscapejs';


Cytoscape.use(COSEBilkent);
const cytoscapeLayout = { name: 'cose-bilkent' };
//const cytoscapeLayout = { name: 'random' };
let originalZoom;
let originalPan;

function Network(prop){
    let myCy = null;
    let height = '400px';
    if (prop.height != null) height = prop.height; 
    let style = { width: '100%', height: height };
    console.log(style);
    return (
        <div>
            <CytoscapeComponent zoom={1} minZoom={0.5} maxZoom={2} {...prop} style={style} layout={cytoscapeLayout} cy={(cy) => { myCy = cy }} />
            <Box textAlign='center'>
                <Button variant="outlined" sx={{ mb: 1 }} onClick={() => {
                    if (myCy != null) {
                        myCy.center();
                    }
                }}>Center Network</Button>
                <Button variant="outlined" sx={{ mb: 1, ml:2 }} onClick={() => {
                    if (myCy != null) {
                        myCy.pan(0);
                        myCy.fit();
                    }
                }}>Fit Network</Button>
            </Box>
        </div>

    );
}
export default Network;