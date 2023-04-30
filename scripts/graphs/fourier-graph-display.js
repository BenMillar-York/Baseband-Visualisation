let DataProbability1 = 0.5;
let interval;

class FourierGraphDisplay extends Graph {
    _outputData = [];
    _dataLength = 0;
    _numIterations = 1;

    constructor(canvas) {
        super(canvas);
    }

    get data() {
        let data = [];
        let rawData = this._outputData;

        rawData.forEach(dataPoint => {
            // Averages out the coeffients
            data.push(new Complex(dataPoint.real / this._numIterations, dataPoint.imag / this._numIterations));
        })

        return data;
    }

    get rawData() {
        return this._outputData;
    }

    resetData() {
        this._data = [];
        this.runNextIteration();
    }

    runNextIteration() {

        if (inverseFourierWave == null) { return false;}

        // Generate 64 Random Values
        const data = generateRandomData(64, DataProbability1);

        // Encode the data
        const encodedData = encodedWave.codingFunction(data);

        // Sample the data and perform a DFT on the data
        const DFT_Data = sample_then_dft(encodedData);

        const oldData = this.rawData;

        if (oldData.length == 0) {
            for (let i = 0; i < DFT_Data.length; i++) {
                oldData.push(new Complex(0,0));
            }
        }

        if (oldData.length <  DFT_Data.length) {
            for (let i = oldData.length; i < DFT_Data.length; i++) {
                oldData.push(new Complex(0,0));
            }
        }

        let newData = [];

        // Update the coefficients 
        for (let k = 0; k < DFT_Data.length; k++) {
            newData.push(new Complex(oldData[k].real + DFT_Data[k].real, oldData[k].imag + DFT_Data[k].imag));
        }
        
        this._numIterations += 1;
        this._dataLength = DFT_Data.length;

        this._outputData = newData;
        this.update();
    }

    update() {
        this.plot();
    }

    scaleDataPointForDisplay(dataPoint) {

        dataPoint = dataPoint.magnitude * this._dataLength;
        dataPoint = 20*Math.log10(dataPoint);
        dataPoint = -dataPoint;
        dataPoint += this.height/400+40

        if (dataPoint > this.canvas.height) {
            dataPoint = this.canvas.height;
        }

        return dataPoint;
    }

    plot() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.strokeStyle = lineColour;

        let data = this.data;
        let half_length = Math.ceil(data.length / 2);
        data = data.slice(0, half_length);

        let xScaling = (1/data.length) * SAMPLES_PER_BIT * 128 * 1.6;

        // Scale for display resolution
        //xScaling = xScaling * (this.canvas.width / (data.length * 2));

        data.forEach((dataPoint, index) => {

            dataPoint = this.scaleDataPointForDisplay(dataPoint);

            if (index > inverseFourierWave.filterThreshold) {
                this.ctx.lineTo(index*xScaling, this.canvas.height-2);
                return;
            }
        
            this.ctx.lineTo(index*xScaling, dataPoint);
        })  
        
        this.ctx.stroke();

        if (this.isMouseOver) {
            this.plotTimePeriod();
        }
    }

    plotTimePeriod() {
        return true;
    }

    get highestPoint() {
        let heighestPoint = 0;
        this.data.forEach(dataPoint => {
            if (dataPoint.magnitude > heighestPoint) {
                heighestPoint = dataPoint.magnitude;
            }
        });
        return heighestPoint;
    }

    get lowestPoint() {
        let lowestPoint = 9999;
        this.data.forEach(dataPoint => {
            if (dataPoint.magnitude < lowestPoint) {
                lowestPoint = dataPoint.magnitude;
            }
        });
        return lowestPoint;
    }
}