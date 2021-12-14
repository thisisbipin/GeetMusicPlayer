import { handleFileSelect } from "./public/assets/scripts/browsefiles.js";
import "./public/assets/scripts/musiccontrols.js";
import { loadParticles } from "./public/assets/scripts/particleEffects.js";
import "./public/assets/scripts/sidebar.js";
import { updateSonglist } from "./public/assets/scripts/sidebar.js";
let GLOBALS = {
  isplaying: false,
};

// Delete this line on release - kyuki test ke liye hai bas
updateSonglist();

$("#browse-file").change(() => {
  handleFileSelect();
  updateSonglist();
});

loadParticles();
$("#particle-checkbox").prop("checked", true); // By default show it
$("#particle-checkbox").change(function () {
  if (this.checked) {
    loadParticles();
  } else loadParticles(false);
});
