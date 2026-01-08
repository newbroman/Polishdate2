/**
 * audio.js - Robust version for Standalone PWA
 */
export function checkVoices(callback) {
    const synth = window.speechSynthesis;
    
    // Most modern browsers have voices ready or will load them on the first click
    // We will wait 500ms then just tell the app "Ready" to unblock the button
    setTimeout(() => {
        callback(true);
    }, 500);
}

export function speakText(text) {
    if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported");
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find a Polish voice if possible
    const voices = window.speechSynthesis.getVoices();
    const plVoice = voices.find(v => v.lang.startsWith('pl'));
    
    if (plVoice) {
        utterance.voice = plVoice;
    }

    utterance.lang = 'pl-PL';
    utterance.rate = 0.85; // Slightly slower for learning
    
    window.speechSynthesis.speak(utterance);
}
