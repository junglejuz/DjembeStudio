const { RHYTHM_LIBRARY } = require('./library.js');

console.log('Total library rhythms:', RHYTHM_LIBRARY.length);

let errorsCount = 0;
const validTimings = ['4/4', '12/8', '6/8'];

RHYTHM_LIBRARY.forEach((rhythm, idx) => {
  const name = rhythm.rhythm_name || `Rhythm at index ${idx}`;
  
  if (!rhythm.rhythm_name) {
    console.error(`Error: Rhythm at index ${idx} is missing 'rhythm_name'`);
    errorsCount++;
  }
  
  const timing = rhythm.timing || rhythm.time_signature;
  if (!timing) {
    console.error(`Error: Rhythm '${name}' is missing 'timing' or 'time_signature'`);
    errorsCount++;
  } else if (!validTimings.includes(timing)) {
    console.error(`Error: Rhythm '${name}' has invalid timing '${timing}'. Allowed: ${validTimings.join(', ')}`);
    errorsCount++;
  }
  
  if (!rhythm.tracks) {
    console.error(`Error: Rhythm '${name}' is missing 'tracks'`);
    errorsCount++;
  } else if (Array.isArray(rhythm.tracks)) {
    // Old format
    if (rhythm.tracks.length > 0) {
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
  } else if (typeof rhythm.tracks === 'object') {
    // New format
    const trackKeys = Object.keys(rhythm.tracks);
    const validHierarchyKeys = [
      '1_djembe', '2_kenkeni', '3_kenkeni_bell', '4_sangban', 
      '5_sangban_bell', '6_dun_dun', '7_dun_dun_bell', '8_shekere'
    ];
    
    trackKeys.forEach(key => {
      if (!validHierarchyKeys.includes(key)) {
        console.error(`Error in rhythm '${name}': invalid tracks key '${key}'`);
        errorsCount++;
      }
      
      const val = rhythm.tracks[key];
      if (key === '1_djembe') {
        if (typeof val !== 'object' || Array.isArray(val)) {
          console.error(`Error in rhythm '${name}': '1_djembe' track must be an object of sub-keys`);
          errorsCount++;
        } else {
          Object.keys(val).forEach(subKey => {
            if (typeof val[subKey] !== 'string') {
              console.error(`Error in rhythm '${name}': '1_djembe' subkey '${subKey}' must be a sequence string`);
              errorsCount++;
            }
          });
        }
      } else {
        if (typeof val !== 'string') {
          console.error(`Error in rhythm '${name}': track '${key}' must be a sequence string`);
          errorsCount++;
        }
      }
    });
  } else {
    console.error(`Error: Rhythm '${name}' has invalid 'tracks' field type`);
    errorsCount++;
  }
  
  if (rhythm.special_parts) {
    if (!Array.isArray(rhythm.special_parts)) {
      console.error(`Error: Rhythm '${name}' has invalid 'special_parts' (should be an array)`);
      errorsCount++;
    } else {
      rhythm.special_parts.forEach((sp, spIdx) => {
        const spName = sp.name || sp.part_id || `Special part at index ${spIdx}`;
        if (!sp.type) {
          console.error(`Error in rhythm '${name}': special part '${spName}' is missing 'type'`);
          errorsCount++;
        }
        if (!sp.name && !sp.part_id) {
          console.error(`Error in rhythm '${name}': special part at index ${spIdx} is missing 'name' or 'part_id'`);
          errorsCount++;
        }
        const pattern = sp.drum_pattern || sp.sequence;
        if (typeof pattern !== 'string') {
          console.error(`Error in rhythm '${name}': special part '${spName}' is missing sequence/drum_pattern string`);
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
