// Liste de vos fichiers audio
const audioList = [
    { src: 'sounds/netflix.mp3', message: 'Netflix : Difficulty 1' },
    { src: 'sounds/mac.mp3', message: 'Mac : Difficulty 1' },
    { src: 'sounds/cocacola.mp3', message: 'Coca Cola or Pepsi : Difficulty 3' },
    { src: 'sounds/sncf.mp3', message: 'SNCF : Difficulty 1' },
    { src: 'sounds/ikea.mp3', message: 'IKEA : Difficulty 2' },
    { src: 'sounds/mcdonalds.mp3', message: "Mc Donald 's : Difficulty 1" },
    { src: 'sounds/samsung.mp3', message: 'Samsung : Difficulty 3' },
    { src: 'sounds/sony.mp3', message: 'Sony : Difficulty 2' },
    { src: 'sounds/intel.mp3', message: 'Intel : Difficulty 1' },
    { src: 'sounds/toyota.mp3', message: 'Toyota : Difficulty 3' },
    { src: 'sounds/decathlon.mp3', message: 'Decathlon : Difficulty 2' }
];

// Récupération des éléments du DOM
const audioPlayer = document.getElementById('audioPlayer');
const preCountdownTimer = document.getElementById('preCountdownTimer'); // Pour le décompte avant la lecture
const countdownTimer = document.getElementById('countdownTimer'); // Pour le décompte après la lecture
const timerElement = document.getElementById('timer'); // Pour afficher le temps restant
const messageElement = document.getElementById('endMessage'); // Pour afficher le message de fin
const playButton = document.getElementById('playButton'); // Le bouton pour démarrer la lecture

// Ajout d'un écouteur d'événement sur le bouton pour démarrer la lecture
playButton.addEventListener('click', function () {
    startPreCountdown(2); // Lancer le décompte de 5 secondes avant de jouer le son
    this.disabled = true; // Désactiver le bouton pour empêcher des clics supplémentaires
});

// Fonction pour démarrer un décompte avant de jouer le son
function startPreCountdown(duration) {
    let time = duration;
    preCountdownTimer.textContent = `Le son va commencer dans : ${time} secondes`;
    preCountdownTimer.style.display = 'block'; // Afficher le timer

    const interval = setInterval(function () {
        time--;
        preCountdownTimer.textContent = `Le son va commencer dans : ${time} secondes`;

        if (time <= 0) {
            clearInterval(interval);
            preCountdownTimer.style.display = 'none'; // Cacher le timer
            playRandomSound(); // Jouer le son après le décompte
        }
    }, 1000);
}

// Fonction pour jouer un son aléatoire de la liste
function playRandomSound() {
    const randomIndex = Math.floor(Math.random() * audioList.length); // Choisir un index aléatoire
    const selectedSound = audioList[randomIndex]; // Récupérer le son sélectionné

    audioPlayer.src = selectedSound.src; // Définir la source du lecteur audio
    audioPlayer.play(); // Jouer le son

    // Lorsque le son se termine, lancer le décompte de fin
    audioPlayer.onended = function () {
        startPostCountdown(5, selectedSound.message); // Lancer le décompte après la fin du son
    };
}

// Fonction pour démarrer un décompte après la fin de la lecture
function startPostCountdown(duration, message) {
    let time = duration;
    countdownTimer.style.display = 'block'; // Afficher le timer
    timerElement.textContent = time; // Mettre à jour le texte du timer
    messageElement.style.display = 'none'; // Cacher le message initial

    const interval = setInterval(function () {
        time--;
        timerElement.textContent = time; // Mettre à jour le temps restant

        if (time <= 0) {
            clearInterval(interval);
            countdownTimer.style.display = 'none'; // Cacher le timer
            messageElement.textContent = message; // Afficher le message de fin
            messageElement.style.display = 'block'; // Rendre le message visible

            // Réactiver le bouton après que le message a été caché
            setTimeout(function () {
                messageElement.style.display = 'none'; // Cacher le message
                playButton.disabled = false; // Réactiver le bouton
            }, 5000);
        }
    }, 1000);
}