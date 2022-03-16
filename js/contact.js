const form = document.querySelector("form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

firstName.addEventListener("focus", function (event)  {
  firstName.onkeyup = (event) => {
    if (!validateInput(firstName.value, 3)) {
      document.querySelector("form label i").classList.remove("checkmark")
    } else {
      document.querySelector("form label i").classList.add("checkmark")
      document.querySelector("#first-name ~ .input-error").style.visibility = "hidden"
      document.querySelector("#first-name ~ .input-error").innerHTML = ""
    }
  }
  firstName.onblur = (event) => {
   if (!validateInput(firstName.value, 3)) {
     document.querySelector("#first-name ~ .input-error").style.visibility = "visible"
     document.querySelector("#first-name ~ .input-error").innerHTML = "First name must be 3 characters or more"
   } else {
     document.querySelector("#first-name ~ .input-error").style.visibility = "hidden"
     document.querySelector("#first-name ~ .input-error").innerHTML = ""
   }
  }
})

lastName.addEventListener("blur", function (event)  {
  if (lastName.value) {
    if (!validateInput(lastName.value, 3)) {
      document.querySelector("#last-name ~ .input-error").style.visibility = "visible"
      document.querySelector("#last-name ~ .input-error").innerHTML = "Last name must be 3 or more characters"
    } else {
      document.querySelector("#last-name ~ .input-error").style.visibility = "hidden"
    }
  }
  lastName.onkeyup = (event) => {
    if (validateInput(lastName.value, 3)) {
      document.querySelector("#last-name ~ .input-error").style.visibility = "hidden"
      document.querySelector("#last-name ~ .input-error").innerHTML = ""
    }
  }
})

email.addEventListener("blur", function (event)  {
  if (email.value) {
    if (!validateEmail(email.value)) {
      document.querySelector("#email ~ .input-error").style.visibility = "visible"
      document.querySelector("#email ~ .input-error").innerHTML = "Email format is not valid"
    } else {
      document.querySelector("#email ~ .input-error").style.visibility = "hidden"
    }
  }
  email.onkeyup = (event) => {
    if (validateEmail(email.value)) {
      document.querySelector("#email ~ .input-error").style.visibility = "hidden"
      document.querySelector("#email ~ .input-error").innerHTML = ""
    }
  }
})




form.addEventListener("submit", () => {

})

function validateInput(value, len) {
  return value.length >= len;
}

function validateEmail(email) {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
}
