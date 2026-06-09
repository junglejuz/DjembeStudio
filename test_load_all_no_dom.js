const fs = require('fs');
const path = require('path');

// Mock DOM globally
function createMockElement(tag = '') {
  const el = {
    value: '',
    textContent: '',
    className: '',
    options: [],
    style: { setProperty: () => {}, removeProperty: () => {} },
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    appendChild: (child) => child,
    addEventListener: () => {},
    setAttribute: () => {},
    getAttribute: () => '',
    removeAttribute: () => {},
    querySelector: () => createMockElement(),
    querySelectorAll: () => []
  };
  return el;
}

global.window = {
  state: {},
  document: null,
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};
global.document = {
  getElementById: (id) => createMockElement(),
  createElement: (tag) => createMockElement(tag),
  querySelectorAll: () => [],
  querySelector: () => createMockElement(),
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.window.document = global.document;

// Load file contents
let rhythmsJs = fs.readFileSync(path.join(__dirname, 'rhythms.js'), 'utf8');
let libraryJs = fs.readFileSync(path.join(__dirname, 'library_compiled.js'), 'utf8');
let appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Strip exports and assign directly to global
rhythmsJs = rhythmsJs.replace(/export const RHYTHM_PRESETS/g, 'global.RHYTHM_PRESETS');
rhythmsJs = rhythmsJs.replace(/export const TIME_SIGNATURE_DEFAULTS/g, 'global.TIME_SIGNATURE_DEFAULTS');
libraryJs = libraryJs.replace(/export const RHYTHM_LIBRARY/g, 'global.RHYTHM_LIBRARY');

// Evaluate them in global scope
eval(rhythmsJs);
eval(libraryJs);

// Mock DrumSynth
global.DrumSynth = class {
  constructor() {
    this.settings = { djembe: {}, kenkeni: {}, sangban: {}, dundunba: {}, kenkeni_bell: {}, sangban_bell: {}, dundunba_bell: {}, shekere: {} };
  }
  init() { return Promise.resolve(); }
  resume() {}
};

// Mock requestAnimationFrame
global.requestAnimationFrame = () => {};

// Parse app.js and run it
// Strip imports
const appLines = appJs.split('\n');
while (appLines.length > 0 && appLines[0].trim().startsWith('import')) {
  appLines.shift();
}
appJs = appLines.join('\n');

// Mock imports for app.js
const mockHeader = `
const DrumSynth = global.DrumSynth;
const RHYTHM_PRESETS = global.RHYTHM_PRESETS;
const TIME_SIGNATURE_DEFAULTS = global.TIME_SIGNATURE_DEFAULTS;
const RHYTHM_LIBRARY = global.RHYTHM_LIBRARY;
`;
appJs = mockHeader + appJs;

// Run app.js
eval(appJs);

console.log('Testing loading all library items in pure Node...');
const library = global.RHYTHM_LIBRARY;
let successCount = 0;
let failCount = 0;

for (let rhythm of library) {
  const name = rhythm.rhythm_name || "Untitled";
  console.log(`[PURE NODE] Loading rhythm: ${name}`);
  try {
    global.window.loadRhythm(rhythm);
    successCount++;
  } catch (e) {
    console.error(`Failed to load rhythm "${name}":`, e);
    failCount++;
  }
}

console.log(`Loaded ${successCount} rhythms successfully. Failed: ${failCount}`);
process.exit(failCount > 0 ? 1 : 0);
