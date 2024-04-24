import { React, useState, useEffect } from 'react'
import PDB from './PDB';
import { pairwise_align, perc_identity, protsub_matrix } from "./bio/align";
import { parse_pdb, ss_align, fetchPDB } from "./bio/pdb";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { v4 } from 'uuid';
import { red } from '@mui/material/colors';
import { NGL } from 'react-ngl';

function AlnPDB({ pdb1, pdb2, alnpdb, helixColor = 'C1166B', betaSheetColor = 'D5AE0D', alnPdb1Color = 'C2E1ED', alnPdb2Color = 'D52213', 
     name1 = "Structure 1", name2 = "Structure 2", lineLen = 75, gapOpen=-5, gapEx=-1, info }) {

    alnPdb1Color = parseInt(alnPdb1Color, 16)
    alnPdb2Color = parseInt(alnPdb2Color, 16)
    let helixColorP = parseInt(helixColor, 16)
    let betaSheetColorP = parseInt(betaSheetColor, 16)
    const Helix = styled('span')({
        //backgroundColor: 'rgb(193,22,107)',
        backgroundColor: '#'+helixColor,
        fontFamily: "'Roboto Mono', monospace"
    });
    const Sheet = styled('span')({
        //backgroundColor: 'rgb(213,174,13)',
        backgroundColor: '#'+betaSheetColor,
        fontFamily: "'Roboto Mono', monospace"
    });
    const Norm = styled('span')({
        fontFamily: "'Roboto Mono', monospace"
    });
    
    const Bold = styled('span')({
        fontFamily: "'Roboto Mono', monospace",
        fontWeight: 700
    });
    
    var strcutureAlignmentColorScheme = NGL.ColormakerRegistry.addScheme(function (params) {
        this.atomColor = function (atom) {
            var ind = atom.chainIndex
            if (ind == 0) {
                return alnPdb1Color
            } else {
                return alnPdb2Color
            }
        };
    });
    let alnRepr={ type: 'cartoon', params: { color: strcutureAlignmentColorScheme, smoothSheet: true } }
    
    var ProteinColorScheme = NGL.ColormakerRegistry.addScheme(function (params) {
        this.atomColor = function (atom) {
            var sstruc = atom.sstruc
    
            if (sstruc === 'h' || sstruc === 'g' || sstruc === 'i') {
                return helixColorP
            } else if (sstruc === 'e' || sstruc === 'b' || sstruc === 't') {
                return betaSheetColorP
            } else {
                return 0x808080
            }
        };
    });
    let protRepr={ type: 'cartoon', params: { color: ProteinColorScheme, smoothSheet: true } }
    
    function printPart(s1, s2, st, end) {
        let cmp = []
        let stInd = st;
        let equal = false;
        for (let i = st; i < end; i++) {
            if (equal && s1[i] !== s2[i]) {
                cmp.push(<Bold key={v4()}>{s1.substring(stInd, i)}</Bold>)
                equal = false;
                stInd = i;
            }
            if (!equal && s1[i] === s2[i]) {
                cmp.push(<Norm key={v4()}>{s1.substring(stInd, i)}</Norm>)
                equal = true;
                stInd = i;
            }
        }
        if (equal) cmp.push(<Bold key={v4()}>{s1.substring(stInd, end)}</Bold>)
        else cmp.push(<Norm key={v4()}>{s1.substring(stInd, end)}</Norm>)
        return cmp;
    }
    function PrintLine(s1, ss1, s2, ind, total, realLen) {
        let cmp = [];
        let startInd = ind;
        for (let i = ind; i < total + ind; i++) {
            if (s1[i] !== '-') realLen.len += 1;
            if (ss1[i + 1] !== ss1[i] || i === total + ind - 1) {
                if (ss1[i] === "H") cmp.push(<Helix key={v4()}>{printPart(s1, s2, startInd, i + 1)}</Helix>);
                else if (ss1[i] === "E") cmp.push(<Sheet key={v4()}>{printPart(s1, s2, startInd, i + 1)}</Sheet>);
                else cmp.push(<Norm key={v4()}>{printPart(s1, s2, startInd, i + 1)}</Norm>);
                startInd = i + 1
            }
        }
        cmp.push(<Norm key={v4()}> {realLen.len}</Norm>);
        return cmp
    }
    /*TODO:
    1. OK Extract sequence and CA coordinates
    2. OK Predict SS
    3. OK Align sequences
    4. OK Format alignment
    5. OK Show PDB + Alignment
    6. OK Fetch PDB's */
    let [textPDB1, setTextPDB1] = useState("");
    let [textPDB2, setTextPDB2] = useState("");
    let [textAlnPDB, setTextAlnPDB] = useState("");
    let [err1, setErr1] = useState("");
    let [err2, setErr2] = useState("");
    let [errA, setErrA] = useState("");

    useEffect(() => {
        fetchPDB(pdb1,setTextPDB1,setErr1);
        fetchPDB(pdb2,setTextPDB2,setErr2);
        fetchPDB(alnpdb,setTextAlnPDB,setErrA);
    }, []);

    if (err1 !== "" || err2 !== "") {
        console.log("err",err1,err2,errA);
        return <Typography backgroundColor={red[300]}>PDB Fetch Error! message: {err1} {err2} {errA}.</Typography>
    }
    if (textPDB1 === "" || textPDB2 === "" || !textPDB1 || !textPDB2) return <Typography>Fetching PDB's</Typography>;

    let start = performance.now();
    let [seq1, ss1] = parse_pdb(textPDB1);
    let [seq2, ss2] = parse_pdb(textPDB2);
    let [seq1aln, seq2aln] = pairwise_align(seq1, seq2, protsub_matrix, gapOpen, gapEx, false, true)
    let ss1aln = ss_align(seq1aln, ss1);
    let ss2aln = ss_align(seq2aln, ss2);
    let lblLen = Math.max(name1.length, name2.length);
    let totaLen = seq1aln.length;
    let end = performance.now();
    console.log(`Parse & align time: ${end - start} ms`);
    let percId = perc_identity([seq1aln,seq2aln]);
    console.log('Idenity:',percId);
    info = `Globally aligned using PROSTSUB matrix with a gap opening penalty: ${gapOpen}, gap extension penalty: ${gapEx}. The sequence idenity is: ${percId.toFixed(2)}%. \n${info}`;
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

    start = performance.now();
    let cmp = []
    let realLen1 = { len: 0 };
    let realLen2 = { len: 0 };
    let totalLine = Math.round(totaLen / lineLen + 0.5);
    for (let printLine = 0; printLine < totalLine; printLine++) {
        let c1 = <Box variant="div" key={v4()}>
            <Norm key={v4()}>{name1.padStart(lblLen) + " "}</Norm>
            {PrintLine(seq1aln, ss1aln, seq2aln, printLine * lineLen, lineLen, realLen1)}
        </Box>
        let c2 = <Box variant="div" key={v4()}>
            <Norm key={v4()}>{name2.padStart(lblLen) + " "}</Norm>
            {PrintLine(seq2aln, ss2aln, seq1aln, printLine * lineLen, lineLen, realLen2)}
        </Box>
        cmp.push(c1);
        cmp.push(c2);
        if (printLine < totalLine-1) cmp.push(<Box variant="div" key={v4()}> </Box>)
    }
    end = performance.now();
    console.log(`React alignment component creation time: ${end - start} ms`);
    return <>
        <Grid container spacing={1} key={v4()}>
            <Grid item xs={4} key={v4()}><PDB pdb={textPDB1} name={name1} repr={protRepr} key={v4()} /></Grid>
            <Grid item xs={4} key={v4()}><PDB pdb={textPDB2} name={name2} repr={protRepr} key={v4()} /></Grid>
            <Grid item xs={4} key={v4()}><PDB pdb={textAlnPDB} name={"Aligned Structures"} repr={alnRepr} key={v4()} /></Grid>
            {info && <Grid item key={v4()}><Typography key={v4()}>{info}</Typography></Grid>}
        </Grid>
        <Grid container spacing={1} alignItems="center" justifyContent="center" key={v4()}>
            <Grid item key={v4()}><pre style={{ fontFamily: "'Roboto Mono', monospace" }}>{cmp}</pre></Grid>
        </Grid>
    </>;
}
export default AlnPDB;