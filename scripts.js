/**
 * Fetch articles from the API.
 */
async function fetchArticles() {
  try {
    const response = await fetch("https://newsapi.org/v2/everything?q=Pokemon&from=2024-04-03&sortBy=popularity&apiKey=6f8566b218534c5783612402911a8cdd");
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

/**
 * Create one card from article data.
 */
function createCardElement(article) {
  return `
      <li class="card">
          <img src="${article.urlToImage}" alt="">
          <div class="card-content">
              <p class="subheader">
                  ${article.author || "Unknown Author"}
              </p>
              <h3 class="header">
                  ${article.title}
              </h3>
          </div>
      </li>
    `;
}

/**
 * Create multiple cards from array of article data.
 */
function createCardElements(articles) {
  return articles.map(createCardElement).join("");
}

/**
 * Option 1: Dropdown and Cards for Selected Source
 */
async function renderOption1Dropdown() {
  const articles = await fetchArticles();
  const sources = [...new Set(articles.map(article => article.source.name))];
  
  const select = document.getElementById("dropdown");
  sources.forEach(source => {
    const option = document.createElement("option");
    option.textContent = source;
    option.value = source;
    select.appendChild(option);
  });
}

async function option1DropdownClickHandler(event) {
  const select = document.getElementById("dropdown");
  const selectedSource = select.value;
  const articles = await fetchArticles();
  const filteredArticles = articles.filter(article => article.source.name === selectedSource);
  
  const cards = createCardElements(filteredArticles);
  document.getElementById("option-1-results").innerHTML = cards;
}

/**
 * Option 2: Display All Articles as Cards
 */
async function renderOption2() {
  const articles = await fetchArticles();
  const cards = createCardElements(articles);
  document.getElementById("option-2-results").innerHTML = cards;
}

/**
 * Option 2 Enhanced: Display with Search Filter
 */
async function renderOption2Enhanced() {
  const articles = await fetchArticles();
  const cards = createCardElements(articles);
  document.getElementById("option-2-enhanced-results").innerHTML = cards;
}

function searchbarEventHandler() {
  let input = document.getElementById("searchbar").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector(".header").textContent.toLowerCase();
    if (title.includes(input)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderOption1Dropdown();
  renderOption2();
  renderOption2Enhanced();

  const option1SubmitButton = document.getElementById("submit-button");
  option1SubmitButton.addEventListener("click", option1DropdownClickHandler);

  const searchbar = document.getElementById("searchbar");
  searchbar.addEventListener("keyup", searchbarEventHandler);
});
