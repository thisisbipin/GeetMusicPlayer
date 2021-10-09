
let songs = [];
let songsLOC = [];


let dir = 'musics/'
let songIndex = 2;
let volume = 0.5;
let animating = false;
let musicContainer = document.getElementById('music-container-ID');
let imageContainer = document.querySelector('.img-container');
let playBtn = document.querySelector('#play');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');
let audio = document.querySelector('#audio'); audio.volume = volume;
let progress = document.querySelector('.progress');
let progressContainer = document.querySelector('.progress-container');
let title = document.querySelector('#title');
let cover = document.querySelector('#cover');
let clientWidth = document.querySelector('.progress-container').clientWidth;
let arcCanvas = document.getElementById("myCanvas");
let browseHandler = document.createElement('input');



/* Event Listeners */
playBtn.addEventListener('click', () => {
    const isplaying = musicContainer.classList.contains('play');
    if (isplaying)
        pauseSong();
    else
        playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);




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




/* ----------- This function generates the list of the songs and loads their names into the windows -------------- */
function generateSongsList() {
    let list = document.getElementById('list');
    for (let i = 0; i < songs.length; i++) {
        let newname = document.createElement('li');
        newname.textContent = songs[i];
        newname.setAttribute('onclick', 'loadSong(' + i + '); playSong();');
        list.appendChild(newname);
    }
    browseHandler.type = 'file';
    browseHandler.id = 'browseID';
    browseHandler.classList.add("browse-button");
    browseHandler.setAttribute('onchange', 'inputchanged()');
    browseHandler.filename = 'file';
    list.appendChild(browseHandler);
}
function addsongtolist(songSRC){
    let list = document.getElementById('list');
    let newname = document.createElement('li');
    newname.textContent = songs[songs.length - 1];
    newname.setAttribute('onclick', 'loadSong(' + (songs.length - 1) + ',url = \"'+ songSRC +'\"); playSong();');
    list.appendChild(newname);
}

function inputchanged() {
    let newsong = browseHandler.files[0];

    let ext = newsong.name.substr(newsong.name.length - 4);
    if (ext == '.mp3' || ext == '.wav') {
        songs.push(newsong.name.substr(0, newsong.name.length - 4));
        let songSRC = URL.createObjectURL(newsong);
        addsongtolist(songSRC);
    } else
        alert('Not a song file! Please select a valid song file');
}


/* --- This function is responsible for the showing/hiding of the song menu ------ */
let img = document.getElementById('music-icon')
img.setAttribute('onclick', 'toggle()');
function toggle() {
    let songList = document.getElementById('song-list-id');
    if (songList.style.opacity == '0') {
        songList.style.opacity = 1;
        songList.style.display = 'block';
    }
    else {
        songList.style.opacity = 0;
        songList.style.display = 'none';
    }
}




/* --------------- The real execution starts here ------------------ */


// modify this list to add your own wallpapers and select them randomly 
let imageloc = [
    'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
];

const wallpapers = [];
let number = Math.floor(Math.floor(Math.random() * (imageloc.length + 1)));
let body = document.getElementById("body");
let css = `background-image: url(\"${imageloc}\") ; height:${window.innerHeight}px; width: ${window.innerWidth}px;`;
document.body.setAttribute("style", css );




const serverID = './';
fetch(serverID+'lists.txt')
    .then(response => response.text())
    .then(text => {
        // console.log(text);
        let namer = '';
        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                // console.log(namer);
                if (namer.length >= 3)
                    songs.push(namer);
                namer = '';
            }
            namer += text[i];
        }
        loadSong(0);
        generateSongsList();
    })

function loadSong(songnewIndex,url) {
    songIndex = songnewIndex;
    title.innerText = songs[songnewIndex];
    if (url == undefined)
        audio.src = `${dir}/${songs[songnewIndex]}.mp3`;
    else
        audio.src = url;
    cover.src = `music-logo.jpg`;
}




// press space to play
document.addEventListener('keydown', (event) => {
    const isplaying = musicContainer.classList.contains('play');
    // console.log(even t.key);
    if (event.key == ' ') {
        arcCanvas.focus()
        if (isplaying)
            pauseSong();
        else
            playSong();
        return;
    } else if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
        let sign = (event.key == 'ArrowUp') ? 1 : -1;
        updateVolume(sign);
    }
});

// mouse wheel to control volume 
musicContainer.addEventListener("wheel", (e) => {
    let sign = (e.deltaY < 0) ? 1 : -1;
    updateVolume(sign);
})

var wave = new Wave();
wave.fromElement("audio", "audio_visual", {
    stroke: 2,
    type: "bars",
    colors: ["white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink"]//, "blue", "white"]
});
wave.fromElement("audio", "audio_visual-img", {
    stroke: 2,
    type: "web",
    colors: ["white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink"]//, "blue", "white"]
});
function changeResolution(canvas, scaleFactor) {
    // Set up CSS size.
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';

    // Resize canvas and scale future draws.
    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    var ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
}
let canvas = document.getElementById("audio_visual");
changeResolution(canvas, 1);



/* -------- arc drawing ---------- */
function drawArc(progressf) {
    var ctx = arcCanvas.getContext("2d");
    ctx.clearRect(0, 0, arcCanvas.width, arcCanvas.height);
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#711a94";
    ctx.arc(100, 100, 58, 0, progressf * 2 * Math.PI);
    ctx.stroke();
}

/* --- clock --- */
setInterval(() => {
    let today = new Date();
    document.getElementById("clock-id").textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}, 1000);
