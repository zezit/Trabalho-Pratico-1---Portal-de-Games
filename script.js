document.addEventListener("DOMContentLoaded", init, false);
const API_KEY = "0ccff0930eed4fc3adf881cbfe801996";

function init() {
  const destaques = document.getElementById("todos-destaques");
  const destaqueAtual = document.getElementById("destatual");

  destaques.innerHTML = "";

  fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-09-01,2022-11-30`
  )
    .then((res) => res.json())
    .then((data) =>
      data.results.forEach((game, i) => {
        if (!i) {
          destaqueAtual.innerHTML = `
          <div class="destaque-inline w-100">
            <div class="image-carousel d-flex col-lg-6">
              <img
                class="w-100"
                src="${game.background_image}"
                alt="First slide"
              />
            </div>
            <div class="col-lg-6 col-sm-12">
              <h3 class="">${game.name}</h3>
              <p class="sobre">
                <strong>Sobre:</strong>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus et turpis ut velit dapibus ultrices ac a purus.
                Curabitur at cursus tellus. Pellentesque semper fringilla
                hendrerit. Curabitur rutrum sapien a maximus accumsan.
                Aenean vitae turpis eros. Nulla ac semper dolor, vitae
                feugiat ante. Aliquam erat volutpat. Curabitur hendrerit
                eget libero ac tincidunt. Ut eu ante leo. Pellentesque
                finibus enim quis scelerisque mollis. Praesent pharetra
                dui non lorem luctus posuere. Phasellus sit amet pharetra
                metus. Praesent finibus finibus viverra. Praesent aliquet
                quam quis libero finibus, a mollis mi scelerisque.
              </p>
              <div class="inlinespans">
                <p>
                  <span>
                    <strong>Publisher:</strong>
                    Eletronic Arts
                  </span>
                  <span>
                    <strong>Lançamento:</strong>
                    May, 2020
                  </span>
                </p>
              </div>
              <p>
                <strong>Plataformas:</strong>
                Nitendo Switch, Playstation 5, Xbox One, PC
              </p>
              <p><strong>Gênero:</strong> Action, Adventure, RPG</p>
              <p class="destaque-av">
                <strong>Avaliação:</strong> <strong>92</strong>
              </p>
            </div>
          </div>
        `;
        } else if (i < 4) {
          const newE = document.createElement("div");
          newE.innerHTML = `
          <div class="destaque-inline w-100">
                  <div class="image-carousel d-flex col-lg-6">
                    <img
                      class="w-100"
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).webp"
                      alt="First slide"
                    />
                  </div>
                  <div class="col-lg-6 col-sm-12">
                    <h3 class="">Nome do Jogo</h3>
                    <p class="sobre">
                      <strong>Sobre:</strong>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus et turpis ut velit dapibus ultrices ac a purus.
                      Curabitur at cursus tellus. Pellentesque semper fringilla
                      hendrerit. Curabitur rutrum sapien a maximus accumsan.
                      Aenean vitae turpis eros. Nulla ac semper dolor, vitae
                      feugiat ante. Aliquam erat volutpat. Curabitur hendrerit
                      eget libero ac tincidunt. Ut eu ante leo. Pellentesque
                      finibus enim quis scelerisque mollis. Praesent pharetra
                      dui non lorem luctus posuere. Phasellus sit amet pharetra
                      metus. Praesent finibus finibus viverra. Praesent aliquet
                      quam quis libero finibus, a mollis mi scelerisque.
                    </p>
                    <div class="inlinespans">
                      <p>
                        <span>
                          <strong>Publisher:</strong>
                          Eletronic Arts
                        </span>
                        <span>
                          <strong>Lançamento:</strong>
                          May, 2020
                        </span>
                      </p>
                    </div>
                    <p>
                      <strong>Plataformas:</strong>
                      Nitendo Switch, Playstation 5, Xbox One, PC
                    </p>
                    <p><strong>Gênero:</strong> Action, Adventure, RPG</p>
                    <p class="destaque-av">
                      <strong>Avaliação:</strong> <strong>92</strong>
                    </p>
                  </div>
                </div>
              </div>
          `;
          destaques.appendChild(destaqueAtual);
        }
      })
    );
}
