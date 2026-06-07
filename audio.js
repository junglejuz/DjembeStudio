// Web Audio API Synthesis and Sample Player Engine for DjembeStudio

let noiseBuffer = null;

function getNoiseBuffer(ctx) {
  if (noiseBuffer) return noiseBuffer;
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noiseBuffer = buffer;
  return noiseBuffer;
}

// Map of all samples to load (.bin extension avoids IDM/FDM browser interception)
const SAMPLES = {
  // Dununs Head Hits (Primary)
  "kenkeni_O": "samples/circAfrique v4/Kenkeni1 Head Hit.bin",
  "kenkeni_X": "samples/circAfrique v4/Kenkeni1 Head Mute.bin",
  "sangban_O": "samples/circAfrique v4/Sangban1 Head Hit.bin",
  "sangban_X": "samples/circAfrique v4/Sangban1 Head Mute.bin",
  "dundunba_O": "samples/circAfrique v4/Dununba1 Head Hit.bin",
  "dundunba_X": "samples/circAfrique v4/Dununba1 Head Mute.bin",
  
  // Dununs Head Hits (Secondary)
  "kenkeni2_O": "samples/circAfrique v4/Kenkeni2 Head Hit.bin",
  "kenkeni2_X": "samples/circAfrique v4/Kenkeni2 Head Mute.bin",
  "sangban2_O": "samples/circAfrique v4/Sangban2 Head Hit.bin",
  "sangban2_X": "samples/circAfrique v4/Sangban2 Head Mute.bin",
  "dundunba2_O": "samples/circAfrique v4/Dununba2 Head Hit.bin",
  "dundunba2_X": "samples/circAfrique v4/Dununba2 Head Mute.bin",
  
  // Dununs Bells (Primary)
  "kenkeni_bell_O": "samples/circAfrique v4/Kenkeni1 Bell Hit.bin",
  "kenkeni_bell_X": "samples/circAfrique v4/Kenkeni1 Bell Mute.bin",
  "sangban_bell_O": "samples/circAfrique v4/Sangban1 Bell Hit.bin",
  "sangban_bell_X": "samples/circAfrique v4/Sangban1 Bell Mute.bin",
  "dundunba_bell_O": "samples/circAfrique v4/Dununba1 Bell.bin",
  "dundunba_bell_X": "samples/circAfrique v4/Dununba1 Bell Mute.bin",

  // Dununs Bells (Secondary)
  "kenkeni_bell2_O": "samples/circAfrique v4/Kenkeni2 Bell Hit.bin",
  "kenkeni_bell2_X": "samples/circAfrique v4/Kenkeni2 Bell Mute.bin",
  "sangban_bell2_O": "samples/circAfrique v4/Sangban2 Bell Hit.bin",
  "sangban_bell2_X": "samples/circAfrique v4/Sangban2 Bell Mute.bin",
  "dundunba_bell2_O": "samples/circAfrique v4/Dununba2 Bell.bin",
  "dundunba_bell2_X": "samples/circAfrique v4/Dununba2 Bell Mute.bin",

  // Shekere Rattles (Shake & Tap)
  "shekere_O": "samples/circAfrique v4/shekere.bin",
  "shekere_X": "samples/circAfrique v4/shekere.bin",

  // Agogo Bells (High & Low)
  "agogo_O": "samples/circAfrique v4/Agogo High.bin",
  "agogo_X": "samples/circAfrique v4/Agogo Low.bin"
};

// Add Djembe 1-5 Bass/Tone/Slap
for (let i = 1; i <= 5; i++) {
  SAMPLES[`djembe${i}_B`] = `samples/circAfrique v4/Djembe${i} Bass.bin`;
  SAMPLES[`djembe${i}_T`] = `samples/circAfrique v4/Djembe${i} Tone.bin`;
  SAMPLES[`djembe${i}_S`] = `samples/circAfrique v4/Djembe${i} Slap.bin`;
}

export class DrumSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.buffers = {};
    this.isLoading = false;
    this.isLoaded = false;
    this.loadedCount = 0;
    this.totalSamples = Object.keys(SAMPLES).length;
    this.onProgress = null;
    this.humanisePitch = 0; // Independent pitch humanisation level (0% - 100%)
    this.delayNodes = {};
    this.feedbackGains = {};
    
    // Synth/Playback controls (decay replaced with reverb send levels)
    this.settings = {
      djembe: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.8 },
      kenkeni: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.8 },
      sangban: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.8 },
      dundunba: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.8 },
      kenkeni_bell: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.2, volume: 0.7 },
      sangban_bell: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.2, volume: 0.7 },
      dundunba_bell: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.2, volume: 0.7 },
      
      kenkeni2: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.8 },
      sangban2: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.8 },
      dundunba2: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.8 },
      kenkeni_bell2: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.2, volume: 0.7 },
      sangban_bell2: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.2, volume: 0.7 },
      dundunba_bell2: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.2, volume: 0.7 },
      
      shekere: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.1, volume: 3.0 },
      agogo: { pitch: 0, delay: 0, delaySubdiv: 0.25, reverb: 0.15, volume: 0.75 }
    };
  }

  async init() {
    if (this.ctx) return;
    
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    
    // Initialize Algorithmic Reverb node (Impulse response)
    try {
      this.reverbNode = this.createReverb(2.2, 4.0); // 2.2s duration (concert hall), 4.0 decay rate
      this.reverbGain = this.ctx.createGain();
      this.reverbGain.gain.setValueAtTime(1.2, this.ctx.currentTime); // boost reverb return gain (convolvers are quiet)
      this.reverbNode.connect(this.reverbGain);
      this.reverbGain.connect(this.masterGain);
    } catch (e) {
      console.error("Failed to construct reverb ConvolverNode:", e);
    }
    
    // Initialize Delay Send feedback loops for each instrument channel
    try {
      const instruments = [
        "djembe", 
        "kenkeni", "sangban", "dundunba", 
        "kenkeni_bell", "sangban_bell", "dundunba_bell", 
        "kenkeni2", "sangban2", "dundunba2", 
        "kenkeni_bell2", "sangban_bell2", "dundunba_bell2", 
        "shekere", "agogo"
      ];
      instruments.forEach(inst => {
        const delayNode = this.ctx.createDelay(2.0); // max 2s delay
        const feedbackGain = this.ctx.createGain();
        
        delayNode.connect(feedbackGain);
        feedbackGain.connect(delayNode);
        
        delayNode.connect(this.masterGain);
        
        this.delayNodes[inst] = delayNode;
        this.feedbackGains[inst] = feedbackGain;
      });
    } catch (e) {
      console.error("Failed to construct Delay feedback nodes:", e);
    }
    
    await this.loadSamples();
  }

  createReverb(duration, decay) {
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * duration;
    const impulse = this.ctx.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);
    
    // Hall-like parameters
    const preDelaySamples = Math.round(sampleRate * 0.025); // 25ms pre-delay
    const damping = 3.5; // High frequency damping rate
    
    let lastLeft = 0;
    let lastRight = 0;
    
    for (let i = 0; i < length; i++) {
      if (i < preDelaySamples) {
        left[i] = 0;
        right[i] = 0;
        continue;
      }
      
      const percent = (i - preDelaySamples) / (length - preDelaySamples);
      
      // Exponential amplitude decay
      const decayFactor = Math.exp(-percent * decay);
      
      // High-frequency damping filter coefficient (decreases over time)
      const alpha = Math.exp(-percent * damping);
      
      // Generate uncorrelated stereo noise
      const noiseL = Math.random() * 2 - 1;
      const noiseR = Math.random() * 2 - 1;
      
      // Apply one-pole lowpass filter for damping
      const filteredL = lastLeft + alpha * (noiseL - lastLeft);
      const filteredR = lastRight + alpha * (noiseR - lastRight);
      
      lastLeft = filteredL;
      lastRight = filteredR;
      
      // Scale by decay factor
      left[i] = filteredL * decayFactor;
      right[i] = filteredR * decayFactor;
    }
    
    const convolver = this.ctx.createConvolver();
    convolver.buffer = impulse;
    convolver.normalize = true;
    return convolver;
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Universal compatibility helper to decode audio data across all Web Audio implementations
  decodeAudio(arrayBuffer) {
    return new Promise((resolve, reject) => {
      try {
        this.ctx.decodeAudioData(
          arrayBuffer,
          buffer => resolve(buffer),
          err => reject(err || new Error("Decoding error"))
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  async loadSamples() {
    if (this.isLoading || this.isLoaded) return;
    this.isLoading = true;
    
    console.log("Loading DjembeStudio sample library...");
    const promises = [];
    this.loadedCount = 0;
    
    if (this.onProgress) {
      this.onProgress(this.loadedCount, this.totalSamples);
    }
    
    for (const [key, path] of Object.entries(SAMPLES)) {
      const p = fetch(path)
        .then(res => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.arrayBuffer();
        })
        .then(ab => this.decodeAudio(ab))
        .then(buffer => {
          this.buffers[key] = buffer;
          this.loadedCount++;
          if (this.onProgress) {
            this.onProgress(this.loadedCount, this.totalSamples);
          }
        })
        .catch(err => {
          console.error(`Failed to load djembe sample [${key}] from path: ${path}. Error:`, err);
          // Increment loadedCount anyway so the progress indicator doesn't stall
          this.loadedCount++;
          if (this.onProgress) {
            this.onProgress(this.loadedCount, this.totalSamples);
          }
        });
      promises.push(p);
    }
    
    try {
      await Promise.all(promises);
      this.isLoaded = true;
      console.log("All DjembeStudio WAV samples loaded successfully!");
    } catch (e) {
      console.error("Error loading some samples:", e);
    } finally {
      this.isLoading = false;
    }
  }

  setParam(instrument, param, value) {
    if (this.settings[instrument]) {
      this.settings[instrument][param] = parseFloat(value);
    }
  }

  routeDelay(gainNode, delayVal, delaySubdiv, instKey, time) {
    if (delayVal > 0 && this.delayNodes[instKey]) {
      const secondsPerBeat = 60.0 / (window.state ? window.state.bpm : 110);
      const delayTime = secondsPerBeat * delaySubdiv;
      
      const delayNode = this.delayNodes[instKey];
      delayNode.delayTime.setValueAtTime(delayTime, time);
      
      const feedbackGain = this.feedbackGains[instKey];
      feedbackGain.gain.setValueAtTime(Math.min(0.8, delayVal * 0.45), time);
      
      const sendGain = this.ctx.createGain();
      sendGain.gain.setValueAtTime(delayVal * 0.7, time);
      gainNode.connect(sendGain);
      sendGain.connect(delayNode);
    }
  }

  // Pitch calculation helper
  getFreq(baseFreq, semitoneOffset) {
    return baseFreq * Math.pow(2, semitoneOffset / 12);
  }

  // --- Sample Player Logic ---
  playSample(bufferKey, time, volume, pitchOffset, reverbSend, filterFreq = null, isMuffled = false, delaySend = 0, delaySubdiv = 0.25, instKey = "", hand = null) {
    if (!this.buffers[bufferKey]) {
      return null;
    }
    
    const ctx = this.ctx;
    const buffer = this.buffers[bufferKey];
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    // Hand detuning, volume, and filter adjustments (humanisation)
    let pitchAdjustment = 0;
    let volumeScale = 1.0;
    let extraFilterFreq = null;
    
    if (hand === "L") {
      pitchAdjustment = -0.35; // -35 cents (clearly audible hand detune)
      volumeScale = 0.90;     // Left hand is slightly softer (1dB difference)
      if (filterFreq) {
        extraFilterFreq = filterFreq * 0.82; // noticeably darker lowpass filter
      } else {
        extraFilterFreq = 6500; // apply clear high-cut lowpass filter to make it warmer
      }
    } else if (hand === "R") {
      pitchAdjustment = 0.35;  // +35 cents
    }
    
    // Pitch shift (playbackRate.value = 2^(semitones / 12))
    const finalPitchOffset = pitchOffset + pitchAdjustment;
    const playbackRate = Math.pow(2, finalPitchOffset / 12);
    source.playbackRate.setValueAtTime(playbackRate, time);
    
    const finalVolume = volume * volumeScale;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, time);
    gainNode.gain.linearRampToValueAtTime(finalVolume, time + 0.003);
    
    // Fix decay duration at 1.0 multiplier (natural sample decay) or 0.25 if muffled
    const decayScale = isMuffled ? 0.25 : 1.0;
    const duration = buffer.duration / playbackRate;
    let decayDuration = duration * decayScale;
    
    if (isMuffled) {
      decayDuration = Math.min(decayDuration, 0.05); // cut off quickly for muffled hits
    }
    
    // Smooth envelope release to avoid pop clicks
    gainNode.gain.setValueAtTime(finalVolume, time + Math.max(0.002, decayDuration - 0.015));
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + decayDuration);
    
    let lastNode = source;
    const activeFilterFreq = extraFilterFreq || filterFreq;
    if (activeFilterFreq) {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(activeFilterFreq, time);
      source.connect(filter);
      lastNode = filter;
    }
    
    lastNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Reverb Send routing
    if (reverbSend > 0 && this.reverbNode) {
      const sendGain = ctx.createGain();
      sendGain.gain.setValueAtTime(reverbSend * 0.6, time); // scale send gain to be clean and subtle
      gainNode.connect(sendGain);
      sendGain.connect(this.reverbNode);
    }

    // Delay Send routing
    this.routeDelay(gainNode, delaySend, delaySubdiv, instKey, time);
    
    source.start(time);
    source.stop(time + decayDuration + 0.05);
    return source;
  }

  // --- Djembe Sample Playback with Synthesizer Fallback ---
  playDjembe(type, time, velocity = 1.0, instrument = "djembe1", trackPitch = 0, hand = "L") {
    this.resume();
    
    let instKey = instrument.toLowerCase();
    if (!instKey.startsWith("djembe")) {
      instKey = "djembe1";
    }
    const match = instKey.match(/\d+/);
    let drumNum = match ? parseInt(match[0]) : 1;
    if (drumNum < 1 || drumNum > 5) {
      drumNum = ((drumNum - 1) % 5) + 1;
    }
    const finalInst = `djembe${drumNum}`;
    
    const settings = this.settings.djembe;
    const instVolume = settings.volume * velocity;
    
    let bufferType = type; // B, T, S, M
    let isMuffled = false;
    let filterFreq = null;
    
    if (type === "M") {
      bufferType = "S";
      isMuffled = true;
      filterFreq = 750;
    }
    
    const bufferKey = `${finalInst}_${bufferType}`;
    
    let pitchOffset = settings.pitch + trackPitch;
    
    if (this.isLoaded && this.buffers[bufferKey]) {
      this.playSample(bufferKey, time, instVolume, pitchOffset, settings.reverb, filterFreq, isMuffled, settings.delay, settings.delaySubdiv, "djembe", hand);
    } else {
      this.playSynthesizedDjembe(type, time, velocity, pitchOffset, hand);
    }
  }

  // --- Dunun Sample Playback with Synthesizer Fallback ---
  playDunun(type, hitType, time, velocity = 1.0, trackPitch = 0, hand = "L") {
    this.resume();
    
    const settings = this.settings[type] || { volume: 0.8, pitch: 0, reverb: 0.15, delay: 0, delaySubdiv: 0.25 };
    const instVolume = settings.volume * velocity;
    let sampleHitType = hitType;
    if (hitType === "C") sampleHitType = "X";
    const bufferKey = `${type}_${sampleHitType}`; // kenkeni_O, kenkeni_X, etc.
    
    let pitchOffset = settings.pitch + trackPitch;
    
    if (this.isLoaded && this.buffers[bufferKey]) {
      this.playSample(bufferKey, time, instVolume, pitchOffset, settings.reverb, null, sampleHitType === "X", settings.delay, settings.delaySubdiv, type, hand);
    } else {
      this.playSynthesizedDunun(type, sampleHitType, time, velocity, pitchOffset, hand);
    }
  }

  // --- Bell Sample Playback with Synthesizer Fallback ---
  playBell(type, hitType, time, velocity = 1.0, trackPitch = 0) {
    this.resume();
    
    const settings = this.settings[type] || { volume: 0.7, pitch: 0, reverb: 0.2, delay: 0, delaySubdiv: 0.25 };
    const instVolume = settings.volume * velocity;
    let sampleHitType = hitType;
    if (hitType === "X") sampleHitType = "O";
    else if (hitType === "C") sampleHitType = "X";
    const bufferKey = `${type}_${sampleHitType}`; // kenkeni_bell_O, etc.
    
    let pitchOffset = settings.pitch + trackPitch;
    
    if (this.isLoaded && this.buffers[bufferKey]) {
      this.playSample(bufferKey, time, instVolume, pitchOffset, settings.reverb, null, sampleHitType === "X", settings.delay, settings.delaySubdiv, type);
    } else {
      this.playSynthesizedBell(type, sampleHitType, time, velocity, pitchOffset);
    }
  }

  // --- Shekere Sample Playback with Synthesizer Fallback ---
  playShekere(hitType, time, velocity = 1.0, trackPitch = 0) {
    this.resume();
    
    const settings = this.settings.shekere || { volume: 3.0, pitch: 0, reverb: 0.1, delay: 0, delaySubdiv: 0.25 };
    const instVolume = settings.volume * velocity;
    const bufferKey = `shekere_${hitType}`; // shekere_O or shekere_X
    
    let pitchOffset = settings.pitch + trackPitch;
    
    if (hitType === "O") { // Shake (Open)
      if (this.isLoaded && this.buffers[bufferKey]) {
        this.playSample(bufferKey, time, instVolume, pitchOffset, settings.reverb, null, false, settings.delay, settings.delaySubdiv, "shekere");
      } else {
        this.playSynthesizedShekere(hitType, time, velocity, pitchOffset);
      }
    } else { // Closed/Muffled Shake (hitType === "X")
      if (this.isLoaded && this.buffers[bufferKey]) {
        // Play the shaker sample lowpass filtered at 2200Hz to make it sound muffled/filtered
        // and pitch it down slightly (-1.5 semitones) so it sounds darker/muffled
        this.playSample(bufferKey, time, instVolume * 0.9, pitchOffset - 1.5, settings.reverb * 0.8, 2200, false, settings.delay, settings.delaySubdiv, "shekere");
      } else {
        this.playSynthesizedShekere(hitType, time, velocity, pitchOffset);
      }
    }
  }

  // ================= FALLBACK SYNTHESIS ENGINE =================

  // --- Synthesized Djembe ---
  playSynthesizedDjembe(type, time, velocity = 1.0, pitchOverride = null, hand = "L") {
    const ctx = this.ctx;
    const settings = this.settings.djembe;
    
    // Hand humanisation adjustments
    let pitchAdjustment = 0;
    let volumeScale = 1.0;
    let filterScale = 1.0;
    if (hand === "L") {
      pitchAdjustment = -0.35; // -35 cents
      volumeScale = 0.90;
      filterScale = 0.82;      // warmer filter cutoff
    } else if (hand === "R") {
      pitchAdjustment = 0.35;  // +35 cents
    }
    
    const instVolume = settings.volume * velocity * volumeScale;
    const activePitch = (pitchOverride !== null ? pitchOverride : settings.pitch) + pitchAdjustment;
    
    if (type === "B") { // Bass
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      const baseFreq = this.getFreq(68, activePitch);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * 1.5, time);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, time + 0.05);
      
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140 * filterScale, time);
      
      const decay = 0.22;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      if (settings.reverb > 0 && this.reverbNode) {
        const sendGain = ctx.createGain();
        sendGain.gain.setValueAtTime(settings.reverb * 0.6, time);
        gain.connect(sendGain);
        sendGain.connect(this.reverbNode);
      }
      
      this.routeDelay(gain, settings.delay, settings.delaySubdiv, "djembe", time);
      
      osc.start(time);
      osc.stop(time + decay + 0.02);
      
    } else if (type === "T") { // Tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      const baseFreq = this.getFreq(210, activePitch);
      
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(baseFreq, time);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, time + 0.04);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(baseFreq * 2.9, time);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, time + 0.04);
      
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800 * filterScale, time);
      
      const decay = 0.12;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume * 0.7, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
      
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.3, time);
      
      osc1.connect(filter);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      
      filter.connect(gain);
      gain.connect(this.masterGain);

      if (settings.reverb > 0 && this.reverbNode) {
        const sendGain = ctx.createGain();
        sendGain.gain.setValueAtTime(settings.reverb * 0.6, time);
        gain.connect(sendGain);
        sendGain.connect(this.reverbNode);
      }
      
      this.routeDelay(gain, settings.delay, settings.delaySubdiv, "djembe", time);
      
      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + decay + 0.02);
      osc2.stop(time + decay + 0.02);
      
    } else if (type === "S") { // Slap
      const osc = ctx.createOscillator();
      const noise = ctx.createBufferSource();
      const noiseFilter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      const baseFreq = this.getFreq(360, activePitch);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, time);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, time + 0.02);
      
      noise.buffer = getNoiseBuffer(ctx);
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(1200 * filterScale, time);
      noiseFilter.Q.setValueAtTime(6, time);
      
      const decay = 0.06;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.8, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + decay * 0.8);
      
      osc.connect(gain);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(gain);
      
      gain.connect(this.masterGain);

      if (settings.reverb > 0 && this.reverbNode) {
        const sendGain = ctx.createGain();
        sendGain.gain.setValueAtTime(settings.reverb * 0.6, time);
        gain.connect(sendGain);
        sendGain.connect(this.reverbNode);
      }
      
      this.routeDelay(gain, settings.delay, settings.delaySubdiv, "djembe", time);
      
      osc.start(time);
      noise.start(time);
      osc.stop(time + decay + 0.02);
      noise.stop(time + decay + 0.02);
      
    } else if (type === "M") { // Muffled Slap
      const osc = ctx.createOscillator();
      const noise = ctx.createBufferSource();
      const noiseFilter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      const baseFreq = this.getFreq(260, activePitch);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, time);
      osc.frequency.linearRampToValueAtTime(baseFreq * 0.9, time + 0.015);
      
      noise.buffer = getNoiseBuffer(ctx);
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(800 * filterScale, time);
      noiseFilter.Q.setValueAtTime(3, time);
      
      const decay = 0.035;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume * 0.9, time + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + decay * 0.6);
      
      osc.connect(gain);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(gain);
      
      gain.connect(this.masterGain);

      if (settings.reverb > 0 && this.reverbNode) {
        const sendGain = ctx.createGain();
        sendGain.gain.setValueAtTime(settings.reverb * 0.6, time);
        gain.connect(sendGain);
        sendGain.connect(this.reverbNode);
      }
      
      this.routeDelay(gain, settings.delay, settings.delaySubdiv, "djembe", time);
      
      osc.start(time);
      noise.start(time);
      osc.stop(time + decay + 0.02);
      noise.stop(time + decay + 0.02);
    }
  }

  // --- Synthesized Dunun ---
  playSynthesizedDunun(type, hitType, time, velocity = 1.0, pitchOverride = null, hand = "L") {
    const ctx = this.ctx;
    const settings = this.settings[type] || { volume: 0.8, pitch: 0, reverb: 0.15, delay: 0, delaySubdiv: 0.25 };
    
    // Hand humanisation adjustments
    let pitchAdjustment = 0;
    let volumeScale = 1.0;
    let filterScale = 1.0;
    if (hand === "L") {
      pitchAdjustment = -0.35; // -35 cents
      volumeScale = 0.90;
      filterScale = 0.82;      // warmer filter cutoff
    } else if (hand === "R") {
      pitchAdjustment = 0.35;  // +35 cents
    }
    
    const instVolume = settings.volume * velocity * volumeScale;
    const activePitch = (pitchOverride !== null ? pitchOverride : settings.pitch) + pitchAdjustment;
    
    let baseFreq = 72;
    let decayVal = 0.45;
    if (type.startsWith("sangban")) {
      baseFreq = 105;
      decayVal = 0.32;
    } else if (type.startsWith("kenkeni")) {
      baseFreq = 150;
      decayVal = 0.22;
    }
    
    baseFreq = this.getFreq(baseFreq, activePitch);
    const decay = decayVal;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lowpass = ctx.createBiquadFilter();
    
    osc.type = "sine";
    
    if (hitType === "O") { // Open Ringing
      osc.frequency.setValueAtTime(baseFreq * 1.25, time);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, time + 0.08);
      
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(350 * filterScale, time);
      
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume, time + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
      
    } else { // Muffled
      osc.frequency.setValueAtTime(baseFreq * 1.15, time);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.05, time + 0.03);
      
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(250 * filterScale, time);
      
      const mDecay = decay * 0.3;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume * 0.75, time + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, time + mDecay);
      
      const stick = ctx.createBufferSource();
      const stickFilter = ctx.createBiquadFilter();
      const stickGain = ctx.createGain();
      
      stick.buffer = getNoiseBuffer(ctx);
      stickFilter.type = "highpass";
      stickFilter.frequency.setValueAtTime(1000, time);
      
      stickGain.gain.setValueAtTime(0.05 * instVolume, time);
      stickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
      
      stick.connect(stickFilter);
      stickFilter.connect(stickGain);
      stickGain.connect(this.masterGain);
      
      stick.start(time);
      stick.stop(time + 0.02);
    }
    
    osc.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.masterGain);

    if (settings.reverb > 0 && this.reverbNode) {
      const sendGain = ctx.createGain();
      sendGain.gain.setValueAtTime(settings.reverb * 0.6, time);
      gain.connect(sendGain);
      sendGain.connect(this.reverbNode);
    }
    
    this.routeDelay(gain, settings.delay, settings.delaySubdiv, type, time);
    
    osc.start(time);
    osc.stop(time + decay + 0.02);
  }

  // --- Synthesized Dunun Bell ---
  playSynthesizedBell(type, hitType, time, velocity = 1.0, pitchOverride = null) {
    const ctx = this.ctx;
    const settings = this.settings[type] || { volume: 0.7, pitch: 0, reverb: 0.2, delay: 0, delaySubdiv: 0.25 };
    const instVolume = settings.volume * velocity;
    const activePitch = pitchOverride !== null ? pitchOverride : settings.pitch;
    
    let carrierFreq = 950;
    let modFreq = 410;
    let decayVal = 0.28;
    
    if (type.startsWith("sangban_bell")) {
      carrierFreq = 1200;
      modFreq = 515;
      decayVal = 0.22;
    } else if (type.startsWith("kenkeni_bell")) {
      carrierFreq = 1450;
      modFreq = 620;
      decayVal = 0.18;
    }
    
    carrierFreq = this.getFreq(carrierFreq, activePitch);
    modFreq = this.getFreq(modFreq, activePitch);
    const decay = decayVal;
    
    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const bellGain = ctx.createGain();
    const highpass = ctx.createBiquadFilter();
    
    carrier.type = "sine";
    carrier.frequency.setValueAtTime(carrierFreq, time);
    
    modulator.type = "sine";
    modulator.frequency.setValueAtTime(modFreq, time);
    
    modGain.gain.setValueAtTime(350, time);
    
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(800, time);
    
    if (hitType === "O") {
      bellGain.gain.setValueAtTime(0.001, time);
      bellGain.gain.linearRampToValueAtTime(instVolume, time + 0.002);
      bellGain.gain.exponentialRampToValueAtTime(0.001, time + decay);
    } else {
      const mDecay = decay * 0.2;
      bellGain.gain.setValueAtTime(0.001, time);
      bellGain.gain.linearRampToValueAtTime(instVolume * 0.85, time + 0.002);
      bellGain.gain.exponentialRampToValueAtTime(0.001, time + mDecay);
    }
    
    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(highpass);
    highpass.connect(bellGain);
    bellGain.connect(this.masterGain);

    if (settings.reverb > 0 && this.reverbNode) {
      const sendGain = ctx.createGain();
      sendGain.gain.setValueAtTime(settings.reverb * 0.6, time);
      bellGain.connect(sendGain);
      sendGain.connect(this.reverbNode);
    }
    
    this.routeDelay(bellGain, settings.delay, settings.delaySubdiv, type, time);
    
    modulator.start(time);
    carrier.start(time);
    modulator.stop(time + decay + 0.02);
    carrier.stop(time + decay + 0.02);
  }

  // --- Synthesized Shekere ---
  playSynthesizedShekere(hitType, time, velocity = 1.0, pitchOverride = null) {
    const ctx = this.ctx;
    const settings = this.settings.shekere || { volume: 3.0, pitch: 0, reverb: 0.1, delay: 0, delaySubdiv: 0.25 };
    const instVolume = settings.volume * velocity;
    
    if (hitType === "O") { // Shake
      const noise = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      noise.buffer = getNoiseBuffer(ctx);
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3200, time);
      filter.Q.setValueAtTime(3, time);
      
      const decay = 0.09;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume * 0.8, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      if (settings.reverb > 0 && this.reverbNode) {
        const sendGain = ctx.createGain();
        sendGain.gain.setValueAtTime(settings.reverb * 0.6, time);
        gain.connect(sendGain);
        sendGain.connect(this.reverbNode);
      }
      
      this.routeDelay(gain, settings.delay, settings.delaySubdiv, "shekere", time);
      
      noise.start(time);
      noise.stop(time + decay + 0.02);
    } else { // Closed/Muffled Shake (hitType === "X")
      // Bandpassed/Lowpassed noise burst simulating closed rattle
      const noise = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      noise.buffer = getNoiseBuffer(ctx);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, time);
      
      const decay = 0.09; // 90ms decay
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(instVolume * 0.8, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      if (settings.reverb > 0 && this.reverbNode) {
        const sendGain = ctx.createGain();
        sendGain.gain.setValueAtTime(settings.reverb * 0.2, time); // scaled send for closed hits
        gain.connect(sendGain);
        sendGain.connect(this.reverbNode);
      }
      
      this.routeDelay(gain, settings.delay, settings.delaySubdiv, "shekere", time);
      
      noise.start(time);
      noise.stop(time + decay + 0.02);
    }
  }
}
