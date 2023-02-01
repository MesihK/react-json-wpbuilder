/*
This code converted from https://github.com/biopython/biopython/blob/7b112cf105675eeedf117fa0c8ca29c52cd26d09/Bio/pairwise2.py
with the help of ChatGPT.
* No multiple alignement support
* No support for 2 different gap penalization for seqA and seqB
* No support for penalize_extend_when_opening
*/

export const protsub_matrix = { "A:A": 4.0, "A:R": -2.0, "A:N": -2.0, "A:D": -2.0, "A:C": 1.0, "A:Q": -1.0, "A:E": 0.0, "A:G": 0.0, "A:H": -1.0, "A:I": -1.0, "A:L": -1.0, "A:K": -1.0, "A:M": -1.0, "A:F": -1.0, "A:P": -1.0, "A:S": 1.0, "A:T": 0.0, "A:W": -3.0, "A:Y": -3.0, "A:V": 0.0, "A:B": -2.0, "A:Z": -1.0, "A:X": 0.0, "A:*": -4.0, "R:A": -2.0, "R:R": 6.0, "R:N": 0.0, "R:D": -2.0, "R:C": -4.0, "R:Q": 1.0, "R:E": 0.0, "R:G": -2.0, "R:H": 1.0, "R:I": -3.0, "R:L": -2.0, "R:K": 2.0, "R:M": -1.0, "R:F": -2.0, "R:P": -2.0, "R:S": 0.0, "R:T": -1.0, "R:W": -2.0, "R:Y": -2.0, "R:V": -2.0, "R:B": -1.0, "R:Z": 0.0, "R:X": -1.0, "R:*": -4.0, "N:A": -2.0, "N:R": 0.0, "N:N": 7.0, "N:D": 1.0, "N:C": -3.0, "N:Q": 2.0, "N:E": -1.0, "N:G": 0.0, "N:H": 1.0, "N:I": -3.0, "N:L": -4.0, "N:K": 0.0, "N:M": -2.0, "N:F": -3.0, "N:P": -2.0, "N:S": 1.0, "N:T": 0.0, "N:W": -4.0, "N:Y": -2.0, "N:V": -3.0, "N:B": 3.0, "N:Z": 0.0, "N:X": -1.0, "N:*": -4.0, "D:A": -2.0, "D:R": -2.0, "D:N": 1.0, "D:D": 9.0, "D:C": -3.0, "D:Q": 0.0, "D:E": 3.0, "D:G": -1.0, "D:H": 1.0, "D:I": -3.0, "D:L": -4.0, "D:K": -1.0, "D:M": -3.0, "D:F": -3.0, "D:P": -1.0, "D:S": 1.0, "D:T": -2.0, "D:W": -4.0, "D:Y": -3.0, "D:V": -3.0, "D:B": 4.0, "D:Z": 1.0, "D:X": -1.0, "D:*": -4.0, "C:A": 1.0, "C:R": -4.0, "C:N": -3.0, "C:D": -3.0, "C:C": 14.0, "C:Q": -2.0, "C:E": -3.0, "C:G": -3.0, "C:H": -3.0, "C:I": -2.0, "C:L": -1.0, "C:K": -3.0, "C:M": -1.0, "C:F": -2.0, "C:P": -3.0, "C:S": -1.0, "C:T": -1.0, "C:W": -1.0, "C:Y": -2.0, "C:V": -1.0, "C:B": -3.0, "C:Z": -3.0, "C:X": -2.0, "C:*": -4.0, "Q:A": -1.0, "Q:R": 1.0, "Q:N": 2.0, "Q:D": 0.0, "Q:C": -2.0, "Q:Q": 4.0, "Q:E": 1.0, "Q:G": -2.0, "Q:H": 0.0, "Q:I": -3.0, "Q:L": -2.0, "Q:K": 1.0, "Q:M": 0.0, "Q:F": -3.0, "Q:P": -1.0, "Q:S": 0.0, "Q:T": -1.0, "Q:W": -2.0, "Q:Y": 0.0, "Q:V": -2.0, "Q:B": 0.0, "Q:Z": 3.0, "Q:X": -1.0, "Q:*": -4.0, "E:A": 0.0, "E:R": 0.0, "E:N": -1.0, "E:D": 3.0, "E:C": -3.0, "E:Q": 1.0, "E:E": 4.0, "E:G": -3.0, "E:H": 0.0, "E:I": -4.0, "E:L": -3.0, "E:K": 0.0, "E:M": -2.0, "E:F": -4.0, "E:P": -1.0, "E:S": -1.0, "E:T": -4.0, "E:W": -3.0, "E:Y": -2.0, "E:V": -2.0, "E:B": 1.0, "E:Z": 4.0, "E:X": -1.0, "E:*": -4.0, "G:A": 0.0, "G:R": -2.0, "G:N": 0.0, "G:D": -1.0, "G:C": -3.0, "G:Q": -2.0, "G:E": -3.0, "G:G": 9.0, "G:H": -3.0, "G:I": -4.0, "G:L": -4.0, "G:K": -2.0, "G:M": -3.0, "G:F": -4.0, "G:P": -2.0, "G:S": 0.0, "G:T": -2.0, "G:W": -2.0, "G:Y": -3.0, "G:V": -3.0, "G:B": -1.0, "G:Z": -2.0, "G:X": -1.0, "G:*": -4.0, "H:A": -1.0, "H:R": 1.0, "H:N": 1.0, "H:D": 1.0, "H:C": -3.0, "H:Q": 0.0, "H:E": 0.0, "H:G": -3.0, "H:H": 9.0, "H:I": -3.0, "H:L": -3.0, "H:K": -1.0, "H:M": -2.0, "H:F": -1.0, "H:P": -2.0, "H:S": -1.0, "H:T": -2.0, "H:W": -2.0, "H:Y": 2.0, "H:V": -3.0, "H:B": 0.0, "H:Z": 0.0, "H:X": -1.0, "H:*": -4.0, "I:A": -1.0, "I:R": -3.0, "I:N": -3.0, "I:D": -3.0, "I:C": -2.0, "I:Q": -3.0, "I:E": -4.0, "I:G": -4.0, "I:H": -3.0, "I:I": 4.0, "I:L": 3.0, "I:K": -4.0, "I:M": 1.0, "I:F": 0.0, "I:P": -3.0, "I:S": -2.0, "I:T": -1.0, "I:W": -3.0, "I:Y": -1.0, "I:V": 3.0, "I:B": -3.0, "I:Z": -3.0, "I:X": -1.0, "I:*": -4.0, "L:A": -1.0, "L:R": -2.0, "L:N": -4.0, "L:D": -4.0, "L:C": -1.0, "L:Q": -2.0, "L:E": -3.0, "L:G": -4.0, "L:H": -3.0, "L:I": 3.0, "L:L": 6.0, "L:K": -3.0, "L:M": 2.0, "L:F": 0.0, "L:P": -3.0, "L:S": -3.0, "L:T": -1.0, "L:W": -2.0, "L:Y": -1.0, "L:V": 3.0, "L:B": -4.0, "L:Z": -3.0, "L:X": -1.0, "L:*": -4.0, "K:A": -1.0, "K:R": 2.0, "K:N": 0.0, "K:D": -1.0, "K:C": -3.0, "K:Q": 1.0, "K:E": 0.0, "K:G": -2.0, "K:H": -1.0, "K:I": -4.0, "K:L": -3.0, "K:K": 6.0, "K:M": -2.0, "K:F": -3.0, "K:P": -1.0, "K:S": 0.0, "K:T": -1.0, "K:W": -3.0, "K:Y": -2.0, "K:V": -2.0, "K:B": 0.0, "K:Z": 1.0, "K:X": -1.0, "K:*": -4.0, "M:A": -1.0, "M:R": -1.0, "M:N": -2.0, "M:D": -3.0, "M:C": -1.0, "M:Q": 0.0, "M:E": -2.0, "M:G": -3.0, "M:H": -2.0, "M:I": 1.0, "M:L": 2.0, "M:K": -2.0, "M:M": 8.0, "M:F": 1.0, "M:P": -3.0, "M:S": -1.0, "M:T": -1.0, "M:W": -3.0, "M:Y": 0.0, "M:V": 1.0, "M:B": -3.0, "M:Z": -1.0, "M:X": -1.0, "M:*": -4.0, "F:A": -1.0, "F:R": -2.0, "F:N": -3.0, "F:D": -3.0, "F:C": -2.0, "F:Q": -3.0, "F:E": -4.0, "F:G": -4.0, "F:H": -1.0, "F:I": 0.0, "F:L": 0.0, "F:K": -3.0, "F:M": 1.0, "F:F": 6.0, "F:P": -4.0, "F:S": -2.0, "F:T": -2.0, "F:W": 1.0, "F:Y": 3.0, "F:V": 0.0, "F:B": -3.0, "F:Z": -3.0, "F:X": -1.0, "F:*": -4.0, "P:A": -1.0, "P:R": -2.0, "P:N": -2.0, "P:D": -1.0, "P:C": -3.0, "P:Q": -1.0, "P:E": -1.0, "P:G": -2.0, "P:H": -2.0, "P:I": -3.0, "P:L": -3.0, "P:K": -1.0, "P:M": -3.0, "P:F": -4.0, "P:P": 8.0, "P:S": -1.0, "P:T": -1.0, "P:W": -4.0, "P:Y": -3.0, "P:V": -3.0, "P:B": -2.0, "P:Z": -1.0, "P:X": -2.0, "P:*": -4.0, "S:A": 1.0, "S:R": 0.0, "S:N": 1.0, "S:D": 1.0, "S:C": -1.0, "S:Q": 0.0, "S:E": -1.0, "S:G": 0.0, "S:H": -1.0, "S:I": -2.0, "S:L": -3.0, "S:K": 0.0, "S:M": -1.0, "S:F": -2.0, "S:P": -1.0, "S:S": 4.0, "S:T": 2.0, "S:W": -3.0, "S:Y": -1.0, "S:V": -2.0, "S:B": 0.0, "S:Z": 0.0, "S:X": 0.0, "S:*": -4.0, "T:A": 0.0, "T:R": -1.0, "T:N": 0.0, "T:D": -2.0, "T:C": -1.0, "T:Q": -1.0, "T:E": -4.0, "T:G": -2.0, "T:H": -2.0, "T:I": -1.0, "T:L": -1.0, "T:K": -1.0, "T:M": -1.0, "T:F": -2.0, "T:P": -1.0, "T:S": 2.0, "T:T": 7.0, "T:W": -2.0, "T:Y": -2.0, "T:V": 0.0, "T:B": -1.0, "T:Z": -1.0, "T:X": 0.0, "T:*": -4.0, "W:A": -3.0, "W:R": -2.0, "W:N": -4.0, "W:D": -4.0, "W:C": -1.0, "W:Q": -2.0, "W:E": -3.0, "W:G": -2.0, "W:H": -2.0, "W:I": -3.0, "W:L": -2.0, "W:K": -3.0, "W:M": -3.0, "W:F": 1.0, "W:P": -4.0, "W:S": -3.0, "W:T": -2.0, "W:W": 13.0, "W:Y": 3.0, "W:V": -3.0, "W:B": -4.0, "W:Z": -3.0, "W:X": -2.0, "W:*": -4.0, "Y:A": -3.0, "Y:R": -2.0, "Y:N": -2.0, "Y:D": -3.0, "Y:C": -2.0, "Y:Q": 0.0, "Y:E": -2.0, "Y:G": -3.0, "Y:H": 2.0, "Y:I": -1.0, "Y:L": -1.0, "Y:K": -2.0, "Y:M": 0.0, "Y:F": 3.0, "Y:P": -3.0, "Y:S": -1.0, "Y:T": -2.0, "Y:W": 3.0, "Y:Y": 8.0, "Y:V": -1.0, "Y:B": -3.0, "Y:Z": -2.0, "Y:X": -1.0, "Y:*": -4.0, "V:A": 0.0, "V:R": -2.0, "V:N": -3.0, "V:D": -3.0, "V:C": -1.0, "V:Q": -2.0, "V:E": -2.0, "V:G": -3.0, "V:H": -3.0, "V:I": 3.0, "V:L": 3.0, "V:K": -2.0, "V:M": 1.0, "V:F": 0.0, "V:P": -3.0, "V:S": -2.0, "V:T": 0.0, "V:W": -3.0, "V:Y": -1.0, "V:V": 4.0, "V:B": -3.0, "V:Z": -2.0, "V:X": -1.0, "V:*": -4.0, "B:A": -2.0, "B:R": -1.0, "B:N": 3.0, "B:D": 4.0, "B:C": -3.0, "B:Q": 0.0, "B:E": 1.0, "B:G": -1.0, "B:H": 0.0, "B:I": -3.0, "B:L": -4.0, "B:K": 0.0, "B:M": -3.0, "B:F": -3.0, "B:P": -2.0, "B:S": 0.0, "B:T": -1.0, "B:W": -4.0, "B:Y": -3.0, "B:V": -3.0, "B:B": 4.0, "B:Z": 1.0, "B:X": -1.0, "B:*": -4.0, "Z:A": -1.0, "Z:R": 0.0, "Z:N": 0.0, "Z:D": 1.0, "Z:C": -3.0, "Z:Q": 3.0, "Z:E": 4.0, "Z:G": -2.0, "Z:H": 0.0, "Z:I": -3.0, "Z:L": -3.0, "Z:K": 1.0, "Z:M": -1.0, "Z:F": -3.0, "Z:P": -1.0, "Z:S": 0.0, "Z:T": -1.0, "Z:W": -3.0, "Z:Y": -2.0, "Z:V": -2.0, "Z:B": 1.0, "Z:Z": 4.0, "Z:X": -1.0, "Z:*": -4.0, "X:A": 0.0, "X:R": -1.0, "X:N": -1.0, "X:D": -1.0, "X:C": -2.0, "X:Q": -1.0, "X:E": -1.0, "X:G": -1.0, "X:H": -1.0, "X:I": -1.0, "X:L": -1.0, "X:K": -1.0, "X:M": -1.0, "X:F": -1.0, "X:P": -2.0, "X:S": 0.0, "X:T": 0.0, "X:W": -2.0, "X:Y": -1.0, "X:V": -1.0, "X:B": -1.0, "X:Z": -1.0, "X:X": -1.0, "X:*": -4.0, "*:A": -4.0, "*:R": -4.0, "*:N": -4.0, "*:D": -4.0, "*:C": -4.0, "*:Q": -4.0, "*:E": -4.0, "*:G": -4.0, "*:H": -4.0, "*:I": -4.0, "*:L": -4.0, "*:K": -4.0, "*:M": -4.0, "*:F": -4.0, "*:P": -4.0, "*:S": -4.0, "*:T": -4.0, "*:W": -4.0, "*:Y": -4.0, "*:V": -4.0, "*:B": -4.0, "*:Z": -4.0, "*:X": -4.0, "*:*": 1.0 };
export const pairwise_align = (sequenceA, sequenceB, match_dict, open_pen, extend, penalize_end_gaps, align_globally) => {
    const gap_char = "-";
    const matrices = _make_score_matrix_fast(sequenceA, sequenceB, match_dict, open_pen, extend, penalize_end_gaps, align_globally);
    const score_matrix = matrices[0];
    const trace_matrix = matrices[1];
    const best_score = matrices[2];
    const starts = _find_start(score_matrix, best_score, align_globally);
    const alignments = _recover_alignments(sequenceA, sequenceB, starts, best_score, score_matrix, trace_matrix, align_globally, gap_char, open_pen, extend);
    return alignments[0];
};

const calc_affine_penalty = (length, open, extend) => {
    if (length <= 0) {
        return 0.0;
    }
    let penalty = open + extend * (length - 1);
    return penalty;
};

function _make_score_matrix_fast(sequenceA, sequenceB, match_dict, open_pen, extend, penalize_end_gaps, align_globally) {
    const first_gap = calc_affine_penalty(1, open_pen, extend);
    let local_max_score = 0;
    const lenA = sequenceA.length, lenB = sequenceB.length;
    const score_matrix = [], trace_matrix = [];
    for (let i = 0; i <= lenA; i++) {
        score_matrix[i] = Array(lenB + 1).fill(null);
        trace_matrix[i] = Array(lenB + 1).fill(null);
    }
    for (let i = 0; i <= lenA; i++) {
        score_matrix[i][0] = penalize_end_gaps ? calc_affine_penalty(i, open_pen, extend) : 0;
    }
    for (let i = 0; i <= lenB; i++) {
        score_matrix[0][i] = penalize_end_gaps ? calc_affine_penalty(i, open_pen, extend) : 0;
    }
    const col_score = [0, calc_affine_penalty(1, 2 * open_pen, extend)];
    for (let i = 2; i <= lenB; i++) {
        col_score[i] = calc_affine_penalty(i, 2 * open_pen, extend);
    }
    let best_score = 0;
    for (let row = 1; row <= lenA; row++) {
        let row_score = calc_affine_penalty(row, 2 * open_pen, extend);
        for (let col = 1; col <= lenB; col++) {
            const nogap_score = score_matrix[row - 1][col - 1] + match_dict[sequenceA[row - 1] + ':' + sequenceB[col - 1]];
            let row_open, row_extend;
            if (!penalize_end_gaps && row === lenA) {
                row_open = score_matrix[row][col - 1];
                row_extend = row_score;
            } else {
                row_open = score_matrix[row][col - 1] + first_gap;
                row_extend = row_score + extend;
            }
            row_score = Math.max(row_open, row_extend);
            let col_open, col_extend;
            if (!penalize_end_gaps && col === lenB) {
                col_open = score_matrix[row - 1][col];
                col_extend = col_score[col];
            } else {
                col_open = score_matrix[row - 1][col] + first_gap;
                col_extend = col_score[col] + extend;
            }
            col_score[col] = Math.max(col_open, col_extend);
            best_score = Math.max(nogap_score, col_score[col], row_score);
            local_max_score = Math.max(local_max_score, best_score);
            if (!align_globally && best_score < 0) {
                score_matrix[row][col] = 0;
            } else {
                score_matrix[row][col] = best_score;
            }

            let rowScoreRint = Math.round(row_score);
            let colScoreRint = Math.round(col_score[col]);
            let rowTraceScore = 0;
            let colTraceScore = 0;
            if (Math.round(row_open) === rowScoreRint)
                rowTraceScore += 1;
            if (Math.round(row_extend) === rowScoreRint)
                rowTraceScore += 8;
            if (Math.round(col_open) === colScoreRint)
                colTraceScore += 4;
            if (Math.round(col_extend) === colScoreRint)
                colTraceScore += 16;


            let traceScore = 0;
            let bestScoreRint = Math.round(best_score);
            if (Math.round(nogap_score) === bestScoreRint)
                traceScore += 2;
            if (rowScoreRint === bestScoreRint)
                traceScore += rowTraceScore;
            if (colScoreRint === bestScoreRint)
                traceScore += colTraceScore;

            trace_matrix[row][col] = traceScore;
        }
    }
    if (!align_globally) best_score = local_max_score;
    return [score_matrix, trace_matrix, best_score];
};

const _recover_alignments = (sequenceA, sequenceB, starts, best_score, score_matrix, trace_matrix, align_globally, gap_char, open_pen, extend) => {
    let lenA = sequenceA.length;
    let lenB = sequenceB.length;
    let ali_seqA = sequenceA.slice(0, 0);
    let ali_seqB = sequenceB.slice(0, 0);
    let tracebacks = [];
    let in_process = [];
    let begin = 0, end = 0, score = 0, row = 0, col = 0, trace = 0;
    for (let start of starts) {
        [score, [row, col]] = start;
        begin = 0;
        if (align_globally) {
            end = null;
        } else {
            if (starts.includes([score, [row - 1, col - 1]])) continue;
            if (score <= 0) continue;
            trace = trace_matrix[row][col];
            if ((trace - trace % 2) % 4 === 2) {
                trace_matrix[row][col] = 2;
            } else {
                continue;
            }
            end = -Math.max(lenA - row, lenB - col);
            if (!end) end = null;
            let col_distance = lenB - col;
            let row_distance = lenA - row;
            ali_seqA = gap_char.repeat(col_distance - row_distance) + sequenceA.slice(lenA - 1, row - 1).split("").reverse().join("");
            ali_seqB = gap_char.repeat(row_distance - col_distance) + sequenceB.slice(lenB - 1, col - 1).split("").reverse().join("");
        }
        in_process.push([ali_seqA, ali_seqB, end, row, col, false, trace_matrix[row][col]]);
    }
    while (in_process.length) {
        let dead_end = false;
        let [ali_seqA, ali_seqB, end, row, col, col_gap, trace] = in_process.pop();
        while ((row > 0 || col > 0) && !dead_end) {
            let cache = [ali_seqA, ali_seqB, end, row, col, col_gap];
            if (!trace) {
                if (col && col_gap) dead_end = true;
                else {
                    [ali_seqA, ali_seqB] = _finish_backtrace(sequenceA, sequenceB, ali_seqA, ali_seqB, row, col, gap_char);
                }
                break;
            } else if (trace % 2 === 1) {
                trace -= 1;
                if (col_gap) {
                    dead_end = true;
                } else {
                    col -= 1;
                    ali_seqA += gap_char;
                    ali_seqB += sequenceB.substring(col, col + 1);
                    col_gap = false;
                }
            } else if (trace % 4 === 2) {
                trace -= 2;
                row -= 1;
                col -= 1;
                ali_seqA += sequenceA.substring(row, row + 1);
                ali_seqB += sequenceB.substring(col, col + 1);
                col_gap = false;
            } else if (trace % 8 === 4) {
                trace -= 4;
                row--;
                ali_seqA += sequenceA.substring(row, row + 1);
                ali_seqB += gap_char;
                col_gap = true;
            } else if (trace === 8 || trace === 24) {
                trace -= 8;
                if (col_gap) {
                    dead_end = true;
                } else {
                    col_gap = false;
                    const x = _find_gap_open(sequenceA, sequenceB, ali_seqA, ali_seqB, end, row, col, col_gap, gap_char, score_matrix, trace_matrix, in_process, open_pen, extend, col, row, "col", best_score, align_globally);
                    [ali_seqA, ali_seqB, row, col, in_process, dead_end] = x;
                }
            } else if (trace === 16) {
                trace -= 16;
                col_gap = true;
                const x = _find_gap_open(sequenceA, sequenceB, ali_seqA, ali_seqB, end, row, col, col_gap, gap_char, score_matrix, trace_matrix, in_process, open_pen, extend, row, col, "row", best_score, align_globally);
                [ali_seqA, ali_seqB, row, col, in_process, dead_end] = x;
            }
            if (trace) {
                cache.push(trace);
                in_process.push(cache);
            }
            trace = trace_matrix[row][col];
            if (!align_globally) {
                if (score_matrix[row][col] === best_score) {
                    dead_end = true;
                } else if (score_matrix[row][col] <= 0) {
                    begin = Math.max(row, col);
                    trace = 0;
                }
            }
        }

        if (!dead_end) {
            tracebacks.push([ali_seqA.split("").reverse().join(""), ali_seqB.split("").reverse().join(""), score, begin, end]);
            break;
        }
    }
    return tracebacks;
}

const _find_start = (score_matrix, best_score, align_globally) => {
    const nrows = score_matrix.length;
    const ncols = score_matrix[0].length;
    let starts;
    if (align_globally) {
        starts = [[best_score, [nrows - 1, ncols - 1]]];
    } else {
        starts = [];
        const tolerance = 0;
        for (let row = 0; row < nrows; row++) {
            for (let col = 0; col < ncols; col++) {
                const score = score_matrix[row][col];
                if (Math.round(Math.abs(score - best_score)) <= Math.round(tolerance)) {
                    starts.push([score, [row, col]]);
                }
            }
        }
    }
    return starts;
};
const _finish_backtrace = (sequenceA, sequenceB, ali_seqA, ali_seqB, row, col, gap_char) => {
    if (row) {
        ali_seqA += sequenceA.substring(0,row).split("").reverse().join("");
    }
    if (col) {
        ali_seqB += sequenceB.substring(0,col).split("").reverse().join("");
    }
    if (row > col) {
        ali_seqB += gap_char.repeat(ali_seqA.length - ali_seqB.length);
    } else if (col > row) {
        ali_seqA += gap_char.repeat(ali_seqB.length - ali_seqA.length);
    }
    return [ali_seqA, ali_seqB];
};
const _find_gap_open = (
    sequenceA,
    sequenceB,
    ali_seqA,
    ali_seqB,
    end,
    row,
    col,
    col_gap,
    gap_char,
    score_matrix,
    trace_matrix,
    in_process,
    open_pen,
    extend,
    target,
    index,
    direction,
    best_score,
    align_globally
) => {
    let dead_end = false;
    let target_score = score_matrix[row][col];
    for (let n = 0; n < target; n++) {
        if (direction === "col") {
            col -= 1;
            ali_seqA += gap_char;
            ali_seqB += sequenceB.substring(col, col + 1);
        } else {
            row -= 1;
            ali_seqA += sequenceA.substring(row, row + 1);
            ali_seqB += gap_char;
        }
        let actual_score = score_matrix[row][col] + calc_affine_penalty(n + 1, open_pen, extend);
        if (!align_globally && score_matrix[row][col] === best_score) {
            dead_end = true;
            break;
        }
        if (
            Math.round(actual_score) === Math.round(target_score) &&
            n > 0
        ) {
            if (!trace_matrix[row][col]) break;
            else
                in_process.push([
                    ali_seqA,
                    ali_seqB,
                    end,
                    row,
                    col,
                    col_gap,
                    trace_matrix[row][col]
                ]);
        }
        if (!trace_matrix[row][col]) {
            dead_end = true;
        }
    }
    return [ali_seqA, ali_seqB, row, col, in_process, dead_end];
};

export function perc_identity(aln) {
    let s1 = aln[0];
    let s2 = aln[1];
    let l = s1.length;
    let idt = 0;
    for (let i = 0; i < l; i++) {
        if (s1[i] === s2[i]) idt++;
    }
    return (idt / l) * 100;
}

/*
import {pairwise_align, perc_identity, protsub_matrix} from "./align";

function _test_alignment(){
    let P43321 = 'MTMNGIPVKLLNEAQGHIVSLELTTGATYRGKLVESEDSMNVQLRDVIATEPQGAVTHMDQIFVRGSQIKFIVVPDLLKNAPLFKKNSSRPMPPIRGPKRR';
    let Q9UUC6 = 'MSLCIKLLHETQGHIVTMELENGSTYRGKLIEAEDNMNCQMRDISVTARDGRVSHLDQVYIRGSHIRFLIVPDMLRNAPMFKVGPGRSVPLPTRGRR';
    
    let aln = pairwise_align(P43321, Q9UUC6, protsub_matrix, -5, -1, false, true)

    console.log(aln[0]); //MTMNGIPVKLLNEAQGHIVSLELTTGATYRGKLVESEDSMNVQLRDVIATEPQGAVTHMDQIFVRGSQIKFIVVPDLLKNAPLFKKNSSRPMP-PIRGPKRR
    console.log(aln[1]); //--MS-LCIKLLHETQGHIVTMELENGSTYRGKLIEAEDNMNCQMRDISVTARDGRVSHLDQVYIRGSHIRFLIVPDMLRNAPMFKVGPGRSVPLPTRG--RR
    console.log(aln[0].length); //102
    console.log(perc_identity(aln)); //52.94117647058824
}
*/