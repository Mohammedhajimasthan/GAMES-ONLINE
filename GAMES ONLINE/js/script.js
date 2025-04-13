// Load games from a local JSON file
async function loadGames() {
  try {
    const response = await fetch('data/games.json');
    const games = await response.json();
    allGames = games; // Store all games
    displayGames(games);
  } catch (error) {
    console.error('Failed to load games:', error);
  }
}

// Global variable to store all games
let allGames = [];

function displayGames(games) {
  const container = document.getElementById('game-list');
  container.innerHTML = '';

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');

    gameCard.innerHTML = `
      <a href="game.html?id=${encodeURIComponent(game.title)}" class="game-link">
        <img src="${game.image}" alt="${game.title}" />
        <h4>${game.title}</h4>
      </a>
    `;

    container.appendChild(gameCard);
  });
}

// Add scroll event listener for ad loading
window.addEventListener('scroll', function() {
  if (typeof adManager !== 'undefined' && adManager.handleScroll) {
    adManager.handleScroll();
  }
});

window.addEventListener('DOMContentLoaded', loadGames);