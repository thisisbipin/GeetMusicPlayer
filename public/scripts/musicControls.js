/* --------------- MUSIC CONTROLS ------------- */
function playSong() {
    $('#music-container-ID').addClass('play');
    $('#play') > $('i.play-button').removeClass('fa-play');
    $('#play') > $('i.play-button').addClass('fa-pause');
    audio.play();

    $('#progress-rotation-id').addClass("rotation");
}
function pauseSong() {
    $('#music-container-ID').removeClass('play');
    $('#play') > $('i.play-button').removeClass('fa-pause');
    $('#play') > $('i.play-button').addClass('fa-play');
    audio.pause();

    $('#progress-rotation-id').addClass("rotation");
}
function prevSong() {
    G.songIndex--;
    if (G.songIndex < 0)
        G.songIndex = G.songsList.length - 1;
    loadSong(G.songIndex);
    playSong();
}
function nextSong() {
    G.songIndex++;
    if (G.songIndex > G.songsList.length - 1)
        G.songIndex = 0;
    loadSong(G.songIndex);
    playSong();
}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement; // extracting info from e
    const progressPercent = (currentTime / duration) * 100;
    $('.progress').width = `${progressPercent}%`;

    drawArc(progressPercent / 100);     // updaing the lenght of the rotating arc
}
function setProgress(e) {
    const width = $('.progress-container').innerWidth();
    const clickX = e.originalEvent.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


function updateVolume(change) {
    G.volume += 0.1 * change;
    G.volume = Math.min(1, Math.max(0, G.volume));
    audio.volume = G.volume;

    // Visuals
    $('.volume-slider').width(G.volume * 100 + '%');

    if (G.isanimating == true)
        return;
    G.isanimating = true;

    $('.volume-slider-container').css('opacity', '1');
    let fade = setInterval(() => {
        G.isanimating = false;
        $('.volume-slider-container').css('opacity', '0');
    }, 4000);
}


