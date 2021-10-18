/*
    ---- Geet Music player -----
    Author: Bipin Jadav 🎶
    License: MIT 📚 

*/

let G = {
    songsList: ['Alan walker Sky'],
    songsSRC: ['./public/musics/Alan walker Sky.mp3'],
    songIndex: 0,
    volume: 0.5,
    isplaying: false,
    isloaded: false,
    BGimages: [
        'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
        // For adding wallpapers add the Photo URLs below this line
        'https://wallpapercave.com/wp/wp2077495.jpg',
        './public/assets/img/bg.jpg'
    ],
    BGnumber: 1,     //provide custom number for wallpaper
}

let audio = document.querySelector('#audio');
audio.volume = G.volume;


/* Event Listeners */
$('#play').click(() => {
    // const isplaying = musicContainer.classList.contains('play');
    const isplaying = $('#music-container-ID').hasClass('play');
    if (isplaying)
        pauseSong();
    else
        playSong();
});
$('#prev').click(function () { prevSong(); });
$('#next').click(function () { nextSong(); })

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

$('.progress-container').click((e) => setProgress(e));






/* ----------- This function generates the list of the songs and loads their names into the windows -------------- */
function generateSongsList() {
    let list = document.getElementById('list');
    for (let i = 0; i < G.songsList.length; i++)
        addsongtolist(i);
}
function addsongtolist(idx) {
    let list = document.getElementById('list');
    let newname = document.createElement('li');
    newname.textContent = G.songsList[G.songsList.length - 1];
    newname.setAttribute('onclick', 'loadSong(' + idx + '); playSong();');
    list.appendChild(newname);
}

function inputchanged(folder = false) {
    console.log('I trigerred');
    let supportedEXT = ['.mp3', '.wav'];
    let want_to_alert = false;
    if (folder == true) {

        // If selected from the folder
        let browseHandlerFolder = document.getElementById('browse-folder')
        for (let i = 0; i < browseHandlerFolder.files.length; i++) {
            let newsong = browseHandlerFolder.files[i];
            let ext = newsong.name.substr(newsong.name.length - 4);
            if (supportedEXT.find(e => e == ext) != undefined) {
                newsongname = newsong.name.substr(0, newsong.name.length - 4)
                if (G.songsList.find(s => s == newsongname) == undefined) {

                    G.songsList.push(newsongname);
                    let songSRC = URL.createObjectURL(newsong);
                    G.songsSRC.push(songSRC);
                    addsongtolist(G.songsList.findIndex(song => song == newsongname));
                }
            } else
                want_to_alert = true;
        }
        if (want_to_alert == true)
            alert('You Selected some non-song files! That was not added to the list. Please select valid song files only');

    } else {

        // If selected from the files
        let browseHandlerFile = document.getElementById('browse-file')
        for (let i = 0; i < browseHandlerFile.files.length; i++) {
            let newsong = browseHandlerFile.files[i];
            let ext = newsong.name.substr(newsong.name.length - 4);
            if (supportedEXT.find(e => e == ext) != undefined) {
                newsongname = newsong.name.substr(0, newsong.name.length - 4)
                if (G.songsList.find(s => s == newsongname) == undefined) {

                    G.songsList.push(newsongname);
                    let songSRC = URL.createObjectURL(newsong);
                    G.songsSRC.push(songSRC);
                    addsongtolist(G.songsList.findIndex(song => song == newsongname));
                }
                else
                    alert('Song is already in the list');
            } else
                want_to_alert = true;
        }
        if (want_to_alert == true)
            alert('You Selected some non-song files! That was not added to the list. Please select valid song files only');
    }
    if (G.songsList.length > 0) { loadSong(0); }
}


/* --- This function is responsible for the showing/hiding of the song menu ------ */
// $('#music-icon').click(() => { $('#song-list-id').show(); console.log('clicked') })
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


function updateImage(i) {
    if (i == -1)
        G.BGnumber = Math.floor(Math.floor(Math.random() * (G.BGimages.length)));  // comment out this line if you do not want random images from the list
    else if (G.BGnumber + i >= G.BGimages.length)
        G.BGnumber = 0;
    else if (G.BGnumber + i < 0)
        G.BGnumber = G.BGimages.length - 1;
    else
        G.BGnumber += i;
    if (G.BGnumber)
        if (G.BGimages[G.BGnumber] == undefined)
            alert('The wallpaper according to the number do not exist.')

    let css = `background-image: url(\"${G.BGimages[G.BGnumber]}\") ; height:${window.innerHeight}px; width: ${window.innerWidth}px;`;
    document.body.setAttribute("style", css);

}

updateImage(0);
$('#browse-file').change(() => inputchanged());
$('#browse-folder').change(() => inputchanged(true));

loadSong(0);



// press space to play
document.addEventListener('keydown', (event) => {
    // console.log(even t.key);
    if (event.key == ' ') {
        if (document.activeElement.id == 'play')
            return;
        if (G.isplaying)
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
$('.music-container').on("wheel", (e) => {
    let sign = (e.originalEvent.wheelDelta < 0) ? -1 : 1;
    updateVolume(sign);
})

var wave = new Wave();

wave.fromElement("audio", "bar-visualizer", {
    stroke: 2,
    type: "bars",
    colors: ["white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink"]//, "blue", "white"]
});

wave.fromElement("audio", "web-visualizer", {
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
let canvas = document.getElementById("bar-visualizer");
changeResolution(canvas, 1);



/* -------- arc drawing ---------- */
function drawArc(progressf) {
    progressf = progressf / 100;
    let arcCanvas = document.getElementById('audio-canvas-img');
    let ctx = arcCanvas.getContext('2d');
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
