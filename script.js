/*
    ---- Geet Music player -----
    Author: Bipin Jadav 🎶
    License: MIT 📚 

*/

let songs = [];
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
let browseHandlerFolder = document.getElementById('browse-Folder');
let browseHandlerFile = document.getElementById('browse-File');



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





/* ----------- This function generates the list of the songs and loads their names into the windows -------------- */
function generateSongsList() {
    let list = document.getElementById('list');
    for (let i = 0; i < songs.length; i++) {
        let newname = document.createElement('li');
        newname.textContent = songs[i];
        newname.setAttribute('onclick', 'loadSong(' + i + '); playSong();');
        list.appendChild(newname);
    }
}
function addsongtolist(songSRC) {
    let list = document.getElementById('list');
    let newname = document.createElement('li');
    newname.textContent = songs[songs.length - 1];
    newname.setAttribute('onclick', 'loadSong(' + (songs.length - 1) + ',url = \"' + songSRC + '\"); playSong();');
    list.appendChild(newname);
}

function inputchanged(folder = false) {
    let want_to_alert = false;
    if (folder == true) {

        // If selected from the folder

        for (let i = 0; i < browseHandlerFolder.files.length; i++) {
            let newsong = browseHandlerFolder.files[i];
            let ext = newsong.name.substr(newsong.name.length - 4);
            if (ext == '.mp3' || ext == '.wav') {
                newsongname = newsong.name.substr(0, newsong.name.length - 4)
                if (songs.find(s => s == newsongname) == undefined) {
                    songs.push(newsongname);
                    let songSRC = URL.createObjectURL(newsong);
                    addsongtolist(songSRC);
                }
            } else
                want_to_alert = true;
        }
        if (want_to_alert == true)
            alert('You Selected some non-song files! That was not added to the list. Please select valid song files only');

    } else {

        // If selected from the files

        for (let i = 0; i < browseHandlerFile.files.length; i++) {
            let newsong = browseHandlerFile.files[i];
            let ext = newsong.name.substr(newsong.name.length - 4);
            if (ext == '.mp3' || ext == '.wav') {
                newsongname = newsong.name.substr(0, newsong.name.length - 4)
                if (songs.find(s => s == newsongname) == undefined) {
                    songs.push(newsongname);
                    let songSRC = URL.createObjectURL(newsong);
                    addsongtolist(songSRC);
                }
                else
                    alert('Song is already in the list');
            } else
                want_to_alert = true;
        }
        if (want_to_alert == true)
            alert('You Selected some non-song files! That was not added to the list. Please select valid song files only');
    }
    if (songs.length > 0) { loadSong(0); }
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
    'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
    // For adding wallpapers add the Photo URLs below this line

];

let number = 0;     //provide custom number for wallpaper
// number = Math.floor(Math.floor(Math.random() * (imageloc.length)));  // comment out this line if you do not want random images from the list
let body = document.getElementById("body");
if (imageloc[number] == undefined)
    alert('The wallpaper according to the number do not exist.')
let css = `background-image: url(\"${imageloc}\") ; height:${window.innerHeight}px; width: ${window.innerWidth}px;`;
document.body.setAttribute("style", css);

browseHandlerFile.setAttribute('onchange', 'inputchanged()');
browseHandlerFolder.setAttribute('onchange', 'inputchanged(true)');


// # TODO server Mode
// const serverID = './';
// fetch(serverID+'lists.txt')
//     .then(response => response.text())
//     .then(text => {
//         // console.log(text);
//         let namer = '';
//         for (let i = 0; i < text.length; i++) {
//             if (text[i] == '\n') {
//                 // console.log(namer);
//                 if (namer.length >= 3)
//                     songs.push(namer);
//                 namer = '';
//             }
//             namer += text[i];
//         }
//         loadSong(0);
//         generateSongsList();
//     })




function loadSong(songnewIndex, url) {
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
    let time = {
        hrs: (today.getHours() < 10) ? "0" + today.getHours() : today.getHours(),
        min: (today.getMinutes() < 10) ? "0" + today.getMinutes() : today.getMinutes(),
        sec: (today.getSeconds() < 10) ? "0" + today.getSeconds() : today.getSeconds(),
    }
    document.getElementById("clock-id").textContent = time.hrs + ":" + time.min + ":" + time.sec;
}, 1000);
