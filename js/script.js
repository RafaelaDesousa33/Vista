// MENU RESPONSIVO

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// BARRA DE PROGRESSO

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / documentHeight) * 100;

  progressBar.style.width = progress + "%";
});

// FILTROS

const filterButtons = document.querySelectorAll(".collection-filter");

const propertyCards = document.querySelectorAll(".property-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    propertyCards.forEach((card) => {
      if (filter === "todos" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    checkResults();
  });
});

// BUSCA

const searchInput = document.getElementById("searchInput");

const searchButton = document.getElementById("searchButton");

function searchProperties() {
  const value = searchInput.value.toLowerCase().trim();

  propertyCards.forEach((card) => {
    const content = card.dataset.search.toLowerCase();

    if (content.includes(value)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  checkResults();
}

searchButton.addEventListener("click", searchProperties);

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchProperties();
  }
});

// VERIFICAR RESULTADOS

function checkResults() {
  const noResults = document.getElementById("noResults");

  const visibleCards = [...propertyCards].filter(
    (card) => !card.classList.contains("hidden"),
  );

  if (visibleCards.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

// FAVORITOS

const favoriteButtons = document.querySelectorAll(".favorite-btn");

const favoriteCount = document.getElementById("favoriteCount");

let favorites = 0;

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector("i");

    if (button.classList.contains("active")) {
      button.classList.remove("active");

      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");

      favorites--;
    } else {
      button.classList.add("active");

      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");

      favorites++;
    }

    favoriteCount.textContent = favorites;
  });
});

// DADOS DOS IMÓVEIS

const properties = {
  1: {
    name: "Apartamento Aurora",

    location: "Vila Madalena — São Paulo",

    price: "R$ 980.000",

    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",

    description:
      "Um apartamento contemporâneo, iluminado e localizado em uma das regiões mais criativas da cidade. Ambientes integrados e uma planta pensada para uma rotina urbana.",

    features: ["89 m²", "2 quartos", "2 banheiros", "1 vaga"],
  },

  2: {
    name: "Casa Bosque",

    location: "Granja Viana — SP",

    price: "R$ 2.450.000",

    image:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=85",

    description:
      "Uma casa cercada pela natureza, com espaços amplos e ambientes pensados para quem deseja desacelerar sem abrir mão de conforto.",

    features: ["380 m²", "4 quartos", "5 banheiros", "3 vagas"],
  },

  3: {
    name: "Casa Jardim",

    location: "Alto de Pinheiros — São Paulo",

    price: "R$ 3.200.000",

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",

    description:
      "Uma residência espaçosa com integração entre áreas internas e externas. Ideal para famílias que valorizam conforto, privacidade e localização.",

    features: ["320 m²", "4 quartos", "4 banheiros", "4 vagas"],
  },

  4: {
    name: "Residência Horizonte",

    location: "Morumbi — São Paulo",

    price: "R$ 5.800.000",

    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",

    description:
      "Arquitetura contemporânea, ambientes sofisticados e uma vista aberta para a cidade. Um imóvel exclusivo para quem procura uma experiência única.",

    features: ["510 m²", "5 quartos", "6 banheiros", "5 vagas"],
  },

  5: {
    name: "Casa da Semana",

    location: "Jardins — São Paulo",

    price: "R$ 3.750.000",

    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",

    description:
      "Um projeto onde luz natural, arquitetura e conforto se encontram. Espaços amplos e materiais naturais criam uma atmosfera leve e acolhedora.",

    features: ["245 m²", "3 quartos", "3 banheiros", "2 vagas"],
  },
};

// MODAL

const modal = document.getElementById("modal");

const modalContent = document.getElementById("modalContent");

const closeModal = document.getElementById("closeModal");

const detailsButtons = document.querySelectorAll(".details-btn");

detailsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const property = properties[button.dataset.id];

    modalContent.innerHTML = `

            <div class="modal-image">

                <img
                    src="${property.image}"
                    alt="${property.name}">

            </div>


            <div class="modal-info">

                <span>
                    ${property.location}
                </span>

                <h2>
                    ${property.name}
                </h2>

                <strong class="price">
                    ${property.price}
                </strong>

                <p>
                    ${property.description}
                </p>


                <div class="modal-features">

                    ${property.features
                      .map(
                        (feature) => `
                        <span>${feature}</span>
                    `,
                      )
                      .join("")}

                </div>

            </div>

        `;

    modal.classList.add("active");

    document.body.classList.add("modal-open");
  });
});

// FECHAR MODAL

function closePropertyModal() {
  modal.classList.remove("active");

  document.body.classList.remove("modal-open");
}

closeModal.addEventListener("click", closePropertyModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closePropertyModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closePropertyModal();
  }
});
