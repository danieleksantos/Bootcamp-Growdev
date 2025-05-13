document.addEventListener('DOMContentLoaded', main)

async function main(params) {
  loadMainContent(1);
  renderFooterData();
}

async function loadMainContent(page) {
  const result = await listCharacterByPage(page);

  const characters = [...result.charactersList];

  for (const character of characters) {
    const lastEpisodeUrl = character.episode[character.episode.length - 1];

    const episodeName = await getEpisodeDataFromURL(lastEpisodeUrl);

    character.episode = {
      url: lastEpisodeUrl,
      name: episodeName,
    };
  }

  renderCharactersList(characters);
  renderPagination(result.prevPage, result.nextPage);

}

function renderCharactersList(characters) {
  const row = document.getElementById("list-characters");
  row.innerHTML = "";

  for (const character of characters) {
    let nameCharacter = character.name;

    if (nameCharacter.length > 18) {
      nameCharacter = nameCharacter.slice(0, 18).concat("...");
    }
    const card = `
          <div class="card mb-3 card-character" onclick="viewCharacterDetail(${character.id})">
            <div class="row g-0">
              <div class="col-12 col-md-5">
                <div class="object-fit-fill border rounded h-100">
                  <img src="${character.image}" class="w-100 h-100 rounded" alt="Foto do personagem ${character.name}">
                </div>
              </div>
              <div class="col-12 col-md-7">
                <div class="card-body fw-bolder">
                  <h5 class="card-title">${nameCharacter}</h5>

                  <p class="card-text">
                    <small>
                      <i id="circle-status" class="bi bi-circle-fill text-${mapStatus(character.status).color}"></i>
                      <span>${mapStatus(character.status).text} - ${mapSpecie(character.species)}</span>
                    </small>
                  </p>

                  <p class="card-text">
                    <small class="text-secondary">Última localização conhecida:</small>
                    <br>
                    <small>${character.location.name}</small>
                  </p>
                  <p class="card-text">
                    <small class="text-secondary">Visto a última vez em:</small>
                    <br>
                    <small>${character.episode.name}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
      `;
    const col = document.createElement('div');
    col.classList.add("col-12", "col-md-6");

    col.innerHTML = card;
    row.appendChild(col);
  }
}

function renderPagination(prevPage, nextPage) {
  const prevPageNumber = !prevPage ? 0 : prevPage.split("?page=")[1];
  const nextPageNumber = !nextPage ? 0 : nextPage.split("?page=")[1];

  const nav = document.getElementById("pagination");
  nav.innerHTML = "";

  const ul = document.createElement("ul")
  ul.classList.add("pagination", "justify-content-center");

  const liPreviPage = document.createElement("li");
  liPreviPage.classList.add("page-item");

  if (!prevPage) {
    liPreviPage.classList.add("disabled");
  }

  const buttonPrev = document.createElement("button")
  buttonPrev.setAttribute("type", "button");
  buttonPrev.classList.add("page-link");
  buttonPrev.innerText = "Anterior";
  buttonPrev.addEventListener("click", () => loadMainContent(prevPageNumber));

  liPreviPage.appendChild(buttonPrev);

  const liNextPage = document.createElement("li");
  liNextPage.classList.add("page-item");

  if (!nextPage) {
    liNextPage.classList.add("disabled");
  }

  const buttonNext = document.createElement("button")
  buttonNext.setAttribute("type", "button");
  buttonNext.classList.add("page-link");
  buttonNext.innerText = "Próximo";
  buttonNext.addEventListener("click", () => loadMainContent(nextPageNumber));

  liNextPage.appendChild(buttonNext);

  ul.appendChild(liPreviPage);
  ul.appendChild(liNextPage);

  nav.appendChild(ul);
}

function viewCharacterDetail(characterId) {
  window.location.href = `detail.html?character=${characterId}`;
}