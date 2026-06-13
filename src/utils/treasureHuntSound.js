// src/utils/treasureHuntSound.js

class TreasureHuntSound {
  static audioCtx = null;
  static bgMusic = null;
  static originalVolume = 0.15;
  static isDucked = false;
  static duckTimeout = null;
  static fadeInterval = null;
  static _isAudioPlaying = false;
  static startPlaybackRef = null;
  static winningAudio = null;

  static isMuted() {
    return localStorage.getItem("treasure_hunt_music_muted") === "true";
  }

  static setMuted(muted) {
    localStorage.setItem("treasure_hunt_music_muted", muted ? "true" : "false");
  }

  static setIsAudioPlaying(playing) {
    this._isAudioPlaying = playing;
    window.dispatchEvent(new CustomEvent("treasure_hunt_audio_change", { detail: playing }));
  }

  static getIsAudioPlaying() {
    return this._isAudioPlaying;
  }

  static initBackgroundMusic() {
    if (this.bgMusic) return this.bgMusic;

    const music = new Audio("/assets/Sounds/TreaureHuntFullSound.mp3");
    music.loop = true;
    music.volume = 0.15;
    this.bgMusic = music;

    // Synchronize play/pause states dynamically via native events
    music.addEventListener("play", () => {
      this.setIsAudioPlaying(true);
    });
    music.addEventListener("pause", () => {
      this.setIsAudioPlaying(false);
    });
    music.addEventListener("error", (e) => {
      console.error("TreasureHuntSound bgMusic error:", e, music.error);
    });

    return music;
  }

  static syncBackgroundMusicState() {
    const music = this.initBackgroundMusic();

    // Respect user's explicit mute preference
    if (this.isMuted()) {
      if (!music.paused) {
        music.pause();
      }
      this.setIsAudioPlaying(false);
      return;
    }

    // Already playing, keep UI state in sync
    if (!music.paused) {
      this.setIsAudioPlaying(true);
      return;
    }

    // Attempt playback, register user gestures fallback if blocked by browser policy
    this.removeInteractionListeners();

    this.startPlaybackRef = () => {
      if (this.isMuted()) {
        this.removeInteractionListeners();
        return;
      }
      music.play()
        .then(() => {
          this.removeInteractionListeners();
        })
        .catch((e) => console.warn("Interaction play failed:", e));
    };

    music.play()
      .then(() => {
        // Playback started successfully
      })
      .catch((err) => {
        console.warn("Autoplay blocked, waiting for user interaction:", err);
        // Only use valid user gesture triggers (click, keydown, mousedown, touchstart)
        window.addEventListener("click", this.startPlaybackRef);
        window.addEventListener("keydown", this.startPlaybackRef);
        window.addEventListener("mousedown", this.startPlaybackRef);
        window.addEventListener("touchstart", this.startPlaybackRef);
      });
  }

  static pauseBackgroundMusic() {
    if (this.bgMusic && !this.bgMusic.paused) {
      this.bgMusic.pause();
    }
    this.setIsAudioPlaying(false);
  }

  static removeInteractionListeners() {
    if (this.startPlaybackRef) {
      window.removeEventListener("click", this.startPlaybackRef);
      window.removeEventListener("keydown", this.startPlaybackRef);
      window.removeEventListener("mousedown", this.startPlaybackRef);
      window.removeEventListener("touchstart", this.startPlaybackRef);
      this.startPlaybackRef = null;
    }
  }

  static toggleBackgroundMusic() {
    const music = this.initBackgroundMusic();
    const newMute = !this.isMuted();
    this.setMuted(newMute);

    if (newMute) {
      music.pause();
      this.setIsAudioPlaying(false);
    } else {
      music.play()
        .then(() => {
          this.setIsAudioPlaying(true);
        })
        .catch((err) => {
          console.warn("Failed to play background audio on toggle:", err);
          this.syncBackgroundMusicState();
        });
    }
  }

  static getAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if it was suspended (browser autoplay policy)
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Subtle, cyber-style click sound for buttons and navigation items
   */
  static playClick() {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Rapid pitch sweep down
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio failed to play:", e);
    }
  }

  /**
   * Play hintOpen.mp3 sound when hint box opens
   */
  static playOpenHint() {
    this.playFile("/assets/Sounds/HintPaperOpen.mp3", 20);
  }

  /**
   * Play hintOpen.mp3 followed by light.mp3 with background audio ducking
   */
  static playHintOpenSequence() {
    try {
      const hintOpen = new Audio("/assets/Sounds/hintOpen.mp3");
      hintOpen.volume = 0.6;
      const light = new Audio("/assets/Sounds/light.mp3");
      light.volume = 0.6;

      hintOpen.addEventListener("ended", () => {
        light.play().catch((err) => console.warn("Failed to play light.mp3:", err));
        this.duckBackgroundMusic(light);
      });

      hintOpen.play().catch((err) => console.warn("Failed to play hintOpen.mp3:", err));
      this.duckBackgroundMusic(hintOpen);
    } catch (e) {
      console.warn("Failed to play hint open sequence:", e);
    }
  }

  /**
   * Smoothly transitions the background music volume to a target level
   */
  static fadeVolume(target, duration = 300) {
    if (!this.bgMusic) return;
    const startVolume = this.bgMusic.volume;
    const diff = target - startVolume;
    const steps = 15;
    const stepTime = duration / steps;
    let currentStep = 0;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
    }

    this.fadeInterval = setInterval(() => {
      currentStep++;
      if (this.bgMusic) {
        this.bgMusic.volume = Math.max(0, Math.min(1, startVolume + (diff * (currentStep / steps))));
      }
      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }

  /**
   * Ducks background music volume for the duration of a sound effect file
   */
  static duckBackgroundMusic(effectAudio) {
    if (!this.bgMusic) return;

    if (!this.isDucked) {
      this.originalVolume = this.bgMusic.volume > 0.05 ? this.bgMusic.volume : 0.15;
      this.isDucked = true;
    }

    // Duck volume to 0.03 quickly
    this.fadeVolume(0.03, 150);

    const restore = () => {
      if (this.isDucked) {
        this.fadeVolume(this.originalVolume, 300);
        this.isDucked = false;
      }
      effectAudio.removeEventListener("ended", restore);
      if (this.duckTimeout) {
        clearTimeout(this.duckTimeout);
        this.duckTimeout = null;
      }
    };

    effectAudio.addEventListener("ended", restore);

    if (this.duckTimeout) {
      clearTimeout(this.duckTimeout);
    }
    this.duckTimeout = setTimeout(restore, 4000); // 4s fallback safety cap
  }

  /**
   * Manually ducks background music volume for a specific duration in milliseconds
   */
  static duckBackgroundMusicManual(durationMs = 1200) {
    if (!this.bgMusic) return;

    if (!this.isDucked) {
      this.originalVolume = this.bgMusic.volume > 0.05 ? this.bgMusic.volume : 0.15;
      this.isDucked = true;
    }

    // Duck volume to 0.03 quickly
    this.fadeVolume(0.03, 150);

    const restore = () => {
      if (this.isDucked) {
        this.fadeVolume(this.originalVolume, 300);
        this.isDucked = false;
      }
      if (this.duckTimeout) {
        clearTimeout(this.duckTimeout);
        this.duckTimeout = null;
      }
    };

    if (this.duckTimeout) {
      clearTimeout(this.duckTimeout);
    }
    this.duckTimeout = setTimeout(restore, durationMs);
  }

  /**
   * Glorious rising arpeggio sound when a clue/hint is solved or successful
   */
  static playSuccess() {
    this.duckBackgroundMusicManual(1250);
    try {
      const ctx = this.getAudioContext();
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 (C Major Chord)

      notes.forEach((freq, idx) => {
        const timeOffset = idx * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + timeOffset + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + 0.35);
      });
    } catch (e) {
      console.warn("Audio failed to play:", e);
    }
  }

  /**
   * Play the grand winningSound.mp3 when the user completes the final hint.
   * Pauses the background music to avoid overlapping tracks.
   * Can be set to loop continuously (e.g. for the leaderboard page).
   */
  static playWinningSound(loop = false) {
    if (this.winningAudio && this.winningAudio.loop === loop && !this.winningAudio.paused) {
      return;
    }

    this.stopWinningSound();
    this.pauseBackgroundMusic();

    try {
      const audio = new Audio("/assets/Sounds/winningSound.mp3");
      audio.loop = loop;
      audio.volume = 0.7;
      this.winningAudio = audio;

      audio.play().catch((err) => {
        console.warn("Winning sound playback was blocked by browser autoplay rules:", err);
      });
    } catch (e) {
      console.warn("Failed to initialize or play winning sound file:", e);
    }
  }

  /**
   * Stop the winning sound playback and reset reference.
   */
  static stopWinningSound() {
    if (this.winningAudio) {
      try {
        this.winningAudio.pause();
      } catch (e) {
        console.warn("Failed to pause winning audio:", e);
      }
      this.winningAudio = null;
    }
  }

  /**
   * Cyberpunk buzzer tone for fail states
   */
  static playFail() {
    this.duckBackgroundMusicManual(800);
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn("Audio failed to play:", e);
    }
  }

  /**
   * Play any custom static audio file (e.g. .mp3, .wav) placed in the public folder.
   * @param {string} filePath - Absolute path relative to the public directory (e.g., "/assets/sounds/my-custom-sound.mp3")
   * @param {number} volume - Output gain volume scale between 0.0 and 1.0 (default: 0.5)
   */
  static playFile(filePath, volume = 0.5) {
    try {
      const audio = new Audio(filePath);
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.play().catch((err) => {
        console.warn("Custom sound file playback was blocked by browser autoplay rules:", err);
      });

      // Automatically duck the background music during file playback
      this.duckBackgroundMusic(audio);
    } catch (e) {
      console.warn("Failed to initialize or play custom sound file:", e);
    }
  }
}

export default TreasureHuntSound;
