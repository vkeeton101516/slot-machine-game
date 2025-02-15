document.addEventListener("DOMContentLoaded", function () {
    const spinButton = document.getElementById("spin");
    const slotReels = document.querySelectorAll(".reel");
    const message = document.getElementById("message");
    const remainingSpinsKey = "remainingSpins";
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbwohCvT1GGGlUZRgrriFl7h_UVztADtAGGOZvPHsPoWxFUH5mMMFpiODNykuh06h0cTOw/exec"; // Replace with your actual Apps Script URL

    let remainingSpins = localStorage.getItem(remainingSpinsKey) !== null ? parseInt(localStorage.getItem(remainingSpinsKey)) : 3;
    
    updateSpinCountDisplay();

    spinButton.addEventListener("click", function () {
        if (remainingSpins <= 0) {
            message.textContent = "No more spins left for today!";
            return;
        }

        remainingSpins--;
        localStorage.setItem(remainingSpinsKey, remainingSpins);
        updateSpinCountDisplay();

        let result = spinReels();
        let prize = determinePrize(result);
        let confirmationNumber = generateConfirmationNumber();

        if (prize) {
            message.textContent = `Congratulations! You won a ${prize}! Confirmation #${confirmationNumber}`;
            sendToGoogleSheets(confirmationNumber, prize);
        } else {
            message.textContent = "Sorry, no win this time!";
        }
    });

    function updateSpinCountDisplay() {
        document.getElementById("spin-count").textContent = `Remaining Spins: ${remainingSpins}`;
    }

    function spinReels() {
        let symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "💎"];
        let result = [];

        slotReels.forEach(reel => {
            let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
            result.push(randomSymbol);
        });

        return result;
    }

    function determinePrize(result) {
        let counts = result.reduce((acc, symbol) => {
            acc[symbol] = (acc[symbol] || 0) + 1;
            return acc;
        }, {});

        if (counts["⭐"] === 3) return "$5 Gift Card"; // Only 5 winners per week, handled in Google Sheets
        return null;
    }

    function generateConfirmationNumber() {
        return Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    }

    function sendToGoogleSheets(confirmationNumber, prize) {
        fetch(googleScriptURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                confirmationNumber: confirmationNumber,
                spinCount: remainingSpins,
                prize: prize
            })
        })
        .then(response => response.json())
        .then(data => console.log("Data sent successfully:", data))
        .catch(error => console.error("Error sending data:", error));
    }
});

      
  
