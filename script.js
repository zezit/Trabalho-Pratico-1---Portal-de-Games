document.addEventListener("DOMContentLoaded", init, false);
const API_KEY = "0ccff0930eed4fc3adf881cbfe801996";

function init() {
  const allGames = document.getElementsByClassName("allplat")[0];

  fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-09-01,2022-11-30`
  )
    .then((res) => res.json())
    .then((data) => {
      var gamesDet = [];
      for (let i = 0; i < data.results.length; i += 3) {
        const chunk = data.results.slice(i, i + 3);
        gamesDet.push(chunk);
      }

      gamesDet.forEach((row, i) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        if (i == 0) rowDiv.classList.add("hidden-md-up");

        row.forEach((element) => {
          const gameDiv = document.createElement("div");
          gameDiv.classList.add("col-md-4");

          gameDiv.innerHTML = `
              <div class="card">
                <div class="card-block" style="min-height: 20rem">
                <h4 class="card-title text-center">${element.name}</h4>
                <h6 class="card-subtitle text-muted text-center">
                Lançado: <span>${element.released}</span>
                </h6>
                <img class="img-thumbnail" src="${element.background_image}" alt="${element.slug}" />
                <h6 class="card-subtitle text-muted text-center">
                Avaliação: <span>${element.rating}</span>
                </h6>
                  <p class="text-right">
                    <a href="#" class="card-link">Mais detalhes...</a>
                  </p>
                </div>
              </div>
            `;
          rowDiv.appendChild(gameDiv);
        });
        allGames.appendChild(rowDiv);
      });
    });
}
