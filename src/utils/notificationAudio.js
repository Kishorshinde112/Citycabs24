// Sound & Notification Utility for CityCabs24 Admin
// Engineered for iOS Safari & Android with HTML5 Audio + Web Audio fallback

let audioCtx = null;
let audioUnlocked = false;
let audioElem = null;

function getAudioElement() {
  if (typeof window === 'undefined') return null;
  if (!audioElem) {
    audioElem = new Audio('/alert.mp3');
    audioElem.preload = 'auto';
  }
  return audioElem;
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Crucial for iOS: Unlocks audio playback on first user touch/tap
 */
export function unlockAudioOnUserGesture() {
  if (typeof window === 'undefined' || audioUnlocked) return;

  try {
    const el = getAudioElement();
    if (el) {
      el.volume = 0.01;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            el.pause();
            el.currentTime = 0;
            el.volume = 1.0;
            audioUnlocked = true;
          })
          .catch(() => {});
      }
    }

    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        audioUnlocked = true;
      }).catch(() => {});
    }
  } catch (err) {
    // Ignore unlock errors
  }
}

// Auto-register touch/click unlockers on window
if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', unlockAudioOnUserGesture, { once: false, passive: true });
  window.addEventListener('click', unlockAudioOnUserGesture, { once: false, passive: true });
}

/**
 * Play a distinctive Taxi / Dispatch alert chime (Works on iOS & Android)
 */
export function playChimeSound() {
  try {
    // 1. Primary: Use HTML5 Audio with alert.mp3 (Most reliable on iOS Safari)
    const audio = new Audio('/alert.mp3');
    audio.volume = 1.0;
    const promise = audio.play();

    if (promise !== undefined) {
      promise.catch((err) => {
        console.warn('HTML5 Audio play prevented, falling back to Web Audio:', err);
        // Fallback to Web Audio API
        playWebAudioChime();
      });
    }
  } catch (err) {
    playWebAudioChime();
  }
}

function playWebAudioChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, start: now + 0.00, dur: 0.18 },
      { freq: 659.25, start: now + 0.15, dur: 0.18 },
      { freq: 783.99, start: now + 0.30, dur: 0.22 },
      { freq: 1046.50, start: now + 0.48, dur: 0.45 },
    ];

    notes.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.4, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + dur + 0.05);
    });
  } catch (err) {
    console.warn('WebAudio chime issue:', err);
  }
}

/**
 * Check if notifications are enabled in settings (default: true)
 */
export function isNotificationEnabled() {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem('citycabs_notifications_enabled');
  return val === null ? true : val === 'true';
}

/**
 * Toggle notifications on/off
 */
export function setNotificationEnabled(enabled) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('citycabs_notifications_enabled', enabled ? 'true' : 'false');
  if (enabled) {
    unlockAudioOnUserGesture();
  }
}

/**
 * Request system notification permission
 */
export async function requestNotificationPermission() {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'default') {
      try {
        const res = await Notification.requestPermission();
        return res === 'granted';
      } catch (e) {
        return false;
      }
    }
    return Notification.permission === 'granted';
  }
  return false;
}

/**
 * Trigger complete alert (sound + push notification)
 */
export function triggerLeadNotification(booking) {
  if (!isNotificationEnabled()) return;

  // 1. Play sound (HTML5 audio)
  playChimeSound();

  // 2. Trigger browser notification if permitted
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      const name = booking?.name || 'New Customer';
      const phone = booking?.phone || booking?.contact || '';
      const route = booking?.route || booking?.tourName || 'Tour Booking';

      new Notification('🚖 New Booking Inquiry Received!', {
        body: `${name} (${phone})\nRoute: ${route}`,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: booking?.id || Date.now().toString(),
      });
    } catch (err) {
      console.warn('Browser notification error:', err);
    }
  }
}
