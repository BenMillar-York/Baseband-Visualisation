EYE_DIAGRAM_HOR_SCALING_FACTOR = 1.4
EYE_DIAGRAM_VERT_SCALING_FACTOR = 1.4;

class EyeDiagramGraph extends InverseFourierGraph {

    constructor(canvas) {
        super(canvas);
        this.width = 500;
    }

    update() {
        //this.height = 150;
        let data = this._dataSource.data;
        this._data = data;
        this._dataLength = data.length;
        this.plot();
    }


    scaleForEyeDiagram(dataPoint) {
        dataPoint = dataPoint * EYE_DIAGRAM_VERT_SCALING_FACTOR
        return dataPoint;
    }

    
    plotTimePeriod() {
        return false;
    }

    plot() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = lineColour;
        this.ctx.clearRect(0, 0, this.width, this.height);

        let data = this.data;
        let xScaling = 100/SAMPLES_PER_BIT;
        xScaling = xScaling * EYE_DIAGRAM_HOR_SCALING_FACTOR;

        data.forEach((dataPoint, index) => {
            index = index % (SAMPLES_PER_BIT * 3);

            dataPoint = this.scaleDataPointForDisplay(dataPoint);
            dataPoint = this.scaleForEyeDiagram(dataPoint);

            if (index == 0) {
                this.ctx.moveTo(0, dataPoint);
            }
            
            this.ctx.lineTo(index*xScaling, dataPoint);
        })

        this.ctx.stroke();

        if (this.isMouseOver) {
            this.plotTimePeriod();
        }
    }
}

function calcEbNo() {
    let SNR = SignalToNoiseRatio;
    let EbNo = SNR * encodedWave.timePeriod / 100 * SAMPLES_PER_BIT / 2  * inverseFourierWave.filterThreshold / inverseFourierWave.data.length;
    EbNo = EbNo.toFixed(2);
    document.getElementById('EbNoLabel').innerText = String.raw`\[\frac{Eb}{N_0} = ${EbNo}\text{ dB}\]`;
    MathJax.typeset();
}