import React from 'react';
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function PlotlyChart({data, height}) {
    return <Plot data={data}
    useResizeHandler
    style={{ width: '100%', height: '100%' }}
    layout={{
      autosize: true,
      height: height
    }}/>
}