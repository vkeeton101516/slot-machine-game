const sheetUrl = 'https://script.google.com/macros/s/AKfycbwohCvT1GGGlUZRgrriFl7h_UVztADtAGGOZvPHsPoWxFUH5mMMFpiODNykuh06h0cTOw/exec'; // Your Google Apps Script URL

let spinCount = 0; // Initialize spin count
let confirmationNumber = '';

// Ensure the user can only spin 3 times per day
const maxSpinsPerDay = 3;

// Function to send data to Google Sheets
function sendToGoogleSheets(data) {
    fetch(sheetUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log('Data sent to Google Sheets successfully:', responseData);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}

// Function to get the confirmation number
function generateConfirmationNumber() {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // Generate a random 6-digit number
}

// Function to handle the spin logic
function handleSpin() {
    // Check if the user has exceeded the max spins per day
    if (spinCount >= maxSpinsPerDay) {
        alert('You have reached your maximum spins for today.');
        return;
    }

    spinCount++; // Increment spin count

    // Generate a confirmation number
    confirmationNumber = generateConfirmationNumber();

    // Get current time (timestamp)
    const timestamp = new Date().toISOString();

    // Simulate getting a prize (for now, you can change this to actual logic)
    const prize = '$5 Gift Card';

    // Prepare the data to send to Google Sheets
    const data = {
        confirmationNumber: confirmationNumber,
        timestamp: timestamp,
        spinCount: spinCount,
        prize: prize
    };

    // Send the data to Google Sheets
    sendToGoogleSheets(data);

    // Log the result
    console.log('Spin completed:', data);
}

// Call this when the spin button is clicked (for example)
document.getElementById('spinButton').addEventListener('click', handleSpin);

