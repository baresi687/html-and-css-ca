import {errorMessage} from "./handlers/message.js";

const sortFilms = document.querySelector("#sort");
const filterFilms = document.querySelector("#filter");
const filmElementContainer = document.querySelector(".film-elements");
const url = "https://hreinngylfason.site/cmsca/wp-json/wc/store/products/";
let ratings = [];

async function getFilms() {

  filmElementContainer.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await fetch(url);
    const responseJSON = await response.json();

    filmElementContainer.innerHTML = "";
    getSortedFilms(responseJSON)

    sortFilms.addEventListener("change", function (event) {
      filmElementContainer.innerHTML = "";
      ratings = [];
      const currentValue = event.target.value;

      if (currentValue === "rating") {
        responseJSON.sort((a,b) => (a.average_rating < b.average_rating) ? 1 : -1);
        getSortedFilms(responseJSON)
      }
      if (currentValue === "price") {
        responseJSON.sort((a,b) => a.prices.price - b.prices.price);
        getSortedFilms(responseJSON)
      }
      if (currentValue === "name") {
        responseJSON.sort((a,b) => (a.name > b.name) ? 1 : -1);
        getSortedFilms(responseJSON)
      }
      if (currentValue === "latest") {
        getFilms()
      }
    })

    filterFilms.addEventListener("keyup", function (event) {
      filmElementContainer.innerHTML = "";
      ratings = [];
      const currentValue = event.target.value.trim().toLowerCase();
      const renderedFilm = responseJSON.filter(function (arr) {
        return arr.name.toLowerCase().includes(currentValue);
      })
      getSortedFilms(renderedFilm);
    })

    function getSortedFilms(responseJSON) {
      responseJSON.forEach(function (item, index)  {
        const filmId = item.id;
        const priceSlice = item.prices.price;
        const price = priceSlice.slice(0, priceSlice.length - 2);
        const ratingSlice = item.average_rating;
        const ratingString = ratingSlice.slice(0, ratingSlice.length - 3);
        const rating = Number(ratingString);
        ratings.push(rating);

        filmElementContainer.innerHTML += `<div class="film-element index-${index}">
                                             <a href="./single-film.html?film=${filmId}">
                                               <img src="${item.images[0].thumbnail}" alt="${item.images[0].alt}" class="film-thumbnail"/>
                                             </a> 
                                             <h2>${item.name}</h2>
                                             ${item.short_description}                                          
                                             <div class="stars">
                                               <i class="fa-solid fa-star"></i>
                                               <i class="fa-solid fa-star"></i>
                                               <i class="fa-solid fa-star"></i>
                                               <i class="fa-solid fa-star"></i>
                                               <i class="fa-solid fa-star"></i>
                                             </div>
                                             <h3>$ ${price}.00</h3>
                                             <a href="./single-film.html?film=${filmId}">
                                               <button class="button">Details</button>
                                             </a>
                                           </div>`;
      })

      const filmElement = document.querySelectorAll(".film-element");

      filmElement.forEach((film) => {
        const stars = film.querySelectorAll(".stars i");
        for (let i = 0; i < ratings.length; i++) {
          for (let j = 0; j < ratings[i]; j++) {
            if (film.classList.contains(`index-${i}`)) {
              stars[j].classList.add("checked-star");
            }
          }
        }
      })
    }

  } catch (error) {
    filmElementContainer.innerHTML += errorMessage();

  } finally {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.style.display = "none";
    }
  }
}

getFilms();
