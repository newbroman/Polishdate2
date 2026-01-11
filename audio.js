/**
 * audio.js - Speech Synthesis Engine (Repaired & Mobile Optimized)
 */

let polishVoice = null;
let audioUnlocked = false;

// CRITICAL FOR MOBILE: Prevents browser from cutting audio early
window.activeUtterance = null; 

/**
 * Finds and caches the best Polish voice available.
 */
function findVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Priority: Look for a native Polish voice
    polishVoice = voices.find(v => v.lang === 'pl-PL' || v.lang.startsWith('pl'));
}

export function loadVoices() {
    findVoice();
}

// Mobile browsers need this event to know when voices are ready
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
}

export function checkVoices(onReady) {
    if (!('speechSynthesis' in window)) return;

    const runCheck = () => {
        findVoice();
        if (onReady) onReady(!!polishVoice);
    };

    if (speechSynthesis.getVoices().length > 0) {
        runCheck();
    } else {
        speechSynthesis.onvoiceschanged = runCheck;
    }

    // iOS/Opera Fix: Force a re-check after 1 second
    setTimeout(runCheck, 1000);
}

/**
 * ESSENTIAL FOR MOBILE: Un-mutes the engine.
 * Must be called from a user click/touchstart.
 */
export function unlockAudio() {
    // Note: We don't 'return' early here for Opera/DDG; 
    // re-priming on interaction helps keep the engine 'awake'.
    const talk = new SpeechSynthesisUtterance(" ");
    talk.volume = 0; 
    window.speechSynthesis.speak(talk);
    
    audioUnlocked = true;
    console.log("🔊 Audio engine primed.");
}

/**
 * Speaks the provided text using the cached Polish voice.
 * Optimized for Opera Mobile and DuckDuckGo.
 */
export function speakText(text) {
    if (!text || !('speechSynthesis' in window)) return;

    // 1. Wake up the engine (Fixes Opera Mobile 'silent' bug)
    window.speechSynthesis.resume();

    // 2. Stop any current speech
    window.speechSynthesis.cancel();

    // 3. Create the utterance and store it globally on 'window'
    // This stops the Garbage Collector from killing the sound.
    window.activeUtterance = new SpeechSynthesisUtterance(text);
    
    if (polishVoice) {
        window.activeUtterance.voice = polishVoice;
    } else {
        window.activeUtterance.lang = 'pl-PL'; 
    }

    window.activeUtterance.rate = 0.8; 
    window.activeUtterance.pitch = 1.0;

    // 4. Speak
    window.speechSynthesis.speak(window.activeUtterance);
}
