// Global variables
let allGames = [];
let currentGame = null;

// Initialize the game page
async function initGamePage() {
  // Get game ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameTitle = urlParams.get('id');
  
  if (!gameTitle) {
    window.location.href = 'index.html';
    return;
  }
  
  // Load games data
  try {
    const response = await fetch('data/games.json');
    allGames = await response.json();
    
    // Find the current game
    currentGame = allGames.find(game => game.title === gameTitle);
    
    if (!currentGame) {
      window.location.href = 'index.html';
      return;
    }
    
    // Update page with game info
    document.getElementById('game-title').textContent = currentGame.title;
    document.getElementById('game-frame').src = currentGame.url;
    document.title = `${currentGame.title} - GAMES ONLINE`;
    
    // Show interstitial ad after 2 minutes
    setTimeout(showInterstitialAd, 120000);
    
  } catch (error) {
    console.error('Failed to load game:', error);
    window.location.href = 'index.html';
  }
}

// Show interstitial ad
function showInterstitialAd() {
  // Create modal overlay for ad
  const adOverlay = document.createElement('div');
  adOverlay.className = 'ad-overlay';
  
  adOverlay.innerHTML = `
    <div class="ad-modal">
      <div class="ad-header">
        <h3>Advertisement</h3>
        <span class="close-ad">Skip Ad in <span id="countdown">5</span></span>
      </div>
      <div class="ad-content">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-3849886072591861"
             data-ad-slot="1234567895"
             data-ad-format="auto"></ins>
      </div>
    </div>
  `;
  
  document.body.appendChild(adOverlay);
  
  // Load the ad
  (adsbygoogle = window.adsbygoogle || []).push({});
  
  // Countdown timer to close ad
  let countdown = 5;
  const countdownEl = document.getElementById('countdown');
  
  const timer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;
    
    if (countdown <= 0) {
      clearInterval(timer);
      const closeBtn = document.querySelector('.close-ad');
      closeBtn.textContent = 'Skip Ad';
      closeBtn.style.cursor = 'pointer';
      
      closeBtn.addEventListener('click', () => {
        adOverlay.remove();
      });
    }
  }, 1000);
  
  // Schedule next interstitial
  setTimeout(showInterstitialAd, 300000); // Show next ad after 5 minutes
}

// Initialize the page
window.addEventListener('DOMContentLoaded', initGamePage);