/**
 * Amorette - Tactile Audio Engine
 * Uses Web Audio API to procedurally generate authentic analog sounds:
 * paper rustles, stamp thuds, wax melting & squishing, seal cracking, pen scribbling, and chime bells.
 */

class AmoretteAudio {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('amorette_muted') === 'true';
    this.initialized = false;
  }

  init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('amorette_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Paper rustle effect: bandpass filtered pink noise with organic amplitude decay
  playPaperRustle(intensity = 1.0) {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.15;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.Q.setValueAtTime(2.2, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.22 * intensity, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.25);
  }

  // Stamp Thud: low resonant body + paper impact transient
  playStampThud() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Transient paper slap
    const slapOsc = ctx.createOscillator();
    const slapGain = ctx.createGain();
    slapOsc.type = 'triangle';
    slapOsc.frequency.setValueAtTime(450, now);
    slapOsc.frequency.exponentialRampToValueAtTime(110, now + 0.06);

    slapGain.gain.setValueAtTime(0.35, now);
    slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    slapOsc.connect(slapGain);
    slapGain.connect(ctx.destination);

    slapOsc.start(now);
    slapOsc.stop(now + 0.08);

    // Resonant wooden desk thud
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(120, now);
    subOsc.frequency.exponentialRampToValueAtTime(48, now + 0.16);

    subGain.gain.setValueAtTime(0.4, now + 0.01);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.25);
  }

  // Wax Pour: warm bubbling molten drip
  playWaxPour() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const dropTime = now + i * 0.08 + Math.random() * 0.04;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 300 + Math.random() * 250;
      osc.frequency.setValueAtTime(baseFreq, dropTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, dropTime + 0.05);

      gain.gain.setValueAtTime(0.12, dropTime);
      gain.gain.exponentialRampToValueAtTime(0.001, dropTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(dropTime);
      osc.stop(dropTime + 0.08);
    }
  }

  // Seal Press: satisfying squish followed by firm brass stamp impact
  playSealPress() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Squish tone
    const squish = ctx.createOscillator();
    const squishGain = ctx.createGain();
    squish.type = 'sawtooth';
    squish.frequency.setValueAtTime(220, now);
    squish.frequency.exponentialRampToValueAtTime(80, now + 0.12);

    const squishFilter = ctx.createBiquadFilter();
    squishFilter.type = 'lowpass';
    squishFilter.frequency.setValueAtTime(600, now);

    squishGain.gain.setValueAtTime(0.15, now);
    squishGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    squish.connect(squishFilter);
    squishFilter.connect(squishGain);
    squishGain.connect(ctx.destination);

    squish.start(now);
    squish.stop(now + 0.16);

    // Brass stamp click & settle
    setTimeout(() => {
      if (this.muted || !this.ctx) return;
      const t = this.ctx.currentTime;
      const metalOsc = this.ctx.createOscillator();
      const metalGain = this.ctx.createGain();
      metalOsc.type = 'sine';
      metalOsc.frequency.setValueAtTime(880, t);
      metalOsc.frequency.exponentialRampToValueAtTime(140, t + 0.1);
      metalGain.gain.setValueAtTime(0.25, t);
      metalGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      metalOsc.connect(metalGain);
      metalGain.connect(this.ctx.destination);
      metalOsc.start(t);
      metalOsc.stop(t + 0.14);
    }, 70);
  }

  // Seal Crack: brittle, tactile fracture snap
  playSealCrack() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Crackle noise burst
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1800, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.15);
  }

  // Pen Scratch: subtle writing tactile sound
  playPenScratch() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600 + Math.random() * 600, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.05);
  }

  // Romantic Chime / Sparkle
  playChime() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.85);
    });
  }
}

window.amoretteAudio = new AmoretteAudio();
