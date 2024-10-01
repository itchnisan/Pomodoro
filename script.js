let workButton = document.getElementById("work");  // Button to indicate work mode
let breakButton = document.getElementById("break-btn");  // Button to indicate break mode
let inputworkTime = document.getElementById("time");  // Input field to set work time
let inputbreakTime = document.getElementById("break");  // Input field to set break time
let buttonParam = document.getElementById("parameter");  // Button to open settings/parameters
let buttoncloseParam = document.getElementById("closeparameter");  // Button to close settings/parameters

// Add event listeners for start and reset buttons
document.getElementById("start").addEventListener("click", mainStart);
document.getElementById("reset").addEventListener("click", resetTimer);

// Variables for the timer
let workTime = parseInt(inputworkTime.value) || 25;  // Default work time is 25 minutes
let breakTime = parseInt(inputbreakTime.value) || 5;  // Default break time is 5 minutes
let seconds = 59;  // Starting seconds value
let isWorkMode = true;  // Initial mode is work
let workMinutes = workTime - 1;  // Minutes for work mode (set one minute less because of how timer works)
let breakMinutes = breakTime - 1;  // Minutes for break mode

// Close the settings when the button is clicked
buttoncloseParam.addEventListener("click", () => {
    document.body.classList.remove("parameter");
});

// Open the settings when the button is clicked
buttonParam.addEventListener("click", () => {
    document.body.classList.add("parameter");
});

// Set the initial display when the page is loaded
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;  // Display initial work time in minutes
    document.getElementById('seconds').innerHTML = "00";  // Display seconds as "00"
    workButton.classList.add('active');  // Set work button as active
};

// Function to reset the timer
function resetTimer() {
    workTime = parseInt(localStorage.getItem('workTime')) || workTime;  // Load saved work time or use current value
    breakTime = parseInt(localStorage.getItem('breakTime')) || breakTime;  // Load saved break time or use current value
    location.reload();  // Reload the page to reset the timer
}

// Update workTime if the input changes
inputworkTime.addEventListener("change", () => {
    workTime = parseInt(inputworkTime.value) || 25;  // Set new work time or default to 25 minutes if invalid
    if(workTime < 0){
        workTime = 1;  // Minimum allowed work time is 1 minute
        inputworkTime.value = 1;  // Correct the input field
        alert("Value is not available");  // Show an alert if the input value is invalid
    }
    workMinutes = workTime - 1;  // Update the minutes for work mode
    document.getElementById('minutes').innerHTML = workTime;  // Display the updated work time
    localStorage.setItem('workTime', workTime);  // Save the new work time in local storage
});

// Update breakTime if the input changes
inputbreakTime.addEventListener("change", () => {
    breakTime = parseInt(inputbreakTime.value) || 5;  // Set new break time or default to 5 minutes if invalid
    if(breakTime < 0){
        breakTime = 1;  // Minimum allowed break time is 1 minute
        inputbreakTime.value = 1;  // Correct the input field
        alert("Value is not available");  // Show an alert if the input value is invalid
    }
    breakMinutes = breakTime - 1;  // Update the minutes for break mode
    localStorage.setItem('breakTime', breakTime);  // Save the new break time in local storage
});

// Load saved work and break times from local storage, if available
if (localStorage.getItem('workTime')) {
    workTime = parseInt(localStorage.getItem('workTime'));
}
if (localStorage.getItem('breakTime')) {
    breakTime = parseInt(localStorage.getItem('breakTime'));
}

// Function to start the timer
function mainStart() {
    document.getElementById('start').style.display = "none";  // Hide the start button
    document.getElementById('reset').style.display = "block";  // Show the reset button
    seconds = 59;  // Reset seconds to 59

    // Define the timer function to update the display and countdown
    let timerFunction = () => {
        // If in work mode, display work minutes and seconds
        if (isWorkMode) {
            document.getElementById('minutes').innerHTML = workMinutes;
        } else {
            // If in break mode, display break minutes and seconds
            document.getElementById('minutes').innerHTML = breakMinutes;
        }
        // Display seconds, ensuring double digits (e.g., "09" instead of "9")
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        seconds--;  // Decrement seconds

        // If seconds reach zero
        if (seconds === 0) {
            if (isWorkMode) {
                if (workMinutes > 0) {
                    workMinutes--;  // Decrease work minutes
                } else {
                    // Switch to break mode, without resetting breakMinutes
                    isWorkMode = false;
                    workButton.classList.toggle("active-work");  // Toggle work button state
                    breakButton.classList.toggle("active-break");  // Toggle break button state
                }
            } else {
                if (breakMinutes > 0) {
                    breakMinutes--;  // Decrease break minutes
                } else {
                    // Switch back to work mode, without resetting workMinutes
                    workButton.classList.toggle("active-work");  // Toggle work button state
                    breakButton.classList.toggle("active-break");  // Toggle break button state
                    isWorkMode = true;  // Return to work mode
                    workMinutes = workTime - 1;  // Reset work minutes after the break
                }
            }
            // Reset seconds to 59 for the next minute
            seconds = 59;
        }
    };
    // Start the timer function, running every second
    setInterval(timerFunction, 1000);
}
