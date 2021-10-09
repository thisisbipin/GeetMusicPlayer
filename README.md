<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.comthisisbipin/GeetMusicPlayer">
    <img src="https://github.com/thisisbipin/GeetMusicPlayer/blob/master/public/src/music-logo.jpg" alt="Logo" width="200" height="200">
  </a>

<h3 align="center"> गीत Music Player</h3>
  <p align="center">
    A simple music player and audio visualizer
    <br /><br />
    <a href="https://github.com/thisisbipin/GeetMusicPlayer"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://thisisbipin.github.io/GeetMusicPlayer/">View Deployment</a>
    ·
    <a href="https://github.com/thisisbipin/GeetMusicPlayer/issues">Request Feature</a>
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## 📝About The Project

<br />
This is a simple website app for visualizing your audio clips. You can just lauch the site play the audio. It is made using simple Vanilla JS and HTML. Do star⭐ the repo if you like it 😊.

<p align="right">(<a href="#top">⬆️</a>)</p>



### 🛠Built With

* 🌐 &nbsp; Web </br>
  ![HTML5](https://img.shields.io/badge/-HTML5-333333?style=flat&logo=HTML5)
  ![CSS](https://img.shields.io/badge/-CSS-333333?style=flat&logo=CSS3&logoColor=1572B6)
  ![JAVASCRIPT](https://img.shields.io/badge/-JS-333333?style=flat&logo=javascript)
* 🧾&nbsp; Modules </br>
  [WaveJs](https://github.com/foobar404/Wave.js/)

<p align="right">(<a href="#top">⬆️</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

You can just visit the [गीत Music Player](https://thisisbipin.github.io/GeetMusicPlayer/) page for using this app.
### Prerequisites

There is no such complicated prerequisites for using this app except for `using modern browsers`.

### ⚙Installation
If you want to get a local copy of this app.
1. Clone the repo
   ```sh
   git clone https://github.com/thisisbipin/GeetMusicPlayer.git
   ```
2. Navigate to the folder `GeetMusicPlayer`
   ```sh
   cd GeetMusicPlayer
   ```
3. Either double click the `index.html` file or 
   ```sh
   firefox index.html # or use the command name for your browser
   ```

<p align="right">(<a href="#top">⬆️</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
<div id="docs"></div>
You can edit some parts of the player by yourself <br /><br />
1. Like changing the background<br />
   Open the file `script.js` and search for the following lines
   
   ```js
    
    let imageloc = [
    '<SOME URL HERE>',
    // For adding wallpapers add the Photo URLs below this line

    ];

    let number = 1;     //provide custom number for wallpaper
    let number = Math.floor(Math.floor(Math.random() * (imageloc.length + 1)));  // comment out this line if you do not want random images from the list
    let body = document.getElementById("body");
   ```
   and Paste your Photo URL in the space provided in quotes. <br />
   For eg. if your URL is `myphotos/example.jpg` the you need to add the line like this `'myphotos/example.jpg'`
   <br /><br />
2. If you want to change the visualisation of the audio you can search for the lines<br />
   
   ```js
   
    var wave = new Wave();

    wave.fromElement("audio", "audio_visual", {
        stroke: 2,
        type: "bars",
        colors: [/*  some colors here */]
    });

    wave.fromElement("audio", "audio_visual-img", {
        stroke: 2,
        type: "web",
        colors: [/*  some colors here */]
    });
   ```
   and can change the parameters according to [this](https://foobar404.github.io/Wave.js/#/docs) doc.

<p align="right">(<a href="#top">⬆️</a>)</p>



<!-- CONTRIBUTING -->
## 🤝Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this app better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<p align="right">(<a href="#top">⬆️</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">⬆️</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@thisisbipin](https://twitter.com/thisisbipin)

Project Link: [https://github.com/thisisbipin/GeetMusicPlayer/](https://github.com/thisisbipin/GeetMusicPlayer/)

<p align="right">(<a href="#top">⬆️</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Thanks [foobar404](https://github.com/foobar404/) ! for making the wonderful [Wave.js](https://github.com/foobar404/Wave.js/) module.
* Thanks Sister😛 for giving me the idea of this project.
* Thank you all🤗 for trying out this app.

<p align="right">(<a href="#top">⬆️</a>)</p>