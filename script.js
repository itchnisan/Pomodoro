let workButton = document.getElementById("work");
let breakButton = document.getElementById("break-btn");
let inputworkTime = document.getElementById("time");
let inputbreakTime = document.getElementById("break");
let buttonParam = document.getElementById("parameter");
let buttoncloseParam = document.getElementById("closeparameter");

document.getElementById("start").addEventListener("click", mainStart);
document.getElementById("reset").addEventListener("click", resetTimer);


// Variables pour le minuteur
let workTime = parseInt(inputworkTime.value) || 25;  
let breakTime = parseInt(inputbreakTime.value) || 5;  



let seconds = 59;

let isWorkMode = true;
let workMinutes = workTime - 1;
let breakMinutes = breakTime - 1;

buttoncloseParam.addEventListener("click", () => {
    document.body.classList.remove("parameter");
});

buttonParam.addEventListener("click", () => {
    document.body.classList.add("parameter");
});

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    workButton.classList.add('active');
};

function resetTimer() {
    workTime = parseInt(localStorage.getItem('workTime')) || workTime;
    breakTime = parseInt(localStorage.getItem('breakTime')) || breakTime;
    location.reload(); // Recharge la page pour réinitialiser le minuteur
}

// Vérifie si les inputs sont modifiés et mets à jour les variables correspondantes
inputworkTime.addEventListener("change", () => {
    workTime = parseInt(inputworkTime.value) || 25; // Valeur par défaut si l'entrée est vide ou invalide
    if(workTime < 0){
        workTime = 1;
        inputworkTime.value = 1;
        alert("Value is not avaible");
    }
    workMinutes = workTime - 1; // Mise à jour des minutes de travail
    document.getElementById('minutes').innerHTML = workTime;
    localStorage.setItem('workTime', workTime);

});

inputbreakTime.addEventListener("change", () => {
    breakTime = parseInt(inputbreakTime.value) || 5; // Valeur par défaut si l'entrée est vide ou invalide
    if(breakTime < 0){
        breakTime = 1;
        inputbreakTime.value = 1;
        alert("Value is not avaible");
    }
    breakMinutes = breakTime - 1; // Mise à jour des minutes de pause
    localStorage.setItem('breakTime', breakTime);
});



if (localStorage.getItem('workTime')) {
    workTime = parseInt(localStorage.getItem('workTime'));
}
if (localStorage.getItem('breakTime')) {
    breakTime = parseInt(localStorage.getItem('breakTime'));
}




function mainStart() {
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    seconds = 59;

    let timerFunction = () => {
        // Si mode travail, affiche les minutes et secondes de travail
        if (isWorkMode) {
            document.getElementById('minutes').innerHTML = workMinutes;
        } else {
            document.getElementById('minutes').innerHTML = breakMinutes;
        }
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        // Décrémenter les secondes
        seconds--;

        // Si les secondes arrivent à zéro
        if (seconds === 0) {
            if (isWorkMode) {
                if (workMinutes > 0) {
                    workMinutes--;
                } else {
                    // Passe en mode pause, mais ne réinitialise pas `breakMinutes`
                    isWorkMode = false;
                    workButton.classList.toggle("active-work");
                    breakButton.classList.toggle("active-break");
                }
            } else {
                if (breakMinutes > 0) {
                    breakMinutes--;
                } else {
                    workButton.classList.toggle("active-work");
                    breakButton.classList.toggle("active-break");
                    // Passe en mode travail, mais ne réinitialise pas `workMinutes`
                    isWorkMode = true;
                    workMinutes = workTime - 1; // Réinitialisation après la fin de la pause
                }
            }
            // Réinitialiser les secondes à 59 pour le prochain minuteur
            seconds = 59;
        }
    };
    setInterval(timerFunction, 1000);
}
