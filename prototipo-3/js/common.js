function mapStatus(characterStatus) {
  switch (characterStatus) {
    case 'Alive':
      return {
        color: "success",
        text: "Vivo",
      }
    case 'Dead':
      return {
        color: "danger",
        text: "Morto",
      }
    default:
      return {
        color: "secondary",
        text: "Desconhecida",
      }
  }
}

function mapSpecie(characterSpecie) {
  switch (characterSpecie) {
    case "Human":
      return "Humano";
    case "Alien":
      return "Alien";
    case "Robot":
      return "Robô";
    default:
      return `Outro (${characterSpecie})`;
  }
} 

async function renderFooterData() {
  const totalCharacters = await getTotalByFeature("character");
  const totalLocations = await getTotalByFeature("location");
  const totalEpisodes = await getTotalByFeature("episode");

  const spanTotalCharacter = document.getElementById("total-characters");
  animateCounter(spanTotalCharacter, totalCharacters);

  const spanTotalLocations = document.getElementById("total-locations");
  animateCounter(spanTotalLocations, totalLocations);

  const spanTotalEpisodes = document.getElementById("total-episodes");
  animateCounter(spanTotalEpisodes, totalEpisodes);

  const spanDevName = document.getElementById("dev-name");
  spanDevName.innerText = "Daniele K Santos";

  const spanCurrentYear = document.getElementById("current-year");
  spanCurrentYear.innerText = new Date().getFullYear();
}

function animateCounter(element, target) {
  let current = 0;
  const duration = 1500;
  const increment = target / (duration / 16);

  function update() {
    current += increment;
    if (current < target) {
      element.innerText = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      element.innerText = target;
    }
  }

  update();
}

async function prepareFooterData() {
  const totalCharacters = await getTotalByFeature("character");
  const totalLocations = await getTotalByFeature("location");
  const totalEpisodes = await getTotalByFeature("episode");

  return {
    characters: totalCharacters,
    locations: totalLocations,
    episodes: totalEpisodes,
  };
}

async function observeFooter() {
  const footer = document.querySelector("footer");

  const data = await prepareFooterData();

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(document.getElementById("total-characters"), data.characters);
        animateCounter(document.getElementById("total-locations"), data.locations);
        animateCounter(document.getElementById("total-episodes"), data.episodes);

        document.getElementById("dev-name").innerText = "Daniele K Santos";
        document.getElementById("current-year").innerText = new Date().getFullYear();

        observerInstance.unobserve(footer); // remove o observador após a primeira vez
      }
    });
  }, {
    threshold: 0.4 // 40% do footer precisa aparecer na tela
  });

  observer.observe(footer);
}

window.addEventListener('DOMContentLoaded', observeFooter);
