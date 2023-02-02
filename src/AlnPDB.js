import React from 'react'
import PDB from './PDB';
import { pairwise_align, perc_identity, protsub_matrix } from "./bio/align";
import { parse_pdb, ss_align } from "./bio/pdb";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { v4 } from 'uuid';

const Helix = styled('span')({
    backgroundColor: 'rgb(193,22,107)',
    fontFamily: "'Roboto Mono', monospace"
});
const Sheet = styled('span')({
    backgroundColor: 'rgb(213,174,13)',
    fontFamily: "'Roboto Mono', monospace"
});
const Norm = styled('span')({
    fontFamily: "'Roboto Mono', monospace"
});

const Bold = styled('span')({
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: 700
});
function printPart(s1,s2,st,end){
    let cmp = []
    let stInd = st;
    let equal = false;
    for (let i =st;i<end;i++){
        if( equal && s1[i] !== s2[i]){
            cmp.push(<Bold key={v4()}>{s1.substring(stInd,i)}</Bold>)
            equal = false;
            stInd = i;
        } 
        if (!equal && s1[i] === s2[i]){
            cmp.push(<Norm key={v4()}>{s1.substring(stInd,i)}</Norm>)
            equal = true;
            stInd = i;
        }
    }
    if (equal) cmp.push(<Bold key={v4()}>{s1.substring(stInd,end)}</Bold>)
    else cmp.push(<Norm key={v4()}>{s1.substring(stInd,end)}</Norm>)
    return cmp;
}
function PrintLine(s1,ss1,s2,ind,total,realLen){
    let cmp = [];
    let startInd = ind;
    for(let i =ind;i<total+ind;i++){
        if(s1[i] !== '-') realLen.len += 1;
        if (ss1[i+1] != ss1[i] || i === total+ind-1){
            if (ss1[i] === "H") cmp.push(<Helix key={v4()}>{printPart(s1,s2,startInd,i+1)}</Helix>);
            else if (ss1[i] === "E") cmp.push(<Sheet key={v4()}>{printPart(s1,s2,startInd,i+1)}</Sheet>);
            else cmp.push(<Norm key={v4()}>{printPart(s1,s2,startInd,i+1)}</Norm>);
            startInd = i+1
        }
    }
    cmp.push(<Norm key={v4()}> {realLen.len}</Norm>);
    return cmp
}

function AlnPDB({ pdb1, pdb2, alnpdb, name1="PDB1", name2="PDB2", lineLen=75, info }) {
    /*TODO:
    1. OK Extract sequence and CA coordinates
    2. OK Predict SS
    3. OK Align sequences
    4. OK Format alignment
    5. Show PDB + Alignment
    6. Fetch PDB's */
    let [seq1, ss1] = parse_pdb(pdb1);
    let [seq2, ss2] = parse_pdb(pdb2);
    let [seq1aln, seq2aln] = pairwise_align(seq1, seq2, protsub_matrix, -5, -1, false, true)
    let ss1aln = ss_align(seq1aln, ss1);
    let ss2aln = ss_align(seq2aln, ss2);
    let lblLen = Math.max(name1.length,name2.length);
    let totaLen = seq1aln.length;
    /*
    console.log(seq1, ss1);
    console.log(seq2, ss2);
    console.log(seq1aln);
    console.log(ss1aln);
    console.log(seq2aln);
    console.log(ss2aln);
    console.log(perc_identity([seq1aln, seq2aln]));
    console.log(totaLen,Math.round(totaLen/lineLen+0.5),lblLen);
    */

    let cmp = []
    let realLen1 ={ len: 0 };
    let realLen2 ={ len: 0 };
    for(let printLine = 0; printLine < Math.round(totaLen/lineLen+0.5); printLine++){
        let c1 = <Box variant="div" key={v4()}>
            <Norm key={v4()}>{name1.padStart(lblLen)+" "}</Norm>
            {PrintLine(seq1aln,ss1aln,seq2aln,printLine*lineLen,lineLen,realLen1)}
        </Box>
        let c2 = <Box variant="div" key={v4()}>
            <Norm key={v4()}>{name2.padStart(lblLen)+" "}</Norm>
            {PrintLine(seq2aln,ss2aln,seq1aln,printLine*lineLen,lineLen,realLen2)}
        </Box>
        cmp.push(c1);
        cmp.push(c2);
        cmp.push(<Box variant="div" key={v4()}> </Box>)
    }
    return <Container key={v4()}>
        <Grid container spacing={1} key={v4()}>
            <Grid item xs={4} key={v4()}><PDB pdb={alnpdb} name={"Aligned Structures"}repr={{ type: 'cartoon'}} key={v4()}/></Grid>
            <Grid item xs={4} key={v4()}><PDB pdb={pdb1} name={name1} key={v4()}/></Grid>
            <Grid item xs={4} key={v4()}><PDB pdb={pdb2} name={name2} key={v4()}/></Grid>
            <Grid item xs={4} key={v4()}><Typography key={v4()}>Test</Typography></Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center" justifyContent="center" key={v4()}>
            <Grid item key={v4()}><pre style={{ fontFamily: "'Roboto Mono', monospace" }}>{cmp}</pre></Grid>
        </Grid>
    </Container>;
}
export default AlnPDB;