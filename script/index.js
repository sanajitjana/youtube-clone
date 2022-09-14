//take btn
let search_btn = document.querySelector("#search-btn");
let search_input = document.querySelector("#search-input");
let body = document.querySelector("body");
let selectSort = document.querySelector("#video-sorting");

//event for searching events
search_btn.addEventListener("click", function (event) {
  let query = document.querySelector("#search-input").value;
  searchFunc(query);
});
search_input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let query = document.querySelector("#search-input").value;
    searchFunc(query);
  }
});
window.onload = () => {
  searchFuncOnLoad();
};
let sortData = null;
selectSort.addEventListener("change", function () {
  sort(sortData);
});

//get serach data
let searchFunc = async (query) => {
  let data = await getData(query);
  displayVideos(data);
  sortData = data;
};

// cURL: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=IN&key=[YOUR_API_KEY]'

//api fetch
let getData = async (query) => {
  //  AIzaSyBtQjhGmZDsOzselALsD7tbmjj4LNgw_Bg;
  let data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyDQvEF9PuhdW3JJM28VQZXQGOo84iYvd-Q`
  );
  let val = await data.json();
  return val.items;
};

//get serach data
let searchFuncOnLoad = async (query) => {
  let data = await getData(query);
  displayVideos(data);
  sortData = data;
};

//Onload api fetch
let getDataOnLoad = async () => {
  let data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&regionCode=IN&maxResults=50&key=AIzaSyAn8h71VOzmap8ve9kxoCHqKoE_T79ADD8`
  );
  let val = await data.json();
  return val.items;
};

//display videos
let displayVideos = (data) => {
  let videos_container = document.querySelector("#videos-container");
  videos_container.innerHTML = "";

  if (!data) return;

  data.forEach((element) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.addEventListener("click", (event) => {
      saveVideo(element);
    });

    let thumbnail = document.createElement("img");
    thumbnail.src = element.snippet.thumbnails.medium.url;
    thumbnail.setAttribute("class", "thumbnail");

    let title = document.createElement("h3");
    title.innerText = element.snippet.title;
    title.setAttribute("class", "title");

    card.append(thumbnail, title);
    videos_container.append(card);
  });
};

// save vide in localStorage
let saveVideo = (element) => {
  localStorage.setItem("video", JSON.stringify(element));
  window.location.href = "./video.html";
};

let sort = (data) => {
  let select = document.getElementById("video-sorting");
  if (!data) return;

  let sortingData = data.sort((a, b) => {
    let date1 = new Date(a.snippet.publishedAt.slice(0, 10));
    let date2 = new Date(b.snippet.publishedAt.slice(0, 10));

    if (select.value == "nf") {
      return date1 - date2;
    } else if (select.value == "of") {
      return date2 - date1;
    }
  });
  displayVideos(sortingData);
};
