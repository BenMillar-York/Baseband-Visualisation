class DataGraph extends Graph {

    _timePeriod = 100;

    constructor(canvas) {
        super(canvas);
    }

    set timePeriod(newTimePeriod) {
        this._timePeriod = newTimePeriod;
        replotAllGraphs();
        calcEbNo();
    }

    get timePeriod () {
        return this._timePeriod;
    }
    
    plot() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.data.forEach((dataPoint, index) => {
            dataPoint = -dataPoint*this.height/2.5;
            dataPoint += this.height-5;
            this.ctx.lineTo(index*this.timePeriod, dataPoint);
            this.ctx.lineTo(index*this.timePeriod + this.timePeriod, dataPoint);
        })
        
        this.ctx.stroke();

        if (this.isMouseOver) {
            this.plotTimePeriod();
        }
    }
}

function generateRandomData(n, probability1) {
    let data = []
    for (let i = 0; i < n; i++) {
        data.push(Math.random() < probability1);
    }
    return data;
}

function updateProbability(probability1) {
    document.getElementById('P1Label').innerText = String.raw`\[P(1) = ${probability1}\]`;
    MathJax.typeset();
    dataWave.data = [];
    dataWave.data = generateRandomData(64, probability1);
    DataProbability1 = probability1;
    fourierWaveDisplay.resetData();
}