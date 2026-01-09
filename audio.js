/**
 * audio.js - Speech Synthesis Engine
 */

let polishVoice = null;

/**
 * Finds and caches the best Polish voice available on the device.
 */
export function checkVoices(callback) {
    const findVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        // Look for a native Polish voice
        polishVoice = voices.find(v => v.lang === 'pl-PL' || v.lang === 'pl_PL');
        
        if (polishVoice && callback) {
            callback(true);
        }
    };
// Chrome/Android fix
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = findVoice;
    }
    
    // Initial check
    findVoice();

    // iOS Fix: If voices still aren't loaded after 1 second, force a re-check
    setTimeout(findVoice, 1000);
}

/**
 * ESSENTIAL FOR MOBILE: This "un-mutes" the synthesis engine.
 * Must be called from a user-initiated touch event.
 */
export function unlockAudio() {
    // We speak a tiny, silent string to initialize the engine
    const talk = new SpeechSynthesisUtterance(" ");
    talk.volume = 0; 
    window.speechSynthesis.speak(talk);
    console.log("Audio engine primed.");
}

/**
 * Speaks the provided text using the Polish voice.
 */
export function speakText(text) {
    if (!text) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (polishVoice) {
        utterance.voice = polishVoice;
    } else {
        utterance.lang = 'pl-PL'; // Fallback to language code
    }

    // Natural Polish speech usually sounds better slightly slower for learners
    utterance.rate = 0.8; 
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
}
