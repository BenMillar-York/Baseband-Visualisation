/**
 * Takes in an array of data and returns the Return To Zero Ddecoding of the array.
 * When a 1 followed by a 0 is encountered a 1 will be decoded
 * When a 0 followe by a 0 is encountered a 0 will be decoded
 * All other combinations result in an error, or X being decoded
 * @param {Array} data 
 */
function decodeReturnToZero(returnToZeroData) {
    let i;
    let decodedData = new Array(Math.ceil(returnToZeroData.length/2)).fill('X');

    for (i=0; i < returnToZeroData.length; i=i+2) {
        if (returnToZeroData[i] == 1 && returnToZeroData[i+1] == 0) {
            decodedData[i/2] = 1;
            continue;
        }
        if (returnToZeroData[i] == 0 && returnToZeroData[i+1] == 0) {
            decodedData[i/2] = 0;
            continue;
        }
    }
    return decodedData;
}


/**
 * Takes in an array of data and returns the NRZ - M Decoding of the wave
 * A logic high forces a transistion and a logic low keeps the signal the same
 * @param {Array} data 
 */
function decodeNrzm(nrzmData) {
    let decodedData = new Array(nrzmData.length).fill('X');

    let i;

    decodedData[0] = nrzmData[0]

    for (i=1; i < nrzmData.length; i++) {
        if (nrzmData[i] == nrzmData[i-1]) {
            decodedData[i] = 0;
        } else {
            decodedData[i] = 1;
        }
    }
    return decodedData;
}

/**
 * Takes in a data array and returns the Mancher Decoding of the data
 * This follows the IEEE 802.3 ethernet standards where a logic high is a low- high signal sequence and a logic low is a high- low signal sequence
 * @param {Array} data 
 */
function decodeManchester(manchesterData) {
    let decodedData = new Array(Math.ceil(manchesterData.length/2)).fill('X');

    for (i=0; i < manchesterData.length; i=i+2) {
        if (manchesterData[i] == true && manchesterData[i+1] == false) {
            decodedData[i/2] = 1
            continue;
        } 
        if (manchesterData[i] == false && manchesterData[i+1] == true) {
            decodedData[i/2] = 0
            continue;
        } 
    }
    return decodedData;
}

/**
 * Takes in a array of ddata and returns the Bipolar Deoding of the data
 * A logic high forces an alternating high- zero/ low-zero transisition and a logic low sets the signal to zero
 * @param {Array} data 
 */
function decodeBipolar(bipolarData) {
    let decodedData = new Array(bipolarData.length).fill('X');

    let alternator = true;

    for (i=0; i < bipolarData.length; i++) {
        if (bipolarData[i] == 0.5) {
            decodedData[i] = 0;
            continue;
        } 
        if (bipolarData[i] == alternator) {
            decodedData[i] = 1;
            alternator = !alternator;
            continue;
        }
    }
    return decodedData;
}

/**
 * Takes in a data array and returns the MLT-3 Decoding of the data
 * Moves between -1 0 +1 0 on every high bit and remains constant on a zero bit
 * @param {Array} data 
 */
function decodeMlt3(mltData) {
    let decodedData = new Array(mltData.length).fill('X');

    let pattern = [0, 0.5, 1, 0.5];
    let currentPatternPosition = 0;
    

    for (i=0; i < mltData.length; i++) {

        if (mltData[i] == pattern[Math.floor(currentPatternPosition%4)]) {
            decodedData[i] = 0;
        } else {
            decodedData[i] = 1;
            currentPatternPosition += 1;
        }

    }
    return decodedData;
}