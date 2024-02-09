import React from 'react';
import Plotly from "plotly.js-cartesian-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { TitleSharp } from '@mui/icons-material';

const Plot = createPlotlyComponent(Plotly);

export default function PlotlyChart({data, height, xtitle="", ytitle="", title=""}) {
    return <Plot data={data}
    useResizeHandler
    style={{ width: '100%', height: '100%' }}
    layout={{
      autosize: true,
      height: height,
      "margin":{"l":85,"r":0,"t":30,"b":85},
      "title": { "text": title },
      "xaxis": { "title": xtitle },
      "yaxis": { "title": ytitle}
    }}/>
}