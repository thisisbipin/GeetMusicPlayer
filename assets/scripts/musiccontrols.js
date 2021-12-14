let G__music = {
  isplaying: false,
  progresspercent: 0,
  volume: 0.5,
  isloaded: false,
  currentplayingindex: 1,
};
let songsList = [
  {
    name: "Koi Shor - Shirley Setia 320Kbps",
    url: "./test/Koi Shor - Shirley Setia 320Kbps.mp3",
  },
  {
    name: "KYA PHOOL CHADHAU MAIN PRABHU KE CHARANO MAIN __ H",
    url: "test/KYA PHOOL CHADHAU MAIN PRABHU KE CHARANO MAIN __ H.mp3",
  },
  {
    name: "JKB",
    url: "./test/JKB.mp3",
  },
];
let audio = document.querySelector("#audio");

let songfunctions = {
  loadSong: () => {
    let song = songsList[G__music.currentplayingindex];
    $("#title").text(song.name);
    audio.src = song.url;
    audio.onloadedmetadata = function () {
      G__music.isloaded = true;
    };
  },

  playSong: () => {
    audio.play();
    G__music.isplaying = true;
  },

  pauseSong: () => {
    audio.pause();
    G__music.isplaying = false;
  },

  changeSong: (idx) => {
    if (idx == "prev")
      G__music.currentplayingindex =
        G__music.currentplayingindex - 1 < 0
          ? songsList.length - 1
          : G__music.currentplayingindex - 1;
    else if (idx == "next")
      G__music.currentplayingindex =
        (G__music.currentplayingindex + 1) % songsList.length;
    else G__music.currentplayingindex = idx;
    console.log(G__music.currentplayingindex);
    songfunctions.loadSong();
    songfunctions.playSong();
  },
};

audio.volume = G__music.volume;
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", () => songfunctions.changeSong("next"));

songfunctions.loadSong(G__music.currentplayingindex);

$("#play-btn").on("click", () => {
  $("#play-btn").children("i").toggleClass("fa-play");
  $("#play-btn").children("i").toggleClass("fa-pause");

  if ($("#play-btn").children("i").hasClass("fa-play") === true) {
    songfunctions.pauseSong();
  } else {
    songfunctions.playSong();
  }
});

$(".playercontrols__progressbar").on("click", (e) => {
  let progresswidth = $(".playercontrols__progressbar").width();
  G__music.progresspercent =
    (1 - (progresswidth - e.offsetX) / progresswidth) * 100;
  setProgress();
});

$("#next").on("click", () => songfunctions.changeSong("next"));
$("#prev").on("click", () => songfunctions.changeSong("prev"));

function updateProgress(e) {
  if (G__music.isloaded == false) return;
  let currSongDuration = audio.duration;
  const { currentTime } = e.srcElement; // extracting info from e
  let progressPercent = (currentTime / currSongDuration) * 100;
  $(".playercontrols__progressbar__progress").width(progressPercent + "%");
}

function setProgress() {
  audio.currentTime =
    audio.duration * (G__music.progresspercent / 100).toFixed(2);
}
