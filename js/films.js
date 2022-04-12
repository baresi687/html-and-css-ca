const filmElementContainer = document.querySelector(".film-elements");
const url = "https://hreinngylfason.site/cmsca/wp-json/wc/store/products/";
let ratings = [];

async function getFilms() {
  try {
    const response = await fetch(url);
    const responseJSON = await response.json();

    responseJSON.forEach(function (item)  {
      const filmId = item.id;
      console.log(filmId)
      const priceSlice = item.prices.price;
      const price = priceSlice.slice(0, priceSlice.length - 2);
      const ratingSlice = item.average_rating;
      const ratingString = ratingSlice.slice(0, ratingSlice.length - 3);
      const rating = Number(ratingString);
      ratings.push(rating);

      filmElementContainer.innerHTML += `<div class="film-element">
                                           <a href="./single-film.html?film=${filmId}">
                                             <img src="${item.images[0].thumbnail}" alt="${item.images[0].alt}" class="film-thumbnail"/>
                                           </a> 
                                           <h2>${item.name}</h2>
                                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>                                          
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
      const stars = film.querySelectorAll(".stars i")
      ratings.forEach((ratingItem) => {
        for (let i = 0; i < ratingItem; i++) {
          stars[i].classList.add("checked-star");
        }
      })
    })

  } catch (error) {
    console.log(error);
    filmElementContainer.innerHTML += `<div class="api-error">
                                         Something went wrong..
                                          <span>Please try again later.</span
                                       </div>`

  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

getFilms();
