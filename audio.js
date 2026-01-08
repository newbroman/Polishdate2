/**
 * audio.js
 * Speech synthesis utility for Polish pronunciation
 */
let voicesLoaded = false;

// Renamed to speakText to avoid conflict with ui-renderer.js
export function speakText(text) {
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

export function checkVoices(callback) {
    const synth = window.speechSynthesis;
    
    const tryToGetVoices = () => {
        const voices = synth.getVoices();
        // Look specifically for Polish
        const plVoice = voices.find(v => v.lang.startsWith('pl'));
        
        if (plVoice || voices.length > 0) {
            callback(true);
            return true;
        }
        return false;
    };

    // 1. Try immediately
    if (tryToGetVoices()) return;

    // 2. If not ready, wait for the event
    synth.onvoiceschanged = () => {
        if (tryToGetVoices()) {
            synth.onvoiceschanged = null; // Clean up
        }
    };

    // 3. Fail-safe: Enable it anyway after 1.5 seconds 
    // (Sometimes browsers have the voice but don't fire the event)
    setTimeout(() => {
        callback(true);
    }, 1500);
}

export function speakText(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}
