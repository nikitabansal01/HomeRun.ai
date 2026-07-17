// Demo stand-in for ElevenLabs: the browser's speech synthesis reads the
// reminder aloud with per-person pitch/rate so each family member sounds
// distinct. In production this would stream the member's actual cloned voice.
export function speak(text, { pitch = 1, rate = 1 } = {}, { onStart, onEnd } = {}) {
  if (!('speechSynthesis' in window)) {
    onStart?.()
    setTimeout(() => onEnd?.(), 2500)
    return () => onEnd?.()
  }
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.pitch = pitch
  u.rate = rate
  u.onstart = () => onStart?.()
  u.onend = () => onEnd?.()
  u.onerror = () => onEnd?.()
  window.speechSynthesis.speak(u)
  return () => {
    window.speechSynthesis.cancel()
    onEnd?.()
  }
}
