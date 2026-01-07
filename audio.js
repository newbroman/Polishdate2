/**
 * Speech synthesis utility for Polish pronunciation
 */
export function speakPolish(text) {
    if (!window.speechSynthesis) {
        console.warn("Speech Synthesis not supported in this browser.");
        return;
    }

    // Stop any current audio before starting new speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Refresh voices list
    const voices = window.speechSynthesis.getVoices();
    
    // Specific search for Polish (pl-PL)
    const plVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'pl-pl') 
                 || voices.find(v => v.lang.startsWith('pl'));
    
    if (plVoice) {
        utterance.voice = plVoice;
    }

    utterance.lang = 'pl-PL';
    utterance.rate = 0.85; // Natural learning speed
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
}

// Crucial: Pre-warm the voice engine
if (typeof window !== 'undefined' && window.speechSynthesis) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
}
