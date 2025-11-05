// Create a new speech synthesis utterance instance
const msg = new SpeechSynthesisUtterance();
let voices = [];

// Get DOM elements
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Function to populate available voices
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Function to set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggleSpeech();
}

// Function to start or stop speech
function toggleSpeech(startOver = true) {
  speechSynthesis.cancel(); // Stop any current speech
  if (startOver && msg.text.trim() !== "") {
    speechSynthesis.speak(msg); // Speak only if text is not empty
  } else if (msg.text.trim() === "") {
    alert("Please enter some text before speaking!");
  }
}

// Function to set rate, pitch, or text
function setOption() {
  msg[this.name] = this.value;
}

// Load available voices
speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Event listeners
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', () => toggleSpeech(true));
stopButton.addEventListener('click', () => toggleSpeech(false));
