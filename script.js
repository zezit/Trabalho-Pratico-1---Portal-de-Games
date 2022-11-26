document.addEventListener("DOMContentLoaded", init, false);
const API_KEY = "0ccff0930eed4fc3adf881cbfe801996";

function init() {
  const allGames = document.getElementsByClassName("allplat")[0];

  fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=30`
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
        rowDiv.classList.add("allline");

        if (i == 0) rowDiv.classList.add("hidden-md-up");

        row.forEach((element) => {
          const gameDiv = document.createElement("div");
          gameDiv.classList.add("col-md-4");

          gameDiv.innerHTML = `
          <div class="cardcontainer">
          <div class="photo">
              <img src="${element.background_image}">
              <div class="photos">${element.rating}</div>
          </div>
          <div class="content">
              <p class="txt4 text-center">${element.name}</p>
              <p class="txt5 text-center">${element.released}</p>
          </div>
          <div class="footer">
              <p><a class="btn btn-danger btn-rounded" href="detalhes.html?&id=${element.id}">Detalhes</a></p>
          </div>
      </div>
            `;
          rowDiv.appendChild(gameDiv);
        });
        allGames.appendChild(rowDiv);
      });
    });
}

const basicAutocomplete = document.querySelector('#search-autocomplete');
const data = ['One', 'Two', 'Three', 'Four', 'Five'];
const dataFilter = (value) => {
  return data.filter((item) => {
    return item.toLowerCase().startsWith(value.toLowerCase());
  });
};

new mdb.Autocomplete(basicAutocomplete, {
  filter: dataFilter
});