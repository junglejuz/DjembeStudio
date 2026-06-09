import { RHYTHM_LIBRARY } from './library.js';

console.log('Total library rhythms:', RHYTHM_LIBRARY.length);

let errorsCount = 0;
const validTimings = ['4/4', '12/8', '6/8'];

RHYTHM_LIBRARY.forEach((rhythm, idx) => {
  const name = rhythm.rhythm_name || `Rhythm at index ${idx}`;
  
  if (!rhythm.rhythm_name) {
    console.error(`Error: Rhythm at index ${idx} is missing 'rhythm_name'`);
    errorsCount++;
  }
  
  if (!rhythm.timing) {
    console.error(`Error: Rhythm '${name}' is missing 'timing'`);
    errorsCount++;
  } else if (!validTimings.includes(rhythm.timing)) {
    console.error(`Error: Rhythm '${name}' has invalid timing '${rhythm.timing}'. Allowed: ${validTimings.join(', ')}`);
    errorsCount++;
  }
  
  if (!rhythm.tracks || !Array.isArray(rhythm.tracks)) {
    console.error(`Error: Rhythm '${name}' is missing 'tracks' array`);
    errorsCount++;
  } else {
    rhythm.tracks.forEach((track, tIdx) => {
      const part = track.part || `Track at index ${tIdx}`;
      if (!track.part) {
        console.error(`Error in rhythm '${name}': track at index ${tIdx} is missing 'part'`);
        errorsCount++;
      }
      if (typeof track.drum_pattern !== 'string') {
        console.error(`Error in rhythm '${name}': track '${part}' is missing 'drum_pattern' string`);
        errorsCount++;
      }
      
      if (track.variations) {
        if (!Array.isArray(track.variations)) {
          console.error(`Error in rhythm '${name}': track '${part}' 'variations' should be an array`);
          errorsCount++;
        } else {
          track.variations.forEach((v, vIdx) => {
            if (!v.name) {
              console.error(`Error in rhythm '${name}' track '${part}': variation at index ${vIdx} is missing 'name'`);
              errorsCount++;
            }
            const vPattern = v.drum_pattern || v.pattern;
            if (typeof vPattern !== 'string') {
              console.error(`Error in rhythm '${name}' track '${part}': variation '${v.name || vIdx}' is missing 'drum_pattern' or 'pattern'`);
              errorsCount++;
            }
          });
        }
      }
      
      if (track.solos) {
        if (!Array.isArray(track.solos)) {
          console.error(`Error in rhythm '${name}': track '${part}' 'solos' should be an array`);
          errorsCount++;
        } else {
          track.solos.forEach((s, sIdx) => {
            if (!s.name) {
              console.error(`Error in rhythm '${name}' track '${part}': solo at index ${sIdx} is missing 'name'`);
              errorsCount++;
            }
            const sPattern = s.drum_pattern || s.pattern || s.sequence;
            if (typeof sPattern !== 'string') {
              console.error(`Error in rhythm '${name}' track '${part}': solo '${s.name || sIdx}' is missing 'drum_pattern', 'pattern' or 'sequence'`);
              errorsCount++;
            }
          });
        }
      }

      if (track.specials) {
        if (!Array.isArray(track.specials)) {
          console.error(`Error in rhythm '${name}': track '${part}' 'specials' should be an array`);
          errorsCount++;
        } else {
          track.specials.forEach((sp, spIdx) => {
            if (!sp.name) {
              console.error(`Error in rhythm '${name}' track '${part}': special at index ${spIdx} is missing 'name'`);
              errorsCount++;
            }
            const spPattern = sp.drum_pattern || sp.pattern || sp.sequence;
            if (typeof spPattern !== 'string') {
              console.error(`Error in rhythm '${name}' track '${part}': special '${sp.name || spIdx}' is missing 'drum_pattern', 'pattern' or 'sequence'`);
              errorsCount++;
            }
          });
        }
      }
      
      if (track.echauffement) {
        const echPattern = track.echauffement.drum_pattern || track.echauffement.pattern;
        if (typeof echPattern !== 'string') {
          console.error(`Error in rhythm '${name}': track '${part}' echauffement is missing 'drum_pattern' or 'pattern'`);
          errorsCount++;
        }
      }
    });
  }
  
  if (rhythm.special_parts) {
    if (!Array.isArray(rhythm.special_parts)) {
      console.error(`Error: Rhythm '${name}' has invalid 'special_parts' (should be an array)`);
      errorsCount++;
    } else {
      rhythm.special_parts.forEach((sp, spIdx) => {
        const spName = sp.name || `Special part at index ${spIdx}`;
        if (!sp.type) {
          console.error(`Error in rhythm '${name}': special part '${spName}' is missing 'type'`);
          errorsCount++;
        }
        if (!sp.name) {
          console.error(`Error in rhythm '${name}': special part at index ${spIdx} is missing 'name'`);
          errorsCount++;
        }
        if (typeof sp.drum_pattern !== 'string') {
          console.error(`Error in rhythm '${name}': special part '${spName}' is missing 'drum_pattern'`);
          errorsCount++;
        }
      });
    }
  }
});

console.log(`Validation finished with ${errorsCount} errors.`);
if (errorsCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
