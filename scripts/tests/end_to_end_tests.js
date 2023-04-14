let numberOfTests = 1;

class EndToEndTest {

    constructor () {
        this.testNumber = numberOfTests;
        numberOfTests += 1;
    }

    set data(newData) {
        dataWave.data = newData
    }

    set timePeriod(newTimePeriod) {
        document.getElementById('dataWaveTimePeriod').value = newTimePeriod
        dataWave.timePeriod = Math.round(newTimePeriod);
    }

    set encodingScheme(newEncodingScheme) {
        updateEncodingFunction(newEncodingScheme);

        let textLabel = document.getElementById('selected-encoding-scheme-label')

        switch (newEncodingScheme) {
            case nrzm:
                textLabel.innerHTML = "Non-return-to-zero mark";
                break;
            case manchester:
                textLabel.innerHTML = "Manchester coding";
                break;
            case returnToZero:
                textLabel.innerHTML = "Return to zero";
                break;
            case bipolar:
                textLabel.innerHTML = "Bipolar coding";
                break;
            case mlt3:
                textLabel.innerHTML = "Multi-level Transmit 3";
                break;
            default:
                textLabel.innerHTML = "Undefined";
                break;
        }
    }

    set expectedOutput (newExpectedOutput) {
        this._expectedOutput = newExpectedOutput;
    }

    get expectedOutput () {
        return this._expectedOutput;
    }

    evaluateTest() {
        let outputData = decodedWave.data;
        for (let i = 0; i < outputData.length; i++) {
            if (outputData[i] != this.expectedOutput[i]) {
                return false;
            }
        }
        return true;
    }

    evaluateAndOutputTest() {
        let error_message = ''
        if (!this.evaluateTest()) {
            error_message = `[END TO END TEST] End to end test ${this.testNumber} failed.`
            console.warn(error_message);
            return false;
        }
        error_message = `[END TO END TEST] End to end test ${this.testNumber} passed.`
        console.info(error_message);
        return true;
    }
}

let endToEndTest1 = {
    data: [1, 0, 1, 0, 1],
    encodingScheme: manchester,
    timePeriod: 200,
    filterThreshold: 50,
    gaussianNoise: 0,

    expectedOutput: [1, 0, 1, 0, 1],
}

function run_end_to_end_test_1() {
    let endToEndTest1 = new EndToEndTest();
    endToEndTest1.encodingScheme = manchester;
    endToEndTest1.timePeriod = 200;
    endToEndTest1.data = [1, 0, 1, 0, 1];
    endToEndTest1.filterThreshold = 50;
    endToEndTest1.gaussianNoise = 0;

    endToEndTest1.expectedOutput = [1, 0, 1 ,0, 1];
    endToEndTest1.evaluateAndOutputTest();
}
