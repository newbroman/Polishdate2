/**
 * audio.js - Cross-Browser Speech Engine
 */

let polishVoice = null;
let audioUnlocked = false;

// CRITICAL FOR MOBILE/FIREFOX/DDG: Prevents garbage collection
window.activeUtterance = null; 

/**
 * Finds the best Polish voice available.
 */
function findVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    polishVoice = voices.find(v => v.lang === 'pl-PL' || v.lang === 'pl_PL' || v.lang.startsWith('pl'));
}

export function loadVoices() {
    findVoice();
}

// Ensure voices are detected when they check in
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
}

/**
 * Initialization check used by app.js
 */
export function checkVoices(onReady) {
    if (!('speechSynthesis' in window)) return;
    
    const runCheck = () => {
        findVoice();
        if (onReady) onReady(!!polishVoice);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
        runCheck();
    } else {
        window.speechSynthesis.onvoiceschanged = runCheck;
    }

    // Backup check for slower mobile browsers
    setTimeout(runCheck, 1000);
}

/**
 * ESSENTIAL FOR MOBILE: Un-mutes the engine.
 * Must be called from a user click/touchstart.
 */
export function unlockAudio() {
    try {
        const talk = new SpeechSynthesisUtterance("");
        talk.volume = 0; 
        window.speechSynthesis.speak(talk);
        audioUnlocked = true;
        console.log("🔊 Audio engine primed.");
    } catch (e) {
        console.error("Audio unlock failed", e);
    }
}

/**
 * The Main Speak Function - Exported for events.js
 */
export function speakText(text) {
    if (!text || !('speechSynthesis' in window)) return;

    // 1. Force Resume & Clear Queue (Fixes Opera/Firefox hang)
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    // 2. Attach to window to prevent sound cutting off mid-sentence
    window.activeUtterance = new SpeechSynthesisUtterance(text);
    
    // 3. Set Language and Voice
    window.activeUtterance.lang = 'pl-PL';
    if (polishVoice) {
        window.activeUtterance.voice = polishVoice;
    }

    // 4. Learner-friendly settings
    window.activeUtterance.rate = 0.8;
    window.activeUtterance.pitch = 1.0;

    // 5. Speak (with a tiny delay to ensure cancel() finished)
    setTimeout(() => {
        window.speechSynthesis.speak(window.activeUtterance);
    }, 50);
}
