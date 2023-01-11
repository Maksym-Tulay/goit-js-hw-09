// import dependencies

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import Notiflix from 'notiflix';


// adding refs

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

let selectedTime = null;

// add eventListener to startBtn 

refs.startBtn.addEventListener('click', () => timer.startTimer());

// declaration of converting ms fn

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// declaration of fn addLeadingZero to padStart

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// declaration of fn with flatpickr options

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future!');
            selectedDates[0] = new Date();
        } else {
            Notiflix.Notify.info('Push Start!');
            selectedTime = selectedDates[0];
            refs.startBtn.disabled = false;
        }
    },
};

const fp = flatpickr(refs.inputDate, options);

// declaration of class for Timer

class Timer {
    constructor() {
        refs.startBtn.disabled = true;
        this.isActive = false;
        this.timerID = null;
    }

    startTimer() {
        if(this.isActive) {
            return;
        }
        
        refs.startBtn.disabled = true;

        this.isActive = true;
        this.timerID = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const timerComponents = convertMs(deltaTime);
            if (deltaTime > 0) {
                this.updateTimercomponents(timerComponents)
                return;
            } this.stopTimer();
            return;
        }, 1000)
    }
    
    updateTimercomponents({ days, hours, minutes, seconds }) {
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;
    }

    stopTimer() {
        clearInterval(this.timerID);
    }
}

// expression of a new timer

const timer = new Timer();
