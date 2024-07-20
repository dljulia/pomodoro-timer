function format(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
}

function resetValue(time) {
  clearInterval(timerId);
  startButton.classList.remove('start');
  startButton.textContent = "start";
  timer.textContent = time;
  seconds = +timer.textContent.slice(-2);
  minutes = +timer.textContent.slice(0,2);
}

const pomodoroButton = document.querySelector('#pomodoro');
const breakButton = document.querySelector('#break');
const timer = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
let timerId = null;
let seconds = +timer.textContent.slice(-2);
let minutes = +timer.textContent.slice(0,2);

pomodoroButton.addEventListener('click', () => {
  resetValue("25:00");
  breakButton.classList.remove('active');
  pomodoroButton.classList.add('active');     
});

breakButton.addEventListener('click', () => {
  resetValue("05:00");
  pomodoroButton.classList.remove('active');
  breakButton.classList.add('active');
});

startButton.addEventListener('click', () => {
  startButton.classList.toggle('start');

  if (startButton.className.includes("start")) {
    startButton.textContent = "stop"; 
  } else {
    clearInterval(timerId);
    startButton.textContent = "start";
    return;
  }

  timerId = setInterval(() => {  
    if (seconds == 0 && minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    
    timer.textContent = `${format(minutes)}:${format(seconds)}`;

   if (seconds < 0) {
      if (pomodoroButton.className.includes('active')) {
        resetValue("25:00");
      } else {
        resetValue("05:00");
      }
    } 
  }, 10);
});

resetButton.addEventListener('click', () => {
  if (pomodoroButton.className.includes('active')) {
    resetValue("25:00");
  } else {
    resetValue("05:00");
  }
});






