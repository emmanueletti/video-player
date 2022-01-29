const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.title = 'Play';
};

const togglePlay = () => {
  if (video.paused) {
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.title = 'Pause';
    return video.play();
  }
  showPlayIcon();
  video.pause();
};

// Progress Bar ---------------------------------- //
const buildTimeString = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  let seconds = Math.floor(timeInSeconds % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  const percentageComplete = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percentageComplete}%`;
  // progress time
  currentTime.textContent = buildTimeString(video.currentTime);
  // duration
  duration.textContent = buildTimeString(video.duration);
};

const jumpProgress = (e) => {
  const positionClicked = e.offsetX;
  const rangeWidth = progressRange.clientWidth;
  video.currentTime = video.duration * (positionClicked / rangeWidth);
};

// Volume Controls --------------------------- //
const toggleMute = () => {
  console.log(video.muted);
  if (video.muted) {
    video.muted = false;
    volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    return;
  }
  video.muted = true;
  volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
};

const updateVolume = (e) => {
  console.log(volumeRange.clientWidth);
  console.log(e.offsetX);
  let newVolume = e.offsetX / volumeRange.clientWidth;
  if (newVolume < 0.1) {
    newVolume = 0;
  }
  if (newVolume > 0.9) {
    newVolume = 1;
  }
  video.volume = newVolume;
  volumeBar.style.width = `${newVolume * 100}%`;
};

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('ended', showPlayIcon);
progressRange.addEventListener('click', jumpProgress);
volumeIcon.addEventListener('click', toggleMute);
volumeRange.addEventListener('click', updateVolume);
