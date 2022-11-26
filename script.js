document.addEventListener("DOMContentLoaded", init, false);
const API_KEY = "0ccff0930eed4fc3adf881cbfe801996";

function init() {
  const allGames = document.getElementsByClassName("allplat")[0];

  fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=30`)
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

var search_terms = [
  "apple",
  "apple watch",
  "apple macbook",
  "apple macbook pro",
  "iphone",
  "iphone 12",
];

function autocompleteMatch(input) {
  if (input == "") {
    return [];
  }

  fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=30&search=${input}`
  )
    .then((res) => res.json())
    .then((data) => {
      var reg = new RegExp(input);
      return data.results.filter((term) => {
        if (term.name.match(reg) || term.slug.match(reg)) {
          console.log(term.name);
          return term.name;
        }
      });
    });
}

function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = "";
  if (val == "") {
    return;
  }
  let list = "";
  fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=30&search=${val}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.results.forEach((element, i) => {
        var reg = new RegExp(val);
        if (i > 9) {
          return;
        }
        if (
          element.name.toLocaleLowerCase().match(reg) ||
          element.slug.toLocaleLowerCase().match(reg)
        ) {
          list += `<li><a href="detalhes.html?&id=${element.id}" id="${element.id}">${element.name}</a></li>`;
          res.innerHTML = "<ul>" + list + "</ul>";
        }
      });
    });
  res.innerHTML = "<ul>" + list + "</ul>";
}

function loadContent() {
  const id = window.location.search.split("=")[1];
  const gameArea = document.getElementsByClassName("gamearea")[0];

  fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      document.title = `${data.name}`;

      var plats = "";
      data.platforms.forEach((element) => {
        plats = plats + element.platform.name;
        plats = plats + ", ";
      });
      plats = plats.slice(0, -2);

      var strores = "";
      data.stores.forEach((element) => {
        // strores = strores + `<a href="https://${element.store.domain}" target="_blank">${element.store.name}</a>, `;
        strores = strores + `${element.store.name}, `;
      });
      strores = strores.slice(0, -2);

      gameArea.innerHTML = `
      <div class="container px-4 px-lg-5 my-5">
        <div class="col gx-12 gx-lg-12 align-items-center">
        <h1 class="display-5 fw-bolder">${data.name}</h1><br/><br/>
          <div class="col-md-12">
            <img
              class="card-img-top mb-5 mb-md-0"
              src="${data.background_image}"
              alt="..."
            />
          </div><br/>
          <div class="col-md-12">
          <span class="text-decoration-line-through"><span class="font-weight-bold titelss">Avaliação:</span> ${data.rating}</span><br/><br/>
          <span class="text-decoration-line-through"><span class="font-weight-bold titelss">Plataformas:</span> ${plats}</span><br/><br/>
          <span class="text-decoration-line-through"><span class="font-weight-bold titelss">Onde baixar:</span> ${strores}</span><br/>
          <div class="desc text-justify">
            <br/>
            ${data.description}
          </div>
          </div>
        </div>
      </div>
      `;
    });
}
