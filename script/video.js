window.onload = () => {
  // fetech data from LS
  let video = JSON.parse(localStorage.getItem("video")) || [];
  displayVideos(video);
};

let displayVideos = (data) => {
  if (!data) return;
  let iframe = document.querySelector("iframe");
  iframe.src = `https://www.youtube.com/embed/${data.id.videoId}`;

  let title = document.querySelector("#title");
  title.innerText = data.snippet.title;

  let views = document.querySelector("#views");
  views.innerText = "6,120,767 views • Oct 17, 2021";
};
