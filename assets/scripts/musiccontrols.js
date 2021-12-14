let G__music = {
  isplaying: false,
  playpercent: 0,
};

$("#play-btn").on("click", () => {
  $("#play-btn").children("i").toggleClass("fa-play");
  $("#play-btn").children("i").toggleClass("fa-pause");

  if ($("#play-btn").children("i").hasClass("fa-play") === true)
    G__music.isplaying = false;
  else G__music.isplaying = true;
});

$(".playercontrols__progressbar").on("click", (e) => {
  $(".playercontrols__progressbar__progress").width(e.offsetX + "px");
  let progresswidth = $(".playercontrols__progressbar").width();
  G__music.playpercent = 1 - (progresswidth - e.offsetX) / progresswidth;
});
