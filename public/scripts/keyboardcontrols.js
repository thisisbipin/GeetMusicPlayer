import { volumeFunctions } from "./musiccontrols.js";
// press space to play
document.addEventListener("keydown", (event) => {
  if (event.key == " ") {
    if (document.activeElement.id == "play") return;
    $("#play-btn").click();
    return;
  } else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
    let sign = event.key == "ArrowUp" ? 1 : -1;
    volumeFunctions.updateVolume(sign);
  } else if (event.key == ".") {
    $("#settings-icon").click();
  }
});

// mouse wheel to control volume
$("#app-name").on("wheel", (e) => {
  let sign = e.originalEvent.wheelDelta < 0 ? -1 : 1;
  volumeFunctions.updateVolume(sign);
});
