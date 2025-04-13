// Ad Manager for GAMES ONLINE
class AdManager {
  constructor() {
    this.adsenseId = 'pub-3849886072591861';
    this.admobId = 'ca-app-pub-3849886072591861~2063409176';
    this.initialized = false;
    this.scrollAdsEnabled = true;
    this.scrollAdDistance = 500; // Show ad every 500px of scrolling
    this.lastScrollAdPos = 0;
  }

  // Initialize ads
  init() {
    if (this.initialized) return;
    
    // Load AdSense script if not already loaded
    if (!document.querySelector(`script[src*="adsbygoogle"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${this.adsenseId}`;
      document.head.appendChild(script);
    }
    
    // Initialize scroll ad functionality
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    this.initialized = true;
    console.log('AdManager initialized');
  }

  // Handle scroll events for scroll ads
  handleScroll() {
    if (!this.scrollAdsEnabled) return;
    
    const scrollPos = window.scrollY;
    if (Math.abs(scrollPos - this.lastScrollAdPos) >= this.scrollAdDistance) {
      this.insertScrollAd();
      this.lastScrollAdPos = scrollPos;
    }
  }

  // Insert an ad after scrolling
  insertScrollAd() {
    const gameCards = document.querySelectorAll('.game-card');
    if (gameCards.length === 0) return;
    
    // Find a good position to insert the ad
    const index = Math.floor(Math.random() * gameCards.length);
    const targetCard = gameCards[index];
    
    // Create ad container
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-container scroll-ad';
    
    // Create AdSense ad
    const adInsElement = document.createElement('ins');
    adInsElement.className = 'adsbygoogle';
    adInsElement.style.display = 'block';
    adInsElement.dataset.adClient = `ca-${this.adsenseId}`;
    adInsElement.dataset.adSlot = '1234567896'; // Replace with your ad slot
    adInsElement.dataset.adFormat = 'auto';
    
    adContainer.appendChild(adInsElement);
    
    // Insert after the target card
    targetCard.parentNode.insertBefore(adContainer, targetCard.nextSibling);
    
    // Push the ad to AdSense
    (adsbygoogle = window.adsbygoogle || []).push({});
  }

  // Show interstitial ad (between game levels)
  showInterstitial() {
    return new Promise((resolve) => {
      // Create overlay container
      const overlay = document.createElement('div');
      overlay.className = 'ad-overlay';
      
      // Create ad modal
      const modal = document.createElement('div');
      modal.className = 'ad-modal';
      
      // Ad header
      const header = document.createElement('div');
      header.className = 'ad-header';
      header.innerHTML = `
        <h3>Advertisement</h3>
        <span class="close-ad">Skip Ad in <span id="countdown">5</span></span>
      `;
      
      // Ad content
      const content = document.createElement('div');
      content.className = 'ad-content';
      
      // Create AdSense ad
      const adInsElement = document.createElement('ins');
      adInsElement.className = 'adsbygoogle';
      adInsElement.style.display = 'block';
      adInsElement.dataset.adClient = `ca-${this.adsenseId}`;
      adInsElement.dataset.adSlot = '1234567897'; // Replace with your ad slot
      adInsElement.dataset.adFormat = 'auto';
      
      content.appendChild(adInsElement);
      
      // Assemble modal
      modal.appendChild(header);
      modal.appendChild(content);
      overlay.appendChild(modal);
      
      // Add to document
      document.body.appendChild(overlay);
      
      // Push the ad to AdSense
      (adsbygoogle = window.adsbygoogle || []).push({});
      
      // Countdown timer
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
            overlay.remove();
            resolve(); // Resolve the promise when ad is closed
          });
        }
      }, 1000);
    });
  }
}

// Create global ad manager instance
const adManager = new AdManager();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  adManager.init();
});