const player = document.querySelector('.player');
const video = player.querySelector(".viewer")
const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll('[data-skip]');
const range = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

function togglePlay() {
  const statusVideo = video.paused ? "play": 'pause';
  video[statusVideo]()
}

function updateButton() {
  const icon = this.paused? '►' : '❚ ❚';
  toggle.textContent = icon;
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {  
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime * 100) / video.duration;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener("click", skip))
range.forEach(btn => btn.addEventListener('change', handleRangeUpdate));
range.forEach(btn => btn.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);