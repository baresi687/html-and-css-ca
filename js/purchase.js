const inputRadios = document.querySelectorAll(".payment-options div input");

inputRadios.forEach((item) => {
  item.addEventListener("change", () => {
    document.querySelector(".button-pay").style.display = "flex"
  })
})

const inputRadioVipps = document.querySelector("#vipps");
const inputRadioVisa = document.querySelector("#visa");
const inputRadioMastercard = document.querySelector("#mastercard");

inputRadioVipps.addEventListener("change", () => {
  document.querySelector(".vipps-info").innerHTML = `<p>Pay with ease on your mobile with Vipps<br/>
                                                                 <a href="#" class="links">Read more</a>
                                                               </p>`;
})

inputRadioVisa.addEventListener("change", () => {
  document.querySelector(".vipps-info").innerHTML = `<p>Pay with VISA creditcard<br/>
                                                                 <a href="#" class="links">Read more</a>
                                                               </p>`;
})

inputRadioMastercard.addEventListener("change", () => {
  document.querySelector(".vipps-info").innerHTML = `<p>Pay with Mastercard creditcard<br/>
                                                                 <a href="#" class="links">Read more</a>
                                                               </p>`;
})
