// Initialize EmailJS
emailjs.init('yCnHriCezqRaik1uV');  // Use your Public Key here

const slotImages = [
    "https://iili.io/2m5cdSp.jpg",  // $5 Gift Card
    "https://iili.io/2m5ccib.jpg",  // $10 Gift Card
    "https://iili.io/2m5lFrx.jpg"   // $50 Gift Card
];

let spinCount = localStorage.getItem("spinCount") ? parseInt(localStorage.getItem("spinCount")) : 0;
const maxSpins = 3;

function getRandomImage() {
    return slotImages[Math.floor(Math.random() * slotImages.length)];
}

function spin() {
    if (spinCount >= maxSpins) {
        document.getElementById('warning').textContent = "You have reached the daily spin limit!";
        return;
    }

    let slot1 = document.getElementById('slot1');
    let slot2 = document.getElementById('slot2');
    let slot3 = document.getElementById('slot3');

    // Add some temporary image to start the spin
    slot1.innerHTML = '<img src="' + getRandomImage() + '" alt="Slot Image">';
    slot2.innerHTML = '<img src="' + getRandomImage() + '" alt="Slot Image">';
    slot3.innerHTML = '<img src="' + getRandomImage() + '" alt="Slot Image">';

    // Reset and apply spin effect every time
    slot1.classList.remove('spinning');
    slot2.classList.remove('spinning');
    slot3.classList.remove('spinning');

    // Trigger the spin effect
    setTimeout(() => {
        slot1.classList.add('spinning');
        slot2.classList.add('spinning');
        slot3.classList.add('spinning');
    }, 10);

    spinCount++;
    localStorage.setItem("spinCount", spinCount); // Store updated spin count
    setTimeout(() => {
        checkResult();
    }, 1000); // Wait for 1 second before checking result
}

function checkResult() {
    let slot1 = document.getElementById('slot1').querySelector('img').src;
    let slot2 = document.getElementById('slot2').querySelector('img').src;
    let slot3 = document.getElementById('slot3').querySelector('img').src;

    if (slot1 === slot2 && slot2 === slot3) {
        let confirmationNumber = generateConfirmationNumber();
        document.getElementById('result').innerHTML = "<span class='neon-text'>You Win!</span> Confirmation Number: " + confirmationNumber;
        sendEmail(confirmationNumber, slot1);
    } else {
        document.getElementById('result').innerHTML = "<span class='neon-text'>Try Again!</span>";
    }
}

function generateConfirmationNumber() {
    return Math.floor(Math.random() * 1000000);  // Random confirmation number between 0 and 999999
}

function sendEmail(confirmationNumber, prizeImage) {
    let prize = prizeImage.includes('2m5cdSp') ? "5" : prizeImage.includes('2m5ccib') ? "10" : "50";

    // Prepare the email data
    const emailData = {
        confirmationNumber: confirmationNumber,
        prize: prize
    };

    // Send the email using your service ID and template ID
    emailjs.send('service_9uor8xn', 'template_yru4mx7', emailData)
    .then((response) => {
        console.log('Email sent successfully:', response);
    })
    .catch((error) => {
        console.error('Error sending email:', error);
    });
}
