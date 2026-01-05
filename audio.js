export function speakPolish(text) {
    if (!window.speechSynthesis) {
        console.error("Browser does not support Speech Synthesis");
        return;
    }

    // Cancel current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find a Polish voice specifically
    const voices = window.speechSynthesis.getVoices();
    const plVoice = voices.find(v => v.lang.startsWith('pl'));
    
    if (plVoice) utterance.voice = plVoice;
    utterance.lang = 'pl-PL';
    utterance.rate = 0.85; // Slightly slower for learning
    
    window.speechSynthesis.speak(utterance);
}

// Pre-load voices (Required for some mobile browsers)
window.speechSynthesis.getVoices();
