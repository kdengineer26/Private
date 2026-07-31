// Sound effects and background music synthesizer / audio player for Saiyaara's Barbaad song

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private audioElement: HTMLAudioElement | null = null;
  private musicInterval: any = null;

  // Direct high-quality trimmed main part (1:10 to 1:50) of "Barbaad (From Saiyaara)" by The Rish & Jubin Nautiyal
  private songUrl = "/audio/barbaad_main.mp3";
  private fallbackUrl = "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ce/2c/d1/ce2cd173-4bb9-a448-4605-74046a77b915/mzaf_2531813810611835734.plus.aac.p.m4a";

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Cute heart pop sound
  playPop() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.error(e);
    }
  }

  // Paper rustle sound for scrapbook flip
  playPaperFlip() {
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 1.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      console.error(e);
    }
  }

  // Sparkle magical shimmer sound for coupon redeem or envelope opening
  playSparkle() {
    try {
      const ctx = this.getContext();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.3);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Toggle Saiyaara's Barbaad background music
  toggleBackgroundMusic(enable?: boolean): boolean {
    if (enable !== undefined) {
      this.isMusicPlaying = !enable; // will invert below
    }

    if (this.isMusicPlaying) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }

  startBackgroundMusic() {
    try {
      this.isMusicPlaying = true;

      if (!this.audioElement) {
        this.audioElement = new Audio(this.songUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.65;
        this.audioElement.onerror = () => {
          if (this.audioElement && this.audioElement.src.includes(this.songUrl)) {
            this.audioElement.src = this.fallbackUrl;
            this.audioElement.play().catch(() => this.startSynthFallback());
          }
        };
      }

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Audio play deferred or failed, falling back:", err);
          if (this.audioElement && !this.audioElement.src.includes(this.fallbackUrl)) {
            this.audioElement.src = this.fallbackUrl;
            this.audioElement.play().catch(() => this.startSynthFallback());
          } else {
            this.startSynthFallback();
          }
        });
      }
    } catch (e) {
      console.error("Error playing audio:", e);
      this.startSynthFallback();
    }
  }

  startSynthFallback() {
    try {
      const ctx = this.getContext();
      // Melodic notes for Saiyaara theme chord progression
      const chords = [
        [220.00, 261.63, 329.63], // A minor
        [174.61, 220.00, 261.63], // F major
        [261.63, 329.63, 392.00], // C major
        [196.00, 246.94, 293.66]  // G major
      ];

      let chordIdx = 0;
      let noteStep = 0;

      if (this.musicInterval) clearInterval(this.musicInterval);

      this.musicInterval = setInterval(() => {
        if (!this.isMusicPlaying) return;

        const currentChord = chords[chordIdx];
        const noteFreq = currentChord[noteStep % currentChord.length];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.6);

        noteStep++;
        if (noteStep >= 4) {
          noteStep = 0;
          chordIdx = (chordIdx + 1) % chords.length;
        }
      }, 500);
    } catch (e) {
      console.error(e);
    }
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  getIsMusicPlaying() {
    return this.isMusicPlaying;
  }
}

export const soundManager = new SoundManager();

