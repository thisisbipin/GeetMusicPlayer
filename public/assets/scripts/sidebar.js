import { getSongs } from "./browsefiles.js";
import { songfunctions } from "./musiccontrols.js";
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
