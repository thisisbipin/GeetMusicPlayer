import { handleToggleDull, updateImage } from "./background.js";
import { getSongs } from "./browsefiles.js";
import { songfunctions } from "./musiccontrols.js";
import { loadParticles } from "./particleEffects.js";
$("#settings-icon").on("click", () => {
  $("#sidebar").toggleClass("hide");
});

export function updateSonglist() {
  let songsList = getSongs();
  let handleofUL = document.getElementById("sidebar__songlist__ul");
  handleofUL.innerHTML = "";
  songsList.map((song) => {
    let li = document.createElement("li");
    li.className = "sidebar__songslist__songname-title";

    li.onclick = () => songfunctions.changeSong(songsList.indexOf(song));
    li.textContent = "❥ " + song.name;
    li.id = "song-" + songsList.indexOf(song);
    handleofUL.appendChild(li);
  });
}

$("#prev-wallpaper").on("click", () => updateImage(-1));
$("#next-wallpaper").on("click", () => updateImage(1));

loadParticles();
$("#particle-checkbox").change(function () {
  if (this.checked) {
    loadParticles();
  } else loadParticles(false);
});

$("#background-dull-checkbox").change(() => handleToggleDull());
