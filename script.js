import { handleFileSelect } from "./public/scripts/browsefiles.js";
import "./public/scripts/musiccontrols.js";
import "./public/scripts/sidebar.js";
import { updateSonglist } from "./public/scripts/sidebar.js";
// import "./public/assets/scripts/background.js";
import { updateImage } from "./public/scripts/background.js";
import "./public/scripts/keyboardcontrols.js";
// Delete this line on release - kyuki test ke liye hai bas
updateSonglist();

$("#browse-file").change(() => {
  handleFileSelect();
  updateSonglist();
});

// rotating the settings icon on click
$("#settings-icon").on("click", () => {
  $("#settings-icon").toggleClass("settings-icon-rotate");
});

updateImage(0);
