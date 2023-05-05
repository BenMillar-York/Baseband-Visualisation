class DemodulatedDataGraph extends DataGraph {
    _dataSource = null;

    set dataSource(newDataSource) {
        this._dataSource = newDataSource;
    }

    get dataSource() {
        return this._dataSource;
    }

    get timePeriod() {
        return this._dataSource.timePeriod;
    }

    get data() {
        return this.demodulateData(this._dataSource.data);
    }


    demodulateData(data) {
        let demodulatedData = [];

        if (encodedWave.codingFunction == bipolar || encodedWave.codingFunction == mlt3) {
            for (let i = SAMPLES_PER_BIT/2; i < data.length; i += SAMPLES_PER_BIT) {
                if (data[i] > 0.66) {
                    demodulatedData.push(1);
                    continue;
                }
                if (data[i] < 0.33) {
                    demodulatedData.push(0);
                    continue;
                }
                demodulatedData.push(0.5);
                continue; 
            }
            return demodulatedData;
        }
    
        for (let i = SAMPLES_PER_BIT/2; i < data.length; i += SAMPLES_PER_BIT) {
           
            demodulatedData.push(data[i] > 0.5);
        }
    
        return demodulatedData;
    }

}