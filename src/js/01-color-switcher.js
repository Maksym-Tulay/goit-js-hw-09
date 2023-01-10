// refs

const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]')
};

// fn declaration for getting random color

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// fn declaration for update bg color

function updateBodyBgColor(color) {
    document.body.style.backgroundColor = color;
}

// class declaration with properties for start/stop changing body bg color + disabling start btn while started and stop btn when stopped

class ColorChanger {
    constructor (updateBodyBgColor) {
        this.isActive = false;
        this.interval = null;
        this.updateBodyBgColor = updateBodyBgColor;
        refs.stopButton.disabled = true;
    }

    startChangeBgColor() {
        if (this.isActive) {
           return; 
        }
        this.isActive = true;
        this.interval = setInterval(() => updateBodyBgColor(getRandomHexColor()), 1000);

        refs.startButton.disabled = true;
        refs.stopButton.disabled = false;
    }

    stopChangeBgColor() {
        this.isActive = false;
        clearInterval(this.interval);

        refs.startButton.disabled = false;
        refs.stopButton.disabled = true;
    }
}

// expression of class

const bgColorChanger = new ColorChanger();

// add eventListeners for start/stop buttons

refs.startButton.addEventListener('click', () => bgColorChanger.startChangeBgColor());
refs.stopButton.addEventListener('click', () => bgColorChanger.stopChangeBgColor());