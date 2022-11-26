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

let timeout = null;

function showResults(val) {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    const allGames = document.getElementsByClassName("allplat")[0];

    if (val == "") {
      init();
    }

    fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${val}&page_size=60`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var gamesDet = [];
        allGames.innerHTML = "";
        if (!data.results.length) {
          const gameDiv = document.createElement("div");

          gameDiv.innerHTML = `
          <div class="cardcontainer">
            <h1>Nada foi encontrado</h1>
          </div>`;

          allGames.appendChild(gameDiv);
        } else {
          data.results.forEach((element, i) => {
            var reg = new RegExp(val);
            if (
              element.name.toLocaleLowerCase().match(reg) ||
              element.slug.toLocaleLowerCase().match(reg)
            ) {
              for (; i < data.results.length; i += 3) {
                const chunk = data.results.slice(i, i + 3);
                gamesDet.push(chunk);
              }

              gamesDet.forEach((row, i) => {
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("row");
                rowDiv.classList.add("allline");

                if (i == 0) {
                  rowDiv.classList.add("hidden-md-up");
                  allGames.innerHTML = "";
                }

                row.forEach((element) => {
                  const gameDiv = document.createElement("div");
                  gameDiv.classList.add("col-md-4");
                  gameDiv.id = element.id;

                  gameDiv.innerHTML = `
          <div class="cardcontainer">
            <div class="photo">
                <img src="${element.background_image ?? "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}">
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
                  let match = false;
                  var arr = Array.prototype.slice.call(allGames.children);
                  arr.forEach((rowA) => {
                    var arrAux = Array.prototype.slice.call(rowA.children);
                    arrAux.forEach((itenA) => {
                      if (element.id == itenA.id) {
                        match = true;
                        return;
                      }
                    });
                    if (match) {
                      return;
                    }
                  });

                  if (!match) rowDiv.appendChild(gameDiv);
                });
                allGames.appendChild(rowDiv);
              });
            }
          });
        }
      });
  }, 1000);
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
              src="${data.background_image ?? "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}"
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
