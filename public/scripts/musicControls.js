/* --------------- MUSIC CONTROLS ------------- */

function loadSong(idx, url) {
    songIndex = idx;
    title.innerText = G.songsList[idx];
    if (url == undefined)
        audio.src = G.songsSRC[idx];
    else
        audio.src = url;

    audio.onloadedmetadata = function () {
        G.isloaded = true;
    }
}


function playSong() {
    $('#music-container-ID').addClass('play');
    $('#play') > $('i.play-button').removeClass('fa-play');
    $('#play') > $('i.play-button').addClass('fa-pause');
    audio.play();
    G.isplaying = true;
    $('#progress-rotation-id').addClass("rotation");
}
function pauseSong() {
    $('#music-container-ID').removeClass('play');
    $('#play') > $('i.play-button').removeClass('fa-pause');
    $('#play') > $('i.play-button').addClass('fa-play');
    audio.pause();
    G.isplaying = false;
    $('#progress-rotation-id').removeClass("rotation");
}
function prevSong() {
    document.activeElement.id = 'play';
    G.songIndex--;
    if (G.songIndex < 0)
        G.songIndex = G.songsList.length - 1;
    loadSong(G.songIndex);
    playSong();
}
function nextSong() {
    document.activeElement.id = 'play';
    G.songIndex++;
    if (G.songIndex > G.songsList.length - 1)
        G.songIndex = 0;
    loadSong(G.songIndex);
    playSong();
}
function updateProgress(e) {
    if (G.isloaded == false)
        return;
    let currSongDuration = audio.duration;
    const { currentTime } = e.srcElement; // extracting info from e
    let progressPercent = (currentTime / currSongDuration) * 100;
    $('.progress').width(progressPercent + '%');
    drawArc(progressPercent);     // updaing the lenght of the rotating arc
};

function setProgress(e) {
    const width = $('.progress-container').innerWidth();
    const clickX = e.originalEvent.offsetX;
    const duration = audio.duration;
    let p = (clickX / width) * duration;
    console.log(p);
    audio.currentTime = p.toFixed(2);
}


function updateVolume(change) {
    G.volume += 0.1 * change;
    G.volume = Math.min(1, Math.max(0, G.volume));
    audio.volume = G.volume;

    // Visuals
    $('.volume-slider').width(G.volume * 100 + '%');

    if (G.isplaying == true)
        return;
    G.isplaying = true;

    $('.volume-slider-container').css('opacity', '1');
    let fade = setInterval(() => {
        G.isplaying = false;
        $('.volume-slider-container').css('opacity', '0');
    }, 4000);
}


