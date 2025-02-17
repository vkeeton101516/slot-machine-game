// Function to handle the spin action
function spin() {
    console.log("Spin function triggered");
    
    if (spinCount >= maxSpins) {
        document.getElementById('warning').textContent = "You have reached the weekly spin limit!";
        console.log("Spin limit reached");
        return;
    }

    // Simulate the spin (always show 3 $5 cards for a win)
    const winningImage = slotImages[0]; // Always show $5 card for all three slots
    console.log("Winning image: " + winningImage);

    // Set the image directly to the slots
    document.getElementById('slot1').innerHTML = <img src="${winningImage}" alt="$5 Gift Card">;
    document.getElementById('slot2').innerHTML = <img src="${winningImage}" alt="$5 Gift Card">;
    document.getElementById('slot3').innerHTML = <img src="${winningImage}" alt="$5 Gift Card">;

    // Handle winning logic (always $5)
    if (winnersThisMonth < maxWinners) {
        winnersThisMonth++;
        localStorage.setItem('winnersThisMonth', winnersThisMonth);

        const winnerIndex = winnersThisMonth - 1;
        const winnerConfirmationNumber = confirmationNumbers[winnerIndex];

        document.getElementById('result').textContent = Congratulations! You won a $5 gift card! Your confirmation number is: ${winnerConfirmationNumber};

        // Increment spin count
        spinCount++;
        localStorage.setItem('spinCount', spinCount);
    } else {
        document.getElementById('result').textContent = "Sorry, no more winners this month!";
    }

    // Update spin count and check limits
    checkSpinLimit();
}

// Function to check the spin limit
function checkSpinLimit() {
    console.log("Checking spin limit");
    if (spinCount >= maxSpins) {
        document.querySelector('.spin-button').disabled = true;
        document.getElementById('result').textContent = dailyLimitMessage;
        console.log("Spin button disabled due to spin limit");
    } else {
        document.querySelector('.spin-button').disabled = false;
    }
}
Sent


