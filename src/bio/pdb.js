/*
# Assigns secondary structure information based on a simple and very fast
# algorithm published by Zhang and Skolnick in their TM-align paper.
# 
# This code converted from original TM-align source using ChatGPT, and modified to work.
# Reference:
#
# TM-align: a protein structure alignment algorithm based on the Tm-score
# (2005) NAR, 33(7) 2302-2309*/

import pako from 'pako';


function dist(x, y) {
    const d1 = x[0] - y[0];
    const d2 = x[1] - y[1];
    const d3 = x[2] - y[2];

    return d1 * d1 + d2 * d2 + d3 * d3;
}

function sec_str(dis13, dis14, dis15, dis24, dis25, dis35) {
    let s = "C";

    let delta = 2.1;
    if (
        Math.abs(dis15 - 6.37) < delta &&
        Math.abs(dis14 - 5.18) < delta &&
        Math.abs(dis25 - 5.18) < delta &&
        Math.abs(dis13 - 5.45) < delta &&
        Math.abs(dis24 - 5.45) < delta &&
        Math.abs(dis35 - 5.45) < delta
    ) {
        s = "H"; // helix
        return s;
    }

    delta = 1.42;
    if (
        Math.abs(dis15 - 13) < delta &&
        Math.abs(dis14 - 10.4) < delta &&
        Math.abs(dis25 - 10.4) < delta &&
        Math.abs(dis13 - 6.1) < delta &&
        Math.abs(dis24 - 6.1) < delta &&
        Math.abs(dis35 - 6.1) < delta
    ) {
        s = "E"; // strand
        return s;
    }

    if (dis15 < 8) {
        s = "T"; // turn
    }
    return s;
}

function make_sec(x) {
    const l = x.length;
    let sec = Array(l).fill(0);
    for (let i = 0; i < l; i++) {
        sec[i] = "C";
        let j1 = i - 2;
        let j2 = i - 1;
        let j3 = i;
        let j4 = i + 1;
        let j5 = i + 2;

        if (j1 >= 0 && j5 < l) {
            const d13 = Math.sqrt(dist(x[j1], x[j3]));
            const d14 = Math.sqrt(dist(x[j1], x[j4]));
            const d15 = Math.sqrt(dist(x[j1], x[j5]));
            const d24 = Math.sqrt(dist(x[j2], x[j4]));
            const d25 = Math.sqrt(dist(x[j2], x[j5]));
            const d35 = Math.sqrt(dist(x[j3], x[j5]));
            sec[i] = sec_str(d13, d14, d15, d24, d25, d35);
        }
    }
    return sec;
}

let regex = /^ATOM\s{2,6}\d{1,5}\s{2}CA\s{1,2}([A-Z]{3})\s([\s\w])\s{1,6}\d{1,5}\s{1,8}(-?\d*\.\d+|\d+)\s{0,6}(-?\d*\.\d+|\d+)\s{0,6}(-?\d*\.\d+|\d+)/;
let aa3to1 = {
    'ALA': 'A', 'VAL': 'V', 'PHE': 'F', 'PRO': 'P', 'MET': 'M',
    'ILE': 'I', 'LEU': 'L', 'ASP': 'D', 'GLU': 'E', 'LYS': 'K',
    'ARG': 'R', 'SER': 'S', 'THR': 'T', 'TYR': 'Y', 'HIS': 'H',
    'CYS': 'C', 'ASN': 'N', 'GLN': 'Q', 'TRP': 'W', 'GLY': 'G',
    'MSE': 'M',
}

//if a secondary structure is shorter then the threshold, then remove it.
function clean_ss(ss,thr=3){
    let cleaned = "";
    let i=0;
    while (i<ss.length){
        if (ss[i] === 'H' || ss[i] === 'E') {
            let j = i;
            while (ss[j] === ss[i]) {
                j++;
            }
            let ssLength = j - i;
            if (ssLength < thr)
                cleaned += "G".repeat(ssLength);
            else
                cleaned += ss[i].repeat(ssLength);
            i = j;
        } else {
            cleaned += ss[i++];
        }
    }
    return cleaned;
}

//align secondary structure to aligned sequence. If a gap exists inside a secondary structure, then assing that ss to the gap.
export function ss_align(aligned, ss) {
    ss = clean_ss(ss,3);
    let aligned_ss = '';
    let i = 0, i2 = 0;
    while (i < aligned.length) {
        if (aligned[i] === '-') {
            let j = i;
            while (aligned[j] === '-') {
                j++;
            }
            let gapLength = j - i;
            if (i > 0 && j < aligned.length && ss[i2 - 1] === ss[i2]) {
                aligned_ss += ss[i2].repeat(gapLength);
            } else aligned_ss += "G".repeat(gapLength);
            i = j;
        } else {
            aligned_ss += ss[i2];
            i2 += 1;
            i += 1;
        }
    }
    return aligned_ss;
}

export function parse_pdb(pdb, chain = 'A') {
    let seq = [];
    let coord = [];
    for (let line of pdb.split('\n')) {
        if (regex.test(line)) {
            let re = regex.exec(line);
            let residueName = re[1];
            let chainId = re[2];
            let x = re[3];
            let y = re[4];
            let z = re[5];
            if (chainId === chain) {
                seq.push(aa3to1[residueName]);
                coord.push([x, y, z]);
            }
        }
    }
    return [seq.join(""), make_sec(coord).join("")];
}

export function fetchPDB(url, setText, setErr) {
    if (url.startsWith("http")) {
        fetch(url).then(response => {
            if (!response.ok) {
                setErr("Fetch error!");
                throw new Error("Fetch error!");
            } 
            // Check if the URL ends with .gz to determine how to process the response
            if (url.endsWith(".gz")){
                return response.arrayBuffer(); // For compressed content
            } else {
                return response.text(); // For regular text content
            }
        }).then(response => {
            if (url.endsWith(".gz")){
                const uncompressed = pako.inflate(new Uint8Array(response), { to: 'string' });
                setText(uncompressed);
            } else {
                setText(response); // This is for non-compressed content
            }
            setErr("");
        }).catch(error => setErr(error.message + ", link:" + url));
    } else {
        setText(url);
    }
}
