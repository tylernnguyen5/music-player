const image = document.querySelector('img');
const title = document.getElementById('title');
const artist= document.getElementById('artist');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'track-1',
    displayName: 'Sunflower',
    artist: 'Post Malone ft. Swae Lee'
  },
  {
    name: 'track-2',
    displayName: 'Pray For Me',
    artist: 'Kendrick Lamar ft. The Weeknd'
  },
  {
    name: 'track-3',
    displayName: '17',
    artist: 'Pink Sweat$'
  },
  {
    name: 'track-4',
    displayName: 'Love In My Pocket',
    artist: 'Rich Brian'
  }
];


// ======================================================

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
}

// Pause
function pauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// ======================================================

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song Index
let songIndex = 0

// onLoad - Select First Song
loadSong(songs[songIndex]);


// ======================================================

// Previous Song
function prevSong() {
  songIndex--;

  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) songIndex = 0;

  loadSong(songs[songIndex]);
  playSong();
}


// Previous or Next Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// ======================================================

// Progress Bar Update
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;


    // Update duration time
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }


    // Update current time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const {duration} = music;

  music.currentTime = (clickX / width) * duration;
  playSong();
}

// Event Listeners
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);