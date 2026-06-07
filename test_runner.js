const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Set up JSDOM with resources: "usable" to load scripts, and runScripts: "dangerously"
const dom = new JSDOM(htmlContent, {
  url: 'http://localhost/',
  referrer: 'http://localhost/',
  contentType: 'text/html',
  runScripts: 'dangerously',
  resources: 'usable',
  beforeParse(window) {
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
          getChannelData: () => new Float32Array(100)
        };
      }
    };
    window.webkitAudioContext = window.AudioContext;
    
    // Mock fetch for samples
    window.fetch = () => Promise.resolve({
      ok: true,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(100))
    });

    // Capture console logs and errors
    window.console.log = (...args) => console.log('[BROWSER LOG]:', ...args);
    window.console.error = (...args) => console.error('[BROWSER ERROR]:', ...args);
  }
});

// Wait a bit for script execution/initialization
setTimeout(() => {
  console.log('JSDOM initialized. Testing state...');
  try {
    const state = dom.window.state;
    console.log('Current state tracks count:', state ? state.tracks.length : 'undefined');
  } catch (e) {
    console.error('Error reading state:', e);
  }
}, 2000);
