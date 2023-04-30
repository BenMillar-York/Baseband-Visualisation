var isDarkMode = true;
var lineColour = '#ffffff';
var timePeriodColour = '#66ccff';

const darkMode = {
    lineColour: '#ffffff',
    timePeriodColour: '#66ccff',
    '--bg-colour': '#15181b',
    '--text-colour': 'white',
    '--dropdown-bg-colour': '#111111',
    '--dropdown-item-bg-colour': '#222222',
}

const lightMode = {
    lineColour: '#000000',
    timePeriodColour: '#993300',
    '--bg-colour': '#eae7e4',
    '--text-colour': 'black',
    '--dropdown-bg-colour': '#cccccc',
    '--dropdown-item-bg-colour': '#dddddd'
}

function invertColourScheme() {
    isDarkMode = !isDarkMode;
    colourPalette = lightMode;
    if (isDarkMode) {
        colourPalette = darkMode;
    }

    lineColour = colourPalette.lineColour;
    timePeriodColour = colourPalette.timePeriodColour;

    const styleNode = document.documentElement.style
    for (const [name, value] of Object.entries(colourPalette)) {
        if (typeof name == 'string' && name.substring(0, 2) == '--') {
            styleNode.setProperty(name, value);
        }
    }

    changeColourOfAllGraphs();

    return isDarkMode;
}