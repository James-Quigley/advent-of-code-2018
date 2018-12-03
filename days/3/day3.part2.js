const fs = require('fs');

const claims = fs.readFileSync('./input.txt', 'utf8').split('\n');

const parsedClaims = claims.map((claim) => {
    const parts = claim.split(' ');

    const id = parts[0].substring(1);

    const [leftSpaceStr, topSpaceStr] = parts[2].split(",");

    const topSpace = topSpaceStr.substring(0, topSpaceStr.length -1);

    const [width, height] = parts[3].split("x").map((val) => parseInt(val));

    return {
        id,
        leftSpace: parseInt(leftSpaceStr),
        topSpace: parseInt(topSpaceStr),
        width,
        height
    };
});

const rows = [];

parsedClaims.forEach(claim => {
    for (let width = 0; width < claim.width; width++){
        for (let height = 0; height < claim.height; height++){
            if (!rows[height+claim.topSpace - 1]){
                rows[height+claim.topSpace - 1] = [];
            }
            if (rows[height+claim.topSpace - 1][width+claim.leftSpace - 1] == null || rows[height+claim.topSpace - 1][width + claim.leftSpace - 1] == undefined){
                rows[height+claim.topSpace - 1][width+claim.leftSpace - 1] = 0;
            } else {
                rows[height+claim.topSpace - 1][width+claim.leftSpace - 1]++;
            }
        }
    }
});

parsedClaims.forEach(claim => {
    let overlap = false;
    for (let width = 0; width < claim.width; width++){
        for (let height = 0; height < claim.height; height++){
            if (rows[height+claim.topSpace - 1][width+claim.leftSpace - 1] > 0){
                overlap = true;
            }
        }
    }
    if (!overlap){
        console.log(claim.id);
        process.exit(0);
    }
});
