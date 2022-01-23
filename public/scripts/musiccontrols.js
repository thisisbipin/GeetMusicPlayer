import "./browsefiles.js";
import { getSongs } from "./browsefiles.js";

let songsList = getSongs();
export let G__music = {
  isplaying: false,
  progresspercent: 0,
  volume: 0.5,
  isloaded: false,
  currentplayingindex: 0,
  isshuffleon: false,
};
let audio = document.querySelector("#audio");
export let volumeFunctions = {
  updateVolume: (delta) => {
    G__music.volume += 0.1 * delta;
    G__music.volume =
      Math.round(Math.min(1, Math.max(0, G__music.volume)) * 10) / 10;
    audio.volume = G__music.volume;

    $(".volume-bar-progress").height(G__music.volume * 100 + "%");
  },
  toggleMute: () => {
    $("#volume-btn").toggleClass("fa-volume-up");
    $(".volume-bar-progress").toggle();
    $("#volume-btn").toggleClass("fa-volume-mute");
    $(audio).prop("muted", !$(audio).prop("muted"));
  },
};

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
    audio.play().catch(() => alert("Please load the song to play"));
    G__music.isplaying = true;
  },

  pauseSong: () => {
    audio.pause();
    G__music.isplaying = false;
  },
  toggleSongPlay: () => {
    $("#play-btn").children("i").toggleClass("fa-play");
    $("#play-btn").children("i").toggleClass("fa-pause");

    $("#bar-visualizer").toggleClass("shake");

    if ($("#play-btn").children("i").hasClass("fa-play") === true) {
      songfunctions.pauseSong();
    } else {
      songfunctions.playSong();
    }
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

    if (G__music.isshuffleon == true) {
      let max = songsList.length - 1,
        min = 0;
      G__music.currentplayingindex = parseInt(
        Math.floor(Math.random() * (max - min + 1)) + min
      );
    }
    songfunctions.loadSong();

    // Reset the progress bar
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
  songfunctions.toggleSongPlay();
});

$("#shuffle-button").on("click", () => {
  G__music.isshuffleon = !G__music.isshuffleon;
  $("#shuffle-button").toggleClass("shuffle-on");
});
$(".playercontrols__progressbar").on("click", (e) => {
  if (G__music.isplaying === false) return;
  let progresswidth = $(".playercontrols__progressbar").width();
  G__music.progresspercent =
    (1 - (progresswidth - e.offsetX) / progresswidth) * 100;
  updateFunctions.setProgress();
});

$("#next").on("click", () => songfunctions.changeSong("next"));
$("#prev").on("click", () => songfunctions.changeSong("prev"));

// Volume
$("#volume-btn").hover(
  () => $(".volume-bar").removeClass("fade"),
  () => $(".volume-bar").addClass("fade")
);
$("#volume-btn").on("click", function () {
  volumeFunctions.toggleMute();
});
