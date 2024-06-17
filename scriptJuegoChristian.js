const words = [
    'sustentable',
	'renovable',
    'energia_solar',
    'energia_eolica',
    'lluvia',
    'reutilizar', 
    'huella_de_carbono', 
    'exploracion_de_petroleo', 
    'biodiversidad', 
    'medio_ambiente', 
    'tierra',
    'arbol',
    'cielo',
    'bosque',
    'agua'
];
let selectedWord = '';
let guessedLetters = [];
let incorrectLetters = [];
let mistakes = 0;
const maxMistakes = 6;

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    incorrectLetters = [];
    mistakes = 0;
    document.getElementById('word').innerHTML = '_ '.repeat(selectedWord.length);
    document.getElementById('incorrect-letters').textContent = 'Letras incorrectas: ';
    document.getElementById('message').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('guess').disabled = false;
    document.getElementById('hangmanImage').src = `img/ahorcado.jpg`;
}

function guessLetter() {
    const guessInput = document.getElementById('guess');
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (guess && !guessedLetters.includes(guess) && !incorrectLetters.includes(guess)) {
        if (selectedWord.includes(guess)) {
            guessedLetters.push(guess);
            displayWord();
            checkWin();
        } else {
            incorrectLetters.push(guess);
            document.getElementById('incorrect-letters').textContent = 'Letras incorrectas: ' + incorrectLetters.join(', ');
            mistakes++;
            document.getElementById('hangmanImage').src = `img/ahorcado.jpg`;
            if (mistakes >= maxMistakes) {
                document.getElementById('message').textContent = `Game Over! La palabra era "${selectedWord}".`;
                disableInput();
            }
        }
    }
}

function displayWord() {
    const wordDisplay = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    document.getElementById('word').textContent = wordDisplay;
}

function checkWin() {
    if (!document.getElementById('word').textContent.includes('_')) {
        document.getElementById('message').textContent = '¡Ganaste!';
        disableInput();
    }
}

function disableInput() {
    document.getElementById('guess').disabled = true;
}

function resetGame() {
    startGame();
}

startGame();
