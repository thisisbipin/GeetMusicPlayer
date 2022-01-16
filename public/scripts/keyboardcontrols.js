import { volumeFunctions } from "./musiccontrols.js";
// press space to play
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      if (document.activeElement.id == "play") return;
      $("#play-btn").click();
      return;

    case "ArrowUp":
    case "ArrowDown":
      let sign = event.key == "ArrowUp" ? 1 : -1;
      volumeFunctions.updateVolume(sign);
      break;

    case ".":
      $("#settings-icon").click();
      break;

    case "h":
      $("#info-icon").click();
      break;
    case "m":
      $("#volume-btn").click();
      break;
    default:
      return;
  }
});

// mouse wheel to control volume
$("#volume-btn").on("wheel", (e) => {
  let sign = e.originalEvent.deltaY > 0 ? -1 : 1;
  volumeFunctions.updateVolume(sign);
});
