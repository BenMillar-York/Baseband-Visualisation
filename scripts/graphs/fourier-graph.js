class FourierGraph extends Graph {
    _dataFunction = null;
    _dataSource = null;
    _data = [];
    _dataLength = 0;

    set dataFunction(newCodingFunction) {
        this._dataFunction = newCodingFunction;
    }

    set dataSource(newDataSource) {
        this._dataSource = newDataSource;
    }

    get timePeriod () {
        return this._dataSource.timePeriod;
    }

    get data() {
        return this._data;
    }

    update() {
        let data = this._dataFunction(this._dataSource.data);
        this._data = data;
        this._dataLength = data.length;
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