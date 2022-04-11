const filmElementContainer = document.querySelector(".film-elements");
const url = "http://cmsca.local/wp-json/wc/store/products/";
let ratings = [];

async function getFilms() {
  try {
    const response = await fetch(url);
    const responseJSON = await response.json();

    responseJSON.forEach(function (item)  {
      const priceSlice = item.prices.price;
      const price = priceSlice.slice(0, priceSlice.length - 2);
      const ratingSlice = item.average_rating;
      const ratingString = ratingSlice.slice(0, ratingSlice.length - 3);
      const rating = Number(ratingString);
      ratings.push(rating);

      filmElementContainer.innerHTML += `<div class="film-element">
                                           <img src="${item.images[0].thumbnail}" alt="${item.images[0].alt}" class="film-thumbnail"/>
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
                                           <a href="./purchase.html">
                                             <button class="button">More</button>
                                           </a>
                                         </div>`;

    })

    console.log(ratings)
    const filmElement = document.querySelectorAll(".film-element");
    filmElement.forEach((film) => {
      const stars = film.querySelectorAll(".stars i");
      ratings.forEach((item) => {
        for (let j = 0; j < stars.length; j++) {
          for (let i = 0; i < item; i++) {
            stars[i].classList.add("checked-star");
          }
        }
      })
    })

  } catch (error) {
    console.log(error);

  } finally {

  }
}

getFilms();
