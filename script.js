const slotImages = [
    "https://i.postimg.cc/wB88DKyb/video-slot-machine-symbols-cherries-thumbnail-square-0000.jpg", // Cherry
    "https://i.postimg.cc/yxXXpZvZ/depositphotos-159290092-stock-illustration-slot-machine-seven-icon-color.webp" // Non-winning symbol
];

const confirmationNumbers = [
    "45875664", "58761232", "87653099", "14589736", "01589536", "25796864", "28658901", 
    "02040587", "32158964", "38561515", "71456611", "82547125", "94585477", "05161983", 
    "02262007", "09232009", "04586652", "17565211", "25893455", "24751855"
];

let spinCount = parseInt(localStorage.getItem("spinCount")) || 0;
const maxSpins = 5;
let monthlyWinners = parseInt(localStorage.getItem("monthlyWinners")) || 0;
const maxWinners = 20;

function getRandomImage() {
    return slotImages[Math.floor(Math.random() * slotImages.length)];
}

function spin() {
    if (spinCount >= maxSpins) {
        document.getElementById('warning').textContent = "You have reached the daily spin limit!";
        return;
    }

    if (monthlyWinners >= maxWinners) {
        document.getElementById('warning').textContent = "The monthly winner limit has been reached.";
        return;
    }

    let slot1 = document.getElementById('slot1');
    let slot2 = document.getElementById('slot2');
    let slot3 = document.getElementById('slot3');

    let tempImages = [getRandomImage(), getRandomImage(), getRandomImage()];

    // Smooth Spin Effect
    let spinDuration = 2000; // Total spin time
    let intervalDuration = 50; // Time interval for each image change
    let totalIterations = spinDuration / intervalDuration;
    let currentIteration = 0;

    let spinInterval = setInterval(() => {
        slot1.src = getRandomImage();
        slot2.src = getRandomImage();
        slot3.src = getRandomImage();
        currentIteration++;

        if (currentIteration >= totalIterations) {
            clearInterval(spinInterval);
            slot1.src = tempImages[0];
            slot2.src = tempImages[1];
            slot3.src = tempImages[2];
            checkResult(tempImages);
        }
    }, intervalDuration);

    spinCount++;
    localStorage.setItem("spinCount", spinCount);
}

function checkResult(images) {
    if (images[0] === images[1] && images[1] === images[2] && images[0] === "https://i.postimg.cc/wB88DKyb/video-slot-machine-symbols-cherries-thumbnail-square-0000.jpg") {
        document.getElementById('result').innerHTML = "<span style='color: yellow;'>You Win!</span>";

        // Select a random winner from the list of confirmation numbers
        let winnerIndex = Math.floor(Math.random() * confirmationNumbers.length);
        let winnerConfirmation = confirmationNumbers.splice(winnerIndex, 1)[0]; // Remove the winner to avoid duplicate
        monthlyWinners++;
        localStorage.setItem("monthlyWinners", monthlyWinners);

        // Show confirmation number
        document.getElementById('result').innerHTML += "<br>Confirmation Number: " + winnerConfirmation;
    } else {
        document.getElementById('result').innerHTML = "<span style='color: red;'>Try Again!</span>";
    }
}
