// Sound & Notification Utility for CityCabs24 Admin
// Uses Web Audio API for 100% reliable offline/online synthesized chime

let audioCtx = null;

function getAudioContext() {
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
 * Play a distinctive, pleasant Taxi / Dispatch alert chime
 */
export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Distinctive 3-note melody: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> High C6 (1046Hz)
    const notes = [
      { freq: 523.25, start: now + 0.00, dur: 0.18 },
      { freq: 659.25, start: now + 0.15, dur: 0.18 },
      { freq: 783.99, start: now + 0.30, dur: 0.22 },
      { freq: 1046.50, start: now + 0.48, dur: 0.45 },
    ];

    notes.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Smooth, bell-like timbre
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.35, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + dur + 0.05);
    });
  } catch (err) {
    console.warn('Audio chime playback issue:', err);
  }
}

/**
 * Check if notifications are enabled in settings (default: true)
 */
export function isNotificationEnabled() {
  const val = localStorage.getItem('citycabs_notifications_enabled');
  return val === null ? true : val === 'true';
}

/**
 * Toggle notifications on/off
 */
export function setNotificationEnabled(enabled) {
  localStorage.setItem('citycabs_notifications_enabled', enabled ? 'true' : 'false');
  // If enabling, ensure audio context is active
  if (enabled) {
    getAudioContext();
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

  // 1. Play sound
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
