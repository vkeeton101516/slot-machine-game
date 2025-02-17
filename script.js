// Track the number of spins and wins
let spinCount = parseInt(localStorage.getItem('spinCount')) || 0;
let dailyWin = localStorage.getItem('dailyWin') === 'true' ? true : false;
let winnersThisMonth = parseInt(localStorage.getItem('winnersThisMonth')) || 0;
const maxSpins = 5;
const maxWinners = 20;
const dailyLimitMessage = "You've reached your spin limit for today. Please come back tomorrow!";

// Your specific confirmation numbers (20 winners)
const confirmationNumbers = [
    "45875664", "58761232", "87653099", "14589736", "01589536", "25796864", 
    "28658901", "02040587", "32158964", "38561515", "71456611", "82547125", 
    "94585477", "05161983", "02262007", "09232009", "04586652", "17565211", 
    "25893455", "24751855"
];

// Prize details (only $5 prize will be won)
const slotImages = [
    "https://iili.io/2m5cdSp.jpg",  // $5 Gift Card (only this one will be shown)
];
const prizeAmount = 5; // $5 prize

// Function to disable the spin button if the player has reached their limit
function checkSpinLimit() {
    if (spinCount >= maxSpins) {
        document.querySelector('.spin-button').disabled = true;
        document.getElementById('result').textContent = dailyLimitMessage;
    } else {
        document.querySelector('.spin-button').disabled = false;
    }
}

// Function to handle the spin action
function spin() {
    if (spinCount >= maxSpins) {
        document.getElementById('warning').textContent = "You have reached the spin limit!";
        return;
    }

    // Ensure the results show only $5 cards for all three slots (no $10 or $50)
    const winningImage = slotImages[0]; // Always show $5 card for all three slots
    document.getElementById('slot1').innerHTML = <img src="${winningImage}" alt="$5 Gift Card">;
    document.getElementById('slot2').innerHTML = <img src="${winningImage}" alt="$5 Gift Card">;
    document.getElementById('slot3').innerHTML = <img src="${winningImage}" alt="$5 Gift Card">;

    // Increment the spin count
    spinCount++;
    localStorage.setItem("spinCount", spinCount);

    // Handle winning logic (always $5)
    if (winnersThisMonth < maxWinners) {
        // Get the confirmation number for this spin
        const winnerConfirmation = confirmationNumbers[winnersThisMonth];
        
        // Increment winners for the month
        winnersThisMonth++;
        localStorage.setItem('winnersThisMonth', winnersThisMonth);

        // Mark that the player has won today
        dailyWin = true;
        localStorage.setItem('dailyWin', 'true');

        // Update the result display
        document.getElementById('result').textContent = Congratulations! You won a $${prizeAmount} gift card! Your confirmation number is: ${winnerConfirmation};
    } else {
        document.getElementById('result').textContent = "Sorry, no more winners this month!";
    }

    // Update spin count and check limits
    checkSpinLimit();
}

// Reset spin count and win status at midnight
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        localStorage.removeItem('spinCount');
        localStorage.removeItem('dailyWin');
    }
}, 60000); // Check every minute

// Initialize page state
checkSpinLimit();
