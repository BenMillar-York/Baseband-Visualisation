class InverseFourierGraph extends FourierGraph {

    _brickWallFilterThreshold = 100;
    _noiseLevel = 0;

    plot() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.width, this.height);

        let data = this.data;

        let xScaling = encodedWave.timePeriod/SAMPLES_PER_BIT;
        //let xScaling = 5;

        data.forEach((dataPoint, index) => {
            dataPoint = this.scaleDataPointForDisplay(dataPoint);
            this.ctx.lineTo(index*xScaling, dataPoint);
        })

        this.ctx.stroke();

        if (this.isMouseOver) {
            this.plotTimePeriod();
        }
    }

    scaleDataPointForDisplay(dataPoint) {

        dataPoint = dataPoint*this.height/1.5;
        dataPoint = -dataPoint;
        dataPoint += this.height/2+30;

        return dataPoint;
    }

    get highestPoint() {
        let heighestPoint = 0;
        this.data.forEach(dataPoint => {
            if (dataPoint > heighestPoint) {
                heighestPoint = dataPoint;
            }
        });
        return heighestPoint;
    }

    get lowestPoint() {
        let lowestPoint = 9999;
        this.data.forEach(dataPoint => {
            if (dataPoint < lowestPoint) {
                lowestPoint = dataPoint;
            }
        });
        return lowestPoint;
    }

    set filterThreshold (newFilterThreshold) {
        this._brickWallFilterThreshold = newFilterThreshold;
        this.update();
        eyeDiagramWave.update();
        fourierWave.plot();
        demodulatedWave.plot();
        decodedWave.plot();
    }

    get filterThreshold () {
        return this._brickWallFilterThreshold;
    }

    plotTimePeriod() {
        this.ctx.beginPath();
        let highestPoint = this.highestPoint;
        let lowestPoint = this.lowestPoint;
        this.ctx.strokeStyle = '#66ccff'

        highestPoint = this.scaleDataPointForDisplay(highestPoint);
        lowestPoint = this.scaleDataPointForDisplay(lowestPoint);

        for (let i = 0; i<this.ctx.canvas.width; i += dataWave.timePeriod) {
            this.ctx.moveTo(i, highestPoint);
            this.ctx.lineTo(i, lowestPoint);
        }
        
        this.ctx.stroke();
        this.ctx.strokeStyle = '#ffffff'
    }

    set noiseLevel(newNoiseLevel) {
        this._noiseLevel = newNoiseLevel;
        this.update();
        eyeDiagramWave.update();
        fourierWave.plot();
        demodulatedWave.plot();
        decodedWave.plot();
        let SNR = 1/newNoiseLevel;
        SNR = SNR.toFixed(2);
        document.getElementById('NoiseLabel').innerText = String.raw`\[SNR = ${SNR}\]`;
        MathJax.typeset();
    }

    get noiseLevel() {
        return this._noiseLevel;
    }
}

function filter_then_inverse(fourierData) {
    let filteredData = brick_wall_filter(fourierData, inverseFourierWave.filterThreshold);
    let data = inverseFourierTransform(filteredData);
    return addGaussianNoise(data, inverseFourierWave.noiseLevel)
}

function brick_wall_filter(fourierData, brickWallThreshold) {
    let filteredData = new Array(fourierData.length).fill(new Complex(0, 0));
    for (let i = 0; i < brickWallThreshold && i < fourierData.length / 2; i++) {
        filteredData[i] = fourierData[i];
    }
    return filteredData;
}

/**
 * Takes in an array of numerical data points and adds a variable amount of gaussian noise to
 * each data point.
 * Utilises the Box-Muller transform to generate the gaussian distrubuted random values
 * @param {Array} data 
 */
function addGaussianNoise(data, noiseLevel) {
    noisyData = []

    data.forEach(dataPoint => {
        noisyData.push(dataPoint + (randomGaussianValue() * noiseLevel))
    })

    return noisyData;
}

function randomGaussianValue() {
    const theta = 2 * Math.PI * Math.random();
    const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
    return (rho * Math.cos(theta)) / 10.0; 
}