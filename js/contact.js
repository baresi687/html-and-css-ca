const form = document.querySelector("form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");


firstName.addEventListener("focus", function (event)  {
  firstName.onkeyup = (event) => {
    if (!validateInput(firstName.value, 3)) {
      document.querySelector("#first-name ~ i").classList.remove("checkmark-show")
    } else {
      document.querySelector("#first-name ~ i").classList.add("checkmark-show")
      document.querySelector("#first-name ~ .input-error").innerHTML = ""
    }
  }
  firstName.onblur = (event) => {
   if (!validateInput(firstName.value, 3)) {
     firstName.classList.add("input-error-onblur")
     document.querySelector("#first-name ~ .input-error").innerHTML = "First name must be 3 characters or more"
   } else {
     firstName.classList.remove("input-error-onblur")
     document.querySelector("#first-name ~ .input-error").innerHTML = ""
   }
  }
})

lastName.addEventListener("focus", function (event)  {
  lastName.onkeyup = (event) => {
    if (!validateInput(lastName.value, 3)) {
      document.querySelector("#last-name ~ i").classList.remove("checkmark-show")
    } else {
      document.querySelector("#last-name ~ i").classList.add("checkmark-show")
      document.querySelector("#last-name ~ .input-error").innerHTML = ""
    }
  }
  lastName.onblur = (event) => {
    if (!validateInput(lastName.value, 3)) {
      lastName.classList.add("input-error-onblur")
      document.querySelector("#last-name ~ .input-error").innerHTML = "Last name must be 3 characters or more"
    } else {
      lastName.classList.remove("input-error-onblur")
      document.querySelector("#last-name ~ .input-error").innerHTML = ""
    }
  }
})

email.addEventListener("focus", function (event)  {
  email.onkeyup = (event) => {
    if (!validateEmail(email.value)) {
      document.querySelector("#email ~ i").classList.remove("checkmark-show")
    } else {
      document.querySelector("#email ~ i").classList.add("checkmark-show")
      document.querySelector("#email ~ .input-error").innerHTML = ""
    }
  }
  email.onblur = (event) => {
    if (!validateEmail(email.value)) {
      email.classList.add("input-error-onblur")
      document.querySelector("#email ~ .input-error").innerHTML = "Email format is not valid"
    } else {
      email.classList.remove("input-error-onblur")
      document.querySelector("#email ~ .input-error").innerHTML = ""
    }
  }
})

message.addEventListener("focus", function (event)  {
  message.onkeyup = (event) => {
    if (!validateInput(message.value, 25)) {
      document.querySelector("#message ~ i").classList.remove("checkmark-show")
    } else {
      document.querySelector("#message ~ i").classList.add("checkmark-show")
      document.querySelector("#message ~ .input-error").innerHTML = ""
    }
  }
  message.onblur = (event) => {
    if (!validateInput(message.value, 25)) {
      message.classList.add("input-error-onblur")
      document.querySelector("#message ~ .input-error").innerHTML = "Message must be 25 characters or more"
    } else {
      message.classList.remove("input-error-onblur")
      document.querySelector("#message ~ .input-error").innerHTML = ""
    }
  }
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateInput(firstName.value, 3)) {
    firstName.classList.add("input-error-onblur")
    document.querySelector("#first-name ~ .input-error").innerHTML = "First name must be 3 characters or more"
  }
  if (!validateInput(lastName.value, 3)) {
    lastName.classList.add("input-error-onblur")
    document.querySelector("#last-name ~ .input-error").innerHTML = "Last name must be 3 characters or more"
  }
  if (!validateEmail(email.value)) {
    email.classList.add("input-error-onblur")
    document.querySelector("#email ~ .input-error").innerHTML = "Email format is not valid"
  }
  if (!validateInput(message.value, 25)) {
    message.classList.add("input-error-onblur")
    document.querySelector("#message ~ .input-error").innerHTML = "Message must be 25 characters or more"
  }

  if (validateInput(firstName.value, 3) && validateInput(lastName.value, 3) && validateEmail(email.value) && validateInput(message.value, 25)) {
    /*document.querySelectorAll("form div i").classList.remove("checkmark-show")*/
    document.querySelector(".form-success").classList.add("show")
    form.reset();
  }

})

function validateInput(value, len) {
  return value.length >= len;
}

function validateEmail(email) {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
}
