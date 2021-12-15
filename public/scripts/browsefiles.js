let G__browse = {
  songsList: [
    {
      name: "Koi Shor - Shirley Setia 320Kbps",
      url: "./test/Koi Shor - Shirley Setia 320Kbps.mp3",
    },
    {
      name: "KYA PHOOL CHADHAU MAIN PRABHU KE CHARANO MAIN __ H",
      url: "test/KYA PHOOL CHADHAU MAIN PRABHU KE CHARANO MAIN __ H.mp3",
    },
    {
      name: "JKB",
      url: "./test/JKB.mp3",
    },
  ],
};
export function handleFileSelect() {
  console.log("I trigerred");
  let supportedEXT = [".mp3", ".wav"];
  let want_to_alert = false;

  // If selected from the files
  let browseHandlerFile = document.getElementById("browse-file");

  for (let i = 0; i < browseHandlerFile.files.length; i++) {
    let newsong = browseHandlerFile.files[i];
    let ext = newsong.name.substr(newsong.name.length - 4);

    if (supportedEXT.find((e) => e == ext) != undefined) {
      let newsongname = newsong.name.substr(0, newsong.name.length - 4);
      if (G__browse.songsList.find((s) => s == newsongname) == undefined) {
        G__browse.songsList.push({
          name: newsongname,
          url: URL.createObjectURL(newsong),
        });
      } else alert("Song is already in the list");
    } else want_to_alert = true;
  }
  if (want_to_alert == true)
    alert(
      "You Selected some non-song files! That was not added to the list. Please select valid song files only"
    );

  console.log(G__browse.songsList);
}

export function getSongs() {
  return G__browse.songsList;
}
