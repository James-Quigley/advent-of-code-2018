const fs = require('fs');

const ids = fs.readFileSync('./input.txt', 'utf8').split('\n');

const values = ids.reduce(({ exactly2, exactly3 }, id) => {
    const chars = id.split('');
    const charCount = chars.reduce((charMap, char) => {
        if (!charMap[char]){
            charMap[char] = 0;
        }
        charMap[char]++;
        return charMap;
    }, {});

    const duplicateChars = Object.values(charCount).filter(v => v == 2);
    const tripleChars = Object.values(charCount).filter(v => v == 3);

    if (duplicateChars.length > 0){
        exactly2++;
    }
    if (tripleChars.length > 0 ){
        exactly3++;
    }

    return {
        exactly2,
        exactly3
    };
},{
    exactly2: 0,
    exactly3: 0
});

console.log(values.exactly2 * values.exactly3);