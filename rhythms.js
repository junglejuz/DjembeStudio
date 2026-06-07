export const RHYTHM_PRESETS = [
  {
    id: "kuku",
    name: "Kuku (4/4 - Harvest/Celebration)",
    timeSignature: "4/4",
    beats: 4,
    tempo: 110,
    swing: 0,
    tracks: {
      special_0: {
        name: "Call",
        subdivision: 6,
        steps: [
          "", "", "", "", "", "", "", "", "", "", "", "",
          "T", "T", "T", "T", "T", "", "T", "T", "", "T", "", ""
        ]
      },
      djembe_0: {
        name: "Djembe 1",
        subdivision: 4,
        steps: ["S", "", "S", "", "T", "T", "S", "", "B", "", "S", "", "T", "T", "S", ""]
      },
      djembe_1: {
        name: "Djembe 2",
        subdivision: 4,
        steps: ["T", "T", "S", "", "T", "T", "S", "", "T", "T", "S", "", "T", "T", "S", ""]
      },
      djembe_2: {
        name: "Djembe 3",
        subdivision: 4,
        steps: ["B", "", "", "", "S", "", "", "", "B", "", "", "", "S", "", "", ""]
      },
      kenkeni_drum: {
        name: "Kenkeni Drum",
        subdivision: 4,
        steps: ["O", "", "O", "", "O", "", "O", "", "O", "", "O", "", "O", "", "O", ""]
      },
      kenkeni_bell: {
        name: "Kenkeni Bell",
        subdivision: 4,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      },
      sangban_drum: {
        name: "Sangban Drum",
        subdivision: 4,
        steps: ["O", "", "", "O", "X", "", "O", "", "O", "", "", "O", "X", "", "O", ""]
      },
      sangban_bell: {
        name: "Sangban Bell",
        subdivision: 4,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      },
      dundunba_drum: {
        name: "Dundunba Drum",
        subdivision: 4,
        steps: ["", "", "", "O", "", "", "O", "", "", "", "", "O", "", "", "O", ""]
      },
      dundunba_bell: {
        name: "Dundunba Bell",
        subdivision: 4,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      }
    }
  },
  {
    id: "soli",
    name: "Soli (12/8 - Circumcision/Initiation)",
    timeSignature: "12/8",
    beats: 4,
    tempo: 125,
    swing: 0,
    tracks: {
      special_0: {
        name: "Call",
        subdivision: 6,
        steps: [
          "T", "T", "T", "T", "T", "", "T", "T", "", "T", "", ""
        ]
      },
      djembe_0: {
        name: "Djembe 1",
        subdivision: 3,
        steps: ["S", "T", "S", "B", "", "T", "S", "T", "S", "B", "", "T"]
      },
      djembe_1: {
        name: "Djembe 2",
        subdivision: 3,
        steps: ["T", "T", "S", "T", "T", "S", "T", "T", "S", "T", "T", "S"]
      },
      djembe_2: {
        name: "Djembe 3",
        subdivision: 3,
        steps: ["B", "", "S", "", "", "", "B", "", "S", "", "", ""]
      },
      kenkeni_drum: {
        name: "Kenkeni Drum",
        subdivision: 3,
        steps: ["O", "", "O", "O", "", "O", "O", "", "O", "O", "", "O"]
      },
      kenkeni_bell: {
        name: "Kenkeni Bell",
        subdivision: 3,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      },
      sangban_drum: {
        name: "Sangban Drum",
        subdivision: 3,
        steps: ["O", "", "X", "O", "", "O", "X", "", "O", "", "X", "O"]
      },
      sangban_bell: {
        name: "Sangban Bell",
        subdivision: 3,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      },
      dundunba_drum: {
        name: "Dundunba Drum",
        subdivision: 3,
        steps: ["", "", "O", "", "", "", "O", "", "", "", "", "O"]
      },
      dundunba_bell: {
        name: "Dundunba Bell",
        subdivision: 3,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      }
    }
  },
  {
    id: "yankadi",
    name: "Yankadi (6/8 - Seduction Dance)",
    timeSignature: "6/8",
    beats: 4,
    tempo: 90,
    swing: 0,
    tracks: {
      special_0: {
        name: "Call",
        subdivision: 6,
        steps: [
          "T", "", "", "T", "", "T", "", "", "T", "", "", "T",
          "T", "", "", "S", "", "S", "S", "", "", "", "", "",
          "", "", "", "", "", "", "", "", "", "", "", "",
          "", "", "", "", "", "", "", "", "", "", "", ""
        ]
      },
      djembe_0: {
        name: "Djembe 1",
        subdivision: 3,
        steps: ["T", "S", "M", "T", "S", "", "T", "S", "M", "T", "S", ""]
      },
      djembe_1: {
        name: "Djembe 2",
        subdivision: 3,
        steps: ["T", "", "S", "", "T", "", "T", "", "S", "", "T", ""]
      },
      djembe_2: {
        name: "Djembe 3",
        subdivision: 3,
        steps: ["B", "", "", "", "", "", "B", "", "", "", "", ""]
      },
      kenkeni_drum: {
        name: "Kenkeni Drum",
        subdivision: 3,
        steps: ["O", "", "O", "", "O", "", "O", "", "O", "", "O", ""]
      },
      kenkeni_bell: {
        name: "Kenkeni Bell",
        subdivision: 3,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      },
      sangban_drum: {
        name: "Sangban Drum",
        subdivision: 3,
        steps: ["O", "", "", "X", "", "O", "", "", "X", "", "O", ""]
      },
      sangban_bell: {
        name: "Sangban Bell",
        subdivision: 3,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      },
      dundunba_drum: {
        name: "Dundunba Drum",
        subdivision: 3,
        steps: ["", "", "O", "", "", "", "", "", "O", "", "", ""]
      },
      dundunba_bell: {
        name: "Dundunba Bell",
        subdivision: 3,
        steps: ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
      }
    }
  }
];

export const TIME_SIGNATURE_DEFAULTS = {
  "4/4": { beats: 4, subdivision: 4 },
  "6/8": { beats: 2, subdivision: 6 },
  "12/8": { beats: 2, subdivision: 6 }
};
