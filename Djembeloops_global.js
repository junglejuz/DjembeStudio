// for cross browser compatibility
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
var selectedPattern = "madanI";
if (localStorage.getItem("localStorageisCleared9") === null) {
	localStorage.clear();
	localStorage.localStorageisCleared9 = "local storage has been cleared 9 at the beggining";
	console.log("local storage 9 cleared!");
};
let params = (new URL(document.location)).searchParams;
var onCordova= false;
var deleteRhythm;
var MasterVolumeValue;
var aceNoteToPlay;
var aceLength;
var swingAlt;
var soloSound = 4;
var swingFactor = 10;
var userPhraseisSelected = 0;
var phraseStepsDoc =0;
var VolumeDjembeOne;
var bufferSteps = 16;
var VolumeDjembeTwo;
var VolumeDjembeThree;
var VolumeDjembeSolo;
var VolumeKenkeni;
var VolumeSangban;
var VolumeDoundoun;
var DLphraseSellected;
var VolumeKenkeni_Bell;
var VolumeSangban_Bell;
var VolumeDoundoun_Bell;
var VolumeShekere;
var noteRollValues = [];
var noteTripleValues = [];
var noteSwingValues = [];
var swingA;
var swingB;
var swingC;
var swingD;
var playTheShekere;
var phraseNoteToPlay=0;
var aceBufferNotes=[];
var phraseNotes=[];
var selfSteps3 = 16;
var signalSteps = 0;
var currentNote = 0;
var phraseLength=16;
var firstTimeEver = true;
var numberOfPhrasesInTotal = 0;
var numberOfRhythmsInTotal = 0;
if (localStorage.firstTimeEver) {
      firstTimeEver = false;
}; 
var viewConfig;	
var signalBeatNumber = 0;
var signalIsOn = false;
var aceIssetToGo = false;
var phraseBufferNotes=[];
var phraseIssetToGo = false;
var phraseIsOn= false;
var signalIssetToGo = false;
var aceNotes = [];
var aceselfSteps = 16;
var flamDelay = 0.07;
var rollDelay2;
var titleWidth;
var tabcontainer;
var	signalStart = false;
var selfTempo;
var referenceTempo;
var selectedName;
var selfSteps = 16;
var groupMetronome = 4;
var aceIsOn = false;
var DjembeOne_BassFile;
var DjembeOne_OpenFile;
var DjembeOne_SlapFile;
var DjembeOne_MuteFile;
var DjembeTwo_BassFile;
var DjembeTwo_OpenFile;
var DjembeTwo_SlapFile;
var DjembeTwo_MuteFile;
var DjembeThree_BassFile;
var DjembeThree_OpenFile;
var DjembeThree_SlapFile;
var DjembeThree_MuteFile;
var DjembeOne_BassLFile;
var DjembeOne_OpenLFile;
var DjembeOne_SlapLFile;
var DjembeOne_MuteLFile;
var DjembeTwo_BassLFile;
var DjembeTwo_OpenLFile;
var DjembeTwo_SlapLFile;
var DjembeTwo_MuteLFile;
var DjembeThree_BassLFile;
var DjembeThree_OpenLFile;
var DjembeThree_SlapLFile;
var DjembeThree_MuteLFile;
var DjembeSolo_BassLFile;
var DjembeSolo_OpenLFile;
var DjembeSolo_SlapLFile;
var DjembeSolo_MuteLFile;
var DjembeSolo_BassFile;
var DjembeSolo_OpenFile;
var DjembeSolo_SlapFile;
var DjembeSolo_MuteFile;
var Kenkeni_OpenFile;
var Kenkeni_MuffledFile;
var Kenkeni_Bell_OpenFile;
var Kenkeni_Bell_MuffledFile;
var Sangban_OpenFile;
var Sangban_MuffledFile;
var Sangban_Bell_OpenFile;
var Sangban_Bell_MuffledFile;
var Doundoun_OpenFile;
var Doundoun_MuffledFile;
var Doundoun_Bell_OpenFile;
var Doundoun_Bell_MuffledFile;
var ShekereFile;
var ShekereBFile;



var DjembeOne_BassFileGainValue = 1;
var DjembeOne_OpenFileGainValue = 1;
var DjembeOne_SlapFileGainValue = 1;
var DjembeOne_MuteFileGainValue = 1;
var DjembeTwo_BassFileGainValue = 1;
var DjembeTwo_OpenFileGainValue = 1;
var DjembeTwo_SlapFileGainValue = 1;
var DjembeTwo_MuteFileGainValue = 1;
var DjembeThree_BassFileGainValue = 1;
var DjembeThree_OpenFileGainValue = 1;
var DjembeThree_SlapFileGainValue = 1;
var DjembeThree_MuteFileGainValue = 1;
var DjembeOne_BassLFileGainValue = 1;
var DjembeOne_OpenLFileGainValue = 1;
var DjembeOne_SlapLFileGainValue = 1;
var DjembeOne_MuteLFileGainValue = 1;
var DjembeTwo_BassLFileGainValue = 1;
var DjembeTwo_OpenLFileGainValue = 1;
var DjembeTwo_SlapLFileGainValue = 1;
var DjembeTwo_MuteLFileGainValue = 1;
var DjembeThree_BassLFileGainValue = 1;
var DjembeThree_OpenLFileGainValue = 1;
var DjembeThree_SlapLFileGainValue = 1;
var DjembeThree_MuteLFileGainValue = 1;
var DjembeSolo_BassLFileGainValue = 1;
var DjembeSolo_OpenLFileGainValue = 1;
var DjembeSolo_SlapLFileGainValue = 1;
var DjembeSolo_MuteLFileGainValue = 1;
var DjembeSolo_BassFileGainValue = 1;
var DjembeSolo_OpenFileGainValue = 1;
var DjembeSolo_SlapFileGainValue = 1;
var DjembeSolo_MuteFileGainValue = 1;
var Kenkeni_OpenFileGainValue = 1;
var Kenkeni_MuffledFileGainValue = 1;
var Kenkeni_Bell_OpenFileGainValue = 1;
var Kenkeni_Bell_MuffledFileGainValue = 1;
var Sangban_OpenFileGainValue = 1;
var Sangban_MuffledFileGainValue = 1;
var Sangban_Bell_OpenFileGainValue = 1;
var Sangban_Bell_MuffledFileGainValue = 1;
var Doundoun_OpenFileGainValue = 1;
var Doundoun_MuffledFileGainValue = 1;
var Doundoun_Bell_OpenFileGainValue = 1;
var Doundoun_Bell_MuffledFileGainValue = 1;
var ShekereFileGainValue = 1;
var ShekereBFileGainValue = 1;

  
var DjembeOne_BassGain= audioCtx.createGain();
var DjembeOne_OpenGain= audioCtx.createGain();
var DjembeOne_SlapGain= audioCtx.createGain();
var DjembeOne_MuteGain= audioCtx.createGain();
var DjembeTwo_BassGain= audioCtx.createGain();
var DjembeTwo_OpenGain= audioCtx.createGain();
var DjembeTwo_SlapGain= audioCtx.createGain();
var DjembeTwo_MuteGain= audioCtx.createGain();
var DjembeThree_BassGain= audioCtx.createGain();
var DjembeThree_OpenGain= audioCtx.createGain();
var DjembeThree_SlapGain= audioCtx.createGain();
var DjembeThree_MuteGain= audioCtx.createGain();
var DjembeSolo_BassGain= audioCtx.createGain();
var DjembeSolo_OpenGain= audioCtx.createGain();
var DjembeSolo_SlapGain= audioCtx.createGain();
var DjembeSolo_MuteGain= audioCtx.createGain();
var DjembeOne_BassLGain= audioCtx.createGain();
var DjembeOne_OpenLGain= audioCtx.createGain();
var DjembeOne_SlapLGain= audioCtx.createGain();
var DjembeOne_MuteLGain= audioCtx.createGain();
var DjembeTwo_BassLGain= audioCtx.createGain();
var DjembeTwo_OpenLGain= audioCtx.createGain();
var DjembeTwo_SlapLGain= audioCtx.createGain();
var DjembeTwo_MuteLGain= audioCtx.createGain();
var DjembeThree_BassLGain= audioCtx.createGain();
var DjembeThree_OpenLGain= audioCtx.createGain();
var DjembeThree_SlapLGain= audioCtx.createGain();
var DjembeThree_MuteLGain= audioCtx.createGain();
var DjembeSolo_BassLGain= audioCtx.createGain();
var DjembeSolo_OpenLGain= audioCtx.createGain();
var DjembeSolo_SlapLGain= audioCtx.createGain();
var DjembeSolo_MuteLGain= audioCtx.createGain();
var Kenkeni_OpenGain= audioCtx.createGain();
var Kenkeni_MuffledGain= audioCtx.createGain();
var Kenkeni_Bell_OpenGain= audioCtx.createGain();
var Kenkeni_Bell_MuffledGain= audioCtx.createGain();
var Sangban_OpenGain= audioCtx.createGain();
var Sangban_MuffledGain= audioCtx.createGain();
var Sangban_Bell_OpenGain= audioCtx.createGain();
var Sangban_Bell_MuffledGain= audioCtx.createGain();
var Doundoun_OpenGain= audioCtx.createGain();
var Doundoun_MuffledGain= audioCtx.createGain();
var Doundoun_Bell_OpenGain= audioCtx.createGain();
var Doundoun_Bell_MuffledGain= audioCtx.createGain();
var ShekereGain= audioCtx.createGain();
var ShekereBGain= audioCtx.createGain();

var notesArray = [];
var signalNotes = [];


var DjembeOne_BassMuted = false;
var DjembeOne_OpenMuted = false;
var DjembeOne_SlapMuted = false;
var DjembeOne_MuteMuted = false;
var DjembeTwo_BassMuted = false;
var DjembeTwo_OpenMuted = false;
var DjembeTwo_SlapMuted = false;
var DjembeTwo_MuteMuted = false;
var DjembeThree_BassMuted = false;
var DjembeThree_OpenMuted = false;
var DjembeSolo_SlapMuted = false;
var DjembeSolo_MuteMuted = false;
var DjembeSolo_BassMuted = false;
var DjembeSolo_OpenMuted = false;
var DjembeThree_SlapMuted = false;
var DjembeThree_MuteMuted = false;
var DjembeOne_BassLMuted = false;
var DjembeOne_OpenLMuted = false;
var DjembeOne_SlapLMuted = false;
var DjembeOne_MuteLMuted = false;
var DjembeTwo_BassLMuted = false;
var DjembeTwo_OpenLMuted = false;
var DjembeTwo_SlapLMuted = false;
var DjembeTwo_MuteLMuted = false;
var DjembeThree_BassLMuted = false;
var DjembeThree_OpenLMuted = false;
var DjembeThree_SlapLMuted = false;
var DjembeThree_MuteLMuted = false;
var DjembeSolo_BassLMuted = false;
var DjembeSolo_OpenLMuted = false;
var DjembeSolo_SlapLMuted = false;
var DjembeSolo_MuteLMuted = false;
var Kenkeni_OpenMuted = false;
var Kenkeni_MuffledMuted = false;
var Kenkeni_Bell_OpenMuted = false;
var Kenkeni_Bell_MuffledMuted = false;
var Sangban_OpenMuted = false;
var Sangban_MuffledMuted = false;
var Sangban_Bell_OpenMuted = false;
var Sangban_Bell_MuffledMuted = false;
var Doundoun_OpenMuted = false;
var Doundoun_MuffledMuted = false;
var Doundoun_Bell_OpenMuted = false;
var Doundoun_Bell_MuffledMuted = false;
var ShekereMuted = false;
var ShekereBMuted = false;

DjembeOne_BassGain.connect(audioCtx.destination);
DjembeOne_OpenGain.connect(audioCtx.destination);
DjembeOne_SlapGain.connect(audioCtx.destination);
DjembeOne_MuteGain.connect(audioCtx.destination);
DjembeTwo_BassGain.connect(audioCtx.destination);
DjembeTwo_OpenGain.connect(audioCtx.destination);
DjembeTwo_SlapGain.connect(audioCtx.destination);
DjembeTwo_MuteGain.connect(audioCtx.destination);
DjembeThree_BassGain.connect(audioCtx.destination);
DjembeThree_OpenGain.connect(audioCtx.destination);
DjembeThree_SlapGain.connect(audioCtx.destination);
DjembeThree_MuteGain.connect(audioCtx.destination);
DjembeSolo_BassGain.connect(audioCtx.destination);
DjembeSolo_OpenGain.connect(audioCtx.destination);
DjembeSolo_SlapGain.connect(audioCtx.destination);
DjembeSolo_MuteGain.connect(audioCtx.destination);
DjembeOne_BassLGain.connect(audioCtx.destination);
DjembeOne_OpenLGain.connect(audioCtx.destination);
DjembeOne_SlapLGain.connect(audioCtx.destination);
DjembeOne_MuteLGain.connect(audioCtx.destination);
DjembeTwo_BassLGain.connect(audioCtx.destination);
DjembeTwo_OpenLGain.connect(audioCtx.destination);
DjembeTwo_SlapLGain.connect(audioCtx.destination);
DjembeTwo_MuteLGain.connect(audioCtx.destination);
DjembeThree_BassLGain.connect(audioCtx.destination);
DjembeThree_OpenLGain.connect(audioCtx.destination);
DjembeThree_SlapLGain.connect(audioCtx.destination);
DjembeThree_MuteLGain.connect(audioCtx.destination);
DjembeSolo_BassLGain.connect(audioCtx.destination);
DjembeSolo_OpenLGain.connect(audioCtx.destination);
DjembeSolo_SlapLGain.connect(audioCtx.destination);
DjembeSolo_MuteLGain.connect(audioCtx.destination);
Kenkeni_OpenGain.connect(audioCtx.destination);
Kenkeni_MuffledGain.connect(audioCtx.destination);
Kenkeni_Bell_OpenGain.connect(audioCtx.destination);
Kenkeni_Bell_MuffledGain.connect(audioCtx.destination);
Sangban_OpenGain.connect(audioCtx.destination);
Sangban_MuffledGain.connect(audioCtx.destination);
Sangban_Bell_OpenGain.connect(audioCtx.destination);
Sangban_Bell_MuffledGain.connect(audioCtx.destination);
Doundoun_OpenGain.connect(audioCtx.destination);
Doundoun_MuffledGain.connect(audioCtx.destination);
Doundoun_Bell_OpenGain.connect(audioCtx.destination);
Doundoun_Bell_MuffledGain.connect(audioCtx.destination);
ShekereGain.connect(audioCtx.destination);
ShekereBGain.connect(audioCtx.destination);

DjembeOne_BassGain.gain.value = 1;
DjembeOne_OpenGain.gain.value = 1;
DjembeOne_SlapGain.gain.value = 1;
DjembeOne_MuteGain.gain.value = 1;
DjembeTwo_BassGain.gain.value = 1;
DjembeTwo_OpenGain.gain.value = 1;
DjembeTwo_SlapGain.gain.value = 1;
DjembeTwo_MuteGain.gain.value = 1;
DjembeThree_BassGain.gain.value = 1;
DjembeThree_OpenGain.gain.value = 1;
DjembeThree_SlapGain.gain.value = 1;
DjembeThree_MuteGain.gain.value = 1;
DjembeSolo_BassGain.gain.value = 1;
DjembeSolo_OpenGain.gain.value = 1;
DjembeSolo_SlapGain.gain.value = 1;
DjembeSolo_MuteGain.gain.value = 1;
DjembeOne_BassLGain.gain.value = 1;
DjembeOne_OpenLGain.gain.value = 1;
DjembeOne_SlapLGain.gain.value = 1;
DjembeOne_MuteLGain.gain.value = 1;
DjembeTwo_BassLGain.gain.value = 1;
DjembeTwo_OpenLGain.gain.value = 1;
DjembeTwo_SlapLGain.gain.value = 1;
DjembeTwo_MuteLGain.gain.value = 1;
DjembeThree_BassLGain.gain.value = 1;
DjembeThree_OpenLGain.gain.value = 1;
DjembeThree_SlapLGain.gain.value = 1;
DjembeThree_MuteLGain.gain.value = 1;
DjembeSolo_BassLGain.gain.value = 1;
DjembeSolo_OpenLGain.gain.value = 1;
DjembeSolo_SlapLGain.gain.value = 1;
DjembeSolo_MuteLGain.gain.value = 1;
Kenkeni_OpenGain.gain.value = 1;
Kenkeni_MuffledGain.gain.value = 1;
Kenkeni_Bell_OpenGain.gain.value = 1;
Kenkeni_Bell_MuffledGain.gain.value = 1;
Sangban_OpenGain.gain.value = 1;
Sangban_MuffledGain.gain.value = 1;
Sangban_Bell_OpenGain.gain.value = 1;
Sangban_Bell_MuffledGain.gain.value = 1;
Doundoun_OpenGain.gain.value = 1;
Doundoun_MuffledGain.gain.value = 1;
Doundoun_Bell_OpenGain.gain.value = 1;
Doundoun_Bell_MuffledGain.gain.value = 1;
ShekereGain.gain.value = 1;
ShekereBGain.gain.value = 1;

var i;

var allTheSounds = [
"https://www.djembeloops.com/snd/DjembeOne_Bass.mp3", 
"https://www.djembeloops.com/snd/DjembeOne_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeOne_Slap.mp3", 
"https://www.djembeloops.com/snd/DjembeTwo_Bass.mp3", 
"https://www.djembeloops.com/snd/DjembeTwo_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeTwo_Slap.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_Bass.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_Slap.mp3", 
"https://www.djembeloops.com/snd/Kenkeni_Open.mp3", 
"https://www.djembeloops.com/snd/Kenkeni_Muffled.mp3", 
"https://www.djembeloops.com/snd/Kenkeni_Bell_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeOne_BassL.mp3",
"https://www.djembeloops.com/snd/Sangban_Open.mp3", 
"https://www.djembeloops.com/snd/Sangban_Muffled.mp3", 
"https://www.djembeloops.com/snd/Sangban_Bell_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeOne_OpenL.mp3",
"https://www.djembeloops.com/snd/Doundoun_Open.mp3", 
"https://www.djembeloops.com/snd/Doundoun_Muffled.mp3", 
"https://www.djembeloops.com/snd/Doundoun_Bell_Open.mp3",
"https://www.djembeloops.com/snd/DjembeOne_SlapL.mp3",
"https://www.djembeloops.com/snd/DjembeTwo_BassL.mp3", 
"https://www.djembeloops.com/snd/DjembeTwo_OpenL.mp3", 
"https://www.djembeloops.com/snd/DjembeTwo_SlapL.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_BassL.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_OpenL.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_SlapL.mp3",
"https://www.djembeloops.com/snd/Shekere.mp3",
"https://www.djembeloops.com/snd/ShekereB.mp3",
"https://www.djembeloops.com/snd/DjembeSolo_Bass.mp3", 
"https://www.djembeloops.com/snd/DjembeSolo_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeSolo_Slap.mp3", 
"https://www.djembeloops.com/snd/DjembeSolo_BassL.mp3", 
"https://www.djembeloops.com/snd/DjembeSolo_OpenL.mp3", 
"https://www.djembeloops.com/snd/DjembeSolo_SlapL.mp3", 
"https://www.djembeloops.com/snd/DjembeOne_Mute.mp3", 
"https://www.djembeloops.com/snd/DjembeOne_MuteL.mp3", 
"https://www.djembeloops.com/snd/DjembeTwo_Mute.mp3", 
"https://www.djembeloops.com/snd/DjembeTwo_MuteL.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_Mute.mp3", 
"https://www.djembeloops.com/snd/DjembeThree_MuteL.mp3", 
"https://www.djembeloops.com/snd/DjembeSolo_Mute.mp3", 
"https://www.djembeloops.com/snd/DjembeSolo_MuteL.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_Bass.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_Slap.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_BassL.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_OpenL.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_SlapL.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_Mute.mp3", 
"https://www.djembeloops.com/snd/DjembeFive_MuteL.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_Bass.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_Slap.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_BassL.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_OpenL.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_SlapL.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_Mute.mp3", 
"https://www.djembeloops.com/snd/DjembeSix_MuteL.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_Bass.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_Open.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_Slap.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_BassL.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_OpenL.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_SlapL.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_Mute.mp3", 
"https://www.djembeloops.com/snd/DjembeSeven_MuteL.mp3", 
];

var allTheNotes = [
	"DjembeOne_Bass", 
	"DjembeOne_Open", 
	"DjembeOne_Slap", 
	"DjembeTwo_Bass", 
	"DjembeTwo_Open", 
	"DjembeTwo_Slap", 
	"DjembeThree_Bass", 
	"DjembeThree_Open", 
	"DjembeThree_Slap", 
	"Kenkeni_Open", 
	"Kenkeni_Muffled", 
	"Kenkeni_Bell_Open", 
	"Kenkeni_Bell_Muffled",
	"Sangban_Open", 
	"Sangban_Muffled", 
	"Sangban_Bell_Open", 
	"Sangban_Bell_Muffled", 
	"Doundoun_Open", 
	"Doundoun_Muffled", 
	"Doundoun_Bell_Open",
	"Doundoun_Bell_Muffled",
	"Shekere",
	"DjembeSolo_Bass", 
	"DjembeSolo_Open", 
	"DjembeSolo_Slap", 
	"DjembeOne_Mute", 
	"DjembeTwo_Mute", 
	"DjembeThree_Mute", 
	"DjembeSolo_Mute", 
];

var soundNumber = 43;
var checkload = 0; 

async function setupSample0(sample) {
  source0 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source0.buffer = buffer;
		DjembeOne_BassFile = buffer;
        source0.connect(audioCtx.destination);
        source0.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source0.buffer;
}

async function setupSample1(sample) {
  source1 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source1.buffer = buffer;
		DjembeOne_OpenFile = buffer;
        source1.connect(audioCtx.destination);
        source1.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source1.buffer;
}


async function setupSample2(sample) {
  source2 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source2.buffer = buffer;
		DjembeOne_SlapFile = buffer;
        source2.connect(audioCtx.destination);
        source2.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source2.buffer;
}

async function setupSample3(sample) {
  source3 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source3.buffer = buffer;
		DjembeTwo_BassFile = buffer;
        source3.connect(audioCtx.destination);
        source3.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source3.buffer;
}

async function setupSample4(sample) {
  source4 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source4.buffer = buffer;
		DjembeTwo_OpenFile = buffer;
        source4.connect(audioCtx.destination);
        source4.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source4.buffer;
}

async function setupSample5(sample) {
  source5 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source5.buffer = buffer;
		DjembeTwo_SlapFile = buffer;
        source5.connect(audioCtx.destination);
        source5.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source5.buffer;
}

async function setupSample6(sample) {
  source6 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source6.buffer = buffer;
		DjembeThree_BassFile = buffer;
        source6.connect(audioCtx.destination);
        source6.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source6.buffer;
}

async function setupSample7(sample) {
  source7 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source7.buffer = buffer;
		DjembeThree_OpenFile = buffer;
        source7.connect(audioCtx.destination);
        source7.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source7.buffer;
}

async function setupSample8(sample) {
  source8 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source8.buffer = buffer;
		DjembeThree_SlapFile = buffer;
        source8.connect(audioCtx.destination);
        source8.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source8.buffer;
}

async function setupSample9(sample) {
  source9 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source9.buffer = buffer;
		Kenkeni_OpenFile = buffer;
        source9.connect(audioCtx.destination);
        source9.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source9.buffer;
}

async function setupSample10(sample) {
  source10 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source10.buffer = buffer;
		Kenkeni_MuffledFile = buffer;
        source10.connect(audioCtx.destination);
        source10.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source10.buffer;
}

async function setupSample11(sample) {
  source11 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source11.buffer = buffer;
		Kenkeni_Bell_OpenFile = buffer;
        source11.connect(audioCtx.destination);
        source11.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source11.buffer;
}

async function setupSample12(sample) {
  source12= audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source12.buffer = buffer;
		DjembeOne_BassLFile = buffer;
        source12.connect(audioCtx.destination);
        source12.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source12.buffer;
}

async function setupSample13(sample) {
  source13 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source13.buffer = buffer;
		Sangban_OpenFile = buffer;
        source13.connect(audioCtx.destination);
        source13.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source13.buffer;
}

async function setupSample14(sample) {
  source14 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source14.buffer = buffer;
		Sangban_MuffledFile = buffer;
        source14.connect(audioCtx.destination);
        source14.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source14.buffer;
}

async function setupSample15(sample) {
  source15 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source15.buffer = buffer;
		Sangban_Bell_OpenFile = buffer;
        source15.connect(audioCtx.destination);
        source15.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source15.buffer;
}

async function setupSample16(sample) {
  source16 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source16.buffer = buffer;
		DjembeOne_OpenLFile = buffer;
        source16.connect(audioCtx.destination);
        source16.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source16.buffer;
}

async function setupSample17(sample) {
  source17 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source17.buffer = buffer;
		Doundoun_OpenFile = buffer;
        source17.connect(audioCtx.destination);
        source17.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source17.buffer;
}

async function setupSample18(sample) {
  source18 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source18.buffer = buffer;
		Doundoun_MuffledFile = buffer;
        source18.connect(audioCtx.destination);
        source18.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source18.buffer;
}

async function setupSample19(sample) {
  source19 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source19.buffer = buffer;
		Doundoun_Bell_OpenFile = buffer;
        source19.connect(audioCtx.destination);
        source19.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source19.buffer;
}

async function setupSample20(sample) {
  source20 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source20.buffer = buffer;
		DjembeOne_SlapLFile = buffer;
        source20.connect(audioCtx.destination);
        source20.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source20.buffer;
}

async function setupSample21(sample) {
  source21 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source21.buffer = buffer;
		DjembeTwo_BassLFile = buffer;
        source21.connect(audioCtx.destination);
        source21.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source21.buffer;
}

async function setupSample22(sample) {
  source22 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source22.buffer = buffer;
		DjembeTwo_OpenLFile = buffer;
        source22.connect(audioCtx.destination);
        source22.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source22.buffer;
}

async function setupSample23(sample) {
  source23 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source23.buffer = buffer;
		DjembeTwo_SlapLFile = buffer;
        source23.connect(audioCtx.destination);
        source23.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source23.buffer;
}

async function setupSample24(sample) {
  source24 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source24.buffer = buffer;
		DjembeThree_BassLFile = buffer;
        source24.connect(audioCtx.destination);
        source24.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source24.buffer;
}

async function setupSample25(sample) {
  source25 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source25.buffer = buffer;
		DjembeThree_OpenLFile = buffer;
        source25.connect(audioCtx.destination);
        source25.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source25.buffer;
}

async function setupSample26(sample) {
  source26 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source26.buffer = buffer;
		DjembeThree_SlapLFile = buffer;
        source26.connect(audioCtx.destination);
        source26.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source26.buffer;
}

async function setupSample27(sample) {
  source27 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source27.buffer = buffer;
		ShekereFile = buffer;
        source27.connect(audioCtx.destination);
        source27.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source27.buffer;
}

async function setupSample28(sample) {
  source28 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source28.buffer = buffer;
		ShekereBFile = buffer;
        source28.connect(audioCtx.destination);
        source28.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source28.buffer;
}

async function setupSample29(sample) {
  source29 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source29.buffer = buffer;
		DjembeSolo_BassFile = buffer;
        source29.connect(audioCtx.destination);
        source29.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source29.buffer;
}

async function setupSample30(sample) {
  source30 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source30.buffer = buffer;
		DjembeSolo_OpenFile = buffer;
        source30.connect(audioCtx.destination);
        source30.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source30.buffer;
}

async function setupSample31(sample) {
  source31 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source31.buffer = buffer;
		DjembeSolo_SlapFile = buffer;
        source31.connect(audioCtx.destination);
        source31.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source31.buffer;
}

async function setupSample32(sample) {
  source32 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source32.buffer = buffer;
		DjembeSolo_BassLFile = buffer;
        source32.connect(audioCtx.destination);
        source32.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source32.buffer;
}

async function setupSample33(sample) {
  source33 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source33.buffer = buffer;
		DjembeSolo_OpenLFile = buffer;
        source33.connect(audioCtx.destination);
        source33.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source33.buffer;
}

async function setupSample34(sample) {
  source34 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source34.buffer = buffer;
		DjembeSolo_SlapLFile = buffer;
        source34.connect(audioCtx.destination);
        source34.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source34.buffer;
}

async function setupSample35(sample) {
  source35 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source35.buffer = buffer;
		DjembeOne_MuteFile = buffer;
        source35.connect(audioCtx.destination);
        source35.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source35.buffer;
}

async function setupSample36(sample) {
  source36 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source36.buffer = buffer;
		DjembeOne_MuteLFile = buffer;
        source36.connect(audioCtx.destination);
        source36.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source36.buffer;
}

async function setupSample37(sample) {
  source37 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source37.buffer = buffer;
		DjembeTwo_MuteFile = buffer;
        source37.connect(audioCtx.destination);
        source37.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source37.buffer;
}

async function setupSample38(sample) {
  source38 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source38.buffer = buffer;
		DjembeTwo_MuteLFile = buffer;
        source38.connect(audioCtx.destination);
        source38.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source38.buffer;
}

async function setupSample39(sample) {
  source39 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source39.buffer = buffer;
		DjembeThree_MuteFile = buffer;
        source39.connect(audioCtx.destination);
        source39.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source39.buffer;
}

async function setupSample40(sample) {
  source40 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source40.buffer = buffer;
		DjembeThree_MuteLFile = buffer;
        source40.connect(audioCtx.destination);
        source40.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source40.buffer;
}

async function setupSample41(sample) {
  source41 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source41.buffer = buffer;
		DjembeSolo_MuteFile = buffer;
        source41.connect(audioCtx.destination);
        source41.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source41.buffer;
}

async function setupSample42(sample) {
  source42 = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', sample , true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source42.buffer = buffer;
		DjembeSolo_MuteLFile = buffer;
        source42.connect(audioCtx.destination);
        source42.loop = true;
      },
      function(e){ console.log("Error with decoding audio data" + e.err); });
  }
  request.send();
  checkload = checkload + 1;
  return source42.buffer;
}

setupSample0(allTheSounds[0]);
setupSample1(allTheSounds[1]);
setupSample2(allTheSounds[2]);
setupSample3(allTheSounds[3]);
setupSample4(allTheSounds[4]);
setupSample5(allTheSounds[5]);
setupSample6(allTheSounds[6]);
setupSample7(allTheSounds[7]);
setupSample8(allTheSounds[8]);
setupSample9(allTheSounds[9]);
setupSample10(allTheSounds[10]);
setupSample11(allTheSounds[11]);
setupSample12(allTheSounds[12]);
setupSample13(allTheSounds[13]);
setupSample14(allTheSounds[14]);
setupSample15(allTheSounds[15]);
setupSample16(allTheSounds[16]);
setupSample17(allTheSounds[17]);
setupSample18(allTheSounds[18]);
setupSample19(allTheSounds[19]);
setupSample20(allTheSounds[20]);
setupSample21(allTheSounds[21]);
setupSample22(allTheSounds[22]);
setupSample23(allTheSounds[23]);
setupSample24(allTheSounds[24]);
setupSample25(allTheSounds[25]);
setupSample26(allTheSounds[26]);
setupSample27(allTheSounds[27]);
setupSample28(allTheSounds[28]);
setupSample29(allTheSounds[29]);
setupSample30(allTheSounds[30]);
setupSample31(allTheSounds[31]);
setupSample32(allTheSounds[32]);
setupSample33(allTheSounds[33]);
setupSample34(allTheSounds[34]);
setupSample35(allTheSounds[35]);
setupSample36(allTheSounds[36]);
setupSample37(allTheSounds[37]);
setupSample38(allTheSounds[38]);
setupSample39(allTheSounds[39]);
setupSample40(allTheSounds[40]);
setupSample41(allTheSounds[41]);
setupSample42(allTheSounds[42]);

let playbackRate = 1;

var clickedTab = false;


clean = function () {
	$$$$('.backgroundspan').each(function () {
		this.classList.remove('backgroundspan');
	});
};


checkAudioLoad();
function checkAudioLoad() {

	if ( checkload == soundNumber && document.readyState === "complete" ) {
		loadthePage();
	} else {
		setTimeout(checkAudioLoad, 1000);
	}
}
function loadthePage () {
	if (window.cordova && cordova.platformId !== "browser") {
		onCordova= true;
		showTheBanner();	
	}
	
	

	messwithgoogle();
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	});
	jQuery('.patternself').on('click', function () {
		patternClick(this.dataset.pattern);
	});
	setTimeout(function(){
		document.getElementById("load").classList.add("noDisplay"); 
		document.getElementById("glassesView").classList.remove("noDisplay");
		document.getElementById("headerText").classList.remove("noDisplay");
		document.getElementById("footerText").classList.remove("noDisplay");
		document.getElementById("footerText2").classList.remove("noDisplay");
		document.getElementById("footerText3").classList.remove("noDisplay");
		document.getElementById("navabarContent").classList.remove("noDisplay");
		document.getElementById("backgroundimage").classList.remove("noDisplay");
		if (localStorage.viewConfig) {
			  viewConfig = eval(localStorage.viewConfig);
			  if (viewConfig == true) {
				switchBackView();
			  } else {
				switchView();  
			  };
		} else {
			viewConfig = false;
		};
	}, 3000);
$( "#changeSwing0" ).mousedown(function() {
	document.getElementById("magnify0").classList.remove("noDisplay");
});
$( "#changeSwing0" ).mouseup(function() {
	document.getElementById("magnify0").classList.add("noDisplay");
});
$( "#changeSwing1" ).mousedown(function() {
	document.getElementById("magnify1").classList.remove("noDisplay");
});
$( "#changeSwing1" ).mouseup(function() {
	document.getElementById("magnify1").classList.add("noDisplay");
});
$( "#changeSwing2" ).mousedown(function() {
	document.getElementById("magnify2").classList.remove("noDisplay");
});
$( "#changeSwing2" ).mouseup(function() {
	document.getElementById("magnify2").classList.add("noDisplay");
});
$( "#forthSwingInput" ).mousedown(function() {
	document.getElementById("magnify3").classList.remove("noDisplay");
});
$( "#forthSwingInput" ).mouseup(function() {
	document.getElementById("magnify3").classList.add("noDisplay");
});
$('#changeSwing0').on({ 'touchstart' : function(){ 
	document.getElementById("magnify0").classList.remove("noDisplay");
} });
$('#changeSwing0').on({ 'touchend' : function(){ 
	document.getElementById("magnify0").classList.add("noDisplay");
} });
$('#changeSwing1').on({ 'touchstart' : function(){ 
	document.getElementById("magnify1").classList.remove("noDisplay");
} });
$('#changeSwing1').on({ 'touchend' : function(){ 
	document.getElementById("magnify1").classList.add("noDisplay");
} });
$('#changeSwing2').on({ 'touchstart' : function(){ 
	document.getElementById("magnify2").classList.remove("noDisplay");
} });
$('#changeSwing2').on({ 'touchend' : function(){ 
	document.getElementById("magnify2").classList.add("noDisplay");
} });
$('#forthSwingInput').on({ 'touchstart' : function(){ 
	document.getElementById("magnify3").classList.remove("noDisplay");
} });
$('#forthSwingInput').on({ 'touchend' : function(){ 
	document.getElementById("magnify3").classList.add("noDisplay");
} });

if (localStorage.MasterVolumeValue) {
      MasterVolumeValue =  localStorage.MasterVolumeValue;
	  document.getElementById("masterVolume").value = Math.round(MasterVolumeValue * 100);
    } else {
      MasterVolumeValue = 1;
}
document.getElementById("VolumeOutputView").value = Math.round(MasterVolumeValue * 100);
if (localStorage.selfTempo) {
  selfTempo = Number(localStorage.selfTempo);
  document.getElementById("tempo").value = selfTempo;
  document.getElementById("MetronomeOutput").innerHTML = selfTempo;
  document.getElementById("MetronomeOutputView").innerHTML = selfTempo;
} else {
  selfTempo = 100;
  document.getElementById("tempo").value = selfTempo;
  document.getElementById("MetronomeOutputView").innerHTML = selfTempo;
};
if (localStorage.referenceTempo) {
	  referenceTempo = Number(localStorage.referenceTempo);
	} else {
	  referenceTempo = patterns[selectedPattern].tempo;
	};
document.getElementById("tempoSwing").value = referenceTempo;
document.getElementById("MetronomeSwingOutput").innerHTML = referenceTempo;
flamDuration();
if (localStorage.swingFactor) {
		swingFactor= Number(localStorage.swingFactor);
		document.getElementById("swingFactorInput").value = swingFactor;
		document.getElementById("dynamicSwing").innerHTML = swingFactor;
    } else {
       swingFactor = 10;
};
if (localStorage.swingA) {
		swingA = Number(localStorage.swingA);
		document.getElementById("swing0tempo").value = swingA;
		document.getElementById("swing0Output").innerHTML = swingA;
    } else {
     swingA = 0;
	};
if (localStorage.selectedPattern) {
	if (patterns[localStorage.selectedPattern]) {
		selectedPattern = localStorage.selectedPattern;
	}
};
if (localStorage.swingB) {
		swingB = Number(localStorage.swingB);
		document.getElementById("swing1tempo").value = swingB;
		document.getElementById("swing1Output").innerHTML = swingB;
    } else {
      swingB = 0;
};
if (localStorage.swingC) {
		swingC = Number(localStorage.swingC);
		document.getElementById("swing2tempo").value = swingC;
		document.getElementById("swing2Output").innerHTML = swingC;
    } else {
      swingC = 0;
};
if (localStorage.swingD) {
		swingD = Number(localStorage.swingD);
		document.getElementById("swing3tempo").value = swingD;
		document.getElementById("swing3Output").innerHTML = swingD;
    } else {
      swingD = 0;
};
if (localStorage.playTheShekere) {
      playTheShekere = eval(localStorage.playTheShekere);
	  if (playTheShekere == true) {
		document.getElementById('shekereRed').classList.add('nodisplay');
		document.getElementById('shekereGreen').classList.remove ('nodisplay');
		document.getElementById('shekereRedGlasses').classList.add('nodisplay');
		document.getElementById('shekereGreenGlasses').classList.remove ('nodisplay');
	  }
    } else {
		playTheShekere = false;
};



document.getElementById('filesinput').addEventListener('change', handleFileSelect, false);


// Multiple DOM element selection
window.$$$$ = function(selector) {
    var items   = {};
    var results = Array.prototype.slice.call(document.querySelectorAll(selector));
    var length  = results.length;
    
    for (var i = 0 ; i < length; i++) {
        items[i] = results[i];
    }
    
    items.length = length;
    items.splice = [].splice();
    
    items.each = function(callback) {
        for (var i = 0 ; i < length; i++) {
            callback.call(items[i]);
        }
    }

    items.on = function (event, fn) {
        []['forEach'].call(this, function (el) {
            el.on(event, fn);
        });
        return this;
    };

    return items;
};

// Bind event using "on"
Element.prototype.on = Element.prototype.addEventListener;

// Add trigger method
Element.prototype.trigger = function (type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
};

//indexedDB code
	// Create needed constants
	const list = document.querySelector('#dblistofobjects');
	const titleInput = document.querySelector('#titleDB');
	const dbform = document.querySelector('#dbform');
	const submitBtn = document.querySelector('#dbobjectcreation');	


//===================================================

// Sequencer
var Sequencer = function () {
    var self = this;
	notesArray = [];
	notesArray = startTable16;
    looping = false;
    self.beat = 0;
    self.loop = function () {  
		if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
				looping = true;
                currentNote = 0;
                nextNoteTime = audioCtx.currentTime;
                scheduler(); // kick off scheduling
				requestAnimationFrame(draw);
    };
    self.bind = function () {
        $('#play').on('click', function () {
            if (looping) {
                return;
            }
			rollDuration();
			flamDuration();
			deleteThePractise();
			deleteTheRhythms();
			if (userPhraseisSelected > 0) {
				clearDjembeSolo(phraseStepsDoc);
			} else if (userPhraseisSelected == 0) {
				clearDjembeSolo(selfSteps);
			}
			currentNote = 0;
			let nextNoteTime = 0.0; // when the next note is due.
            self.loop();
			var element = document.getElementById("stop");
			element.setAttribute("style", "font-size: 300%");
			var element2 = document.getElementById("play");
			element2.setAttribute("style", "display: none;");
			document.getElementById("playGlasses").classList.add('noDisplay');
			document.getElementById("stopGlasses").classList.remove('noDisplay');
			document.getElementById('selectTheCorrectNote').innerHTML = "";
			captureStart();
			showTheAce();
			showThePhrases();
			if (selfSteps3 == 9 || selfSteps3 == 18) {
				aceBufferNotes = acematrix36;
				aceLength = 36;
			} else if (groupMetronome == 4) {
				aceBufferNotes = acematrix64;
				aceLength = 64;
			} else {
				aceBufferNotes = acematrix48;
				aceLength = 48;
			};
        })

		$('#ace').on('click', function () {
			if (looping) {
				playTheAce();
            } 
        });

        $('#tempo').on('change', function () {
            if (this.value > 59 && this.value < 221) {
                selfTempo = this.value;
				localStorage.selfTempo = selfTempo;
				flamDuration();
				rollDuration();
            }
        });
		
		$('#swing0tempo').on('change', function () {
                swingA = this.value;
				localStorage.swingA = swingA;
				rollDuration();
				calculateAlteredSwing();
        });
		
		$('#swing1tempo').on('change', function () {
                swingB = this.value;
				localStorage.swingB = swingB;
				rollDuration();
				calculateAlteredSwing();
        });
		$('#swing2tempo').on('change', function () {
                swingC = this.value;
				localStorage.swingC = swingC;
				rollDuration();
 				calculateAlteredSwing();
       });
		$('#swing3tempo').on('change', function () {
                swingD = this.value;
				localStorage.swingD = swingD;
				rollDuration();
				calculateAlteredSwing();
        });		
				




    };
};

var instance = new Sequencer();
var params = new URLSearchParams(document.location.search.substring(1));
var sharedRhythm = params.get("rhythm"); 
if (sharedRhythm && patterns[sharedRhythm]) {
	selectedPattern = sharedRhythm;
	localStorage.selectedPattern = selectedPattern;
	localStorage.selectedName = patterns[sharedRhythm].name;
	var arrayBuffer = eval(sharedRhythm);
	localStorage["notesArray"] = JSON.stringify(arrayBuffer);

};
if (patterns[localStorage.selectedPattern]) {
	selectedPattern = localStorage.selectedPattern;
	var patternOld = patterns[selectedPattern];
	var selectedName3 = localStorage.selectedName;
	if (patternOld.steps == 4812) {
		selfSteps = 48;
		selfSteps3 = 4812;
	} else {
		selfSteps = patternOld.steps;
		selfSteps3 = selfSteps;			
	} ;     
	if (patternOld.info) {
		document.getElementById("SongSubTitle").innerHTML = patternOld.info;
		document.getElementById("SongSubTitle").classList.remove('noDisplay');
	} else {
		document.getElementById("SongSubTitle").innerHTML = "";
		document.getElementById("SongSubTitle").classList.add('noDisplay');
	};
	if (patternOld.footer) {
		document.getElementById("footerInfo").innerHTML = patternOld.footer;
	} else {
		document.getElementById("footerInfo").innerHTML = "";
	};
	selfDraw();
	document.getElementById("SongTitle").innerHTML = selectedName3;
	localStorage.selectedName = selectedName3;
	if (localStorage.notesArray) {
		notesArray = JSON.parse(localStorage["notesArray"]); 
	};
	for (var i = 0 ; i < 9; i++) {
		for (var j = 0 ; j < selfSteps; j++) {
		var playNowNote = notesArray[i][j + 1];
		var getTheTab = 'L'+ i +'C'+ j;
		var theTabElement = document.getElementById(getTheTab);
		if (playNowNote) {
				this.currentTime = 0;
				document.getElementById(getTheTab).classList.add('on');
				updateTheTab(theTabElement, playNowNote);
				}
		}
	}
	instance.bind();	
	if (phrases[patternOld.matrix]) {
		generatePhrases(patternOld.matrix);
	}
} else {
	selfDraw();
	instance.bind();
};

signalNotes= [];
if (notesArray[9]) {
	signalNotes= [];
	for (var p = 0; p < selfSteps; p++) {
		signalNotes[p] = notesArray[9][p +1];
	}
	while (signalNotes[0] == false) {
	 signalNotes.shift();
	}
	bufferSteps = signalNotes.length;
} else {
	var signalPattern = patterns[selectedPattern];
	signalNotes = signalPattern.matrixSignal;
	bufferSteps = signalPattern.stepsSignal;
};
userPhrasesButtons();
signalSetUp();		
addEventListenersToTabs();

function Reset(){    	
	new Sequencer().draw;
}

	
// Open our database; it is created if it doesn't already exist
// (see onupgradeneeded below)
let request = window.indexedDB.open('notes_db', 1);
// onerror handler signifies that the database didn't open successfully
request.onerror = function() {
  console.log('Database failed to open');
};

// onsuccess handler signifies that the database opened successfully
request.onsuccess = function() {
  console.log('Database opened successfully');

  // Store the opened database object in the db variable. This is used a lot below
  db = request.result;

  // Run the displayData() function to display the notes already in the IDB
  displayData();
};


// Setup the database tables if this has not already been done
request.onupgradeneeded = function(e) {
  // Grab a reference to the opened database
  let db = e.target.result;

  // Create an objectStore to store our notes in (basically like a single table)
  // including a auto-incrementing key
  let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement:true });

  // Define what data items the objectStore will contain
  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('swingA', 'swingA', { unique: false });
  objectStore.createIndex('swingB', 'swingB', { unique: false });
  objectStore.createIndex('swingC', 'swingC', { unique: false });
  objectStore.createIndex('swingD', 'swingD', { unique: false });
  objectStore.createIndex('notesArray', 'notesArray', { unique: false });
  objectStore.createIndex('selfSteps3', 'selfSteps3', { unique: false });
  objectStore.createIndex('selfSteps', 'selfSteps', { unique: false });
  objectStore.createIndex('dateofCreation', 'dateofCreation', { unique: false });
  objectStore.createIndex('selectedPattern', 'selectedPattern', { unique: false });
  objectStore.createIndex('selectedName', 'selectedName', { unique: false });
  objectStore.createIndex('swingFactor', 'swingFactor', { unique: false });
  objectStore.createIndex('referenceTempo', 'referenceTempo', { unique: false });
  objectStore.createIndex('selfTempo', 'selfTempo', { unique: false });

  console.log('Database setup complete');
  
  // Create an onsubmit handler so that when the form is submitted the addData() function is run
dbform.onsubmit = addData;
};
dbform.onsubmit = addData;
// Define the addData() function
function addData(e) {
  // prevent default - we don't want the form to submit in the conventional way
  e.preventDefault();
  var selectedPattern = localStorage.selectedPattern;
  selectedName = localStorage.selectedName;
	var dateofCreation = new Date().toLocaleString();
	var notesArrayDB = JSON.stringify(notesArray);
  // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
  let newItem = { title: titleInput.value, selectedPattern: selectedPattern, selectedName: selectedName, swingA: swingA, swingB: swingB, swingC: swingC, 
  swingD: swingD, selfSteps3: selfSteps3, selfSteps: selfSteps, selfTempo: selfTempo, dateofCreation: dateofCreation, notesArray: notesArrayDB, swingFactor: swingFactor, referenceTempo: referenceTempo, selfTempo: selfTempo };

  // open a read/write db transaction, ready for adding the data
  let transaction = db.transaction(['notes_os'], 'readwrite');

  // call an object store that's already been added to the database
  let objectStore = transaction.objectStore('notes_os');

  // Make a request to add our newItem object to the object store
  let request = objectStore.add(newItem);
  request.onsuccess = function() {
    // Clear the form, ready for adding the next entry
    titleInput.value = '';
	swingA.value = '';
	swingB.value = '';
	swingC.value = '';
	swingD.value = '';
	referenceTempo.value = '';
	swingFactor.value = '';
	selfSteps.value = '';
	selfSteps3.value = '';
	dateofCreation.value = '';
	if (selectedPattern) {
		selectedPattern.value = '';		
	};
	selectedName.value = '';
	notesArray.value = '';
	selfTempo.value = '';
	saveRhythm();
	
  };

  // Report on the success of the transaction completing, when everything is done
  transaction.oncomplete = function() {
    console.log('Transaction completed: database modification finished.');

    // update the display of data to show the newly added item, by running displayData() again.
    displayData();
  };

  transaction.onerror = function() {
    console.log('Transaction not opened due to error');
  };
}

// Define the displayData() function
function displayData() {
  // Here we empty the contents of the list element each time the display is updated
  // If you didn't do this, you'd get duplicates listed each time a new note is added
  while (dblistofobjects.firstChild) {
    dblistofobjects.removeChild(dblistofobjects.firstChild);
  }

  // Open our object store and then get a cursor - which iterates through all the
  // different data items in the store
  let objectStore = db.transaction('notes_os').objectStore('notes_os');
  objectStore.openCursor().onsuccess = function(e) {
    // Get a reference to the cursor
    let cursor = e.target.result;

    // If there is still another data item to iterate through, keep running this code
    if(cursor) {
      // Create a list item, h3, and p to put each data item inside when displaying it
      // structure the HTML fragment, and append it inside the list
      const listItem = document.createElement('li');
      const rhythmTitle = document.createElement('h5');
	  rhythmTitle.className += " rhythmClass";
	  const datetime = document.createElement('p');
	  datetime.className += " datetimeClass";
      listItem.appendChild(rhythmTitle);
	  listItem.appendChild(datetime);
      list.appendChild(listItem);

      // Put the data from the cursor inside the h3 and para
      rhythmTitle.textContent = cursor.value.title;
	  datetime.textContent = cursor.value.dateofCreation;
	  notesArray3 = JSON.parse(cursor.value.notesArray);
     

      // Store the ID of the data item inside an attribute on the listItem, so we know
      // which item it corresponds to. This will be useful later when we want to delete items
      listItem.setAttribute('data-note-id', cursor.value.id);
	  listItem.className += "text-left fileListItem";

      // Create a button and place it inside each listItem
		const loadBtn = document.createElement('button');
		listItem.appendChild(loadBtn);
		loadBtn.textContent = 'Load';
		loadBtn.className += " loadBtnClass btn btn-success btn-sm";
		loadBtn.setAttribute("data-dismiss", "modal");
		const deleteBtn = document.createElement('button');
		listItem.appendChild(deleteBtn);
		deleteBtn.className += " deleteBtnClass btn btn-danger btn-sm";
		deleteBtn.textContent = 'Delete';
		const exportBtn = document.createElement('button');
		listItem.appendChild(exportBtn);
		exportBtn.className += " deleteBtnClass btn btn-info btn-sm";
		exportBtn.textContent = 'Export';

      // Set an event handler so that when the button is clicked, the deleteItem()
      // function is run
      deleteBtn.onclick = openDeleteModal;
	  loadBtn.onclick = loadItem;
	  exportBtn.onclick = exportItem;
	  if (onCordova == true) {
		const shareBtn = document.createElement('button');
		listItem.appendChild(shareBtn);
		shareBtn.className += " deleteBtnClass btn-warning btn-sm";
		shareBtn.textContent = 'Share';
		shareBtn.onclick = exportItem;
	  }
      // Iterate to the next item in the cursor
      cursor.continue();
    } else {
      // Again, if list item is empty, display a 'No notes stored' message
      if(!dblistofobjects.firstChild) {
        const listItem = document.createElement('div');
        listItem.textContent = 'No rhythms stored.';
        dblistofobjects.appendChild(listItem);
      }
      // if there are no more cursor items to iterate through, say so
      console.log('Notes all displayed');
    }
  };
}
function openDeleteModal(e) {
	$('#confirmDelete').modal('show');
	$('#deleteThisRhythm').click(function(){
		deleteItem(e);
	});	
}

// Define the deleteItem() function
function deleteItem(e) {
  // retrieve the name of the task we want to delete. We need
  // to convert it to a number before trying it use it with IDB; IDB key
  // values are type-sensitive.
  $('#confirmDelete').modal('show');
  let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

  // open a database transaction and delete the task, finding it using the id we retrieved above
  let transaction = db.transaction(['notes_os'], 'readwrite');
  let objectStore = transaction.objectStore('notes_os');
  let request = objectStore.delete(noteId);

  // report that the data item has been deleted
  transaction.oncomplete = function() {
    // delete the parent of the button
    // which is the list item, so it is no longer displayed
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    console.log('Note ' + noteId + ' deleted.');

    // Again, if list item is empty, display a 'No notes stored' message
    if(!list.firstChild) {
      let listItem = document.createElement('li');
      listItem.textContent = 'No notes stored.';
      list.appendChild(listItem);
    }
  };
}

function exportItem(e) {
  // retrieve the name of the task we want to load. We need
  // to convert it to a number before trying it use it with IDB; IDB key
  // values are type-sensitive.
  var noteId = Number(e.target.parentNode.getAttribute('data-note-id'));
    // values are type-sensitive.
  var transaction = db.transaction(['notes_os'], 'readwrite');
    // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = function(event) {
    console.log("transaction complete");
  };

  transaction.onerror = function(event) {
   console.log("transaction error");
  };

  
  var objectStore = transaction.objectStore('notes_os');
  var objectStoreRequest = objectStore.get(noteId);

  objectStoreRequest.onsuccess = function() {
        console.log(objectStoreRequest.result);
		getTheValuesfromDB();
    };
function getTheValuesfromDB() {
    let savedResults = objectStoreRequest.result;
	var exportTitle = [savedResults.title, savedResults.swingA, savedResults.swingB, savedResults.swingC, savedResults.swingD, savedResults.selfSteps, savedResults.selfSteps3, savedResults.selectedPattern, savedResults.selectedName, savedResults.swingFactor, savedResults.referenceTempo, savedResults.selfTempo ];  
	let savedTitle = savedResults.title;
	let rythmToPlayNow = JSON.parse(savedResults.notesArray);
	rythmToPlayNow.push(exportTitle);
	var result = $.csv.fromObjects(rythmToPlayNow);
	var filename = savedResults.title + '.dlf';
	var mimeType = "text/plain";
	download(filename, result, mimeType);
	
	function download(filename, result, mimeType) {

		  if (onCordova == true) {

			  var storageLocation = "";
			  var blob = new Blob([result], {
				type: mimeType
			  });

			  switch (device.platform) {
				case "Android":
				  storageLocation = cordova.file.externalDataDirectory;
				  break;

				case "iOS":
				  storageLocation = cordova.file.documentsDirectory;
				  break;
			  }

			  var folderPath = storageLocation;

			  window.resolveLocalFileSystemURL(
				folderPath,
				function (dir) {
				  dir.getFile(
					filename,
					{
					  create: true
					},
					function (file) {
					  file.createWriter(
						function (fileWriter) {
						  fileWriter.write(blob);

						  fileWriter.onwriteend = function () {
							var url = file.toURL();
							if (e.target.innerText == "Export") {
								alert("File saved at " + url);
							} else if (e.target.innerText == "Share") {
								window.plugins.socialsharing.share('Please follow this link to reproduce a West African tradinional rhythm from DjembeLoops: ' + url.href)
							}
						  };

						  fileWriter.onerror = function (err) {
							alert("Unable to download");
							console.error(err);
						  };
						},
						function (err) {
						  // failed
						  alert("Unable to download");
						  console.error(err);
						}
					  );
					},
					function (err) {
					  alert("Unable to download");
					  console.error(err);
					}
				  );
				},
				function (err) {
				  alert("Unable to download");
				  console.error(err);
				}
			  );

		  } else {
			  var blob = new Blob([result]);
			  var hiddenElement = window.document.createElement('a');
			  hiddenElement.href = window.URL.createObjectURL(blob);
			  hiddenElement.download = savedResults.title + '.dlf';
			  document.body.appendChild(hiddenElement);
			  hiddenElement.click();
		  }
		}
	};
};


function loadItem(e) {
  // retrieve the name of the task we want to load. We need
  // to convert it to a number before trying it use it with IDB; IDB key
  // values are type-sensitive.
  var noteId = Number(e.target.parentNode.getAttribute('data-note-id'));
    // values are type-sensitive.
  var transaction = db.transaction(['notes_os'], 'readwrite');
    // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = function(event) {
    console.log("transaction complete");
  };

  transaction.onerror = function(event) {
   console.log("transaction error");
  };

  
  var objectStore = transaction.objectStore('notes_os');
  var objectStoreRequest = objectStore.get(noteId);

  objectStoreRequest.onsuccess = function() {
        console.log(objectStoreRequest.result);
		getTheValuesfromDB();
    };
function getTheValuesfromDB() {
	document.getElementById("phrases").innerHTML = "";
	document.getElementById("phrasesEdit").innerHTML = "";
	document.getElementById("userPhrases").innerHTML = "";
	document.getElementById("userPhrasesGlasses").innerHTML = "";
	let savedResults = objectStoreRequest.result;
	let savedTitle = savedResults.title;
	swingA = savedResults.swingA;
	swingB = savedResults.swingB;
	swingC = savedResults.swingC;
	swingD = savedResults.swingD;
	swingFactor = Number(savedResults.swingFactor);
	referenceTempo = Number(savedResults.referenceTempo);
	selfTempo = Number(savedResults.selfTempo);
	if (!swingFactor) {
		swingFactor =  patterns[savedResults.selectedPattern].swingFactor;
	}; 
	if (!referenceTempo) {
		referenceTempo =  patterns[savedResults.selectedPattern].tempo;
	};
	if (!selfTempo) {
		selfTempo =  patterns[savedResults.selectedPattern].tempo;
	};
	localStorage.selfTempo = selfTempo;
	document.getElementById("tempo").value = selfTempo;
	document.getElementById("MetronomeOutput").innerHTML = selfTempo;
	document.getElementById("MetronomeOutputView").innerHTML = selfTempo;
	flamDuration();
	rollDuration();
	selfSteps = savedResults.selfSteps;
	selfSteps3 = savedResults.selfSteps3;
	let rythmToPlayNow = JSON.parse(savedResults.notesArray);
		
		document.getElementById("swing0tempo").value = swingA;
		document.getElementById("swing0Output").innerHTML = swingA;
		document.getElementById("swing1tempo").value = swingB;
		document.getElementById("swing1Output").innerHTML = swingB;
		document.getElementById("swing2tempo").value = swingC;
		document.getElementById("swing2Output").innerHTML = swingC;
		document.getElementById("swing3tempo").value = swingD;
		document.getElementById("swing3Output").innerHTML = swingD;	
		document.getElementById("tempoSwing").value = referenceTempo;
		document.getElementById("MetronomeSwingOutput").innerHTML = referenceTempo;
		document.getElementById("swingFactorInput").value = swingFactor;
		document.getElementById("dynamicSwing").innerHTML = swingFactor;
		localStorage.swingA = swingA;
		localStorage.swingB = swingB;
		localStorage.swingC = swingC;
		localStorage.swingD = swingD;
		localStorage.swingFactor = swingFactor;
		localStorage.referenceTempo = referenceTempo;
		localStorage.selfSteps3 = selfSteps3;
		var instance = new Sequencer();
        selfDraw();
		localStorage["notesArray"] = JSON.stringify(rythmToPlayNow);
		document.getElementById("SongTitle").innerHTML = savedTitle;
		document.getElementById("SongSubTitle").innerHTML = "";
		document.getElementById("SongSubTitle").classList.add('noDisplay');
		document.getElementById("footerInfo").innerHTML = "";
		localStorage.selectedPattern = savedResults.selectedPattern;
		selectedPattern = savedResults.selectedPattern;
		loadRhythm();
        notesArray = rythmToPlayNow;
		for (var i = 0 ; i < 9; i++) {
			for (var j = 0 ; j < selfSteps; j++) {
			var playNowNote = rythmToPlayNow[i][j + 1];
			var getTheTab = 'L'+ i +'C'+ j;
			var theTabElement = document.getElementById(getTheTab);
			if (playNowNote) {
					this.currentTime = 0;
					document.getElementById(getTheTab).classList.add('on');
					updateTheTab(theTabElement, playNowNote);
					}
			}
		}
		localStorage.selectedName = savedTitle;
		if (phrases[selectedPattern]) {
			generatePhrases(selectedPattern);
		}
		if (notesArray[9]) {
			signalNotes= [];
			for (var p = 0; p < selfSteps; p++) {
				signalNotes[p] = notesArray[9][p +1];
			}
			while (signalNotes[0] == false) {
			 signalNotes.shift();
			}
			bufferSteps = signalNotes.length
		} else {
			var signalPattern = patterns[selectedPattern];
			signalNotes = signalPattern.matrixSignal;
			bufferSteps = signalPattern.stepsSignal;
		};
		userPhrasesButtons();
		signalSetUp();		
		addEventListenersToTabs();
	};

};



function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	f = files[0];
	var fileName = f.name;
	if (fileName.split('.').pop() == "dlf" && f.size < 100000) {
		console.log(fileName.split('.').pop());
		printTable(f);
		function printTable(file) {
			var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(event){
				var csv = event.target.result;
				var exportdata = $.csv.toArrays(csv);
				useExportData(exportdata);
			};
			reader.onerror = function(){ alert('Unable to read ' + file.fileName); 
			$('#savedrythmsModal').modal('hide');
			filesinput.value= "";
			};
		}
	} else {
		alert('Unable to read ' + fileName);
		$('#savedrythmsModal').modal('hide');
		filesinput.value= "";
	}
	
	function useExportData(exportdata) {
		var length=exportdata.length;
			let savedTitle = exportdata[(length - 1)][0];
			swingA = Number(exportdata[(length - 1)][1]);
			swingB = Number(exportdata[(length - 1)][2]);
			swingC = Number(exportdata[(length - 1)][3]);
			swingD = Number(exportdata[(length - 1)][4]);
			selfSteps = Number(exportdata[(length - 1)][5]);
			selfSteps3 = Number(exportdata[(length - 1)][6]);
			selectedPattern = exportdata[(length - 1)][7];
			selectedName = exportdata[(length - 1)][8];
			swingFactor = Number(exportdata[(length - 1)][9]);
			referenceTempo = Number(exportdata[(length - 1)][10]);
			selfTempo = Number(exportdata[(length - 1)][11]);
			if (!swingFactor) {
				swingFactor =  patterns[selectedPattern].swingFactor;
			}; 
			if (!referenceTempo) {
				referenceTempo =  patterns[selectedPattern].tempo;
			}; 
			if (!selfTempo) {
				selfTempo =  patterns[selectedPattern].tempo;
			}; 
			localStorage.selfTempo = selfTempo;
			document.getElementById("tempo").value = selfTempo;
			document.getElementById("MetronomeOutput").innerHTML = selfTempo;
			document.getElementById("MetronomeOutputView").innerHTML = selfTempo;
			flamDuration();
			rollDuration();
			if ( patterns[selectedPattern] && exportdata[9][0] == "Doundoun_Bell_" && exportdata[8][0] == "Doundoun_" && exportdata[7][0] == "Sangban_Bell_" && exportdata[6][0] == "Sangban_" && exportdata[5][0] == "Kenkeni_Bell_" && exportdata[4][0] == "Kenkeni_" && exportdata[3][0] == "DjembeThree_" && exportdata[1][0] == "DjembeOne_" && exportdata[2][0] == "DjembeTwo_" && patterns[selectedPattern] && -51 < swingA && -51 < swingB && -51 < swingC && -51 < swingD && swingA < 51 && swingB < 51 && swingC < 51 && swingD < 51 && Number.isInteger(swingD) && Number.isInteger(swingC) && Number.isInteger(swingB) && Number.isInteger(swingA) && Number.isInteger(selfSteps3) && Number.isInteger(selfSteps) && ( selfSteps == 8 || selfSteps == 9 || selfSteps == 12 || selfSteps == 16 || selfSteps == 18 || selfSteps == 24 || selfSteps == 32 || selfSteps == 36 || selfSteps == 48 || selfSteps == 64 || selfSteps == 80 || selfSteps == 96 || selfSteps == 112 || selfSteps == 128 || selfSteps == 60 || selfSteps == 72 || selfSteps == 84 ) && ( selfSteps3 == 8 || selfSteps3 == 9 || selfSteps3 == 12 || selfSteps3 == 16 || selfSteps3 == 18 || selfSteps3 == 24 || selfSteps3 == 32 || selfSteps3 == 36 || selfSteps3 == 48 || selfSteps3 == 4812 || selfSteps3 == 64 || selfSteps3 == 80 || selfSteps3 == 96 || selfSteps3 == 112 || selfSteps3 == 128 || selfSteps3 == 60 || selfSteps3 == 72 || selfSteps3 == 84)) {
				localStorage.swingA = swingA;
				localStorage.swingB = swingB;
				localStorage.swingC = swingC;
				localStorage.swingD = swingD;
				localStorage.referenceTempo = referenceTempo;
				localStorage.swingFactor = swingFactor;
				localStorage.selfSteps3 = selfSteps3;
				localStorage.selfSteps = selfSteps;
				localStorage.selectedPattern = selectedPattern;
				for (var j = 0; j < length; j++) {
					var xarray = exportdata[j];
					xarray = xarray.filter(item => item);
					exportdata[j] = xarray;
				};
				for (var j = 0; j < length; j++) {
					var arraytoedit = exportdata[j];
					for (var i = 0; i < exportdata[j].length; i++) {
						if (exportdata[j][i] === "false") {
							exportdata[j][i] = false;
						};
					};	
				};
				let rythmToPlayNow = [];
				for (j = 1; j < (length-1); j++) {
					rythmToPlayNow.push(exportdata[j]);
				}
				localStorage["notesArray"] = JSON.stringify(rythmToPlayNow);
				document.getElementById("swing0tempo").value = swingA;
				document.getElementById("swing0Output").innerHTML = swingA;
				document.getElementById("tempoSwing").value = referenceTempo;
				document.getElementById("MetronomeSwingOutput").innerHTML = referenceTempo;
				document.getElementById("swingFactorInput").value = swingFactor;
				document.getElementById("dynamicSwing").innerHTML = swingFactor;
				document.getElementById("swing1tempo").value = swingB;
				document.getElementById("swing1Output").innerHTML = swingB;
				document.getElementById("swing2tempo").value = swingC;
				document.getElementById("swing2Output").innerHTML = swingC;
				document.getElementById("swing3tempo").value = swingD;
				document.getElementById("swing3Output").innerHTML = swingD;		
				var instance = new Sequencer();
				selfDraw();			
				document.getElementById("SongTitle").innerHTML = savedTitle;
				document.getElementById("phrases").innerHTML = "";
				document.getElementById("phrasesEdit").innerHTML = "";
				document.getElementById("userPhrases").innerHTML = "";
				document.getElementById("userPhrasesGlasses").innerHTML = "";
				importRhythm();
				notesArray = rythmToPlayNow;
				for (var i = 0 ; i < 9; i++) {
					for (var j = 0 ; j < selfSteps; j++) {
					var playNowNote = rythmToPlayNow[i][j + 1];
					var getTheTab = 'L'+ i +'C'+ j;
					var theTabElement = document.getElementById(getTheTab);
					if (playNowNote) {
							this.currentTime = 0;
							document.getElementById(getTheTab).classList.add('on');
							updateTheTab(theTabElement, playNowNote);
							}
					}
				}
				localStorage.selectedName = savedTitle;
				if (phrases[selectedPattern]) {
					generatePhrases(selectedPattern);
				}
				if (notesArray[9]) {
					signalNotes= [];
					for (var p = 0; p < selfSteps; p++) {
						signalNotes[p] = notesArray[9][p +1];
					}
					while (signalNotes[0] == false) {
					 signalNotes.shift();
					}
					bufferSteps = signalNotes.length
				} else {
					var signalPattern = patterns[selectedPattern];
					signalNotes = signalPattern.matrixSignal;
					bufferSteps = signalPattern.stepsSignal;
				};
				userPhrasesButtons();
				signalSetUp();		
				addEventListenersToTabs();
				$('#savedrythmsModal').modal('hide');
				filesinput.value= "";				
			} else {
				alert('Unable to read ' + fileName);	
				$('#savedrythmsModal').modal('hide');
				filesinput.value= "";
			}
		}
	}
};

let lookahead = 120.0; // How frequently to call scheduling function (in milliseconds)
let scheduleAheadTime = 0.15; // How far ahead to schedule audio (sec)

function closeTheMenu() {
	var expander = document.getElementById("navbarSupportedContent");
		if (expander.classList.contains("show")) {
			expander.classList.remove("show");
	}
	stopSequence();
	switchSwingBackView();
}

function clearSolo (){
	$(".solo-button").each(function() {
		this.setAttribute("solo", 'false');			
		if (this.classList.contains("btn-warning")) {
			this.classList.remove("btn-warning");		
			this.classList.add("btn-info");
		}
	});
}

function playSolo(i,j) {
	var viewElement = document.getElementById("solo" + i.id);
	if (viewElement.getAttribute("solo") == 'false') {
		clearSolo();
		viewElement.setAttribute("solo", 'true'); 
		viewElement.classList.remove("btn-info");
		viewElement.classList.add("btn-warning");
		$(".equalizer").each(function() {
			if (this.getAttribute("mute") == "false") {
				var clickMute = this.id.replace('Equ','');
				var clickMute2= clickMute.replace('mute_icon_','');
				Mute( eval(clickMute2), eval(clickMute));
			};
		});	
		Mute(i,j);
	} else if (viewElement.getAttribute("solo") == 'true') {
		viewElement.setAttribute("solo", 'false'); 
		viewElement.classList.add("btn-info");
		viewElement.classList.remove("btn-warning");
		$(".equalizer").each(function() {
			if (this.getAttribute("mute") == "true") {
				var clickMute = this.id.replace('Equ','');
				var clickMute2= clickMute.replace('mute_icon_','');
				Mute( eval(clickMute2), eval(clickMute));
			};
		});	
	};
};


function Mute(i,j) { 
	var iconThis = j.id;
	var viewElement = document.getElementById(iconThis + "Glasses");
	var viewEqu = document.getElementById(iconThis + "Equ");
	var muteistrue = j.getAttribute("mute");
	var BassMuted = i.id + "_BassMuted";
	var OpenMuted = i.id + "_OpenMuted";
	var MuffledMuted = i.id + "_MuffledMuted";
	var SlapMuted = i.id + "_SlapMuted";
	var MuteMuted = i.id + "_MuteMuted";
	var BassLMuted = i.id + "_BassLMuted";
	var OpenLMuted = i.id + "_OpenLMuted";
	var SlapLMuted = i.id + "_SlapLMuted";
	var MuteLMuted = i.id + "_MuteLMuted";
	var green = "./img/" + i.title + "Green.svg";
	var red = "./img/" + i.title + "Red.svg"
	if (iconThis == 'mute_icon_DjembeOne' || iconThis == 'mute_icon_DjembeTwo' || iconThis == 'mute_icon_DjembeThree' || iconThis == 'mute_icon_DjembeSolo') {
		if (muteistrue == 'false') {
			window[BassMuted] = true;
			window[OpenMuted] = true;
			window[SlapMuted] = true;
			window[MuteMuted] = true;
			window[BassLMuted] = true;
			window[OpenLMuted] = true;
			window[SlapLMuted] = true;
			window[MuteLMuted] = true;
			viewElement.setAttribute("src", red);
			viewElement.setAttribute("mute", true);
			viewEqu.setAttribute("src", red);
			viewEqu.setAttribute("mute", true);
			j.setAttribute("mute", true);
			j.setAttribute("src", red);
		} else {
			window[BassMuted] = false;
			window[OpenMuted] = false;
			window[SlapMuted] = false;
			window[MuteMuted] = false;
			window[BassLMuted] = false;
			window[OpenLMuted] = false;
			window[SlapLMuted] = false;		
			window[MuteLMuted] = false;		
			viewEqu.setAttribute("src", green);			
			viewEqu.setAttribute("mute", false);
			viewElement.setAttribute("src", green);			
			viewElement.setAttribute("mute", false);
			j.setAttribute("mute", false);
			j.setAttribute("src", green);
		}
	} else {
		if (muteistrue == 'false') {
			window[OpenMuted] = true;
			window[MuffledMuted] = true;
			j.setAttribute("mute", true);
			j.setAttribute("src", red);
			viewEqu.setAttribute("src", red);
			viewEqu.setAttribute("mute", true);
			viewElement.setAttribute("src", red);
			viewElement.setAttribute("mute", true);
		} else {
			window[OpenMuted] = false;
			window[MuffledMuted] = false;
			j.setAttribute("mute", false);
			j.setAttribute("src", green);
			viewEqu.setAttribute("mute", false);
			viewEqu.setAttribute("src", green);
			viewElement.setAttribute("mute", false);
			viewElement.setAttribute("src", green);
		}
	}
}

function changeVol(i,j) { 
	var iconThis = i.id;
	var BassFileGainValue = i.id + "_BassFileGainValue";
	var OpenFileGainValue = i.id + "_OpenFileGainValue";
	var SlapFileGainValue = i.id + "_SlapFileGainValue";
	var MuteFileGainValue = i.id + "_MuteFileGainValue";
	var BassLFileGainValue = i.id + "_BassLFileGainValue";
	var OpenLFileGainValue = i.id + "_OpenLFileGainValue";
	var SlapLFileGainValue = i.id + "_SlapLFileGainValue";
	var MuteLFileGainValue = i.id + "_MuteLFileGainValue";
	var MuffledFileGainValue = i.id + "_MuffledFileGainValue";
	var instrumentVolume = "Volume" + i.id;
	localStorage.setItem(instrumentVolume, j);
	if (iconThis == 'DjembeOne' || iconThis == 'DjembeTwo' || iconThis == 'DjembeThree' || iconThis == 'DjembeSolo') {
		window[BassFileGainValue] = j;
		window[OpenFileGainValue] = j;
		window[SlapFileGainValue] = j;
		window[MuteFileGainValue] = j;
		window[BassLFileGainValue] = j;
		window[OpenLFileGainValue] = j;
		window[SlapLFileGainValue] = j;
		window[MuteLFileGainValue] = j;
	} else if (iconThis == 'Shekere') {
		ShekereFileGainValue = j;
		ShekereBFileGainValue = j;		
	} else {
		window[OpenFileGainValue] = j;
		window[MuffledFileGainValue] = j;		
	}
}

function changeMasterVolume(i) {
MasterVolumeValue = i ;
localStorage.MasterVolumeValue = i;
document.getElementById("VolumeOutputView").value = Math.round(MasterVolumeValue * 100);
}

function nextNote() {
    const secondsPerBeat = 60.0 / selfTempo / groupMetronome;
	var calc = nextNoteTime;
    nextNoteTime += secondsPerBeat; // Add beat length to last beat time
    // Advance the beat number, wrap to zero
    var calc2 = nextNoteTime - calc;
	currentNote++;
	aceNoteToPlay++;
	if (phraseIsOn == true) {
		phraseNoteToPlay++;
	if ( phraseNoteToPlay == phraseLength ) {
		phraseNoteToPlay = 0;
		};	
	};

	if ( aceNoteToPlay === aceLength ) {
		aceNoteToPlay = 0;
	};

	var barsNumber;
	if (selfSteps == 12 || selfSteps == 9 || selfSteps == 16) {
		barsNumber = 1;
	} else if (selfSteps == 24 || selfSteps == 32 || selfSteps == 18) {
		barsNumber = 2;
	} else if (selfSteps == 80 || selfSteps == 60) {
		barsNumber = 5;
	} else if ((selfSteps == 96 && groupMetronome == 4) || selfSteps == 72) {
		barsNumber = 6;
	} else if (selfSteps == 112 || selfSteps == 84) {
		barsNumber = 7;
	} else if (selfSteps == 128 || (selfSteps == 96 && groupMetronome == 3)) {
		barsNumber = 8;
	} else if (selfSteps == 64 || selfSteps3 == 4812 ) {
		barsNumber = 4;
	} else {
		barsNumber = 3;
	}


	
	if ( phraseIssetToGo == true && phraseNoteToPlay == 0 && Number.isInteger((currentNote * barsNumber)/ selfSteps)) {
		decideonphrase();
		if (userPhraseisSelected > 0) {
			showUserPhrase(userPhraseisSelected);
		} else {
			showPhrase(phraseBufferNotes[0], DLphraseSellected);
		}
		function decideonphrase() {
			phraseIsOn = true;
			phraseNotes = phraseBufferNotes;
			phraseLength = phraseBufferNotes[0];
			document.getElementById('SongTitle').innerHTML= phraseBufferNotes[1];
			document.getElementById('SongTitle').classList.add('text-success');
			phraseIssetToGo = false;
			aceIsOn = false;
			signalIsOn = false;
			showTheSignal();
			showTheAce();
		};
	};

    if (currentNote === selfSteps){
            currentNote = 0;
		if ( aceIssetToGo == true) {
			if ( phraseIsOn == true && Number.isInteger((phraseNoteToPlay * barsNumber)/ selfSteps)) {
				decideonAce();
			} else if ( phraseIsOn == false ) {
				decideonAce();
			}
			function decideonAce() {
				aceIsOn = true;
				buildUserPhrase(1);
				phraseNoteToPlay = 0;
				phraseIsOn = false;
				signalIsOn = false;
				aceIssetToGo = false;
				aceNotes = aceBufferNotes;
				document.getElementById('SongTitle').innerHTML= "Echauffement";
				document.getElementById('SongTitle').classList.add('text-success');
				showTheSignal();
				showThePhrases();
				aceNoteToPlay = 0;
			}
		};
	}
	
	var noteDistance = currentNote + bufferSteps - 1;
	if ( signalIssetToGo == true && (selfSteps == noteDistance + 1) ) {
		signalSteps = bufferSteps;
		console.log(currentNote);
		signalIssetToGo = false;
		phraseNoteToPlay = 0;
		aceIsOn = false;
		phraseIsOn = false;
		signalIsOn = true;
		showTheCall();
		document.getElementById('SongTitle').innerHTML= "Call";
		document.getElementById('SongTitle').classList.add('text-success');
		showTheAce();
		showThePhrases();
	};
}

const notesInQueue = [];

function scheduleNote(beatNumber, time) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });
	const secondsPerBeat = 60.0 / selfTempo / groupMetronome;
	var noteSwing;
	var tripletDelay;
	var rollDelay;
	var playNowNote;
	
	if (groupMetronome == 3) {
		if (Number.isInteger((currentNote)/groupMetronome)) {
			noteSwing = noteSwingValues[0];
			tripletDelay = noteTripleValues[0];
			rollDelay = noteRollValues[0];
		} else if (Number.isInteger((currentNote + 1)/groupMetronome)) {
			noteSwing = noteSwingValues[2];
			tripletDelay = noteTripleValues[2];
			rollDelay = noteRollValues[2];
		} else {
			noteSwing = noteSwingValues[1];
			tripletDelay = noteTripleValues[1];
			rollDelay = noteRollValues[1];
		}
	}
		else {
		if (Number.isInteger((currentNote)/groupMetronome)) {
			noteSwing = noteSwingValues[0];
			tripletDelay = noteTripleValues[0];
			rollDelay = noteRollValues[0];
		} else if (Number.isInteger((currentNote + 1)/groupMetronome)) {
			noteSwing = noteSwingValues[3];
			tripletDelay = noteTripleValues[3];
			rollDelay = noteRollValues[3];
		} else if (Number.isInteger((currentNote + 2)/groupMetronome)) {
			noteSwing = noteSwingValues[2];
			tripletDelay = noteTripleValues[2];
			rollDelay = noteRollValues[2];
		} else {
			noteSwing = noteSwingValues[1];
			tripletDelay = noteTripleValues[1];
			rollDelay = noteRollValues[1];
		}
	}
	var nextNoteTimeSwing =  nextNoteTime + noteSwing;
	var stopTime;
	if (nextNoteTimeSwing < 0) {
		nextNoteTimeSwing = 0;
	}
	if (signalStart == true ) {
		if (beatNumber == 0 ) {
			document.getElementById('SongTitle').innerHTML= "Call";
			document.getElementById('SongTitle').classList.add('text-success');
		};
		playNowNote = signalNotes[signalBeatNumber];
		var soundToPlayOn = "DjembeSolo_"		
		if (playNowNote != false && playNowNote != undefined) {
					if ((beatNumber + 1) % 2 == 0) {
				var soundToPlayLive = "DjembeSolo_" + playNowNote + "L";	
			} else {
				var soundToPlayLive = "DjembeSolo_"  + playNowNote;	
			}
			var beatInternal2;
			var noteToStop2 = 1;
			for (var t = 1 ; t < 7; t++) {
				beatInternal2 = signalBeatNumber + t;		
				if (beatInternal2 > bufferSteps) {
					beatInternal2 = beatInternal2 - bufferSteps;
				};
				if (signalNotes[beatInternal2] == false) {
				noteToStop2 = noteToStop2 + 1	
				} else { break; };
			}
			var swingStop2;				
			if (groupMetronome == 3) {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger((beatInternal2)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}
				else {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger(beatInternal2/groupMetronome)) {
					swingStop2 = noteSwingValues[3];
				} else if (Number.isInteger((beatInternal2 + 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}					
			stopTime = (noteToStop2 * secondsPerBeat) + swingStop2 - noteSwing ;
			bindTheNote();
		}
		signalBeatNumber = signalBeatNumber + 1;
		if (signalBeatNumber == signalSteps) {
			signalSteps = 0;
			signalBeatNumber = 0;
			signalStart = false;
			beatNumber = 0;
			document.getElementById('SongTitle').innerHTML= localStorage.selectedName;
			document.getElementById('SongTitle').classList.remove('text-success');
			showTheSignal();
			currentNote = -1;
			setTimeout(function(){ 
				requestAnimationFrame(draw);
			}, 2 * (60.0 / selfTempo));
		};
			
	} else if (signalIsOn == true) {
		playNowNote = signalNotes[signalBeatNumber];
		var soundToPlayOn = "DjembeSolo_"		
		if (playNowNote != false && playNowNote != undefined) {
			if ((beatNumber + 1) % 2 == 0) {
				var soundToPlayLive = "DjembeSolo_" + playNowNote + "L";	
			} else {
				var soundToPlayLive = "DjembeSolo_"  + playNowNote;	
			}
			var beatInternal2;
			var noteToStop2 = 1;
			for (var t = 1 ; t < 7; t++) {
				beatInternal2 = signalBeatNumber + t;		
				if (beatInternal2 > bufferSteps) {
					beatInternal2 = beatInternal2 - bufferSteps;
				};
				if (signalNotes[beatInternal2] == false) {
				noteToStop2 = noteToStop2 + 1	
				} else { break; };
			}
			var swingStop2;				
			if (groupMetronome == 3) {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger((beatInternal2)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}
				else {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger(beatInternal2/groupMetronome)) {
					swingStop2 = noteSwingValues[3];
				} else if (Number.isInteger((beatInternal2 + 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}					
			stopTime = (noteToStop2 * secondsPerBeat) + swingStop2 - noteSwing ;
			bindTheNote();
		}
			signalBeatNumber = signalBeatNumber + 1;				
		if (signalBeatNumber == signalSteps) {
			var getTheSoloTab = 'SpanL9C'+ (selfSteps - groupMetronome);
			if (document.getElementById(getTheSoloTab)) {
				document.getElementById(getTheSoloTab).classList.remove('backgroundspan');				
			};
			signalSteps = 0;
			signalBeatNumber = 0;
			signalIsOn = false;
			showTheSignal();
			clearDjembeSolo(selfSteps);
			document.getElementById('SongTitle').innerHTML= localStorage.selectedName;
			document.getElementById('SongTitle').classList.remove('text-success');
		};
		for (var i = 0 ; i < 9; i++) {
			playNowNote = notesArray[i][beatNumber + 1];
			var soundToPlayOn = notesArray[i][0];
			if (playNowNote != false && playNowNote != undefined) {
				if (i < 3 && ( (beatNumber + 1) % 2 == 0) ) {
					var soundToPlayLive = soundToPlayOn + playNowNote + "L";	
				} else {
					var soundToPlayLive = soundToPlayOn + playNowNote;	
				}
				var beatInternal;
				var noteToStop = 1;
				for (var t = 1 ; t < 7; t++) {
					beatInternal = beatNumber + 1 + t;		
					if (beatInternal > selfSteps) {
						beatInternal = beatInternal - selfSteps;
					};
					if (notesArray[i][beatInternal] == false) {
					noteToStop = noteToStop + 1	
					} else { break; };
				}
				var swingStop;				
				if (groupMetronome == 3) {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger((beatInternal)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				}
					else {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger(beatInternal/groupMetronome)) {
						swingStop = noteSwingValues[3];
					} else if (Number.isInteger((beatInternal + 1)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				}					
				stopTime = (noteToStop * secondsPerBeat) + swingStop - noteSwing ;
				bindTheNote();
			}
		};

	} else if (phraseIsOn == true) {
		playNowNote = phraseNotes[phraseNoteToPlay + 2];
		var soundToPlayOn = "DjembeSolo_"				
		if (playNowNote != false && playNowNote != undefined) {
			if ((beatNumber + 1) % 2 == 0) {
				var soundToPlayLive = "DjembeSolo_" + playNowNote + "L";	
			} else {
				var soundToPlayLive = "DjembeSolo_"  + playNowNote;	
			}
			var beatInternal2;
			var noteToStop2 = 1;
			for (var t = 1 ; t < 7; t++) {
				beatInternal2 = phraseNoteToPlay + t;		
				if (beatInternal2 > phraseLength) {
					beatInternal2 = beatInternal2 - phraseLength;
				};
				if (phraseNotes[beatInternal2 + 2] == false) {
				noteToStop2 = noteToStop2 + 1	
				} else { break; };
			}
			var swingStop2;				
			if (groupMetronome == 3) {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger((beatInternal2)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}
				else {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger(beatInternal2/groupMetronome)) {
					swingStop2 = noteSwingValues[3];
				} else if (Number.isInteger((beatInternal2 + 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}					
			stopTime = (noteToStop2 * secondsPerBeat) + swingStop2 - noteSwing ;
			bindTheNote();
		}	
		for (var i = 0 ; i < 9; i++) {
			playNowNote = notesArray[i][beatNumber + 1];
			var soundToPlayOn = notesArray[i][0];
			if (playNowNote != false && playNowNote != undefined) {
				if (i < 3 && ( (beatNumber + 1) % 2 == 0) ) {
					var soundToPlayLive = soundToPlayOn + playNowNote + "L";	
				} else {
					var soundToPlayLive = soundToPlayOn + playNowNote;	
				} 
				var beatInternal;
				var noteToStop = 1;
				for (var t = 1 ; t < 7; t++) {
					beatInternal = beatNumber + 1 + t;		
					if (beatInternal > selfSteps) {
						beatInternal = beatInternal - selfSteps;
					};
					if (notesArray[i][beatInternal] == false) {
					noteToStop = noteToStop + 1	
					} else { break; };
				}
				var swingStop;				
				if (groupMetronome == 3) {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger((beatInternal)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				}
					else {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger(beatInternal/groupMetronome)) {
						swingStop = noteSwingValues[3];
					} else if (Number.isInteger((beatInternal + 1)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				}					
				stopTime = (noteToStop * secondsPerBeat) + swingStop - noteSwing ;
				bindTheNote();
			}
		};
		
	} else if (aceIsOn == true) {
		for (var i = 0 ; i < 9; i++) {
			if (i > 2) {
			playNowNote = aceNotes[i][aceNoteToPlay + 1];	
			} else {
			playNowNote = notesArray[i][beatNumber + 1];
			};
			var soundToPlayOn = notesArray[i][0];
			if (playNowNote != false && playNowNote != undefined) {
				if (i < 3 && ( (beatNumber + 1) % 2 == 0) ) {
					var soundToPlayLive = soundToPlayOn + playNowNote + "L";	
				} else {
					var soundToPlayLive = soundToPlayOn + playNowNote;	
				}
				var beatInternal;
				var noteToStop = 1;
				if (i < 3) {
					for (var t = 1 ; t < 7; t++) {
						beatInternal = beatNumber + 1 + t;		
						if (beatInternal > selfSteps) {
							beatInternal = beatInternal - selfSteps;
						};
						if (notesArray[i][beatInternal] == false) {
						noteToStop = noteToStop + 1	
						} else { break; };
					}
				} else {
					for (var t = 1 ; t < 7; t++) {
						beatInternal = aceNoteToPlay + 1 + t;		
						if (beatInternal > aceLength) {
							beatInternal = beatInternal - aceLength;
						};
						if (aceNotes[i][beatInternal] == false) {
						noteToStop = noteToStop + 1	
						} else { break; };
					}
				};				
				var swingStop;				
				if (groupMetronome == 3) {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger((beatInternal)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				} else {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger(beatInternal/groupMetronome)) {
						swingStop = noteSwingValues[3];
					} else if (Number.isInteger((beatInternal + 1)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				}					
				stopTime = (noteToStop * secondsPerBeat) + swingStop - noteSwing ;
				bindTheNote();
			}
		}; 
		playNowNote = aceNotes[0][aceNoteToPlay + 1];
		var soundToPlayOn = "DjembeSolo_"		
		if (playNowNote != false && playNowNote != undefined) {
			if ((beatNumber + 1) % 2 == 0) {
				var soundToPlayLive = "DjembeSolo_" + playNowNote + "L";	
			} else {
				var soundToPlayLive = "DjembeSolo_"  + playNowNote;	
			};
			var beatInternal2;
			var noteToStop2 = 1;
			for (var t = 1 ; t < 7; t++) {
				beatInternal2 = aceNoteToPlay + 1 + t;		
				if (beatInternal2 > phraseLength) {
					beatInternal2 = beatInternal2 - phraseLength;
				};
				if (aceNotes[0][beatInternal2] == false) {
				noteToStop2 = noteToStop2 + 1	
				} else { break; };
			}
			var swingStop2;				
			if (groupMetronome == 3) {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger((beatInternal2)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}
				else {
				if (Number.isInteger((beatInternal2 - 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[0];
				} else if (Number.isInteger(beatInternal2/groupMetronome)) {
					swingStop2 = noteSwingValues[3];
				} else if (Number.isInteger((beatInternal2 + 1)/groupMetronome)) {
					swingStop2 = noteSwingValues[2];
				} else {
					swingStop2 = noteSwingValues[1];
				}
			}					
			stopTime = (noteToStop2 * secondsPerBeat) + swingStop2 - noteSwing ;
			bindTheNote();
		}
	} else {
		for (var i = 0 ; i < 9; i++) {
			playNowNote = notesArray[i][beatNumber + 1];
			var soundToPlayOn = notesArray[i][0];
			if (playNowNote != false && playNowNote != undefined) {
				if (i < 3 && ( (beatNumber + 1) % 2 == 0) ) {
					var soundToPlayLive = soundToPlayOn + playNowNote + "L";	
				} else {
					var soundToPlayLive = soundToPlayOn + playNowNote;	
				}
				var beatInternal;
				var noteToStop = 1;
				for (var t = 1 ; t < 7; t++) {
					beatInternal = beatNumber + 1 + t;		
					if (beatInternal > selfSteps) {
						beatInternal = beatInternal - selfSteps;
					};
					if (notesArray[i][beatInternal] == false) {
					noteToStop = noteToStop + 1	
					} else { break; };
				}
				var swingStop;				
				if (groupMetronome == 3) {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger((beatInternal)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				}
					else {
					if (Number.isInteger((beatInternal - 1)/groupMetronome)) {
						swingStop = noteSwingValues[0];
					} else if (Number.isInteger(beatInternal/groupMetronome)) {
						swingStop = noteSwingValues[3];
					} else if (Number.isInteger((beatInternal + 1)/groupMetronome)) {
						swingStop = noteSwingValues[2];
					} else {
						swingStop = noteSwingValues[1];
					}
				}					
				stopTime = (noteToStop * secondsPerBeat) + swingStop - noteSwing ;
				bindTheNote();
			}
		};
	};

		
	if ((Number.isInteger((currentNote)/groupMetronome)) && playTheShekere == true) {
		if ((currentNote/groupMetronome) % 2 == 0) {
			var soundToPlayLive2 = "Shekere";	
		} else {
			var soundToPlayLive2 = "ShekereB";	
		}
		playSample(audioCtx, soundToPlayLive2 , nextNoteTimeSwing,  groupMetronome * secondsPerBeat);
	};
	
	function bindTheNote() {

		if (playNowNote != false && playNowNote != undefined) {
			this.currentTime = 0;
			if (playNowNote == "OpenRoll") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "SlapRoll") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "OpenSlapRoll") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "SlapOpenRoll") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "BassSlapRoll") {
				playSample(audioCtx, soundToPlayOn + "Bass", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "BassOpenRoll") {
				playSample(audioCtx, soundToPlayOn + "Bass", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "OpenBassRoll") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "BassL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "SlapBassRoll") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, rollDelay);
				playSample(audioCtx, soundToPlayOn + "BassL", nextNoteTimeSwing + rollDelay, (stopTime - rollDelay));
			} else if (playNowNote == "SlapTriplet") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + tripletDelay, ( tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "OpenTriplet") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + tripletDelay, (tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "SlapOpenOpenTriplet") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + tripletDelay, (tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "OpenSlapOpenTriplet") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + tripletDelay, (tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "OpenOpenSlapTriplet") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + tripletDelay, (tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "OpenSlapSlapTriplet") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + tripletDelay, ( tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "SlapOpenSlapTriplet") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + tripletDelay, ( tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "SlapSlapOpenTriplet") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + tripletDelay, ( tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "BassTriplet") {
				playSample(audioCtx, soundToPlayOn + "Bass", nextNoteTimeSwing, tripletDelay);
				playSample(audioCtx, soundToPlayOn + "BassL", nextNoteTimeSwing + tripletDelay, (tripletDelay));
				playSample(audioCtx, soundToPlayOn + "Bass", nextNoteTimeSwing + (2 * tripletDelay), (stopTime - (2 * tripletDelay)));
			} else if (playNowNote == "SlapFlam") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else if (playNowNote == "OpenFlam") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else if (playNowNote == "OpenSlapFlam") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else if (playNowNote == "SlapOpenFlam") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else if (playNowNote == "BassSlapFlam") {
				playSample(audioCtx, soundToPlayOn + "Bass", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "SlapL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else if (playNowNote == "BassOpenFlam") {
				playSample(audioCtx, soundToPlayOn + "Bass", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "OpenL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else if (playNowNote == "OpenBassFlam") {
				playSample(audioCtx, soundToPlayOn + "Open", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "BassL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else if (playNowNote == "SlapBassFlam") {
				playSample(audioCtx, soundToPlayOn + "Slap", nextNoteTimeSwing, flamDelay);
				playSample(audioCtx, soundToPlayOn + "BassL", nextNoteTimeSwing + flamDelay, (stopTime - flamDelay));
			} else {
				playSample(audioCtx, soundToPlayLive , nextNoteTimeSwing, stopTime);
			} 
		}
	}
}


let timerID;
function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote();
    }
    timerID = window.setTimeout(scheduler, lookahead);
}

  function playSample(audioContext, audioBuffer, nextNoteTime, stopNote) {
	var thatAudio = window[audioBuffer + "File"];
	var thisGainValue = window[audioBuffer + "FileGainValue"];
	var thisGain = window[audioBuffer + "Gain"];
	var MuteThisElementonPlay = window[audioBuffer + "Muted"];
	if (MuteThisElementonPlay == false) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = thatAudio;
    sampleSource.playbackRate.setValueAtTime(playbackRate, nextNoteTime);
	sampleSource.connect(thisGain);
	var overallNoteGain = thisGainValue * MasterVolumeValue;
	thisGain.gain.value = overallNoteGain;
    sampleSource.start(nextNoteTime);
	if (stopNote > 0) {
	 sampleSource.stop(nextNoteTime + stopNote);
	}
    return sampleSource;
	}
}

let lastNoteDrawn = selfSteps;
function draw() {
	if (signalStart == false) {
		let drawNote = lastNoteDrawn;
		let currentTime = audioCtx.currentTime;
		while (notesInQueue.length && notesInQueue[0].time < currentTime) {
			drawNote = notesInQueue[0].note;
			notesInQueue.splice(0,1);   // remove note from queue
		}
		// We only need to draw if the note has moved.
		if (lastNoteDrawn != drawNote) {
				var onMetronome = (drawNote)/groupMetronome;
				var offMetronome = (drawNote-1)/groupMetronome;
				var endMetronome = (drawNote-groupMetronome+1)/groupMetronome;
				if (signalIsOn) {
					drawSeq(10,drawNote);
				} else {
					drawSeq(9,drawNote);
				};
			lastNoteDrawn = drawNote;
			
		};
		// set up to draw again
		if (looping == true) {
			requestAnimationFrame(draw);
		}
	};
	function drawSeq(x,drawNote) {
		if (Number.isInteger(onMetronome)) {
			document.getElementById("stopGlasses").classList.add('bg-redOne');
			document.getElementById("stopGlasses").classList.remove('bg-redTwo');
			for (var i = 0 ; i < x; i++) {
				var getTheSpanTab = 'SpanL'+ i +'C'+ drawNote;
				document.getElementById(getTheSpanTab).classList.add('backgroundspan');
			};
			if (phraseIsOn) {
				var getTheSoloTab = 'SpanL9C'+ Math.floor( phraseNoteToPlay/ groupMetronome ) * groupMetronome;
					if (document.getElementById(getTheSoloTab)) {
						document.getElementById(getTheSoloTab).classList.add('backgroundspan');				
					};
			};
		};
		if (Number.isInteger(endMetronome)) {
			for (var i = 0 ; i < x; i++) {
				var getTheSpanTab = 'SpanL'+ (i) +'C'+ (drawNote-groupMetronome+1);
				document.getElementById(getTheSpanTab).classList.remove('backgroundspan');
			};
			document.getElementById("stopGlasses").classList.add('bg-redTwo');
			document.getElementById("stopGlasses").classList.remove('bg-redOne');
			if (phraseIsOn) {
				var findSoloTab = Math.floor( (phraseNoteToPlay - groupMetronome) / groupMetronome ) * groupMetronome;
				if (findSoloTab < 0) {
					findSoloTab = phraseLength - groupMetronome;
				};
				var getTheSoloTab = 'SpanL9C'+ findSoloTab;
					if (document.getElementById(getTheSoloTab)) {
						document.getElementById(getTheSoloTab).classList.remove('backgroundspan');				
					};
			};
		};
	};
};



function selectNoteForTab() {
	clickedTab = event.target.parentElement;
	createSelect(clickedTab);
}

function selectFlamForTab(getTheTab,locationx,locationy) {
	clickedTab = document.getElementById(getTheTab);
	document.getElementById('selectTheCorrectNote').innerHTML = "";
	clickedTab.classList.add('highlight');
	var isColumn = clickedTab.getAttribute("column");
	var thisColumn = Number(isColumn);
	var notesArrayColumn = thisColumn + 1;
	var isLine = clickedTab.getAttribute("line");
	var thisLine = Number(isLine);
	var thisValue = notesArray[thisLine][notesArrayColumn];
	var innerSec3 = '';
	innerSec3 += '<div id="flamMask" class="modal-backdrop fade show"></div>';
	innerSec3 += '<div class="list-group">';
	innerSec3 += 'Rolls';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenRoll\')"><i class="fas drum-machine2 fa-circle roll"></i><i class="fas drum-machine2 fa-circle roll secondRoll2"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapRoll\')"><i class="fas drum-machine2 fa-times roll"></i><i class="fas drum-machine2 fa-times roll secondRoll2"></i></a></div>';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenSlapRoll\')"><i class="fas drum-machine2 fa-circle roll"></i><i class="fas drum-machine2 fa-times roll secondRoll2"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapOpenRoll\')"><i class="fas drum-machine2 fa-times roll"></i><i class="fas drum-machine2 fa-circle roll secondRoll2"></i></a></div>';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'BassOpenRoll\')"><i class="fas drum-machine2 fa-bold roll"></i><i class="fas drum-machine2 fa-circle roll secondRoll2"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'BassSlapRoll\')"><i class="fas drum-machine2 fa-bold roll"></i><i class="fas drum-machine2 fa-times roll secondRoll2"></i></a></div>';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenBassRoll\')"><i class="fas drum-machine2 fa-circle roll"></i><i class="fas drum-machine2 fa-bold roll secondRoll2"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapBassRoll\')"><i class="fas drum-machine2 fa-times roll"></i><i class="fas drum-machine2 fa-bold roll secondRoll2"></i></a></div>';
	innerSec3 += '</div>';
	innerSec3 += '<div class="list-group">';
	innerSec3 += 'Flams';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenFlam\')"><i class="fas fa-circle flam2"></i><i class="fas fa-circle"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapFlam\')"><i class="fas fa-times flam2"></i><i class="fas fa-times"></i></a></div>';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenSlapFlam\')"><i class="fas fa-circle flam2"></i><i class="fas fa-times"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapOpenFlam\')"><i class="fas fa-times flam2"></i><i class="fas fa-circle"></i></a></div>';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'BassOpenFlam\')"><i class="fas fa-bold flam2"></i><i class="fas fa-circle"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'BassSlapFlam\')"><i class="fas fa-bold flam2"></i><i class="fas fa-times"></i></a></div>';
	innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenBassFlam\')"><i class="fas fa-circle flam2"></i><i class="fas fa-bold"></i></a>';
	innerSec3 += '<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapBassFlam\')"><i class="fas fa-times flam2"></i><i class="fas fa-bold"></i></a></div>';
	innerSec3 += '</div>';
	var phraseLength2 = notesArray[thisLine + userPhraseisSelected].length;
	if (!(thisLine > 8 && thisColumn == (phraseLength2 - 2))) {
		innerSec3 += '<div class="list-group tripletGroup" id="tripletGroup">';
		innerSec3 += 'Triplets';
		innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div></a>';
		innerSec3 += '<a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div></a>';
		innerSec3 += '<a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenSlapSlapTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div></a></div>';
		innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapSlapOpenTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div></a>';
		innerSec3 += '<a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapOpenOpenTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div></a>';
		innerSec3 += '<a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'SlapOpenSlapTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div></a></div>';
		innerSec3 += '<div><a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenSlapOpenTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div></a>';
		innerSec3 += '<a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'OpenOpenSlapTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-circle tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-times tripletA"></i></div></a>';
		innerSec3 += '<a href="javascript:void(0)" class="list-group-item tripletsTogether list-group-item-action" onclick="updateTheTabValue('+ thisColumn +','+ thisLine +', \'BassTriplet\')">';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-bold tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-bold tripletA"></i></div>';
		innerSec3 += '<div class="containTriplet"><span class="flam3">3</span><i class="fas fa-bold tripletA"></i></div></a></div>';	
		innerSec3 += '</div>';
	}	
	var pageWidth = window.innerWidth;
	var pageHeight = window.innerHeight;
	var showTheNoteCollector = document.getElementById('selectTheCorrectNote');
	showTheNoteCollector.innerHTML = innerSec3;
	if (locationx > pageWidth/2 ) {
		showTheNoteCollector.style.left = null;
		showTheNoteCollector.style["right"] = (pageWidth - locationx) + 'px';		
	} else {
		showTheNoteCollector.style.right = null;
		showTheNoteCollector.style["left"] = locationx + 'px';
	}
	if (locationy > pageHeight/2 ) {
		showTheNoteCollector.style.top = null;
		showTheNoteCollector.style["bottom"] = (pageHeight - locationy) + 'px';	
	} else {
		showTheNoteCollector.style.bottom = null;
		showTheNoteCollector.style["top"] = locationy + 'px';
	}
	document.getElementById('flamMask').addEventListener("click", updateTheTabValuefromMask);
	function updateTheTabValuefromMask() {
			showTheNoteCollector.innerHTML = "";
			clickedTab.classList.remove('highlight');
	}
	
}

function selectNoteForDjembe(getTheTab) {
	clickedTab = document.getElementById(getTheTab);
	document.getElementById('selectTheCorrectNote').innerHTML = "";
	clickedTab.classList.add('highlight');
	var isColumn = clickedTab.getAttribute("column");
	var thisColumn = Number(isColumn);
	var notesArrayColumn = thisColumn + 1;
	var isLine = clickedTab.getAttribute("line");
	var thisLine = Number(isLine);
	if (thisLine == 9 && userPhraseisSelected > 0) {
		var thisValue = notesArray[thisLine + userPhraseisSelected][notesArrayColumn];
	} else {
		var thisValue = notesArray[thisLine][notesArrayColumn];
	}
	var nextColumn;
	if (thisColumn == selfSteps - 1) {
		nextColumn = 0;
	} else {
		nextColumn == thisColumn + 1;
	};
	var nextTabID = "L" + thisLine + "C" + nextColumn;
	var nextTab = document.getElementById(nextTabID);
	if (clickedTab.getAttribute("triplet")) {
		var tripletValue = clickedTab.getAttribute("triplet");
		if (tripletValue === "first") {
			var nextColumn;
			if (thisColumn == selfSteps - 1) {
				nextColumn = 0;
			} else {
				nextColumn = thisColumn + 1;
			};
			var nextTabID = "L" + thisLine + "C" + nextColumn;
			var nextTab = document.getElementById(nextTabID);
			nextTab.removeAttribute("triplet");
			clickedTab.removeAttribute("triplet");
			updateTheTabValue(thisColumn, thisLine, 'Empty');
			updateTheTabValue(nextColumn, thisLine, 'Empty');
		} else if (tripletValue === "second") {
			var previousColumn;
			if (thisColumn == 0) {
				previousColumn = (selfSteps - 1);
			} else {
				previousColumn = thisColumn - 1;
			};
			var previousTabID = "L" + thisLine + "C" + previousColumn;
			var previousTab = document.getElementById(previousTabID);
			previousTab.removeAttribute("triplet");
			clickedTab.removeAttribute("triplet");
			updateTheTabValue(thisColumn, thisLine, 'Empty');
			updateTheTabValue(previousColumn, thisLine, 'Empty');
		}
	} else if (thisValue == false ) {
		updateTheTabValue(thisColumn, thisLine, 'Open');
	} else if (thisValue == 'Open' ) {
		updateTheTabValue(thisColumn, thisLine, 'Slap');
	} else if  (thisValue == 'Slap' ) {
		updateTheTabValue(thisColumn, thisLine, 'Bass');
	} else if  (thisValue == 'Bass' ) {
		updateTheTabValue(thisColumn, thisLine, 'Mute');
	} else {
		updateTheTabValue(thisColumn, thisLine, 'Empty');
	}
}

function createSelect(clickedTab) {
	$$$$('.highlight').each(function () {
		this.classList.remove('highlight');
	});
	var TheTab = clickedTab;
	document.getElementById('selectTheCorrectNote').innerHTML = "";
	var isColumn = TheTab.getAttribute("column");
	var thisColumn = Number(isColumn);
	var notesArrayColumn = thisColumn + 1;
	var isLine = TheTab.getAttribute("line");
	var thisLine = Number(isLine);
	var thisValue = notesArray[thisLine][notesArrayColumn];
	if (thisLine == 3 || thisLine == 5 || thisLine == 7) {
			if (thisValue == false ) {
				updateTheTabValue(thisColumn, thisLine, 'Open');
			} else if  (thisValue == 'Open' ) {
				updateTheTabValue(thisColumn, thisLine, 'Muffled');
			} else {
				updateTheTabValue(thisColumn, thisLine, 'Empty');
			}
	} else {
			if (thisValue == false ) {
				updateTheTabValue(thisColumn, thisLine, 'Open');
			} else {
				updateTheTabValue(thisColumn, thisLine, 'Empty');
			}
	}
}

function updateTheTab(element, value) {
	var htmlimput='';
	var NextElement;
	var htmlTripletimput='';
	if (value == "Bass") {
		htmlimput += '<i class="fas drum-machine fa-bold">';
	} else if (value == "Open") {
		var NumberLine = element.getAttribute("line");
		if (NumberLine == 4 || NumberLine == 6 || NumberLine == 8) {
			htmlimput += '<i class="fas drum-machine fa-times">'
		} else {
			htmlimput += '<i class="fas drum-machine fa-circle">';
		}
	} else if (value == "Slap") {
		htmlimput += '<i class="fas drum-machine fa-times">';
	} else if (value == "Mute") {
		htmlimput += '<i class="fas drum-machine fa-long-arrow-alt-down">';
	} else if (value == "Muffled") {
		htmlimput += '<i class="fas drum-machine fa-long-arrow-alt-down">'; 
	} else if (value == "OpenRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-circle roll"></i><i class="fas drum-machine2 fa-circle roll secondRoll"></i>';
	} else if (value == "SlapRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-times roll"></i><i class="fas drum-machine2 fa-times roll secondRoll"></i>';
	} else if (value == "OpenSlapRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-circle roll"></i><i class="fas drum-machine2 fa-times roll secondRoll"></i>';
	} else if (value == "SlapOpenRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-times roll"></i><i class="fas drum-machine2 fa-circle roll secondRoll"></i>';
	} else if (value == "BassSlapRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-bold roll"></i><i class="fas drum-machine2 fa-times roll secondRoll"></i>';
	} else if (value == "BassOpenRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-bold roll"></i><i class="fas drum-machine2 fa-circle roll secondRoll"></i>';
	} else if (value == "OpenBassRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-circle roll"></i><i class="fas drum-machine2 fa-bold roll secondRoll"></i>';
	} else if (value == "SlapBassRoll") {
		htmlimput += '<i class="fas drum-machine2 fa-times roll"></i><i class="fas drum-machine2 fa-bold roll secondRoll"></i>';
	} else if (value == "OpenFlam") {
		htmlimput += '<i class="fas drum-machine fa-circle"></i><i class="fas fa-circle flam"></i>';
	} else if (value == "SlapFlam") {
		htmlimput += '<i class="fas drum-machine fa-times"></i><i class="fas fa-times flam"></i>';
	} else if (value == "OpenSlapFlam") {
		htmlimput += '<i class="fas fa-times drum-machine"></i><i class="fas fa-circle flam"></i>';
	} else if (value == "SlapOpenFlam") {
		htmlimput += '<i class="fas fa-circle drum-machine"></i><i class="fas fa-times flam"></i>';
	} else if (value == "BassSlapFlam") {
		htmlimput += '<i class="fas fa-times drum-machine"></i><i class="fas fa-bold flam"></i>';
	} else if (value == "BassOpenFlam") {
		htmlimput += '<i class="fas fa-circle drum-machine"></i><i class="fas fa-bold flam"></i>';
	} else if (value == "OpenBassFlam") {
		htmlimput += '<i class="fas fa-bold drum-machine"></i><i class="fas fa-circle flam"></i>';
	} else if (value == "SlapBassFlam") {
		htmlimput += '<i class="fas fa-bold drum-machine"></i><i class="fas fa-times flam"></i>';
	} else if (value == "SlapTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-times tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-times tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-times tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "OpenTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-circle tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-circle tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-circle tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "SlapOpenOpenTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-times tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-circle tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-circle tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "OpenSlapOpenTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-circle tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-times tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-circle tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "OpenOpenSlapTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-circle tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-circle tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-times tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "OpenSlapSlapTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-circle tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-times tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-times tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "SlapOpenSlapTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-times tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-circle tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-times tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "SlapSlapOpenTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-times tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-times tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-circle tripletB thirdTriplet">';
		findTheNext();
	} else if (value == "BassTriplet") {
		htmlimput += '<div class="containTripletB"><span class="flam3 firstTriplet">3</span><i class="fas fa-bold tripletB firstTriplet"></i></div><div class="containTripletB"><span class="flam3 secondTriplet">3</span><i class="fas fa-bold tripletB secondTriplet"></i></div>';
		htmlTripletimput += '<div class="containTripletB"><span class="flam3 thirdTriplet">3</span><i class="fas fa-bold tripletB thirdTriplet">';
		findTheNext();
		} else if (value == "Empty" ) {
		htmlimput += '<i class="fas drum-machine fa-minus">'; 
	}; 
	element.innerHTML = htmlimput;
	function findTheNext() {
		var NumberLine = Number(element.getAttribute("line"));
		var NumberColumn = Number(element.getAttribute("column"));
		var midlength;
		if (NumberColumn > 9) {
			midlength = phraseStepsDoc;
		} else {
			midlength = selfSteps;
		};
		if (NumberColumn == (midlength  - 1)) {
			NumberColumn= 0;
		} else {
			NumberColumn= NumberColumn +1;
		};
		notesArray[NumberLine][(NumberColumn + 1)] = false;
		var nextID = "L" + NumberLine + "C" + NumberColumn;
		NextElement = document.getElementById(nextID);
		NextElement.setAttribute("triplet", "second");
		element.setAttribute("triplet", "first");
		NextElement.innerHTML = htmlTripletimput;
		NextElement.classList.add('on');
		bindtheTab(NumberColumn, NumberLine);
	};
}

function updateTheTabValue(i, j, value) {
	getTheClickedID = "L"  + j + "C" + i;
	var NextColumn = 0;
	if (i == (selfSteps - 1)) {
		NextColumn = 0;
	} else {
		NextColumn =i+1;
	}
	var getTheNextID ="L"  + j + "C" + NextColumn;
	getTheNext = document.getElementById(getTheNextID);
	if (getTheNext && (getTheNext.getAttribute("triplet") && value.includes("Triplet"))) {
		updateTheTab(getTheNext, "Empty");
		if ( i == (selfSteps - 2)) {
			var SecondNextColumn = 0;
		} else if (i == (selfSteps - 1)) {
			var SecondNextColumn =  1 ;
		} else {
			var SecondNextColumn =  i + 2 ;
		}
		var getTheSecondNextID = "L"  + j + "C" + SecondNextColumn;
		getTheSecondNext = document.getElementById(getTheSecondNextID);
		updateTheTab(getTheSecondNext, "Empty");
		getTheSecondNext.classList.remove('on');
		bindtheTab(SecondNextColumn,j);
		getTheSecondNext.removeAttribute("triplet");
	};
	getTheClickedElement = document.getElementById(getTheClickedID);
	updateTheTab(getTheClickedElement, value);
    document.getElementById('selectTheCorrectNote').innerHTML = "";
	if (j==9 && userPhraseisSelected > 0) {
		if (value == "Empty") {
			notesArray[9 + userPhraseisSelected][i+1] = false;
		} else {
			notesArray[9 + userPhraseisSelected][i+1] = value;
		}
	} else if (value == "Empty") {
		notesArray[j][i+1] = false;
	} else {
			notesArray[j][i+1] = value;
	}
	var thisNote = getTheClickedElement.title;
	var createthesound = thisNote + "_" + value;
	if (looping == false && value != "Empty") {
			if (value == "OpenRoll") {	
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0); 
				}, rollDelay2 * 1000);
			} else if (value == "SlapRoll") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, rollDelay2 * 1000);
			} else if (value == "OpenSlapRoll") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, rollDelay2 * 1000);
			} else if (value == "SlapOpenRoll") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, rollDelay2 * 1000);
			} else if (value == "BassSlapRoll") {
				playSample(audioCtx, thisNote + "_Bass", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, rollDelay2 * 1000);
			} else if (value == "BassOpenRoll") {
				playSample(audioCtx, thisNote + "_Bass", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, rollDelay2 * 1000);
			} else if (value == "OpenBassRoll") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Bass", 0.02, 0);
				}, rollDelay2 * 1000);
			} else if (value == "SlapBassRoll") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_BassL", 0.02, 0);
				}, rollDelay2 * 1000);
			} else if (value == "OpenFlam") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "SlapFlam") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "OpenSlapFlam") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "SlapOpenFlam") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "BassSlapFlam") {
				playSample(audioCtx, thisNote + "_Bass", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "BassOpenFlam") {
				playSample(audioCtx, thisNote + "_Bass", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "OpenBassFlam") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_BassL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "SlapBassFlam") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_BassL", 0.02, 0);
				}, flamDelay * 1000);
			} else if (value == "OpenTriplet") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "SlapTriplet") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "OpenSlapSlapTriplet") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "SlapOpenSlapTriplet") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "SlapSlapOpenTriplet") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_SlapL", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "SlapOpenOpenTriplet") {
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "OpenSlapOpenTriplet") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "OpenOpenSlapTriplet") {
				playSample(audioCtx, thisNote + "_Open", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_OpenL", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Slap", 0.02, 0);
				}, rollDelay2 * 2000);
			} else if (value == "BassTriplet") {
				playSample(audioCtx, thisNote + "_Bass", 0.02, 0);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_BassL", 0.02, 0);
				}, rollDelay2 * 1000);
				setTimeout(function(){ 
				playSample(audioCtx, thisNote + "_Bass", 0.02, 0);
				}, rollDelay2 * 2000);
			} else {
				playSample(audioCtx, createthesound, 0);
			} 
	}
	if (value != "Empty" ) {
		getTheClickedElement.classList.add('on');
	} else {
		getTheClickedElement.classList.remove('on');
	}
	getTheClickedElement.classList.remove('highlight');
	if (j == 9) {
		signalNotes=[];
		for (var p = 0; p < selfSteps; p++) {
			signalNotes[p] = notesArray[9][p +1];
		}
		while (signalNotes[0] == false) {
		 signalNotes.shift();
		}
		bufferSteps = signalNotes.length
	};
	localStorage["notesArray"] = JSON.stringify(notesArray);
	var copyArray = JSON.parse(localStorage["notesArray"]);
	phraseNotes= [];
	phraseNotes = copyArray[userPhraseisSelected + 9];
	phraseNotes[0] = "User phrase #" + userPhraseisSelected;
	phraseNotes = [phraseStepsDoc].concat(phraseNotes);
	bindtheTab(i,j);
}	


function bindtheTab(i,j) {
		var getTheTab = 'L'+ j +'C'+ i;
		var divTab = document.getElementById(getTheTab);
		var locationx;
		var locationy;
		let mousedownTime;
		var mouseUpIsFired = false;
		let stopScrolling = false;
		var timeDifference;
		var intervalMouse;
		var kickTheFlams = 200;
		if (j < 3 || j == 9) {
			divTab.firstChild.addEventListener('touchstart', function(e){
				event.preventDefault();
				mousedownTime = new Date().getTime();
				locationx = e.touches[0].clientX;
				locationy = e.touches[0].clientY;
				intervalMouse = window.setInterval(checkTheMouseDown, 50);	
				window.addEventListener("touchmove", handleTouchMove, {passive: false});
				} );
			divTab.firstChild.addEventListener('mousedown', function(e){
				mousedownTime = new Date().getTime();
				locationx = event.pageX;
				locationy = event.pageY;
				intervalMouse = window.setInterval(checkTheMouseDown, 50);
			} );
			divTab.firstChild.addEventListener('touchend', findTheTouchup);
			divTab.firstChild.addEventListener('mouseup', findTheMouseup);
			if (divTab.childNodes.length > 1)  {
				divTab.lastChild.addEventListener('touchstart', function(e){
					event.preventDefault();
					mousedownTime = new Date().getTime();
					locationx = e.touches[0].clientX;
					locationy = e.touches[0].clientY;
					intervalMouse = window.setInterval(checkTheMouseDown, 50);	
					window.addEventListener("touchmove", handleTouchMove, {passive: false});
					} );
				divTab.lastChild.addEventListener('mousedown', function(e){
					mousedownTime = new Date().getTime();
					locationx = event.pageX;
					locationy = event.pageY;
					intervalMouse = window.setInterval(checkTheMouseDown, 50);
				} );
				divTab.lastChild.addEventListener('touchend', findTheTouchup);
				divTab.lastChild.addEventListener('mouseup', findTheMouseup);				
			}
		} else {
			divTab.firstChild.addEventListener("click", selectNoteForTab);
		}
		
		function checkTheMouseDown() {
			const newTime = new Date().getTime();
			timeDifference = newTime - mousedownTime;
			if (timeDifference < kickTheFlams && mouseUpIsFired == true) {
			clearInterval(intervalMouse);
			} else if (timeDifference > kickTheFlams) {
			clearInterval(intervalMouse);
			selectFlamForTab(getTheTab,locationx,locationy);
			}
		}	
		function findTheTouchup(event) {
			mouseUpIsFired = true;
			if (timeDifference < kickTheFlams) {
			selectNoteForDjembe(getTheTab);
			}
			handleTouchMove(event);
		}		
		function findTheMouseup(event) {
			mouseUpIsFired = true;
			if (timeDifference < kickTheFlams) {
			selectNoteForDjembe(getTheTab);
			}
			handleTouchMove(event);
		}	
		function handleTouchMove(e) {
		  if (!stopScrolling) {
			return;
		  }
		  e.preventDefault();
		}

		function onTouchStart() {
		  stopScrolling = true;
		}

		function onTouchEnd() {
		  stopScrolling = false;
		}		
}

function addEventListenersToTabs() {
	for (var i = 0 ; i < 10; i++) {
		for (var j = 0 ; j < selfSteps; j++) {
		bindtheTab(j,i);
		}
	}
}

function removeEventListenersToTabs() {
	for (var i = 0 ; i < 10; i++) {
		for (var j = 0 ; j < selfSteps; j++) {
			var getTheTab = 'L'+ i +'C'+ j;
			if (i < 3 || i == 9) {
				document.getElementById(getTheTab).firstChild.removeEventListener('mouseup', function () {
			  const mouseupTime = new Date().getTime();
					var timeDifference = mouseupTime - mousedownTime;
			  if (timeDifference < 300) {
				selectNoteForDjembe(getTheTab);
			  } else {
				selectFlamForTab(getTheTab,locationx,locationy);
			  }
			});
			} else {
				document.getElementById(getTheTab).firstChild.removeEventListener("click", selectNoteForTab);
			}
		}
	}
}


function generateTheRythms() {
	var objectKeys = Object.keys(patterns);
	var innerSec8 = '';
	var buttonClasses=" ";
	innerSec8 += '<div style="text-align:left;"><input type="text" placeholder="Search rythms" id="searchrythm" onkeyup="filterFunction()" class="" style="width:100%;">';
	innerSec8 += '<span style="color:white;">Filter: </span>';
	innerSec8 += '<div class="form-check form-check-inline text-white" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input" type="radio" name="Radios" id="all" value="all" onclick="filterTags(this)"; checked>';
	innerSec8 += 'All</div>';
	innerSec8 += '<div class="form-check form-check-inline" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input" type="radio" name="Radios" id="stefano" value="stefano" onclick="filterTags(this), filterStefano()";>';
	innerSec8 += '<a href="https://www.facebook.com/yeelenathens/" onclick="stefanoClick()" target="_blank" class="form-check-label text-white" for="stefanoFilter">S.F. Attanasio</a></div>';		
	innerSec8 += '<div class="form-check form-check-inline text-white" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input " type="radio" name="Radios" id="dunumba" value="dunumba" onclick="filterTags(this)";>';
	innerSec8 += 'Dunumbas</div>';		
	innerSec8 += '<div class="form-check form-check-inline text-white" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input " type="radio" name="Radios" id="guinea" value="guinea" onclick="filterTags(this)";>';
	innerSec8 += 'Guinea</div>';		
	innerSec8 += '<div class="form-check form-check-inline text-white" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input " type="radio" name="Radios" id="mali" value="mali" onclick="filterTags(this)";>';
	innerSec8 += 'Mali</div>';		
	innerSec8 += '<div class="form-check form-check-inline text-white" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input " type="radio" name="Radios" id="ivory" value="ivory" onclick="filterTags(this)";>';
	innerSec8 += 'Ivory</div>';		
	innerSec8 += '<div class="form-check form-check-inline text-white" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input " type="radio" name="Radios" id="binary" value="binary" onclick="filterTags(this)";>';
	innerSec8 += 'Binary</div>';		
	innerSec8 += '<div class="form-check form-check-inline text-white" style="text-align:left;margin-bottom:2%;">'
	innerSec8 += '<input class="form-check-input" type="radio" name="Radios" id="ternary" value="ternary" onclick="filterTags(this)";>';
	innerSec8 += 'Ternary</div></div>';		
	objectKeys.forEach(function(entry) {
		if (entry.startsWith('startTable') == false && entry.startsWith('practise') == false) {
			if (patterns[entry].tags) {
				var tagTable = patterns[entry].tags;
				tagTable.forEach(function(tag) {	
				buttonClasses = buttonClasses + " " + tag
				});
			}
			var buttonSteps = patterns[entry].steps;
			var typeofrhythm = 'ternary';
			if ( buttonSteps === 16 ||
				buttonSteps === 32 ||
				buttonSteps === 48 ||
				buttonSteps === 64) {
				 typeofrhythm = 'binary';
			}
			buttonClasses = buttonClasses + " " + typeofrhythm;
			innerSec8 += '<button href="javascript:;" class="pattern rythmbutton' + buttonClasses + '" data-pattern="' + entry + '" id="' + entry + 'Button" data-toggle="modal" data-target="#rythmsModal" onclick="deleteTheRhythms(), switchView()" aria-label="Close">' + patterns[entry].name + '</button>'
			buttonClasses=" ";
			}
	});
	document.getElementById('rythmMenu').innerHTML= innerSec8;
	jQuery('.pattern').on('click', function () {
		patternClick(this.dataset.pattern);
	});
}
function deleteTheRhythms() {
	document.getElementById('rythmMenu').innerHTML= "";
}

function generateThePractise() {
	$("#practiseMenu").load("https://www.djembeloops.com/practiseMenu.html");
}
function deleteThePractise() {
	document.getElementById('practiseMenu').innerHTML= "";
}
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchrythm");
  filter = input.value.toUpperCase();
  div = document.getElementById("rythmMenu");
  a = div.getElementsByTagName("button");
  for (i = 0; i < a.length; i++) {
	var filterPattern = patterns[a[i].dataset.pattern];
    txtValue = (a[i].textContent || a[i].innerText);
	if (filterPattern.info) {
		txtValue = txtValue + filterPattern.info;
	};
	if (filterPattern.footer) {
		txtValue = txtValue + filterPattern.footer;
	};
	if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    };
  };
};

function filterTags(input){
	var div, a, i, tag;
	tag = input.value;
	div = document.getElementById("rythmMenu");
	a = div.getElementsByTagName("button");
  if (input.checked == true){
	  for (i = 0; i < a.length; i++) {
		a[i].classList.remove('noDisplay');
		if (tag != 'all') {
			if (a[i].classList.contains(tag) == false) {
				a[i].classList.add('noDisplay');
			};
		};
	  };  
  } else {
	  for (i = 0; i < a.length; i++) {
		if (a[i].classList.contains(tag) == false) {
			a[i].classList.remove('noDisplay');
		}
	  };  
  };
};

function updateInstrumentVolumes() {
		if (localStorage.VolumeDjembeOne) {
		  VolumeDjembeOne = Number(localStorage.VolumeDjembeOne);
		} else {
		  VolumeDjembeOne = 0.5;
		}
		document.getElementById("volDjembeOne").value = (VolumeDjembeOne * 100);
		changeVol(DjembeOne,(VolumeDjembeOne));
		if (localStorage.VolumeDjembeTwo) {
			  VolumeDjembeTwo = Number(localStorage.VolumeDjembeTwo);
			} else {
			  VolumeDjembeTwo = 0.5;
		}
		document.getElementById("volDjembeTwo").value = (VolumeDjembeTwo * 100);
		changeVol(DjembeTwo,(VolumeDjembeTwo));
		if (localStorage.VolumeDjembeThree) {
			  VolumeDjembeThree = Number(localStorage.VolumeDjembeThree);
			} else {
			  VolumeDjembeThree = 0.5;
		}		
		document.getElementById("volDjembeThree").value = (VolumeDjembeThree * 100);
		changeVol(DjembeThree,(VolumeDjembeThree));
		if (localStorage.VolumeDjembeSolo) {
			  VolumeDjembeSolo = Number(localStorage.VolumeDjembeSolo);
			} else {
			  VolumeDjembeSolo = 1;
		}
		document.getElementById("volDjembeSolo").value = (VolumeDjembeSolo * 100);
		changeVol(DjembeSolo,(VolumeDjembeSolo));
		if (localStorage.VolumeKenkeni) {
			  VolumeKenkeni = Number(localStorage.VolumeKenkeni);
			} else {
			  VolumeKenkeni = 0.5;
		}
		document.getElementById("volKenkeni").value = (VolumeKenkeni * 100);
		changeVol(Kenkeni, (VolumeKenkeni));
		if (localStorage.VolumeSangban) {
			  VolumeSangban = Number(localStorage.VolumeSangban);
			} else {
			  VolumeSangban = 0.5;
		}
		document.getElementById("volSangban").value = (VolumeSangban * 100);
		changeVol(Sangban, (VolumeSangban));
		if (localStorage.VolumeDoundoun) {
				VolumeDoundoun = Number(localStorage.VolumeDoundoun);
			} else {
			  VolumeDoundoun = 0.5;
		}
		document.getElementById("volDoundoun").value = (VolumeDoundoun * 100);
		changeVol(Doundoun, (VolumeDoundoun));
		if (localStorage.VolumeKenkeni_Bell) {
			  VolumeKenkeni_Bell = Number(localStorage.VolumeKenkeni_Bell);
			} else {
			  VolumeKenkeni_Bell = 0.15;
		}
		document.getElementById("volKenkeni_Bell").value = (VolumeKenkeni_Bell * 100);
		changeVol(Kenkeni_Bell, (VolumeKenkeni_Bell));
		if (localStorage.VolumeSangban_Bell) {
			  VolumeSangban_Bell = Number(localStorage.VolumeSangban_Bell);
			} else {
			  VolumeSangban_Bell = 0.15;
		}
		document.getElementById("volSangban_Bell").value = (VolumeSangban_Bell * 100);
		changeVol(Sangban_Bell, (VolumeSangban_Bell));
		if (localStorage.VolumeDoundoun_Bell) {
			  VolumeDoundoun_Bell = Number(localStorage.VolumeDoundoun_Bell);
			} else {
			  VolumeDoundoun_Bell = 0.15;
		}
		document.getElementById("volDoundoun_Bell").value = (VolumeDoundoun_Bell * 100);
		changeVol(Doundoun_Bell, (VolumeDoundoun_Bell));
		if (localStorage.VolumeShekere) {
		  VolumeShekere = Number(localStorage.VolumeShekere);
		} else {
		  VolumeShekere = 0.22;
		}
		document.getElementById("volShekere").value = (VolumeShekere * 100);
		changeVol(Shekere, (VolumeShekere));
}

function resetSwingValues() {
	swingA = 0;
	swingB = 0;
	swingC = 0;
	swingD = 0;
	document.getElementById("swing0tempo").value = swingA;
	document.getElementById("swing0Output").innerHTML = swingA;
	document.getElementById("swing1tempo").value = swingB;
	document.getElementById("swing1Output").innerHTML = swingB;
	document.getElementById("swing2tempo").value = swingC;
	document.getElementById("swing2Output").innerHTML = swingC;
	document.getElementById("swing3tempo").value = swingD;
	document.getElementById("swing3Output").innerHTML = swingD;
	localStorage.swingA = swingA;
	localStorage.swingB = swingB;
	localStorage.swingC = swingC;
	localStorage.swingD = swingD;
	rollDuration();
	drawChart();
}
function changeSwingValues(rhythm) {
	var patternToUse = patterns[rhythm];
	swingA = patternToUse.swingA;
	swingB = patternToUse.swingB;
	swingC = patternToUse.swingC;
	swingD = patternToUse.swingD;
	swingFactor = patternToUse.swingFactor;
	referenceTempo = patternToUse.tempo;
	document.getElementById("swing0tempo").value = swingA;
	document.getElementById("swing0Output").innerHTML = swingA;
	document.getElementById("swing1tempo").value = swingB;
	document.getElementById("swing1Output").innerHTML = swingB;
	document.getElementById("swing2tempo").value = swingC;
	document.getElementById("swing2Output").innerHTML = swingC;
	document.getElementById("swing3tempo").value = swingD;
	document.getElementById("swing3Output").innerHTML = swingD;
	document.getElementById("tempoSwing").value = referenceTempo;
	document.getElementById("MetronomeSwingOutput").innerHTML = referenceTempo;
	document.getElementById("swingFactorInput").value = swingFactor;
	document.getElementById("dynamicSwing").innerHTML = swingFactor;
	localStorage.swingA = swingA;
	localStorage.swingB = swingB;
	localStorage.swingC = swingC;
	localStorage.swingD = swingD;
	localStorage.swingFactor = swingFactor;
	localStorage.referenceTempo = referenceTempo;
	rollDuration();
	drawChart();
}

//indexedDB code

// Create an instance of a db object for us to store the open database in
let db;




function createSvgSpace() {
	var checkExist = setInterval(function() {
	titleWidth2 = document.getElementById("titleWidth");
	tabcontainer2 = document.getElementById("tabcontainer");
	if (typeof(titleWidth2) != 'undefined' && titleWidth2 != null && typeof(tabcontainer2) != 'undefined' && tabcontainer2!= null) {
		  drawTheSvg();
		  clearInterval(checkExist);
	   }
	}, 100);
}
	

function drawTheSvg() {		
		titleWidth = document.getElementById("titleWidth").offsetWidth;
		tabcontainer = document.getElementById("tabcontainer").offsetWidth;
		if (groupMetronome == 4) {
			var innerspanReal = tabcontainer / 4;
			var innerspan = innerspanReal * 0.5;
		} else {
			var innerspanReal = tabcontainer / 3;
			var innerspan = innerspanReal * 0.4 - 4;
			}
		var halfinnerspan = innerspan / 2;
		var firstleftmargin =  titleWidth + halfinnerspan;
		var svgrealwidth = tabcontainer - innerspan;
		
		var innerNotes = '';
		if (selfSteps == 8) {
			innerNotes +=  '<img src="img/sixteenth.svg" class="sixteenth" style="width:' + svgrealwidth +'px; margin-left:' + firstleftmargin + 'px">';
			innerNotes +=  '<img src="img/sixteenth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px; margin-right:' + halfinnerspan + 'px;">';
		} else if (selfSteps == 9 || selfSteps == 18) {
			innerNotes +=  '<img src="img/eighth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + firstleftmargin + 'px">';
			innerNotes +=  '<img src="img/eighth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px">';
			innerNotes +=  '<img src="img/eighth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px; margin-right:' + innerspan + 'px;">';
		} else if (groupMetronome == 4) {
			innerNotes +=  '<img src="img/sixteenth.svg" class="sixteenth" style="width:' + svgrealwidth +'px; margin-left:' + firstleftmargin + 'px">';
			innerNotes +=  '<img src="img/sixteenth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px">';
			innerNotes +=  '<img src="img/sixteenth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px">';
			innerNotes +=  '<img src="img/sixteenth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px; margin-right:' + halfinnerspan + 'px;">';
		} else if (selfSteps3 == 4812 || groupMetronome == 3){
			innerNotes +=  '<img src="img/eighth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + firstleftmargin + 'px">';
			innerNotes +=  '<img src="img/eighth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px">';
			innerNotes +=  '<img src="img/eighth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px">';
			innerNotes +=  '<img src="img/eighth.svg" class="sixteenth" style="width:' + svgrealwidth + 'px; margin-left:' + innerspan + 'px; margin-right:' + innerspan + 'px;">';
		};
		document.getElementById("noteVisual").innerHTML = innerNotes;
	
}

function playTheSignal() {
	hideTheAce();
	hideThePhrases();
	signalIssetToGo = true;
	aceIssetToGo = false;
	phraseIssetToGo = false;
}

function playTheAce() {
	aceIssetToGo = true;
	phraseIssetToGo = false;
	signalIssetToGo = false;
	hideTheAce();
	captureAce();
	hideThePhrases();
	hideTheSignal();
}

function playThePhrase(pattern, value) {
	aceNotesAll = phrases[pattern];
	phraseBufferNotes = aceNotesAll[value];
	phraseIssetToGo = true;
	aceIssetToGo = false;
	signalIssetToGo = false;
	hideTheAce();
	hideTheSignal();
}

function startWithSignal() {
	signalSteps = bufferSteps;
	signalStart = true;
	showThePhrases();
	var signalDIv =document.getElementById('signal');
	signalDIv.classList.add('noPointer');
	$('#play').trigger('click');
}

function showTheSignal() {
	var signalDIv =document.getElementById('signal');
	signalDIv.classList.remove('text-secondary');
	signalDIv.classList.add('text-success');
	signalDIv.classList.remove('noPointer');
	var signalDIvView =document.getElementById('signalGlasses');
	signalDIvView.classList.remove('bg-secondary');
	signalDIvView.classList.add('bg-lime');
	signalDIvView.classList.remove('noPointer');
}

function hideTheSignal() {
	var signalDIv =document.getElementById('signal');
	signalDIv.classList.add('text-secondary');
	signalDIv.classList.remove('text-success');
	signalDIv.classList.add('noPointer');
	var signalDIvView =document.getElementById('signalGlasses');
	signalDIvView.classList.add('bg-secondary');
	signalDIvView.classList.remove('bg-lime');
	signalDIvView.classList.add('noPointer');
}

function showTheAce() {
	var signalDIv =document.getElementById('ace');
	signalDIv.classList.remove('text-secondary');
	signalDIv.classList.add('text-success');
	signalDIv.classList.remove('noPointer');
	var signalDIvView =document.getElementById('aceGlasses');
	signalDIvView.classList.remove('bg-secondary');
	signalDIvView.classList.add('bg-green');
	signalDIvView.classList.remove('noPointer');
}

function hideTheAce() {
	var signalDIv = document.getElementById('ace');
	signalDIv.classList.add('text-secondary');
	signalDIv.classList.remove('text-success');
	signalDIv.classList.add('noPointer');
	var signalDIvView =document.getElementById('aceGlasses');
	signalDIvView.classList.add('bg-secondary');
	signalDIvView.classList.remove('bg-green');
	signalDIvView.classList.add('noPointer');
}

function flamDuration() {
	var durationOfNote = 60.0 / selfTempo / groupMetronome;
	var flamPercentageOfNote = 0.25;
	flamDelay = durationOfNote * flamPercentageOfNote;
}

function playShekere() {
	var shekereDiv = document.getElementById('Shekere');
	if (playTheShekere == false ) {
		playTheShekere = true;
		localStorage.playTheShekere = true;
		document.getElementById('shekereRed').classList.add('nodisplay');
		document.getElementById('shekereGreen').classList.remove('nodisplay');
		document.getElementById('shekereRedGlasses').classList.add('nodisplay');
		document.getElementById('shekereGreenGlasses').classList.remove('nodisplay');
		document.getElementById('shekereRedEqu').classList.add('nodisplay');
		document.getElementById('shekereGreenEqu').classList.remove('nodisplay');
	} else {
		playTheShekere = false;
		document.getElementById('shekereRed').classList.remove('nodisplay');
		document.getElementById('shekereGreen').classList.add('nodisplay');
		document.getElementById('shekereRedGlasses').classList.remove('nodisplay');
		document.getElementById('shekereGreenGlasses').classList.add('nodisplay');
		document.getElementById('shekereRedEqu').classList.remove('nodisplay');
		document.getElementById('shekereGreenEqu').classList.add('nodisplay');
		localStorage.playTheShekere = false;
	}
}

function moreTempo() {
	var existingTempo = eval(document.getElementById('tempo').value);
	if (existingTempo < 220) {
		selfTempo = existingTempo + 1;
		localStorage.selfTempo = selfTempo;
		document.getElementById("tempo").value = selfTempo;
		document.getElementById("MetronomeOutput").innerHTML = selfTempo;
		document.getElementById("MetronomeOutputView").innerHTML = selfTempo;
		flamDuration();
		rollDuration();
	}  
}
function lessTempo() {
	var existingTempo = eval(document.getElementById('tempo').value);
	if (existingTempo > 61) {
		selfTempo = existingTempo - 1;
		localStorage.selfTempo = selfTempo;
		document.getElementById("tempo").value = selfTempo;
		document.getElementById("MetronomeOutput").innerHTML = selfTempo;
		document.getElementById("MetronomeOutputView").innerHTML = selfTempo;
		flamDuration();
		rollDuration();
	} 
}

function moreVolume() {
	var existing = eval(document.getElementById('masterVolume').value);
	if (existing < 100) {
		changeMasterVolume((existing + 1)/100);
		document.getElementById("masterVolume").value = (existing + 1);
	}  
}
function lessVolume() {
	var existing = eval(document.getElementById('masterVolume').value);
	if (existing > 0) {
		changeMasterVolume((existing - 1)/100);
		document.getElementById("masterVolume").value = (existing - 1);
	}
}

function switchView() {
	document.getElementById("glassesView").classList.remove('nodisplay');
	document.getElementById("configView").classList.add('nodisplay');
	localStorage.viewConfig= false;
	viewConfig= false;
}

function switchBackView() {
	document.getElementById("glassesView").classList.add('nodisplay');
	document.getElementById("configView").classList.remove('nodisplay');
	createSvgSpace();
	localStorage.viewConfig= true;
	viewConfig= true;
}
function switchSwingView() {
	document.getElementById("glassesView").classList.add('nodisplay');
	document.getElementById("configView").classList.add('nodisplay');
	document.getElementById("swingAcdordion").classList.remove('nodisplay');
}
function switchSwingBackView() {
	document.getElementById("swingAcdordion").classList.add('nodisplay');
	hideAdvanceSwing();
	if (viewConfig == false) {
		document.getElementById("glassesView").classList.remove('nodisplay');
		createSvgSpace();
	} else {
		document.getElementById("configView").classList.remove('nodisplay');
	}
	document.getElementById("swingAchart").innerHTML = "";
	document.getElementById("swingBchart").innerHTML = "";
	document.getElementById("swingCchart").innerHTML = "";
	document.getElementById("swingDchart").innerHTML = "";
}
function runAceView() {
	 $('#ace').trigger('click');
}

function playView() {
	 $('#play').trigger('click');
}

function lessVolumeView() {
	$('#subVolume').trigger('click');
}

function moreVolumeView() {
	$('#addVolume').trigger('click');
}

function lessTempoView() {
	$('#subTempo').trigger('click');
}

function moreTempoView() {
	$('#addTempo').trigger('click');
}

function generatePhrases(pattern) {
	var phrasesTable = phrases[pattern];
	var phrasesNumber = phrasesTable.numberOfPhrases;
	var phrasesPlace = document.getElementById("phrases");
	var phrasesPlace2 = document.getElementById("phrasesEdit");
	for (var i = 1 ; i < phrasesNumber + 1; i++) {
       	var phraseBtn = document.createElement('button');
		phraseBtn.textContent = i;
		phraseBtn.className += "phrasesBtn btn btn-warning btn-sm text-white noPointer";
		phraseBtn.setAttribute("pattern", pattern);
		phraseBtn.setAttribute("value", pattern + i);
		phraseBtn.setAttribute("title", "Phrase of the rhythm " + pattern);
		phraseBtn.setAttribute("onclick", "DLPPlay("+ i +")");
 		phrasesPlace.appendChild(phraseBtn); 		
   }
		for (var i = 1 ; i < phrasesNumber + 1; i++) {
       	var phraseBtn = document.createElement('button');
		phraseBtn.textContent = i;
		phraseBtn.className += "phrasesBtn btn btn-warning btn-sm text-white noPointer";
		phraseBtn.setAttribute("pattern", pattern);
		phraseBtn.setAttribute("value", pattern + i);
		phraseBtn.setAttribute("title", "Phrase of the rhythm " + pattern);
 		phrasesPlace2.appendChild(phraseBtn); 		
   }

	$$$$('.phrasesBtn').on('click', function () {
		var patternID = this.getAttribute("pattern");
		var valueID = this.getAttribute("value");
		userPhraseisSelected = -1;
		playThePhrase(patternID, valueID);
		DLphraseSellected = Number(this.innerText);
	});
};


function hideThePhrases() {
	$('.phrasesBtn').addClass('btn-warning');
	$('.phrasesBtn').addClass('noPointer');
	$('.phrasesBtn').removeClass('btn-success');
	$('.userPhrasesBtn').addClass('btn-warning');
	$('.userPhrasesBtn').removeClass('btn-success');
	$('.userPhrasesBtn2').addClass('btn-warning');
	$('.userPhrasesBtn2').removeClass('btn-success');
	$('.userPhrasesBtn2').addClass('noPointer');
};
function showThePhrases() {
	$('.phrasesBtn').removeClass('btn-warning');
	$('.phrasesBtn').removeClass('noPointer');
	$('.phrasesBtn').addClass('btn-success');
	$('.userPhrasesBtn').removeClass('btn-warning');
	$('.userPhrasesBtn').addClass('btn-success');
	$('.userPhrasesBtn2').removeClass('btn-warning');
	$('.userPhrasesBtn2').addClass('btn-success');
	$('.userPhrasesBtn2').removeClass('noPointer');
};

function unmuteMuteIcons() {
	var workingElement = document.getElementById("mute_icon_DjembeOneGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/Djembe1Green.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_DjembeTwoGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/Djembe2Green.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_DjembeThreeGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/Djembe3Green.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_DjembeSoloGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/DjembeSoloGreen.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_KenkeniGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/KenkeniGreen.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_Kenkeni_BellGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/Bell1Green.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_SangbanGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/SangbanGreen.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_Sangban_BellGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/Bell2Green.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_DoundounGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/DoundounGreen.svg");			
			workingElement.setAttribute("mute", false);
	};
	workingElement = document.getElementById("mute_icon_Doundoun_BellGlasses");
	if (workingElement.getAttribute("mute") == "true") {
			workingElement.setAttribute("src", "./img/Bell3Green.svg");			
			workingElement.setAttribute("mute", false);
	};
};

function signalSetUp() {
	var difference = selfSteps - bufferSteps;
	notesArray[9]= [];
	notesArray[9][0] = "DjembeSolo_"
	for (var j = 0 ; j < selfSteps; j++) {
		if (j > difference - 1 ) {
			var playNowNote = signalNotes[j - difference];
			notesArray[9][j+1] = playNowNote;
		} else {
			notesArray[9][j+1] = false;
		};			
		var getTheTab = 'L9C'+ j;
		var theTabElement = document.getElementById(getTheTab);
		if (playNowNote) {
				this.currentTime = 0;
				document.getElementById(getTheTab).classList.add('on');
				updateTheTab(theTabElement, playNowNote);
				};
	};	
	localStorage["notesArray"] = JSON.stringify(notesArray);
};

function SignalTime() {
	if (notesArray[9]) {
		signalNotes= [];
		for (var p = 0; p < selfSteps; p++) {
			signalNotes[p] = notesArray[9][p +1];
		}
		while (signalNotes[0] == false) {
		 signalNotes.shift();
		}
		bufferSteps = signalNotes.length;
	}
	if (looping) {
		playTheSignal();
		hideThePhrases();
		} else {
		startWithSignal();
	}
	hideTheSignal();
	captureSignal();	
};

function stopSequence() {
	window.clearTimeout(timerID);
	var barsNumber;
	if (selfSteps == 12 || selfSteps == 9 || selfSteps == 16) {
		barsNumber = 1;
	} else if (selfSteps == 24 || selfSteps == 32 || selfSteps == 18) {
		barsNumber = 2;
	} else if (selfSteps == 80 || selfSteps == 60) {
		barsNumber = 5;
	} else if ((selfSteps == 96 && groupMetronome == 4) || selfSteps == 72) {
		barsNumber = 6;
	} else if (selfSteps == 112 || selfSteps == 84) {
		barsNumber = 7;
	} else if (selfSteps == 128 || (selfSteps == 96 && groupMetronome == 3)) {
		barsNumber = 8;
	} else if (selfSteps == 64 || selfSteps3 == 4812 ) {
		barsNumber = 4;
	} else {
		barsNumber = 3;
	}
	buildUserPhrase(barsNumber);
	looping = false;
	self.beat = 0;
	userPhraseisSelected = 0;
	showTheSignal();
	hideTheAce();
	signalSteps = 0;
	currentNote = 0;
	aceIsOn = false;
	phraseIsOn = false;
	signalIsOn = false;
	signalIssetToGo = false;
	phraseNoteToPlay = 0;
	aceNoteToPlay = 0;
	phraseIssetToGo = false;
	aceIssetToGo = false;
	signalBeatNumber = 0;
	signalStart = false;
	hideThePhrases();
	editUserCall();
	var element = document.getElementById("stop");
	element.setAttribute("style", "display: none;");
	var element2 = document.getElementById("play");
	element2.setAttribute("style", "font-size: 300%");
	document.getElementById("playGlasses").classList.remove('noDisplay');
	document.getElementById("stopGlasses").classList.add('noDisplay');
	document.getElementById('selectTheCorrectNote').innerHTML = "";
	setTimeout(clean, 300);
	document.getElementById('SongTitle').innerHTML= localStorage.selectedName;
	document.getElementById('SongTitle').classList.remove('text-success');
};

function editUserCall() {
	userPhraseisSelected = 0;
	if (looping == false) {
		showTheCall();	
	};
};

function showTheCall() {
	var barsNumber;
	if (selfSteps == 12 || selfSteps == 9 || selfSteps == 16) {
		barsNumber = 1;
	} else if (selfSteps == 24 || selfSteps == 32 || selfSteps == 18) {
		barsNumber = 2;
	} else if (selfSteps == 80 || selfSteps == 60) {
		barsNumber = 5;
	} else if ((selfSteps == 96 && groupMetronome == 4) || selfSteps == 72) {
		barsNumber = 6;
	} else if (selfSteps == 112 || selfSteps == 84) {
		barsNumber = 7;
	} else if (selfSteps == 128 || (selfSteps == 96 && groupMetronome == 3)) {
		barsNumber = 8;
	} else if (selfSteps == 64 || selfSteps3 == 4812 ) {
		barsNumber = 4;
	} else {
		barsNumber = 3;
	}
	buildUserPhrase(barsNumber);
	var theSolo = document.getElementById("DjembeSolo");
	clearDjembeSolo(selfSteps);
		for (var j = 0 ; j < selfSteps; j++) {
			var playNowNote = notesArray[9][j+1];
			var getTheTab = 'L9C'+ j;
			var theTabElement = document.getElementById(getTheTab);
			if (playNowNote) {
				this.currentTime = 0;
				theTabElement.classList.add('on');
				updateTheTab(theTabElement, playNowNote);
				} 
			bindtheTab(j,9);
		};
		document.getElementById("DjembeSolo").classList.remove('noDisplay');
		document.getElementById("subtitleDjembeSolo").innerHTML= "Call";
		document.getElementById("subtitleDjembeSolo").classList.remove('noDisplay');
};

function addUserPhrase(x) {
	var phraseSteps;
if (selfSteps == 12 || selfSteps == 24 || selfSteps == 36 || selfSteps3 == 4812 || selfSteps == 60 || selfSteps == 72 || selfSteps == 84 || (selfSteps == 96 && groupMetronome == 3)) {
		phraseSteps = 12 * x;
	} else if (selfSteps == 16 || selfSteps == 32 || selfSteps == 48 || selfSteps == 64 || selfSteps == 80 || (selfSteps == 96 && groupMetronome == 4) || selfSteps == 112 || selfSteps == 128) {
		phraseSteps = 16 * x;
	} else if (selfSteps == 9 || selfSteps3 == 18 ) {
		phraseSteps = 9 *x;
	};
	var length = Object.size(notesArray);
	notesArray[length] = [];
	notesArray[length][0] = x;
	for (var p = 0; p < phraseSteps; p++) {
		notesArray[length][p +1] = false;
	}
	localStorage["notesArray"] = JSON.stringify(notesArray);	
	createUserButton(length);
	editUserPhrase(length - 9);
};

function createUserButton(length) {
	const phraseBtn = document.createElement('li');
	document.getElementById("userPhrases").appendChild(phraseBtn);
	phraseBtn.textContent = "U" + (length - 9);
	if (looping) {
		phraseBtn.className += " userPhrasesBtn btn btn-sm text-white btn-success pointer";
	} else {
		phraseBtn.className += " userPhrasesBtn btn btn-sm text-white btn-warning pointer";
	};
	phraseBtn.setAttribute("value", length - 9);
	var onclick = "editUserPhrase(" + (length - 9) + "), userPPlay(" + (length - 9) + ")";
	phraseBtn.setAttribute("onclick", onclick);
	phraseBtn.setAttribute("id", "userPhrase" + (length - 9));
	const phraseBtnGlasses = document.createElement('li');
	document.getElementById("userPhrasesGlasses").appendChild(phraseBtnGlasses);
	phraseBtnGlasses.textContent = "U" + (length - 9);
	if (looping) {
		phraseBtnGlasses.className += " userPhrasesBtn2 btn btn-sm text-white btn-success";
	} else {
		phraseBtnGlasses.className += " userPhrasesBtn2 btn btn-sm text-white btn-warning noPointer";
	};	
	phraseBtnGlasses.setAttribute("value", length - 9);
	var onclick = "editUserPhrase(" + (length - 9) + ")";
	phraseBtnGlasses.setAttribute("onclick", onclick);
	phraseBtnGlasses.setAttribute("id", "userPhraseGlasses" + (length - 9));
	var phraseSelected;
	$( "#userPhrases" ).sortable({
		start: function(e) {
			phraseSelected = e.originalEvent.target.value;
		},
		update: function() {
			if (looping) {
				$('#userPhrases').sortable("cancel")         ;               
			};
		},
		stop: function() {
			if (!looping) {
			rearrangeUserPhrases(phraseSelected);				
			} else {
				document.getElementById("toastBody").innerHTML = "You are not allowed to rearrange your rhythms when looping";
				$('#toast').toast('show');
			}
		}
	});
    $( "#userPhrases" ).disableSelection();
};

function rearrangeUserPhrases(phraseSelected) {
	var tempArray = [];
	tempArray = JSON.parse(localStorage["notesArray"]); 
	var length;
	length	= Object.size(notesArray);	
	var i = 1;
	$$$$('.userPhrasesBtn').each(function() {
		notesArray[i + 9] = tempArray[this.value + 9];
		i = i + 1;
	});
	localStorage["notesArray"] = JSON.stringify(notesArray);
	document.getElementById("userPhrases").innerHTML = "";
	userPhrasesButtons();
	editUserPhrase(phraseSelected);
};
function clearDjembeSolo(x) {
	for (var j = 0 ; j < x; j++) {
		var getTheTab = 'L9C'+ j;
		var theTabElement = document.getElementById(getTheTab);
		updateTheTab(theTabElement, "Empty");
		theTabElement.classList.remove('on');
	};	
	document.getElementById("subtitleDjembeSolo").innerHTML="";
}

function showUserPhrase(value) {
	document.getElementById("DjembeSolo").classList.remove('noDisplay');
	var phraseBars = notesArray[9 + value][0];
	buildUserPhrase(phraseBars);
	clearDjembeSolo(phraseStepsDoc);
	for (var j = 0 ; j < phraseStepsDoc; j++) {
		var playNowNote = notesArray[9 + value][j+1];
		var getTheTab = 'L9C'+ j;
		var theTabElement = document.getElementById(getTheTab);
		if (playNowNote) {
			this.currentTime = 0;
			theTabElement.classList.add('on');
			updateTheTab(theTabElement, playNowNote);
			} 
		bindtheTab(j,9);
	};	
	document.getElementById("subtitleDjembeSolo").innerHTML= "User Phrase " + value;
	document.getElementById("subtitleDjembeSolo").classList.remove('noDisplay');
};


function showPhrase(steps) {
	var phraseBars;
	if (selfSteps == 12 || selfSteps == 24 || selfSteps == 36 || selfSteps3 == 4812 || (selfSteps == 96 && groupMetronome == 3) || selfSteps == 60 || selfSteps == 72 || selfSteps == 84 ) {
		phraseBars = steps / 12;
	} else if (selfSteps == 16 || selfSteps == 32 || selfSteps == 48 || selfSteps == 64 || (selfSteps == 96 && groupMetronome == 4) || selfSteps == 80 || selfSteps == 112 || selfSteps == 128 ) {
		phraseBars = steps / 16;
	} else if (selfSteps == 9 || selfSteps3 == 18 ) {
		phraseBars = steps / 9;
	};	
	buildUserPhrase(phraseBars);
	clearDjembeSolo(steps);
	for (var j = 0 ; j < steps; j++) {
		var playNowNote = phraseBufferNotes[j + 2];
		var getTheTab = 'L9C'+ j;
		var theTabElement = document.getElementById(getTheTab);
		if (playNowNote) {
			this.currentTime = 0;
			theTabElement.classList.add('on');
			updateTheTab(theTabElement, playNowNote);
		};
	};	
	document.getElementById("subtitleDjembeSolo").innerHTML= "DL Phrase " + DLphraseSellected ;
	document.getElementById("subtitleDjembeSolo").classList.remove('noDisplay');

};

function editUserPhrase(value) {
	userPhraseisSelected = value;
	var phraseBars = notesArray[9 + value][0];
	var phraseSteps;
	if (selfSteps == 12 || selfSteps == 24 || selfSteps == 36 || selfSteps3 == 4812 || (selfSteps == 96 && groupMetronome == 3) || selfSteps == 60 || selfSteps == 72 || selfSteps == 84) {
		phraseSteps = 12 * phraseBars;
	} else if (selfSteps == 16 || selfSteps == 32 || selfSteps == 48 || selfSteps == 64 || (selfSteps == 96 && groupMetronome == 4) || selfSteps == 80 || selfSteps == 112 || selfSteps == 128 ) {
		phraseSteps = 16 * phraseBars;
	} else if (selfSteps == 9 || selfSteps3 == 18 ) {
		phraseSteps = 9 * phraseBars;
	};
	phraseStepsDoc = phraseSteps;
	if (looping == true) {
		playTheUserPhrase(value);
	} else {
		showUserPhrase(value);	
	};
};

function userPhrasesButtons() {
	var NAlength = notesArray.length;
	if (NAlength > 9) {
		for (var pm = 10; pm < NAlength; pm++) {
		createUserButton(pm);
		};
	};
	if (NAlength > 10) {
		document.getElementById('phrasesArrange').classList.remove('noDisplay');	
	} else {
		document.getElementById('phrasesArrange').classList.add('noDisplay');	
	};
};

function deleteUserPhrase() {
	var NAlength = notesArray.length;
	var deleteContainer = document.getElementById('deleteUserPhrase');
	var inner= "";
	if (looping) {
		deleteContainer.innerHTML= '<a href="javascript:void(0)" class="dropdown-item" >You can not delete during looping</a>';
	} else {
		if (NAlength > 10) {
			for (var pm = 10; pm < NAlength; pm++) {
			inner +='<a href="javascript:void(0)" class="dropdown-item pointer" onclick="deleteTheUserPhrase(' + pm + ')">Delete phrase ' + (pm - 9) +'</a>';
			};
			deleteContainer.innerHTML= inner;
		} else {
			deleteContainer.innerHTML= '<a href="javascript:void(0)" class="dropdown-item" >You have no phrases to delete</a>';
		};
	};
};

function deleteTheUserPhrase(value) {
	if (looping == false) {
		var elemenent = document.getElementById("userPhrases");
		var elemenent2 = document.getElementById("userPhrasesGlasses");
		elemenent.removeChild(elemenent.lastChild);
		elemenent2.removeChild(elemenent2.lastChild);
		notesArray.splice(value, 1);
		localStorage["notesArray"] = JSON.stringify(notesArray);
		if (value > 10) {
			editUserPhrase(value - 10);
		} else {
			editUserCall();
		};
	};
};

function playTheUserPhrase(value) {
	var copyArray = JSON.parse(localStorage["notesArray"]);
	phraseBufferNotes = copyArray[value + 9];
	phraseBufferNotes[0] = "User phrase #" + value;
	phraseBufferNotes = [phraseStepsDoc].concat(phraseBufferNotes);
	phraseIssetToGo = true;
	aceIssetToGo = false;
	signalIssetToGo = false;
	hideTheAce();
	hideTheSignal();
}
			
			
function buildUserPhrase(x) {
	var primalSteps;
	var primalSteps3 = 0;
	if (selfSteps == 24 || selfSteps == 12 || selfSteps == 36 || selfSteps3 == 4812 || selfSteps == 60 || selfSteps == 72 || selfSteps == 84 || (selfSteps == 96 && groupMetronome == 3)) {
		primalSteps = 12 * x;
		if (primalSteps == 48) {
			primalSteps3 = 4812;
		};
	} else if (selfSteps == 16 || selfSteps == 32 || selfSteps == 48 || selfSteps == 64 || selfSteps == 80 || selfSteps == 128 || selfSteps == 112 || (selfSteps == 96 && groupMetronome == 4)) {
		primalSteps = 16 * x;
	} else if (x == 4){
		primalSteps = 9 * x;
		primalSteps3 = 369;
	} else {
		primalSteps = 9 * x;
	};
	var innerSec = '';
	var that = "DjembeSolo";
	var DS = document.getElementById(that);
	var thisColumn = DS.getAttribute("line");
	var thisColumntoUse = eval(thisColumn);
	DS.innerHTML = "";
	innerSec += '<div class="titleWidth text-secondary" id="title' + DS.title + '" title="' + DS.title + '" ><img id="mute_icon_' + DS.id + '" mute="false" src="./img/' + DS.title + 'Green.svg" alt="africa" class="instrument-icons pointer instruments-sequencer" onclick="Mute(' + that + ', mute_icon_' + DS.id + '), clearSolo()"></div>';
	if (primalSteps == 24 || primalSteps == 32 || primalSteps == 18) {
		innerSec += '<div class="doublebus">';
		innerSec += '<div class="doublebuschild">';
		for (var i = 0; i < primalSteps/2 ; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas fa-minus drum-machine"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = primalSteps/2; i < primalSteps; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
	} else if ((primalSteps == 48 && primalSteps3 !== 4812 ) || (primalSteps == 36 && primalSteps3 !== 369) || primalSteps == 27) {
		innerSec += '<div class="doublebus">';
		innerSec += '<div class="doublebuschild">';
		for (var i = 0; i < primalSteps/3 ; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = primalSteps/3; i < (2 * primalSteps)/3; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = (2 * primalSteps)/3; i < primalSteps; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
	} else if (primalSteps ==  64 || primalSteps == 48 || primalSteps == 36) {
		var selfSteps2 = primalSteps;
		innerSec += '<div class="doublebus">';
		innerSec += '<div class="doublebuschild">';
		for (var i = 0; i < selfSteps2/4 ; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = selfSteps2/4; i < selfSteps2/2; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = selfSteps2/2; i < 3 * (selfSteps2)/4; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 3 * (selfSteps2)/4; i < selfSteps2; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
	} else if (primalSteps ==  80 || primalSteps == 60) {
		var selfSteps2 = primalSteps;
		innerSec += '<div class="doublebus">';
		innerSec += '<div class="doublebuschild">';
		for (var i = 0; i < selfSteps2/5 ; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = selfSteps2/5; i < 2 * selfSteps2/5; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 2 * selfSteps2/5; i < 3 * (selfSteps2)/5; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 3 * (selfSteps2)/5; i <  4 * selfSteps2/5; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 4 * (selfSteps2)/5; i <  selfSteps2; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
	}	else if ((primalSteps ==  96 && groupMetronome == 4) || primalSteps == 72) {
		var selfSteps2 = primalSteps;
		innerSec += '<div class="doublebus">';
		innerSec += '<div class="doublebuschild">';
		for (var i = 0; i < selfSteps2/6 ; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = selfSteps2/6; i < 2 * selfSteps2/6; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 2 * selfSteps2/6; i < 3 * (selfSteps2)/6; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 3 * (selfSteps2)/6; i <  4 * selfSteps2/6; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 4 * (selfSteps2)/6; i <  5 * selfSteps2/6; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 5 * (selfSteps2)/6; i <  selfSteps2; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
	} else if (primalSteps ==  112 || primalSteps == 84) {
		var selfSteps2 = primalSteps;
		innerSec += '<div class="doublebus">';
		innerSec += '<div class="doublebuschild">';
		for (var i = 0; i < selfSteps2/7 ; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = selfSteps2/7; i < 2 * selfSteps2/7; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 2 * selfSteps2/7; i < 3 * (selfSteps2)/7; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 3 * (selfSteps2)/7; i <  4 * selfSteps2/7; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 4 * (selfSteps2)/7; i <  5 * selfSteps2/7; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 5 * (selfSteps2)/7; i <  6 * selfSteps2/7; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 6 * (selfSteps2)/7; i <  selfSteps2; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
	} else if (primalSteps ==  128 || (primalSteps ==  96 && groupMetronome == 3)) {
		var selfSteps2 = primalSteps;
		innerSec += '<div class="doublebus">';
		innerSec += '<div class="doublebuschild">';
		for (var i = 0; i < selfSteps2/8 ; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = selfSteps2/8; i < 2 * selfSteps2/8; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 2 * selfSteps2/8; i < 3 * (selfSteps2)/8; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 3 * (selfSteps2)/8; i <  4 * selfSteps2/8; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 4 * (selfSteps2)/8; i <  5 * selfSteps2/8; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 5 * (selfSteps2)/8; i <  6 * selfSteps2/8; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 6 * (selfSteps2)/8; i < 7 * selfSteps2/8; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
		innerSec += '<div class="doublebuschild">';
		for (var i = 7 * (selfSteps2)/8; i < selfSteps2; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
		}				
		innerSec += '</div>';
	} else {
		innerSec += '<div style="display:inline-block; border-right: 1px solid lightgrey;">';
		for (var i = 0; i < primalSteps; i++) {
			if (Number.isInteger(i/groupMetronome)) {
			innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart singlebeat col' + i + ' " title="' + DS.id + '">';
			}
			else {
			innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest singlebeat col' + i + ' " title="' + DS.id + '">';
			}
			if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
			} else {
				innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
			}
			
		}
	}
	innerSec += '</div>';
	DS.innerHTML = innerSec;
	const soloTitle = document.createElement('p');
	document.getElementById("titleDjembeSolo").appendChild(soloTitle);
	soloTitle.className += " text-secondary soloTitle";
	soloTitle.setAttribute("id", "subtitleDjembeSolo");	
};
		
function updatedVolGlasses() {
	document.getElementById("MetronomeOutputView").innerHTML = tempo.value;
}	

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function rollDuration() {
	const secondsPerBeat = 60.0 / selfTempo / groupMetronome;
	rollDelay2 = secondsPerBeat / 2;	
	var swingAll = [swingA, swingB, swingC, swingD];
	swingAlt = [];
	for (var k = 0; k < 4; k++) {
		if (swingAll[k] == 0) {
			swingAlt[k] = 0;
		} else if (Number(selfTempo) < referenceTempo + 1) {
			swingAlt[k] = Number(swingAll[k]);
		} else {
			var c;
			if (swingAll[k] > 0) {
				c = -1;
			} else {
				c = 1
			};
			var a = (swingFactor * c) / (250);
			var b = swingAll[k] - a * referenceTempo;
			swingAlt[k] = a * Number(selfTempo) + b;
			if (swingAlt[k] < 0 == swingAll[k] > 0) {
				swingAlt[k] = 0;
			}
		};
	}

	noteSwingValues[0] = secondsPerBeat * (swingAlt[0] / 100);
	noteSwingValues[1] = secondsPerBeat * (swingAlt[1] / 100);
	noteSwingValues[2] = secondsPerBeat * (swingAlt[2] / 100);
	noteSwingValues[3] = secondsPerBeat * (swingAlt[3] / 100);

	noteRollValues[0] = (secondsPerBeat + noteSwingValues[1] - noteSwingValues[0])/2;
	noteRollValues[1] = (secondsPerBeat + noteSwingValues[2] - noteSwingValues[1])/2;
	noteRollValues[2] = (secondsPerBeat + noteSwingValues[3] - noteSwingValues[2])/2;
	noteRollValues[3] = (secondsPerBeat + noteSwingValues[0] - noteSwingValues[3])/2;

	noteTripleValues[0] = ( (2 * secondsPerBeat) + noteSwingValues[2] - noteSwingValues[0])/3;
	noteTripleValues[1] = ((2 * secondsPerBeat) + noteSwingValues[3] - noteSwingValues[1])/3;
	noteTripleValues[2] = ((2 * secondsPerBeat) + noteSwingValues[0] - noteSwingValues[2])/3;
	noteTripleValues[3] = ((2 * secondsPerBeat) + noteSwingValues[1] - noteSwingValues[3])/3;
}

function drawChart() {
	var swingFactorCalc = swingFactor / 250;
	var valuesSwing2 = [Number(swingA),Number(swingB), Number(swingC), Number(swingD)];	
	var valuesSwing = [Math.abs(Number(swingA)), Math.abs(Number(swingB)), Math.abs(Number(swingC)), Math.abs(Number(swingD))];	
	var b = [valuesSwing[0] + (swingFactorCalc * referenceTempo), valuesSwing[1] + (swingFactorCalc * referenceTempo), valuesSwing[2] + (swingFactorCalc * referenceTempo), valuesSwing[3] + (swingFactorCalc * referenceTempo)]
	var swingTable = ['RPM', 'Swing A', 'Swing B', 'Swing C', 'Swing D'];
		dataTableA = new google.visualization.DataTable();		
		dataTableB = new google.visualization.DataTable();		
		dataTableC = new google.visualization.DataTable();		
		dataTableD = new google.visualization.DataTable();		
		dataTableA.addColumn('number', 'RPM');      
		dataTableB.addColumn('number', 'RPM');      
		dataTableC.addColumn('number', 'RPM');      
		dataTableD.addColumn('number', 'RPM');      
		dataTableA.addColumn('number', 'Swing A');      
		dataTableB.addColumn('number', 'Swing B');      
		dataTableC.addColumn('number', 'Swing C');      
		dataTableD.addColumn('number', 'Swing D');      
        for (var i = 60; i < 221; i++) {
			if (i < referenceTempo + 1) {
				dataTableA.addRow([i, Number(swingA)]);            	
				dataTableB.addRow([i, Number(swingB)]);            	
				dataTableC.addRow([i, Number(swingC)]);            	
				dataTableD.addRow([i, Number(swingD)]);            	
			} else {
				var interim = [];
				for (var k = 0; k < 4; k++) {
					if (valuesSwing[k] == 0 || ((valuesSwing[k] < 0) == (b[k] - (swingFactorCalc * i ) > 0))  )  {
						interim[k] = 0;
					} else {
						if (valuesSwing2[k] > 0) {
							interim[k] = b[k] - (swingFactorCalc * i );	
						} else {
							interim[k] = (b[k] - (swingFactorCalc * i )) * -1;
						}
					}
				}
				dataTableA.addRow([i, interim[0]]);            	
				dataTableB.addRow([i, interim[1]]);            	
				dataTableC.addRow([i, interim[2]]);            	
				dataTableD.addRow([i, interim[3]]);            	
			}
		}
        var optionsA = {
          title: 'Swing A',
          curveType: 'function',
		  colors: ['green'],
			titleTextStyle: {
				color: 'green',  
				fontName: "Barriecito-Regular", 
				fontSize: 20, 
			},
			lineWidth:4,
		  hAxis: {title: 'BPM', titleTextStyle: {color: 'orange'}},
         legend: { position: 'top' }
        };
         var optionsB = {
          title: 'Swing B',
          curveType: 'function',
		  colors: ['blue'],
			titleTextStyle: {
				color: 'blue',  
				fontName: "Barriecito-Regular", 
				fontSize: 20, 
			},
			lineWidth:4,
		  lineWidth:4,
		  hAxis: {title: 'BPM', titleTextStyle: {color: 'Orange'}},
         legend: { position: 'top' }
        };
        var optionsC = {
          title: 'Swing C',
          curveType: 'function',
		  colors: ['red'],
			titleTextStyle: {
				color: 'red',  
				fontName: "Barriecito-Regular", 
				fontSize: 20, 
			},
			lineWidth:4,
		  lineWidth:4,
		  hAxis: {title: 'BPM', titleTextStyle: {color: 'orange'}},
         legend: { position: 'top' }
        };
        var optionsD = {
          title: 'Swing D',
          curveType: 'function',
			titleTextStyle: {
				color: 'orange',  
				fontName: "Barriecito-Regular", 
				fontSize: 20, 
			},
			lineWidth:4,
		  lineWidth:4,
		  colors: ['orange'],
		  hAxis: {title: 'BPM', titleTextStyle: {color: 'orange'}},
         legend: { position: 'top' }
        };
		var chartA = new google.visualization.LineChart(document.getElementById('swingAchart'));
        var chartB = new google.visualization.LineChart(document.getElementById('swingBchart'));
        var chartC = new google.visualization.LineChart(document.getElementById('swingCchart'));
        var chartD = new google.visualization.LineChart(document.getElementById('swingDchart'));
        chartA.draw(dataTableA, optionsA);
		setTimeout(function(){ chartB.draw(dataTableB, optionsB); }, 400);        
		setTimeout(function(){ chartC.draw(dataTableC, optionsC); }, 800);        
 		setTimeout(function(){ chartD.draw(dataTableD, optionsD); }, 1200);        
}

function calculateAlteredSwing() {
	swingFactor = Number(swingFactorInput.value);
	referenceTempo = Number(tempoSwing.value);
	localStorage.referenceTempo= referenceTempo;
	localStorage.swingFactor= swingFactor;
	drawChart();
}

function updateAlteredSwing() {
	calculateAlteredSwing();
	rollDuration();
}

function enterInfoModal() {
	$("#enterInfoModal").load("https://www.djembeloops.com/infomodal.html");
}

function deleteInfoModal() {
	document.getElementById("enterInfoModal").innerHTML="";
}


function patternClick(value) {
	document.getElementById("SongTitle").innerHTML= value;
	
	stopSequence();
	unmuteMuteIcons();
	var signalPattern = patterns[value];
	signalNotes = signalPattern.matrixSignal;
	bufferSteps = signalPattern.stepsSignal;
	document.getElementById("phrases").innerHTML = "";
	document.getElementById("phrasesEdit").innerHTML = "";
	document.getElementById("userPhrases").innerHTML = "";
	document.getElementById("userPhrasesGlasses").innerHTML = "";
	selfPattern(value);
	var pattern = patterns[value];
	selfSteps3 = Number(pattern.steps);
	swingFactor = Number(pattern.swingFactor),
	selectedPattern = pattern.matrix;
	selfTempo = referenceTempo = pattern.tempo;
	localStorage.selectedPattern = pattern.matrix;
	localStorage.selfSteps3 = selfSteps3;
	localStorage.swingFactor = swingFactor;
	localStorage.referenceTempo = referenceTempo;
	captureRhythmSelection(pattern);
	document.getElementById("tempo").value = selfTempo;
	document.getElementById("MetronomeOutput").innerHTML = selfTempo;
	document.getElementById("MetronomeOutputView").innerHTML = selfTempo;
	document.getElementById("tempoSwing").value = referenceTempo;
	document.getElementById("MetronomeSwingOutput").innerHTML = referenceTempo;
	document.getElementById("swingFactorInput").value = swingFactor;
	document.getElementById("dynamicSwing").innerHTML = swingFactor;
	if (phrases[selectedPattern]) {
		generatePhrases(selectedPattern);
	};	
}


function selfPattern(value) {
	// get real map from pattern
	pattern = patterns[value];
	var selectedName2 = pattern.name;
	var rythmToPlay3 = pattern.matrix;
	if (pattern.info) {
		document.getElementById("SongSubTitle").innerHTML = pattern.info;
		document.getElementById("SongSubTitle").classList.remove('noDisplay');
	}  else {
		document.getElementById("SongSubTitle").innerHTML = "";
		document.getElementById("SongSubTitle").classList.add('noDisplay');
	};
	if (pattern.footer) {
		document.getElementById("footerInfo").innerHTML = pattern.footer;
	}  else {
		document.getElementById("footerInfo").innerHTML = "";
	};
	var rythmToPlayNow2 = eval(rythmToPlay3);
	notesArray = rythmToPlayNow2;
	localStorage["notesArray"] = JSON.stringify(rythmToPlayNow2);
	if (pattern.steps == 4812) {
		selfSteps = 48;
		selfSteps3 = 4812;
	} else {
		selfSteps = pattern.steps;
		selfSteps3 = selfSteps;			
	}
	swingA = pattern.swingA;
	swingB = pattern.swingB;
	swingC = pattern.swingC;
	swingD = pattern.swingD;
	document.getElementById("swing0tempo").value = swingA;
	document.getElementById("swing0Output").innerHTML = swingA;
	document.getElementById("swing1tempo").value = swingB;
	document.getElementById("swing1Output").innerHTML = swingB;
	document.getElementById("swing2tempo").value = swingC;
	document.getElementById("swing2Output").innerHTML = swingC;
	document.getElementById("swing3tempo").value = swingD;
	document.getElementById("swing3Output").innerHTML = swingD;		
	localStorage.swingA = swingA;
	localStorage.swingB = swingB;
	localStorage.swingC = swingC;
	localStorage.swingD = swingD;
	
	selfDraw();
	
	localStorage.selectedPattern = rythmToPlay3;
	localStorage.selectedName = selectedName2;
	document.getElementById("SongTitle").innerHTML = selectedName2;
	localStorage["notesArray"] = JSON.stringify(rythmToPlayNow2);
	notesArray = JSON.parse(localStorage["notesArray"]);

	for (var i = 0 ; i < 9; i++) {
		for (var j = 0 ; j < selfSteps; j++) {
		var playNowNote = notesArray[i][j + 1];
		var getTheTab = 'L'+ i +'C'+ j;
		var theTabElement = document.getElementById(getTheTab);
		if (playNowNote) {
				this.currentTime = 0;
				document.getElementById(getTheTab).classList.add('on');
				updateTheTab(theTabElement, playNowNote);
				};
		};
	};
	signalNotes = pattern.matrixSignal;
	bufferSteps = pattern.stepsSignal;
	signalSetUp();
	addEventListenersToTabs();
};


 function selfDraw() {
	DjembeOne_BassMuted = false;
	DjembeOne_OpenMuted = false;
	DjembeOne_SlapMuted = false;
	DjembeOne_MuteMuted = false;
	DjembeTwo_BassMuted = false;
	DjembeTwo_OpenMuted = false;
	DjembeTwo_SlapMuted = false;
	DjembeTwo_MuteMuted = false;
	DjembeThree_BassMuted = false;
	DjembeThree_OpenMuted = false;
	DjembeThree_SlapMuted = false;
	DjembeThree_MuteMuted = false;
	DjembeOne_BassLMuted = false;
	DjembeOne_OpenLMuted = false;
	DjembeOne_SlapLMuted = false;
	DjembeOne_MuteLMuted = false;
	DjembeTwo_BassLMuted = false;
	DjembeTwo_OpenLMuted = false;
	DjembeTwo_SlapLMuted = false;
	DjembeTwo_MuteLMuted = false;
	DjembeThree_BassLMuted = false;
	DjembeThree_OpenLMuted = false;
	DjembeThree_SlapLMuted = false;
	DjembeThree_MuteLMuted = false;
	DjembeSolo_BassLMuted = false;
	DjembeSolo_OpenLMuted = false;
	DjembeSolo_SlapLMuted = false;	
	DjembeSolo_MuteLMuted = false;	
	DjembeSolo_BassMuted = false;
	DjembeSolo_OpenMuted = false;
	DjembeSolo_SlapMuted = false;	
	DjembeSolo_MuteMuted = false;	
	Kenkeni_OpenMuted = false;
	Kenkeni_MuffledMuted = false;
	Kenkeni_Bell_OpenMuted = false;
	Kenkeni_Bell_MuffledMuted = false;
	Sangban_OpenMuted = false;
	Sangban_MuffledMuted = false;
	Sangban_Bell_OpenMuted = false;
	Sangban_Bell_MuffledMuted = false;
	Doundoun_OpenMuted = false;
	Doundoun_MuffledMuted = false;
	Doundoun_Bell_OpenMuted = false;
	Doundoun_Bell_MuffledMuted = false;
	ShekereMuted = false;
	ShekereBMuted = false;

    document.getElementById('selectTheCorrectNote').innerHTML = "";
		if ((selfSteps == 16 || selfSteps == 8 || selfSteps == 32 || selfSteps == 48 || selfSteps == 64 || selfSteps == 80 || selfSteps == 96 || selfSteps == 112 || selfSteps == 128) && selfSteps3 !== 4812) {
			groupMetronome = 4;
			document.getElementById("swingDchart").classList.remove("noDisplay");
			document.getElementById("forthSwingInput").classList.remove("noDisplay");
			document.getElementById("sixteenth").classList.remove("noDisplay");
			document.getElementById("eighth").classList.add("noDisplay");
		}
		else {
			groupMetronome = 3;
			document.getElementById("swingDchart").classList.add("noDisplay");
			document.getElementById("forthSwingInput").classList.add("noDisplay");
			document.getElementById("eighth").classList.remove("noDisplay");
			document.getElementById("sixteenth").classList.add("noDisplay");
		}
		selectedName = "Compose your rhythm";
		localStorage.selectedName = selectedName;
		if (selfSteps == 24) {
			notesArray = jQuery.extend(true, {}, startTable24);
		} else if (selfSteps3 == 4812) {
			notesArray = jQuery.extend(true, {}, startTable4812);
		} else if (selfSteps == 16) {
			notesArray = jQuery.extend(true, {}, startTable16);
		} else if (selfSteps == 8) {
			notesArray = jQuery.extend(true, {}, startTable8);
		} else if (selfSteps == 12) {
			notesArray = jQuery.extend(true, {}, startTable12);
		} else if (selfSteps == 9) {
			notesArray = jQuery.extend(true, {}, startTable9);
		} else if (selfSteps == 18) {
			notesArray = jQuery.extend(true, {}, startTable18);
		} else if (selfSteps == 48) {
			notesArray = jQuery.extend(true, {}, startTable48);
		} else if (selfSteps == 64) {
			notesArray = jQuery.extend(true, {}, startTable64);
		} else if (selfSteps == 36) {
			notesArray = jQuery.extend(true, {}, startTable36);
		} else if (selfSteps == 80) {
			notesArray = jQuery.extend(true, {}, startTable80);
		} else if (selfSteps == 96) {
			notesArray = jQuery.extend(true, {}, startTable96);
		} else if (selfSteps == 112) {
			notesArray = jQuery.extend(true, {}, startTable112);
		} else if (selfSteps == 128) {
			notesArray = jQuery.extend(true, {}, startTable128);
		} else {
			notesArray = jQuery.extend(true, {}, startTable32);
		}
		var innerSec5 = '';
		$$$$('sequencerNew').each(function () {
			var innerSec = '';
			var that = this.id;
            var thisColumn = this.getAttribute("line");
			var thisColumntoUse = eval(thisColumn);
            innerSec += '<div class="titleWidth text-secondary" id="title' + this.title + '" title="' + this.title + '" ><img id="mute_icon_' + this.id + '" mute="false" src="./img/' + this.title + 'Green.svg" alt="africa" class="instrument-icons pointer instruments-sequencer" onclick="Mute(' + that + ', mute_icon_' + this.id + ') , clearSolo()"></div>';
			if (selfSteps == 24 || selfSteps == 32 || selfSteps == 18) {
				innerSec += '<div class="doublebus">';
				innerSec += '<div class="doublebuschild">';
				for (var i = 0; i < selfSteps/2 ; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas fa-minus drum-machine"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps/2; i < selfSteps; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
			} else if ((selfSteps == 36 || selfSteps == 48) && selfSteps3 !== 4812) {
				innerSec += '<div class="doublebus">';
				innerSec += '<div class="doublebuschild">';
				for (var i = 0; i < selfSteps/3 ; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps/3; i < (2 * selfSteps)/3; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = (2 * selfSteps)/3; i < selfSteps; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
			} else if (selfSteps ==  64 || selfSteps3 == 4812 ) {
				var selfSteps2 = 64;
				if (selfSteps3 == 4812) {
					selfSteps2 = 48;
				};
				innerSec += '<div class="doublebus">';
				innerSec += '<div class="doublebuschild">';
				for (var i = 0; i < selfSteps2/4 ; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps2/4; i < selfSteps2/2; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps2/2; i < 3 * (selfSteps2)/4; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 3 * (selfSteps2)/4; i < selfSteps2; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
			} else if (selfSteps ==  80 || selfSteps == 60 ) {
				var selfSteps2 = selfSteps;
				innerSec += '<div class="doublebus">';
				innerSec += '<div class="doublebuschild">';
				for (var i = 0; i < selfSteps2/5 ; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps2/5; i < 2 * selfSteps2 / 5; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 2 * selfSteps2 / 5; i < 3 * selfSteps2/5; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 3 * selfSteps2/5; i < 4 * selfSteps2/5; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 4 * selfSteps2/5; i < selfSteps2; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
			} else if (selfSteps ==  96 || selfSteps == 72 ) {
				var selfSteps2 = selfSteps;
				innerSec += '<div class="doublebus">';
				innerSec += '<div class="doublebuschild">';
				for (var i = 0; i < selfSteps2/6 ; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps2/6; i < 2 * selfSteps2 / 6; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 2 * selfSteps2 / 6; i < 3 * selfSteps2/6; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 3 * selfSteps2/6; i < 4 * selfSteps2/6; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 4 * selfSteps2/6; i < 5 * selfSteps2/6; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
				innerSec += '<div class="doublebuschild">';
				for (var i = 5 * selfSteps2/6; i < selfSteps2; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
			} else if (selfSteps ==  112 || selfSteps == 84 ) {
				var selfSteps2 = selfSteps;
				innerSec += '<div class="doublebus">';
				innerSec += '<div class="doublebuschild">';
				for (var i = 0; i < selfSteps2/7 ; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps2/7; i < 2 * selfSteps2 / 7; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 2 * selfSteps2 / 7; i < 3 * selfSteps2/7; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 3 * selfSteps2/7; i < 4 * selfSteps2/7; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 4 * selfSteps2/7; i < 5 * selfSteps2/7; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
				innerSec += '<div class="doublebuschild">';
				for (var i = 5 * selfSteps2/7; i < 6 * selfSteps2/7; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
				innerSec += '<div class="doublebuschild">';
				for (var i = 6 * selfSteps2/7; i < selfSteps2; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
			} else if (selfSteps ==  128 ) {
				var selfSteps2 = 128;
				innerSec += '<div class="doublebus">';
				innerSec += '<div class="doublebuschild">';
				for (var i = 0; i < selfSteps2/8 ; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = selfSteps2/8; i < 2 * selfSteps2 /8; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 2 * selfSteps2 / 8; i < 3 * selfSteps2/8; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 3 * selfSteps2/8; i < 4 * selfSteps2/8; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';
				innerSec += '<div class="doublebuschild">';
				for (var i = 4 * selfSteps2/8; i < 5 * selfSteps2/8; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
				innerSec += '<div class="doublebuschild">';
				for (var i = 5 * selfSteps2/8; i < 6 * selfSteps2/8; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
				innerSec += '<div class="doublebuschild">';
				for (var i = 6 * selfSteps2/8; i < 7 * selfSteps2/8; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
				innerSec += '<div class="doublebuschild">';
				for (var i = 7 * selfSteps2/8; i < selfSteps2; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart doublebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest doublebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
				}				
				innerSec += '</div>';			
			}
			else {
				innerSec += '<div style="display:inline-block; border-right: 1px solid lightgrey;">';
				for (var i = 0; i < selfSteps; i++) {
					if (Number.isInteger(i/groupMetronome)) {
					innerSec += '<div class="tabcontainer" id="tabcontainer"><div class="colorediv" id="SpanL'+ thisColumntoUse +'C'+ i +'"></div><span class="spanstyle"><div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatStart singlebeat col' + i + ' " title="' + this.id + '">';
					}
					else {
					innerSec += '<div id="L'+ thisColumntoUse +'C'+ i +'" line="'+ thisColumntoUse +'" column="'+ i +'" class="pointer beatall beat beatRest singlebeat col' + i + ' " title="' + this.id + '">';
					}
					if (Number.isInteger((i+groupMetronome+1)/groupMetronome)) {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div></span></div>';
					} else {
						innerSec += '<i class="fas drum-machine fa-minus"></i></div>';
					}
					
				}
			}
			innerSec += '</div>';
			this.innerHTML = innerSec;
			innerSec5 += '<div>'
			innerSec5 += '<div class="titleWidth" style="margin-bottom:10px;" title="' + this.title + '"><img src="./img/' + this.title + 'Green.svg" id="mute_icon_' + this.id + 'Equ" alt="africa" class="instrument-iconsVolumes equalizer pointer" onclick="Mute(' + this.id + ', mute_icon_' + this.id + '), clearSolo()" mute="false"></div>'
			innerSec5 += '<div class="changeVol"><form oninput="changeVol(' + this.id + ',vol' + this.id + '.value/100)" style="display:inline-block;">';
			innerSec5 += '<input id="vol' + this.id + '" type="range" name="tempo" min="0" max="100" value="100" size="1" class="changeVolInput">';
			innerSec5 += '</form><button solo="false" id="solo' + this.id + '" type="button" class="btn btn-info btn-sm solo-button" style="margin-left:10px;" onclick="playSolo(' + this.id + ', mute_icon_' + this.id + ')">Solo</button></div></div>';
			
        });

			innerSec5 += '<div>'
			innerSec5 += '<div class="titleWidth pointer equalizer" title="Shekere" onclick="playShekere()"><img src="./img/shekereRed.png" id="shekereRedEqu" alt="africa" class="instrument-iconsVolumes pointer "><img src="./img/shekereGreen.png" alt="africa" id="shekereGreenEqu" class="instrument-iconsVolumes pointer nodisplay"></div>'
			innerSec5 += '<div class="changeVol"><form oninput="changeVol(Shekere,volShekere.value/100)" style="display:inline-block;">';
			innerSec5 += '<input id="volShekere" type="range" name="tempo" min="0" max="100" value="100" size="1" class="changeVolInput">';
			innerSec5 += '</form><button solo="false" id="soloShekere' + this.id + '" type="button" class="btn btn-info btn-sm solo-button" style="margin-left:10px; visibility: hidden; pointer:none;">Solo</button></div></div>';
			innerSec5 += '<h5 class="text-center text-white" style="margin-top:20px;">Select sound for Djembe Solo</h5>';
			innerSec5 += '<div class="btn-group btn-group-toggle" data-toggle="buttons">';
			innerSec5 += '<button class="btn btn-secondary btn-warning" onclick="soloA()"><input type="radio" name="options" autocomplete="off" >A</button>';
			innerSec5 += '<button class="btn btn-secondary btn-warning" onclick="soloB()"><input type="radio" name="options" autocomplete="off">B</button>';
			innerSec5 += '<button class="btn btn-secondary btn-warning" onclick="soloC()"><input type="radio" name="options" autocomplete="off" >C</button>';
			innerSec5 += '<button class="btn btn-secondary btn-warning active" onclick="soloD()"><input type="radio" name="options" autocomplete="off" checked>D</button>';
			innerSec5 += '<button class="btn btn-secondary btn-warning" onclick="soloE()"><input type="radio" name="options" autocomplete="off">E</button>';
			innerSec5 += '<button class="btn btn-secondary btn-warning" onclick="soloF()"><input type="radio" name="options" autocomplete="off" >F</button>';
			innerSec5 += '<button class="btn btn-secondary btn-warning" onclick="soloG()"><input type="radio" name="options" autocomplete="off">G</button></div>';
			document.getElementById("changeOrganVolumes").innerHTML = innerSec5;
			if (playTheShekere == true) {
				document.getElementById('shekereRedEqu').classList.add('nodisplay');
				document.getElementById('shekereGreenEqu').classList.remove ('nodisplay');
			}

			
		if (selfSteps3 == 4812) {
					selfSteps = 48;
		};
		
		$$$$('#beat').each(function () {
				var locationx;
		var locationy;
		let mousedownTime;
		if (j < 3 || j== 9 ) {
			this.addEventListener('mousedown', () => {
			mousedownTime = new Date().getTime();
			locationx = event.pageX;
			locationy = event.pageY;
		});
			this.addEventListener('touchstart', () => {
			mousedownTime = new Date().getTime();
			locationx = event.touches[0].clientX;
			locationy = event.touches[0].clientY;
		});
			this.addEventListener('mouseup', function () {
			  const mouseupTime = new Date().getTime();
					var timeDifference = mouseupTime - mousedownTime;
			  if (timeDifference < 300) {
				selectNoteForDjembe(this);
			  } else {
				selectFlamForTab(this,locationx,locationy);
			  }
			});
			this.addEventListener('touchend', function () {
			  const mouseupTime = new Date().getTime();
					var timeDifference = mouseupTime - mousedownTime;
			  if (timeDifference < 300) {
				selectNoteForDjembe(this);
			  } else {
				selectFlamForTab(this,locationx,locationy);
			  }
			});
		} else {
			this.addEventListener("click", selectNoteForTab);
		}
			
		});
		
		var barsNumber;
		if (selfSteps == 12 || selfSteps == 9 || selfSteps == 16) {
			barsNumber = 1;
		} else if (selfSteps == 24 || selfSteps == 32 || selfSteps == 18) {
			barsNumber = 2;
		} else if (selfSteps == 80 || selfSteps == 60) {
			barsNumber = 5;
		} else if (selfSteps == 96 || selfSteps == 72) {
			barsNumber = 6;
		} else if (selfSteps == 112 || selfSteps == 84) {
			barsNumber = 7;
		} else if (selfSteps == 128 || (selfSteps == 96 && groupMetronome == 3)) {
			barsNumber = 8;
		} else if (selfSteps == 64 || selfSteps3 == 4812 ) {
			barsNumber = 4;
		} else {
			barsNumber = 3;
		}
		buildUserPhrase(barsNumber);
		document.getElementById("subtitleDjembeSolo").innerHTML= "Call";
		createSvgSpace();
		rollDuration();	
		flamDuration();
		updateInstrumentVolumes();		
};

function hideAdvanceSwing(){
	$('#collapseSwing').collapse('hide');
}

function showTheBanner() {
	// admob.setDevMode(false);
	admob.banner.show({
    id: {
      // replace with your ad unit IDs
      android: 'ca-app-pub-2326666322070960/8513837463',
    }, position: 'bottom'
  });
	document.addEventListener('admob.banner.load', (e) => {
		console.log(`Successfully showing ads...`, e);
    });
    document.addEventListener('admob.banner.load_fail', (e) => {
		console.error(`Error showing ads...`, e);
    });
	document.addEventListener('admob.banner.open', () => {
		countTheAds();
	})
};

function soloA() {
	restoreSoloSounds();
	soloSound = 1;
	setupSample0(allTheSounds[29]);
	setupSample1(allTheSounds[30]);
	setupSample2(allTheSounds[31]);
	setupSample12(allTheSounds[32]);
	setupSample16(allTheSounds[33]);
	setupSample20(allTheSounds[34]);
	setupSample35(allTheSounds[41]);
	setupSample36(allTheSounds[42]);

	setupSample29(allTheSounds[0]);
	setupSample30(allTheSounds[1]);
	setupSample31(allTheSounds[2]);
	setupSample32(allTheSounds[12]);
	setupSample33(allTheSounds[16]);
	setupSample34(allTheSounds[20]);
	setupSample41(allTheSounds[35]);
	setupSample42(allTheSounds[36]);
	
};

function soloB() {
	restoreSoloSounds();
	soloSound = 2;
	setupSample3(allTheSounds[29]);
	setupSample4(allTheSounds[34]);
	setupSample5(allTheSounds[31]);
	setupSample21(allTheSounds[32]);
	setupSample22(allTheSounds[33]);
	setupSample23(allTheSounds[34]);
	setupSample37(allTheSounds[41]);
	setupSample38(allTheSounds[42]);

	setupSample29(allTheSounds[3]);
	setupSample30(allTheSounds[4]);
	setupSample31(allTheSounds[5]);
	setupSample32(allTheSounds[21]);
	setupSample33(allTheSounds[22]);
	setupSample34(allTheSounds[23]);
	setupSample41(allTheSounds[37]);
	setupSample42(allTheSounds[38]);
};

function soloC() {
	restoreSoloSounds();
	soloSound = 3;
	setupSample6(allTheSounds[29]);
	setupSample7(allTheSounds[34]);
	setupSample8(allTheSounds[31]);
	setupSample24(allTheSounds[32]);
	setupSample25(allTheSounds[33]);
	setupSample26(allTheSounds[34]);
	setupSample39(allTheSounds[41]);
	setupSample40(allTheSounds[42]);

	setupSample29(allTheSounds[6]);
	setupSample30(allTheSounds[7]);
	setupSample31(allTheSounds[8]);
	setupSample32(allTheSounds[24]);
	setupSample33(allTheSounds[25]);
	setupSample34(allTheSounds[26]);
	setupSample41(allTheSounds[39]);
	setupSample42(allTheSounds[40]);
};

function soloD() {
	restoreSoloSounds();
	soloSound = 4;
	setupSample29(allTheSounds[29]);
	setupSample30(allTheSounds[30]);
	setupSample31(allTheSounds[31]);
	setupSample32(allTheSounds[32]);
	setupSample33(allTheSounds[33]);
	setupSample34(allTheSounds[34]);
	setupSample41(allTheSounds[41]);
	setupSample42(allTheSounds[42]);		
};

function soloE() {
	restoreSoloSounds();
	setupSample29(allTheSounds[43]);
	setupSample30(allTheSounds[44]);
	setupSample31(allTheSounds[45]);
	setupSample32(allTheSounds[46]);
	setupSample33(allTheSounds[47]);
	setupSample34(allTheSounds[48]);
	setupSample41(allTheSounds[49]);
	setupSample42(allTheSounds[50]);
	soloSound = 5;
};

function soloF() {
	restoreSoloSounds();
	setupSample29(allTheSounds[51]);
	setupSample30(allTheSounds[52]);
	setupSample31(allTheSounds[53]);
	setupSample32(allTheSounds[54]);
	setupSample33(allTheSounds[55]);
	setupSample34(allTheSounds[56]);
	setupSample41(allTheSounds[57]);
	setupSample42(allTheSounds[58]);
	soloSound = 6;
};

function soloG() {
	restoreSoloSounds();
	setupSample29(allTheSounds[59]);
	setupSample30(allTheSounds[60]);
	setupSample31(allTheSounds[61]);
	setupSample32(allTheSounds[62]);
	setupSample33(allTheSounds[63]);
	setupSample34(allTheSounds[64]);
	setupSample41(allTheSounds[65]);
	setupSample42(allTheSounds[66]);
	soloSound = 7;
};

function restoreSoloSounds() {
	if (soloSound > 4) {
		return;
	} else if (soloSound == 1) {
		setupSample0(allTheSounds[0]);
		setupSample1(allTheSounds[1]);
		setupSample2(allTheSounds[2]);
		setupSample12(allTheSounds[12]);
		setupSample16(allTheSounds[16]);
		setupSample20(allTheSounds[20]);
		setupSample35(allTheSounds[35]);
		setupSample36(allTheSounds[36]);
	} else if (soloSound == 2) {
		setupSample3(allTheSounds[3]);
		setupSample4(allTheSounds[4]);
		setupSample5(allTheSounds[5]);
		setupSample21(allTheSounds[21]);
		setupSample22(allTheSounds[22]);
		setupSample23(allTheSounds[23]);
		setupSample37(allTheSounds[37]);
		setupSample38(allTheSounds[38]);
	} else if (soloSound == 3) {
		setupSample6(allTheSounds[6]);
		setupSample7(allTheSounds[7]);
		setupSample8(allTheSounds[8]);
		setupSample24(allTheSounds[24]);
		setupSample25(allTheSounds[25]);
		setupSample26(allTheSounds[26]);
		setupSample39(allTheSounds[39]);
		setupSample40(allTheSounds[40]);
	};
};

function shareDLRhythm() { 
	var url = new URL("https://www.djembeloops.com");
	url.searchParams.append('rhythm', selectedPattern);
	if (onCordova == true) {
		window.plugins.socialsharing.share('Please folow this link to get to a Rhythms from DjembeLoops. Import this file into your Djembe Loops app or go to https://www.djembeloops.com/', 'A rhythm to you from Djembe Loops', url.href);
	} else {
		var intermi = url.href;
		var result = copyToClipboard(intermi);
		console.log("copied?", result);
		$('#shareDLRhythm').tooltip('show');
		setTimeout(function(){ $('#shareDLRhythm').tooltip('hide');}, 3000);
	};
};

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

