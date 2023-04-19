class DecodedDataGraph extends EncodedDataGraph {
    get codingFunction() {
        switch(encodedWave.codingFunction) {
            case returnToZero:
                return decodeReturnToZero;
            case nrzm:
                return decodeNrzm;
            case manchester:
                return decodeManchester;
            case bipolar:
                return decodeBipolar;
            case mlt3:
                return decodeMlt3;
            case nrzl:
                return decodeNrzl;
            default:
                return decodeReturnToZero;
        }
    }

    scaleDataPointForDisplay(dataPoint) {
        dataPoint = -dataPoint*this.height/2.5;
        dataPoint += this.height-5;
        return dataPoint;
    }

    get maxValue() {
        let maxPoint = 0;
        this.data.forEach(dataPoint => {
            if (dataPoint > maxPoint) {
                maxPoint = dataPoint;
            }
        })
        return maxPoint;
    }

    get minValue() {
        let minPoint = 9999;
        this.data.forEach(dataPoint => {
            if (dataPoint < minPoint) {
                minPoint = dataPoint;
            }
        })
        return minPoint;
    }

    plot() {

        let timePeriod = this.timePeriod;

        let data = this.data

        this.ctx.clearRect(0, 0, this.width, this.height);

        let prevDataPoint = data[0];

        let averageValue = (this.maxValue - this.minValue) / 2;

        data.forEach((dataPoint, index) => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.lineWidth = 2.5;

            if (dataPoint != dataWave.data[index]) {
                this.ctx.strokeStyle = "#ff0000";
            }            

            dataPoint = this.scaleDataPointForDisplay(dataPoint);

            if (dataPoint != prevDataPoint && index != 0 && index != data.length-1) {
                this.ctx.lineTo(index*timePeriod, this.scaleDataPointForDisplay(averageValue));
            }

            if (dataPoint == 'X') {
                this.ctx.strokeStyle = '#ff0000';
            }
            
                
            this.ctx.lineTo(index*timePeriod, dataPoint);
            this.ctx.lineTo((index+1)*timePeriod, dataPoint);

            if (dataPoint != this.scaleDataPointForDisplay(data[index+1])) {
                this.ctx.lineTo((index+1)*timePeriod, this.scaleDataPointForDisplay(averageValue));
            }

            prevDataPoint = dataPoint;

            this.ctx.stroke();
            
        })
        
        this.ctx.save();

        if (this.isMouseOver) {
            this.plotTimePeriod();
        }
    }
}