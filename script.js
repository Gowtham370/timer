let timer;
let isRunning = false;
let totalTime = 0; // total time in seconds
let remainingTime = 0;

// DOM elements
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const displayEle = document.querySelector(".display");
const timerMessage = document.getElementById("timerMessage");

// Event listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Start Timer
function startTimer() {
  // if not already running
  if (!isRunning) {
    // if this is the first start
    if (remainingTime === 0) {
      let mins = parseInt(minutesInput.value) || 0;
      let secs = parseInt(secondsInput.value) || 0;
      totalTime = mins * 60 + secs;
      remainingTime = totalTime;
    }

    if (remainingTime > 0) {
      isRunning = true;
      timerMessage.textContent = "";
      timer = setInterval(handleCountdown, 1000);
    }
  }
}

// Pause Timer
function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

// Reset Timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 0;
  totalTime = 0;
  minutesInput.value = "";
  secondsInput.value = "";
  timerMessage.textContent = "";
  updateDisplay(0);
}

// Countdown Logic
function handleCountdown() {
  if (remainingTime <= 0) {
    clearInterval(timer);
    isRunning = false;
    timerMessage.textContent = "⏰ Time's Up!";
    updateDisplay(0);
    return;
  }
  remainingTime--;
  updateDisplay(remainingTime);
}

// Update Timer Display
function updateDisplay(time) {
  let mins = Math.floor(time / 60);
  let secs = time % 60;

  displayEle.innerHTML = `
    ${String(mins).padStart(2, '0')}:
    ${String(secs).padStart(2, '0')}
  `;
}
