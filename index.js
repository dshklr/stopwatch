const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapShower = document.getElementById("laps");
const counter = document.querySelector(".counter");

let counterId = null;

function createStopwatch() {
  let miliseconds = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  
  const getClockView = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const tick = () => {
    miliseconds += 1;

    if (miliseconds === 100) {
      seconds++;
      miliseconds = 0;
    }

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }

    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
  };

  const reset = () => {
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
  };

  const getValue = () =>
    `${getClockView(hours)}:${getClockView(minutes)}:${getClockView(
      seconds
    )}:${getClockView(miliseconds)}`;

  return {
    getValue,
    tick,
    reset,
  };
}

const stopwatch = createStopwatch();

function startCounter() {
  if (counterId !== null) {
    clearInterval(counterId);
  }

  counterId = setInterval(() => {
    stopwatch.tick();
    counter.innerHTML = `${stopwatch.getValue()}`;
  }, 10);

  stopButton.style.display = "inline";
  resetButton.style.display = "inline";
  startButton.style.display = "none";
  startButton.innerHTML = "start";
  lapButton.style.display = "inline";
}

function stopCounter() {
  clearInterval(counterId);

  startButton.style.display = "inline";
  stopButton.style.display = "none";
  startButton.innerHTML = "resume";
}

function resetCounter() {
  clearInterval(counterId);
  stopwatch.reset();
  counter.innerHTML = `${stopwatch.getValue()}`;
  lapShower.innerHTML = "";

  startButton.style.display = "inline";
  stopButton.style.display = "none";
  resetButton.style.display = "none";
  startButton.innerHTML = "start";
  lapButton.style.display = "none";
}

function catchLap() {
  const lapValue = document.createElement("div");

  lapValue.innerHTML = stopwatch.getValue();
  lapShower.appendChild(lapValue);
}

startButton.addEventListener("click", startCounter);
stopButton.addEventListener("click", stopCounter);
resetButton.addEventListener("click", resetCounter);
lapButton.addEventListener("click", catchLap);
