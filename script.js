// Liste de vos fichiers audio
const audioList = [
    { src: 'sounds/netflix.mp3', message: 'Netflix', difficulty: 'Easy', points: '1' },
    { src: 'sounds/mac.mp3', message: 'Apple', difficulty: 'Medium', points: '2' },
    { src: 'sounds/sncf.mp3', message: 'SNCF', difficulty: 'Easy', points: '1' },
    { src: 'sounds/ikea.mp3', message: 'IKEA', difficulty: 'Hard', points: '3' },
    { src: 'sounds/mcdonalds.mp3', message: "Mc Donald's", difficulty: 'Easy', points: '1' },
    { src: 'sounds/samsung.mp3', message: 'Samsung', difficulty: 'Hard', points: '3' },
    { src: 'sounds/sony.mp3', message: 'Sony', difficulty: 'Hard', points: '3' },
    { src: 'sounds/intel.mp3', message: 'Intel', difficulty: 'Medium', points: '2' },
    { src: 'sounds/toyota.mp3', message: 'Toyota', difficulty: 'Hard', points: '3' },
    { src: 'sounds/nvidia.mp3', message: 'Nvidia', difficulty: 'Hard', points: '3' },
    { src: 'sounds/gilette.mp3', message: 'Gilette', difficulty: 'Easy', points: '1' },
    { src: 'sounds/soda.mp3', message: 'Coca Cola or Pepsi', difficulty: 'Hard', points: '3' },
    { src: 'sounds/mastercard.mp3', message: 'Mastercard', difficulty: 'Easy', points: '1' },
    { src: 'sounds/lg.mp3', message: 'LG', difficulty: 'Medium', points: '2' },
    { src: 'sounds/renault.mp3', message: 'Renault', difficulty: 'Medium', points: '2' },
    { src: 'sounds/sfr.mp3', message: 'SFR', difficulty: 'Medium', points: '2' },
    { src: 'sounds/ratp.mp3', message: 'RATP', difficulty: 'Hard', points: '3' },
    { src: 'sounds/xbox.mp3', message: 'Xbox', difficulty: 'Medium', points: '2' },
    { src: 'sounds/dreamworks.mp3', message: 'Dreamworks', difficulty: 'Hard', points: '3' },
    { src: 'sounds/20thcentury.mp3', message: '20th Century Fox', difficulty: 'Medium', points: '2' },
    { src: 'sounds/messenger.mp3', message: 'Messenger', difficulty: 'Easy', points: '1' },
    { src: 'sounds/disney.mp3', message: 'Disney', difficulty: 'Medium', points: '2' },
    { src: 'sounds/haribo.mp3', message: 'Haribo', difficulty: 'Easy', points: '1' },
    { src: 'sounds/playstation.mp3', message: 'Playstation', difficulty: 'Medium', points: '2' },
    { src: 'sounds/rtl.mp3', message: 'RTL', difficulty: 'Medium', points: '2' },
    { src: 'sounds/decathlon.mp3', message: 'Decathlon', difficulty: 'Easy', points: '1' }
];

// Récupération des éléments du DOM
const audioPlayer = document.getElementById('audioPlayer');
const preCountdownTimer = document.getElementById('preCountdownTimer');
const countdownTimer = document.getElementById('countdownTimer');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('endMessage');
const playButton = document.getElementById('playButton');
const replayButton = document.getElementById('replayButton');
const showMessageButton = document.getElementById('showMessageButton');

// Variables pour suivre le dernier son joué et l'état du décompte
let lastPlayedSound = null;
let countdownStarted = false;
let countdownInterval = null; // Variable pour gérer l'intervalle de décompte

// Gestionnaire d'événements pour le bouton Play
playButton.addEventListener('click', function () {
    // Réinitialiser et démarrer un nouveau cycle
    countdownStarted = false;
    if (countdownInterval) {
        clearInterval(countdownInterval); // Arrêter tout décompte en cours
        countdownInterval = null;
    }
    startPreCountdown(2);
    this.disabled = true;
    showMessageButton.disabled = true;
    messageElement.style.display = 'none';
});

// Fonction pour démarrer un décompte avant de jouer le son
function startPreCountdown(duration) {
    let time = duration;
    preCountdownTimer.textContent = `The sound starts in: ${time} seconds`;
    preCountdownTimer.style.display = 'block';

    const interval = setInterval(function () {
        time--;
        preCountdownTimer.textContent = `The sound starts in: ${time} seconds`;

        if (time <= 0) {
            clearInterval(interval);
            preCountdownTimer.style.display = 'none';
            playRandomSound();
        }
    }, 1000);
}

// Fonction pour choisir et jouer un son aléatoire
function playRandomSound() {
    // Sélection aléatoire d'un son dans la liste
    const randomIndex = Math.floor(Math.random() * audioList.length);
    lastPlayedSound = audioList[randomIndex];
    // Mise à jour des informations de difficulté et de points
    document.getElementById('difficulty').textContent = `Difficulty: ${lastPlayedSound.difficulty}`;
    document.getElementById('points').textContent = `Points: ${lastPlayedSound.points}`;
    // Jouer le son sélectionné
    playSound(lastPlayedSound, false);
}

// Fonction pour jouer un son
function playSound(sound, isReplay) {
    audioPlayer.src = sound.src;
    audioPlayer.play();

    // Lancer le décompte après la première lecture
    if (!isReplay && !countdownStarted) {
        audioPlayer.onended = function () {
            if (!countdownStarted) {
                startPostCountdown(15, lastPlayedSound.message);
            }
        };
    }
}

// Fonction pour démarrer un décompte après la fin de la lecture du son
function startPostCountdown(duration, message) {
    if (!countdownStarted) {
        let time = duration;
        countdownTimer.style.display = 'block';
        timerElement.textContent = time;
        countdownStarted = true;

        countdownInterval = setInterval(function () {
            time--;
            timerElement.textContent = time;

            if (time <= 0) {
                clearInterval(countdownInterval);
                countdownInterval = null;
                countdownTimer.style.display = 'none';
                showMessageButton.disabled = false;
                countdownStarted = false; // Permet de relancer le décompte pour un nouveau cycle
            }
        }, 1000);
    }

    // Afficher le message lorsque le bouton Show Answer est cliqué
    showMessageButton.onclick = function () {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        playButton.disabled = false; // Réactiver le bouton Play pour un nouveau cycle
    };
}

// Gestionnaire d'événements pour le bouton Replay
replayButton.addEventListener('click', function () {
    if (lastPlayedSound) {
        playSound(lastPlayedSound, true); // Rejouer le son sans relancer le décompte
    }
});