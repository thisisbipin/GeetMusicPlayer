import { handleFileSelect } from "./public/scripts/browsefiles.js";
import "./public/scripts/musiccontrols.js";
import { volumeFunctions } from "./public/scripts/musiccontrols.js";
import "./public/scripts/sidebar.js";
import { updateSonglist } from "./public/scripts/sidebar.js";
// import "./public/assets/scripts/background.js";
import { updateImage } from "./public/scripts/background.js";

// Delete this line on release - kyuki test ke liye hai bas
updateSonglist();

$("#browse-file").change(() => {
  handleFileSelect();
  updateSonglist();
});

// press space to play
document.addEventListener("keydown", (event) => {
  if (event.key == " ") {
    if (document.activeElement.id == "play") return;
    $("#play-btn").click();
    return;
  } else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
    let sign = event.key == "ArrowUp" ? 1 : -1;
    volumeFunctions.updateVolume(sign);
  }
});

// mouse wheel to control volume
$("#app-name").on("wheel", (e) => {
  let sign = e.originalEvent.wheelDelta < 0 ? -1 : 1;
  volumeFunctions.updateVolume(sign);
});

// rotating the settings icon on click
$("#settings-icon").on("click", () => {
  $("#settings-icon").toggleClass("settings-icon-rotate");
});

updateImage(0);
