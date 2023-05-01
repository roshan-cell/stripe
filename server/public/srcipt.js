const button = document.querySelector("button")
button.addEventListener("click", () => {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/javascript",
    },
    // sent the item u want
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    }),
  })
  // Redirect the user the output
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
})