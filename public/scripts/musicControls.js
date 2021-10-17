/* --------------- MUSIC CONTROLS ------------- */
function playSong() {
    musicContainer.classList.add('play');
    imageContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();

    let arcCanvas = document.getElementById('progress-rotation-id'); // updating the rotating arc 
    arcCanvas.classList.add("rotation");
}
function pauseSong() {
    musicContainer.classList.remove('play');
    imageContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();

    let arcCanvas = document.getElementById('progress-rotation-id'); // updating the rotating arc 
    arcCanvas.classList.remove("rotation");
}
function prevSong() {
    songIndex--;
    if (songIndex < 0)
        songIndex = songs.length - 1;
    loadSong(songIndex);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1)
        songIndex = 0;
    loadSong(songIndex);
    playSong();
}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement; // extracting info from e
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    drawArc(progressPercent / 100);     // updaing the lenght of the rotating arc
}
function setProgress(e) {
    const width = clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
function updateVolume(change) {
    volume += 0.1 * change;
    volume = Math.min(1, Math.max(0, volume));
    audio.volume = volume;

    // Visuals
    let volumeSlider = document.querySelector('.volume-slider');
    volumeSlider.style.width = volume * 100 + '%';
    let volumeSliderContainer = document.querySelector('.volume-slider-container');

    if (animating == true)
        return;
    animating = true;
    volumeSliderContainer.style.opacity = 1;
    let fade = setInterval(() => {
        animating = false;
        volumeSliderContainer.style.opacity = 0;
    }, 4000);
}


