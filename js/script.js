const footerMenu = document.querySelectorAll(".footer-content .menu-bold");

for (let i = 0; i < footerMenu.length; i++) {
  footerMenu[i].addEventListener("click", function () {
    const ulElement = this.nextElementSibling;
    if (ulElement.classList.contains("show")) {
      ulElement.classList.remove("show")
      ulElement.nextElementSibling.classList.add("fa-angle-down")
      ulElement.nextElementSibling.classList.remove("fa-angle-up")
    } else {
      ulElement.classList.add("show")
      ulElement.nextElementSibling.classList.remove("fa-angle-down")
      ulElement.nextElementSibling.classList.add("fa-angle-up")
    }
  })
}
