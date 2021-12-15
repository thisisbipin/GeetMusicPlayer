let G__background = {
  bgList: [
    "./public/assets/default-bg.jpg",
    "https://wallpapercave.com/wp/wp4469539.jpg",
    "https://wallpapercave.com/wp/wp10343417.jpg",
  ],
  currentidx: 0,
};

export function updateImage(i) {
  G__background.currentidx += i;
  if (G__background.currentidx < 0)
    G__background.currentidx = G__background.bgList.length - 1;
  if (G__background.currentidx >= G__background.bgList.length)
    G__background.currentidx = 0;

  $("body")
    .get(0)
    .style.setProperty(
      "--background-url",
      `url(${G__background.bgList[G__background.currentidx]})`
    );
}
export function handleToggleDull() {
  $(".background-dull").toggle();
}
