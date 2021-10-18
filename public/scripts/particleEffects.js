
function loadParticles(isallowed = true) {
    if (isallowed == true)
        particlesJS.load('particles-js', 'public/assets/particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    else
        particlesJS.load('particles-js', 'public/assets/particles-empty.json', function () {
            console.log('callback - particles.js config loaded');
        });

}
