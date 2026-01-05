export function speakPolish(text) {
    // Cancel any current speech so it doesn't overlap
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL'; // This triggers the Polish voice engine
    utterance.rate = 0.9;     // Slightly slower for better learning
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
}
