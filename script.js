// Liste de vos fichiers audio
const audioList = [
    { src: 'sounds/netflix.mp3', message: 'Netflix', difficulty: 'Easy', points: '1' },
    { src: 'sounds/mac.mp3', message: 'Apple', difficulty: 'Easy', points: '1' },
    { src: 'sounds/sncf.mp3', message: 'SNCF', difficulty: 'Easy', points: '1' },
    { src: 'sounds/ikea.mp3', message: 'IKEA', difficulty: 'Easy', points: '1' },
    { src: 'sounds/mcdonalds.mp3', message: "Mc Donald's", difficulty: 'Easy', points: '1' },
    { src: 'sounds/samsung.mp3', message: 'Samsung', difficulty: 'Easy', points: '1' },
    { src: 'sounds/sony.mp3', message: 'Sony', difficulty: 'Easy', points: '1' },
    { src: 'sounds/intel.mp3', message: 'Intel', difficulty: 'Easy', points: '1' },
    { src: 'sounds/toyota.mp3', message: 'Toyota', difficulty: 'Easy', points: '1' },
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

let lastPlayedSound = null;

playButton.addEventListener('click', function () {
    startPreCountdown(2);
    this.disabled = true;
    showMessageButton.disabled = true;
    messageElement.style.display = 'none';
});

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

function playRandomSound() {
    const randomIndex = Math.floor(Math.random() * audioList.length);
    lastPlayedSound = audioList[randomIndex];
    document.getElementById('difficulty').textContent = `Difficulty: ${lastPlayedSound.difficulty}`;
    document.getElementById('points').textContent = `Points: ${lastPlayedSound.points}`;
    playSound(lastPlayedSound);

    audioPlayer.onended = function () {
        startPostCountdown(15, lastPlayedSound.message);
    };
}

function playSound(sound) {
    audioPlayer.src = sound.src;
    audioPlayer.play();
}

function startPostCountdown(duration, message) {
    let time = duration;
    countdownTimer.style.display = 'block';
    timerElement.textContent = time;

    const interval = setInterval(function () {
        time--;
        timerElement.textContent = time;

        if (time <= 0) {
            clearInterval(interval);
            countdownTimer.style.display = 'none';
            showMessageButton.disabled = false;
        }
    }, 1000);

    showMessageButton.onclick = function () {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        playButton.disabled = false;
    };
}

replayButton.addEventListener('click', function () {
    if (lastPlayedSound) {
        playSound(lastPlayedSound);
    }
});