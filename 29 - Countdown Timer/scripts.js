let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('#custom');

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const seccondsLeft = Math.abs(Math.round((then - Date.now()) / 1000));
    // check if we should stop it
    if (seccondsLeft === 0) {
      clearInterval(countdown);
    }
    // display time left
    displayTimeLeft(seccondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutesLeft = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutesLeft}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;

  console.log({ minutesLeft, remainderSeconds });
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}${hour >= 12 ? 'pm' : 'am'}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
