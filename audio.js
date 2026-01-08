/**
 * audio.js - Optimized for PWA and Mobile
 */

export function checkVoices(callback) {
    const synth = window.speechSynthesis;
    
    const tryToGetVoices = () => {
        const voices = synth.getVoices();
        // Look specifically for a Polish voice
        const plVoice = voices.find(v => v.lang.startsWith('pl'));
        
        if (plVoice || voices.length > 0) {
            callback(true);
            return true;
        }
        return false;
    };

    // 1. Try immediately (Desktop/fast load)
    if (tryToGetVoices()) return;

    // 2. Wait for the browser to load voices (Mobile/Chrome)
    synth.onvoiceschanged = () => {
        if (tryToGetVoices()) {
            synth.onvoiceschanged = null; // Cleanup listener
        }
    };

    // 3. Safety Fail-safe: Enable after 1.5s if the event never fires
    setTimeout(() => {
        callback(true);
    }, 1500);
}

export function speakText(text) {
    // Stop any current speech before starting new one
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.rate = 0.9; // Slightly slower for better learning
    
    window.speechSynthesis.speak(utterance);
}

