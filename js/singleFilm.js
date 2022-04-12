const params = new URLSearchParams(window.location.search);
const filmId = params.get("film");
const url = `http://cmsca.local/wp-json/wc/store/products/${filmId}`;
const singleFilmContainer = document.querySelector(".single-film");

async function getSingleFilm() {
  try {
    const response = await fetch(url);
    const singleFilm = await response.json();
    const priceSlice = singleFilm.prices.price;
    const price = priceSlice.slice(0, priceSlice.length - 2);
    const ratingSlice = singleFilm.average_rating;
    const ratingString = ratingSlice.slice(0, ratingSlice.length - 3);
    const rating = Number(ratingString);
    console.log(rating);

    document.querySelector("title").innerHTML += singleFilm.name;

    singleFilmContainer.innerHTML += `<div class="film-container">
                                        <div class="film-poster">
                                          <img src="${singleFilm.images[0].src}" alt="${singleFilm.images[0].alt}">
                                        </div>
                                        <div class="film-description">
                                          <h1>${singleFilm.name}</h1>
                                          <div class="stars">
                                             <i class="fa-solid fa-star"></i>
                                             <i class="fa-solid fa-star"></i>
                                             <i class="fa-solid fa-star"></i>
                                             <i class="fa-solid fa-star"></i>
                                             <i class="fa-solid fa-star"></i>
                                           </div>
                                           <h2>$ ${price}.00</h2>
                                           <p>${singleFilm.description}</p>
                                           <button class="button">Buy Now</button>
                                        </div>
                                      </div>`;

    const stars = document.querySelectorAll(".stars i");
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add("checked-star");
    }

  } catch (error) {

  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

getSingleFilm();
