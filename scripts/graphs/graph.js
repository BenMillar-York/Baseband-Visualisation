let graphs = [];

class Graph {

    _data = [];
    _isMouseOver = false;

    constructor(canvas) {
        this.canvas = canvas;
        this.width = 2399;
        //this.height = 150;
        this.ctx.lineWidth = 2.5;
        this.ctx.strokeStyle = lineColour;
        graphs.push(this);
    }

    set canvas(canvas) {
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx.canvas.addEventListener("mousedown", this.onClickGraph);
        this.ctx.canvas.addEventListener("mouseover", onHoverOverGraph);
        this.ctx.canvas.addEventListener("mouseleave", onMouseLeaveGraph);
    }

    get canvas() {
        return this.ctx.canvas;
    }

    set data(newData) {
        this._data = newData;
        replotAllGraphs();
    }

    get data() {
        return this._data;
    }

    set width(width) {
        this.ctx.canvas.width = width;
    }
    get width() {
        return this.ctx.canvas.width;
    }

    set height(height) {
        this.ctx.canvas.height = height;
    }
    get height() {
        return this.ctx.canvas.height;
    }

    set isMouseOver(boolean) {
        this._isMouseOver = boolean;
        if (boolean) {
            this.plotTimePeriod();
            return;
        } 
        this.removeTimePeriod();
    }

    get isMouseOver() {
        return this._isMouseOver;
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

    update() {
        
        this.plot();
        //this.plotAxis();
        return true;
    }

    scaleDataPointForDisplay(dataPoint) {

        dataPoint = -dataPoint*this.height/2.5;
        dataPoint += this.height-5

        return dataPoint;
    }

    plotTimePeriod() {
        this.ctx.beginPath();
        let highestPoint = this.highestPoint;
        let lowestPoint = this.lowestPoint;

        this.ctx.strokeStyle = timePeriodColour;

        highestPoint = this.scaleDataPointForDisplay(highestPoint);
        lowestPoint = this.scaleDataPointForDisplay(lowestPoint);

        for (let i = 0; i<this.ctx.canvas.width; i += dataWave.timePeriod) {
            this.ctx.moveTo(i, highestPoint);
            this.ctx.lineTo(i, lowestPoint);
        }
        this.ctx.stroke();
        this.ctx.strokeStyle = lineColour;
        this.ctx.save();
    }

    removeTimePeriod() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.ctx.stroke();
        this.update();
    }


    onClickGraph(event) {
        
        const rect = this.getBoundingClientRect();
        console.log(rect)
        const mousePosition = (event.clientX - rect.left) / rect.width / dataWave.timePeriod;
        console.log(mousePosition * 10000);
        const targetBit = Math.floor(mousePosition * 10000 / 4.17);
        console.log(targetBit);
        // Find which time segment is being targeted
        let mouseRelativePosition = Math.floor(targetBit);
        //let timeSegment = Math.floor(mouseRelativePosition / dataWave.timePeriod);
        dataWave.data[mouseRelativePosition] = !dataWave.data[mouseRelativePosition];
        replotAllGraphs();
    }

    plotAxis() {
        this.ctx.beginPath();

        this.ctx.strokeStyle = lineColour;

        this.ctx.moveTo(5, 30);
        this.ctx.lineTo(5, this.canvas.height);

        this.ctx.moveTo(5, this.canvas.height);
        this.ctx.lineTo(this.canvas.width, this.canvas.height);

        this.ctx.stroke();
        this.ctx.save();
    }

}

function getGraphFromCanvas(canvas) {
    let output = null;
    graphs.forEach(graph => { 
        if (graph.canvas.id == canvas.id) {
            output = graph;
        }
    })
    return output;
}

function onHoverOverGraph(event) {
    let graph = getGraphFromCanvas(event.target);
    graph.isMouseOver = true;
}

function onMouseLeaveGraph(event) {
    let graph = getGraphFromCanvas(event.target);
    graph.isMouseOver = false;
}

function replotAllGraphs() {
    graphs.forEach(graph => { 
        graph.update();
    })
}

function changeColourOfAllGraphs() {
    graphs.forEach(graph => { 
        graph.ctx.strokeStyle = lineColour;
    })
    replotAllGraphs();
}