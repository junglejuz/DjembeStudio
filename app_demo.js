import { DrumSynth } from './audio.js?v=1.0.9';
import { RHYTHM_PRESETS, TIME_SIGNATURE_DEFAULTS } from './rhythms.js?v=1.0.9';
import { RHYTHM_LIBRARY } from './library.js?v=1.0.9';


// Application State
const state = {
  isPlaying: false,
  callIntroActive: false,
  bpm: 110,
  swing: 0,
  humaniseTime: 40,
  humanisePitch: 20,
  humaniseVolume: 40,
  timeSignature: "4/4",
  beats: 4,
  globalSubdivision: 4,
  customSwingOffsets: {
    2: [0, 0],
    3: [0, 0, 0],
    4: [0, 0, 0, 0],
    6: [0, 0, 0, 0, 0, 0]
  },
  tracks: [],
  customDjembeCount: 0,
  customKenkeniCount: 0,
  customSangbanCount: 0,
  customDundunbaCount: 0,
  customShekereCount: 0,
  currentEpoch: 0,
  currentRhythmName: "Kuku",
  currentVariations: null,
  focusedTrackId: null,
  queuedActions: []
};

// Synth Engine Instance
const synth = new DrumSynth();

// Graphical SVGs for Track Instruments
const DJEMBE_1_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <ellipse cx="12" cy="5" rx="7" ry="2" fill="currentColor" fill-opacity="0.15" />
  <path d="M5 5c0 4 3 6 4 10a3 3 0 0 0 3 3 3 3 0 0 0 3-3c1-4 4-6 4-10" />
  <ellipse cx="12" cy="18" rx="3" ry="1" fill="currentColor" fill-opacity="0.2" />
</svg>`;

const DJEMBE_2_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <ellipse cx="12" cy="5" rx="7" ry="2" fill="currentColor" fill-opacity="0.15" />
  <path d="M5 5c0 4 3 6 4 10a3 3 0 0 0 3 3 3 3 0 0 0 3-3c1-4 4-6 4-10" />
  <ellipse cx="12" cy="18" rx="3" ry="1" fill="currentColor" fill-opacity="0.2" />
  <path d="M8 6l1 9 M12 7v8 M16 6l-1 9" stroke-width="1.2" stroke-dasharray="1 1" />
</svg>`;

const DJEMBE_3_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <ellipse cx="12" cy="5" rx="7.5" ry="2" fill="currentColor" fill-opacity="0.15" />
  <path d="M4.5 5c0 3 2.5 5.5 3.5 9.5a4 4 0 0 0 4 3.5 4 4 0 0 0 4-3.5c1-4 3.5-6.5 3.5-9.5" />
  <ellipse cx="12" cy="18" rx="4" ry="1" fill="currentColor" fill-opacity="0.2" />
  <path d="M8 12.5a4 0.8 0 0 0 8 0" stroke-width="1.5" />
</svg>`;

const DJEMBE_4_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <ellipse cx="12" cy="4.5" rx="6.5" ry="1.8" fill="currentColor" fill-opacity="0.25" />
  <path d="M12 4.5m-6.5 0v1a6.5 1.8 0 0 0 13 0v-1" />
  <path d="M5.5 5c0 4.5 3.5 6.5 3.5 10.5a3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-4 3.5-6 3.5-10.5" />
  <ellipse cx="12" cy="18.5" rx="3" ry="1" fill="currentColor" fill-opacity="0.25" />
  <path d="M9 13.5l3-8.5 3 8.5 M7 6.5l5 7 5-7" stroke-width="1" stroke-opacity="0.7" />
</svg>`;

const DJEMBE_5_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
  <ellipse cx="12" cy="5" rx="7" ry="2" fill="currentColor" fill-opacity="0.15" />
  <path d="M5 5c0 3.5 2 5.5 3 9.5v3.5h8v-3.5c1-4 3-6 3-9.5" />
  <line x1="8" y1="14.5" x2="16" y2="14.5" stroke-width="1.5" />
</svg>`;

const DJEMBE_6_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <ellipse cx="12" cy="5" rx="7" ry="2" fill="currentColor" fill-opacity="0.15" />
  <path d="M5 5c0 4 3 6 4 10a3 3 0 0 0 3 3 3 3 0 0 0 3-3c1-4 4-6 4-10" />
  <ellipse cx="12" cy="18" rx="3" ry="1" fill="currentColor" fill-opacity="0.2" />
  <path d="M6 5.5l5 9 M18 5.5l-5 9 M12 5l-3 9.5 M12 5l3 9.5" stroke-width="0.8" stroke-opacity="0.6" />
</svg>`;

const DJEMBE_7_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <ellipse cx="12" cy="5" rx="7" ry="2" fill="currentColor" fill-opacity="0.1" />
  <path d="M5 5c0 4 3 6 4 10a3 3 0 0 0 3 3 3 3 0 0 0 3-3c1-4 4-6 4-10" />
  <ellipse cx="12" cy="18" rx="4.5" ry="1.5" fill="currentColor" fill-opacity="0.3" />
  <path d="M9.5 13.5h5 M9 15h6" stroke-width="1.5" />
</svg>`;

const KENKENI_1_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="7" cy="12" rx="1.2" ry="5" />
  <ellipse cx="17" cy="12" rx="1.2" ry="5" />
  <path d="M7 7h10M7 17h10" />
  <path d="M7 7l2.5 10 2.5-10 2.5 10 2.5-10" stroke-dasharray="1 1" />
</svg>`;

const KENKENI_2_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="7.5" y="7" width="9" height="10" rx="1.5" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="7.5" cy="12" rx="1" ry="5" />
  <ellipse cx="16.5" cy="12" rx="1" ry="5" />
  <path d="M7.5 7h9M7.5 17h9" />
  <path d="M7.5 7l2.25 10 2.25-10 2.25 10 2.25-10" />
  <path d="M7.5 17l2.25-10 2.25 10 2.25-10 2.25 10" stroke-width="0.8" stroke-opacity="0.5" />
</svg>`;

const KENKENI_3_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" fill-opacity="0.25" />
  <ellipse cx="7" cy="12" rx="1.2" ry="5" />
  <ellipse cx="17" cy="12" rx="1.2" ry="5" />
  <path d="M7 7h10M7 17h10" stroke-width="2.5" />
  <line x1="12" y1="7" x2="12" y2="17" stroke-width="1.5" />
</svg>`;

const KENKENI_BELL_1_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 3a2 2 0 0 0-2 2v1h4V5a2 2 0 0 0-2-2z" />
  <path d="M10 6 L7 17 A5 1.5 0 0 0 17 17 L14 6 Z" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="12" cy="17" rx="5" ry="1.5" />
  <line x1="12" y1="6" x2="12" y2="15.5" stroke-dasharray="1 2" />
</svg>`;

const KENKENI_BELL_2_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 3a2 2 0 0 0-2 2v1h4V5a2 2 0 0 0-2-2z" />
  <path d="M10 6 L7 17 A5 1.5 0 0 0 17 17 L14 6 Z" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="12" cy="17" rx="5" ry="1.5" />
  <path d="M8.5 11.5a3 0.9 0 0 0 7 0" stroke-width="1" stroke-dasharray="1 1" />
  <line x1="12" y1="6" x2="12" y2="15.5" />
</svg>`;

const KENKENI_BELL_3_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 3a2 2 0 0 0-2 2v1h4V5a2 2 0 0 0-2-2z" />
  <path d="M10 6 L7 17 A5 1.5 0 0 0 17 17 L14 6 Z" fill="currentColor" fill-opacity="0.3" />
  <ellipse cx="12" cy="17" rx="5" ry="1.5" />
  <path d="M10 6h4 M8.5 11.5h7" stroke-width="1.5" />
</svg>`;

const SANGBAN_1_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="5" y="6" width="14" height="12" rx="2" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="5" cy="12" rx="1.5" ry="6" />
  <ellipse cx="19" cy="12" rx="1.5" ry="6" />
  <path d="M5 6h14M5 18h14" />
  <path d="M5 6l3.5 12 3.5-12 3.5 12 3.5-12" stroke-dasharray="1 1" />
</svg>`;

const SANGBAN_2_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="5.5" y="6" width="13" height="12" rx="1.5" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="5.5" cy="12" rx="1.2" ry="6" />
  <ellipse cx="18.5" cy="12" rx="1.2" ry="6" />
  <path d="M5.5 6h13M5.5 18h13" />
  <path d="M5.5 6l3.25 12 3.25-12 3.25 12 3.25-12" />
  <path d="M5.5 18l3.25-12 3.25 12 3.25-12 3.25 12" stroke-width="0.8" stroke-opacity="0.5" />
</svg>`;

const SANGBAN_3_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="5" y="6" width="14" height="12" rx="2" fill="currentColor" fill-opacity="0.25" />
  <ellipse cx="5" cy="12" rx="1.5" ry="6" />
  <ellipse cx="19" cy="12" rx="1.5" ry="6" />
  <path d="M5 6h14M5 18h14" />
  <path d="M8 6v12 M11 6v12 M14 6v12" stroke-width="1.2" />
</svg>`;

const SANGBAN_BELL_1_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a2 2 0 0 0-2 2v2h4V4a2 2 0 0 0-2-2z" />
  <path d="M10 8 L6 18 A6 1.8 0 0 0 18 18 L14 8 Z" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="12" cy="18" rx="6" ry="1.8" />
  <line x1="12" y1="8" x2="12" y2="16.2" />
  <path d="M8.5 13c2.3 1 4.7 1 7 0" stroke-width="1" stroke-dasharray="1 1" />
</svg>`;

const SANGBAN_BELL_2_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a2 2 0 0 0-2 2v2h4V4a2 2 0 0 0-2-2z" />
  <path d="M10 8 L6 18 A6 1.8 0 0 0 18 18 L14 8 Z" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="12" cy="18" rx="6" ry="1.8" />
  <line x1="12" y1="8" x2="12" y2="16.2" stroke-dasharray="2 1" />
  <path d="M8 13.5a5.5 1.5 0 0 0 8 0" stroke-width="1.2" />
</svg>`;

const SANGBAN_BELL_3_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a2 2 0 0 0-2 2v2h4V4a2 2 0 0 0-2-2z" stroke-width="2.5" />
  <path d="M10 8 L6 18 A6 1.8 0 0 0 18 18 L14 8 Z" fill="currentColor" fill-opacity="0.3" />
  <ellipse cx="12" cy="18" rx="6" ry="1.8" />
  <path d="M10 8h4 M7.5 14.5h9" stroke-width="1.8" />
</svg>`;

const DUNDUNBA_1_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="3" cy="12" rx="1.5" ry="7" />
  <ellipse cx="21" cy="12" rx="1.5" ry="7" />
  <path d="M3 5h18M3 19h18" />
  <path d="M3 5l4.5 14 4.5-14 4.5 14 4.5-14" stroke-dasharray="1 1" />
</svg>`;

const DUNDUNBA_2_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="3.5" y="5" width="17" height="14" rx="1.5" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="3.5" cy="12" rx="1.2" ry="7" />
  <ellipse cx="20.5" cy="12" rx="1.2" ry="7" />
  <path d="M3.5 5h17M3.5 19h17" />
  <path d="M3.5 5l4.25 14 4.25-14 4.25 14 4.25-14" />
  <path d="M3.5 19l4.25-14 4.25 14 4.25-14 4.25 14" stroke-width="1" stroke-opacity="0.6" />
</svg>`;

const DUNDUNBA_3_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fill-opacity="0.25" />
  <ellipse cx="3" cy="12" rx="1.5" ry="7" />
  <ellipse cx="21" cy="12" rx="1.5" ry="7" />
  <path d="M3 5h18M3 19h18" />
  <path d="M3 8.5h18M3 12h18M3 15.5h18" stroke-dasharray="2 2" stroke-opacity="0.8" />
</svg>`;

const DUNDUNBA_BELL_1_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v2.5h5V4.5A2.5 2.5 0 0 0 12 2z" />
  <path d="M9.5 7 L5 19 A7 2 0 0 0 19 19 L14.5 7 Z" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="12" cy="19" rx="7" ry="2" />
  <line x1="12" y1="7" x2="12" y2="17" />
  <path d="M8.2 12c2.5 1.2 5.1 1.2 7.6 0" stroke-width="1.2" />
  <path d="M6.5 16c3.6 1.5 7.4 1.5 11 0" stroke-width="1.2" />
</svg>`;

const DUNDUNBA_BELL_2_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v2.5h5V4.5A2.5 2.5 0 0 0 12 2z" />
  <path d="M9.5 7 L5 19 A7 2 0 0 0 19 19 L14.5 7 Z" fill="currentColor" fill-opacity="0.15" />
  <ellipse cx="12" cy="19" rx="7" ry="2" />
  <line x1="12" y1="7" x2="12" y2="17" stroke-dasharray="1 1" />
  <path d="M8 12.5a6.5 1.5 0 0 0 8 0 M6.5 15.5a9 1.5 0 0 0 11 0" stroke-width="1" />
</svg>`;

const DUNDUNBA_BELL_3_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v2.5h5V4.5A2.5 2.5 0 0 0 12 2z" stroke-width="2.5" />
  <path d="M9.5 7 L5 19 A7 2 0 0 0 19 19 L14.5 7 Z" fill="currentColor" fill-opacity="0.3" />
  <ellipse cx="12" cy="19" rx="7" ry="2" />
  <path d="M9.5 7h5 M7.2 13.2h9.6" stroke-width="1.8" />
</svg>`;

const SHEKERE_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 3a2 2 0 0 0-2 2v2.5C10 9 7.5 10 7.5 13a4.5 4.5 0 0 0 9 0c0-3-2.5-4-2.5-5.5V5a2 2 0 0 0-2-2z" fill="currentColor" fill-opacity="0.15" />
  <path d="M8 12c1.5 1.5 6.5 1.5 8 0" stroke-dasharray="1 2" />
  <path d="M7.5 13.5c1.5 1.5 7.5 1.5 9 0" stroke-dasharray="1 2" />
  <path d="M8 15c1 1.2 7 1.2 8 0" stroke-dasharray="1 2" />
  <circle cx="10" cy="11.5" r="1" fill="currentColor" />
  <circle cx="14" cy="11.5" r="1" fill="currentColor" />
  <circle cx="8.5" cy="13" r="1" fill="currentColor" />
  <circle cx="12" cy="13.2" r="1" fill="currentColor" />
  <circle cx="15.5" cy="13" r="1" fill="currentColor" />
  <circle cx="10" cy="15" r="1" fill="currentColor" />
  <circle cx="14" cy="15" r="1" fill="currentColor" />
</svg>`;

const CALL_SVG = `<svg class="track-inst-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="currentColor" fill-opacity="0.15" />
  <line x1="4" y1="22" x2="4" y2="15" />
</svg>`;

function getInstrumentSVG(instrument, type) {
  if (type === "djembe" || (instrument && instrument.startsWith("djembe"))) {
    if (instrument === "djembe1") return DJEMBE_1_SVG;
    if (instrument === "djembe2") return DJEMBE_2_SVG;
    if (instrument === "djembe3") return DJEMBE_3_SVG;
    if (instrument === "djembe4") return DJEMBE_4_SVG;
    if (instrument === "djembe5") return DJEMBE_5_SVG;
    if (instrument === "djembe6") return DJEMBE_6_SVG;
    if (instrument === "djembe7") return DJEMBE_7_SVG;
    return DJEMBE_1_SVG;
  }
  if (type === "shekere" || instrument === "shekere") return SHEKERE_SVG;
  if (instrument === "call" || type === "call") return CALL_SVG;

  // Dunun / Bell
  const isBell = type === "bell" || (instrument && instrument.includes("bell"));
  if (instrument && instrument.includes("kenkeni")) {
    if (isBell) {
      if (instrument.includes("3")) return KENKENI_BELL_2_SVG;
      if (instrument.includes("4")) return KENKENI_BELL_3_SVG;
      return KENKENI_BELL_1_SVG;
    } else {
      if (instrument.includes("3")) return KENKENI_2_SVG;
      if (instrument.includes("4")) return KENKENI_3_SVG;
      return KENKENI_1_SVG;
    }
  }
  if (instrument && instrument.includes("sangban")) {
    if (isBell) {
      if (instrument.includes("3")) return SANGBAN_BELL_2_SVG;
      if (instrument.includes("4")) return SANGBAN_BELL_3_SVG;
      return SANGBAN_BELL_1_SVG;
    } else {
      if (instrument.includes("3")) return SANGBAN_2_SVG;
      if (instrument.includes("4")) return SANGBAN_3_SVG;
      return SANGBAN_1_SVG;
    }
  }
  if (instrument && instrument.includes("dundunba")) {
    if (isBell) {
      if (instrument.includes("3")) return DUNDUNBA_BELL_2_SVG;
      if (instrument.includes("4")) return DUNDUNBA_BELL_3_SVG;
      return DUNDUNBA_BELL_1_SVG;
    } else {
      if (instrument.includes("3")) return DUNDUNBA_2_SVG;
      if (instrument.includes("4")) return DUNDUNBA_3_SVG;
      return DUNDUNBA_1_SVG;
    }
  }
}

function getInstrumentHSL(instrument, type, isCall) {
  let hsl = getInstrumentHSLRaw(instrument, type, isCall);
  if (document.body && document.body.classList.contains("light-theme")) {
    const parts = hsl.split(",").map(p => p.trim());
    if (parts.length === 3) {
      const h = parts[0];
      let s = parseFloat(parts[1]);
      let l = parseFloat(parts[2]);
      
      // Reduce saturation so it's less electric/neon (between 30% and 45%)
      s = Math.min(45, s * 0.45);
      
      // Reduce lightness so it's darker (between 15% and 25%)
      if (l > 50) {
        l = 18 + (l - 50) * 0.1; // e.g. 75% -> 20.5%
      } else {
        l = Math.max(15, l * 0.45); // e.g. 36% -> 16.2%
      }
      
      return `${h}, ${Math.round(s)}%, ${Math.round(l)}%`;
    }
  }
  return hsl;
}

function getInstrumentHSLRaw(instrument, type, isCall) {
  if (isCall) {
    return "35, 90%, 60%"; // warm gold / amber
  }
  if (type === "shekere" || instrument === "shekere") {
    return "45, 93%, 58%"; // yellow/gold
  }

  if (type === "djembe" || (instrument && instrument.startsWith("djembe"))) {
    // 7 colors for 7 groups (purple to red range, avoiding orange/yellow/blue/green, balanced for perceived brightness)
    const djembeColors = [
      "260, 95%, 58%", // djembe1: violet/purple
      "280, 95%, 58%", // djembe2: amethyst
      "300, 95%, 58%", // djembe3: magenta
      "320, 95%, 59%", // djembe4: deep pink/rose
      "340, 95%, 60%", // djembe5: crimson
      "360, 95%, 62%", // djembe6: ruby red
      "20, 95%, 65%"    // djembe7: bright red
    ];
    const idx = parseInt(instrument.replace("djembe", "")) - 1;
    if (idx >= 0 && idx < djembeColors.length) {
      return djembeColors[idx];
    }
    return "280, 95%, 64%"; // default djembe primary HSL (amethyst)
  }

  // Dunun or Bell: Unique HSL ranges for D/S/K and their bells, adjusted for perceived brightness
  if (instrument) {
    const isBell = type === "bell" || instrument.includes("bell");
    if (instrument.includes("kenkeni")) {
      if (isBell) {
        if (instrument.includes("3")) return "143, 64%, 36%"; // Bell 2 (Shifted +28 deg total, further desaturated)
        if (instrument.includes("4")) return "133, 55%, 38%"; // Bell 3 (Shifted +28 deg total, further desaturated)
        return "153, 58%, 37%"; // Bell 1 (Shifted +28 deg total, further desaturated)
      } else {
        if (instrument.includes("3")) return "158, 60%, 35%"; // Kenkeni 3 (Shifted +28 deg total, further desaturated)
        if (instrument.includes("4")) return "168, 62%, 34%"; // Kenkeni 4 (Shifted +28 deg total, further desaturated)
        return "148, 56%, 36%"; // Kenkeni 1 (Shifted +28 deg total, further desaturated)
      }
    }
    if (instrument.includes("sangban")) {
      if (isBell) {
        if (instrument.includes("3")) return "175, 90%, 42%"; // Bell 2 (Aqua)
        if (instrument.includes("4")) return "165, 92%, 43%"; // Bell 3 (Aqua)
        return "185, 88%, 41%"; // Bell 1 (Aqua)
      } else {
        if (instrument.includes("3")) return "190, 95%, 42%"; // Sangban 3 (Aqua)
        if (instrument.includes("4")) return "200, 95%, 44%"; // Sangban 4 (Aqua)
        return "180, 92%, 40%"; // Sangban 1 (Aqua)
      }
    }
    if (instrument.includes("dundunba")) {
      if (isBell) {
        if (instrument.includes("3")) return "212, 98%, 72%"; // Bell 2 (Vibrant blue, avoiding purple)
        if (instrument.includes("4")) return "204, 98%, 74%"; // Bell 3 (Vibrant blue, avoiding purple)
        return "218, 98%, 70%"; // Bell 1 (Vibrant blue, avoiding purple)
      } else {
        if (instrument.includes("3")) return "215, 98%, 75%"; // Dundunba 3 (Vibrant blue, avoiding purple)
        if (instrument.includes("4")) return "208, 98%, 76%"; // Dundunba 4 (Vibrant blue, avoiding purple)
        return "220, 98%, 68%"; // Dundunba 1 (Vibrant blue, avoiding purple)
      }
    }
  }
  return "175, 84%, 39%"; // default Dunun color (green-teal)
}

// Helper to strip roles in parentheses, colons, semicolons, and remove "drum" or "bell" case-insensitively
function cleanTrackName(name) {
  let cleaned = name;
  if (cleaned.includes("(")) {
    cleaned = cleaned.split("(")[0];
  }
  if (cleaned.includes(":")) {
    cleaned = cleaned.split(":")[0];
  }
  if (cleaned.includes(";")) {
    cleaned = cleaned.split(";")[0];
  }
  cleaned = cleaned.replace(/\b(drum|bell)\b/gi, "");
  return cleaned.replace(/\s+/g, " ").trim();
}

function getHitColor(type, hit, instrument = "") {
  if (instrument !== "") {
    const isBell = instrument.includes("bell");
    if (instrument.includes("kenkeni") || instrument.includes("sangban") || instrument.includes("dundunba")) {
      const hslString = getInstrumentHSL(instrument, type, false);
      if (isBell) {
        if (hit === "O" || hit === "X") return `hsl(${hslString})`;
        if (hit === "C") {
          const parts = hslString.split(",");
          const h = parts[0].trim();
          return `hsl(${h}, 20%, 43%)`;
        }
      } else {
        if (hit === "O") return `hsl(${hslString})`;
        if (hit === "C" || hit === "X") {
          const parts = hslString.split(",");
          const h = parts[0].trim();
          return `hsl(${h}, 20%, 39%)`;
        }
      }
    }
  }
  if (type === "djembe") {
    if (hit === "B") return "var(--color-bass)";
    if (hit === "T") return "var(--color-tone)";
    if (hit === "S") return "var(--color-slap)";
    if (hit === "M") return "var(--color-muffled)";
  } else if (type === "dunun") {
    if (hit === "O") return "var(--color-open)";
    if (hit === "C" || hit === "X") return "var(--color-mute)";
  } else if (type === "bell") {
    if (hit === "O" || hit === "X") return "var(--color-bell-open)";
    if (hit === "C") return "var(--color-bell-mute)";
  } else if (type === "shekere") {
    if (hit === "O") return "var(--color-shekere-open)";
    if (hit === "X") return "var(--color-shekere-tap)";
  }
  return "rgba(255,255,255,0.2)";
}


function getHitGlowColor(type, hit, instrument = "") {
  if (instrument !== "") {
    const isBell = instrument.includes("bell");
    if (instrument.includes("kenkeni") || instrument.includes("sangban") || instrument.includes("dundunba")) {
      const hslString = getInstrumentHSL(instrument, type, false);
      if (isBell) {
        if (hit === "O" || hit === "X") return `hsla(${hslString}, 0.25)`;
        if (hit === "C") {
          const parts = hslString.split(",");
          const h = parts[0].trim();
          return `hsla(${h}, 20%, 43%, 0.2)`;
        }
      } else {
        if (hit === "O") return `hsla(${hslString}, 0.25)`;
        if (hit === "C" || hit === "X") {
          const parts = hslString.split(",");
          const h = parts[0].trim();
          return `hsla(${h}, 20%, 39%, 0.2)`;
        }
      }
    }
  }
  if (type === "djembe") {
    if (hit === "B") return "var(--color-bass-glow)";
    if (hit === "T") return "var(--color-tone-glow)";
    if (hit === "S") return "var(--color-slap-glow)";
    if (hit === "M") return "var(--color-muffled-glow)";
  } else if (type === "dunun") {
    if (hit === "O") return "var(--color-open-glow)";
    if (hit === "C" || hit === "X") return "var(--color-mute-glow)";
  } else if (type === "bell") {
    if (hit === "O" || hit === "X") return "var(--color-bell-open-glow)";
    if (hit === "C") return "var(--color-bell-mute-glow)";
  } else if (type === "shekere") {
    if (hit === "O") return "var(--color-shekere-open-glow)";
    if (hit === "X") return "var(--color-shekere-tap-glow)";
  }
  return "rgba(255,255,255,0.1)";
}

// True when the icon-based "Studio" theme is active (new default theme)
function isIconTheme() {
  return document.body.classList.contains("theme-studio");
}

// Apply the persisted theme class immediately so the very first render is themed
(function () {
  try {
    const saved = localStorage.getItem("djembe-theme");
    const name = (saved === "light" || saved === "tinted") ? saved : ((saved === "classic" || saved === "dark") ? "classic" : "studio");
    document.body.classList.toggle("theme-studio", name === "studio" || name === "tinted" || name === "light");
    document.body.classList.toggle("theme-tinted", name === "tinted");
    document.body.classList.toggle("light-theme", name === "light");
  } catch (e) { }
})();

// --- Performance mode -------------------------------------------------------
// Older/slower phones get a "lite" rendering path: solid backdrops instead of
// backdrop-filter blur, and a per-step playhead glide (CSS transition on the
// compositor) instead of per-frame JS updates.
let perfLite = false;

function setPerfMode(lite) {
  perfLite = !!lite;
  document.body.classList.toggle("perf-lite", perfLite);
}

// Initial immediate hardware & config check (benchmark will run during loading)
(function detectPerfMode() {
  try {
    const forced = localStorage.getItem("djembe-perf");
    if (forced === "lite") { setPerfMode(true); return; }
    if (forced === "full") { setPerfMode(false); return; }

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const mem = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Slower phones (memory <= 4GB or cores <= 6) default to performance mode immediately
    if (reduced || mem <= 2 || cores <= 3 || (isMobile && (mem <= 4 || cores <= 6))) {
      setPerfMode(true);
      return;
    }
  } catch (e) { }
})();

// Active benchmark run in requestAnimationFrame loop during loading screen
function runLoadingBenchmark() {
  return new Promise((resolve) => {
    // If already forced, skip active benchmarking
    const forced = localStorage.getItem("djembe-perf");
    if (forced === "lite" || forced === "full") {
      resolve();
      return;
    }
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const mem = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || mem <= 2 || cores <= 3 || (isMobile && (mem <= 4 || cores <= 6))) {
      resolve();
      return;
    }

    const times = [];
    let last = performance.now();
    let frameCount = 0;
    
    function probe(now) {
      const delta = now - last;
      last = now;
      
      // Skip first 5 frames to ignore startup/parsing jank
      if (frameCount >= 5) {
        times.push(delta);
      }
      frameCount++;
      
      // Calibrated workload: 100k loop of math calculations
      let dummy = 0;
      for (let i = 0; i < 100000; i++) {
        dummy += Math.sin(i) * Math.cos(i);
      }
      
      // Trigger DOM layout queries to simulate render engine stress
      const testDiv = document.createElement("div");
      testDiv.style.cssText = "position:absolute;width:10px;height:10px;overflow:hidden;visibility:hidden;";
      testDiv.innerHTML = "<span>test</span>";
      document.body.appendChild(testDiv);
      const h = testDiv.offsetHeight; // force layout calculation
      document.body.removeChild(testDiv);
      
      if (frameCount < 45) {
        requestAnimationFrame(probe);
      } else {
        times.sort((a, b) => a - b);
        const median = times[Math.floor(times.length / 2)];
        const threshold = isMobile ? 21.0 : 22.0;
        
        console.log(`Pre-playback benchmark median: ${median.toFixed(1)}ms`);
        if (median > threshold) {
          setPerfMode(true);
          console.log(`Pre-playback benchmark triggered perf-lite. Median frame time: ${median.toFixed(1)}ms`);
        } else {
          setPerfMode(false);
          console.log(`Pre-playback benchmark passed. Median frame time: ${median.toFixed(1)}ms`);
        }
        resolve();
      }
    }
    requestAnimationFrame(probe);
  });
}

// Playhead width caches go stale on rotation/resize
window.addEventListener("resize", () => {
  (cachedStepContainers || []).forEach(c => { c._phWidth = null; });
});

// Compact note layout: phones (and the demo device frame) get larger, edge-to-edge
// step boxes; desktop keeps the spacious layout.
(function setupCompactNotes() {
  function update() {
    const compact = !!document.querySelector(".demo-device-frame") || window.innerWidth < 900;
    document.body.classList.toggle("compact-notes", compact);
  }
  update();
  window.addEventListener("resize", update);
})();



// Helper to return clean visual SVGs for different sound strikes
function getSoundIcon(track, val, useOriginalIcons = false) {
  if (!val) return "";

  const trackType = typeof track === "string" ? track : track.type;
  const instrument = (track && track.instrument) ? track.instrument : "";
  const studio = isIconTheme();

  if (val.includes("/")) {
    const [h1, h2] = val.split("/");
    if (studio) {
      // Flam: grace-note icon sits slightly above and behind the dominant main icon
      return `<span class="studio-flam"><span class="studio-grace">${getSoundIcon(track, h1)}</span><span class="studio-main">${getSoundIcon(track, h2)}</span></span>`;
    }
    let c1, c2;
    if (trackType === "djembe") {
      c1 = h1 === "B" ? "#3b82f6" : (h1 === "T" ? "#eab308" : (h1 === "S" ? "#ef4444" : "#a855f7"));
      c2 = h2 === "B" ? "#3b82f6" : (h2 === "T" ? "#f59e0b" : (h2 === "S" ? "#ef4444" : "#a855f7"));
    } else {
      c1 = getHitColor(trackType, h1, instrument);
      c2 = getHitColor(trackType, h2, instrument);
    }
    return `
      <div class="flam-note-container">
        <div class="flam-grace-note sub-note-square" style="background: ${c1} !important;"></div>
        <div class="flam-main-note sub-note-square" style="background: ${c2} !important;"></div>
      </div>
    `;
  }

  if (val.includes("-")) {
    const [h1, h2] = val.split("-");
    if (studio) {
      // Roll: two equal icons side by side in playing order
      return `<span class="studio-roll"><span>${getSoundIcon(track, h1)}</span><span>${getSoundIcon(track, h2)}</span></span>`;
    }
    const c1 = getHitColor(trackType, h1, instrument);
    const c2 = getHitColor(trackType, h2, instrument);
    const icon1 = getSoundIcon(track, h1, true);
    const icon2 = getSoundIcon(track, h2, true);
    if (useOriginalIcons) {
      return `
        <div class="roll-note-container">
          <div class="roll-first-note" style="color: ${c1} !important;">${icon1}</div>
          <div class="roll-second-note" style="color: ${c2} !important;">${icon2}</div>
        </div>
      `;
    } else {
      return `
        <div class="roll-note-container">
          <div class="roll-first-note sub-note-square" style="background: ${c1} !important; border-color: ${c1} !important;">${icon1}</div>
          <div class="roll-second-note sub-note-square" style="background: ${c2} !important; border-color: ${c2} !important;">${icon2}</div>
        </div>
      `;
    }
  }

  if (val.includes("*")) {
    const [h1, h2, h3] = val.split("*");
    if (studio) {
      // Triplet: three icons across with a small "3" badge
      return `<span class="studio-triplet"><span class="studio-badge3">3</span><span>${getSoundIcon(track, h1)}</span><span>${getSoundIcon(track, h2)}</span><span>${getSoundIcon(track, h3)}</span></span>`;
    }
    const c1 = getHitColor(trackType, h1, instrument);
    const c2 = getHitColor(trackType, h2, instrument);
    const c3 = getHitColor(trackType, h3, instrument);
    const icon1 = getSoundIcon(track, h1, true);
    const icon2 = getSoundIcon(track, h2, true);
    const icon3 = getSoundIcon(track, h3, true);
    if (useOriginalIcons) {
      return `
        <div class="triplet-note-container">
          <span class="triplet-badge">3</span>
          <div class="triplet-sub-note" style="color: ${c1} !important;">${icon1}</div>
          <div class="triplet-sub-note" style="color: ${c2} !important;">${icon2}</div>
          <div class="triplet-sub-note" style="color: ${c3} !important;">${icon3}</div>
        </div>
      `;
    } else {
      return `
        <div class="triplet-note-container">
          <span class="triplet-badge">3</span>
          <div class="triplet-first-note sub-note-square" style="background: ${c1} !important; border-color: ${c1} !important;">${icon1}</div>
          <div class="triplet-second-note sub-note-square" style="background: ${c2} !important; border-color: ${c2} !important;">${icon2}</div>
          <div class="triplet-third-note sub-note-square" style="background: ${c3} !important; border-color: ${c3} !important;">${icon3}</div>
        </div>
      `;
    }
  }

  if (trackType === "djembe") {
    if (val === "B") { // Bass: capital letter B
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 4h8a4 4 0 0 1 0 8H6v-8zm0 8h9a4 4 0 0 1 0 8H6v-8z" />
      </svg>`;
    }
    if (val === "T") { // Tone: solid dot
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="8" />
      </svg>`;
    }
    if (val === "S") { // Slap: X icon
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>`;
    }
    if (val === "M") { // Muffled Slap: down arrow
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="4" x2="12" y2="20" />
        <polyline points="5 13 12 20 19 13" />
      </svg>`;
    }
  }

  if (trackType === "dunun") {
    if (studio) {
      // Studio: same colour for open/closed — filled square = open, outlined = closed
      const isClosed = (val === "C" || val === "X");
      return isClosed
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><rect x="4.5" y="4.5" width="15" height="15" rx="2.5" /></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /></svg>`;
    }
    const isMuffled = (val === "C" || val === "X");
    const strokeWidth = "2.5";
    const xOverlay = isMuffled ? `
      <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
    ` : "";

    if (instrument.includes("dundunba")) {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fill-opacity="0.15" />
        <ellipse cx="3" cy="12" rx="1.5" ry="7" />
        <ellipse cx="21" cy="12" rx="1.5" ry="7" />
        <path d="M3 5h18M3 19h18" />
        <path d="M3 5l4.5 14 4.5-14 4.5 14 4.5-14" stroke-width="1.2" stroke-dasharray="1 1" />
        ${xOverlay}
      </svg>`;
    } else if (instrument.includes("sangban")) {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="6" width="14" height="12" rx="2" fill="currentColor" fill-opacity="0.15" />
        <ellipse cx="5" cy="12" rx="1.5" ry="6" />
        <ellipse cx="19" cy="12" rx="1.5" ry="6" />
        <path d="M5 6h14M5 18h14" />
        <path d="M5 6l3.5 12 3.5-12 3.5 12 3.5-12" stroke-width="1.2" stroke-dasharray="1 1" />
        ${xOverlay}
      </svg>`;
    } else {
      // Default to kenkeni
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" fill-opacity="0.15" />
        <ellipse cx="7" cy="12" rx="1.2" ry="5" />
        <ellipse cx="17" cy="12" rx="1.2" ry="5" />
        <path d="M7 7h10M7 17h10" />
        <path d="M7 7l2.5 10 2.5-10 2.5 10 2.5-10" stroke-width="1.2" stroke-dasharray="1 1" />
        ${xOverlay}
      </svg>`;
    }
  }

  if (trackType === "bell") {
    if (studio) {
      // Studio: triangles — filled = open, outlined = muted
      const isClosed = (val === "C");
      return isClosed
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M12 4.5 L20.5 19.5 H3.5 Z" /></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5 L21.5 20 H2.5 Z" /></svg>`;
    }
    const isMuffled = (val === "C");
    const strokeWidth = "2.5";
    const fillOpacity = isMuffled ? "0" : "0.4";
    const xOverlay = isMuffled ? `
      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    ` : "";

    if (instrument.includes("dundunba")) {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v2.5h5V4.5A2.5 2.5 0 0 0 12 2z" />
        <path d="M9.5 7 L5 19 A7 2 0 0 0 19 19 L14.5 7 Z" fill="currentColor" fill-opacity="${fillOpacity}" />
        <ellipse cx="12" cy="19" rx="7" ry="2" />
        <line x1="12" y1="7" x2="12" y2="17" stroke-width="1.5" />
        <path d="M8.2 12c2.5 1.2 5.1 1.2 7.6 0" stroke-width="1.2" />
        <path d="M6.5 16c3.6 1.5 7.4 1.5 11 0" stroke-width="1.2" />
        ${xOverlay}
      </svg>`;
    } else if (instrument.includes("sangban")) {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a2 2 0 0 0-2 2v2h4V4a2 2 0 0 0-2-2z" />
        <path d="M10 8 L6 18 A6 1.8 0 0 0 18 18 L14 8 Z" fill="currentColor" fill-opacity="${fillOpacity}" />
        <ellipse cx="12" cy="18" rx="6" ry="1.8" />
        <line x1="12" y1="8" x2="12" y2="16.2" stroke-width="1.5" />
        <path d="M8.5 13c2.3 1 4.7 1 7 0" stroke-width="1" stroke-dasharray="1 1" />
        ${xOverlay}
      </svg>`;
    } else {
      // Default to kenkeni bell
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a2 2 0 0 0-2 2v1h4V5a2 2 0 0 0-2-2z" />
        <path d="M10 6 L7 17 A5 1.5 0 0 0 17 17 L14 6 Z" fill="currentColor" fill-opacity="${fillOpacity}" />
        <ellipse cx="12" cy="17" rx="5" ry="1.5" />
        <line x1="12" y1="6" x2="12" y2="15.5" stroke-width="1.5" stroke-dasharray="1 2" />
        ${xOverlay}
      </svg>`;
    }
  }

  if (trackType === "shekere") {
    if (val === "O") { // Shake
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M6 8a4 4 0 0 1 12 0c0 4-4 6-4 10a2 2 0 0 1-4 0c0-4-4-6-4-10z" fill="currentColor" fill-opacity="0.1" />
        <circle cx="12" cy="8" r="1.5" fill="currentColor" />
        <circle cx="9" cy="11" r="1.5" fill="currentColor" />
        <circle cx="15" cy="11" r="1.5" fill="currentColor" />
      </svg>`;
    }
    if (val === "X") { // Gourd Tap
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <circle cx="12" cy="12" r="8" fill="currentColor" fill-opacity="0.2" />
        <path d="M12 8v8M8 12h8" />
      </svg>`;
    }
  }

  return val;
}

// Cached DOM references, rebuilt on each renderGrid() — avoids per-frame/per-note querySelector calls
let cachedStepContainers = [];
const cellCache = new Map();

function getCachedCell(trackId, stepIdx) {
  return cellCache.get(trackId + ":" + stepIdx) ||
    document.querySelector(`.step-cell[data-track-id="${trackId}"][data-step-index="${stepIdx}"]`);
}

// Timing Variables
let timerId = null;
let nextTickToSchedule = 0; // Tick index (1 beat = 12 ticks)
let nextTickTime = 0.0;     // Time in seconds when the next tick is due
let playbackStartTime = 0.0; // Absolute start time of playback
const lookahead = 0.1;      // Look-ahead window (100ms)
const scheduleInterval = 25; // Interval for setInterval (25ms)

// DOM Elements
const btnPlay = document.getElementById("btn-play");
const bpmRange = document.getElementById("bpm-range");
const bpmVal = document.getElementById("bpm-val");
const swingRange = document.getElementById("swing-range");
const swingVal = document.getElementById("swing-val");
const humaniseRange = document.getElementById("humanise-range");
const humaniseVal = document.getElementById("humanise-val");
const btnCustomHumanise = document.getElementById("btn-custom-humanise");
const customHumaniseModal = document.getElementById("custom-humanise-modal");
const humaniseBtnClose = document.getElementById("humanise-btn-close");
const humaniseTimeRange = document.getElementById("humanise-time-range");
const humaniseTimeVal = document.getElementById("humanise-time-val");
const humanisePitchRange = document.getElementById("humanise-pitch-range");
const humanisePitchVal = document.getElementById("humanise-pitch-val");
const humaniseVolumeRange = document.getElementById("humanise-volume-range");
const humaniseVolumeVal = document.getElementById("humanise-volume-val");
const globalSubdivisionSelect = document.getElementById("global-subdivision");
const presetSelect = document.getElementById("preset-select");
const rhythmNameDisplay = document.getElementById("current-rhythm-name");
const btnClear = document.getElementById("btn-clear");
const btnRandom = document.getElementById("btn-random");
const btnAddDjembe = document.getElementById("btn-add-djembe");
const btnAddKenkeni = document.getElementById("btn-add-kenkeni");
const btnAddSangban = document.getElementById("btn-add-sangban");
const btnAddDundunba = document.getElementById("btn-add-dundunba");
const btnMixer = document.getElementById("btn-mixer");
const mixerModal = document.getElementById("mixer-modal");
const mixerBtnClose = document.getElementById("mixer-btn-close");
const btnVolMixer = document.getElementById("btn-vol-mixer");
const volMixerModal = document.getElementById("vol-mixer-modal");
const volMixerBtnClose = document.getElementById("vol-mixer-btn-close");
const btnCustomSwing = document.getElementById("btn-custom-swing");
const customSwingModal = document.getElementById("custom-swing-modal");
const swingBtnClose = document.getElementById("swing-btn-close");
const swingBtnReset = document.getElementById("swing-btn-reset");
const swingSlidersContainer = document.getElementById("swing-sliders-container");
const swingTimelineDots = document.getElementById("swing-timeline-dots");
const sequencerGrid = document.getElementById("sequencer-grid");
const solosControlRow = document.getElementById("solos-control-row");
const solosButtonsContainer = document.getElementById("solos-buttons-container");
const breaksControlRow = document.getElementById("breaks-control-row");
const breaksButtonsContainer = document.getElementById("breaks-buttons-container");
const notationText = document.getElementById("notation-text");
const saveNameInput = document.getElementById("save-name");
const btnSave = document.getElementById("btn-save");
const savesList = document.getElementById("saves-list");
const btnEffects = document.getElementById("btn-effects");
const effectsModal = document.getElementById("effects-modal");
const effectsBtnClose = document.getElementById("effects-btn-close");
const btnSaveSlotTop = document.getElementById("btn-save-slot-top");
const savesModal = document.getElementById("saves-modal");
const savesBtnClose = document.getElementById("saves-btn-close");


// Modal Elements
const btnNewRhythm = document.getElementById("btn-new-rhythm");
const newRhythmModal = document.getElementById("new-rhythm-modal");
const modalBtnCancel = document.getElementById("modal-btn-cancel");
const modalBtnCreate = document.getElementById("modal-btn-create");
const newRhythmName = document.getElementById("new-rhythm-name");
const newTimeSignature = document.getElementById("new-time-signature");
const newSubdivision = document.getElementById("new-subdivision");

// Library Modal Elements
const btnBrowseLibrary = document.getElementById("btn-browse-library");
const libraryModal = document.getElementById("library-modal");
const libraryBtnClose = document.getElementById("library-btn-close");
const librarySearch = document.getElementById("library-search");
const libraryFilterSig = document.getElementById("library-filter-sig");
const libraryBody = document.getElementById("library-body");
const libraryCount = document.getElementById("library-count");

// Description Modal Elements
const descriptionModal = document.getElementById("description-modal");
const descriptionModalHeader = document.getElementById("description-modal-header");
const descriptionModalBody = document.getElementById("description-modal-body");
const descriptionModalClose = document.getElementById("description-modal-close");
const descriptionModalEdit = document.getElementById("description-modal-edit");
const descriptionModalEditBtn = document.getElementById("description-modal-edit-btn");

// Live Pads Map to DOM
const drumPads = document.querySelectorAll(".drum-pad");

// Keyboard key mapping for live drumming
const KEY_MAP = {
  'a': { inst: 'djembe', hit: 'B', padClass: 'djembe-bass-pad' },
  's': { inst: 'djembe', hit: 'T', padClass: 'djembe-tone-pad' },
  'd': { inst: 'djembe', hit: 'S', padClass: 'djembe-slap-pad' },
  'f': { inst: 'djembe', hit: 'M', padClass: 'djembe-muffled-pad' },
  'g': { inst: 'kenkeni', hit: 'O', padClass: 'dunun-pad' },
  'h': { inst: 'kenkeni_bell', hit: 'O', padClass: 'bell-pad' },
  'j': { inst: 'sangban', hit: 'O', padClass: 'dunun-pad' },
  'k': { inst: 'sangban_bell', hit: 'O', padClass: 'bell-pad' },
  'l': { inst: 'dundunba', hit: 'O', padClass: 'dunun-pad' },
  ';': { inst: 'dundunba_bell', hit: 'O', padClass: 'bell-pad' },
  'semicolon': { inst: 'dundunba_bell', hit: 'O', padClass: 'bell-pad' },
  'i': { inst: 'shekere', hit: 'O', padClass: 'shekere-shake-pad' },
  'o': { inst: 'shekere', hit: 'X', padClass: 'shekere-tap-pad' }
};

function getSubdivisionForTiming(timing) {
  if (timing === "12/8" || timing === "6/8") {
    return 6;
  }
  return 4;
}

function convertPatternToSteps(pattern, timing, partName) {
  const isDjembe = partName.toLowerCase().includes("djembe") || partName.toLowerCase().includes("djembé");
  return pattern.split('').map(char => {
    if (char === '.') return '';
    if (char === 'S') return 'S';
    if (char === 'T') return 'T';
    if (char === 'B') return 'B';
    if (char === 'O') return 'O';
    if (char === 'C') return 'C';
    if (char === 'X') return 'X';
    if (char === 'x') return 'C'; // play closed/mute bell
    if (char === 'f') return isDjembe ? 'S/S' : 'O/O'; // standard flam
    if (char === 'Y') return 'B/T'; // Bass + Tone flam
    if (char === 'W') return 'B/S'; // Bass + Slap flam
    if (char === 'Z') return isDjembe ? 'T*T*T' : 'O*O*O'; // triplet roll
    if (char === 'ß') return isDjembe ? 'S/S' : 'O/O'; // dynamic flam
    if (char === '3') return isDjembe ? 'T*T*T' : 'O*O*O'; // triplet marker
    return char;
  });
}

function mapHitToSound(hit, trackType) {
  if (!hit || hit === '.') return '';

  const isDjembe = trackType === 'djembe';
  const isBell = trackType === 'bell';
  const isDunun = trackType === 'dunun';
  const isShekere = trackType === 'shekere';

  switch (hit) {
    // Standard Hits
    case 'S': return 'S';
    case 'T': return 'T';
    case 'B': return 'B';
    case 'O': return 'O';
    case 'C': return 'C';
    case 'X': return isBell ? 'X' : 'O';
    case 'x': return isBell ? 'C' : 'C';
    case 'd':
      if (isDjembe) return 'M';
      if (isShekere) return 'X';
      return 'C';

    // Flams
    case 'f':
      if (isDjembe) return 'S/S';
      if (isBell) return 'X/X';
      return 'O/O';
    case 'fs': return 'S/S';
    case 'ft': return 'T/T';
    case 'fb': return 'B/B';
    case 'Y': return 'B/T';
    case 'W': return 'B/S';

    // Rolls & Triplets
    case '2':
      if (isDjembe) return 'S-S';
      if (isBell) return 'X-X';
      return 'O-O';
    case 'rs': return 'S-S';
    case 'rt': return 'T-T';
    case 'rb': return 'B-B';
    case 'ts': return 'S*S*S';

    default:
      return hit;
  }
}

function convertSpaceDelimitedPatternToSteps(pattern, trackType, stepCount) {
  if (!pattern || pattern === "Missing Data") {
    return Array(stepCount).fill("");
  }
  const tokens = pattern.trim().split(/\s+/);
  const steps = tokens.map(t => mapHitToSound(t, trackType));

  while (steps.length < stepCount) {
    steps.push("");
  }
  if (steps.length > stepCount) {
    return steps.slice(0, stepCount);
  }
  return steps;
}

function queueSpecialAction(action, btn) {
  if (state.isPlaying) {
    state.queuedActions = [];
    const containers = [
      document.getElementById("solos-buttons-container"),
      document.getElementById("breaks-buttons-container"),
      document.getElementById("variations-buttons-container"),
      document.getElementById("special-parts-buttons-container")
    ];
    containers.forEach(c => {
      if (c) {
        Array.from(c.children).forEach(child => {
          child.classList.remove("blinking");
        });
      }
    });
    if (btn) {
      btn.classList.add("blinking");
    }
    state.queuedActions.push(action);
  } else {
    action();
  }
}

function deactivateAllSpecialButtons() {
  state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
  state.callIntroActive = false;
  state.activeVariation = null;
  state.echPlaying = false;

  state.tracks.forEach(track => {
    if (track.standardSteps) {
      track.steps = [...track.standardSteps];
      track.subdivisionSteps[track.subdivision] = [...track.steps];
      delete track.standardSteps;
    }
    if (track.preSoloMutedState !== undefined) {
      track.muted = track.preSoloMutedState;
      delete track.preSoloMutedState;
    }
  });

  const containers = [
    document.getElementById("solos-buttons-container"),
    document.getElementById("breaks-buttons-container"),
    document.getElementById("variations-buttons-container"),
    document.getElementById("special-parts-buttons-container")
  ];

  containers.forEach(container => {
    if (!container) return;
    Array.from(container.children).forEach(btn => {
      btn.classList.remove("btn-primary", "special-active", "break-active", "blinking");

      const type = btn.dataset.type;
      if (type === 'intro') {
        btn.style.background = "rgba(59, 130, 246, 0.15)";
        btn.style.borderColor = "rgba(59, 130, 246, 0.35)";
      } else if (type === 'call') {
        btn.style.background = "rgba(99, 102, 241, 0.15)";
        btn.style.borderColor = "rgba(99, 102, 241, 0.35)";
      } else if (type === 'break') {
        btn.style.background = "rgba(245, 158, 11, 0.15)";
        btn.style.borderColor = "rgba(245, 158, 11, 0.35)";
      } else if (type === 'solo') {
        btn.style.background = "rgba(168, 85, 247, 0.15)";
        btn.style.borderColor = "rgba(168, 85, 247, 0.35)";
      } else if (type === 'variation') {
        btn.style.background = "rgba(16, 185, 129, 0.15)";
        btn.style.borderColor = "rgba(16, 185, 129, 0.35)";
      }
    });
  });
}

function handleSoloToggle(sp, isActive) {
  const isNewFormat = state.currentPreset && (state.currentPreset.step_count !== undefined || (state.currentPreset.tracks && !Array.isArray(state.currentPreset.tracks)));

  if (isNewFormat) {
    const link = sp.accompaniment_link;
    const djembeSubKeys = (state.currentPreset.tracks && state.currentPreset.tracks["1_djembe"]) ? Object.keys(state.currentPreset.tracks["1_djembe"]) : [];
    const isLinkMatched = djembeSubKeys.includes(link);

    if (isActive) {
      let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
      if (!soloTrack) {
        soloTrack = {
          id: "solo_djembe",
          name: sp.name || sp.part_id || "Solo Djembe",
          type: "djembe",
          instrument: "djembe1",
          volume: 0.85,
          pitch: 0,
          muted: false,
          soloed: false
        };
        state.tracks.push(soloTrack);
        sortTracks();
      } else {
        soloTrack.name = sp.name || sp.part_id || "Solo Djembe";
      }

      soloTrack.subdivision = getSubdivisionForTiming(state.timeSignature);
      const steps = convertSpaceDelimitedPatternToSteps(sp.sequence, "djembe", state.currentPreset.step_count);
      soloTrack.steps = steps;
      soloTrack.originalSteps = [...steps];
      soloTrack.originalSubdivision = soloTrack.subdivision;
      soloTrack.subdivisionSteps = {
        [soloTrack.subdivision]: [...steps]
      };

      state.tracks.forEach(track => {
        if (track.subKey) {
          if (isLinkMatched && track.subKey === link) {
            if (track.preSoloMutedState === undefined) {
              track.preSoloMutedState = track.muted;
            }
            track.muted = false;
          }
        }
      });
    } else {
      state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
      state.tracks.forEach(track => {
        if (track.preSoloMutedState !== undefined) {
          track.muted = track.preSoloMutedState;
          delete track.preSoloMutedState;
        }
      });
    }
  }
}

function playVariationPart(sp, isActive) {
  const isNewFormat = state.currentPreset && (state.currentPreset.step_count !== undefined || (state.currentPreset.tracks && !Array.isArray(state.currentPreset.tracks)));

  if (isNewFormat) {
    const partId = (sp.part_id || "").toLowerCase();
    const track = state.tracks.find(t => {
      const id = t.id.toLowerCase();

      if (partId.includes("sangban")) {
        return id.includes("sangban") && !id.includes("bell");
      }
      if (partId.includes("dundun") || partId.includes("dun_dun")) {
        return (id.includes("dundunba") || id.includes("dun_dun")) && !id.includes("bell");
      }
      if (partId.includes("kenkeni")) {
        return id.includes("kenkeni") && !id.includes("bell");
      }
      if (partId.includes("djembe")) {
        if (partId.includes("djembe_1") || partId.includes("djembe1")) {
          return id.includes("djembe") && (id.includes("1") || id.includes("preset_1"));
        }
        if (partId.includes("djembe_2") || partId.includes("djembe2")) {
          return id.includes("djembe") && (id.includes("2") || id.includes("preset_2"));
        }
        return id.includes("djembe");
      }
      return false;
    });

    if (track) {
      if (isActive) {
        if (!track.standardSteps) track.standardSteps = [...track.steps];
        track.steps = convertSpaceDelimitedPatternToSteps(sp.sequence, track.type, state.currentPreset.step_count);
        track.subdivisionSteps[track.subdivision] = [...track.steps];
      } else {
        if (track.standardSteps) {
          track.steps = [...track.standardSteps];
          track.subdivisionSteps[track.subdivision] = [...track.steps];
          delete track.standardSteps;
        }
      }
    }
  }
}

function getTrackHierarchyKey(track) {
  const id = track.id.toLowerCase();
  const name = track.name.toLowerCase();

  if (id.includes("djembe")) return "1_djembe";
  if (id.includes("kenkeni_bell")) return "3_kenkeni_bell";
  if (id.includes("kenkeni")) return "2_kenkeni";
  if (id.includes("sangban_bell")) return "5_sangban_bell";
  if (id.includes("sangban")) return "4_sangban";
  if (id.includes("dundunba_bell") || id.includes("dun_dun_bell")) return "7_dun_dun_bell";
  if (id.includes("dundunba") || id.includes("dun_dun")) return "6_dun_dun";
  if (id.includes("shekere")) return "8_shekere";

  if (name.includes("djembe") || name.includes("djembé")) return "1_djembe";
  if (name.includes("kenkeni bell")) return "3_kenkeni_bell";
  if (name.includes("kenkeni")) return "2_kenkeni";
  if (name.includes("sangban bell")) return "5_sangban_bell";
  if (name.includes("sangban")) return "4_sangban";
  if (name.includes("dun dun bell") || name.includes("dundun bell") || name.includes("dundunba bell")) return "7_dun_dun_bell";
  if (name.includes("dun dun") || name.includes("dundun") || name.includes("dundunba")) return "6_dun_dun";
  if (name.includes("shekere")) return "8_shekere";

  return null;
}

function loadRhythmNew(preset) {
  state.focusedTrackId = null;
  state.currentRhythmName = preset.rhythm_name || "Untitled Rhythm";
  updateRhythmNameDisplay();

  state.currentRhythmDescription = preset.description || "";
  state.currentPreset = preset;
  state.timeSignature = preset.timing || preset.time_signature || "12/8";

  const subdivision = getSubdivisionForTiming(state.timeSignature);
  state.globalSubdivision = subdivision;
  if (globalSubdivisionSelect) globalSubdivisionSelect.value = state.globalSubdivision;

  const isNewFormat = preset.step_count !== undefined || (preset.tracks && !Array.isArray(preset.tracks));
  const firstTrack = (!isNewFormat && preset.tracks && preset.tracks[0]);
  const patternLen = isNewFormat ? (preset.step_count || 16) : (firstTrack ? firstTrack.drum_pattern.length : 24);

  if (state.timeSignature === "12/8" || state.timeSignature === "6/8") {
    state.beats = 2; // 12 steps per line (2 beats of subdivision 6)
  } else {
    state.beats = 4; // 16 steps per line (4 beats of subdivision 4)
  }

  state.bpm = preset.tempo || 110;
  if (preset.groove_modifiers && preset.groove_modifiers.swing_factor !== undefined) {
    state.swing = preset.groove_modifiers.swing_factor;
  } else {
    state.swing = preset.swing || 0;
  }

  state.customSwingOffsets = {
    2: [0, 0],
    3: [0, 0, 0],
    4: [0, 0, 0, 0],
    6: [0, 0, 0, 0, 0, 0]
  };
  [2, 3, 4, 6].forEach(s => applyGlobalSwingToOffsets(s, state.swing));

  // Sync UI controls
  state.humaniseTime = 40;
  state.humanisePitch = 20;
  state.humaniseVolume = 40;
  synth.humanisePitch = 20;
  bpmRange.value = state.bpm;
  bpmVal.textContent = state.bpm;
  swingRange.value = state.swing;
  swingVal.textContent = state.swing + "%";
  humaniseRange.value = 33;
  humaniseVal.textContent = "33%";
  humaniseTimeRange.value = 40;
  humaniseTimeVal.textContent = "40%";
  humanisePitchRange.value = 20;
  humanisePitchVal.textContent = "20%";
  humaniseVolumeRange.value = 40;
  humaniseVolumeVal.textContent = "40%";

  state.tracks = [];
  state.customDjembeCount = 0;
  state.customKenkeniCount = 0;
  state.customSangbanCount = 0;
  state.customDundunbaCount = 0;
  state.customShekereCount = 0;
  state.echauffementActive = false;
  state.activeVariation = null;
  state.callIntroActive = false;

  // Extract and populate state.presetCallData from special_parts if type === "Call"
  const callPart = (preset.special_parts || []).find(sp => sp.type === "Call" || sp.type === "Intro");
  if (callPart) {
    const timing = preset.timing || preset.time_signature || "12/8";
    const timingSubdiv = getSubdivisionForTiming(timing);
    let steps;
    if (isNewFormat) {
      steps = convertSpaceDelimitedPatternToSteps(callPart.sequence, "djembe", patternLen);
    } else {
      steps = convertPatternToSteps(callPart.drum_pattern, timing, "Djembé");
    }
    state.presetCallData = {
      id: "special_call",
      name: callPart.name || callPart.part_id || "Call",
      steps: steps,
      subdivision: timingSubdiv
    };
  } else {
    state.presetCallData = null;
  }

  // Deactivate Échauffement button highlight
  const echBtn = document.getElementById("btn-trigger-echauffement");
  if (echBtn) echBtn.classList.remove("btn-primary");

  const solosContainer = document.getElementById("solos-buttons-container");
  const breaksContainer = document.getElementById("breaks-buttons-container");
  const variationsContainer = document.getElementById("variations-buttons-container");
  const specialContainer = document.getElementById("special-parts-buttons-container");

  if (solosContainer) solosContainer.innerHTML = "";
  if (breaksContainer) breaksContainer.innerHTML = "";
  if (variationsContainer) variationsContainer.innerHTML = "";
  if (specialContainer) specialContainer.innerHTML = "";

  const solosRow = document.getElementById("solos-control-row");
  const breaksRow = document.getElementById("breaks-control-row");
  const variationsRow = document.getElementById("variations-control-row");
  const specialRow = document.getElementById("special-parts-control-row");

  if (solosRow) solosRow.style.display = "none";
  if (breaksRow) breaksRow.style.display = "none";
  if (variationsRow) variationsRow.style.display = "none";
  if (specialRow) specialRow.style.display = "none";

  if (isNewFormat) {
    const tracksObj = preset.tracks || {};

    // 1. Djembé Tracks
    const djembeObj = tracksObj["1_djembe"] || {};
    let djembeCounter = 0;
    Object.keys(djembeObj).forEach(subKey => {
      djembeCounter++;
      const val = djembeObj[subKey];
      let isMuted = val === "Missing Data";
      if (subKey.includes("acc") || subKey.includes("accomp") || subKey.includes("solo")) {
        isMuted = true;
      }
      const steps = convertSpaceDelimitedPatternToSteps(val, "djembe", patternLen);
      const cleanName = formatTrackSubKeyName(subKey);

      state.tracks.push({
        id: `djembe_preset_${djembeCounter}`,
        subKey: subKey,
        name: cleanName,
        type: "djembe",
        instrument: `djembe${Math.min(5, djembeCounter)}`,
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.8,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    });

    // 2. Kenkeni
    const kenkeniVal = tracksObj["2_kenkeni"];
    if (kenkeniVal !== undefined) {
      const isMuted = kenkeniVal === "Missing Data";
      const steps = convertSpaceDelimitedPatternToSteps(kenkeniVal, "dunun", patternLen);
      state.tracks.push({
        id: "kenkeni_drum",
        subKey: "2_kenkeni",
        name: "Kenkeni",
        type: "dunun",
        instrument: "kenkeni",
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.8,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    }

    // 3. Kenkeni Bell
    const kenkeniBellVal = tracksObj["3_kenkeni_bell"];
    if (kenkeniBellVal !== undefined) {
      const isMuted = kenkeniBellVal === "Missing Data";
      const steps = convertSpaceDelimitedPatternToSteps(kenkeniBellVal, "bell", patternLen);
      state.tracks.push({
        id: "kenkeni_bell",
        subKey: "3_kenkeni_bell",
        name: "Kenkeni Bell",
        type: "bell",
        instrument: "kenkeni_bell",
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.7,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    }

    // 4. Sangban
    const sangbanVal = tracksObj["4_sangban"];
    if (sangbanVal !== undefined) {
      const isMuted = sangbanVal === "Missing Data";
      const steps = convertSpaceDelimitedPatternToSteps(sangbanVal, "dunun", patternLen);
      state.tracks.push({
        id: "sangban_drum",
        subKey: "4_sangban",
        name: "Sangban",
        type: "dunun",
        instrument: "sangban",
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.8,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    }

    // 5. Sangban Bell
    const sangbanBellVal = tracksObj["5_sangban_bell"];
    if (sangbanBellVal !== undefined) {
      const isMuted = sangbanBellVal === "Missing Data";
      const steps = convertSpaceDelimitedPatternToSteps(sangbanBellVal, "bell", patternLen);
      state.tracks.push({
        id: "sangban_bell",
        subKey: "5_sangban_bell",
        name: "Sangban Bell",
        type: "bell",
        instrument: "sangban_bell",
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.7,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    }

    // 6. Dun Dun
    const dundunVal = tracksObj["6_dun_dun"];
    if (dundunVal !== undefined) {
      const isMuted = dundunVal === "Missing Data";
      const steps = convertSpaceDelimitedPatternToSteps(dundunVal, "dunun", patternLen);
      state.tracks.push({
        id: "dundunba_drum",
        subKey: "6_dun_dun",
        name: "Dun Dun",
        type: "dunun",
        instrument: "dundunba",
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.8,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    }

    // 7. Dun Dun Bell
    const dundunBellVal = tracksObj["7_dun_dun_bell"];
    if (dundunBellVal !== undefined) {
      const isMuted = dundunBellVal === "Missing Data";
      const steps = convertSpaceDelimitedPatternToSteps(dundunBellVal, "bell", patternLen);
      state.tracks.push({
        id: "dundunba_bell",
        subKey: "7_dun_dun_bell",
        name: "Dun Dun Bell",
        type: "bell",
        instrument: "dundunba_bell",
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.7,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    }

    // 8. Shekere
    const shekereVal = tracksObj["8_shekere"];
    if (shekereVal !== undefined) {
      const isMuted = shekereVal === "Missing Data";
      const steps = convertSpaceDelimitedPatternToSteps(shekereVal, "shekere", patternLen);
      state.tracks.push({
        id: "shekere_default",
        subKey: "8_shekere",
        name: "Shekere",
        type: "shekere",
        instrument: "shekere",
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.75,
        pitch: 0,
        muted: isMuted,
        soloed: false
      });
    }

    // UI elements generation
    const ui = preset.ui_elements || {};

    // 1. Solos
    const soloIds = Array.isArray(ui.solo_button) ? ui.solo_button : (ui.solo_button && ui.solo_button !== "Missing Data" ? [ui.solo_button] : []);
    if (soloIds.length > 0 && solosContainer && solosRow) {
      solosRow.style.display = "flex";
      soloIds.forEach((id, idx) => {
        const sp = (preset.special_parts || []).find(p => p.part_id === id || p.name === id);
        if (sp) {
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.dataset.type = "solo";
          btn.textContent = idx + 1;
          btn.title = sp.name || sp.part_id;
          btn.style.minWidth = "28px";
          btn.style.height = "28px";
          btn.style.display = "flex";
          btn.style.alignItems = "center";
          btn.style.justifyContent = "center";
          btn.style.fontWeight = "bold";
          btn.style.borderRadius = "6px";
          btn.style.fontSize = "0.75rem";
          btn.style.padding = "0";
          btn.style.flex = "0 0 28px";
          btn.style.cursor = "pointer";

          btn.style.background = "rgba(168, 85, 247, 0.15)";
          btn.style.border = "1px solid rgba(168, 85, 247, 0.35)";
          btn.style.color = "#a855f7";

          btn.addEventListener("click", () => {
            const wasActive = btn.classList.contains("btn-primary") || btn.classList.contains("special-active");
            const action = () => {
              deactivateAllSpecialButtons();
              if (!wasActive) {
                btn.classList.add("btn-primary", "special-active");
                btn.style.background = "";
                btn.style.borderColor = "";
                handleSoloToggle(sp, true);
              } else {
                handleSoloToggle(sp, false);
              }
              renderGrid();
            };

            if (state.isPlaying) {
              queueSpecialAction(action, btn);
            } else {
              action();
              if (!wasActive) {
                togglePlay();
              }
            }
          });
          solosContainer.appendChild(btn);
        }
      });
    }

    // 2. Variations
    const varIds = Array.isArray(ui.variation_button) ? ui.variation_button : (ui.variation_button && ui.variation_button !== "Missing Data" ? [ui.variation_button] : []);
    if (varIds.length > 0 && variationsContainer && variationsRow) {
      variationsRow.style.display = "flex";
      varIds.forEach((id) => {
        const sp = (preset.special_parts || []).find(p => p.part_id === id || p.name === id);
        if (sp) {
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.dataset.type = "variation";
          let btnText = sp.name || sp.part_id;
          btnText = btnText.replace(/_JSON/i, '').replace(/_PDF/i, '').replace(/_/g, ' ');
          btn.textContent = btnText;
          btn.title = sp.name || sp.part_id;
          btn.style.fontWeight = "bold";
          btn.style.borderRadius = "8px";
          btn.style.fontSize = "0.8rem";
          btn.style.padding = "0.35rem 0.75rem";
          btn.style.cursor = "pointer";

          btn.style.background = "rgba(16, 185, 129, 0.15)";
          btn.style.border = "1px solid rgba(16, 185, 129, 0.35)";
          btn.style.color = "#10b981";

          btn.addEventListener("click", () => {
            const wasActive = btn.classList.contains("btn-primary") || btn.classList.contains("special-active");
            const action = () => {
              deactivateAllSpecialButtons();
              if (!wasActive) {
                btn.classList.add("btn-primary", "special-active");
                btn.style.background = "";
                btn.style.borderColor = "";
                playVariationPart(sp, true);
              } else {
                playVariationPart(sp, false);
              }
              renderGrid();
            };

            if (state.isPlaying) {
              queueSpecialAction(action, btn);
            } else {
              action();
            }
          });
          variationsContainer.appendChild(btn);
        }
      });
    }

    // 3. Breaks
    const breakIds = Array.isArray(ui.break_button) ? ui.break_button : (ui.break_button && ui.break_button !== "Missing Data" ? [ui.break_button] : []);
    if (breakIds.length > 0 && breaksContainer && breaksRow) {
      breaksRow.style.display = "flex";
      breakIds.forEach((id) => {
        const sp = (preset.special_parts || []).find(p => p.part_id === id || p.name === id);
        if (sp) {
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.dataset.type = "break";
          let btnText = sp.name || sp.part_id;
          btnText = btnText.replace(/_JSON/i, '').replace(/_PDF/i, '').replace(/_/g, ' ');
          btn.textContent = btnText;
          btn.title = sp.name || sp.part_id;
          btn.style.fontWeight = "bold";
          btn.style.borderRadius = "8px";
          btn.style.fontSize = "0.8rem";
          btn.style.padding = "0.35rem 0.75rem";
          btn.style.cursor = "pointer";

          btn.style.background = "rgba(245, 158, 11, 0.15)";
          btn.style.border = "1px solid rgba(245, 158, 11, 0.35)";
          btn.style.color = "#f59e0b";

          btn.addEventListener("click", () => {
            const wasActive = btn.classList.contains("btn-primary") || btn.classList.contains("special-active");
            const action = () => {
              deactivateAllSpecialButtons();
              if (!wasActive) {
                btn.classList.add("btn-primary", "special-active");
                btn.style.background = "";
                btn.style.borderColor = "";
                playSpecialPart(sp);
              } else {
                state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
                state.callIntroActive = false;
                renderGrid();
              }
            };

            if (state.isPlaying) {
              queueSpecialAction(action, btn);
            } else {
              action();
            }
          });
          breaksContainer.appendChild(btn);
        }
      });
    }

    // 4. Calls & Intros
    const callIds = Array.isArray(ui.call_button) ? ui.call_button : (ui.call_button && ui.call_button !== "Missing Data" ? [ui.call_button] : []);
    const introIds = Array.isArray(ui.intro_button) ? ui.intro_button : (ui.intro_button && ui.intro_button !== "Missing Data" ? [ui.intro_button] : []);
    const specialPartIds = [...callIds, ...introIds];

    if (specialPartIds.length > 0 && specialContainer && specialRow) {
      specialRow.style.display = "flex";
      specialPartIds.forEach((id) => {
        const sp = (preset.special_parts || []).find(p => p.part_id === id || p.name === id);
        if (sp) {
          const btn = document.createElement("button");
          btn.className = "btn";
          const isCall = callIds.includes(id);
          btn.dataset.type = isCall ? "call" : "intro";
          let btnText = sp.name || sp.part_id;
          btnText = btnText.replace(/_JSON/i, '').replace(/_PDF/i, '').replace(/_/g, ' ');
          btn.textContent = btnText;
          btn.title = sp.name || sp.part_id;
          btn.style.fontWeight = "bold";
          btn.style.borderRadius = "8px";
          btn.style.fontSize = "0.8rem";
          btn.style.padding = "0.35rem 0.75rem";
          btn.style.cursor = "pointer";

          if (isCall) {
            btn.style.background = "rgba(99, 102, 241, 0.15)";
            btn.style.border = "1px solid rgba(99, 102, 241, 0.35)";
            btn.style.color = "var(--primary)";
          } else {
            btn.style.background = "rgba(59, 130, 246, 0.15)";
            btn.style.border = "1px solid rgba(59, 130, 246, 0.35)";
            btn.style.color = "#3b82f6";
          }

          btn.addEventListener("click", () => {
            const wasActive = btn.classList.contains("btn-primary") || btn.classList.contains("special-active");
            const action = () => {
              deactivateAllSpecialButtons();
              if (!wasActive) {
                btn.classList.add("btn-primary", "special-active");
                btn.style.background = "";
                btn.style.borderColor = "";
                playSpecialPart(sp);
              } else {
                state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
                state.callIntroActive = false;
                renderGrid();
              }
            };

            if (state.isPlaying) {
              queueSpecialAction(action, btn);
            } else {
              action();
            }
          });
          specialContainer.appendChild(btn);
        }
      });
    }
  } else {
    // Map and sort tracks in strict hierarchy
    const sortedPresetTracks = [];

    // 1. Djembe
    preset.tracks.forEach(pt => {
      const partLC = pt.part.toLowerCase();
      if (partLC.includes("djembe") || partLC.includes("djembé")) {
        sortedPresetTracks.push(pt);
      }
    });

    // 2. Kenkeni
    const kenkeni = preset.tracks.find(pt => pt.part.toLowerCase() === "kenkeni");
    if (kenkeni) sortedPresetTracks.push(kenkeni);

    // 3. Kenkeni Bell
    const kenkeniBell = preset.tracks.find(pt => pt.part.toLowerCase() === "kenkeni bell");
    if (kenkeniBell) sortedPresetTracks.push(kenkeniBell);

    // 4. Sangban
    const sangban = preset.tracks.find(pt => pt.part.toLowerCase() === "sangban");
    if (sangban) sortedPresetTracks.push(sangban);

    // 5. Sangban Bell
    const sangbanBell = preset.tracks.find(pt => pt.part.toLowerCase() === "sangban bell");
    if (sangbanBell) sortedPresetTracks.push(sangbanBell);

    // 6. Dun Dun
    const dundun = preset.tracks.find(pt => pt.part.toLowerCase() === "dun dun" || pt.part.toLowerCase() === "dundun" || pt.part.toLowerCase() === "dundunba");
    if (dundun) sortedPresetTracks.push(dundun);

    // 7. Dun Dun Bell
    const dundunBell = preset.tracks.find(pt => pt.part.toLowerCase() === "dun dun bell" || pt.part.toLowerCase() === "dundun bell" || pt.part.toLowerCase() === "dundunba bell");
    if (dundunBell) sortedPresetTracks.push(dundunBell);

    // Create track objects
    let djembeCounter = 0;
    sortedPresetTracks.forEach(pt => {
      const partLC = pt.part.toLowerCase();
      let id, type, instrument, cleanName;
      if (partLC.includes("djembe") || partLC.includes("djembé")) {
        djembeCounter++;
        id = `djembe_preset_${djembeCounter}`;
        type = "djembe";
        instrument = `djembe${Math.min(5, djembeCounter)}`;
        cleanName = pt.part;
      } else if (partLC === "kenkeni") {
        id = "kenkeni_drum";
        type = "dunun";
        instrument = "kenkeni";
        cleanName = "Kenkeni";
      } else if (partLC === "kenkeni bell") {
        id = "kenkeni_bell";
        type = "bell";
        instrument = "kenkeni_bell";
        cleanName = "Kenkeni Bell";
      } else if (partLC === "sangban") {
        id = "sangban_drum";
        type = "dunun";
        instrument = "sangban";
        cleanName = "Sangban";
      } else if (partLC === "sangban bell") {
        id = "sangban_bell";
        type = "bell";
        instrument = "sangban_bell";
        cleanName = "Sangban Bell";
      } else if (partLC === "dun dun" || partLC === "dundun" || partLC === "dundunba") {
        id = "dundunba_drum";
        type = "dunun";
        instrument = "dundunba";
        cleanName = "Dun Dun";
      } else if (partLC === "dun dun bell" || partLC === "dundun bell" || partLC === "dundunba bell") {
        id = "dundunba_bell";
        type = "bell";
        instrument = "dundunba_bell";
        cleanName = "Dun Dun Bell";
      }

      const steps = convertPatternToSteps(pt.drum_pattern, state.timeSignature, pt.part);

      state.tracks.push({
        id: id,
        name: cleanName,
        type: type,
        instrument: instrument,
        subdivision: state.globalSubdivision,
        steps: steps,
        originalSteps: [...steps],
        originalSubdivision: state.globalSubdivision,
        subdivisionSteps: {
          [state.globalSubdivision]: [...steps]
        },
        volume: 0.8,
        pitch: 0,
        muted: false,
        soloed: false
      });
    });

    // Add default Shekere track
    const shekereSteps = Array(patternLen).fill("");
    const totalSubsteps = patternLen;
    for (let sec = 0; sec < 4; sec++) {
      const stepIdx = Math.round(sec * (totalSubsteps / 4)) % totalSubsteps;
      shekereSteps[stepIdx] = "O";
    }
    state.tracks.push({
      id: "shekere_default",
      name: "Shekere",
      type: "shekere",
      instrument: "shekere",
      subdivision: state.globalSubdivision,
      steps: shekereSteps,
      originalSteps: [...shekereSteps],
      originalSubdivision: state.globalSubdivision,
      subdivisionSteps: {
        [state.globalSubdivision]: [...shekereSteps]
      },
      volume: 0.75,
      pitch: 0,
      muted: false,
      soloed: false
    });

    // Populate Variations Row
    const hasVariations = preset.tracks.some(pt => pt.variations && pt.variations.length > 0);
    if (hasVariations && variationsRow && variationsContainer) {
      variationsRow.style.display = "flex";
      variationsContainer.innerHTML = "";

      const maxVars = Math.max(...preset.tracks.map(pt => (pt.variations || []).length));

      for (let i = 0; i < maxVars; i++) {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = `Variation ${i + 1}`;
        btn.style.fontWeight = "bold";
        btn.style.borderRadius = "8px";
        btn.style.padding = "0.35rem 0.75rem";
        btn.style.cursor = "pointer";

        btn.addEventListener("click", () => {
          const wasActive = btn.classList.contains("btn-primary");

          Array.from(variationsContainer.children).forEach(child => {
            child.classList.remove("btn-primary");
          });

          if (state.echauffementActive) {
            triggerEchauffement(); // toggle off
          }

          if (!wasActive) {
            btn.classList.add("btn-primary");
          }

          const action = () => {
            if (wasActive) {
              state.activeVariation = null;
              state.tracks.forEach(track => {
                if (track.standardSteps) {
                  track.steps = [...track.standardSteps];
                  track.subdivisionSteps[track.subdivision] = [...track.steps];
                  delete track.standardSteps;
                }
              });
            } else {
              state.activeVariation = i;

              state.tracks.forEach(track => {
                const presetTrack = state.currentPreset.tracks.find(pt => cleanTrackName(pt.part) === cleanTrackName(track.name));
                if (presetTrack) {
                  if (!track.standardSteps) track.standardSteps = [...track.steps];

                  if (presetTrack.variations && presetTrack.variations[i]) {
                    track.steps = convertPatternToSteps(presetTrack.variations[i].drum_pattern, state.timeSignature, track.name);
                  } else {
                    track.steps = [...track.standardSteps];
                  }
                  track.subdivisionSteps[track.subdivision] = [...track.steps];
                }
              });
            }
            renderGrid();
          };

          if (state.isPlaying) {
            state.queuedActions.push(action);
          } else {
            action();
          }
        });

        variationsContainer.appendChild(btn);
      }
    } else {
      if (variationsRow) variationsRow.style.display = "none";
    }

    // Populate Special Parts Row
    const nonSoloSpecialParts = (preset.special_parts || []).filter(sp => sp.type !== "Solo" && sp.type !== "Call");
    if (nonSoloSpecialParts.length > 0 && specialRow && specialContainer) {
      specialRow.style.display = "flex";
      specialContainer.innerHTML = "";

      nonSoloSpecialParts.forEach((sp, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = sp.name;
        btn.title = `${sp.type}:${sp.name}`;
        btn.style.fontWeight = "bold";
        btn.style.borderRadius = "8px";
        btn.style.fontSize = "0.8rem";
        btn.style.padding = "0.35rem 0.75rem";
        btn.style.cursor = "pointer";

        if (sp.type === "Intro") {
          btn.style.background = "rgba(59, 130, 246, 0.15)";
          btn.style.border = "1px solid rgba(59, 130, 246, 0.35)";
          btn.style.color = "#3b82f6";
        } else if (sp.type === "Call") {
          btn.style.background = "rgba(99, 102, 241, 0.15)";
          btn.style.border = "1px solid rgba(99, 102, 241, 0.35)";
          btn.style.color = "var(--primary)";
        } else if (sp.type === "Break") {
          btn.style.background = "rgba(245, 158, 11, 0.15)";
          btn.style.border = "1px solid rgba(245, 158, 11, 0.35)";
          btn.style.color = "#f59e0b";
        }

        btn.addEventListener("click", () => {
          const wasActive = btn.classList.contains("btn-primary") || btn.classList.contains("special-active");

          Array.from(specialContainer.children).forEach(child => {
            child.classList.remove("btn-primary", "special-active");
            const title = child.title.split(":")[0];
            if (title === "Intro") {
              child.style.background = "rgba(59, 130, 246, 0.15)";
              child.style.borderColor = "rgba(59, 130, 246, 0.35)";
            } else if (title === "Call") {
              child.style.background = "rgba(99, 102, 241, 0.15)";
              child.style.borderColor = "rgba(99, 102, 241, 0.35)";
            } else if (title === "Break") {
              child.style.background = "rgba(245, 158, 11, 0.15)";
              child.style.borderColor = "rgba(245, 158, 11, 0.35)";
            }
          });

          const solosContainer = document.getElementById("solos-buttons-container");
          if (solosContainer) {
            Array.from(solosContainer.children).forEach(child => {
              child.classList.remove("btn-primary", "special-active");
              child.style.background = "rgba(168, 85, 247, 0.15)";
              child.style.borderColor = "rgba(168, 85, 247, 0.35)";
            });
          }

          state.tracks.forEach(track => {
            if (track.preSoloAccompanimentSteps) {
              track.steps = [...track.preSoloAccompanimentSteps];
              track.subdivisionSteps[track.subdivision] = [...track.steps];
              if (track.standardSteps) {
                track.standardSteps = [...track.steps];
              }
              delete track.preSoloAccompanimentSteps;
            }
          });

          if (wasActive) {
            state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
            state.callIntroActive = false;
            renderGrid();
          } else {
            btn.classList.add("special-active", "btn-primary");
            btn.style.background = "";
            btn.style.borderColor = "";
            playSpecialPart(sp, btn);
          }
        });

        specialContainer.appendChild(btn);
      });
    } else {
      if (specialRow) specialRow.style.display = "none";
    }

    // Populate Solos Row (for the old format)
    const soloParts = (preset.special_parts || []).filter(sp => sp.type === "Solo" && !sp.name.toLowerCase().includes("accomp"));
    const accompPart = (preset.special_parts || []).find(sp => sp.type === "Solo" && sp.name.toLowerCase().includes("accomp"));

    if (soloParts.length > 0 && solosRow && solosContainer) {
      solosRow.style.display = "flex";
      solosContainer.innerHTML = "";

      soloParts.forEach((sp, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.dataset.type = "solo";
        btn.textContent = idx + 1;
        btn.title = sp.name;
        btn.style.minWidth = "28px";
        btn.style.height = "28px";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.fontWeight = "bold";
        btn.style.borderRadius = "6px";
        btn.style.fontSize = "0.75rem";
        btn.style.padding = "0";
        btn.style.flex = "0 0 28px";
        btn.style.cursor = "pointer";

        btn.style.background = "rgba(168, 85, 247, 0.15)";
        btn.style.border = "1px solid rgba(168, 85, 247, 0.35)";
        btn.style.color = "#a855f7";

        btn.addEventListener("click", () => {
          const wasActive = btn.classList.contains("btn-primary") || btn.classList.contains("special-active");
          const action = () => {
            deactivateAllSpecialButtons();

            state.tracks.forEach(track => {
              if (track.preSoloAccompanimentSteps) {
                track.steps = [...track.preSoloAccompanimentSteps];
                track.subdivisionSteps[track.subdivision] = [...track.steps];
                if (track.standardSteps) {
                  track.standardSteps = [...track.steps];
                }
                delete track.preSoloAccompanimentSteps;
              }
            });

            if (!wasActive) {
              btn.classList.add("special-active", "btn-primary");
              btn.style.background = "";
              btn.style.borderColor = "";

              if (accompPart) {
                const djembeTrack = state.tracks.find(t => t.type === "djembe" && t.id !== "solo_djembe");
                if (djembeTrack) {
                  djembeTrack.preSoloAccompanimentSteps = [...djembeTrack.steps];
                  const accompSteps = convertPatternToSteps(accompPart.drum_pattern, state.timeSignature, djembeTrack.name);
                  djembeTrack.steps = accompSteps;
                  djembeTrack.subdivisionSteps[djembeTrack.subdivision] = [...accompSteps];
                  if (djembeTrack.standardSteps) {
                    djembeTrack.standardSteps = [...accompSteps];
                  }
                }
              }

              let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
              if (!soloTrack) {
                soloTrack = {
                  id: "solo_djembe",
                  name: sp.name,
                  type: "djembe",
                  instrument: "djembe1",
                  volume: 0.85,
                  pitch: 0,
                  muted: false,
                  soloed: false
                };
                state.tracks.push(soloTrack);
                sortTracks();
              } else {
                soloTrack.name = sp.name;
              }

              soloTrack.subdivision = getSubdivisionForTiming(state.timeSignature);
              const steps = convertPatternToSteps(sp.drum_pattern, state.timeSignature, "Djembé");
              soloTrack.steps = steps;
              soloTrack.originalSteps = [...steps];
              soloTrack.originalSubdivision = soloTrack.subdivision;
              soloTrack.subdivisionSteps = {
                [soloTrack.subdivision]: [...steps]
              };

              if (sp.type === "Intro" || sp.type === "Call" || sp.type === "Break") {
                state.callIntroActive = true;
              } else {
                state.callIntroActive = false;
              }

              state.tracks.forEach(t => {
                const isCall = t.id === "solo_djembe" ||
                  t.id.startsWith("special") ||
                  t.name.toLowerCase().includes("call") ||
                  t.name.toLowerCase().includes("break") ||
                  t.name.toLowerCase().includes("intro");
                if (isCall) t.muted = false;
              });
            } else {
              state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
              state.callIntroActive = false;
            }
            renderGrid();
          };

          if (state.isPlaying) {
            queueSpecialAction(action, btn);
          } else {
            action();
            if (!wasActive) {
              togglePlay();
            }
          }
        });

        solosContainer.appendChild(btn);
      });
    } else {
      if (solosRow) solosRow.style.display = "none";
    }
  }

  renderGrid();
  updateSpecialButtonsState(preset);
}

function toggleEchauffementNew() {
  const turningOn = !state.echauffementActive;

  const isNewFormat = state.currentPreset && (state.currentPreset.step_count !== undefined || (state.currentPreset.tracks && !Array.isArray(state.currentPreset.tracks)));

  if (turningOn) {
    // Deactivate solos and variations to avoid conflict
    deactivateAllSpecialButtons();
    state.echauffementActive = true;

    const action = () => {
      if (isNewFormat) {
        const echObj = state.currentPreset.echauffement || {};
        state.tracks.forEach(track => {
          const hierarchyKey = getTrackHierarchyKey(track);
          if (hierarchyKey && echObj[hierarchyKey] && echObj[hierarchyKey] !== "Missing Data") {
            if (!track.standardSteps) track.standardSteps = [...track.steps];
            track.steps = convertSpaceDelimitedPatternToSteps(echObj[hierarchyKey], track.type, state.currentPreset.step_count);
            track.subdivisionSteps[track.subdivision] = [...track.steps];
          }
        });
      } else {
        state.tracks.forEach(track => {
          const presetTrack = state.currentPreset.tracks.find(pt => cleanTrackName(pt.part) === cleanTrackName(track.name));
          if (presetTrack && presetTrack.echauffement) {
            if (!track.standardSteps) track.standardSteps = [...track.steps];
            track.steps = convertPatternToSteps(presetTrack.echauffement.drum_pattern, state.timeSignature, track.name);
            track.subdivisionSteps[track.subdivision] = [...track.steps];
          }
        });
      }
      state.echPlaying = true;
      renderGrid();
    };

    if (!state.isPlaying) {
      action();
      togglePlay();
    } else {
      echQueuedFlag = true;
      state.queuedActions.push(() => { echQueuedFlag = false; action(); });
    }
  } else {
    state.echauffementActive = false;

    const action = () => {
      state.tracks.forEach(track => {
        if (track.standardSteps) {
          track.steps = [...track.standardSteps];
          track.subdivisionSteps[track.subdivision] = [...track.steps];
          delete track.standardSteps;
        }
      });
      state.echPlaying = false;
      renderGrid();
    };

    if (!state.isPlaying) {
      action();
    } else {
      echQueuedFlag = true;
      state.queuedActions.push(() => { echQueuedFlag = false; action(); });
    }
  }
}

function playSpecialPart(sp) {
  const isNewFormat = state.currentPreset && (state.currentPreset.step_count !== undefined || (state.currentPreset.tracks && !Array.isArray(state.currentPreset.tracks)));

  let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
  if (!soloTrack) {
    soloTrack = {
      id: "solo_djembe",
      name: sp.name || sp.part_id || "Solo Djembe",
      type: "djembe",
      instrument: "djembe1",
      volume: 0.85,
      pitch: 0,
      muted: false,
      soloed: false
    };
    state.tracks.push(soloTrack);
    sortTracks();
  } else {
    soloTrack.name = sp.name || sp.part_id || "Solo Djembe";
  }

  soloTrack.subdivision = getSubdivisionForTiming(state.timeSignature);
  let steps;
  if (isNewFormat) {
    steps = convertSpaceDelimitedPatternToSteps(sp.sequence, "djembe", state.currentPreset.step_count);
  } else {
    steps = convertPatternToSteps(sp.drum_pattern, state.timeSignature, "Djembé");
  }

  soloTrack.steps = steps;
  soloTrack.originalSteps = [...steps];
  soloTrack.originalSubdivision = soloTrack.subdivision;
  soloTrack.subdivisionSteps = {
    [soloTrack.subdivision]: [...steps]
  };

  if (sp.type === "Intro" || sp.type === "Call" || sp.type === "Break") {
    state.callIntroActive = true;
  } else {
    state.callIntroActive = false;
  }

  state.tracks.forEach(t => {
    const isCall = t.id === "solo_djembe" ||
      t.id.startsWith("special") ||
      t.name.toLowerCase().includes("call") ||
      t.name.toLowerCase().includes("break") ||
      t.name.toLowerCase().includes("intro");
    if (isCall) t.muted = false;
  });

  renderGrid();
}

function playBreak(brk, btn) {
  const wasActive = btn ? (btn.classList.contains("break-active") || btn.classList.contains("btn-primary")) : false;

  const action = () => {
    deactivateAllSpecialButtons();
    if (!wasActive) {
      let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
      if (!soloTrack) {
        soloTrack = {
          id: "solo_djembe",
          name: brk.name,
          type: "djembe",
          instrument: "djembe1",
          volume: 0.85,
          pitch: 0,
          muted: false,
          soloed: false
        };
        state.tracks.push(soloTrack);
        sortTracks();
      } else {
        soloTrack.name = brk.name;
      }

      soloTrack.subdivision = brk.subdivision;
      soloTrack.steps = [...brk.steps];
      soloTrack.originalSteps = [...brk.steps];
      soloTrack.originalSubdivision = brk.subdivision;
      soloTrack.subdivisionSteps = {
        [soloTrack.subdivision]: [...soloTrack.steps]
      };

      state.callIntroActive = true;
      if (btn) {
        btn.classList.add("break-active", "btn-primary");
        btn.style.background = "";
        btn.style.borderColor = "";
      }
    } else {
      state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
      state.callIntroActive = false;
    }
    renderGrid();
  };

  if (state.isPlaying) {
    queueSpecialAction(action, btn);
  } else {
    action();
    if (!wasActive) {
      togglePlay();
    }
  }
}

function injectLargeSliderOverlay() {
  if (document.getElementById("large-slider-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "large-slider-overlay";
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(8, 10, 15, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: none;
    z-index: 100000;
    pointer-events: auto;
  `;

  const windowDiv = document.createElement("div");
  windowDiv.className = "large-slider-window";
  windowDiv.style.cssText = `
    position: absolute;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border-radius: 16px;
    padding: 1.25rem 1.75rem;
    width: calc(100% - 32px);
    max-width: 280px;
    box-sizing: border-box;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    pointer-events: auto;
  `;

  const titleContainer = document.createElement("div");
  titleContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    width: 100%;
  `;

  const labelElement = document.createElement("div");
  labelElement.className = "large-slider-label";
  labelElement.style.cssText = `
    font-family: 'Outfit', 'Inter', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.02em;
    text-align: center;
  `;

  const valueElement = document.createElement("div");
  valueElement.className = "large-slider-value";
  valueElement.style.cssText = `
    font-family: 'Outfit', 'Inter', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: #fff;
    text-shadow: 0 0 12px rgba(255,255,255,0.3);
    letter-spacing: 0.02em;
    text-align: center;
  `;

  titleContainer.appendChild(labelElement);
  titleContainer.appendChild(valueElement);

  const slider = document.createElement("input");
  slider.type = "range";
  slider.className = "large-slider-input";
  slider.style.cssText = `
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    outline: none;
    margin: 0.5rem 0;
    pointer-events: auto;
    touch-action: pan-x;
  `;

  windowDiv.appendChild(titleContainer);
  windowDiv.appendChild(slider);
  overlay.appendChild(windowDiv);

  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });

  const container = document.querySelector(".demo-device-frame") || document.querySelector(".app-container") || document.body;
  container.appendChild(overlay);

  const style = document.createElement("style");
  style.textContent = `
    .large-slider-input::-webkit-slider-runnable-track {
      height: 10px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
    }
    .large-slider-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--accent-color, var(--primary, #6366f1)) !important;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(255,255,255,0.4);
      border: 2px solid #fff;
      margin-top: -7px; /* Center thumb vertically on 10px track */
      transition: transform 0.1s ease;
    }
    .large-slider-input::-webkit-slider-thumb:active {
      transform: scale(1.15);
    }
    .large-slider-input::-moz-range-track {
      height: 10px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
    }
    .large-slider-input::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--accent-color, var(--primary, #6366f1)) !important;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(255,255,255,0.4);
      border: 2px solid #fff;
      transition: transform 0.1s ease;
    }
    .large-slider-input::-moz-range-thumb:active {
      transform: scale(1.15);
    }
  `;
  document.head.appendChild(style);
}

function setupLargeSlider(originalSlider, options = {}) {
  if (!originalSlider) return;
  originalSlider.style.touchAction = "none";
  originalSlider.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      originalSlider.setPointerCapture(e.pointerId);
    } catch (err) { }

    injectLargeSliderOverlay();
    const overlay = document.getElementById("large-slider-overlay");
    if (!overlay) return;

    const windowDiv = overlay.querySelector(".large-slider-window");
    const largeInput = overlay.querySelector(".large-slider-input");
    const labelLabel = overlay.querySelector(".large-slider-label");
    const valueLabel = overlay.querySelector(".large-slider-value");

    const clientX = (e.clientX !== undefined) ? e.clientX : window.innerWidth / 2;
    const clientY = (e.clientY !== undefined) ? e.clientY : window.innerHeight / 2;

    const min = parseFloat(originalSlider.min) || 0;
    const max = parseFloat(originalSlider.max) || 100;
    const step = parseFloat(originalSlider.step) || 1;

    largeInput.min = originalSlider.min || "0";
    largeInput.max = originalSlider.max || "100";
    largeInput.step = originalSlider.step || "1";
    largeInput.value = originalSlider.value;

    const parentRow = originalSlider.closest(".track-row");
    if (parentRow) {
      const hsl = parentRow.style.getPropertyValue("--part-color-hsl");
      if (hsl) {
        largeInput.style.setProperty("--accent-color", `hsl(${hsl})`);
      } else {
        largeInput.style.removeProperty("--accent-color");
      }
    } else {
      largeInput.style.removeProperty("--accent-color");
    }

    const updateLabelAndValue = () => {
      if (options.label) {
        labelLabel.textContent = options.label;
      } else {
        labelLabel.textContent = "";
      }

      if (options.getValueText) {
        valueLabel.textContent = options.getValueText(largeInput.value);
      } else if (options.getLabel) {
        const fullText = options.getLabel(largeInput.value);
        if (fullText.includes(":")) {
          const parts = fullText.split(":");
          labelLabel.textContent = parts[0].trim();
          valueLabel.textContent = parts[1].trim();
        } else {
          labelLabel.textContent = "";
          valueLabel.textContent = fullText;
        }
      } else {
        labelLabel.textContent = "";
        valueLabel.textContent = largeInput.value;
      }
    };

    updateLabelAndValue();
    overlay.style.display = "block";

    const windowWidth = windowDiv.offsetWidth || 280;
    const windowHeight = windowDiv.offsetHeight || 120;

    const container = overlay.parentElement;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = container.clientWidth || window.innerWidth;
    const containerHeight = container.clientHeight || window.innerHeight;

    const containerY = clientY - containerRect.top;

    let leftPos = (containerWidth - windowWidth) / 2;
    let topPos = containerY - 140; // Default fallback

    if (parentRow) {
      const parentRect = parentRow.getBoundingClientRect();
      const parentTop = parentRect.top - containerRect.top;
      // Position it directly above the track row so it is visible and not blocked by the finger
      topPos = parentTop - 60;
    }

    const maxLeft = containerWidth - windowWidth - 16;
    const maxTop = containerHeight - windowHeight - 16;

    leftPos = Math.max(16, Math.min(maxLeft, leftPos));
    topPos = Math.max(16, Math.min(maxTop, topPos));

    windowDiv.style.left = leftPos + "px";
    windowDiv.style.top = topPos + "px";

    // Wire direct input slider interaction (for non-trusted pointerdown clicks)
    if (largeInput._onInputHandler) {
      largeInput.removeEventListener("input", largeInput._onInputHandler);
    }
    largeInput._onInputHandler = (ev) => {
      originalSlider.value = largeInput.value;
      originalSlider.dispatchEvent(new Event("input"));
      updateLabelAndValue();
    };
    largeInput.addEventListener("input", largeInput._onInputHandler);

    if (largeInput._onChangeHandler) {
      largeInput.removeEventListener("change", largeInput._onChangeHandler);
      largeInput.removeEventListener("pointerup", largeInput._onChangeHandler);
    }
    largeInput._onChangeHandler = (ev) => {
      originalSlider.value = largeInput.value;
      originalSlider.dispatchEvent(new Event("input"));
      originalSlider.dispatchEvent(new Event("change"));
      overlay.style.display = "none";
    };
    largeInput.addEventListener("change", largeInput._onChangeHandler);
    largeInput.addEventListener("pointerup", largeInput._onChangeHandler);

    // If it's a trusted drag event (BPM slider), support slide-anywhere behavior immediately
    if (e.isTrusted) {
      const origRect = originalSlider.getBoundingClientRect();
      const origWidth = origRect.width;
      if (origWidth > 0) {
        let clickFraction = (clientX - origRect.left) / origWidth;
        clickFraction = Math.max(0, Math.min(1, clickFraction));
        let clickVal = min + clickFraction * (max - min);
        clickVal = Math.round(clickVal / step) * step;
        originalSlider.value = clickVal;
        originalSlider.dispatchEvent(new Event("input"));
      }

      const startX = clientX;
      const startVal = parseFloat(originalSlider.value) || 0;

      const getSliderWidth = () => {
        return (largeInput && largeInput.clientWidth) ? largeInput.clientWidth : 200;
      };

      const updateValue = (clientXCoord) => {
        const deltaX = clientXCoord - startX;
        const width = getSliderWidth();
        const range = max - min;

        let val = startVal + (deltaX / width) * range;
        val = Math.round(val / step) * step;
        val = Math.max(min, Math.min(max, val));

        if (largeInput.value !== String(val)) {
          largeInput.value = val;
          originalSlider.value = largeInput.value;
          originalSlider.dispatchEvent(new Event("input"));
          updateLabelAndValue();
        }
      };

      const onPointerMove = (moveEvent) => {
        if (moveEvent.cancelable) {
          moveEvent.preventDefault();
        }
        if (moveEvent.clientX !== undefined) {
          updateValue(moveEvent.clientX);
        }
      };

      const onRelease = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onRelease);
        window.removeEventListener("pointercancel", onRelease);

        try {
          originalSlider.releasePointerCapture(e.pointerId);
        } catch (err) {}

        if (largeInput && originalSlider) {
          originalSlider.value = largeInput.value;
          originalSlider.dispatchEvent(new Event("input"));
          originalSlider.dispatchEvent(new Event("change"));
        }

        overlay.style.display = "none";
      };

      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onRelease);
      window.addEventListener("pointercancel", onRelease);
    }
  });
}

// Initialize Application
function init() {
  const loadingText = document.getElementById("loading-status-text");
  let audioLoaded = false;

  // Bind progress indicator
  const loadStatusEl = document.getElementById("sample-load-status");
  const statusTextEl = loadStatusEl ? loadStatusEl.querySelector(".status-text") : null;

  synth.onProgress = (loaded, total) => {
    if (loadStatusEl && statusTextEl) {
      if (loaded < total) {
        loadStatusEl.className = "sample-load-status loading";
        statusTextEl.textContent = `Loading samples (${loaded}/${total})...`;
        loadStatusEl.style.opacity = "1";
      } else {
        loadStatusEl.className = "sample-load-status loaded";
        statusTextEl.textContent = "Samples Loaded";

        // Gracefully fade out/dim after a delay
        setTimeout(() => {
          loadStatusEl.style.opacity = "0";
          setTimeout(() => {
            loadStatusEl.style.display = "none";
          }, 400);
        }, 2500);
      }
    }
    // Update loading screen text
    if (loadingText && !audioLoaded) {
      loadingText.textContent = `Loading sound library (${loaded}/${total})...`;
    }
  };

  // Run benchmark during loading screen
  const benchmarkPromise = runLoadingBenchmark().then(() => {
    if (loadingText && !audioLoaded) {
      loadingText.textContent = "Loading sound library...";
    }
  });

  // Pre-load audio samples safely in the background
  let audioPromise;
  try {
    audioPromise = synth.init().then(() => {
      synth.humanisePitch = state.humanisePitch;
      audioLoaded = true;
      if (loadingText) {
        loadingText.textContent = "Engine ready!";
      }
    }).catch(err => {
      console.error("Failed to init audio engine", err);
      audioLoaded = true;
    });
  } catch (err) {
    console.error("Audio engine failed to initialize synchronously on load:", err);
    audioPromise = Promise.resolve();
    audioLoaded = true;
  }

  // Dismiss loading screen once both benchmark and audio loading are done
  Promise.all([benchmarkPromise, audioPromise]).then(() => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }
  }).catch(err => {
    console.error("Failed to initialize system during startup:", err);
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  });

  loadPresetsDropdown();

  try {
    loadCustomSaves();
  } catch (err) {
    console.error("Failed to load custom saves on init:", err);
  }

  // Set up default layout: Load first library rhythm if available, fallback to Kuku Preset
  if (typeof RHYTHM_LIBRARY !== "undefined" && RHYTHM_LIBRARY && RHYTHM_LIBRARY.length > 0) {
    loadRhythm(RHYTHM_LIBRARY[0]);
  } else {
    loadPresetById("kuku");
  }

  // Bind Event Listeners
  setupEventListeners();

  injectLargeSliderOverlay();
  setupLargeSlider(bpmRange, {
    label: "Tempo",
    getValueText: (val) => `${val} BPM`
  });

  // Start Playhead Animation Loop
  requestAnimationFrame(animatePlayhead);


}

// Update current rhythm name display in header
function updateRhythmNameDisplay() {
  const cleanName = (state.currentRhythmName || "").split("(")[0].trim();
  if (rhythmNameDisplay) {
    rhythmNameDisplay.textContent = cleanName || "Untitled Groove";
  }
  const mobileHeaderTitle = document.getElementById("mobile-header-title");
  if (mobileHeaderTitle) {
    mobileHeaderTitle.textContent = "DjembeStudio";
  }
  const gridTitle = document.getElementById("sequencer-grid-title");
  if (gridTitle) {
    gridTitle.textContent = cleanName || "Untitled Groove";
  }
}

function updateSpecialButtonsState(preset) {
  const btnTriggerCall = document.getElementById("btn-trigger-call");
  const btnTriggerEchauffement = document.getElementById("btn-trigger-echauffement");

  if (!preset) {
    if (btnTriggerCall) {
      btnTriggerCall.disabled = true;
      btnTriggerCall.style.opacity = "0.3";
      btnTriggerCall.style.pointerEvents = "none";
    }
    if (btnTriggerEchauffement) {
      btnTriggerEchauffement.disabled = true;
      btnTriggerEchauffement.style.opacity = "0.3";
      btnTriggerEchauffement.style.pointerEvents = "none";
    }
    return;
  }

  const tracksIsArray = Array.isArray(preset.tracks);
  const isNewObjectFormat = !tracksIsArray && preset.step_count !== undefined;

  let hasCall = false;
  let hasEchauffement = false;

  if (isNewObjectFormat) {
    hasCall = (preset.special_parts || []).some(sp => sp.type === "Call" || sp.type === "Intro");
    hasEchauffement = preset.echauffement && Object.keys(preset.echauffement).some(key => preset.echauffement[key] !== "Missing Data");
  } else if (tracksIsArray) {
    hasCall = (preset.special_parts || []).some(sp => sp.type === "Call" || sp.type === "Intro");
    hasEchauffement = (preset.tracks || []).some(track => track.echauffement && track.echauffement.drum_pattern);
  } else {
    hasCall = Object.keys(preset.tracks || {}).some(key => {
      const trackData = preset.tracks[key];
      return key === "special_0" || (trackData.name || "").toLowerCase().includes("call");
    });
    hasEchauffement = (preset.solos || []).some(s =>
      s.name.toLowerCase().includes("echauffement") ||
      s.name.toLowerCase().includes("échauffement")
    );
  }

  if (btnTriggerCall) {
    btnTriggerCall.disabled = !hasCall;
    btnTriggerCall.style.opacity = hasCall ? "" : "0.3";
    btnTriggerCall.style.pointerEvents = hasCall ? "" : "none";
  }

  if (btnTriggerEchauffement) {
    btnTriggerEchauffement.disabled = !hasEchauffement;
    btnTriggerEchauffement.style.opacity = hasEchauffement ? "" : "0.3";
    btnTriggerEchauffement.style.pointerEvents = hasEchauffement ? "" : "none";
  }
}

// Global subdivision factor is now handled track-specifically

// Stable-sort tracks: call parts at the very top, standard djembe next, others in the middle, special djembe sections (solos/echauffements) at the bottom, and solo djembe at the absolute bottom.
function sortTracks() {
  const isCallTrack = (t) => {
    const nameLower = (t.name || "").toLowerCase();
    return (t.id && t.id.startsWith("special")) ||
      nameLower.includes("call") ||
      nameLower.includes("break") ||
      nameLower.includes("intro");
  };

  const isSpecialDjembe = (t) => {
    if (t.type !== "djembe") return false;
    if (isCallTrack(t)) return false; // calls are handled separately at the top
    const nameLower = (t.name || "").toLowerCase();
    return nameLower.includes("solo") ||
      nameLower.includes("echauffement");
  };

  const callTracks = state.tracks.filter(t => isCallTrack(t));
  const standardDjembes = state.tracks.filter(t => t.type === "djembe" && !isCallTrack(t) && !isSpecialDjembe(t) && t.id !== "solo_djembe");
  const specialDjembes = state.tracks.filter(t => t.type === "djembe" && isSpecialDjembe(t) && t.id !== "solo_djembe");
  const soloDjembe = state.tracks.filter(t => t.id === "solo_djembe");

  const others = state.tracks.filter(t => t.type !== "djembe" && !isCallTrack(t));

  const kenkenis = others.filter(t => t.instrument.includes("kenkeni"));
  const sangbans = others.filter(t => t.instrument.includes("sangban"));
  const dundunbas = others.filter(t => t.instrument.includes("dundunba") || t.instrument.includes("dundun") || t.instrument.includes("dun"));
  const remainingOthers = others.filter(t =>
    !t.instrument.includes("kenkeni") &&
    !t.instrument.includes("sangban") &&
    !t.instrument.includes("dundunba") &&
    !t.instrument.includes("dundun") &&
    !t.instrument.includes("dun")
  );

  state.tracks = [
    ...callTracks,
    ...standardDjembes,
    ...kenkenis,
    ...sangbans,
    ...dundunbas,
    ...remainingOthers,
    ...specialDjembes,
    ...soloDjembe
  ];
}


// Populate preset rhythms dropdown
function loadPresetsDropdown() {
  if (!presetSelect) return;
  RHYTHM_PRESETS.forEach(preset => {
    const opt = document.createElement("option");
    opt.value = preset.id;
    opt.textContent = preset.name;
    presetSelect.appendChild(opt);
  });
  presetSelect.value = "kuku";
}

// Setup all user interaction event listeners
function setupEventListeners() {
  // Play/Stop
  btnPlay.addEventListener("click", togglePlay);

  // Call Trigger
  const btnTriggerCall = document.getElementById("btn-trigger-call");
  if (btnTriggerCall) {
    btnTriggerCall.addEventListener("click", triggerCall);
  }

  // Échauffement Trigger
  const btnTriggerEchauffement = document.getElementById("btn-trigger-echauffement");
  if (btnTriggerEchauffement) {
    btnTriggerEchauffement.addEventListener("click", triggerEchauffement);
  }

  // BPM control
  bpmRange.addEventListener("input", (e) => {
    state.bpm = parseInt(e.target.value);
    bpmVal.textContent = state.bpm;
    updateStepPositions();
  });

  // Swing control
  swingRange.addEventListener("input", (e) => {
    state.swing = parseInt(e.target.value);
    swingVal.textContent = state.swing + "%";
    [2, 3, 4, 6].forEach(s => applyGlobalSwingToOffsets(s, state.swing));
    renderSwingSliders(activeSwingSubdiv);
    updateStepPositions();
  });

  // Global Humanise control
  humaniseRange.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    humaniseVal.textContent = val + "%";

    state.humaniseTime = val;
    state.humanisePitch = val;
    state.humaniseVolume = val;
    synth.humanisePitch = val;

    humaniseTimeRange.value = val;
    humaniseTimeVal.textContent = val + "%";
    humanisePitchRange.value = val;
    humanisePitchVal.textContent = val + "%";
    humaniseVolumeRange.value = val;
    humaniseVolumeVal.textContent = val + "%";

    updateStepPositions();
    updateCellScales();
  });

  // Humanise Time control (independent)
  humaniseTimeRange.addEventListener("input", (e) => {
    state.humaniseTime = parseInt(e.target.value);
    humaniseTimeVal.textContent = state.humaniseTime + "%";

    // Update global average
    const avg = Math.round((state.humaniseTime + state.humanisePitch + state.humaniseVolume) / 3);
    humaniseRange.value = avg;
    humaniseVal.textContent = avg + "%";

    updateStepPositions();
  });

  // Humanise Pitch control (independent)
  humanisePitchRange.addEventListener("input", (e) => {
    state.humanisePitch = parseInt(e.target.value);
    humanisePitchVal.textContent = state.humanisePitch + "%";
    synth.humanisePitch = state.humanisePitch;

    // Update global average
    const avg = Math.round((state.humaniseTime + state.humanisePitch + state.humaniseVolume) / 3);
    humaniseRange.value = avg;
    humaniseVal.textContent = avg + "%";

    updateCellScales();
  });

  // Humanise Volume control (independent)
  humaniseVolumeRange.addEventListener("input", (e) => {
    state.humaniseVolume = parseInt(e.target.value);
    humaniseVolumeVal.textContent = state.humaniseVolume + "%";

    // Update global average
    const avg = Math.round((state.humaniseTime + state.humanisePitch + state.humaniseVolume) / 3);
    humaniseRange.value = avg;
    humaniseVal.textContent = avg + "%";

    updateCellScales();
  });

  // Global Subdivision control
  if (globalSubdivisionSelect) {
    globalSubdivisionSelect.addEventListener("change", (e) => {
      state.globalSubdivision = parseInt(e.target.value);
      // Update all tracks that don't have custom overrides, or update everything
      state.tracks.forEach(track => {
        updateTrackSubdivision(track, state.globalSubdivision);
      });
      renderGrid();
    });
  }

  // Preset loader
  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      loadPresetById(e.target.value);
    });
  }

  // Grid actions
  if (btnClear) btnClear.addEventListener("click", clearGrid);
  if (btnRandom) btnRandom.addEventListener("click", randomizeGrid);

  function getNextDjembeId() {
    let lastId = 0;
    for (let i = state.tracks.length - 1; i >= 0; i--) {
      const track = state.tracks[i];
      const nameLower = (track.name || "").toLowerCase();
      const isCall = (track.id && track.id.startsWith("special")) ||
        nameLower.includes("call") ||
        nameLower.includes("break") ||
        nameLower.includes("intro");
      if (track.type === "djembe" && !isCall && track.id !== "solo_djembe" && track.instrument) {
        const match = track.instrument.match(/djembe(\d+)/i);
        if (match) {
          lastId = parseInt(match[1], 10);
          break;
        }
      }
    }
    if (lastId === 0) return 1;
    return (lastId % 7) + 1;
  }

  function getNextDunId(baseType) {
    let lastId = 0;
    for (let i = state.tracks.length - 1; i >= 0; i--) {
      const track = state.tracks[i];
      if (track.instrument && track.instrument.startsWith(baseType)) {
        if (track.instrument.endsWith("2")) {
          lastId = 2;
        } else {
          lastId = 1;
        }
        break;
      }
    }
    if (lastId === 0) return 1;
    return (lastId % 2) + 1;
  }

  // Add Djembe track
  btnAddDjembe.addEventListener("click", () => {
    state.customDjembeCount++;
    const nextId = getNextDjembeId();
    const newTrack = {
      id: `djembe_custom_${state.customDjembeCount}`,
      name: `Djembe ${nextId}`,
      type: "djembe",
      instrument: `djembe${nextId}`,
      subdivision: state.globalSubdivision,
      steps: Array(state.beats * state.globalSubdivision).fill(""),
      volume: 0.8,
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    };
    state.tracks.push(newTrack);
    renderGrid();
  });

  // Add Kenkeni track pair (Drum + Bell)
  btnAddKenkeni.addEventListener("click", () => {
    state.customKenkeniCount++;
    const count = state.customKenkeniCount;
    const nextId = getNextDunId("kenkeni");
    const suffix = nextId === 2 ? "2" : "";
    const bellSuffix = nextId === 2 ? "_bell2" : "_bell";
    state.tracks.push({
      id: `kenkeni_custom_drum_${count}`,
      name: `Kenkeni Drum ${nextId}`,
      type: "dunun",
      instrument: `kenkeni${suffix}`,
      subdivision: state.globalSubdivision,
      steps: Array(state.beats * state.globalSubdivision).fill(""),
      volume: 0.8,
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    });
    state.tracks.push({
      id: `kenkeni_custom_bell_${count}`,
      name: `Kenkeni Bell ${nextId}`,
      type: "bell",
      instrument: `kenkeni${bellSuffix}`,
      subdivision: state.globalSubdivision,
      steps: Array(state.beats * state.globalSubdivision).fill(""),
      volume: 0.7,
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    });
    renderGrid();
  });

  // Add Sangban track pair (Drum + Bell)
  btnAddSangban.addEventListener("click", () => {
    state.customSangbanCount++;
    const count = state.customSangbanCount;
    const nextId = getNextDunId("sangban");
    const suffix = nextId === 2 ? "2" : "";
    const bellSuffix = nextId === 2 ? "_bell2" : "_bell";
    state.tracks.push({
      id: `sangban_custom_drum_${count}`,
      name: `Sangban Drum ${nextId}`,
      type: "dunun",
      instrument: `sangban${suffix}`,
      subdivision: state.globalSubdivision,
      steps: Array(state.beats * state.globalSubdivision).fill(""),
      volume: 0.8,
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    });
    state.tracks.push({
      id: `sangban_custom_bell_${count}`,
      name: `Sangban Bell ${nextId}`,
      type: "bell",
      instrument: `sangban${bellSuffix}`,
      subdivision: state.globalSubdivision,
      steps: Array(state.beats * state.globalSubdivision).fill(""),
      volume: 0.7,
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    });
    renderGrid();
  });

  // Add Dundunba track pair (Drum + Bell)
  btnAddDundunba.addEventListener("click", () => {
    state.customDundunbaCount++;
    const count = state.customDundunbaCount;
    const nextId = getNextDunId("dundunba");
    const suffix = nextId === 2 ? "2" : "";
    const bellSuffix = nextId === 2 ? "_bell2" : "_bell";
    state.tracks.push({
      id: `dundunba_custom_drum_${count}`,
      name: `Dundunba Drum ${nextId}`,
      type: "dunun",
      instrument: `dundunba${suffix}`,
      subdivision: state.globalSubdivision,
      steps: Array(state.beats * state.globalSubdivision).fill(""),
      volume: 0.8,
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    });
    state.tracks.push({
      id: `dundunba_custom_bell_${count}`,
      name: `Dundunba Bell ${nextId}`,
      type: "bell",
      instrument: `dundunba${bellSuffix}`,
      subdivision: state.globalSubdivision,
      steps: Array(state.beats * state.globalSubdivision).fill(""),
      volume: 0.7,
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    });
    renderGrid();
  });



  // Mixer Trigger
  if (btnMixer) {
    btnMixer.addEventListener("click", () => {
      renderMixer();
      mixerModal.classList.add("active");
    });
  }
  if (mixerBtnClose) {
    mixerBtnClose.addEventListener("click", () => {
      mixerModal.classList.remove("active");
    });
  }
  if (mixerModal) {
    mixerModal.addEventListener("click", (e) => {
      if (e.target === mixerModal) {
        mixerModal.classList.remove("active");
      }
    });
  }

  // Volume Mixer Trigger
  if (btnVolMixer) {
    btnVolMixer.addEventListener("click", () => {
      renderVolumeMixer();
      volMixerModal.classList.add("active");
    });
  }
  if (volMixerBtnClose) {
    volMixerBtnClose.addEventListener("click", () => {
      volMixerModal.classList.remove("active");
    });
  }
  if (volMixerModal) {
    volMixerModal.addEventListener("click", (e) => {
      if (e.target === volMixerModal) {
        volMixerModal.classList.remove("active");
      }
    });
  }

  // Custom Swing Trigger
  if (btnCustomSwing) {
    btnCustomSwing.addEventListener("click", () => {
      openCustomSwingModal();
    });
  }
  if (swingBtnClose) {
    swingBtnClose.addEventListener("click", () => {
      customSwingModal.classList.remove("active");
    });
  }
  if (customSwingModal) {
    customSwingModal.addEventListener("click", (e) => {
      if (e.target === customSwingModal) {
        customSwingModal.classList.remove("active");
      }
    });
  }

  // Custom Humanise Trigger
  if (btnCustomHumanise) {
    btnCustomHumanise.addEventListener("click", () => {
      customHumaniseModal.classList.add("active");
    });
  }
  if (humaniseBtnClose) {
    humaniseBtnClose.addEventListener("click", () => {
      customHumaniseModal.classList.remove("active");
    });
  }
  if (customHumaniseModal) {
    customHumaniseModal.addEventListener("click", (e) => {
      if (e.target === customHumaniseModal) {
        customHumaniseModal.classList.remove("active");
      }
    });
  }

  // Effects Modal Triggers
  if (btnEffects) {
    btnEffects.addEventListener("click", openEffectsModal);
  }
  if (effectsBtnClose) {
    effectsBtnClose.addEventListener("click", () => {
      if (effectsModal) effectsModal.classList.remove("active");
    });
  }
  if (effectsModal) {
    effectsModal.addEventListener("click", (e) => {
      if (e.target === effectsModal) {
        effectsModal.classList.remove("active");
      }
    });
  }

  // Save Slots Trigger
  if (btnSaveSlotTop) {
    btnSaveSlotTop.addEventListener("click", () => {
      if (savesModal) {
        savesModal.classList.add("active");
      }
    });
  }
  if (savesBtnClose) {
    savesBtnClose.addEventListener("click", () => {
      if (savesModal) savesModal.classList.remove("active");
    });
  }
  if (savesModal) {
    savesModal.addEventListener("click", (e) => {
      if (e.target === savesModal) {
        savesModal.classList.remove("active");
      }
    });
  }

  // Setup live label feedback for effects sliders
  document.querySelectorAll("#effects-modal .synth-slider").forEach(slider => {
    slider.addEventListener("input", (e) => {
      const inst = e.target.getAttribute("data-inst");
      const param = e.target.getAttribute("data-param");
      const val = Math.round(parseFloat(e.target.value) * 100);
      const display = document.getElementById(`effects-${param}-val-${inst}`);
      if (display) {
        display.textContent = `${val}%`;
      }
    });
  });


  // Swing Tab switching
  document.querySelectorAll(".swing-tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".swing-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSwingSubdiv = parseInt(btn.getAttribute("data-subdiv"));
      renderSwingSliders(activeSwingSubdiv);
    });
  });

  // Swing Reset
  swingBtnReset.addEventListener("click", () => {
    resetCustomSwing(activeSwingSubdiv);
  });

  // New Rhythm Modal Controls
  btnNewRhythm.addEventListener("click", () => {
    newRhythmModal.classList.add("active");
    const sig = newTimeSignature.value;
    if (sig === "12/8" || sig === "6/8") {
      newSubdivision.value = "6";
      Array.from(newSubdivision.options).forEach(opt => {
        opt.disabled = (opt.value !== "6");
      });
    } else {
      Array.from(newSubdivision.options).forEach(opt => {
        opt.disabled = false;
      });
    }
  });
  modalBtnCancel.addEventListener("click", () => {
    newRhythmModal.classList.remove("active");
  });
  modalBtnCreate.addEventListener("click", createNewCustomRhythm);
  newTimeSignature.addEventListener("change", (e) => {
    const sig = e.target.value;
    if (sig === "12/8" || sig === "6/8") {
      newSubdivision.value = "6";
      Array.from(newSubdivision.options).forEach(opt => {
        opt.disabled = (opt.value !== "6");
      });
    } else {
      Array.from(newSubdivision.options).forEach(opt => {
        opt.disabled = false;
      });
      newSubdivision.value = "4";
    }
  });

  // Save Slot action
  btnSave.addEventListener("click", saveCurrentPattern);

  // Live pads mouse/touch triggers
  drumPads.forEach(pad => {
    pad.addEventListener("mousedown", (e) => {
      const inst = pad.getAttribute("data-inst");
      const hit = pad.getAttribute("data-hit");
      triggerLiveHit(inst, hit, pad);
    });
  });

  // Keyboard triggers
  window.addEventListener("keydown", (e) => {
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return; // Ignore if user is typing in inputs
    }
    const key = e.key.toLowerCase();
    if (KEY_MAP[key]) {
      const config = KEY_MAP[key];
      // Find matching visual pad
      const pad = document.querySelector(`.drum-pad[data-inst="${config.inst}"][data-hit="${config.hit}"]`);
      triggerLiveHit(config.inst, config.hit, pad);
    }
  });

  // Synth tuning and decay controls
  document.querySelectorAll(".synth-slider, .synth-select").forEach(input => {
    const eventType = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventType, (e) => {
      const inst = e.target.getAttribute("data-inst");
      const param = e.target.getAttribute("data-param");
      const val = e.target.value;
      synth.setParam(inst, param, val);
    });
  });

  // Global double click listener for sliders to reset to default value
  document.addEventListener("dblclick", (e) => {
    if (e.target && e.target.tagName === "INPUT" && e.target.type === "range") {
      const slider = e.target;
      const defVal = slider.defaultValue !== undefined && slider.defaultValue !== "" ? slider.defaultValue : slider.getAttribute("value");
      if (defVal !== null && defVal !== undefined) {
        slider.value = defVal;
        slider.dispatchEvent(new Event("input"));
      }
    }
  });

  // Rhythm Library triggers
  if (btnBrowseLibrary) {
    btnBrowseLibrary.addEventListener("click", () => {
      librarySearch.value = "";
      libraryFilterSig.value = "all";
      renderLibraryItems("", "all");
      libraryModal.classList.add("active");
    });
  }
  if (libraryBtnClose) {
    libraryBtnClose.addEventListener("click", () => {
      libraryModal.classList.remove("active");
    });
  }
  if (librarySearch) {
    librarySearch.addEventListener("input", (e) => {
      renderLibraryItems(e.target.value, libraryFilterSig.value);
    });
  }
  if (libraryFilterSig) {
    libraryFilterSig.addEventListener("change", (e) => {
      renderLibraryItems(librarySearch.value, e.target.value);
    });
  }
  libraryModal.addEventListener("click", (e) => {
    if (e.target === libraryModal) {
      libraryModal.classList.remove("active");
    }
  });

  const openDescriptionModal = () => {
    const title = (state.currentRhythmName || "").split("(")[0].trim();
    if (descriptionModalHeader) {
      descriptionModalHeader.textContent = `About: ${title}`;
    }
    if (descriptionModalBody) {
      descriptionModalBody.style.display = "block";
      descriptionModalBody.innerHTML = state.currentRhythmDescription || "No description available for this rhythm.";
    }
    if (descriptionModalEdit) {
      descriptionModalEdit.style.display = "none";
      descriptionModalEdit.value = state.currentRhythmDescription || "";
    }
    if (descriptionModalEditBtn) {
      descriptionModalEditBtn.textContent = "Edit Description";
      descriptionModalEditBtn.classList.remove("btn-primary");
    }
    if (descriptionModal) {
      descriptionModal.classList.add("active");
    }
  };

  // Rhythm Description Modal Event Listeners
  if (rhythmNameDisplay) {
    rhythmNameDisplay.addEventListener("click", openDescriptionModal);
  }

  const gridTitle = document.getElementById("sequencer-grid-title");
  if (gridTitle) {
    gridTitle.style.cursor = "pointer";
    gridTitle.addEventListener("click", openDescriptionModal);
  }

  if (descriptionModalEditBtn) {
    descriptionModalEditBtn.addEventListener("click", () => {
      if (descriptionModalEdit.style.display === "none") {
        // Switch to edit mode
        descriptionModalBody.style.display = "none";
        descriptionModalEdit.style.display = "block";
        descriptionModalEdit.value = state.currentRhythmDescription || "";
        descriptionModalEdit.focus();
        descriptionModalEditBtn.textContent = "Save Description";
        descriptionModalEditBtn.classList.add("btn-primary");
      } else {
        // Save and switch to view mode
        const newDesc = descriptionModalEdit.value.trim();
        state.currentRhythmDescription = newDesc;
        descriptionModalBody.innerHTML = newDesc || "No description available for this rhythm.";
        descriptionModalBody.style.display = "block";
        descriptionModalEdit.style.display = "none";
        descriptionModalEditBtn.textContent = "Edit Description";
        descriptionModalEditBtn.classList.remove("btn-primary");
      }
    });
  }

  if (descriptionModalClose) {
    descriptionModalClose.addEventListener("click", () => {
      descriptionModal.classList.remove("active");
    });
  }

  if (descriptionModal) {
    descriptionModal.addEventListener("click", (e) => {
      if (e.target === descriptionModal) {
        descriptionModal.classList.remove("active");
      }
    });
  }

  // Save Notation to text file
  const btnSaveNotation = document.getElementById("btn-save-notation");
  if (btnSaveNotation) {
    btnSaveNotation.addEventListener("click", () => {
      const text = notationText.value;
      if (!text) return;
      const cleanName = (state.currentRhythmName || "rhythm").replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${cleanName}_notation.txt`;
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Load Notation from text file
  const btnLoadNotation = document.getElementById("btn-load-notation");
  const fileImportNotation = document.getElementById("file-import-notation");
  if (btnLoadNotation && fileImportNotation) {
    btnLoadNotation.addEventListener("click", () => {
      fileImportNotation.click();
    });

    fileImportNotation.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const contents = evt.target.result;
          parseAndLoadNotation(contents);
          fileImportNotation.value = ""; // Reset file input
        } catch (err) {
          alert("Error parsing notation file: " + err.message);
          console.error(err);
        }
      };
      reader.readAsText(file);
    });
  }
  // Dismiss variations popover on clicking outside
  document.addEventListener("mousedown", (e) => {
    const popup = document.getElementById("variations-popup");
    if (popup && popup.classList.contains("active")) {
      if (!popup.contains(e.target) && !e.target.closest(".step-cell")) {
        popup.classList.remove("active");
      }
    }
  });

  // --- MOBILE DEMO SPECIFIC BINDINGS ---
  function closeAllModals() {
    const modals = [
      newRhythmModal,
      mixerModal,
      volMixerModal,
      customSwingModal,
      customHumaniseModal,
      libraryModal,
      descriptionModal,
      savesModal,
      effectsModal
    ];
    modals.forEach(modal => {
      if (modal) modal.classList.remove("active");
    });
  }

  const btnLibraryIcon = document.getElementById("btn-library-icon");
  if (btnLibraryIcon) {
    btnLibraryIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = libraryModal.classList.contains("active");
      const otherOpen = document.querySelector(".modal-overlay.active:not(#library-modal)") || (hamburgerMenu && hamburgerMenu.classList.contains("active"));
      if (otherOpen) return;

      if (isActive) {
        libraryModal.classList.remove("active");
      } else {
        librarySearch.value = "";
        libraryFilterSig.value = "all";
        renderLibraryItems("", "all");
        libraryModal.classList.add("active");
      }
    });
  }

  // Swing Settings at the top
  const btnSwingSettings = document.getElementById("btn-swing-settings");
  if (btnSwingSettings) {
    btnSwingSettings.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = customSwingModal.classList.contains("active");
      const otherOpen = document.querySelector(".modal-overlay.active:not(#custom-swing-modal)") || (hamburgerMenu && hamburgerMenu.classList.contains("active"));
      if (otherOpen) return;

      if (isActive) {
        customSwingModal.classList.remove("active");
      } else {
        openCustomSwingModal();
      }
    });
  }

  // Humanise Settings at the top
  const btnHumaniseSettings = document.getElementById("btn-humanise-settings");
  if (btnHumaniseSettings) {
    btnHumaniseSettings.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = customHumaniseModal.classList.contains("active");
      const otherOpen = document.querySelector(".modal-overlay.active:not(#custom-humanise-modal)") || (hamburgerMenu && hamburgerMenu.classList.contains("active"));
      if (otherOpen) return;

      if (isActive) {
        customHumaniseModal.classList.remove("active");
      } else {
        customHumaniseModal.classList.add("active");
      }
    });
  }

  const btnHamburger = document.getElementById("btn-hamburger");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  if (btnHamburger && hamburgerMenu) {
    btnHamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      const otherOpen = document.querySelector(".modal-overlay.active:not(#hamburger-menu)");
      if (otherOpen) return;

      const isVisible = hamburgerMenu.classList.contains("active");
      if (isVisible) {
        hamburgerMenu.classList.remove("active");
      } else {
        hamburgerMenu.classList.add("active");
      }
    });

    // Close menu when clicking the overlay backdrop
    hamburgerMenu.addEventListener("click", (e) => {
      if (e.target === hamburgerMenu) {
        hamburgerMenu.classList.remove("active");
      }
    });

    // Close menu when clicking Close button inside modal
    const menuBtnClose = document.getElementById("menu-btn-close");
    if (menuBtnClose) {
      menuBtnClose.addEventListener("click", () => {
        hamburgerMenu.classList.remove("active");
      });
    }
  }

  // Bind menu buttons to click existing buttons
  const menuBtnNew = document.getElementById("menu-btn-new");
  if (menuBtnNew) {
    menuBtnNew.addEventListener("click", () => {
      btnNewRhythm.click();
      if (hamburgerMenu) hamburgerMenu.classList.remove("active");
    });
  }
  const menuBtnSave = document.getElementById("menu-btn-save");
  if (menuBtnSave) {
    menuBtnSave.addEventListener("click", () => {
      if (savesModal) savesModal.classList.add("active");
      if (hamburgerMenu) hamburgerMenu.classList.remove("active");
    });
  }
  const menuBtnMixer = document.getElementById("menu-btn-mixer");
  if (menuBtnMixer) {
    menuBtnMixer.addEventListener("click", () => {
      renderMixer();
      mixerModal.classList.add("active");
      if (hamburgerMenu) hamburgerMenu.classList.remove("active");
    });
  }
  const menuBtnVol = document.getElementById("menu-btn-vol");
  if (menuBtnVol) {
    menuBtnVol.addEventListener("click", () => {
      renderVolumeMixer();
      volMixerModal.classList.add("active");
      if (hamburgerMenu) hamburgerMenu.classList.remove("active");
    });
  }
  const menuBtnEffects = document.getElementById("menu-btn-effects");
  if (menuBtnEffects) {
    menuBtnEffects.addEventListener("click", () => {
      openEffectsModal();
      if (hamburgerMenu) hamburgerMenu.classList.remove("active");
    });
  }
  const menuBtnClear = document.getElementById("menu-btn-clear");
  if (menuBtnClear) {
    menuBtnClear.addEventListener("click", () => {
      if (confirm("Clear all steps?")) {
        clearGrid();
        if (hamburgerMenu) hamburgerMenu.classList.remove("active");
      }
    });
  }

  // Theme system: "studio" (icon-based, new default), "classic" (original look), "light"
  const menuBtnTheme = document.getElementById("menu-btn-theme");
  const themesModal = document.getElementById("themes-modal");

  function applyTheme(name, rerender = true) {
    if (name !== "studio" && name !== "tinted" && name !== "classic" && name !== "light") name = "studio";
    document.body.classList.toggle("theme-studio", name === "studio" || name === "tinted" || name === "light");
    document.body.classList.toggle("theme-tinted", name === "tinted");
    document.body.classList.toggle("light-theme", name === "light");
    try { localStorage.setItem("djembe-theme", name); } catch (e) { }

    // Sync checkmarks in the themes modal
    if (themesModal) {
      themesModal.querySelectorAll(".theme-option-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-theme") === name);
      });
    }

    // Re-render the grid so note markup matches the theme (icons vs coloured squares)
    if (rerender) {
      try {
        if (typeof renderGrid === "function" && state && state.tracks && state.tracks.length) {
          renderGrid();
          updateStepPositions();
          updateCellScales();
        }
      } catch (e) { }
    }
  }
  window.applyTheme = applyTheme;

  // Restore saved preference (legacy values: "dark" was the old default look)
  try {
    const saved = localStorage.getItem("djembe-theme");
    if (saved === "light") applyTheme("light", false);
    else if (saved === "tinted") applyTheme("tinted", false);
    else if (saved === "classic" || saved === "dark") applyTheme("classic", false);
    else applyTheme("studio", false);
  } catch (e) {
    applyTheme("studio", false);
  }

  if (menuBtnTheme && themesModal) {
    const playheadBtns = themesModal.querySelectorAll(".playhead-option-btn");
    function updatePlayheadOptionUI() {
      const activeMode = perfLite ? "lite" : "full";
      playheadBtns.forEach(btn => {
        const mode = btn.getAttribute("data-perf");
        const check = btn.querySelector(".playhead-check");
        if (check) {
          check.style.display = (mode === activeMode) ? "block" : "none";
        }
        btn.classList.toggle("active", mode === activeMode);
      });
    }

    menuBtnTheme.addEventListener("click", () => {
      if (hamburgerMenu) hamburgerMenu.classList.remove("active");
      themesModal.classList.add("active");
      updatePlayheadOptionUI();
      if (window.gsap && !perfLite) {
        const content = themesModal.querySelector(".modal-content");
        if (content) gsap.fromTo(content, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(1.6)" });
      }
    });

    themesModal.querySelectorAll(".theme-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        applyTheme(btn.getAttribute("data-theme"));
        if (window.gsap && !perfLite) {
          gsap.fromTo(".app-container", { opacity: 0.6 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
        }
      });
    });

    playheadBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-perf");
        localStorage.setItem("djembe-perf", mode);
        setPerfMode(mode === "lite");
        updatePlayheadOptionUI();
      });
    });

    updatePlayheadOptionUI();

    const themesBtnClose = document.getElementById("themes-btn-close");
    if (themesBtnClose) {
      themesBtnClose.addEventListener("click", () => themesModal.classList.remove("active"));
    }
    themesModal.addEventListener("click", (e) => {
      if (e.target === themesModal) themesModal.classList.remove("active");
    });
  }
}
// Parse box notation text and load it into state.tracks
function parseAndLoadNotation(text) {
  const lines = text.split("\n");
  const parsedTracks = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    const parts = line.split("|");
    if (parts.length < 2) continue;

    const rawName = parts[0].trim();
    const stepText = parts[1].trim();
    if (!rawName || !stepText) continue;

    const steps = stepText.split(/\s+/).map(s => s === "." ? "" : s);
    if (steps.length === 0) continue;

    parsedTracks.push({
      name: rawName,
      steps: steps
    });
  }

  if (parsedTracks.length === 0) {
    throw new Error("No valid notation tracks found in file.");
  }

  // Clean state focus
  state.focusedTrackId = null;
  state.tracks = [];
  state.customDjembeCount = 0;
  state.customKenkeniCount = 0;
  state.customSangbanCount = 0;
  state.customDundunbaCount = 0;
  state.customShekereCount = 0;

  parsedTracks.forEach((pt, idx) => {
    const nameLower = pt.name.toLowerCase();
    const isCall = nameLower.includes("call") || nameLower.includes("break");
    let type = "dunun";
    let instrument = "kenkeni";

    if (nameLower.includes("djembe") || isCall) {
      type = "djembe";
      state.customDjembeCount++;
      instrument = `djembe${Math.min(5, state.customDjembeCount)}`;
    } else if (nameLower.includes("kenkeni")) {
      if (nameLower.includes("bell")) {
        type = "bell";
        instrument = "kenkeni_bell";
        state.customKenkeniCount++;
      } else {
        type = "dunun";
        instrument = "kenkeni";
        state.customKenkeniCount++;
      }
    } else if (nameLower.includes("sangban")) {
      if (nameLower.includes("bell")) {
        type = "bell";
        instrument = "sangban_bell";
        state.customSangbanCount++;
      } else {
        type = "dunun";
        instrument = "sangban";
        state.customSangbanCount++;
      }
    } else if (nameLower.includes("dundunba")) {
      if (nameLower.includes("bell")) {
        type = "bell";
        instrument = "dundunba_bell";
        state.customDundunbaCount++;
      } else {
        type = "dunun";
        instrument = "dundunba";
        state.customDundunbaCount++;
      }
    } else if (nameLower.includes("shekere")) {
      type = "shekere";
      instrument = "shekere";
      state.customShekereCount++;
    }

    let subdivision = 4;
    if (state.timeSignature === "12/8" || state.timeSignature === "6/8") {
      subdivision = 6;
    } else if (pt.steps.length % 3 === 0 && pt.steps.length % 4 !== 0) {
      subdivision = 3;
    }

    state.tracks.push({
      id: `${instrument}_imported_${idx}_${Date.now()}`,
      name: pt.name,
      type: type,
      instrument: instrument,
      subdivision: subdivision,
      steps: pt.steps,
      volume: type === "bell" ? 0.7 : (type === "shekere" ? 0.75 : 0.8),
      pitch: parseFloat(((Math.random() - 0.5) * 0.8).toFixed(2)),
      muted: false,
      soloed: false
    });
  });

  renderGrid();
}

// Toggle/alternate hand for live hits
let lastLiveHand = "R";

// Trigger a hit from virtual pads or keyboard
function triggerLiveHit(inst, hit, padElement) {
  // Toggle hand for each live hit
  lastLiveHand = (lastLiveHand === "L") ? "R" : "L";

  // Sound
  if (inst === "djembe") {
    synth.playDjembe(hit, synth.ctx.currentTime, 0.9, "djembe1", 0, lastLiveHand);
  } else if (inst.endsWith("_bell")) {
    synth.playBell(inst, hit, synth.ctx.currentTime, 0.85);
  } else if (inst === "shekere") {
    synth.playShekere(hit, synth.ctx.currentTime, 0.85);
  } else {
    synth.playDunun(inst, hit, synth.ctx.currentTime, 0.9, 0, lastLiveHand);
  }

  // Visual Flash
  if (padElement) {
    if (window.gsap && !perfLite) {
      gsap.fromTo(padElement, { scale: 0.9 }, { scale: 1, duration: 0.35, ease: "back.out(2.5)", overwrite: "auto" });
    }
    padElement.classList.add("pad-active");
    setTimeout(() => {
      padElement.classList.remove("pad-active");
    }, 80);
  }
}

// Load preset by ID
function loadPresetById(id) {
  const preset = RHYTHM_PRESETS.find(p => p.id === id);
  if (preset) loadRhythm(preset);
}

// Load a generic rhythm preset object (from presets or from library)
function loadRhythm(preset) {
  const isNewFormat = !!(preset.rhythm_name || Array.isArray(preset.tracks));
  if (isNewFormat) {
    loadRhythmNew(preset);
    return;
  }
  state.focusedTrackId = null;
  state.currentRhythmName = preset.name;
  updateRhythmNameDisplay();

  // Retrieve description from preset or RHYTHM_LIBRARY
  let description = preset.description || "";
  if (!description && typeof RHYTHM_LIBRARY !== "undefined" && RHYTHM_LIBRARY) {
    const libItem = RHYTHM_LIBRARY.find(r => r.id === preset.id);
    if (libItem) description = libItem.description || "";
  }
  state.currentRhythmDescription = description;

  state.currentPreset = preset;
  state.timeSignature = preset.timeSignature;
  state.beats = (preset.timeSignature === "12/8" || preset.timeSignature === "6/8") ? 2 : (preset.beats || 4);
  state.bpm = preset.tempo || 110;
  state.swing = preset.swing || 0;

  // Initialize custom swing offsets for all subdivisions
  state.customSwingOffsets = {
    2: [0, 0],
    3: [0, 0, 0],
    4: [0, 0, 0, 0],
    6: [0, 0, 0, 0, 0, 0]
  };

  if (preset.customSwingOffsets) {
    if (Array.isArray(preset.customSwingOffsets)) {
      const subdiv = (preset.timeSignature === "12/8" || preset.timeSignature === "6/8") ? 6 : 4;
      state.customSwingOffsets[subdiv] = [...preset.customSwingOffsets];
      if (state.customSwingOffsets[subdiv].length < subdiv) {
        const diff = subdiv - state.customSwingOffsets[subdiv].length;
        for (let j = 0; j < diff; j++) {
          state.customSwingOffsets[subdiv].push(preset.customSwingOffsets[preset.customSwingOffsets.length - 1] || 0);
        }
      }
    } else {
      state.customSwingOffsets = JSON.parse(JSON.stringify(preset.customSwingOffsets));
    }
  } else {
    [2, 3, 4, 6].forEach(s => applyGlobalSwingToOffsets(s, state.swing));
  }

  // Sync UI controls
  state.humaniseTime = 40;
  state.humanisePitch = 20;
  state.humaniseVolume = 40;
  synth.humanisePitch = 20;
  bpmRange.value = state.bpm;
  bpmVal.textContent = state.bpm;
  swingRange.value = state.swing;
  swingVal.textContent = state.swing + "%";
  humaniseRange.value = 33;
  humaniseVal.textContent = "33%";
  humaniseTimeRange.value = 40;
  humaniseTimeVal.textContent = "40%";
  humanisePitchRange.value = 20;
  humanisePitchVal.textContent = "20%";
  humaniseVolumeRange.value = 40;
  humaniseVolumeVal.textContent = "40%";

  // Map tracks
  state.tracks = [];
  state.customDjembeCount = 0;
  state.customKenkeniCount = 0;
  state.customSangbanCount = 0;
  state.customDundunbaCount = 0;
  state.customShekereCount = 0;

  // Clone variations to avoid mutating the preset object directly
  state.currentVariations = preset.variations ? JSON.parse(JSON.stringify(preset.variations)) : {};

  // Separate break/intro tracks (special_1+) from main tracks
  state.currentBreaks = [];

  // Group and convert alternative tracks dynamically
  const tracksToProcess = { ...preset.tracks };

  // Extract special_0 (and other call/intro tracks) and store in state.presetCallData
  state.presetCallData = null;
  Object.keys(tracksToProcess).forEach(key => {
    const trackData = tracksToProcess[key];
    const nameLC = (trackData.name || "").toLowerCase();
    const isCall = key === "special_0" || nameLC.includes("call");
    if (isCall) {
      let callSteps = [...trackData.steps];
      let callSubdiv = trackData.subdivision || 6;
      if ((preset.timeSignature === "12/8" || preset.timeSignature === "6/8") && callSubdiv === 3) {
        const doubled = [];
        callSteps.forEach(step => {
          doubled.push(step);
          doubled.push("");
        });
        callSteps = doubled;
        callSubdiv = 6;
      }
      // Clean step characters for call tracks
      callSteps = callSteps.map(step => step === 'X' ? 'C' : step);
      // Call tracks should only ever be 1 row, truncated to stepsPerLine if too long
      const stepsPerLine = ((preset.timeSignature === "12/8" || preset.timeSignature === "6/8") ? 2 : (preset.beats || 4)) * callSubdiv;
      if (callSteps.length > stepsPerLine) {
        callSteps = callSteps.slice(0, stepsPerLine);
      }
      state.presetCallData = {
        id: key,
        name: trackData.name,
        steps: callSteps,
        subdivision: callSubdiv
      };
      delete tracksToProcess[key];
    }
  });

  // Extract special_1+ as breaks/intros
  Object.keys(tracksToProcess).forEach(key => {
    if (key.startsWith("special_")) {
      const trackData = tracksToProcess[key];
      const nameLC = trackData.name.toLowerCase();
      if (nameLC.includes("break") || nameLC.includes("intro")) {
        state.currentBreaks.push({
          id: key,
          name: trackData.name,
          steps: [...trackData.steps],
          subdivision: trackData.subdivision || 6
        });
        delete tracksToProcess[key];
      }
    }
  });
  const varsMap = {};

  Object.keys(tracksToProcess).forEach(key => {
    const match = key.match(/^(kenkeni|sangban|dundunba)_(\d+)(_bell)?$/);
    if (match) {
      const inst = match[1];
      const num = match[2];
      const isBell = !!match[3];

      const mapKey = `${inst}_${num}`;
      if (!varsMap[mapKey]) {
        varsMap[mapKey] = { inst, num, drumKey: null, bellKey: null };
      }

      if (isBell) {
        varsMap[mapKey].bellKey = key;
      } else {
        varsMap[mapKey].drumKey = key;
      }
    }

    // Group Djembe alternative tracks (e.g., djembe1_1, djembe1_2 -> djembe1 variations)
    const matchDjembe = key.match(/^(djembe\d+)_(\d+)$/);
    if (matchDjembe) {
      const inst = matchDjembe[1];
      const num = matchDjembe[2];
      const mapKey = `${inst}_${num}`;
      if (!varsMap[mapKey]) {
        varsMap[mapKey] = { inst, num, drumKey: null, bellKey: null };
      }
      varsMap[mapKey].drumKey = key;
    }
  });

  Object.keys(varsMap).forEach(mapKey => {
    const { inst, num, drumKey, bellKey } = varsMap[mapKey];
    state.currentVariations[inst] = state.currentVariations[inst] || [];

    const drumTrack = drumKey ? tracksToProcess[drumKey] : null;
    const bellTrack = bellKey ? tracksToProcess[bellKey] : null;

    let steps = drumTrack ? [...drumTrack.steps] : [];
    let subdivision = drumTrack ? drumTrack.subdivision : (bellTrack ? bellTrack.subdivision : 6);

    // Double steps if 12/8 time signature and subdivision is 3
    if ((preset.timeSignature === "12/8" || preset.timeSignature === "6/8") && subdivision === 3) {
      const doubledSteps = [];
      steps.forEach(step => {
        doubledSteps.push(step);
        doubledSteps.push("");
      });
      steps = doubledSteps;
      subdivision = 6;
    }

    const variationObj = {
      name: drumTrack ? drumTrack.name : (bellTrack ? bellTrack.name : `Variation ${num}`),
      subdivision: subdivision,
      steps: steps
    };

    if (bellTrack) {
      let bellSteps = [...bellTrack.steps];
      let bellSubdiv = bellTrack.subdivision;
      if ((preset.timeSignature === "12/8" || preset.timeSignature === "6/8") && bellSubdiv === 3) {
        const doubledSteps = [];
        bellSteps.forEach(step => {
          doubledSteps.push(step);
          doubledSteps.push("");
        });
        bellSteps = doubledSteps;
      }
      variationObj.bellSteps = bellSteps;
    }

    // Clean step characters inside the loaded variations
    if (variationObj.steps) {
      variationObj.steps = variationObj.steps.map(step => step === 'X' ? 'C' : step);
    }
    if (variationObj.bellSteps) {
      variationObj.bellSteps = variationObj.bellSteps.map(step => step === 'O' ? 'X' : step);
    }

    state.currentVariations[inst].push(variationObj);

    // Delete from tracks to process so they aren't loaded as separate rows
    if (drumKey) delete tracksToProcess[drumKey];
    if (bellKey) delete tracksToProcess[bellKey];
  });

  // Deduce global subdivision
  if (preset.timeSignature === "12/8" || preset.timeSignature === "6/8") {
    state.globalSubdivision = 6;
  } else {
    state.globalSubdivision = 4;
  }
  if (globalSubdivisionSelect) globalSubdivisionSelect.value = state.globalSubdivision;

  Object.keys(tracksToProcess).forEach(trackKey => {
    const presetTrack = tracksToProcess[trackKey];
    const isCall = trackKey.startsWith("special") ||
      presetTrack.name.toLowerCase().includes("call") ||
      presetTrack.name.toLowerCase().includes("break") ||
      presetTrack.name.toLowerCase().includes("intro");
    let trackName = presetTrack.name.trim();
    const lowerName = trackName.toLowerCase();

    if (isCall) {
      if (lowerName.includes("call")) {
        const idx = lowerName.indexOf("call");
        let base = trackName.substring(0, idx + 4);
        const after = trackName.substring(idx + 4).trim();
        const numMatch = after.match(/^(\d+)/);
        if (numMatch) base += " " + numMatch[1];
        trackName = base;
      } else if (lowerName.includes("break")) {
        const idx = lowerName.indexOf("break");
        let base = trackName.substring(0, idx + 5);
        const after = trackName.substring(idx + 5).trim();
        const numMatch = after.match(/^(\d+)/);
        if (numMatch) base += " " + numMatch[1];
        trackName = base;
      } else if (lowerName.includes("intro")) {
        const idx = lowerName.indexOf("intro");
        let base = trackName.substring(0, idx + 5);
        const after = trackName.substring(idx + 5).trim();
        const numMatch = after.match(/^(\d+)/);
        if (numMatch) base += " " + numMatch[1];
        trackName = base;
      } else {
        trackName = "Call";
      }
    } else {
      // Clean non-call tracks
      // Strip anything in parentheses
      trackName = trackName.replace(/\s*\([^)]*\)/g, "").trim();
      // Strip anything after colons/semicolons
      if (trackName.includes(":")) trackName = trackName.split(":")[0].trim();
      if (trackName.includes(";")) trackName = trackName.split(";")[0].trim();

      const lowerClean = trackName.toLowerCase();
      if (lowerClean.includes("kenkeni")) {
        trackName = lowerClean.includes("bell") ? "Kenkeni Bell" : "Kenkeni";
      } else if (lowerClean.includes("sangban")) {
        trackName = lowerClean.includes("bell") ? "Sangban Bell" : "Sangban";
      } else if (lowerClean.includes("dundunba") || lowerClean.includes("dundun") || lowerClean.includes("dun dun") || lowerClean.includes("dun'dun")) {
        trackName = lowerClean.includes("bell") ? "Dun Dun Bell" : "Dun Dun";
      } else if (lowerClean.includes("djembe") || lowerClean.includes("djembé")) {
        const matchNum = trackName.match(/(?:djembe|djembé)\s*(\d+)/i);
        if (matchNum) {
          trackName = `Djembé ${matchNum[1]}`;
        } else if (!lowerClean.includes("variation") && !lowerClean.includes("solo") && !lowerClean.includes("echauffement")) {
          trackName = "Djembé";
        }
      }
    }
    let type = "dunun";
    if (trackKey.startsWith("djembe") || isCall) {
      type = "djembe";
    } else if (trackKey.endsWith("bell")) {
      type = "bell";
    }

    // Map instrumentation key
    let instrument = "djembe1";
    if (isCall) {
      instrument = "special";
    } else {
      if (trackKey === "djembe_0") instrument = "djembe1";
      if (trackKey === "djembe_1") instrument = "djembe2";
      if (trackKey === "djembe_2") instrument = "djembe3";
      if (trackKey.includes("kenkeni")) instrument = "kenkeni";
      if (trackKey.includes("sangban")) instrument = "sangban";
      if (trackKey.includes("dundunba")) instrument = "dundunba";
      if (trackKey.includes("kenkeni_bell")) instrument = "kenkeni_bell";
      if (trackKey.includes("sangban_bell")) instrument = "sangban_bell";
      if (trackKey.includes("dundunba_bell")) instrument = "dundunba_bell";
    }

    let steps = [...presetTrack.steps];
    let subdivision = presetTrack.subdivision;

    if ((preset.timeSignature === "12/8" || preset.timeSignature === "6/8") && subdivision === 3) {
      const doubledSteps = [];
      steps.forEach(step => {
        doubledSteps.push(step);
        doubledSteps.push(""); // insert empty step to double length/halve speed
      });
      steps = doubledSteps;
      subdivision = 6;
    }

    // Clean step characters for base tracks on load
    const isBell = trackKey.endsWith("bell");
    const isDrum = (instrument === "kenkeni" || instrument === "sangban" || instrument === "dundunba");
    if (isDrum) {
      steps = steps.map(step => step === 'X' ? 'C' : step);
    } else if (isBell) {
      steps = steps.map(step => step === 'O' ? 'X' : step);
    }

    // Call and Break tracks should only ever be 1 row
    if (isCall) {
      const stepsPerLine = state.beats * subdivision;
      if (steps.length > stepsPerLine) {
        steps = steps.slice(0, stepsPerLine);
      }
    }

    state.tracks.push({
      id: trackKey,
      name: trackName,
      type: type,
      instrument: instrument,
      subdivision: subdivision,
      steps: steps,
      originalSteps: [...steps],
      originalSubdivision: subdivision,
      subdivisionSteps: {
        [subdivision]: [...steps]
      },
      volume: 0.8,
      pitch: 0,
      muted: false,
      soloed: false
    });
  });

  // Add default Shekere track with one note per bar (step 0) - limited to 1 row
  const shekereSubdiv = state.globalSubdivision;
  const stepsPerLine = state.beats * shekereSubdiv;
  const shekereSteps = Array(stepsPerLine).fill("");
  const sectionLength = stepsPerLine / 4;
  for (let sec = 0; sec < 4; sec++) {
    const stepIdx = Math.round(sec * sectionLength);
    shekereSteps[stepIdx] = "O";
  }
  state.tracks.push({
    id: "shekere_default",
    name: "Shekere",
    type: "shekere",
    instrument: "shekere",
    subdivision: shekereSubdiv,
    steps: shekereSteps,
    originalSteps: [...shekereSteps],
    originalSubdivision: shekereSubdiv,
    subdivisionSteps: {
      [shekereSubdiv]: [...shekereSteps]
    },
    volume: 0.75,
    pitch: 0,
    muted: false,
    soloed: false
  });

  // Handle Solos row and dedicated Solo Djembe track
  if (preset.solos && preset.solos.length > 0) {
    if (solosControlRow && solosButtonsContainer) {
      solosControlRow.style.display = "flex";
      solosButtonsContainer.innerHTML = "";

      // Populate solo buttons (no solo track is loaded on first load)
      preset.solos.forEach((solo, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.dataset.type = "solo";
        btn.textContent = idx + 1;
        btn.title = solo.name;
        btn.style.minWidth = "28px";
        btn.style.height = "28px";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.fontWeight = "bold";
        btn.style.borderRadius = "6px";
        btn.style.fontSize = "0.75rem";
        btn.style.padding = "0";
        btn.style.flex = "0 0 28px";
        btn.style.cursor = "pointer";

        btn.style.background = "rgba(168, 85, 247, 0.15)";
        btn.style.border = "1px solid rgba(168, 85, 247, 0.35)";
        btn.style.color = "#a855f7";

        btn.addEventListener("click", () => {
          const wasActive = btn.classList.contains("btn-primary") || btn.classList.contains("special-active");
          const action = () => {
            deactivateAllSpecialButtons();
            if (!wasActive) {
              btn.classList.add("btn-primary", "special-active");
              btn.style.background = "";
              btn.style.borderColor = "";

              // Check if solo track exists, if not create and add it
              let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
              if (!soloTrack) {
                soloTrack = {
                  id: "solo_djembe",
                  name: solo.name || "Solo Djembe",
                  type: "djembe",
                  instrument: "djembe1",
                  subdivision: solo.subdivision,
                  steps: [...solo.steps],
                  originalSteps: [...solo.steps],
                  originalSubdivision: solo.subdivision,
                  subdivisionSteps: {
                    [solo.subdivision]: [...solo.steps]
                  },
                  volume: 0.85,
                  pitch: 0,
                  muted: false,
                  soloed: false
                };
                state.tracks.push(soloTrack);
                sortTracks();
              } else {
                // Update existing track steps and subdivision
                soloTrack.name = solo.name || "Solo Djembe";
                soloTrack.subdivision = solo.subdivision;
                soloTrack.steps = [...solo.steps];
                soloTrack.originalSteps = [...solo.steps];
                soloTrack.originalSubdivision = solo.subdivision;
                soloTrack.subdivisionSteps = {
                  [soloTrack.subdivision]: [...solo.steps]
                };
              }
            } else {
              state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
            }
            renderGrid();
          };

          if (state.isPlaying) {
            queueSpecialAction(action, btn);
          } else {
            action();
            if (!wasActive) {
              togglePlay();
            }
          }
        });

        btn.addEventListener("dblclick", () => {
          const updateSolo = () => {
            const soloTrack = state.tracks.find(t => t.id === "solo_djembe");
            if (soloTrack) {
              soloTrack.subdivision = solo.subdivision;
              soloTrack.steps = [...solo.steps];
              soloTrack.originalSteps = [...solo.steps];
              soloTrack.originalSubdivision = solo.subdivision;
              soloTrack.subdivisionSteps = {
                [soloTrack.subdivision]: [...solo.steps]
              };
              renderGrid();
            }
          };
          if (state.isPlaying) {
            state.queuedActions.push(updateSolo);
          } else {
            updateSolo();
          }
        });

        solosButtonsContainer.appendChild(btn);
      });
    }
  } else {
    if (solosControlRow) {
      solosControlRow.style.display = "none";
    }
    // Remove solo_djembe if it exists
    state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
  }

  // Populate Breaks & Intros buttons
  if (state.currentBreaks && state.currentBreaks.length > 0) {
    if (breaksControlRow && breaksButtonsContainer) {
      breaksControlRow.style.display = "flex";
      breaksButtonsContainer.innerHTML = "";

      state.currentBreaks.forEach((brk, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-break";
        // Clean up break name for display
        let displayName = brk.name.trim();
        // Strip parenthetical text
        displayName = displayName.replace(/\s*\([^)]*\)/g, "").trim();
        // Strip text after colon
        if (displayName.includes(":")) displayName = displayName.split(":")[0].trim();

        btn.textContent = displayName;
        btn.title = brk.name;
        btn.style.minWidth = "36px";
        btn.style.height = "36px";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.fontWeight = "bold";
        btn.style.borderRadius = "8px";
        btn.style.fontSize = "0.8rem";
        btn.style.padding = "0.35rem 0.75rem";
        btn.style.background = "rgba(245, 158, 11, 0.15)";
        btn.style.border = "1px solid rgba(245, 158, 11, 0.35)";
        btn.style.color = "#f59e0b";
        btn.style.cursor = "pointer";
        btn.style.transition = "all 0.15s ease";

        btn.addEventListener("mouseenter", () => {
          btn.style.background = "rgba(245, 158, 11, 0.3)";
          btn.style.borderColor = "rgba(245, 158, 11, 0.6)";
        });
        btn.addEventListener("mouseleave", () => {
          if (!btn.classList.contains("break-active")) {
            btn.style.background = "rgba(245, 158, 11, 0.15)";
            btn.style.borderColor = "rgba(245, 158, 11, 0.35)";
          }
        });

        btn.addEventListener("click", () => {
          playBreak(brk, btn);
        });

        breaksButtonsContainer.appendChild(btn);
      });
    }
  } else {
    if (breaksControlRow) {
      breaksControlRow.style.display = "none";
    }
  }

  renderGrid();
  updateSpecialButtonsState(preset);
}

// Rebuild steps array preserving contents where possible
function updateTrackSubdivision(track, newSubdiv) {
  if (!track.subdivisionSteps) {
    track.subdivisionSteps = {
      [track.subdivision]: [...track.steps]
    };
  }

  // Save current steps before changing subdivision
  track.subdivisionSteps[track.subdivision] = [...track.steps];

  if (track.subdivisionSteps[newSubdiv]) {
    // Restore previously cached steps for this subdivision
    track.steps = [...track.subdivisionSteps[newSubdiv]];
    track.subdivision = newSubdiv;
    return;
  }

  const oldSteps = track.steps;
  const oldSubdiv = track.subdivision;
  let numLines = Math.max(1, Math.ceil(oldSteps.length / (state.beats * oldSubdiv)));
  const isCall = track.id.startsWith("special") || track.name.toLowerCase().includes("call") || track.name.toLowerCase().includes("break");
  if (track.type === "shekere" || isCall) {
    numLines = 1;
  }
  const newSize = numLines * state.beats * newSubdiv;
  const newSteps = Array(newSize).fill("");

  // Distribute steps to nearest locations
  for (let i = 0; i < oldSteps.length; i++) {
    if (oldSteps[i] !== "") {
      const beatPercent = i / oldSteps.length;
      const targetIndex = Math.round(beatPercent * newSize);
      if (targetIndex < newSize) {
        newSteps[targetIndex] = oldSteps[i];
      }
    }
  }

  // For shekere, let's make sure there is one note per section (4 per line)
  if (track.type === "shekere") {
    const stepsPerLine = state.beats * newSubdiv;
    const sectionLength = stepsPerLine / 4;
    for (let l = 0; l < numLines; l++) {
      for (let sec = 0; sec < 4; sec++) {
        const stepIdx = l * stepsPerLine + Math.round(sec * sectionLength);
        if (newSteps[stepIdx] === "") {
          newSteps[stepIdx] = "O";
        }
      }
    }
  }

  track.subdivision = newSubdiv;
  track.steps = newSteps;
  track.subdivisionSteps[newSubdiv] = [...newSteps];
}

// Play / Pause sequencer trigger
function togglePlay() {
  btnPlay.classList.add("play-btn-pop");
  btnPlay.addEventListener("animationend", () => {
    btnPlay.classList.remove("play-btn-pop");
  }, { once: true });

  synth.init();
  if (state.isPlaying) {
    // STOP
    state.isPlaying = false;
    state.callIntroActive = false;
    state.queuedActions = [];
    clearInterval(timerId);
    btnPlay.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 21 12 5 21 5 3"/></svg>`;
    btnPlay.classList.remove("btn-danger-round");


    // Hide Playhead
    const playhead = document.querySelector(".playhead-line");
    if (playhead) playhead.classList.remove("active");

    state.currentEpoch = 0;
    updateStepPositions();
    updateCellScales();
  } else {
    // PLAY
    synth.resume();
    state.isPlaying = true;
    btnPlay.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`;
    btnPlay.classList.add("btn-danger-round");

    if (!state.callIntroActive) {
      const hasCall = state.tracks.some(t => {
        const isCall = t.id.startsWith("special") ||
          t.name.toLowerCase().includes("call") ||
          t.name.toLowerCase().includes("break") ||
          t.name.toLowerCase().includes("intro");
        return isCall && t.steps.some(step => step !== "");
      });
      state.callIntroActive = hasCall;
    }

    // Unmute call tracks at the start so they play during the intro
    if (state.callIntroActive) {
      state.tracks.forEach(t => {
        const isCall = t.id === "solo_djembe" ||
          t.id.startsWith("special") ||
          t.name.toLowerCase().includes("call") ||
          t.name.toLowerCase().includes("break") ||
          t.name.toLowerCase().includes("intro");
        if (isCall) t.muted = false;
      });
    }


    // Setup lookahead parameters
    nextTickToSchedule = 0;
    playbackStartTime = synth.ctx.currentTime + 0.05;
    nextTickTime = playbackStartTime;

    // Activate playhead line visual
    const playhead = document.querySelector(".playhead-line");
    if (playhead) playhead.classList.add("active");

    timerId = setInterval(scheduler, scheduleInterval);
  }
}

function triggerCall() {
  if (!state.presetCallData) {
    console.log("No call data for this rhythm.");
    return;
  }

  const action = () => {
    // Ensure the solo_djembe track exists in state.tracks
    let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
    if (!soloTrack) {
      soloTrack = {
        id: "solo_djembe",
        name: "Solo Djembe",
        type: "djembe",
        instrument: "djembe1",
        volume: 0.85,
        pitch: 0,
        muted: false,
        soloed: false
      };
      state.tracks.push(soloTrack);
      sortTracks();
    }

    // Set the Call steps and subdivision
    soloTrack.subdivision = state.presetCallData.subdivision;
    soloTrack.steps = [...state.presetCallData.steps];
    soloTrack.originalSteps = [...state.presetCallData.steps];
    soloTrack.originalSubdivision = state.presetCallData.subdivision;
    soloTrack.subdivisionSteps = {
      [soloTrack.subdivision]: [...soloTrack.steps]
    };

    // Activate call intro
    state.callIntroActive = true;

    // Unmute call tracks at the start so they play during the intro
    state.tracks.forEach(t => {
      const isCall = t.id === "solo_djembe" ||
        t.id.startsWith("special") ||
        t.name.toLowerCase().includes("call") ||
        t.name.toLowerCase().includes("break") ||
        t.name.toLowerCase().includes("intro");
      if (isCall) t.muted = false;
    });

    renderGrid();
  };

  if (!state.isPlaying) {
    action();
    togglePlay(); // This starts the sequencer playhead
  } else {
    callQueuedFlag = true;
    state.queuedActions.push(() => { callQueuedFlag = false; action(); });
  }
}

function triggerEchauffement() {
  const isNewFormat = !!(state.currentPreset && (state.currentPreset.rhythm_name || Array.isArray(state.currentPreset.tracks)));
  if (isNewFormat) {
    toggleEchauffementNew();
    return;
  }
  // 1. Search in currentPreset solos
  let echSolo = null;
  if (state.currentPreset && state.currentPreset.solos) {
    echSolo = state.currentPreset.solos.find(s =>
      s.name.toLowerCase().includes("echauffement") ||
      s.name.toLowerCase().includes("échauffement")
    );
  }

  // 2. Fallback to generic rapid slap roll if none defined
  if (!echSolo) {
    const isTernary = state.timeSignature === "12/8" || state.timeSignature === "6/8";
    const subdiv = isTernary ? 6 : 4;
    const stepsCount = subdiv * state.beats;
    const steps = Array(stepsCount).fill("").map((_, idx) => (idx % 2 === 0 ? "S" : "T")); // alternating Slap and Tone roll
    echSolo = {
      name: "Échauffement (Generic Roll)",
      subdivision: subdiv,
      steps: steps
    };
  }

  // 3. Toggle logic on solo_djembe track
  let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
  const isCurrentlyPlayingThis = soloTrack &&
    soloTrack.name === "Échauffement" &&
    JSON.stringify(soloTrack.steps) === JSON.stringify(echSolo.steps);

  // Clear primary/active classes on other solo buttons if we have a solos row
  const solosContainer = document.getElementById("solos-buttons-container");
  if (solosContainer) {
    Array.from(solosContainer.children).forEach(child => {
      child.classList.remove("btn-primary");
    });
  }

  const echBtn = document.getElementById("btn-trigger-echauffement");

  if (isCurrentlyPlayingThis) {
    // Toggle off: remove solo track
    const action = () => {
      state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
      state.echPlaying = false;
      renderGrid();
    };
    if (state.isPlaying) {
      echQueuedFlag = true;
      state.queuedActions.push(() => { echQueuedFlag = false; action(); });
    } else {
      action();
    }
  } else {

    const action = () => {
      let soloTrack = state.tracks.find(t => t.id === "solo_djembe");
      if (!soloTrack) {
        soloTrack = {
          id: "solo_djembe",
          name: "Échauffement",
          type: "djembe",
          instrument: "djembe1",
          volume: 0.85,
          pitch: 0,
          muted: false,
          soloed: false
        };
        state.tracks.push(soloTrack);
        sortTracks();
      } else {
        soloTrack.name = "Échauffement";
      }

      soloTrack.subdivision = echSolo.subdivision;
      soloTrack.steps = [...echSolo.steps];
      soloTrack.originalSteps = [...echSolo.steps];
      soloTrack.originalSubdivision = echSolo.subdivision;
      soloTrack.subdivisionSteps = {
        [soloTrack.subdivision]: [...soloTrack.steps]
      };
      state.echPlaying = true;
      renderGrid();
    };

    if (!state.isPlaying) {
      action();
      togglePlay();
    } else {
      echQueuedFlag = true;
      state.queuedActions.push(() => { echQueuedFlag = false; action(); });
    }
  }
}

// Scheduler checking ticks
function scheduler() {
  while (nextTickTime < synth.ctx.currentTime + lookahead) {
    scheduleTick(nextTickToSchedule, nextTickTime);
    advanceTick();
  }
}

// Helper: compute seconds-per-beat, correcting for compound meters (12/8, 6/8)
// In compound time each code "beat" spans 2 musical pulses, so we double the duration.
function getSecondsPerBeat() {
  const raw = 60.0 / state.bpm;
  if (state.timeSignature === "12/8" || state.timeSignature === "6/8") {
    return raw * 2;
  }
  return raw;
}

// Move scheduler ahead by 1 tick (1/12th beat)
function advanceTick() {
  const secondsPerBeat = getSecondsPerBeat();
  const secondsPerTick = secondsPerBeat / 12;

  nextTickTime += secondsPerTick;
  nextTickToSchedule++;

  if (state.callIntroActive) {
    const callTrack = state.tracks.find(t =>
      t.id === "solo_djembe" ||
      t.id.startsWith("special") ||
      t.name.toLowerCase().includes("call") ||
      t.name.toLowerCase().includes("break") ||
      t.name.toLowerCase().includes("intro")
    );
    if (callTrack) {
      const callLengthTicks = callTrack.steps.length * (12 / callTrack.subdivision);
      if (nextTickToSchedule >= callLengthTicks) {
        state.callIntroActive = false;
        nextTickToSchedule = 0;

        if (callTrack.id === "solo_djembe") {
          state.tracks = state.tracks.filter(t => t.id !== "solo_djembe");
          renderGrid();
        } else {
          // Auto-mute call tracks after intro completes (user can unmute)
          state.tracks.forEach(t => {
            const isCt = t.id.startsWith("special") ||
              t.name.toLowerCase().includes("call") ||
              t.name.toLowerCase().includes("break") ||
              t.name.toLowerCase().includes("intro");
            if (isCt) {
              t.muted = true;
              const row = document.querySelector(`.track-row[data-track-id="${t.id}"]`);
              if (row) {
                const muteBtn = row.querySelector('.track-btn.mute');
                if (muteBtn) {
                  muteBtn.classList.add('active');
                }
              }
            }
          });
          updateMuteSoloVisuals();
        }
      }
    } else {
      state.callIntroActive = false;
    }
  }
}

// Deterministic hash to generate stable visual/audio humanisation offsets per cell
function getCellRandomSeed(trackId, stepIdx, epoch = 0) {
  const str = `${trackId}_${stepIdx}_${epoch}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // MurmurHash3 fmix32 finalizer to scatter bits completely
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;

  return ((Math.abs(hash) % 1000) / 1000) - 0.5;
}

// Calculate cell pitch brightness (comprising baseline track tuning + humanised timing offset)
function calculatePitchBrightness(track, stepIdx, epoch) {
  if (!track) return 1.0;
  const basePitch = track.pitch || 0;
  let humaniseOffset = 0;
  if (state.humanisePitch > 0) {
    const seedOffset = getCellRandomSeed(track.id, stepIdx, epoch);
    const scaleMultiplier = track.type === "djembe" ? 2.0 : (track.type === "shekere" ? 0.1 : 1.0);
    humaniseOffset = seedOffset * (state.humanisePitch / 100) * scaleMultiplier;
  }
  const brightness = 1.0 + (basePitch / 6) * 0.48 + (humaniseOffset * 0.28);
  return Math.max(0.15, Math.min(1.85, brightness));
}

// Check swing timings
function getSwungStepTime(beatIndex, stepInBeat, subdivision, beatDuration, swingPercent, isVisual = false) {
  let relativeBeatOffset = stepInBeat / subdivision;
  const visualScale = isVisual ? 0.5 : 1.0;

  // Apply custom step offsets (which now represent both global swing and custom adjustments)
  if (state.customSwingOffsets && state.customSwingOffsets[subdivision]) {
    const offsets = state.customSwingOffsets[subdivision];
    if (offsets[stepInBeat] !== undefined) {
      const offsetPercent = offsets[stepInBeat] * visualScale; // value from -50 to +50 scaled visually
      const stepWidth = 1 / subdivision;
      relativeBeatOffset += (offsetPercent / 100) * stepWidth;
    }
  }

  let timeInBeats = beatIndex + relativeBeatOffset;

  // Apply swing offsets from groove_modifiers
  if (state.currentPreset && state.currentPreset.groove_modifiers && state.currentPreset.groove_modifiers.swing_offsets) {
    const offsets = state.currentPreset.groove_modifiers.swing_offsets;
    if (offsets.length > 0) {
      const offsetIndex = stepInBeat % offsets.length;
      const offsetVal = (offsets[offsetIndex] || 0) * visualScale;

      // Convert offsetVal (ms) to beats
      const secondsPerBeat = getSecondsPerBeat();
      const offsetInBeats = (offsetVal / 1000) / secondsPerBeat;
      timeInBeats += offsetInBeats;
    }
  }

  return timeInBeats * beatDuration;
}

// Filter track audits (Mute/Solo logic)
function isTrackAudible(track) {
  // During call intro phase, only call tracks play
  if (state.callIntroActive) {
    const isCall = track.id === "solo_djembe" ||
      track.id.startsWith("special") ||
      track.name.toLowerCase().includes("call") ||
      track.name.toLowerCase().includes("break") ||
      track.name.toLowerCase().includes("intro");
    if (!isCall) return false;
  }

  const hasSolo = state.tracks.some(t => t.soloed);
  if (hasSolo) {
    return track.soloed && !track.muted;
  }
  return !track.muted;
}

// Update track rows and container classes for Mute and Solo visuals
function updateMuteSoloVisuals() {
  const hasSolo = state.tracks.some(t => t.soloed);
  const sequencerGrid = document.getElementById("sequencer-grid");
  if (sequencerGrid) {
    if (hasSolo) {
      sequencerGrid.classList.add("has-solo");
    } else {
      sequencerGrid.classList.remove("has-solo");
    }
  }

  state.tracks.forEach(track => {
    const row = document.querySelector(`.track-row[data-track-id="${track.id}"]`);
    if (row) {
      if (track.muted) {
        row.classList.add("muted-track");
      } else {
        row.classList.remove("muted-track");
      }

      if (track.soloed) {
        row.classList.add("soloed-track");
      } else {
        row.classList.remove("soloed-track");
      }
    }
  });
}

// Schedule audio hits for specific ticks
function scheduleTick(tickIndex, time) {
  if (state.queuedActions && state.queuedActions.length > 0) {
    const maxLines = Math.max(1, ...state.tracks.map(t => Math.ceil(t.steps.length / (state.beats * t.subdivision))));
    const totalBeatsInLoop = maxLines * state.beats;
    if (tickIndex % (totalBeatsInLoop * 12) === 0) {
      while (state.queuedActions.length > 0) {
        const action = state.queuedActions.shift();
        action();
      }
    }
  }
  const secondsPerBeat = getSecondsPerBeat();
  const tickInBeat = tickIndex % 12;
  const beatIndex = Math.floor(tickIndex / 12);

  const elapsedBeats = Math.floor(tickIndex / 12);
  const maxLines = Math.max(1, ...state.tracks.map(t => Math.ceil(t.steps.length / (state.beats * t.subdivision))));
  const totalBeatsInLoop = maxLines * state.beats;
  const seedEpoch = 0; // fixed humanise seed: micro-variations stay consistent between passes
  const currentBeatInLoop = beatIndex % totalBeatsInLoop;

  state.tracks.forEach(track => {
    const ticksPerStep = 12 / track.subdivision;

    // Check if this track contains a step at this tick
    if (tickInBeat % ticksPerStep === 0) {
      const stepInBeat = tickInBeat / ticksPerStep;
      const totalSteps = track.steps.length;
      const stepIndex = (currentBeatInLoop * track.subdivision + stepInBeat) % totalSteps;
      const val = track.steps[stepIndex];

      if (val && val !== "") {
        // Calculate exact swung timing relative to beat start
        const beatStartTime = time - tickInBeat * (secondsPerBeat / 12);
        const swungOffset = getSwungStepTime(0, stepInBeat, track.subdivision, secondsPerBeat, state.swing);
        let hitTime = beatStartTime + swungOffset;

        // Apply humanise micro-timing offsets (deterministic per note to match visual grid)
        if (state.humaniseTime > 0) {
          const maxOffset = 0.0175; // max 17.5ms offset (looser, musical feel at 100%)
          const seedOffset = getCellRandomSeed(track.id, stepIndex, seedEpoch);
          const randomOffset = seedOffset * (state.humaniseTime / 100) * maxOffset;
          hitTime += randomOffset;
        }

        // Only trigger audio if audible
        let velocity = track.volume;
        if (state.humaniseVolume > 0) {
          const seedOffset = getCellRandomSeed(track.id, stepIndex, seedEpoch);
          const volOffset = seedOffset * (state.humaniseVolume / 100) * 0.65;
          velocity = Math.max(0.05, Math.min(1.2, velocity + volOffset));
        }

        let pitch = track.pitch || 0;
        if (state.humanisePitch > 0) {
          const seedOffset = getCellRandomSeed(track.id, stepIndex, seedEpoch);
          let scaleMultiplier = 0.8;
          if (track.type === "dunun") scaleMultiplier = 0.6;
          else if (track.type === "bell") scaleMultiplier = 0.25;
          else if (track.type === "shekere") scaleMultiplier = 0.4;

          pitch += seedOffset * (state.humanisePitch / 100) * scaleMultiplier;
        }

        if (isTrackAudible(track)) {
          const stepDuration = secondsPerBeat / track.subdivision;
          // Alternate Left and Right hand samples on successive steps
          const hand = (stepIndex % 2 === 0) ? "L" : "R";
          triggerSynthHit(track.type, track.instrument, val, hitTime, velocity, pitch, stepDuration, hand);
        }

        // Schedule visual flash on step grid cell
        const delayMs = (hitTime - synth.ctx.currentTime) * 1000;
        setTimeout(() => {
          triggerStepVisualFlash(track.id, stepIndex, velocity);
        }, Math.max(0, delayMs));
      }
    }
  });
}

// Sound triggering routing
function triggerSynthHit(type, instrument, hitVal, playTime, trackVol, trackPitch = 0, stepDuration = 0.15, hand = "L") {
  if (hitVal.includes("/")) {
    const [h1, h2] = hitVal.split("/");
    triggerSynthHit(type, instrument, h1, playTime, trackVol * 0.6, trackPitch, stepDuration, hand);
    triggerSynthHit(type, instrument, h2, playTime + 0.025, trackVol, trackPitch, stepDuration, hand === "L" ? "R" : "L");
    return;
  }

  if (hitVal.includes("-")) {
    const [h1, h2] = hitVal.split("-");
    triggerSynthHit(type, instrument, h1, playTime, trackVol, trackPitch, stepDuration, hand);
    triggerSynthHit(type, instrument, h2, playTime + stepDuration / 2, trackVol, trackPitch, stepDuration, hand === "L" ? "R" : "L");
    return;
  }

  if (hitVal.includes("*")) {
    const [h1, h2, h3] = hitVal.split("*");
    triggerSynthHit(type, instrument, h1, playTime, trackVol, trackPitch, stepDuration, hand);
    triggerSynthHit(type, instrument, h2, playTime + stepDuration / 3, trackVol, trackPitch, stepDuration, hand === "L" ? "R" : "L");
    triggerSynthHit(type, instrument, h3, playTime + (2 * stepDuration) / 3, trackVol, trackPitch, stepDuration, hand);
    return;
  }

  if (type === "djembe") {
    synth.playDjembe(hitVal, playTime, trackVol, instrument, trackPitch, hand);
  } else if (type === "bell") {
    synth.playBell(instrument, hitVal, playTime, trackVol * 0.95, trackPitch);
  } else if (type === "shekere") {
    synth.playShekere(hitVal, playTime, trackVol, trackPitch);
  } else {
    synth.playDunun(instrument, hitVal, playTime, trackVol, trackPitch, hand);
  }
}

// Step Flash Animation using performant hardware-accelerated Web Animations API
function triggerStepVisualFlash(trackId, stepIndex, velocity = 1.0) {
  const cell = getCachedCell(trackId, stepIndex);
  if (cell) {
    const track = state.tracks.find(t => t.id === trackId);
    const subdivFactor = (track && (state.beats * track.subdivision > 16)) ? 0.65 : 1.0;

    // Scale and glow to match the actual played velocity (with subdivision size correction)
    const playedScale = (0.7 + velocity * 0.4) * subdivFactor;
    const pitchBrightness = track ? calculatePitchBrightness(track, stepIndex, state.currentEpoch || 0) : 1.0;

    // Determine the base (idle) scale/brightness we will return to after flash
    let finalVol = velocity;
    if (track) {
      finalVol = track.volume;
      if (state.humaniseVolume > 0) {
        const epoch = state.currentEpoch || 0;
        const seedOffset = getCellRandomSeed(track.id, stepIndex, epoch);
        const volOffset = seedOffset * (state.humaniseVolume / 100) * 0.65;
        finalVol = Math.max(0.05, Math.min(1.2, finalVol + volOffset));
      }
    }
    const baselineScale = (0.7 + finalVol * 0.4) * subdivFactor;
    const finalBrightness = track ? calculatePitchBrightness(track, stepIndex, state.currentEpoch || 0) : 1.0;

    // Apply base variables to style
    cell.style.setProperty("--vel-scale", finalVol);
    cell.style.setProperty("--current-scale", baselineScale);
    cell.style.setProperty("--pitch-brightness", finalBrightness);
    cell.style.transform = `translateY(-50%) scale(${baselineScale})`;

    // Run hardware-accelerated compositor animation to flash the note
    cell.animate([
      {
        transform: `translateY(-50%) scale(${playedScale * 1.25})`,
        filter: `brightness(${pitchBrightness * 1.7})`
      },
      {
        transform: `translateY(-50%) scale(${baselineScale})`,
        filter: `brightness(${finalBrightness})`
      }
    ], {
      duration: 250,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    });
  }
}

// --- Call / Échauffement state sync -----------------------------------------
let callQueuedFlag = false;
let echQueuedFlag = false;
let lastPartHighlightKey = null;

function isEchTrack(track) {
  return !!track.standardSteps ||
    (track.id === "solo_djembe" && track.name.toLowerCase().includes("chauffement"));
}

// Buttons: flash while queued, solid colour while the part is playing
function syncPartButtonStates() {
  if (!state.isPlaying && (callQueuedFlag || echQueuedFlag)) {
    callQueuedFlag = false;
    echQueuedFlag = false;
  }
  const callBtn = document.getElementById("btn-trigger-call");
  const echBtn = document.getElementById("btn-trigger-echauffement");
  if (callBtn) {
    callBtn.classList.toggle("btn-part-queued", callQueuedFlag);
    callBtn.classList.toggle("btn-call-on", !callQueuedFlag && !!state.callIntroActive);
  }
  if (echBtn) {
    echBtn.classList.toggle("btn-part-queued", echQueuedFlag);
    echBtn.classList.toggle("btn-ech-on", !echQueuedFlag && !!state.echPlaying);
  }
}

// Rows: instruments playing the call/échauffement adopt its colour
function syncPartRowHighlights() {
  const key = (state.callIntroActive ? "C" : "") + (state.echPlaying ? "E" : "");
  if (key === lastPartHighlightKey) return;
  lastPartHighlightKey = key;
  document.querySelectorAll(".track-row").forEach(row => {
    const id = row.getAttribute("data-track-id");
    const track = state.tracks.find(t => t.id === id);
    if (!track) return;
    const isCallTrack = track.id === "solo_djembe" ||
      track.id.startsWith("special") ||
      track.name.toLowerCase().includes("call") ||
      track.name.toLowerCase().includes("break") ||
      track.name.toLowerCase().includes("intro");
    row.classList.toggle("part-call-active", !!state.callIntroActive && isCallTrack && !isEchTrack(track));
    row.classList.toggle("part-ech-active", !!state.echPlaying && isEchTrack(track));
  });
}

// Animate playhead position smoothly
function animatePlayhead() {
  if (state.isPlaying && synth.ctx) {
    const secondsPerBeat = getSecondsPerBeat();
    const secondsPerTick = secondsPerBeat / 12;
    const prevTickTime = nextTickTime - secondsPerTick;

    // Calculate fractional tick position based on the audio context clock
    const elapsedTicksSincePrev = (synth.ctx.currentTime - prevTickTime) / secondsPerTick;
    const currentTick = (nextTickToSchedule - 1) + elapsedTicksSincePrev;

    // Humanise seed is fixed (epoch 0): no re-randomisation between passes

    // Use cached steps-containers (rebuilt on each renderGrid) instead of querying every frame
    const containers = cachedStepContainers.length ? cachedStepContainers : document.querySelectorAll(".steps-container");
    containers.forEach(container => {
      const trackId = container.getAttribute("data-track-id");
      const lineIdx = parseInt(container.getAttribute("data-line-index") || 0);
      const track = state.tracks.find(t => t.id === trackId);
      if (track) {
        const stepsPerLine = state.beats * track.subdivision;
        const totalSteps = track.steps.length;
        const trackNumLines = Math.ceil(totalSteps / stepsPerLine);

        // The track loops at trackNumLines * state.beats
        const ticksInTrackLoop = trackNumLines * state.beats * 12;
        const trackCurrentTick = currentTick >= 0 ? (currentTick % ticksInTrackLoop) : 0;

        // Find which line is active for this track
        const activeLineIdx = Math.floor((trackCurrentTick / 12) / state.beats);

        const playheadLine = container.querySelector(".playhead-line");
        if (playheadLine) {
          let showPlayhead = (lineIdx === activeLineIdx);

          // During call intro, only show playhead on call tracks
          if (state.callIntroActive) {
            const isCall = track.id === "solo_djembe" ||
              track.id.startsWith("special") ||
              track.name.toLowerCase().includes("call") ||
              track.name.toLowerCase().includes("break") ||
              track.name.toLowerCase().includes("intro");
            showPlayhead = isCall && (lineIdx === activeLineIdx);
          }

          if (showPlayhead) {
            playheadLine.classList.add("active");
            // Progress within this line (0 to 1)
            const tickInLine = trackCurrentTick % (state.beats * 12);
            const progress = tickInLine / (state.beats * 12);
            const lineWidth = container._phWidth || (container._phWidth = container.offsetWidth);
            const stepsPerLineCount = state.beats * track.subdivision;
            const curStepInLine = Math.min(stepsPerLineCount - 1, Math.floor(progress * stepsPerLineCount));

            // Pulse the step box the playhead is passing over (brighter + slightly larger)
            if (container._pulseStep !== curStepInLine) {
              container._pulseStep = curStepInLine;
              if (container._pulseCell) container._pulseCell.classList.remove("ph-pass");
              const pulseCell = cellCache.get(trackId + ":" + (lineIdx * stepsPerLineCount + curStepInLine));
              if (pulseCell) {
                pulseCell.classList.add("ph-pass");
                container._pulseCell = pulseCell;
              } else {
                container._pulseCell = null;
              }
            }

            if (!perfLite) {
              // Full mode: GPU-composited glide, updated every frame (transform = no layout)
              playheadLine.style.transform = `translate3d(${progress * lineWidth}px, 0, 0)`;
            } else {
              // Slower device performance mode: highlight whole beat groups instead of animating the playhead line
              const is12or6 = (state.timeSignature === "12/8" || state.timeSignature === "6/8");
              const beatInterval = (is12or6 && track.subdivision === 6) ? 3 : track.subdivision;
              const curBeatInLine = Math.floor(curStepInLine / beatInterval);
              
              if (container._currentHighlightBeat !== curBeatInLine) {
                // Clear previous highlights
                if (container._highlightedCells) {
                  container._highlightedCells.forEach(cell => cell.classList.remove("current-beat-highlight"));
                }
                
                // Add highlights to current beat's step cells
                const newHighlighted = [];
                const startIndex = curBeatInLine * beatInterval;
                const endIndex = Math.min(stepsPerLineCount, startIndex + beatInterval);
                for (let i = startIndex; i < endIndex; i++) {
                  const cell = cellCache.get(trackId + ":" + (lineIdx * stepsPerLineCount + i));
                  if (cell) {
                    cell.classList.add("current-beat-highlight");
                    newHighlighted.push(cell);
                  }
                }
                container._highlightedCells = newHighlighted;
                container._currentHighlightBeat = curBeatInLine;
              }
            }
            container.classList.add("active-line");
            container.classList.remove("dim-line");
          } else {
            playheadLine.classList.remove("active");
            playheadLine._liteStep = undefined;
            container.classList.remove("active-line");
            // Dim the lines of this part that are not currently playing (multi-row parts only)
            container.classList.toggle("dim-line", state.isPlaying && trackNumLines > 1);
            if (container._pulseCell) {
              container._pulseCell.classList.remove("ph-pass");
              container._pulseCell = null;
              container._pulseStep = undefined;
            }
            if (container._highlightedCells) {
              container._highlightedCells.forEach(cell => cell.classList.remove("current-beat-highlight"));
              container._highlightedCells = null;
              container._currentHighlightBeat = undefined;
            }
          }
        }
      }
    });
  } else {
    // If not playing, hide all playhead lines and active line highlights
    const idleContainers = cachedStepContainers.length ? cachedStepContainers : Array.from(document.querySelectorAll(".steps-container"));
    idleContainers.forEach(container => {
      const playhead = container.querySelector(".playhead-line");
      if (playhead) {
        playhead.classList.remove("active");
        playhead._liteStep = undefined;
      }
      container.classList.remove("active-line");
      container.classList.remove("dim-line");
      if (container._pulseCell) {
        container._pulseCell.classList.remove("ph-pass");
        container._pulseCell = null;
        container._pulseStep = undefined;
      }
      if (container._highlightedCells) {
        container._highlightedCells.forEach(cell => cell.classList.remove("current-beat-highlight"));
        container._highlightedCells = null;
        container._currentHighlightBeat = undefined;
      }
    });
  }



  syncPartButtonStates();
  syncPartRowHighlights();

  requestAnimationFrame(animatePlayhead);
}

// Update step layout positions dynamically based on current swing warping and timing humanisation
function updateStepPositions() {
  const epoch = state.currentEpoch || 0;

  state.tracks.forEach(track => {
    const stepsPerLine = state.beats * track.subdivision;
    track.steps.forEach((val, stepIdx) => {
      const cell = getCachedCell(track.id, stepIdx);
      if (cell) {
        const stepInLine = stepIdx % stepsPerLine;
        const beatIndex = Math.floor(stepInLine / track.subdivision);
        const stepInBeat = stepInLine % track.subdivision;
        const swungBeat = getSwungStepTime(beatIndex, stepInBeat, track.subdivision, 1.0, state.swing, true);

        let humaniseOffset = 0;
        if (state.humaniseTime > 0 && val !== "") {
          const secondsPerBeat = getSecondsPerBeat();
          const maxOffset = 0.0175; // max 17.5ms offset in seconds
          const seedOffset = getCellRandomSeed(track.id, stepIdx, epoch);
          const timingOffsetInSeconds = seedOffset * (state.humaniseTime / 100) * maxOffset;
          // Convert timing offset from seconds to beats
          humaniseOffset = timingOffsetInSeconds / secondsPerBeat;
        }

        const percent = ((swungBeat + humaniseOffset) / state.beats) * 100;
        cell.style.setProperty("--step-time-percent", `${percent}%`);
      }
    });

    // Dynamically update beat markers to remain exactly centered between steps when swing changes
    const numLines = Math.max(1, Math.ceil(track.steps.length / stepsPerLine));
    for (let l = 0; l < numLines; l++) {
      const stepsContainer = document.querySelector(`.steps-container[data-track-id="${track.id}"][data-line-index="${l}"]`);
      if (stepsContainer) {
        const markers = stepsContainer.querySelectorAll(".beat-marker");
        if (markers.length > 0) {
          const boundaries = (state.timeSignature === "12/8" || state.timeSignature === "6/8")
            ? [0.5, 1.0, 1.5]
            : Array.from({ length: state.beats - 1 }, (_, idx) => idx + 1);

          const stepTimes = [];
          for (let stepInLine = 0; stepInLine < stepsPerLine; stepInLine++) {
            const beatIndex = Math.floor(stepInLine / track.subdivision);
            const stepInBeat = stepInLine % track.subdivision;
            stepTimes.push(getSwungStepTime(beatIndex, stepInBeat, track.subdivision, 1.0, state.swing, true));
          }

          boundaries.forEach((b, idx) => {
            let idxLast = -1;
            let idxFirst = -1;
            for (let i = 0; i < stepTimes.length; i++) {
              if (stepTimes[i] < b) {
                idxLast = i;
              }
              if (stepTimes[i] >= b && idxFirst === -1) {
                idxFirst = i;
              }
            }

            if (idxLast !== -1 && idxFirst !== -1 && markers[idx]) {
              const tLast = stepTimes[idxLast];
              const tFirst = stepTimes[idxFirst];
              const tMid = (tLast + tFirst) / 2;
              const leftPercent = (tMid / state.beats) * 100;
              markers[idx].style.left = `calc(${leftPercent}% + 7px)`;
            }
          });
        }
      }
    }
  });
}

// Update sizes of note cells to match track volume & humanise volume
function updateCellScales() {
  const epoch = state.currentEpoch || 0;

  state.tracks.forEach(track => {
    const subdivFactor = (state.beats * track.subdivision > 16) ? 0.65 : 1.0;
    track.steps.forEach((val, stepIdx) => {
      if (val !== "") {
        const cell = getCachedCell(track.id, stepIdx);
        if (cell && !cell.classList.contains("strike-flash")) {
          let velocity = track.volume;
          if (state.humaniseVolume > 0) {
            const seedOffset = getCellRandomSeed(track.id, stepIdx, epoch);
            const volOffset = seedOffset * (state.humaniseVolume / 100) * 0.65;
            velocity = Math.max(0.05, Math.min(1.2, velocity + volOffset));
          }
          const currentScale = (0.7 + velocity * 0.4) * subdivFactor;
          cell.style.setProperty("--current-scale", currentScale);
          cell.style.setProperty("--vel-scale", velocity);
          cell.style.transform = `translateY(-50%) scale(${currentScale})`;

          const pitchBrightness = calculatePitchBrightness(track, stepIdx, epoch);
          cell.style.setProperty("--pitch-brightness", pitchBrightness);
        }
      }
    });
  });
}



// Render dynamic track rows inside the Tuning Mixer modal popup
function renderMixer() {
  const mixerBody = document.getElementById("mixer-body");
  mixerBody.innerHTML = "";

  state.tracks.forEach(track => {
    if (track.pitch === undefined) track.pitch = 0;

    const isCall = track.id.startsWith("special") || track.name.toLowerCase().includes("call") || track.name.toLowerCase().includes("break");
    const hslString = getInstrumentHSL(track.instrument, track.type, isCall);

    const row = document.createElement("div");
    row.className = "synth-instrument-row tuning-mixer-row";
    row.style.background = `linear-gradient(105deg, hsla(${hslString}, 0.08) 0%, hsla(${hslString}, 0.01) 100%)`;
    row.style.border = `1px solid hsla(${hslString}, 0.22)`;
    row.style.borderRadius = "8px";
    row.style.padding = "0.5rem 0.75rem";

    const iconSpan = document.createElement("span");
    iconSpan.style.display = "inline-flex";
    iconSpan.style.alignItems = "center";
    iconSpan.style.justifyContent = "center";
    iconSpan.style.color = `hsl(${hslString})`;
    iconSpan.style.gridColumn = "1";
    iconSpan.innerHTML = getInstrumentSVG(isCall ? "call" : track.instrument, track.type);

    const label = document.createElement("span");
    label.className = "synth-inst-name";
    label.style.gridColumn = "2";
    
    let displayName = cleanTrackName(track.name);
    if (track.type === "bell" || (track.instrument && track.instrument.includes("bell"))) {
      if (!displayName.toLowerCase().includes("bell")) {
        displayName += " Bell";
      }
    }
    label.textContent = displayName;

    const sliderContainer = document.createElement("div");
    sliderContainer.className = "synth-knob-container";
    sliderContainer.style.gridColumn = "3";
    sliderContainer.style.width = "100%";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.className = "synth-slider";
    slider.style.width = "100%";
    slider.min = "-6";
    slider.max = "6";
    slider.step = "0.5";
    slider.value = track.pitch;
    slider.defaultValue = "0"; // Default tuning is 0 st

    const pitchValDisplay = document.createElement("span");
    pitchValDisplay.style.gridColumn = "4";
    pitchValDisplay.style.textAlign = "right";
    pitchValDisplay.style.fontFamily = "Outfit, sans-serif";
    pitchValDisplay.style.fontWeight = "700";
    pitchValDisplay.style.fontSize = "0.85rem";
    pitchValDisplay.style.color = "#ffffff";

    const formatPitch = (p) => {
      const sign = p > 0 ? "+" : "";
      return `${sign}${p.toFixed(1)} st`;
    };
    pitchValDisplay.textContent = formatPitch(track.pitch);

    slider.addEventListener("input", (e) => {
      const newPitch = parseFloat(e.target.value);
      track.pitch = newPitch;
      pitchValDisplay.textContent = formatPitch(newPitch);
      updateCellScales();
    });

    sliderContainer.appendChild(slider);
    row.appendChild(iconSpan);
    row.appendChild(label);
    row.appendChild(sliderContainer);
    row.appendChild(pitchValDisplay);
    mixerBody.appendChild(row);
  });
}

// Render dynamic track rows inside the Volume Mixer modal popup
function renderVolumeMixer() {
  const volMixerBody = document.getElementById("vol-mixer-body");
  volMixerBody.innerHTML = "";

  state.tracks.forEach(track => {
    const isCall = track.id.startsWith("special") || track.name.toLowerCase().includes("call") || track.name.toLowerCase().includes("break");
    const hslString = getInstrumentHSL(track.instrument, track.type, isCall);

    const row = document.createElement("div");
    row.className = "synth-instrument-row tuning-mixer-row";
    row.style.background = `linear-gradient(105deg, hsla(${hslString}, 0.08) 0%, hsla(${hslString}, 0.01) 100%)`;
    row.style.border = `1px solid hsla(${hslString}, 0.22)`;
    row.style.borderRadius = "8px";
    row.style.padding = "0.5rem 0.75rem";

    const iconSpan = document.createElement("span");
    iconSpan.style.display = "inline-flex";
    iconSpan.style.alignItems = "center";
    iconSpan.style.justifyContent = "center";
    iconSpan.style.color = `hsl(${hslString})`;
    iconSpan.style.gridColumn = "1";
    iconSpan.innerHTML = getInstrumentSVG(isCall ? "call" : track.instrument, track.type);

    const label = document.createElement("span");
    label.className = "synth-inst-name";
    label.style.gridColumn = "2";
    
    let displayName = cleanTrackName(track.name);
    if (track.type === "bell" || (track.instrument && track.instrument.includes("bell"))) {
      if (!displayName.toLowerCase().includes("bell")) {
        displayName += " Bell";
      }
    }
    label.textContent = displayName;

    const sliderContainer = document.createElement("div");
    sliderContainer.className = "synth-knob-container";
    sliderContainer.style.gridColumn = "3";
    sliderContainer.style.width = "100%";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.className = "synth-slider";
    slider.style.width = "100%";
    slider.min = "0";
    slider.max = "1";
    slider.step = "0.01";
    slider.value = track.volume;

    let defaultVol = 0.8;
    if (track.type === "bell") defaultVol = 0.7;
    else if (track.type === "shekere") defaultVol = 0.75;
    slider.defaultValue = defaultVol;

    const volValDisplay = document.createElement("span");
    volValDisplay.style.gridColumn = "4";
    volValDisplay.style.textAlign = "right";
    volValDisplay.style.fontFamily = "Outfit, sans-serif";
    volValDisplay.style.fontWeight = "700";
    volValDisplay.style.fontSize = "0.85rem";
    volValDisplay.style.color = "#ffffff";
    volValDisplay.textContent = `${Math.round(track.volume * 100)}%`;

    slider.addEventListener("input", (e) => {
      const newVol = parseFloat(e.target.value);
      track.volume = newVol;
      volValDisplay.textContent = `${Math.round(newVol * 100)}%`;
      updateCellScales();
    });

    sliderContainer.appendChild(slider);
    row.appendChild(iconSpan);
    row.appendChild(label);
    row.appendChild(sliderContainer);
    row.appendChild(volValDisplay);
    volMixerBody.appendChild(row);
  });
}

function openEffectsModal() {
  document.querySelectorAll("#effects-modal .synth-slider, #effects-modal .synth-select").forEach(input => {
    const inst = input.getAttribute("data-inst");
    const param = input.getAttribute("data-param");
    if (synth.settings[inst] && synth.settings[inst][param] !== undefined) {
      const val = synth.settings[inst][param];
      input.value = val;

      if (input.tagName === "INPUT" && input.type === "range") {
        const percentVal = Math.round(val * 100);
        const display = document.getElementById(`effects-${param}-val-${inst}`);
        if (display) {
          display.textContent = `${percentVal}%`;
        }
      }
    }
  });
  if (effectsModal) {
    effectsModal.classList.add("active");
  }
}

// Active Custom Swing Subdiv
let activeSwingSubdiv = 4;


function openCustomSwingModal() {
  activeSwingSubdiv = state.globalSubdivision;
  if (activeSwingSubdiv === 6 || state.timeSignature === "12/8" || state.timeSignature === "6/8") {
    activeSwingSubdiv = 3;
  } else if (activeSwingSubdiv === 2) {
    activeSwingSubdiv = 4;
  }

  // Set tab classes
  document.querySelectorAll(".swing-tab-btn").forEach(btn => {
    const subdiv = parseInt(btn.getAttribute("data-subdiv"));
    if (subdiv === activeSwingSubdiv) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderSwingSliders(activeSwingSubdiv);
  customSwingModal.classList.add("active");
}

function renderSwingSliders(subdiv) {
  swingSlidersContainer.innerHTML = "";

  // Get/initialize offsets for this subdivision
  if (!state.customSwingOffsets) {
    state.customSwingOffsets = {
      2: [0, 0],
      3: [0, 0, 0],
      4: [0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0]
    };
  }
  if (!state.customSwingOffsets[subdiv]) {
    state.customSwingOffsets[subdiv] = Array(subdiv).fill(0);
  }

  const offsets = state.customSwingOffsets[subdiv];

  for (let i = 0; i < subdiv; i++) {
    const row = document.createElement("div");
    row.className = "swing-slider-row";

    const label = document.createElement("span");
    label.className = "swing-slider-label";
    label.textContent = `Step ${i + 1}`;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.className = "synth-slider";
    slider.style.width = "100%";
    slider.min = "-50";
    slider.max = "50";
    slider.step = "1";
    slider.value = offsets[i];
    slider.defaultValue = "0"; // Default swing offset is 0%

    const valDisplay = document.createElement("span");
    valDisplay.className = "swing-slider-value";
    const updateValText = (val) => {
      const sign = val > 0 ? "+" : "";
      return `${sign}${val}%`;
    };
    valDisplay.textContent = updateValText(offsets[i]);

    slider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      offsets[i] = val;
      valDisplay.textContent = updateValText(val);
      updateGlobalSwingFromOffsets(subdiv);
      updateSwingTimeline(subdiv);
      updateStepPositions();
    });

    row.appendChild(label);
    row.appendChild(slider);
    row.appendChild(valDisplay);
    swingSlidersContainer.appendChild(row);
  }

  updateSwingTimeline(subdiv);
}

function updateSwingTimeline(subdiv) {
  swingTimelineDots.innerHTML = "";

  // Render visual grid line tick marks for subdivisions
  // Scaled from -0.5 to subdiv + 0.5 to keep all offset dots within bounds
  for (let i = 0; i <= subdiv; i++) {
    const tick = document.createElement("div");
    tick.className = "swing-timeline-dot tick-mark";
    const leftPercent = ((i + 0.5) / (subdiv + 1)) * 100;
    tick.style.left = `${leftPercent}%`;
    swingTimelineDots.appendChild(tick);
  }

  // Render step dots
  const offsets = state.customSwingOffsets[subdiv] || Array(subdiv).fill(0);
  for (let i = 0; i < subdiv; i++) {
    const dot = document.createElement("div");
    dot.className = "swing-timeline-dot";

    // Position = default step position + offset.
    // Scaled from -0.5 to subdiv + 0.5 so that negative swing for Step 1 stays within bounds.
    const offsetFactor = offsets[i] / 100;
    const leftPercent = ((i + offsetFactor + 0.5) / (subdiv + 1)) * 100;
    dot.style.left = `${leftPercent}%`;
    dot.title = `Step ${i + 1}: ${offsets[i] > 0 ? "+" : ""}${offsets[i]}%`;
    swingTimelineDots.appendChild(dot);
  }
}

function resetCustomSwing(subdiv) {
  if (state.customSwingOffsets && state.customSwingOffsets[subdiv]) {
    state.customSwingOffsets[subdiv].fill(0);
  }
  renderSwingSliders(subdiv);
  updateStepPositions();
}

function applyGlobalSwingToOffsets(subdiv, val) {
  if (!state.customSwingOffsets) {
    state.customSwingOffsets = {
      2: [0, 0],
      3: [0, 0, 0],
      4: [0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0]
    };
  }
  if (!state.customSwingOffsets[subdiv]) {
    state.customSwingOffsets[subdiv] = Array(subdiv).fill(0);
  }
  const offsets = state.customSwingOffsets[subdiv];
  if (subdiv === 4) {
    offsets[0] = 0;
    offsets[1] = Math.round(val * 0.48);
    offsets[2] = 0;
    offsets[3] = Math.round(val * 0.48);
  } else if (subdiv === 2) {
    offsets[0] = 0;
    offsets[1] = Math.round(val * 0.32);
  } else if (subdiv === 3) {
    offsets[0] = 0;
    offsets[1] = Math.round(val * 0.33);
    offsets[2] = 0;
  } else if (subdiv === 6) {
    offsets[0] = 0;
    offsets[1] = Math.round(val * 0.36);
    offsets[2] = 0;
    offsets[3] = Math.round(val * 0.36);
    offsets[4] = 0;
    offsets[5] = Math.round(val * 0.36);
  }
}

function updateGlobalSwingFromOffsets(subdiv) {
  if (!state.customSwingOffsets || !state.customSwingOffsets[subdiv]) return;
  const offsets = state.customSwingOffsets[subdiv];
  let calculatedSwing = 0;
  if (subdiv === 4) {
    const avg = (offsets[1] + offsets[3]) / 2;
    calculatedSwing = Math.round(avg / 0.48);
  } else if (subdiv === 2) {
    calculatedSwing = Math.round(offsets[1] / 0.32);
  } else if (subdiv === 3) {
    calculatedSwing = Math.round(offsets[1] / 0.33);
  } else if (subdiv === 6) {
    const avg = (offsets[1] + offsets[3] + offsets[5]) / 3;
    calculatedSwing = Math.round(avg / 0.36);
  }
  state.swing = Math.max(0, Math.min(100, calculatedSwing));
  const sRange = document.getElementById("swing-range");
  const sVal = document.getElementById("swing-val");
  if (sRange) sRange.value = state.swing;
  if (sVal) sVal.textContent = state.swing + "%";
}

// Clear grid content
function clearGrid() {
  state.tracks.forEach(track => {
    track.steps.fill("");
  });
  renderGrid();
}

// Randomize active steps
function randomizeGrid() {
  state.tracks.forEach(track => {
    for (let i = 0; i < track.steps.length; i++) {
      // 20% chance of a note
      if (Math.random() < 0.22) {
        if (track.type === "djembe") {
          const hits = ["B", "T", "S", "M"];
          track.steps[i] = hits[Math.floor(Math.random() * hits.length)];
        } else {
          const hits = ["O", "X"];
          track.steps[i] = hits[Math.floor(Math.random() * hits.length)];
        }
      } else {
        track.steps[i] = "";
      }
    }
  });
  renderGrid();
}

// Render dynamic elements to sequencer board
function renderGrid() {
  sortTracks();
  sequencerGrid.innerHTML = "";
  cellCache.clear();



  // Render tracks
  state.tracks.forEach(track => {
    const isCall = track.id.startsWith("special") || track.name.toLowerCase().includes("call") || track.name.toLowerCase().includes("break");

    const row = document.createElement("div");
    row.className = "track-row";
    row.setAttribute("data-track-id", track.id);

    // Instruments playing a call/échauffement adopt its colour
    if (state.callIntroActive && isCall && !isEchTrack(track)) row.classList.add("part-call-active");
    if (state.echPlaying && isEchTrack(track)) row.classList.add("part-ech-active");

    // Apply focus/dimmed styles if a track is focused
    if (state.focusedTrackId !== null) {
      if (track.id === state.focusedTrackId) {
        row.classList.add("focused-track");
      } else {
        row.classList.add("dimmed-track");
      }
    }

    // Set custom properties for glassy instrument-specific border/glow colors (matches user mockup)
    let hslString = getInstrumentHSL(track.instrument, track.type, isCall);

    row.style.setProperty("--part-color-hsl", hslString);

    // Perceptual brightness multiplier to balance opacity across colors (red/purple/blue get a boost, green gets reduced)
    let opacityMultiplier = 1.0;
    if (track.type === "djembe") {
      opacityMultiplier = 1.4; // Red/Purple boost
    } else if (track.type === "dunun" || track.type === "bell") {
      if (track.instrument.includes("dundunba")) {
        opacityMultiplier = 1.85; // Blue boost (compensated for lower lightness)
      } else if (track.instrument.includes("kenkeni")) {
        opacityMultiplier = 0.8; // Green reduction
      }
    }

    // Check if the color is red or very close to red (hue in [340, 360] or [0, 15])
    const hueVal = parseInt(hslString.split(",")[0]);
    if (hueVal >= 340 || hueVal <= 15) {
      opacityMultiplier += 0.25; // Boost overlay opacity for red tracks
    }

    row.style.setProperty("--row-border-color", `hsla(${hslString}, ${0.08 * opacityMultiplier})`);
    row.style.setProperty("--row-border-color-active", `hsla(${hslString}, ${0.42 * opacityMultiplier})`);
    row.style.setProperty("--row-shadow-glow", `hsla(${hslString}, ${0.17 * opacityMultiplier})`);

    // Left: Track Controls
    const meta = document.createElement("div");
    meta.className = "track-meta";

    const info = document.createElement("div");
    info.className = "track-info";
    info.style.display = "flex";
    info.style.alignItems = "center";
    info.style.gap = "0.5rem";

    let instIconSVG = getInstrumentSVG(isCall ? "call" : track.instrument, track.type);

    const iconSpan = document.createElement("span");
    iconSpan.className = "track-icon-wrapper";
    iconSpan.style.display = "inline-flex";
    iconSpan.style.alignItems = "center";
    iconSpan.style.justifyContent = "center";
    iconSpan.style.color = `hsl(${hslString})`;
    iconSpan.innerHTML = instIconSVG;
    iconSpan.style.cursor = "pointer";
    iconSpan.title = "Click to focus this track / toggle forefront mode";

    iconSpan.addEventListener("click", (e) => {
      e.stopPropagation();
      const isAlreadyFocused = state.focusedTrackId === track.id;

      // Restore baseline volumes first if any focus exists
      if (state.focusedTrackId !== null) {
        state.tracks.forEach(t => {
          if (t.baselineVolume !== undefined) {
            t.volume = t.baselineVolume;
            delete t.baselineVolume;
          }
        });
      }

      if (isAlreadyFocused) {
        state.focusedTrackId = null;
      } else {
        state.focusedTrackId = track.id;
        // Store current volumes as baseline
        state.tracks.forEach(t => {
          t.baselineVolume = t.volume;
        });
        // Adjust volumes
        state.tracks.forEach(t => {
          if (t.id === track.id) {
            t.volume = Math.min(1.0, t.volume + 0.3); // boost focused
          } else {
            t.volume = Math.max(0.05, t.volume - 0.5); // dim others
          }
        });
      }

      // Update DOM classes and heights without rebuilding the grid
      const allRows = sequencerGrid.querySelectorAll(".track-row");
      allRows.forEach(r => {
        const rId = r.getAttribute("data-track-id");
        r.classList.remove("focused-track", "dimmed-track");

        // Find the volume slider inside this row's drawer and sync its value
        const rTrack = state.tracks.find(t => t.id === rId);
        if (rTrack) {
          const rSlider = r.querySelector(".drawer-vol-slider");
          if (rSlider) {
            rSlider.value = rTrack.volume;
          }
          const rMuteBtn = r.querySelector(".drawer-btn.btn-mute");
          if (rMuteBtn) {
            rMuteBtn.classList.toggle("active", rTrack.muted);
          }
          const rSoloBtn = r.querySelector(".drawer-btn.btn-solo");
          if (rSoloBtn) {
            rSoloBtn.classList.toggle("active", rTrack.soloed);
          }
        }

        if (state.focusedTrackId !== null) {
          if (rId === state.focusedTrackId) {
            r.classList.add("focused-track");
          } else {
            r.classList.add("dimmed-track");
          }
        }
      });

      updateCellScales();
      updateMuteSoloVisuals();
    });

    const nameSpan = document.createElement("span");
    nameSpan.className = "track-name";
    nameSpan.textContent = cleanTrackName(track.name);

    info.appendChild(iconSpan);
    info.appendChild(nameSpan);

    // Wrapper for instrument name; variations positioned absolutely below
    const infoColumn = document.createElement("div");
    infoColumn.style.flex = "1";
    infoColumn.style.overflow = "visible";
    infoColumn.style.position = "relative";
    infoColumn.appendChild(info);

    meta.appendChild(infoColumn);

    const controls = document.createElement("div");
    controls.className = "track-controls";

    // Subdivision selection
    const subSelect = document.createElement("select");
    subSelect.className = "track-subdiv-select";
    [3, 4, 6].forEach(val => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = `/${val}`;
      if (track.subdivision === val) opt.selected = true;
      subSelect.appendChild(opt);
    });
    subSelect.addEventListener("change", (e) => {
      const newSub = parseInt(e.target.value);
      updateTrackSubdivision(track, newSub);
      renderGrid();
    });
    controls.appendChild(subSelect);

    // Mute/Solo button groupings
    const btns = document.createElement("div");
    btns.className = "track-btns";

    const muteBtn = document.createElement("button");
    muteBtn.className = `track-btn mute ${track.muted ? 'active' : ''}`;
    muteBtn.textContent = "M";
    muteBtn.addEventListener("click", () => {
      track.muted = !track.muted;
      muteBtn.classList.toggle("active", track.muted);
      if (track.muted && track.soloed) {
        track.soloed = false;
        soloBtn.classList.remove("active");
      }
      updateMuteSoloVisuals();
    });

    const soloBtn = document.createElement("button");
    soloBtn.className = `track-btn solo ${track.soloed ? 'active' : ''}`;
    soloBtn.textContent = "S";
    soloBtn.addEventListener("click", () => {
      track.soloed = !track.soloed;
      soloBtn.classList.toggle("active", track.soloed);
      if (track.soloed && track.muted) {
        track.muted = false;
        muteBtn.classList.remove("active");
      }
      updateMuteSoloVisuals();
    });

    btns.appendChild(muteBtn);
    btns.appendChild(soloBtn);
    controls.appendChild(btns);
    meta.appendChild(controls);

    // Variations injection - placed under instrument name
    if (state.currentVariations && state.currentVariations[track.instrument]) {
      const varsContainer = document.createElement("div");
      varsContainer.style.display = "flex";
      varsContainer.style.gap = "0.25rem";
      varsContainer.style.marginTop = "0.25rem";
      varsContainer.style.flexWrap = "wrap";
      varsContainer.style.alignItems = "center";


      // Default/Original button to restore non-variation pattern
      const defaultBtn = document.createElement("button");
      defaultBtn.className = `btn${track.activeVariation == null ? ' btn-primary' : ''}`;
      defaultBtn.textContent = "Orig";
      defaultBtn.title = "Restore original pattern";
      defaultBtn.style.padding = "0.15rem 0.4rem";
      defaultBtn.style.fontSize = "0.7rem";
      defaultBtn.style.minWidth = "32px";
      defaultBtn.addEventListener("click", () => {
        // Highlight button immediately
        track.activeVariation = null;
        const container = defaultBtn.parentElement;
        if (container) {
          Array.from(container.children).forEach(btn => {
            if (btn !== defaultBtn) btn.classList.remove("btn-primary");
          });
        }
        defaultBtn.classList.add("btn-primary");

        const action = () => {
          if (track.originalSteps) {
            track.steps = [...track.originalSteps];
            if (track.originalSubdivision !== undefined) track.subdivision = track.originalSubdivision;
            track.subdivisionSteps = {
              [track.subdivision]: [...track.steps]
            };
          }
          const bellTrack = state.tracks.find(t => t.instrument === track.instrument + "_bell");
          if (bellTrack && bellTrack.originalSteps) {
            bellTrack.steps = [...bellTrack.originalSteps];
            if (bellTrack.originalSubdivision !== undefined) bellTrack.subdivision = bellTrack.originalSubdivision;
            bellTrack.subdivisionSteps = {
              [bellTrack.subdivision]: [...bellTrack.steps]
            };
          }
          renderGrid();
        };
        if (state.isPlaying) {
          state.queuedActions.push(action);
        } else {
          action();
        }
      });
      varsContainer.appendChild(defaultBtn);

      state.currentVariations[track.instrument].forEach((vari, idx) => {
        const vbtn = document.createElement("button");
        vbtn.className = `btn${track.activeVariation === idx ? ' btn-primary' : ''}`;
        vbtn.textContent = (idx + 1).toString();
        vbtn.title = vari.name;
        vbtn.style.padding = "0.15rem 0.4rem";
        vbtn.style.fontSize = "0.7rem";
        vbtn.style.minWidth = "24px";
        vbtn.addEventListener("click", () => {
          // Highlight button immediately
          track.activeVariation = idx;
          const container = vbtn.parentElement;
          if (container) {
            Array.from(container.children).forEach(btn => {
              if (btn !== defaultBtn) btn.classList.remove("btn-primary");
            });
          }
          vbtn.classList.add("btn-primary");
          if (defaultBtn) defaultBtn.classList.remove("btn-primary");

          const action = () => {
            track.steps = [...vari.steps];
            if (vari.subdivision) track.subdivision = vari.subdivision;
            track.subdivisionSteps = {
              [track.subdivision]: [...track.steps]
            };

            if (vari.bellSteps) {
              const bellTrack = state.tracks.find(t => t.instrument === track.instrument + "_bell");
              if (bellTrack) {
                bellTrack.steps = [...vari.bellSteps];
                bellTrack.subdivisionSteps = {
                  [bellTrack.subdivision]: [...bellTrack.steps]
                };
              }
            }

            if (vari.compoundTracks) {
              Object.keys(vari.compoundTracks).forEach(compInst => {
                const compTrack = state.tracks.find(t => t.instrument === compInst);
                if (compTrack) {
                  compTrack.steps = [...vari.compoundTracks[compInst].steps];
                  compTrack.subdivisionSteps = {
                    [compTrack.subdivision]: [...compTrack.steps]
                  };
                }
                const compBellTrack = state.tracks.find(t => t.instrument === compInst + "_bell");
                if (compBellTrack && vari.compoundTracks[compInst].bellSteps) {
                  compBellTrack.steps = [...vari.compoundTracks[compInst].bellSteps];
                  compBellTrack.subdivisionSteps = {
                    [compBellTrack.subdivision]: [...compBellTrack.steps]
                  };
                }
              });
            }
            renderGrid();
          };
          if (state.isPlaying) {
            state.queuedActions.push(action);
          } else {
            action();
          }
        });
        varsContainer.appendChild(vbtn);
      });
      // Position absolutely below the instrument name so it doesn't affect centering
      varsContainer.style.position = "absolute";
      varsContainer.style.top = "100%";
      varsContainer.style.left = "0";
      varsContainer.style.zIndex = "5";
      infoColumn.appendChild(varsContainer);
      // Add extra bottom padding to the row to make room for variation buttons
      row.style.paddingBottom = "1.75rem";
    }

    row.appendChild(meta);

    // Center: Track Lines (multiple rows if extended)
    const linesContainer = document.createElement("div");
    linesContainer.className = "track-lines-container";

    const stepsPerLine = state.beats * track.subdivision;
    let numLines = Math.max(1, Math.ceil(track.steps.length / stepsPerLine));
    if (track.type === "shekere" || isCall) {
      numLines = 1;
      if (track.steps.length > stepsPerLine) {
        track.steps = track.steps.slice(0, stepsPerLine);
      }
    }

    // Ensure track steps are padded to complete lines
    while (track.steps.length < numLines * stepsPerLine) {
      const nextIdx = track.steps.length;
      if (track.type === "shekere") {
        const stepInLine = nextIdx % stepsPerLine;
        const sectionLength = stepsPerLine / 4;
        if (stepInLine % Math.round(sectionLength) === 0) {
          track.steps.push("O");
        } else {
          track.steps.push("");
        }
      } else {
        track.steps.push("");
      }
    }

    for (let l = 0; l < numLines; l++) {
      const lineRow = document.createElement("div");
      lineRow.className = "track-line-row";

      const stepsContainer = document.createElement("div");
      stepsContainer.className = "steps-container";
      stepsContainer.setAttribute("data-track-id", track.id);
      stepsContainer.setAttribute("data-line-index", l);

      // Beat-group shading (Studio theme): how many visual beat divisions per line
      const is12or6Sig = (state.timeSignature === "12/8" || state.timeSignature === "6/8");
      const beatDivisions = is12or6Sig ? (stepsPerLine / 3) : state.beats;
      stepsContainer.style.setProperty("--beat-divisions", beatDivisions);
      // Compact layout: lets CSS size cells to the largest square that fits the line
      stepsContainer.style.setProperty("--line-steps", stepsPerLine);

      // Playhead for this container
      const playhead = document.createElement("div");
      playhead.className = "playhead-line";
      stepsContainer.appendChild(playhead);

      // Insert beat markers to clearly distinguish beat limits, positioned exactly half-way between steps
      const boundaries = (state.timeSignature === "12/8" || state.timeSignature === "6/8")
        ? [0.5, 1.0, 1.5]
        : Array.from({ length: state.beats - 1 }, (_, idx) => idx + 1);

      const stepTimes = [];
      for (let stepInLine = 0; stepInLine < stepsPerLine; stepInLine++) {
        const beatIndex = Math.floor(stepInLine / track.subdivision);
        const stepInBeat = stepInLine % track.subdivision;
        stepTimes.push(getSwungStepTime(beatIndex, stepInBeat, track.subdivision, 1.0, state.swing, true));
      }

      boundaries.forEach(b => {
        let idxLast = -1;
        let idxFirst = -1;
        for (let i = 0; i < stepTimes.length; i++) {
          if (stepTimes[i] < b) {
            idxLast = i;
          }
          if (stepTimes[i] >= b && idxFirst === -1) {
            idxFirst = i;
          }
        }

        if (idxLast !== -1 && idxFirst !== -1) {
          const tLast = stepTimes[idxLast];
          const tFirst = stepTimes[idxFirst];
          const tMid = (tLast + tFirst) / 2;
          const leftPercent = (tMid / state.beats) * 100;

          const marker = document.createElement("div");
          marker.className = "beat-marker";
          marker.style.left = `calc(${leftPercent}% + 7px)`;
          stepsContainer.appendChild(marker);
        }
      });

      const startIdx = l * stepsPerLine;
      const endIdx = startIdx + stepsPerLine;

      for (let stepIdx = startIdx; stepIdx < endIdx; stepIdx++) {
        const stepVal = track.steps[stepIdx];
        const cell = document.createElement("div");
        cell.className = "step-cell";
        cell.setAttribute("data-track-id", track.id);
        cell.setAttribute("data-step-index", stepIdx);

        // Calculate position relative to this line
        const stepInLine = stepIdx % stepsPerLine;
        const beatIndex = Math.floor(stepInLine / track.subdivision);
        const stepInBeat = stepInLine % track.subdivision;
        const swungBeat = getSwungStepTime(beatIndex, stepInBeat, track.subdivision, 1.0, state.swing, true);
        const percent = (swungBeat / state.beats) * 100;
        cell.style.setProperty("--step-time-percent", `${percent}%`);

        // Inject symbol SVG icon and add active state classes
        const subdivFactor = (state.beats * track.subdivision > 16) ? 0.65 : 1.0;

        if (stepVal && stepVal !== "") {
          cell.innerHTML = getSoundIcon(track, stepVal);

          cell.style.removeProperty("background");
          cell.style.removeProperty("border-color");
          cell.style.removeProperty("box-shadow");

          const studioTheme = isIconTheme();
          if (stepVal.includes("/")) {
            cell.className = "step-cell step-cell-composite step-cell-flam has-note";
            if (!studioTheme) {
              const [h1, h2] = stepVal.split("/");
              const c1 = getHitColor(track.type, h1, track.instrument);
              const c2 = getHitColor(track.type, h2, track.instrument);
              const g2 = getHitGlowColor(track.type, h2, track.instrument);
              cell.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
              cell.style.borderColor = c2;
              cell.style.boxShadow = `0 0 calc(var(--vel-scale, 0.8) * 15px) ${g2}`;
            }
          } else if (stepVal.includes("-")) {
            cell.className = "step-cell step-cell-composite step-cell-roll has-note";
            if (!studioTheme) {
              const [h1, h2] = stepVal.split("-");
              const c1 = getHitColor(track.type, h1, track.instrument);
              const c2 = getHitColor(track.type, h2, track.instrument);
              const g2 = getHitGlowColor(track.type, h2, track.instrument);
              cell.style.background = `linear-gradient(90deg, ${c1} 0%, ${c1} 50%, ${c2} 50%, ${c2} 100%)`;
              cell.style.borderColor = c2;
              cell.style.boxShadow = `0 0 calc(var(--vel-scale, 0.8) * 15px) ${g2}`;
            }
          } else if (stepVal.includes("*")) {
            cell.className = "step-cell step-cell-composite step-cell-triplet has-note";
            if (!studioTheme) {
              const [h1, h2, h3] = stepVal.split("*");
              const c1 = getHitColor(track.type, h1, track.instrument);
              const c2 = getHitColor(track.type, h2, track.instrument);
              const c3 = getHitColor(track.type, h3, track.instrument);
              const g3 = getHitGlowColor(track.type, h3, track.instrument);
              cell.style.background = `linear-gradient(90deg, ${c1} 0%, ${c1} 33.3%, ${c2} 33.3%, ${c2} 66.6%, ${c3} 66.6%, ${c3} 100%)`;
              cell.style.borderColor = c3;
              cell.style.boxShadow = `0 0 calc(var(--vel-scale, 0.8) * 15px) ${g3}`;
            }
          } else {
            cell.className = `step-cell ${track.type}-${stepVal} ${track.instrument}-${stepVal} has-note`;
          }

          const currentScale = (0.7 + track.volume * 0.4) * subdivFactor;
          cell.style.setProperty("--current-scale", currentScale);
          cell.style.setProperty("--vel-scale", track.volume);
          cell.style.transform = `translateY(-50%) scale(${currentScale})`;
        } else {
          cell.style.removeProperty("background");
          cell.style.removeProperty("border-color");
          cell.style.removeProperty("box-shadow");
          cell.className = "step-cell";
          const is12or6 = (state.timeSignature === "12/8" || state.timeSignature === "6/8");
          const beatInterval = (is12or6 && track.subdivision === 6) ? 3 : track.subdivision;
          if (stepInLine % beatInterval === 0) {
            cell.classList.add("beat-start-empty");
          }

          const currentScale = 1.0 * subdivFactor;
          cell.style.setProperty("--current-scale", currentScale);
          cell.style.transform = `translateY(-50%) scale(${currentScale})`;
        }

        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        let pressTimer = null;
        let isLongPress = false;
        let hasMoved = false;
        let startX = 0;
        let startY = 0;

        const startPress = (e) => {
          if (e.type === "mousedown" && e.button !== 0) return;
          isLongPress = false;
          hasMoved = false;
          const touch = e.touches ? e.touches[0] : e;
          startX = touch.clientX;
          startY = touch.clientY;
          pressTimer = setTimeout(() => {
            isLongPress = true;
            openVariationsMenu(track, stepIdx, cell, e);
          }, 500);
        };

        const cancelPress = () => {
          if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
        };

        const handleMove = (e) => {
          const touch = e.touches ? e.touches[0] : e;
          const diffX = Math.abs(touch.clientX - startX);
          const diffY = Math.abs(touch.clientY - startY);
          if (diffX > 8 || diffY > 8) {
            hasMoved = true;
            cancelPress();
          }
        };

        cell.addEventListener("mousedown", startPress);
        cell.addEventListener("mousemove", handleMove);
        cell.addEventListener("mouseup", (e) => {
          cancelPress();
          if (!isLongPress && !hasMoved && e.button === 0) {
            cycleStepHit(track, stepIdx, cell);
          }
        });
        cell.addEventListener("mouseleave", cancelPress);

        cell.addEventListener("touchstart", startPress, { passive: true });
        cell.addEventListener("touchmove", handleMove, { passive: true });
        cell.addEventListener("touchend", (e) => {
          e.preventDefault();
          cancelPress();
          if (!isLongPress && !hasMoved) {
            cycleStepHit(track, stepIdx, cell);
          }
        }, { passive: false });
        cell.addEventListener("touchcancel", cancelPress, { passive: true });

        stepsContainer.appendChild(cell);
        cellCache.set(track.id + ":" + stepIdx, cell);
      }

      lineRow.appendChild(stepsContainer);

      // Line actions (+ and - buttons)
      const lineActions = document.createElement("div");
      lineActions.className = "track-line-actions";

      const btnAdd = document.createElement("button");
      btnAdd.className = "btn-line-action add";
      btnAdd.textContent = "+";
      btnAdd.title = "Add 4 bars below";
      btnAdd.addEventListener("click", () => {
        const addSteps = state.beats * track.subdivision;
        const insertAt = (l + 1) * addSteps;
        const newSteps = Array(addSteps).fill("");
        if (track.type === "shekere") {
          const sectionLength = addSteps / 4;
          for (let sec = 0; sec < 4; sec++) {
            newSteps[Math.round(sec * sectionLength)] = "O";
          }
        }
        track.steps.splice(insertAt, 0, ...newSteps);
        renderGrid();
      });
      const isSingleRow = track.type === "shekere" || isCall;
      if (isSingleRow) {
        btnAdd.style.visibility = "hidden";
        btnAdd.style.pointerEvents = "none";
      }
      lineActions.appendChild(btnAdd);

      const btnRemove = document.createElement("button");
      btnRemove.className = "btn-line-action remove";
      btnRemove.textContent = "-";
      if (numLines === 1) {
        btnRemove.title = "Delete track";
        btnRemove.addEventListener("click", () => {
          showDeleteTrackPopup(track, () => {
            state.tracks = state.tracks.filter(t => t.id !== track.id);
            renderGrid();
          });
        });
      } else {
        btnRemove.title = "Remove these 4 bars";
        btnRemove.addEventListener("click", () => {
          const remSteps = state.beats * track.subdivision;
          track.steps.splice(l * remSteps, remSteps);
          renderGrid();
        });
      }
      lineActions.appendChild(btnRemove);

      lineRow.appendChild(lineActions);

      linesContainer.appendChild(lineRow);
    }
    row.appendChild(linesContainer);

    // --- START DRAWER FOR MOBILE ACCORDION ---
    const drawer = document.createElement("div");
    drawer.className = "track-drawer";

    // Build sample group options (used by popup picker button)
    let sampleOptions = [];
    if (track.type === "djembe") {
      const djembeLabels = {
        djembe1: "Djembe 1",
        djembe2: "Djembe 2",
        djembe3: "Djembe 3",
        djembe4: "Djembe Solo",
        djembe5: "Djembe 5",
        djembe6: "Djembe 6",
        djembe7: "Djembe 7"
      };
      for (let i = 1; i <= 7; i++) {
        const val = `djembe${i}`;
        sampleOptions.push({ value: val, text: djembeLabels[val] });
      }
    } else if (track.type === "dunun" || track.type === "bell") {
      let baseName = "";
      if (track.instrument.includes("kenkeni")) baseName = "kenkeni";
      else if (track.instrument.includes("sangban")) baseName = "sangban";
      else if (track.instrument.includes("dundunba")) baseName = "dundunba";

      if (baseName) {
        const isBell = track.instrument.includes("bell");
        const instTitle = baseName.charAt(0).toUpperCase() + baseName.slice(1);

        if (isBell) {
          sampleOptions.push({ value: `${baseName}_bell`, text: `${instTitle} Bell 1` });
          sampleOptions.push({ value: `${baseName}3_bell`, text: `${instTitle} Bell 2` });
          sampleOptions.push({ value: `${baseName}4_bell`, text: `${instTitle} Bell 3` });
        } else {
          sampleOptions.push({ value: baseName, text: `${instTitle} 1` });
          sampleOptions.push({ value: `${baseName}3`, text: `${instTitle} 2` });
          sampleOptions.push({ value: `${baseName}4`, text: `${instTitle} 3` });
        }
      }
    }

    // Group elements in a left-group container
    const leftGroup = document.createElement("div");
    leftGroup.className = "drawer-left-group";

    const drawerLeft = document.createElement("div");
    drawerLeft.className = "drawer-left";

    const btnAddPart = document.createElement("button");
    btnAddPart.className = "drawer-btn btn-add-part";
    btnAddPart.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>`;
    btnAddPart.title = "Add extra part";

    if (isCall) {
      btnAddPart.style.visibility = "hidden";
      btnAddPart.style.pointerEvents = "none";
    }

    btnAddPart.addEventListener("click", (e) => {
      e.stopPropagation();
      if (track.type === "djembe") {
        if (btnAddDjembe) btnAddDjembe.click();
      } else if (track.instrument.includes("kenkeni")) {
        if (btnAddKenkeni) btnAddKenkeni.click();
      } else if (track.instrument.includes("sangban")) {
        if (btnAddSangban) btnAddSangban.click();
      } else if (track.instrument.includes("dundunba")) {
        if (btnAddDundunba) btnAddDundunba.click();
      } else if (track.type === "shekere") {
        state.customShekereCount = (state.customShekereCount || 0) + 1;
        const count = state.customShekereCount;
        state.tracks.push({
          id: `shekere_custom_${count}`,
          name: `Shekere ${count + 1}`,
          type: "shekere",
          instrument: "shekere",
          subdivision: state.globalSubdivision,
          steps: Array(state.beats * state.globalSubdivision).fill(""),
          volume: 0.75,
          pitch: 0,
          muted: false,
          soloed: false
        });
        renderGrid();
      }
    });
    drawerLeft.appendChild(btnAddPart);

    const btnMute = document.createElement("button");
    btnMute.className = `drawer-btn btn-mute ${track.muted ? 'active' : ''}`;
    btnMute.textContent = "M";
    btnMute.title = "Mute";
    btnMute.addEventListener("click", (e) => {
      e.stopPropagation();
      track.muted = !track.muted;
      btnMute.classList.toggle("active", track.muted);

      const normalMute = row.querySelector(".track-btn.mute");
      if (normalMute) normalMute.classList.toggle("active", track.muted);

      if (track.muted && track.soloed) {
        track.soloed = false;
        btnSolo.classList.remove("active");
        const normalSolo = row.querySelector(".track-btn.solo");
        if (normalSolo) normalSolo.classList.remove("active");
      }

      updateMuteSoloVisuals();
    });
    drawerLeft.appendChild(btnMute);

    const btnSolo = document.createElement("button");
    btnSolo.className = `drawer-btn btn-solo ${track.soloed ? 'active' : ''}`;
    btnSolo.textContent = "S";
    btnSolo.title = "Solo";
    btnSolo.addEventListener("click", (e) => {
      e.stopPropagation();
      track.soloed = !track.soloed;
      btnSolo.classList.toggle("active", track.soloed);

      const normalSolo = row.querySelector(".track-btn.solo");
      if (normalSolo) normalSolo.classList.toggle("active", track.soloed);

      if (track.soloed && track.muted) {
        track.muted = false;
        btnMute.classList.remove("active");
        const normalMute = row.querySelector(".track-btn.mute");
        if (normalMute) normalMute.classList.remove("active");
      }

      updateMuteSoloVisuals();
    });
    drawerLeft.appendChild(btnSolo);

    leftGroup.appendChild(drawerLeft);
    drawer.appendChild(leftGroup);

    // Center container for subdivision, sample group, and volume buttons
    const drawerCenter = document.createElement("div");
    drawerCenter.className = "drawer-center";

    // Subdivision picker button
    const btnSubdiv = document.createElement("button");
    btnSubdiv.className = "drawer-btn btn-subdiv";
    btnSubdiv.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`;
    btnSubdiv.title = `Subdivision (current: /${track.subdivision})`;
    btnSubdiv.addEventListener("click", (e) => {
      e.stopPropagation();
      showSubdivisionPopup(track);
    });
    drawerCenter.appendChild(btnSubdiv);

    // Sample group picker button (opens popup overlay)
    if (sampleOptions.length > 0) {
      const btnSampleGroup = document.createElement("button");
      btnSampleGroup.className = "drawer-btn btn-sample-group";
      btnSampleGroup.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
      btnSampleGroup.title = "Change sound set";
      btnSampleGroup.addEventListener("click", (e) => {
        e.stopPropagation();
        showSampleGroupPopup(track, sampleOptions, row);
      });
      drawerCenter.appendChild(btnSampleGroup);
    }

    // Hidden volume slider (used by large slider overlay)
    const volSlider = document.createElement("input");
    volSlider.type = "range";
    volSlider.className = "drawer-vol-slider-hidden";
    volSlider.min = "0";
    volSlider.max = "1";
    volSlider.step = "0.01";
    volSlider.value = track.volume;
    volSlider.addEventListener("input", (e) => {
      const newVol = parseFloat(e.target.value);
      track.volume = newVol;
      if (track.baselineVolume !== undefined) {
        track.baselineVolume = Math.max(0, newVol - 0.3);
      }
      updateCellScales();
    });
    setupLargeSlider(volSlider, {
      label: `${cleanTrackName(track.name)} Volume`,
      getValueText: (val) => `${Math.round(parseFloat(val) * 100)}%`
    });
    drawerCenter.appendChild(volSlider);

    // Volume icon button — triggers existing large slider overlay
    const btnVolume = document.createElement("button");
    btnVolume.className = "drawer-btn btn-volume";
    btnVolume.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
    btnVolume.title = "Volume";
    btnVolume.addEventListener("click", (e) => {
      e.stopPropagation();
      // Simulate a pointerdown on the hidden slider to trigger the large slider overlay
      const rect = btnVolume.getBoundingClientRect();
      const syntheticEvent = new PointerEvent("pointerdown", {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        bubbles: true,
        cancelable: true
      });
      volSlider.dispatchEvent(syntheticEvent);
    });
    drawerCenter.appendChild(btnVolume);

    drawer.appendChild(drawerCenter);

    const drawerRight = document.createElement("div");
    drawerRight.className = "drawer-right";

    const btnAddRow = document.createElement("button");
    btnAddRow.className = "drawer-btn btn-add-row";
    btnAddRow.textContent = "+";
    btnAddRow.title = "Add 4 beats (row)";

    const isSingleRow = track.type === "shekere" || isCall;
    if (isSingleRow) {
      btnAddRow.style.visibility = "hidden";
      btnAddRow.style.pointerEvents = "none";
    }

    btnAddRow.addEventListener("click", (e) => {
      e.stopPropagation();
      const addSteps = state.beats * track.subdivision;
      const insertAt = track.steps.length;
      const newSteps = Array(addSteps).fill("");
      track.steps.splice(insertAt, 0, ...newSteps);
      renderGrid();
    });
    drawerRight.appendChild(btnAddRow);

    const btnRemoveRow = document.createElement("button");
    btnRemoveRow.className = "drawer-btn btn-remove-row";
    btnRemoveRow.textContent = "-";
    btnRemoveRow.title = numLines === 1 ? "Delete track" : "Remove last row";
    btnRemoveRow.addEventListener("click", (e) => {
      e.stopPropagation();
      if (numLines === 1) {
        showDeleteTrackPopup(track, () => {
          state.tracks = state.tracks.filter(t => t.id !== track.id);
          if (state.focusedTrackId === track.id) {
            state.focusedTrackId = null;
          }
          renderGrid();
        });
      } else {
        const remSteps = state.beats * track.subdivision;
        track.steps.splice(track.steps.length - remSteps, remSteps);
        renderGrid();
      }
    });
    drawerRight.appendChild(btnRemoveRow);

    drawer.appendChild(drawerRight);
    row.appendChild(drawer);
    // --- END DRAWER FOR MOBILE ACCORDION ---

    sequencerGrid.appendChild(row);
  });

  // Rebuild cached container list for the rAF playhead loop
  cachedStepContainers = Array.from(document.querySelectorAll(".steps-container"));
  lastPartHighlightKey = null;

  updateNotation();
  updateStepPositions();
  updateCellScales();
  updateMuteSoloVisuals();
}
// Show the sample group picker popup overlay
function showSampleGroupPopup(track, sampleOptions, trackRow) {
  // Remove any existing overlay
  const existing = document.querySelector(".sample-group-overlay");
  if (existing) existing.remove();

  const container = document.querySelector(".demo-device-frame") || document.querySelector(".app-container") || document.body;

  const overlay = document.createElement("div");
  overlay.className = "sample-group-overlay active";

  const popup = document.createElement("div");
  popup.className = "sample-group-popup";

  // Determine instrument display name
  const updateTitleText = () => {
    let title = "Select Sound Set";
    if (track.type === "djembe") {
      title = "Djembe Sound";
    } else {
      const inst = track.instrument;
      if (inst.includes("kenkeni")) title = inst.includes("bell") ? "Kenkeni Bell Sound" : "Kenkeni Sound";
      else if (inst.includes("sangban")) title = inst.includes("bell") ? "Sangban Bell Sound" : "Sangban Sound";
      else if (inst.includes("dundunba")) title = inst.includes("bell") ? "Dundunba Bell Sound" : "Dundunba Sound";
    }
    titleEl.textContent = title;
  };

  const titleEl = document.createElement("div");
  titleEl.className = "sample-group-popup-title";
  popup.appendChild(titleEl);

  const grid = document.createElement("div");
  grid.className = "sample-group-popup-grid";

  sampleOptions.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "sample-group-popup-btn card-style";
    if (track.instrument === opt.value) btn.classList.add("active");

    // Get appropriate SVG icon and color for this option
    let iconSvg = getInstrumentSVG(opt.value, track.type);
    let color = `hsl(${getInstrumentHSL(opt.value, track.type, false)})`;

    // Create an icon wrapper div
    const iconWrap = document.createElement("div");
    iconWrap.className = "popup-btn-icon-wrapper";
    iconWrap.style.color = color;
    iconWrap.innerHTML = iconSvg;

    const label = document.createElement("span");
    label.className = "popup-btn-label";
    label.textContent = opt.text;

    btn.appendChild(iconWrap);
    btn.appendChild(label);

    // Set custom variables for hover styles
    btn.style.setProperty("--theme-active-color", color);
    btn.style.setProperty("--theme-active-glow", color.replace(")", ", 0.35)").replace("hsl", "hsla"));

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      track.instrument = opt.value;
      popup.querySelectorAll(".sample-group-popup-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateTitleText();
      renderGrid();
    });
    grid.appendChild(btn);
  });

  popup.appendChild(grid);
  updateTitleText();

  // Add Pitch Slider at the bottom
  const tuningContainer = document.createElement("div");
  tuningContainer.className = "popup-tuning-container";
  tuningContainer.style.cssText = `
    width: 100%;
    margin-top: 0.85rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  `;

  const tuningHeader = document.createElement("div");
  tuningHeader.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
  `;

  const tuningLabel = document.createElement("span");
  tuningLabel.textContent = "Tuning:";

  const tuningVal = document.createElement("span");
  tuningVal.style.color = "var(--primary)";
  tuningVal.style.fontWeight = "700";

  const formatPitch = (p) => {
    const sign = p > 0 ? "+" : "";
    return `${sign}${p.toFixed(1)} st`;
  };

  if (track.pitch === undefined) track.pitch = 0;
  tuningVal.textContent = formatPitch(track.pitch);

  tuningHeader.appendChild(tuningLabel);
  tuningHeader.appendChild(tuningVal);

  const tuningSlider = document.createElement("input");
  tuningSlider.type = "range";
  tuningSlider.className = "synth-slider";
  tuningSlider.style.width = "100%";
  tuningSlider.min = "-6";
  tuningSlider.max = "6";
  tuningSlider.step = "0.5";
  tuningSlider.value = track.pitch;

  tuningSlider.addEventListener("input", (e) => {
    const p = parseFloat(e.target.value);
    track.pitch = p;
    tuningVal.textContent = formatPitch(p);
    updateCellScales();
  });

  tuningContainer.appendChild(tuningHeader);
  tuningContainer.appendChild(tuningSlider);
  popup.appendChild(tuningContainer);

  // Add Close Button (wrapped in a right-aligned container)
  const footerContainer = document.createElement("div");
  footerContainer.style.cssText = `
    width: 100%;
    margin-top: 0.85rem;
    display: flex;
    justify-content: flex-end;
  `;

  const closeBtn = document.createElement("button");
  closeBtn.className = "btn btn-primary";
  closeBtn.style.cssText = `
    padding: 0.5rem 1.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
  `;
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    overlay.remove();
    renderGrid();
  });

  footerContainer.appendChild(closeBtn);
  popup.appendChild(footerContainer);

  overlay.appendChild(popup);

  // Close on background click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
      renderGrid();
    }
  });

  container.appendChild(overlay);
}

// Show the subdivision picker popup overlay
function showSubdivisionPopup(track) {
  // Remove any existing overlay
  const existing = document.querySelector(".sample-group-overlay");
  if (existing) existing.remove();

  const container = document.querySelector(".demo-device-frame") || document.querySelector(".app-container") || document.body;

  const overlay = document.createElement("div");
  overlay.className = "sample-group-overlay active";

  const popup = document.createElement("div");
  popup.className = "sample-group-popup";

  const titleEl = document.createElement("div");
  titleEl.className = "sample-group-popup-title";
  titleEl.textContent = "Select Subdivision";
  popup.appendChild(titleEl);

  const grid = document.createElement("div");
  grid.className = "sample-group-popup-grid";

  [3, 4, 6].forEach(val => {
    const btn = document.createElement("button");
    btn.className = "sample-group-popup-btn";
    if (track.subdivision === val) btn.classList.add("active");
    btn.textContent = `/${val}`;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateTrackSubdivision(track, val);
      overlay.remove();
      renderGrid();
    });
    grid.appendChild(btn);
  });

  popup.appendChild(grid);
  overlay.appendChild(popup);

  // Close on background click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  container.appendChild(overlay);
}

// Show the premium track deletion confirmation popup overlay
function showDeleteTrackPopup(track, onConfirm) {
  // Remove any existing overlay
  const existing = document.querySelector(".sample-group-overlay");
  if (existing) existing.remove();

  const container = document.querySelector(".demo-device-frame") || document.querySelector(".app-container") || document.body;

  const overlay = document.createElement("div");
  overlay.className = "sample-group-overlay active";

  const popup = document.createElement("div");
  popup.className = "sample-group-popup";

  const titleEl = document.createElement("div");
  titleEl.className = "sample-group-popup-title";
  titleEl.textContent = "Delete Track";
  popup.appendChild(titleEl);

  const textEl = document.createElement("div");
  textEl.style.fontSize = "0.85rem";
  textEl.style.color = "rgba(255, 255, 255, 0.65)";
  textEl.style.textAlign = "center";
  textEl.style.margin = "0.5rem 0";
  textEl.style.lineHeight = "1.4";
  textEl.textContent = `Are you sure you want to delete track "${cleanTrackName(track.name)}"?`;
  popup.appendChild(textEl);

  const btnGroup = document.createElement("div");
  btnGroup.style.display = "flex";
  btnGroup.style.gap = "0.75rem";
  btnGroup.style.width = "100%";
  btnGroup.style.marginTop = "0.5rem";

  const btnCancel = document.createElement("button");
  btnCancel.className = "sample-group-popup-btn";
  btnCancel.textContent = "Cancel";
  btnCancel.style.flex = "1";
  btnCancel.style.padding = "0.5rem 0";
  btnCancel.addEventListener("click", (e) => {
    e.stopPropagation();
    overlay.remove();
  });

  const btnDelete = document.createElement("button");
  btnDelete.className = "sample-group-popup-btn active";
  btnDelete.textContent = "Delete";
  btnDelete.style.flex = "1";
  btnDelete.style.padding = "0.5rem 0";
  // Red/danger styling
  btnDelete.style.background = "rgba(239, 68, 68, 0.2)";
  btnDelete.style.borderColor = "rgba(239, 68, 68, 0.5)";
  btnDelete.style.color = "#ef4444";
  btnDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    overlay.remove();
    onConfirm();
  });

  btnGroup.appendChild(btnCancel);
  btnGroup.appendChild(btnDelete);
  popup.appendChild(btnGroup);
  overlay.appendChild(popup);

  // Close on background click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  container.appendChild(overlay);
}

// Cycles step click values (e.g. Empty -> Bass -> Tone -> Slap -> Muffled)
function cycleStepHit(track, idx, cellElement) {
  let val = track.steps[idx];

  if (track.type === "djembe") {
    const cycle = ["", "S", "T", "B", "M"];
    const curIdx = cycle.indexOf(val);
    val = cycle[(curIdx + 1) % cycle.length];
  } else if (track.type === "dunun") {
    const cycle = ["", "O", "C"];
    const curIdx = cycle.indexOf(val);
    val = cycle[(curIdx + 1) % cycle.length];
  } else if (track.type === "bell") {
    const cycle = ["", "X", "C"];
    const curIdx = cycle.indexOf(val);
    val = cycle[(curIdx + 1) % cycle.length];
  } else {
    const cycle = ["", "O", "X"];
    const curIdx = cycle.indexOf(val);
    val = cycle[(curIdx + 1) % cycle.length];
  }

  track.steps[idx] = val;
  if (!track.subdivisionSteps) {
    track.subdivisionSteps = {};
  }
  track.subdivisionSteps[track.subdivision] = [...track.steps];

  cellElement.style.removeProperty("background");
  cellElement.style.removeProperty("border-color");
  cellElement.style.removeProperty("box-shadow");
  cellElement.className = "step-cell";
  cellElement.innerHTML = "";
  if (val === "") {
    const stepInLine = idx % (track.subdivision * state.beats);
    const is12or6 = (state.timeSignature === "12/8" || state.timeSignature === "6/8");
    const beatInterval = (is12or6 && track.subdivision === 6) ? 3 : track.subdivision;
    if (stepInLine % beatInterval === 0) {
      cellElement.classList.add("beat-start-empty");
    }
  }
  const subdivFactor = (state.beats * track.subdivision > 16) ? 0.65 : 1.0;

  if (val !== "") {
    cellElement.innerHTML = getSoundIcon(track, val);
    cellElement.classList.add(`${track.type}-${val}`);
    cellElement.classList.add(`${track.instrument}-${val}`);
    cellElement.classList.add("has-note");
    const currentScale = (0.7 + track.volume * 0.4) * subdivFactor;
    cellElement.style.setProperty("--current-scale", currentScale);
    cellElement.style.setProperty("--vel-scale", track.volume);
    cellElement.style.transform = `translateY(-50%) scale(${currentScale})`;

    const hand = (idx % 2 === 0) ? "L" : "R";
    triggerSynthHit(track.type, track.instrument, val, synth.ctx.currentTime, track.volume, track.pitch, 0.15, hand);
  } else {
    const currentScale = 1.0 * subdivFactor;
    cellElement.style.setProperty("--current-scale", currentScale);
    cellElement.style.transform = `translateY(-50%) scale(${currentScale})`;
  }

  updateNotation();
  updateStepPositions();
  updateCellScales();
  updateMuteSoloVisuals();
}

// Read current grid to print box-notation string
function updateNotation() {
  let text = "";
  state.tracks.forEach(track => {
    const padName = cleanTrackName(track.name).padEnd(12, ' ');
    const stepSymbols = track.steps.map(s => s === "" ? "." : s).join(" ");
    text += `${padName} | ${stepSymbols}\n`;
  });
  notationText.value = text;
}

// Create new blank rhythm
function createNewCustomRhythm() {
  state.focusedTrackId = null;
  const name = newRhythmName.value.trim() || "Custom Groove";
  state.currentRhythmName = name;
  updateRhythmNameDisplay();

  const timeSig = newTimeSignature.value;
  const subdiv = parseInt(newSubdivision.value);
  const defaults = TIME_SIGNATURE_DEFAULTS[timeSig];

  state.timeSignature = timeSig;
  state.beats = defaults.beats;
  state.globalSubdivision = subdiv;
  state.humaniseTime = 40;
  state.humanisePitch = 20;
  state.humaniseVolume = 40;
  synth.humanisePitch = 20;
  humaniseRange.value = 33;
  humaniseVal.textContent = "33%";
  humaniseTimeRange.value = 40;
  humaniseTimeVal.textContent = "40%";
  humanisePitchRange.value = 20;
  humanisePitchVal.textContent = "20%";
  humaniseVolumeRange.value = 40;
  humaniseVolumeVal.textContent = "40%";

  state.customDjembeCount = 0;
  state.customKenkeniCount = 0;
  state.customSangbanCount = 0;
  state.customDundunbaCount = 0;
  state.customShekereCount = 0;

  // Re-synchronize select
  if (globalSubdivisionSelect) globalSubdivisionSelect.value = subdiv;

  const numLines = parseInt(document.getElementById("new-bars").value) || 2;
  const numSteps = numLines * state.beats * subdiv;
  state.currentRhythmDescription = "A custom rhythm groove created by the user.";

  const stepsPerLine = state.beats * subdiv;
  const shekereSteps = Array(stepsPerLine).fill("");
  const sectionLength = stepsPerLine / 4;
  for (let sec = 0; sec < 4; sec++) {
    const stepIdx = Math.round(sec * sectionLength);
    shekereSteps[stepIdx] = "O";
  }
  state.tracks = [
    { id: "djembe_0", name: "Djembe 1", type: "djembe", instrument: "djembe1", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.8, pitch: 0, muted: false, soloed: false },
    { id: "djembe_1", name: "Djembe 2", type: "djembe", instrument: "djembe2", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.8, pitch: 0, muted: false, soloed: false },
    { id: "djembe_2", name: "Djembe 3", type: "djembe", instrument: "djembe3", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.8, pitch: 0, muted: false, soloed: false },
    { id: "kenkeni_drum", name: "Kenkeni Drum", type: "dunun", instrument: "kenkeni", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.8, pitch: 0, muted: false, soloed: false },
    { id: "kenkeni_bell", name: "Kenkeni Bell", type: "bell", instrument: "kenkeni_bell", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.7, pitch: 0, muted: false, soloed: false },
    { id: "sangban_drum", name: "Sangban Drum", type: "dunun", instrument: "sangban", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.8, pitch: 0, muted: false, soloed: false },
    { id: "sangban_bell", name: "Sangban Bell", type: "bell", instrument: "sangban_bell", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.7, pitch: 0, muted: false, soloed: false },
    { id: "dundunba_drum", name: "Dundunba Drum", type: "dunun", instrument: "dundunba", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.8, pitch: 0, muted: false, soloed: false },
    { id: "dundunba_bell", name: "Dundunba Bell", type: "bell", instrument: "dundunba_bell", subdivision: subdiv, steps: Array(numSteps).fill(""), volume: 0.7, pitch: 0, muted: false, soloed: false },
    { id: "shekere_default", name: "Shekere", type: "shekere", instrument: "shekere", subdivision: subdiv, steps: shekereSteps, volume: 0.75, pitch: 0, muted: false, soloed: false }
  ];
  state.customDjembeCount = 0;

  renderGrid();
  newRhythmModal.classList.remove("active");
}

// LocalStorage Saving Routines
function saveCurrentPattern() {
  const rawName = saveNameInput.value.trim();
  if (!rawName) {
    alert("Please enter a name for the pattern.");
    return;
  }

  const savedData = {
    name: rawName,
    timeSignature: state.timeSignature,
    beats: state.beats,
    bpm: state.bpm,
    swing: state.swing,
    humaniseTime: state.humaniseTime,
    humanisePitch: state.humanisePitch,
    humaniseVolume: state.humaniseVolume,
    globalSubdivision: state.globalSubdivision,
    customSwingOffsets: state.customSwingOffsets,
    customDjembeCount: state.customDjembeCount,
    customKenkeniCount: state.customKenkeniCount,
    customSangbanCount: state.customSangbanCount,
    customDundunbaCount: state.customDundunbaCount,
    customShekereCount: state.customShekereCount,
    tracks: state.tracks.map(t => ({
      id: t.id,
      name: t.name,
      type: t.type,
      instrument: t.instrument,
      subdivision: t.subdivision,
      steps: t.steps,
      volume: t.volume,
      pitch: t.pitch ?? 0
    })),
    timestamp: Date.now()
  };

  const existing = JSON.parse(localStorage.getItem("djembe_studio_saves") || "[]");
  // Overwrite if same name
  const filtered = existing.filter(x => x.name !== rawName);
  filtered.push(savedData);
  localStorage.setItem("djembe_studio_saves", JSON.stringify(filtered));

  saveNameInput.value = "";
  loadCustomSaves();
}

// Load custom saves from LocalStorage to UI
function loadCustomSaves() {
  try {
    const saves = JSON.parse(localStorage.getItem("djembe_studio_saves") || "[]");
    savesList.innerHTML = "";

    if (saves.length === 0) {
      savesList.innerHTML = `<span style="font-size:0.8rem; color:var(--text-dim); text-align:center; padding:0.5rem 0;">No custom saved patterns yet.</span>`;
      return;
    }

    saves.forEach(save => {
      const item = document.createElement("div");
      item.className = "save-item";

      const info = document.createElement("div");
      info.className = "save-item-info";
      const name = document.createElement("strong");
      name.textContent = save.name;
      const details = document.createElement("span");
      details.className = "save-item-time";

      let dateStr = "Unknown Date";
      if (save.timestamp) {
        try {
          dateStr = new Date(save.timestamp).toLocaleDateString();
        } catch (e) { }
      }
      details.textContent = `${save.timeSignature || "4/4"} | ${save.bpm || 110} BPM | ${dateStr}`;

      info.appendChild(name);
      info.appendChild(details);
      item.appendChild(info);

      const actions = document.createElement("div");
      actions.className = "save-item-actions";

      const loadBtn = document.createElement("button");
      loadBtn.className = "save-item-btn";
      loadBtn.textContent = "Load";
      loadBtn.addEventListener("click", () => {
        loadSavedPattern(save);
      });

      const delBtn = document.createElement("button");
      delBtn.className = "save-item-btn";
      delBtn.style.color = "#ef4444";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        deleteSavedPattern(save.name);
      });

      actions.appendChild(loadBtn);
      actions.appendChild(delBtn);
      item.appendChild(actions);

      savesList.appendChild(item);
    });
  } catch (err) {
    console.error("Error reading saved patterns:", err);
    savesList.innerHTML = `<span style="font-size:0.8rem; color:var(--text-danger); text-align:center; padding:0.5rem 0;">Error reading saved patterns.</span>`;
  }
}

// Load custom pattern details
function loadSavedPattern(save) {
  state.focusedTrackId = null;
  state.currentRhythmName = save.name;
  updateRhythmNameDisplay();

  state.currentPreset = null;
  state.presetCallData = null;
  state.timeSignature = save.timeSignature;
  state.beats = save.beats;
  state.bpm = save.bpm;
  state.swing = save.swing || 0;
  state.humaniseTime = save.humaniseTime !== undefined ? save.humaniseTime : (save.humanise || 0);
  state.humanisePitch = save.humanisePitch !== undefined ? save.humanisePitch : (save.humanise || 0);
  state.humaniseVolume = save.humaniseVolume !== undefined ? save.humaniseVolume : 0;
  synth.humanisePitch = state.humanisePitch;
  state.globalSubdivision = save.globalSubdivision;

  state.customSwingOffsets = save.customSwingOffsets || {
    2: [0, 0],
    3: [0, 0, 0],
    4: [0, 0, 0, 0],
    6: [0, 0, 0, 0, 0, 0]
  };
  if (!save.customSwingOffsets) {
    [2, 3, 4, 6].forEach(s => applyGlobalSwingToOffsets(s, state.swing));
  }

  state.customDjembeCount = save.customDjembeCount || 0;
  state.customKenkeniCount = save.customKenkeniCount || 0;
  state.customSangbanCount = save.customSangbanCount || 0;
  state.customDundunbaCount = save.customDundunbaCount || 0;
  state.customShekereCount = save.customShekereCount || 0;

  bpmRange.value = state.bpm;
  bpmVal.textContent = state.bpm;
  swingRange.value = state.swing;
  swingVal.textContent = state.swing + "%";
  const avg = Math.round((state.humaniseTime + state.humanisePitch + state.humaniseVolume) / 3);
  humaniseRange.value = avg;
  humaniseVal.textContent = avg + "%";
  humaniseTimeRange.value = state.humaniseTime;
  humaniseTimeVal.textContent = state.humaniseTime + "%";
  humanisePitchRange.value = state.humanisePitch;
  humanisePitchVal.textContent = state.humanisePitch + "%";
  humaniseVolumeRange.value = state.humaniseVolume;
  humaniseVolumeVal.textContent = state.humaniseVolume + "%";
  if (globalSubdivisionSelect) globalSubdivisionSelect.value = state.globalSubdivision;

  // Filter out any Call track from save.tracks
  let savedTracksToLoad = [];
  if (save.tracks) {
    save.tracks.forEach(t => {
      const nameLC = (t.name || "").toLowerCase();
      const isCall = t.id === "special_0" || (t.id.startsWith("special_") && nameLC.includes("call"));
      if (isCall) {
        state.presetCallData = {
          id: t.id,
          name: t.name,
          steps: [...t.steps],
          subdivision: t.subdivision
        };
      } else {
        savedTracksToLoad.push(t);
      }
    });
  }

  state.tracks = savedTracksToLoad.map(t => ({
    id: t.id,
    name: t.name,
    type: t.type,
    instrument: t.instrument,
    subdivision: t.subdivision,
    steps: [...t.steps],
    volume: t.volume ?? 0.8,
    pitch: t.pitch ?? 0,
    muted: false,
    soloed: false
  }));

  renderGrid();
  updateSpecialButtonsState(null);
  if (savesModal) {
    savesModal.classList.remove("active");
  }
}

// Delete custom pattern details
function deleteSavedPattern(name) {
  const existing = JSON.parse(localStorage.getItem("djembe_studio_saves") || "[]");
  const filtered = existing.filter(x => x.name !== name);
  localStorage.setItem("djembe_studio_saves", JSON.stringify(filtered));
  loadCustomSaves();
}

function formatTrackSubKeyName(subKey) {
  let name = subKey.replace(/_/g, ' ');
  name = name.replace(/djembe/gi, 'Djembé');
  name = name.split(' ').map(word => {
    if (word === 'json') return 'JSON';
    if (word === 'pdf') return 'PDF';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
  return name;
}

// Render filtered rhythm cards in the Rhythm Library browser
function renderLibraryItems(searchQuery, filterSig) {
  libraryBody.innerHTML = "";
  const query = searchQuery.toLowerCase().trim();

  const filtered = RHYTHM_LIBRARY.filter(r => {
    const name = r.rhythm_name || r.name || "";
    const sig = r.timing || r.timeSignature || "";
    const matchesSearch = name.toLowerCase().includes(query);
    const matchesSig = filterSig === "all" || sig === filterSig;
    return matchesSearch && matchesSig;
  });

  libraryCount.textContent = `Showing ${filtered.length} of ${RHYTHM_LIBRARY.length} rhythms`;

  filtered.forEach(rhythm => {
    const card = document.createElement("div");
    card.className = "library-item";

    // Get unique instrument names (supporting both new and old format)
    let instNames = [];
    if (Array.isArray(rhythm.tracks)) {
      instNames = rhythm.tracks.map(t => t.part.replace(/ Drum| Bell/g, ""));
    } else if (rhythm.tracks) {
      const tracksObj = rhythm.tracks;
      if (tracksObj["1_djembe"]) {
        Object.keys(tracksObj["1_djembe"]).forEach(subKey => {
          instNames.push(formatTrackSubKeyName(subKey));
        });
      }
      if (tracksObj["2_kenkeni"] !== undefined) instNames.push("Kenkeni");
      if (tracksObj["3_kenkeni_bell"] !== undefined) instNames.push("Kenkeni Bell");
      if (tracksObj["4_sangban"] !== undefined) instNames.push("Sangban");
      if (tracksObj["5_sangban_bell"] !== undefined) instNames.push("Sangban Bell");
      if (tracksObj["6_dun_dun"] !== undefined) instNames.push("Dun Dun");
      if (tracksObj["7_dun_dun_bell"] !== undefined) instNames.push("Dun Dun Bell");
      if (tracksObj["8_shekere"] !== undefined) instNames.push("Shekere");
    }
    const uniqueInsts = [...new Set(instNames)];

    const info = document.createElement("div");
    info.className = "library-info";

    const title = document.createElement("div");
    title.className = "library-title";
    title.textContent = rhythm.rhythm_name || rhythm.name;

    const meta = document.createElement("div");
    meta.className = "library-meta";
    meta.style.display = "flex";
    meta.style.alignItems = "center";
    meta.style.flexWrap = "wrap";
    meta.style.gap = "0.5rem";

    const timing = rhythm.timing || rhythm.timeSignature || "12/8";
    const badge = document.createElement("span");
    const sigClass = timing.replace("/", "-");
    badge.className = `meter-badge meter-${sigClass}`;
    badge.textContent = timing;

    const sourceBadge = document.createElement("span");
    const sourceText = rhythm.source || "Classic WAP";
    sourceBadge.textContent = sourceText;
    sourceBadge.style.fontSize = "0.65rem";
    sourceBadge.style.padding = "0.15rem 0.45rem";
    sourceBadge.style.borderRadius = "4px";
    sourceBadge.style.fontWeight = "bold";
    sourceBadge.style.textTransform = "uppercase";
    sourceBadge.style.letterSpacing = "0.02em";

    if (sourceText.includes("Merged")) {
      sourceBadge.style.background = "rgba(74, 222, 128, 0.15)";
      sourceBadge.style.color = "#4ade80";
      sourceBadge.style.border = "1px solid rgba(74, 222, 128, 0.3)";
    } else if (sourceText.includes("Djembeloops")) {
      sourceBadge.style.background = "rgba(96, 165, 250, 0.15)";
      sourceBadge.style.color = "#60a5fa";
      sourceBadge.style.border = "1px solid rgba(96, 165, 250, 0.3)";
    } else {
      sourceBadge.style.background = "rgba(251, 191, 36, 0.15)";
      sourceBadge.style.color = "#fbbf24";
      sourceBadge.style.border = "1px solid rgba(251, 191, 36, 0.3)";
    }

    meta.appendChild(badge);
    meta.appendChild(sourceBadge);
    info.appendChild(title);
    info.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "library-actions";

    const btnLoad = document.createElement("button");
    btnLoad.className = "btn btn-primary btn-sm";
    btnLoad.textContent = "Load";
    btnLoad.addEventListener("click", () => {
      loadRhythm(rhythm);
      libraryModal.classList.remove("active");
    });

    actions.appendChild(btnLoad);
    card.appendChild(info);
    card.appendChild(actions);
    libraryBody.appendChild(card);
  });
}

// Floating Variations Popover Menu Logic
function openVariationsMenu(track, stepIdx, cellElement, event) {
  const popup = document.getElementById("variations-popup");
  const title = document.getElementById("variations-popup-title");
  const flamContainer = document.getElementById("variations-presets-flam");
  const rollContainer = document.getElementById("variations-presets-roll");
  const tripletContainer = document.getElementById("variations-presets-triplet");
  const closeBtn = document.getElementById("variations-popup-close");
  const clearBtn = document.getElementById("variations-clear-btn");
  const builderHit1 = document.getElementById("builder-hit1");
  const builderHit2 = document.getElementById("builder-hit2");
  const builderHit3 = document.getElementById("builder-hit3");
  const builderTo2 = document.getElementById("builder-to-2");
  const builderBtnFlam = document.getElementById("builder-btn-flam");
  const builderBtnRoll = document.getElementById("builder-btn-roll");
  const builderBtnTriplet = document.getElementById("builder-btn-triplet");
  const builderApply = document.getElementById("builder-apply");

  if (!popup) return;

  title.textContent = "Flams / Rolls";



  let options = [];
  let presetsFlam = [];
  let presetsRoll = [];
  let presetsTriplet = [];

  if (track.type === "djembe") {
    options = [
      { val: "B", label: "Bass (B)" },
      { val: "T", label: "Tone (T)" },
      { val: "S", label: "Slap (S)" },
      { val: "M", label: "Muffled (M)" }
    ];
    presetsFlam = [
      { val: "B/T", label: "B/T" },
      { val: "S/T", label: "S/T" },
      { val: "B/S", label: "B/S" },
      { val: "S/S", label: "S/S" },
      { val: "T/T", label: "T/T" },
      { val: "T/S", label: "T/S" }
    ];
    presetsRoll = [
      { val: "S-S", label: "Slap-Slap" },
      { val: "T-T", label: "Tone-Tone" },
      { val: "B-B", label: "Bass-Bass" },
      { val: "S-T", label: "Slap-Tone" },
      { val: "T-S", label: "Tone-Slap" },
      { val: "B-T", label: "Bass-Tone" },
      { val: "B-S", label: "Bass-Slap" }
    ];
    presetsTriplet = [
      { val: "S*S*S", label: "Slap-Slap-Slap" },
      { val: "T*T*T", label: "Tone-Tone-Tone" },
      { val: "B*B*B", label: "Bass-Bass-Bass" },
      { val: "S*T*S", label: "Slap-Tone-Slap" },
      { val: "B*T*S", label: "Bass-Tone-Slap" },
      { val: "T*S*T", label: "Tone-Slap-Tone" }
    ];
  } else {
    // dunun, bell, shekere
    const isShekere = track.type === "shekere";
    const openChar = "O";
    const muteChar = "X";
    const openLbl = isShekere ? "Shake (O)" : "Open (O)";
    const muteLbl = isShekere ? "Tap (X)" : "Muted (X)";

    options = [
      { val: openChar, label: openLbl },
      { val: muteChar, label: muteLbl }
    ];

    presetsFlam = [
      { val: `${openChar}/${muteChar}`, label: `${openChar}/${muteChar}` },
      { val: `${muteChar}/${openChar}`, label: `${muteChar}/${openChar}` },
      { val: `${openChar}/${openChar}`, label: `${openChar}/${openChar}` },
      { val: `${muteChar}/${muteChar}`, label: `${muteChar}/${muteChar}` }
    ];
    presetsRoll = [
      { val: `${openChar}-${openChar}`, label: `${openChar}-${openChar}` },
      { val: `${muteChar}-${muteChar}`, label: `${muteChar}-${muteChar}` },
      { val: `${openChar}-${muteChar}`, label: `${openChar}-${muteChar}` },
      { val: `${muteChar}-${openChar}`, label: `${muteChar}-${openChar}` }
    ];
    presetsTriplet = [
      { val: `${openChar}*${openChar}*${openChar}`, label: `${openChar}*${openChar}*${openChar}` },
      { val: `${muteChar}*${muteChar}*${muteChar}`, label: `${muteChar}*${muteChar}*${muteChar}` },
      { val: `${openChar}*${muteChar}*${openChar}`, label: `${openChar}*${muteChar}*${openChar}` },
      { val: `${muteChar}*${openChar}*${muteChar}`, label: `${muteChar}*${openChar}*${muteChar}` }
    ];
  }

  // Populate preset grids dynamically with SVG icons and values
  const renderPresetsInContainer = (container, presets) => {
    if (!container) return;
    container.innerHTML = "";
    presets.forEach(preset => {
      const btn = document.createElement("button");
      btn.className = "variation-btn";
      btn.title = preset.label;
      btn.type = "button";
      
      const iconSpan = document.createElement("span");
      iconSpan.className = "variation-btn-icon";
      iconSpan.innerHTML = getSoundIcon(track, preset.val);
      btn.appendChild(iconSpan);
      
      btn.onclick = (e) => {
        e.stopPropagation();
        applyValue(preset.val);
      };
      
      container.appendChild(btn);
    });
  };

  renderPresetsInContainer(flamContainer, presetsFlam);
  renderPresetsInContainer(rollContainer, presetsRoll);
  renderPresetsInContainer(tripletContainer, presetsTriplet);

  if (builderHit1 && builderHit2 && builderApply) {
    options.forEach(opt => {
      const o1 = document.createElement("option");
      o1.value = opt.val;
      o1.textContent = opt.label;
      builderHit1.appendChild(o1);

      const o2 = document.createElement("option");
      o2.value = opt.val;
      o2.textContent = opt.label;
      builderHit2.appendChild(o2);

      if (builderHit3) {
        const o3 = document.createElement("option");
        o3.value = opt.val;
        o3.textContent = opt.label;
        builderHit3.appendChild(o3);
      }
    });

    let selectedType = "flam";

    const updateBuilderUI = (type) => {
      selectedType = type;
      [builderBtnFlam, builderBtnRoll, builderBtnTriplet].forEach(btn => {
        if (btn) btn.classList.remove("active");
      });
      if (type === "flam") {
        if (builderBtnFlam) builderBtnFlam.classList.add("active");
        if (builderHit3) builderHit3.style.display = "none";
        if (builderTo2) builderTo2.style.display = "none";
      } else if (type === "roll") {
        if (builderBtnRoll) builderBtnRoll.classList.add("active");
        if (builderHit3) builderHit3.style.display = "none";
        if (builderTo2) builderTo2.style.display = "none";
      } else if (type === "triplet") {
        if (builderBtnTriplet) builderBtnTriplet.classList.add("active");
        if (builderHit3) builderHit3.style.display = "";
        if (builderTo2) builderTo2.style.display = "";
      }
    };

    if (builderBtnFlam) builderBtnFlam.onclick = () => updateBuilderUI("flam");
    if (builderBtnRoll) builderBtnRoll.onclick = () => updateBuilderUI("roll");
    if (builderBtnTriplet) {
      builderBtnTriplet.onclick = () => updateBuilderUI("triplet");
    }

    const curVal = track.steps[stepIdx];
    if (curVal && curVal.includes("/")) {
      const [h1, h2] = curVal.split("/");
      builderHit1.value = h1;
      builderHit2.value = h2;
      updateBuilderUI("flam");
    } else if (curVal && curVal.includes("-")) {
      const [h1, h2] = curVal.split("-");
      builderHit1.value = h1;
      builderHit2.value = h2;
      updateBuilderUI("roll");
    } else if (curVal && curVal.includes("*")) {
      const [h1, h2, h3] = curVal.split("*");
      builderHit1.value = h1;
      builderHit2.value = h2;
      if (builderHit3) builderHit3.value = h3 || h1;
      updateBuilderUI("triplet");
    } else if (curVal && curVal !== "") {
      builderHit1.value = curVal;
      builderHit2.value = curVal;
      if (builderHit3) builderHit3.value = curVal;
      updateBuilderUI("flam");
    } else {
      updateBuilderUI("flam");
    }

    builderApply.onclick = () => {
      const h1 = builderHit1.value;
      const h2 = builderHit2.value;
      if (selectedType === "triplet") {
        const h3 = builderHit3 ? builderHit3.value : h1;
        applyValue(`${h1}*${h2}*${h3}`);
      } else {
        const delimiter = selectedType === "flam" ? "/" : "-";
        applyValue(`${h1}${delimiter}${h2}`);
      }
    };
  }

  if (clearBtn) {
    clearBtn.onclick = () => {
      applyValue("");
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => {
      popup.classList.remove("active");
    };
  }

  function applyValue(newVal) {
    track.steps[stepIdx] = newVal;

    cellElement.style.removeProperty("background");
    cellElement.style.removeProperty("border-color");
    cellElement.style.removeProperty("box-shadow");
    cellElement.className = "step-cell";
    cellElement.innerHTML = "";
    if (newVal === "") {
      const stepInLine = stepIdx % (track.subdivision * state.beats);
      const is12or6 = (state.timeSignature === "12/8" || state.timeSignature === "6/8");
      const beatInterval = (is12or6 && track.subdivision === 6) ? 3 : track.subdivision;
      if (stepInLine % beatInterval === 0) {
        cellElement.classList.add("beat-start-empty");
      }
    }

    const subdivFactor = (state.beats * track.subdivision > 16) ? 0.65 : 1.0;

    if (newVal !== "") {
      cellElement.innerHTML = getSoundIcon(track, newVal);

      const studioTheme = isIconTheme();
      if (newVal.includes("/")) {
        cellElement.className = "step-cell step-cell-composite step-cell-flam has-note";
        if (!studioTheme) {
          const [h1, h2] = newVal.split("/");
          const c1 = getHitColor(track.type, h1, track.instrument);
          const c2 = getHitColor(track.type, h2, track.instrument);
          const g2 = getHitGlowColor(track.type, h2, track.instrument);
          cellElement.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
          cellElement.style.borderColor = c2;
          cellElement.style.boxShadow = `0 0 calc(var(--vel-scale, 0.8) * 15px) ${g2}`;
        }
      } else if (newVal.includes("-")) {
        cellElement.className = "step-cell step-cell-composite step-cell-roll has-note";
        if (!studioTheme) {
          const [h1, h2] = newVal.split("-");
          const c1 = getHitColor(track.type, h1, track.instrument);
          const c2 = getHitColor(track.type, h2, track.instrument);
          const g2 = getHitGlowColor(track.type, h2, track.instrument);
          cellElement.style.background = `linear-gradient(90deg, ${c1} 0%, ${c1} 50%, ${c2} 50%, ${c2} 100%)`;
          cellElement.style.borderColor = c2;
          cellElement.style.boxShadow = `0 0 calc(var(--vel-scale, 0.8) * 15px) ${g2}`;
        }
      } else if (newVal.includes("*")) {
        cellElement.className = "step-cell step-cell-composite step-cell-triplet has-note";
        if (!studioTheme) {
          const [h1, h2, h3] = newVal.split("*");
          const c1 = getHitColor(track.type, h1, track.instrument);
          const c2 = getHitColor(track.type, h2, track.instrument);
          const c3 = getHitColor(track.type, h3, track.instrument);
          const g3 = getHitGlowColor(track.type, h3, track.instrument);
          cellElement.style.background = `linear-gradient(90deg, ${c1} 0%, ${c1} 33.3%, ${c2} 33.3%, ${c2} 66.6%, ${c3} 66.6%, ${c3} 100%)`;
          cellElement.style.borderColor = c3;
          cellElement.style.boxShadow = `0 0 calc(var(--vel-scale, 0.8) * 15px) ${g3}`;
        }
      } else {
        cellElement.className = `step-cell ${track.type}-${newVal} ${track.instrument}-${newVal} has-note`;
      }

      const currentScale = (0.7 + track.volume * 0.4) * subdivFactor;
      cellElement.style.setProperty("--current-scale", currentScale);
      cellElement.style.setProperty("--vel-scale", track.volume);
      cellElement.style.transform = `translateY(-50%) scale(${currentScale})`;

      const hand = (stepIdx % 2 === 0) ? "L" : "R";
      triggerSynthHit(track.type, track.instrument, newVal, synth.ctx.currentTime, track.volume, track.pitch, 0.15, hand);
    } else {
      const currentScale = 1.0 * subdivFactor;
      cellElement.style.setProperty("--current-scale", currentScale);
      cellElement.style.transform = `translateY(-50%) scale(${currentScale})`;
    }

    updateNotation();
    updateStepPositions();
    updateCellScales();
    popup.classList.remove("active");
  }

  popup.classList.add("active");
  const rect = cellElement.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let popupLeft = rect.left + scrollLeft + (rect.width / 2) - 170;
  popupLeft = Math.max(10, Math.min(window.innerWidth - 350, popupLeft));
  popup.style.left = `${popupLeft}px`;

  const popupHeight = popup.offsetHeight || 480;
  if (rect.top - popupHeight - 10 > 0) {
    popup.style.top = `${rect.top + scrollTop - popupHeight - 10}px`;
  } else {
    popup.style.top = `${rect.bottom + scrollTop + 10}px`;
  }
}

// Run initializer
init();

// Expose for testing/debugging
window.loadRhythm = loadRhythm;
window.state = state;
window.getSwungStepTime = getSwungStepTime;
window.getSecondsPerBeat = getSecondsPerBeat;
window.isIconTheme = isIconTheme;
