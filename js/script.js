const footerDivs = document.querySelectorAll(".footer-content > div");

for (let i = 0; i < footerDivs.length; i++) {
  footerDivs[i].addEventListener("click", function () {
    this.querySelector("ul").classList.toggle("show")

    if (this.querySelector("ul").classList.contains("show")) {
      this.querySelector("i").classList.remove("fa-angle-down")
      this.querySelector("i").classList.add("fa-angle-up")
    } else {
      this.querySelector("i").classList.add("fa-angle-down")
      this.querySelector("i").classList.remove("fa-angle-up")
    }
  })
}
