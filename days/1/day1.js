const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const oneLoop = ({ lines, totalSum, map }) => {
    const total = lines.reduce(({s, t, twice}, x) => {
        s += parseInt(x);
        t += parseInt(x);
        if (!twice && map[t]){
            twice = t;
        } else {
            map[t] = t;
        }
        return {
            s,
            t,
            twice
        }
    }, {
        s: 0,
        t: totalSum,
        twice: null
    });
    return {
        lines,
        oneSum: total.s,
        sum: total.t,
        map,
        twice: total.twice
    }
}

let total = 0;
let frequencies = {};

while(true){
    const { oneSum, sum, map, twice } = oneLoop({lines: input, totalSum: total, map: frequencies});
    if (twice){
        console.log("Appears twice", twice);
        console.log("Single sum", oneSum);
        break;
    } else {
        total = sum;
        frequencies = map;
    }
}