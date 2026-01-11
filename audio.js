/**
 * audio.js - Multi-Browser Compatibility Fix
 */

let polishVoice = null;
let audioUnlocked = false;
window.activeUtterance = null; // Essential for Firefox/Mobile memory management

export function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Firefox fix: iterate and find the best match
    polishVoice = voices.find(v => v.lang === 'pl-PL' || v.lang === 'pl_PL' || v.lang.startsWith('pl'));
}

// Ensure Firefox hears the voice change event
if ('speechSynthesis' in window) {
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
}

export function checkVoices(onReady) {
    if (!('speechSynthesis' in window)) return;
    loadVoices();
    
    // If voices aren't ready yet (common in Firefox/Opera), retry
    if (!polishVoice) {
        setTimeout(() => {
            loadVoices();
            if (onReady) onReady(!!polishVoice);
        }, 500);
    } else if (onReady) {
        onReady(true);
    }
}

export function unlockAudio() {
    if (audioUnlocked) return;
    try {
        const talk = new SpeechSynthesisUtterance("");
        talk.volume = 0; 
        window.speechSynthesis.speak(talk);
        audioUnlocked = true;
    } catch (e) {
        console.error("Audio unlock failed", e);
    }
}

export function speakText(text) {
    if (!text || !('speechSynthesis' in window)) return;

    // Firefox/Opera fix: always cancel and resume to clear the buffer
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    // Attach to window to prevent Garbage Collection (The Firefox 'Silent' bug)
    window.activeUtterance = new SpeechSynthesisUtterance(text);
    
    // CRITICAL: Set lang BEFORE setting voice
    window.activeUtterance.lang = 'pl-PL';

    if (polishVoice) {
        window.activeUtterance.voice = polishVoice;
    }

    window.activeUtterance.rate = 0.8;
    window.activeUtterance.pitch = 1.0;

    // Optional Firefox Fix: Some versions need a small delay after cancel
    setTimeout(() => {
        window.speechSynthesis.speak(window.activeUtterance);
    }, 50);
}
