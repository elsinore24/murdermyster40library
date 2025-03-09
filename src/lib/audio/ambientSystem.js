class AmbientSystem {
  constructor() {
    this.audioContext = null;
    this.players = new Map();
    this.loaded = false;
    this.fallbackMode = false;
  }

  async init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.loaded = true;
    } catch (e) {
      console.warn('AudioContext not available, running in fallback mode');
      this.fallbackMode = true;
    }
  }

  async loadSound(name, url) {
    if (this.fallbackMode) {
      console.warn(`Audio system in fallback mode, skipping load of ${name}`);
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load sound: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.players.set(name, audioBuffer);
    } catch (e) {
      console.warn(`Failed to load sound ${name}, continuing without audio:`, e);
      this.fallbackMode = true;
    }
  }

  async playAmbient(name, options = {}) {
    if (this.fallbackMode || !this.loaded || !this.players.has(name)) {
      console.warn(`Audio system not available or sound "${name}" not found, continuing silently`);
      return null;
    }

    try {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.players.get(name);
      
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = options.volume || 1;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.loop = options.loop !== undefined ? options.loop : true;
      source.start();
      
      return source;
    } catch (e) {
      console.warn('Failed to play ambient sound:', e);
      return null;
    }
  }

  stopAmbient(source) {
    if (source) {
      try {
        source.stop();
      } catch (e) {
        console.warn('Failed to stop ambient sound:', e);
      }
    }
  }
}

export const ambientSystem = new AmbientSystem();
