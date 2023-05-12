function init() {
    dataWave = new DataGraph(document.getElementById('dataCanvas'));
    encodedWave = new EncodedDataGraph(document.getElementById('encodedCanvas'));
    encodedWave.codingFunction = nrzm;
    encodedWave.dataSource = dataWave;

    fourierWave = new FourierGraph(document.getElementById('fourierCanvas'));
    fourierWave.dataFunction = sample_then_dft;
    fourierWave.dataSource = encodedWave;
    
    inverseFourierWave = new InverseFourierGraph(document.getElementById('inverseFourierCanvas'));
    inverseFourierWave.dataFunction = filter_then_inverse;
    inverseFourierWave.dataSource = fourierWave;

    fourierWaveDisplay = new FourierGraphDisplay(document.getElementById('fourierCanvasDisplay'));
    setInterval(function(){ 
        fourierWaveDisplay.runNextIteration()  
    }, 50);

    eyeDiagramWave = new EyeDiagramGraph(document.getElementById('eyeDiagramCanvas'));
    eyeDiagramWave.dataSource = inverseFourierWave;

    demodulatedWave = new DemodulatedDataGraph(document.getElementById('demodulatedCanvas'));
    demodulatedWave.dataSource = inverseFourierWave;

    decodedWave = new DecodedDataGraph(document.getElementById('decodedCanvas'));
    decodedWave.dataSource = demodulatedWave;
    decodedWave.codingFunction = decodeReturnToZero;

    dataWave.data = generateRandomData(64, 0.5);

    document.getElementById('InvertMenu').addEventListener("mouseup", invertCurrentData);

    invertColourScheme();
}

