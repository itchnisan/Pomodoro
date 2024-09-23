let workButton = document.getElementById("work");
let breakButton = document.getElementById("break");

// variable for set the timer
let workTime = 25;
let breakTime = 5;
let seconds = "00";

// const wich increase when timer is launch
let buffer = 0;

function resetTimer() {
    location.reload(); // Recharge la page pour réinitialiser le minuteur
}

// Start the timer
function mainStart() {
   
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";//button reset
    
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    let breakCount = 0;

    // countdown Function
    let countdownFunction = () => {
        //increase buffer
        buffer++;
        //change the display 
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = (seconds < 10 ? "0" : "") + seconds; // Ajout du "0" pour formater correctement les secondes

        seconds--;

        if (seconds === -1) {
            workMinutes--;
            if (workMinutes === -1) {
                if (breakCount % 2 === 0) {
                    // Start the break
                    workMinutes = breakMinutes;
                    breakCount++;

                    //change the display 
                    workButton.classList.remove('active');
                    breakButton.classList.add('active');
                } else {
                    
                    workMinutes = workTime;
                    breakCount++;

                    //change the display 
                    breakButton.classList.remove('active');
                    workButton.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // Start countdown (every 1000 ms = 1 second)
    setInterval(countdownFunction, 1000);
}
