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

// Variable pour suivre le dernier son joué et l'état du décompte
let lastPlayedSound = null;
let countdownStarted = false;

// Gestionnaire d'événements pour le bouton Play
playButton.addEventListener('click', function () {
    // Lancer un décompte avant de jouer le son
    startPreCountdown(2);
    // Désactiver le bouton Play pendant le décompte
    this.disabled = true;
    // Désactiver le bouton Show Answer jusqu'à la fin du décompte
    showMessageButton.disabled = true;
    // Cacher le message précédent
    messageElement.style.display = 'none';
});

// Fonction pour démarrer un décompte avant de jouer le son
function startPreCountdown(duration) {
    let time = duration;
    preCountdownTimer.textContent = `The sound starts in : ${time} seconds`;
    preCountdownTimer.style.display = 'block';

    // Mise en place d'un intervalle pour le décompte
    const interval = setInterval(function () {
        time--;
        preCountdownTimer.textContent = `The sound starts in : ${time} seconds`;

        // Lorsque le décompte atteint 0, jouer le son
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
    playSound(lastPlayedSound);

    // Réinitialiser l'indicateur de décompte pour permettre un nouveau décompte
    countdownStarted = false;

    // Définir une action lorsque le son se termine
    audioPlayer.onended = function () {
        // Lancer un décompte après la fin du son, si ce n'est pas une relecture
        if (!countdownStarted) {
            startPostCountdown(15, lastPlayedSound.message);
        }
    };
}

// Fonction pour jouer un son
function playSound(sound) {
    // Définir la source et jouer l'audio
    audioPlayer.src = sound.src;
    audioPlayer.play();
}

// Fonction pour démarrer un décompte après la fin de la lecture du son
function startPostCountdown(duration, message) {
    // Lancer le décompte seulement s'il n'a pas déjà commencé
    if (!countdownStarted) {
        let time = duration;
        countdownTimer.style.display = 'block';
        timerElement.textContent = time;

        // Mise en place d'un intervalle pour le décompte
        const interval = setInterval(function () {
            time--;
            timerElement.textContent = time;

            // À la fin du décompte, afficher le bouton Show Answer
            if (time <= 0) {
                clearInterval(interval);
                countdownTimer.style.display = 'none';
                showMessageButton.disabled = false;
                countdownStarted = true; // Marquer le décompte comme terminé
            }
        }, 1000);
    }

    // Afficher le message lorsque le bouton Show Answer est cliqué
    showMessageButton.onclick = function () {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        // Réactiver le bouton Play pour un nouveau cycle
        playButton.disabled = false;
    };
}

// Gestionnaire d'événements pour le bouton Replay
replayButton.addEventListener('click', function () {
    // Rejouer le dernier son si disponible
    if (lastPlayedSound) {
        playSound(lastPlayedSound);
    }
});