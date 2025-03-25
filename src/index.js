// Your code here
document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://flattercutie-backend.vercel.app/characters";
  const characterBar = document.getElementById("character-bar");
  const voteForm = document.getElementById("votes-form");
  const resetBtn = document.getElementById("reset-btn");
  let selectedCharacter = null;

  fetch(baseURL)
      .then(res => res.json())
      .then(characters => {
          characters.forEach(char => {
              let span = document.createElement("span");
              span.innerText = char.name;
              characterBar.appendChild(span);

              span.addEventListener("click", function () {
                  selectedCharacter = char;
                  document.getElementById("name").innerText = char.name;
                  document.getElementById("image").src = char.image;
                  document.getElementById("vote-count").innerText = char.votes;
              });
          });
      });

  voteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!selectedCharacter) return;

      let voteInput = document.getElementById("votes");
      let votes = parseInt(voteInput.value) || 0;
      selectedCharacter.votes += votes;

      document.getElementById("vote-count").innerText = selectedCharacter.votes;
      voteInput.value = "";
  });

  resetBtn.addEventListener("click", function () {
      if (!selectedCharacter) return;

      selectedCharacter.votes = 0;
      document.getElementById("vote-count").innerText = 0;

    updateVotesOnServer(selectedCharacter.id, 0);
  });
});
