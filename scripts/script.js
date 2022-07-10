// const BASE_KEY = "api.giphy.com/v1/gifs/translate";
const API_KEY = "XH8ZXv4wmhkaHOihi4pCIy3eWDSjvJ0Q";
// const urlAPI = `${BASE_KEY}?api_key=${API_KEY}&s=${searchInput}`;

// API for specified search button
const specifiedSearch = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=`;

// API for random search button
const randomSearch = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

const form = document.querySelector(".form");

const generateButton = document.querySelector(".buttons__item--generate");
const randomButton = document.querySelector(".buttons__item--random");

const gifContent = document.querySelector(".gif__content");
const image = document.querySelector(".gif__image");

const gifContainer = document.querySelector(".gif__container");

// Create a function that a function to generate a random number

function createRandomNum(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return randomNumber;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const clickedEl = e.submitter;
  if (generateButton === clickedEl) {
    const inputValue = e.target.search.value;
    const specifiedSearchURL = specifiedSearch + inputValue;

    // Pull data from API using axios

    axios
      .get(specifiedSearchURL)
      .then((response) => {
        clearImageElement();
        const gifArray = response.data.data;
        const randomGif = gifArray[createRandomNum(gifArray)];
        createImageElement(randomGif.images.original.url);
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
        const errorElement = document.createElement("p");
        errorElement.classList.add("gif__error");
        errorElement.innerText = "Vibe not found";
        const errorEmoji = document.createElement("img");
        errorEmoji.classList.add("gif__emoji");
        errorEmoji.setAttribute("src", "./assets/icons/woozy-face2.png");

        clearImageElement();
        gifContainer.appendChild(errorElement);
        gifContainer.appendChild(errorEmoji);
        e.target.reset();
      });
  } else if (randomButton === clickedEl) {
    axios.get(randomSearch).then((response) => {
      clearImageElement();
      const gifURL = response.data.data.images.original.url;
      createImageElement(gifURL);
    });
  }
});

//Bug right here
function clearImageElement() {
  gifContainer.innerHTML = "";
  console.log(gifContainer);
}

function createImageElement(url) {
  const newImageElement = document.createElement("img");
  newImageElement.classList.add("gif__image");
  newImageElement.setAttribute("src", url);
  gifContainer.prepend(newImageElement);
}
