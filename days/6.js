const input = [
    [135, 127],
    [251, 77],
    [136, 244],
    [123, 169],
    [253, 257],
    [359, 309],
    [100, 247],
    [191, 323],
    [129, 323],
    [76, 284],
    [69, 56],
    [229, 266],
    [74, 216],
    [236, 130],
    [152, 126],
    [174, 319],
    [315, 105],
    [329, 146],
    [288, 51],
    [184, 344],
    [173, 69],
    [293, 80],
    [230, 270],
    [279, 84],
    [107, 163],
    [130, 176],
    [347, 114],
    [133, 331],
    [237, 300],
    [291, 283],
    [246, 297],
    [60, 359],
    [312, 278],
    [242, 76],
    [81, 356],
    [204, 291],
    [187, 335],
    [176, 98],
    [103, 274],
    [357, 144],
    [314, 118],
    [67, 196],
    [156, 265],
    [254, 357],
    [218, 271],
    [118, 94],
    [300, 189],
    [290, 356],
    [354, 91],
    [209, 334]
  ];
  
  const getDist = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1);
  
  const part1 = () => {
    const GRID_SIZE = 1000;
    let infinites = [];
  
    let counts = {};
  
    for (let x = 0; x <= GRID_SIZE; x++) {
      for (let y = 0; y <= GRID_SIZE; y++) {
        let smallestDist = 10000000;
        let closestCoords = [];
        for (let coords of input) {
          let dist = getDist([x, y], coords);
          if (dist < smallestDist) {
            smallestDist = dist;
            closestCoords = coords;
          }
        }
        if (x == 0 || y == 0 || x == GRID_SIZE || y == GRID_SIZE) {
          // Closest coord is infinite
          infinites.push(closestCoords);
        }
  
        const key = `${closestCoords[0]}:${closestCoords[1]}`;
        if (!counts[key]) {
          counts[key] = 0;
        }
  
        counts[key]++;
      }
    }
  
    let biggestArea = 0;
    let bigCoord = null;
  
    for (let coords of input) {
      if (!infinites.includes(coords)) {
        const key = `${coords[0]}:${coords[1]}`;
        if (counts[key] > biggestArea) {
          biggestArea = counts[key];
          bigCoord = coords;
        }
      }
    }
    console.log(bigCoord, biggestArea);
  };
  
  const part2 = () => {
    const GRID_SIZE = 1000;
    const MAX_DIST = 10000;
  
    let safeArea = 0;
    for (let x = 0; x <= GRID_SIZE; x++) {
      for (let y = 0; y <= GRID_SIZE; y++) {
          let total = 0;
        for (let coords of input) {
          let dist = getDist([x, y], coords);
          total += dist
        }
        if (total < 10000) {
            safeArea++;
        }
      }
  
  }
  console.log(safeArea);
  };
  
  part1();
  part2();
  