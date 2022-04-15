export const errorMessage = ((type = "api-error", message = "Something went wrong..") => {
  return `<div class="${type}">${message}
            <div>Please try again later</div>
          </div>`
})
