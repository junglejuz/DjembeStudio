const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Load files
let audioJs = fs.readFileSync(path.join(__dirname, 'audio.js'), 'utf8');
let rhythmsJs = fs.readFileSync(path.join(__dirname, 'rhythms.js'), 'utf8');
let libraryJs = fs.readFileSync(path.join(__dirname, 'library.js'), 'utf8');
let appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Wrap in IIFE and set exports on window
audioJs = `(function() {
${audioJs.replace(/export class DrumSynth/g, 'class DrumSynth')}
window.DrumSynth = DrumSynth;
})();`;

rhythmsJs = `(function() {
${rhythmsJs.replace(/export const RHYTHM_PRESETS/g, 'const RHYTHM_PRESETS').replace(/export const TIME_SIGNATURE_DEFAULTS/g, 'const TIME_SIGNATURE_DEFAULTS')}
window.RHYTHM_PRESETS = RHYTHM_PRESETS;
window.TIME_SIGNATURE_DEFAULTS = TIME_SIGNATURE_DEFAULTS;
})();`;

libraryJs = `(function() {
${libraryJs.replace(/export const RHYTHM_LIBRARY/g, 'const RHYTHM_LIBRARY')}
window.RHYTHM_LIBRARY = RHYTHM_LIBRARY;
})();`;

// Strip imports from app.js
const appLines = appJs.split('\n');
while (appLines.length > 0 && appLines[0].trim().startsWith('import')) {
  appLines.shift();
}
appJs = appLines.join('\n');

// Mock imports for appJs context
const mockHeader = `
const DrumSynth = window.DrumSynth;
const RHYTHM_PRESETS = window.RHYTHM_PRESETS;
const TIME_SIGNATURE_DEFAULTS = window.TIME_SIGNATURE_DEFAULTS;
const RHYTHM_LIBRARY = window.RHYTHM_LIBRARY;
`;
appJs = `(function() {
${mockHeader}
${appJs}
})();`;

const dom = new JSDOM(htmlContent, {
  url: 'http://localhost/',
  referrer: 'http://localhost/',
  contentType: 'text/html',
  runScripts: 'dangerously',
  resources: 'usable',
  beforeParse(window) {
    window.requestAnimationFrame = (cb) => setTimeout(cb, 16);
    window.AudioContext = class {
      constructor() { this.currentTime = 0.1; this.sampleRate = 44100; this.destination = {}; }
      createGain() { return { gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
      createDelay() { return { delayTime: { setValueAtTime: () => {} }, connect: () => {} }; }
      createConvolver() { return { connect: () => {} }; }
      createBuffer() { return { getChannelData: () => new Float32Array(100), duration: 1.0 }; }
      createBufferSource() { return { buffer: null, playbackRate: { setValueAtTime: () => {} }, connect: () => {}, start: () => {}, stop: () => {} }; }
      createBiquadFilter() { return { type: 'lowpass', frequency: { setValueAtTime: () => {} }, Q: { setValueAtTime: () => {} }, connect: () => {} }; }
      decodeAudioData(arrayBuffer, successCallback) {
        setTimeout(() => { if (successCallback) successCallback({ duration: 1.0 }); }, 1);
      }
    };
    window.webkitAudioContext = window.AudioContext;
    window.fetch = () => Promise.resolve({ ok: true, arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)) });
  }
});

const { window } = dom;

function runScript(code) {
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = code;
  window.document.body.appendChild(scriptEl);
}

runScript(audioJs);
runScript(rhythmsJs);
runScript(libraryJs);

runScript(appJs);

setTimeout(() => {
  console.log('Testing loading all library items (with renderGrid mocked)...');
  window.renderGrid = () => {};
  
  const library = window.RHYTHM_LIBRARY;
  let successCount = 0;
  let failCount = 0;
  
  for (let rhythm of library) {
    console.log(`[FAST TEST] Loading rhythm: ${rhythm.name} (${rhythm.id})`);
    try {
      window.loadRhythm(rhythm);
      successCount++;
    } catch (e) {
      console.error(`Failed to load rhythm "${rhythm.name}" (${rhythm.id}):`, e);
      failCount++;
    }
  }
  
  console.log(`Loaded ${successCount} rhythms successfully. Failed: ${failCount}`);
  process.exit(0);
}, 500);
