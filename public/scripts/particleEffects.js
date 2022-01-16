let isParticlesVisible = true;
export function handleToggleParticles(isallowed = true) {
  isParticlesVisible = !isParticlesVisible;
  if (isParticlesVisible == true)
    particlesJS.load(
      "particles-js",
      "public/assets/particles.json",
      function () {
        console.log("callback - particles.js config loaded");
      }
    );
  else
    particlesJS.load(
      "particles-js",
      "public/assets/particles-empty.json",
      function () {
        console.log("callback - particles.js config loaded");
      }
    );
  return isallowed;
}
