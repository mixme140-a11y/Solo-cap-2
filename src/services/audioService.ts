/**
 * Gothic Audio Service for Radio Santa Vita & Chapter Reader.
 * Supports:
 * 1. Real Audio File playback (Uploaded MP3, WAV, AAC, Blob URL, external audio URLs)
 * 2. Real-time Audio Analyser for gothic waveform / frequency equalizer animations
 * 3. Procedural Gothic Synthesizer (Cathedral organ chords, Gregorian chants, Midnight bells, Static)
 * 4. Master volume control and chapter synchronization
 */

export interface AudioTrackInfo {
  id: string;
  title: string;
  author: string;
  audioUrl?: string;
  theme?: 'organ' | 'chant' | 'bell' | 'static';
  nextProgram?: string;
  nextAuthor?: string;
  broadcastNote?: string;
}

type AudioStateListener = (state: {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  trackId: string | null;
}) => void;

class GothicAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.8;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  
  // Real HTML5 Audio Element for uploaded files / URLs
  private audioElement: HTMLAudioElement | null = null;
  private audioSourceNode: MediaElementAudioSourceNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private frequencyDataArray: Uint8Array | null = null;

  public isRadioPlaying: boolean = false;
  public currentTrackId: string | null = null;
  public currentTime: number = 0;
  public duration: number = 0;

  private listeners: Set<AudioStateListener> = new Set();
  private timeUpdateInterval: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audioElement) return;
    this.audioElement = new Audio();
    this.audioElement.crossOrigin = 'anonymous';
    this.audioElement.volume = this.masterVolume;

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.currentTime = this.audioElement.currentTime;
        this.duration = this.audioElement.duration || 0;
        this.notifyListeners();
      }
    });

    this.audioElement.addEventListener('ended', () => {
      this.isRadioPlaying = false;
      this.notifyListeners();
    });

    this.audioElement.addEventListener('play', () => {
      this.isRadioPlaying = true;
      this.notifyListeners();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isRadioPlaying = false;
      this.notifyListeners();
    });
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener({
      isPlaying: this.isRadioPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.masterVolume,
      trackId: this.currentTrackId,
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    const state = {
      isPlaying: this.isRadioPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.masterVolume,
      trackId: this.currentTrackId,
    };
    this.listeners.forEach((l) => l(state));
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.masterVolume;
    }
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.masterVolume * 0.18, this.ctx.currentTime);
    }
    this.notifyListeners();
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopRadio();
    }
    this.notifyListeners();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public seek(seconds: number) {
    if (this.audioElement && this.duration > 0) {
      this.audioElement.currentTime = Math.max(0, Math.min(this.duration, seconds));
      this.currentTime = this.audioElement.currentTime;
      this.notifyListeners();
    }
  }

  /**
   * Play specific track or synthesize atmospheric theme
   */
  public playTrack(track: AudioTrackInfo) {
    const ctx = this.getContext();
    this.currentTrackId = track.id;

    if (track.audioUrl && track.audioUrl.trim().length > 5) {
      // Real Audio file playback
      this.stopAmbientSynth();
      this.initAudioElement();
      if (this.audioElement) {
        if (this.audioElement.src !== track.audioUrl) {
          this.audioElement.src = track.audioUrl;
        }
        this.audioElement.volume = this.masterVolume;
        this.audioElement
          .play()
          .then(() => {
            this.isRadioPlaying = true;
            this.notifyListeners();
          })
          .catch((err) => {
            console.warn('Audio play request interrupted or blocked, falling back to atmosphere:', err);
            this.startAmbientSynth(track.theme || 'organ');
          });
      }
    } else {
      // Atmospheric synthesizer
      if (this.audioElement) {
        this.audioElement.pause();
      }
      this.startAmbientSynth(track.theme || 'organ');
      this.isRadioPlaying = true;
      this.notifyListeners();
    }
  }

  public togglePlay(track?: AudioTrackInfo) {
    if (this.isRadioPlaying) {
      this.stopRadio();
    } else {
      if (track) {
        this.playTrack(track);
      } else {
        this.startRadio('organ');
      }
    }
  }

  // Play subtle gothic click sound
  public playClick(pitch: number = 440) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12 * this.masterVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  // Play church bell chime
  public playBell(freq: number = 220) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const harmonics = [1, 2, 2.76, 3.4, 4.1];
      const gains = [0.2, 0.1, 0.08, 0.04, 0.02];

      harmonics.forEach((h, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * h, ctx.currentTime);

        const duration = 2.5;
        gain.gain.setValueAtTime((gains[idx] || 0.05) * this.masterVolume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      });
    } catch {
      // Ignore
    }
  }

  // Start Radio Santa Vita Broadcast audio
  public startRadio(theme: 'organ' | 'chant' | 'bell' | 'static' = 'organ') {
    if (this.isMuted) return;
    this.stopRadio();
    this.startAmbientSynth(theme);
    this.isRadioPlaying = true;
    this.notifyListeners();
  }

  private startAmbientSynth(theme: 'organ' | 'chant' | 'bell' | 'static' = 'organ') {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.16 * this.masterVolume, ctx.currentTime + 1.0);
      this.ambientGain.connect(ctx.destination);

      if (theme === 'organ' || theme === 'chant') {
        // Deep gothic organ drone chord (D minor: D2, A2, D3, F3, A3)
        const freqs = [73.42, 110.00, 146.83, 174.61, 220.00];
        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          osc.detune.setValueAtTime((Math.random() - 0.5) * 12, ctx.currentTime);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(theme === 'chant' ? 320 : 440, ctx.currentTime);

          osc.connect(filter);
          filter.connect(this.ambientGain!);

          osc.start();
          this.ambientOscillators.push(osc);
        });

        // Subtle atmospheric noise layer
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.015;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1100, ctx.currentTime);

        noise.connect(noiseFilter);
        noiseFilter.connect(this.ambientGain);
        noise.start();
        this.ambientOscillators.push(noise as unknown as OscillatorNode);
      } else if (theme === 'bell') {
        this.playBell(180);
      } else if (theme === 'static') {
        // Static frequency noise
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.04;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(850, ctx.currentTime);

        noise.connect(noiseFilter);
        noiseFilter.connect(this.ambientGain);
        noise.start();
        this.ambientOscillators.push(noise as unknown as OscillatorNode);
      }
    } catch {
      this.isRadioPlaying = false;
    }
  }

  private stopAmbientSynth() {
    if (this.ambientOscillators.length > 0) {
      this.ambientOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.ambientOscillators = [];
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {
        // ignore
      }
      this.ambientGain = null;
    }
  }

  // Stop all radio and audio
  public stopRadio() {
    this.isRadioPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopAmbientSynth();
    this.notifyListeners();
  }

  // Secret cipher unlocked sound
  public playUnlock() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [220, 277.18, 329.63, 440, 554.37];
      notes.forEach((note, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime + index * 0.09);
        gain.gain.setValueAtTime(0.1 * this.masterVolume, ctx.currentTime + index * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.09);
        osc.stop(ctx.currentTime + index * 0.09 + 0.35);
      });
    } catch {
      // ignore
    }
  }
}

export const audioService = new GothicAudioService();
