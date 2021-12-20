import { handleFileSelect } from "./public/scripts/browsefiles.js";
import "./public/scripts/musiccontrols.js";
import "./public/scripts/sidebar.js";
import { updateSonglist } from "./public/scripts/sidebar.js";
import { updateImage } from "./public/scripts/background.js";
import "./public/scripts/keyboardcontrols.js";
import "./public/scripts/visualizations.js";
import "./public/scripts/checkboxes.js";
// Delete this line on release - kyuki test ke liye hai bas
updateSonglist();

$("#browse-file").change(() => {
  handleFileSelect();
  updateSonglist();
});

// rotating the settings icon on click
$("#settings-icon").on("click", () => {
  $("#sidebar").toggleClass("hide");
  $("#settings-icon").toggleClass("settings-icon-rotate");
});

// Alingments os showing and hiding windows
$("#settings-icon").click(); // just temporarily
$(".info-container").hide();
$("#info-icon").on("click", () => {
  $(".info-container").toggle();
});
updateImage(0);
