// Initialize emailJS with your user ID
emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS User ID

// Track the number of spins and wins
let spinCount = parseInt(localStorage.getItem('spinCount')) || 0;
let dailyWin = localStorage.getItem('dailyWin') === 'true' ? true : false;
let winnersThisMonth = parseInt(localStorage.getItem('winnersThisMonth')) || 0;
const maxSpins = 5;
const maxWinners = 20;
const dailyLimitMessage = "You've reached your spin limit for today. Please come back tomorrow!";

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
        document.getElementById('warning').textContent = "You have reached the weekly spin limit!";
        return;
    }

    let slotResults = ["$5", "$10", "$50"];
    slotResults.sort(() => Math.random() - 0.5);

    // Ensure "$10" and "$50" never appear in all three slots
    if (slotResults[0] === "$10" && slotResults[1] === "$10") {
        slotResults[2] = "$5";
    }
    if (slotResults[0] === "$50" && slotResults[1] === "$50") {
        slotResults[2] = "$5";
    }

    // Map slot results to images
    const slot1Image = slotImages[slotResults.indexOf("$5")];
    const slot2Image = slotImages[slotResults.indexOf("$10")];
    const slot3Image = slotImages[slotResults.indexOf("$50")];

    // Update images for each slot
    document.getElementById('slot1').querySelector('img').src = slot1Image;
    document.getElementById('slot2').querySelector('img').src = slot2Image;
    document.getElementById('slot3').querySelector('img').src = slot3Image;

    // Increment the spin count
    spinCount++;
    localStorage.setItem("spinCount", spinCount);

    // Update the result display
    document.getElementById('result').textContent = You won a ${slotResults.join(", ")}!;

    // Add confirmation number logic if necessary
    const winner = confirmationNumbers[spinCount - 1];
    if (winner) {
        document.getElementById('result').textContent +=  Your confirmation number is: ${winner};
        usedConfirmationNumbers.push(winner);
        localStorage.setItem("usedConfirmationNumbers", JSON.stringify(usedConfirmationNumbers));
    }

    }

    // Simulate the spin (always show 3 $5 cards for a win)
    const winningImage = slotImages[0]; // Always show $5 card for all three slots
    document.getElementById('slot1').innerHTML = `<img src="${winningImage}" alt="$5 Gift Card">`;
    document.getElementById('slot2').innerHTML = `<img src="${winningImage}" alt="$5 Gift Card">`;
    document.getElementById('slot3').innerHTML = `<img src="${winningImage}" alt="$5 Gift Card">`;

    // Handle winning logic (always $5)
    if (winnersThisMonth < maxWinners) {
        // Update the number of winners this month
        winnersThisMonth++;
        localStorage.setItem('winnersThisMonth', winnersThisMonth);

        // Mark that the player has won today
        dailyWin = true;
        localStorage.setItem('dailyWin', 'true');

        // Send email with confirmation number, name, and prize amount
        sendWinnerEmail();
        document.getElementById('result').textContent = `Congratulations! You won a $${prizeAmount} gift card!`;
    } else {
        document.getElementById('result').textContent = "Sorry, no more winners this month!";
    }

    // Update spin count and check limits
    spinCount++;
    localStorage.setItem('spinCount', spinCount);
    checkSpinLimit();
}

// Function to send winner email (you can also store the information in a database or log it in local storage)
function sendWinnerEmail() {
    const confirmationNumber = 'CONFIRMATION_NUMBER_' + Math.floor(Math.random() * 10000); // Random confirmation number for testing
    const playerName = prompt("Enter your name"); // You could also store this or gather it via form
    const message = {
        service_id: 'service_9uor8xn', // Replace with your EmailJS service ID
        template_id: 'template_yru4mx7', // Replace with your EmailJS template ID
        user_id: 'YOUR_USER_ID', // Replace with your EmailJS user ID
        template_params: {
            confirmation_number: confirmationNumber,
            player_name: playerName,
            prize_amount: prizeAmount
        }
    };

    emailjs.send(message.service_id, message.template_id, message.template_params, message.user_id)
        .then(function(response) {
            console.log('Email sent successfully', response);
        }, function(error) {
            console.error('Error sending email', error);
        });
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
