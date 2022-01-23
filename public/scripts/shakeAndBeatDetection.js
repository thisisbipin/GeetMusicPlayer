let beatStatus = {
  isShakeEnabled: true,
};

export function handleVisualizerShake() {
  if (beatStatus.isShakeEnabled === true)
    $("#bar-visualizer").toggleClass("shake");
}
export function setVisualizerShake(to) {
  if ($(to.target).hasClass("fa-regular") === true)
    beatStatus.isShakeEnabled = true;
  else beatStatus.isShakeEnabled = false;
}
