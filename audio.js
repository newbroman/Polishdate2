/**
 * audio.js - Speech Synthesis Engine (Repaired & Mobile Optimized)
 */

let polishVoice = null;
let audioUnlocked = false;

/**
 * Finds and caches the best Polish voice available on the device.
 */
function findVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Priority: Look for a native Polish voice
    polishVoice = voices.find(v => v.lang === 'pl-PL' || v.lang.startsWith('pl'));
}

export function checkVoices(onReady) {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
        findVoice();
        if (onReady) onReady(!!polishVoice);
    };

    // Chrome/Android fix: voiceschanged is required to populate the list
    if (speechSynthesis.getVoices().length > 0) {
        loadVoices();
    } else {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // iOS Fix: If voices still aren't loaded after 1 second, force a re-check
    setTimeout(() => {
        findVoice();
        if (onReady) onReady(!!polishVoice);
    }, 1000);
}

/**
 * ESSENTIAL FOR MOBILE: This "un-mutes" the synthesis engine.
 * Must be called from a user-initiated event (click/touchstart).
 */
export function unlockAudio() {
    if (audioUnlocked) return;
    
    // We speak a tiny, silent string to initialize the engine context
    const talk = new SpeechSynthesisUtterance(" ");
    talk.volume = 0; 
    window.speechSynthesis.speak(talk);
    
    audioUnlocked = true;
    console.log("🔊 Audio engine primed and unlocked.");
}

/**
 * Speaks the provided text using the cached Polish voice.
 */
export function speakText(text) {
    if (!text) return;

    // 1. Stop any current speech - critical for unmuting and preventing overlaps
    window.speechSynthesis.cancel();

    // 2. Create the utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 3. Apply the Polish voice or fallback
    if (polishVoice) {
        utterance.voice = polishVoice;
    } else {
        utterance.lang = 'pl-PL'; 
    }

    // 4. Set your preferred learner-friendly rate
    utterance.rate = 0.8; 
    utterance.pitch = 1.0;

    // 5. Execute
    window.speechSynthesis.speak(utterance);
}
