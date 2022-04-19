import {errorMessage} from "./handlers/message.js";

const params = new URLSearchParams(window.location.search);
const filmId = params.get("film");
const url = `https://hreinngylfason.site/cmsca/wp-json/wc/store/products/${filmId}`;
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

    document.querySelector("title").innerHTML += singleFilm.name;

    singleFilmContainer.innerHTML += `<div class="film-container">
                                        <div class="film-poster">
                                          <img src="${singleFilm.images[0].src}" alt="${singleFilm.images[0].alt}">
                                        </div>
                                        <div class="film-information">
                                          <h1>${singleFilm.name}</h1>
                                          <div class="stars">
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <span class="review">
                                              <a href="#film-reviews" class="links">${singleFilm.review_count} review(s)</a>
                                            </span>
                                          </div>
                                          <h2>$ ${price}.00</h2>
                                          ${singleFilm.short_description}
                                          <p>Director: <a href="#" class="links">John Doe</a></p>
                                          <a href="./purchase.html">
                                            <button class="button">Buy Now</button>
                                          </a>
                                        </div>
                                      </div>`;

    const filmInformation = document.querySelector(".film-information").classList.value;
    getStars(filmInformation, rating);

    const filmFullDescription = document.querySelector(".film-full-description");
    filmFullDescription.innerHTML += `<h3>Description</h3>
                                      ${singleFilm.description}`


  } catch (error) {
    singleFilmContainer.innerHTML += errorMessage();

  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

getSingleFilm();

const reviewUrl = `https://hreinngylfason.site/cmsca/wp-json/wc/store/products/reviews?product_id=${filmId}`
const filmReviews = document.querySelector(".film-reviews");

async function getReviews() {
  try {
    const response = await fetch(reviewUrl);
    const responseJSON = await response.json();
    filmReviews.innerHTML = `<h3>Reviews</h3>`;

    responseJSON.forEach((reviewItem, index) => {
      filmReviews.innerHTML += `<div class="single-review index-${index}">
                                  <strong>${reviewItem.reviewer} - </strong>
                                  <span>${reviewItem.formatted_date_created}</span>                                  
                                  <span class="stars">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                  </span>
                                  ${reviewItem.review}
                                </div>`

      const rating = reviewItem.rating;
      const singleReview = document.querySelector(`.single-review.index-${index}`).classList[1];
      getStars(singleReview, rating)
    })

  } catch (error) {
    filmReviews.innerHTML = `<h3>Reviews</h3>`;
    filmReviews.innerHTML += errorMessage("api-error", "Something went wrong when fetching reviews");
  }
}

getReviews();

function getStars(elem, rating ) {
  const stars = document.querySelectorAll( `.${elem} .stars i`);
  for (let i = 0; i < rating; i++) {
    stars[i].classList.add("checked-star");
  }
}
