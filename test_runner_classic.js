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

// Strip the imports from app.js
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
    // Mock requestAnimationFrame
    window.requestAnimationFrame = (cb) => setTimeout(cb, 16);
    
    // Mock Web Audio API
    window.AudioContext = class {
      constructor() {
        this.currentTime = 0;
        this.sampleRate = 44100;
        this.destination = {};
      }
      createGain() {
        return {
          gain: {
            setValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {}
          },
          connect: () => {}
        };
      }
      createDelay() {
        return {
          delayTime: { setValueAtTime: () => {} },
          connect: () => {}
        };
      }
      createConvolver() {
        return { connect: () => {} };
      }
      createBuffer() {
        return {
          getChannelData: () => new Float32Array(100),
          duration: 1.0
        };
      }
      decodeAudioData(arrayBuffer, successCallback, errorCallback) {
        // Mock async decoding
        setTimeout(() => {
          if (successCallback) successCallback({ duration: 1.0 });
        }, 1);
      }
    };
    window.webkitAudioContext = window.AudioContext;
    
    // Mock fetch
    window.fetch = () => Promise.resolve({
      ok: true,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(100))
    });

    // Capture logs and errors
    window.console.log = (...args) => console.log('[BROWSER LOG]:', ...args);
    window.console.error = (...args) => console.error('[BROWSER ERROR]:', ...args);
  }
});

const { window } = dom;

// Execute scripts in order
function runScript(code, filename) {
  try {
    const scriptEl = window.document.createElement('script');
    scriptEl.textContent = code;
    window.document.body.appendChild(scriptEl);
  } catch (e) {
    console.error(`Error executing ${filename}:`, e);
  }
}

// Listen for unhandled errors in JSDOM window
window.addEventListener('error', (event) => {
  console.error('[UNCAUGHT ERROR]:', event.error);
});

console.log('Running audio.js...');
runScript(audioJs, 'audio.js');

console.log('Running rhythms.js...');
runScript(rhythmsJs, 'rhythms.js');

console.log('Running library.js...');
runScript(libraryJs, 'library.js');

console.log('Running app.js...');
runScript(appJs, 'app.js');

console.log('Checking state...');
setTimeout(() => {
  try {
    console.log('Tracks count:', window.state ? window.state.tracks.length : 'undefined');
    console.log('Current Rhythm:', window.state ? window.state.currentRhythmName : 'undefined');
    process.exit(0);
  } catch (e) {
    console.error('Error checking state:', e);
    process.exit(1);
  }
}, 200);
