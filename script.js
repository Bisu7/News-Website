
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "in";
const options = [
  "general",
  "technology",
  "health",
  "science",
  "entertainment",
  "sports",
];


let requestURL;


const UI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="image-container">
    <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="content">
      <div class="title">
        ${item.title}
      </div>
      <div class="description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};


const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  UI(data.articles);
};


const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};


const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};