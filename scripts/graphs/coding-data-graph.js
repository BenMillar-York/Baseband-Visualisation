class EncodedDataGraph extends DataGraph {
    _codingFunction = null;
    _dataSource = null;

    set codingFunction(newCodingFunction) {
        this._codingFunction = newCodingFunction;
    }

    get codingFunction() {
        return this._codingFunction;
    }

    set dataSource(newDataSource) {
        this._dataSource = newDataSource;
    }

    get dataSource() {
        return this._dataSource;
    }

    get timePeriod() {
        let timePeriodRatio = this._dataSource.data.length / this.codingFunction(this._dataSource.data).length
        return timePeriodRatio * this._dataSource.timePeriod; 
    }

    get data() {
        return this.codingFunction(this.dataSource.data);
    }
}

function updateEncodingFunction(newEncodingFunction) {
    encodedWave.codingFunction = newEncodingFunction;
    replotAllGraphs();
    calcEbNo();
}