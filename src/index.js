// Your code here
fetch("https://flattercutie-backend.vercel.app/characters")
  .then(function (response) {
    return response.json();
  })