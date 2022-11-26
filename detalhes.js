const API_KEY = "0ccff0930eed4fc3adf881cbfe801996";

document.addEventListener("DOMContentLoaded", loadContent(), false);

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
        <div class="row gx-4 gx-lg-5 align-items-center">
          <div class="col-md-6">
            <img
              class="card-img-top mb-5 mb-md-0"
              src="${data.background_image}"
              alt="..."
            />
          </div>
          <div class="col-md-6">
          <h1 class="display-5 fw-bolder">${data.name}</h1>
          <span class="text-decoration-line-through">Avaliação: ${data.rating}</span><br/><br/>
          <span class="text-decoration-line-through">Plataformas: ${plats}</span><br/><br/>
          <span class="text-decoration-line-through">Onde baixar: ${strores}</span><br/>
          <div class=" text-justify">
            <br/>
            <span class="text-decoration-line-through">Descrição:</span><br/>
            ${data.description}
          </div>
          </div>
        </div>
      </div>
      `;
    });
}
