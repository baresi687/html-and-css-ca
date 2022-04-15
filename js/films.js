import {errorMessage} from "./handlers/message.js";

const filmElementContainer = document.querySelector(".film-elements");
const url = "https://hreinngylfason.site/cmsca/wp-json/wc/store/products/";
let ratings = [];

async function getFilms() {
  try {
    const response = await fetch(url);
    const responseJSON = await response.json();

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

  } catch (error) {
    filmElementContainer.innerHTML += errorMessage();

  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

getFilms();
