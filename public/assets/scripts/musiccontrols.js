import "./browsefiles.js";
import { getSongs } from "./browsefiles.js";

let songsList = getSongs();
let G__music = {
  isplaying: false,
  progresspercent: 0,
  volume: 0.5,
  isloaded: false,
  currentplayingindex: 0,
};
let audio = document.querySelector("#audio");

export let songfunctions = {
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
    songfunctions.loadSong();

    // Reset the bars
    G__music.progresspercent = 0;
    $(".playercontrols__progressbar__progress").width("0%");

    if (G__music.isplaying === true) songfunctions.playSong();
  },
};

let updateFunctions = {
  updateProgress: (e) => {
    if (G__music.isloaded == false) return;
    let currSongDuration = audio.duration;
    const { currentTime } = e.srcElement; // extracting info from e
    let progressPercent = (currentTime / currSongDuration) * 100;
    $(".playercontrols__progressbar__progress").width(progressPercent + "%");
  },

  setProgress: () => {
    audio.currentTime =
      audio.duration * (G__music.progresspercent / 100).toFixed(2);
  },
};

audio.volume = G__music.volume;
audio.addEventListener("timeupdate", updateFunctions.updateProgress);
audio.addEventListener("ended", () => songfunctions.changeSong("next"));

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
  updateFunctions.setProgress();
});

$("#next").on("click", () => songfunctions.changeSong("next"));
$("#prev").on("click", () => songfunctions.changeSong("prev"));
