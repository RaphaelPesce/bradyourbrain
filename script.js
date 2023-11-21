// Liste de vos fichiers audio
const audioList = [{ src: 'netflix.mp3', message: 'Netflix' },
{ src: 'mac.mp3', message: 'Mac' },
{ src: 'cocacola.mp3', message: 'Coca Cola or Pepsi' },
{ src: 'sncf.mp3', message: 'SNCF' },
{ src: 'ikea.mp3', message: 'IKEA' }, { src: 'mcdonalds.mp3', message: "Mc Donald 's" }, { src: 'samsung.mp3', message: 'Samsung' }, { src: 'sony.mp3', message: 'Sony' }];

// Récupération des éléments du DOM
const audioPlayer = document.getElementById('audioPlayer');
const preCountdownTimer = document.getElementById('preCountdownTimer'); // Élément pour le décompte avant la lecture
const countdownTimer = document.getElementById('countdownTimer');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('endMessage'); // Élément pour le message de fin

// Ajout d'un écouteur d'événement sur le bouton pour démarrer la lecture
document.getElementById('playButton').addEventListener('click', function () {
    startPreCountdown(3); // Décompte de 5 secondes avant de jouer le son
});

// Fonction pour démarrer un décompte avant de jouer le son
function startPreCountdown(duration) {
    let time = duration;
    preCountdownTimer.textContent = `Time : ${time} secondes`;
    preCountdownTimer.style.display = 'block';

    const interval = setInterval(function () {
        time--;
        preCountdownTimer.textContent = `time : ${time} secondes`;

        if (time <= 0) {
            clearInterval(interval);
            preCountdownTimer.style.display = 'none';
            playRandomSound(); // Jouer le son après le décompte
        }
    }, 1000);
}

// Fonction pour jouer un son aléatoire de la liste
function playRandomSound() {
    const randomIndex = Math.floor(Math.random() * audioList.length);
    const selectedSound = audioList[randomIndex];

    audioPlayer.src = selectedSound.src;
    audioPlayer.play();

    audioPlayer.onended = function () {
        startPostCountdown(5, selectedSound.message);
    };
}

function startPostCountdown(duration, message) {
    let time = duration;
    countdownTimer.style.display = 'block';
    timerElement.textContent = time;
    messageElement.style.display = 'none';

    const interval = setInterval(function () {
        time--;
        timerElement.textContent = time;

        if (time <= 0) {
            clearInterval(interval);
            countdownTimer.style.display = 'none';
            messageElement.textContent = message;
            messageElement.style.display = 'block';

            // Définir un délai pour cacher le message après 5 secondes
            setTimeout(function () {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }, 1000);
}