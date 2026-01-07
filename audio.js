/**
 * Speech synthesis utility for Polish pronunciation
 */
let voicesLoaded = false;

export function speakPolish(text) {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Improved search for Polish
    const plVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'pl-pl') 
                 || voices.find(v => v.lang.startsWith('pl'));
    
    if (plVoice) utterance.voice = plVoice;
    utterance.lang = 'pl-PL';
    utterance.rate = 0.85; 
    
    window.speechSynthesis.speak(utterance);
}

// Function to check if voices are ready
export function checkVoices(callback) {
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            voicesLoaded = true;
            callback(true);
        }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices(); // Initial check
}
