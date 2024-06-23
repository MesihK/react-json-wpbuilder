import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactSequenceViewer from 'react-sequence-viewer';
import MUIDataTable from './MUIDataTable';
import PDB from './PDB';
import MD from './MD';
import { Grid, Container, CardMedia, Typography, Paper, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { v4 } from 'uuid';
import PlotlyChart from './PlotlyChart';
import UL from './UL';
import AlnPDB from './AlnPDB';
import {AlignmentChart, AlignmentViewer} from 'react-alignment-viewer';
import Network from './Network';

const supportedHTMLTags = ['h1','h2','h3','p'];

const TableOfContents = ({ items, onClose }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Table of Contents</Typography>
        <Button onClick={onClose}><CloseIcon /></Button>
      </Box>
      <List>
        {items.map((item, index) => (
          <ListItem button key={index} component="a" href={`#${item.id}`}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const Page = ({ data }) => {
  const location = useLocation();

  const [tocItems, setTocItems] = useState([]);
  const [showTOC, setShowTOC] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const items = Object.keys(data)
      .filter(key => key.startsWith('h1:') || key.startsWith('h2:') || key.startsWith('h3:'))
      .map(key => {
        const [type, name] = key.split(':');
        return { id: `${type}-${name}`, text: data[key] };
      });
    setShowTOC(items.length != 0);
    setTocItems(items);
  }, [data]);

  const toggleTOC = () => {
    setShowTOC(!showTOC);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'sticky', top: 20, zIndex: 1 }}>
            {showTOC ? (
              <Paper elevation={3} sx={{ p: 2 }}>
                <TableOfContents items={tocItems} onClose={toggleTOC} />
              </Paper>
            ) : (
              <Button 
                variant="contained" 
                onClick={toggleTOC} 
                startIcon={<MenuIcon />}
                sx={{ mb: 2 }}
              >
                Show Table of Contents
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={showTOC ? 9 : 12}>
          <Grid container spacing={1}>
            {Object.keys(data).map((key) => {
              const [type, name, xs=12] = key.split(':');
              const value = data[key];
              if (type === 'page' || type === 'navpage' || type === 'title') 
                return null;
              if (key === 'showTOC') {
                if(!showTOC) setShowTOC(true);
                return null;
              }
              if (type === 'section')
                return <Grid item xs={xs} key={'g:'+key}><Paper sx={{ height: "100%", mb:2}} elevation={3}><Page data={value} key={key}/></Paper></Grid>
              else if (type === 'seq')
                return <Grid item xs={xs} key={'g:'+key}><ReactSequenceViewer sequence={value} key={key} search={true} charsPerLine={50} toolbar={true} title={''} id={v4()} /></Grid>
              else if (type === 'table')
                return <Grid item xs={xs} key={'g:'+key}><MUIDataTable {...value} key={key}/></Grid>
              else if (type === 'pdb')
                return <Grid item xs={xs} key={'g:'+key}><PDB {...value} key={key}/></Grid>
              else if (type === 'alnpdb')
                return <Grid item xs={xs} key={'g:'+key}><AlnPDB {...value} key={key}/></Grid>
              else if (type === 'msa')
                return <Grid item xs={xs} key={'g:'+key}><AlignmentViewer {...value} height={null} tileHeight={10} tileWidth={10} key={key}/></Grid>
              else if (type === 'msa2')
                return <Grid item xs={xs} key={'g:'+key}><AlignmentChart {...value} height={null} tileHeight={10} tileWidth={10} key={key}/></Grid>
              else if (type === 'md')
                return <Grid item xs={xs} key={'g:'+key}><MD markdown={value} key={key} /></Grid>
              else if (type === 'plot')
                return <Grid item xs={xs} key={'g:'+key}><PlotlyChart {...value} key={key}/></Grid>
              else if (type === 'img')
                return <Grid item xs={xs} key={'g:'+key}><CardMedia component="img" image={value.src} height={value.height} sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }} key={key}/></Grid>
              else if (type === 'ul')
                return <Grid item xs={xs} key={'g:'+key}><UL items={value} key={key}/></Grid>
              else if (type == 'cytoscape')
                return <Grid item xs={xs} key={'g:'+key}><Network {...value} key={key}/></Grid>
              else if (supportedHTMLTags.includes(type))
                return <Grid item xs={xs} key={'g:'+key}><Typography variant={type} id={`${type}-${name}`} key={key}>{value}</Typography></Grid>
              else {
                console.log(type,'is not supported!'); return null;
              }
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;