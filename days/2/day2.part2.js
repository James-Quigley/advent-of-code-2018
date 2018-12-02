const fs = require('fs');

const ids = fs.readFileSync('./chuck-input.txt', 'utf8').split('\n');

for (let x = 0; x < ids.length; x++){
    const id = ids[x];
    for (let y = x + 1; y < ids.length; y++){
        const otherId = ids[y];

        for (let c = 0; c < id.length; c++){
            const newIdChars = id.split('');
            newIdChars[c] = '';
            const newId = newIdChars.join('');

            const otherNewIdChars = otherId.split('');
            otherNewIdChars[c] = '';
            const otherNewId = otherNewIdChars.join('');

            if (newId == otherNewId){
                console.log(newId);
                console.log(otherNewId);
                console.log(newId + " == " + otherNewId);
                console.log(`${newId} == ${otherNewId}`);
            }
        }
    }
}