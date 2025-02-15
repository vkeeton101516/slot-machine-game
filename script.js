document.addEventListener("DOMContentLoaded", function() {
    let remainingSpins = localStorage.getItem("remainingSpins");
    if (remainingSpins === null) {
        localStorage.setItem("remainingSpins", 3);
        remainingSpins = 3;
    }

    document.getElementById("spin-button").addEventListener("click", function() {
        if (remainingSpins > 0) {
            spinReels();
            remainingSpins--;
            localStorage.setItem("remainingSpins", remainingSpins);
            document.getElementById("remaining-spins").textContent = remainingSpins;
        } else {
            alert("No more spins left for today!");
        }
    });

    function spinReels() {
        const slotSymbols = ["🍒", "🍋", "🔔", "🍊", "⭐", "7️⃣"];
        const reels = [
            document.getElementById("reel1"),
            document.getElementById("reel2"),
            document.getElementById("reel3")
        ];

        reels.forEach(reel => {
            reel.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        });

        setTimeout(checkResult, 1000);
    }

    function checkResult() {
        const reels = [
            document.getElementById("reel1").textContent,
            document.getElementById("reel2").textContent,
            document.getElementById("reel3").textContent
        ];

        let prize = "No Win";
        if (reels[0] === reels[1] && reels[1] === reels[2]) {
            prize = "Gift Card $5";
        }

        if (prize !== "No Win") {
            const confirmationNumber = generateConfirmationNumber();
            alert(`Congratulations! You won: ${prize}. Your confirmation number: ${confirmationNumber}`);
            sendToGoogleSheets(confirmationNumber, prize);
        } else {
            alert("Try again!");
        }
    }

    function generateConfirmationNumber() {
        return "CONF" + Math.floor(100000 + Math.random() * 900000);
    }

    function sendToGoogleSheets(confirmationNumber, prize) {
        const timestamp = new Date().toISOString();
        const spinCount = localStorage.getItem("remainingSpins");

        fetch("https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_URL/exec", {
            method: "POST",
            mode: "no-cors", // Prevents CORS errors
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                timestamp: timestamp,
                confirmationNumber: confirmationNumber,
                spinCount: spinCount,
                prize: prize
            })
        })
        .then(() => console.log("Data sent successfully"))
        .catch(error => console.error("Error sending data:", error));
    }
});

