document.getElementById('spin-button').addEventListener('click', spinReels);

function spinReels() {
  // Display message while spinning
  document.getElementById('winning-message').textContent = 'Spinning...';

  const reels = document.querySelectorAll('.reel');
  const symbols = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Replace with actual image addresses from your Google Sheets

  // Simulate reel spin by changing symbol position
  reels.forEach((reel, index) => {
    let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    reel.innerHTML = <img src="${randomSymbol}" alt="Slot Symbol" class="slot-symbol">;
    
    // Add the smooth spinning effect by applying a translateY animation
    setTimeout(() => {
      reel.querySelector('.slot-symbol').style.transform = translateY(-1000px); // Spinning effect
    }, 100);
  });

  // Check if user won (simple example of all reels showing same symbol)
  setTimeout(() => {
    checkWinningCondition();
  }, 1000);
}

function checkWinningCondition() {
  const reels = document.querySelectorAll('.reel');
  const firstSymbol = reels[0].querySelector('.slot-symbol').src;

  const allSame = Array.from(reels).every(reel => {
    return reel.querySelector('.slot-symbol').src === firstSymbol;
  });

  if (allSame) {
    document.getElementById('winning-message').textContent = 'You Win!';
  } else {
    document.getElementById('winning-message').textContent = 'Try Again!';
  }
}