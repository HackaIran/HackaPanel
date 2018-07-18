const Generator = require('./extra/Generator/index');

let inputs = [];

const generateInputs = () => {
    for (let i = 1; i <= 10; i++) {
        inputs = [];
        inputs.push(Generator(i));
    }
}

generateInputs();
setInterval(generateInputs, 5 * 60 * 1000);

module.exports = {
    get: (i) => inputs[i],
    length: inputs.length
};