/**
 * audio.js - Robust version for Standalone PWA
 */
export function checkVoices(callback) {
    // We immediately say "ready" so the button is never stuck.
    // Voices will load in the background.
    callback(true);
}

export function speakText(text) {
    if (!window.speechSynthesis) return;

    // 1. Cancel any existing speech
    window.speechSynthesis.cancel();

    // 2. Create the utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 3. Try to force a Polish voice
    const voices = window.speechSynthesis.getVoices();
    const plVoice = voices.find(v => v.lang.startsWith('pl') || v.name.includes('Polish'));
    
    if (plVoice) {
        utterance.voice = plVoice;
    }

    utterance.lang = 'pl-PL';
    utterance.rate = 0.8;
    
    // 4. Speak
    window.speechSynthesis.speak(utterance);
}
