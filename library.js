export const RHYTHM_LIBRARY = [
  {
    "rhythm_name": "Kadan",
    "description": "Kadan, a Malinke-rhythm from the Kankan, Kouroussa and Siguiri areas in Guinea, is one of the dunumba-rhythms. The dunumba-rhythms are traditionally only danced by men: 'The dance of the strong men'. The Kadan is a dance for the bilakoros (non-circumcized children). 'Kadan' (liana bracelet in Malinke) is both the name of these anklets and of the dance. The anklets clink against each other while the phrases of djembe, dundun, and sangban correspond to the steps.",
    "timing": "12/8",
    "tracks": [
      {
        "part": "Djembé 1",
        "drum_pattern": "S..TS...S..TS...S..TS...",
        "variations": []
      },
      {
        "part": "Djembé 2",
        "drum_pattern": "S..STTS.S..STTS.S..STTS.",
        "variations": []
      },
      {
        "part": "Djembé 3",
        "drum_pattern": "B..S..TS..S..TS..S..TS..",
        "variations": []
      },
      {
        "part": "Kenkeni",
        "drum_pattern": "OO......OO......OO......",
        "variations": []
      },
      {
        "part": "Kenkeni Bell",
        "drum_pattern": "XX.XX.XX.XX.XX.XX.XX.XX.",
        "variations": []
      },
      {
        "part": "Sangban",
        "drum_pattern": "O...C...C.......O...C...",
        "variations": [
          {
            "name": "Sangban variation 1",
            "drum_pattern": "O...O...O.......C.O.O.O."
          }
        ]
      },
      {
        "part": "Sangban Bell",
        "drum_pattern": "X.XXX.XXX.XXX.X.XX.XX.XX",
        "variations": [
          {
            "name": "Sangban variation 1",
            "drum_pattern": "X.XXX.XXX.XXX.X.XX.XX.XX"
          }
        ]
      },
      {
        "part": "Dun Dun",
        "drum_pattern": "OO..OO..OO..OO..OO..OO..",
        "variations": [
          {
            "name": "Dun Dun variation 1",
            "drum_pattern": "......OO.OO..O.........."
          }
        ],
        "echauffement": {
          "drum_pattern": "OO..OO..OO..OO..OO..OO.."
        }
      },
      {
        "part": "Dun Dun Bell",
        "drum_pattern": "X.XXX.XX.XXX.XX.XX.XX.X.",
        "variations": [
          {
            "name": "Dun Dun variation 1",
            "drum_pattern": "X.XXX.XX.XXX.XX.XX.XX.X."
          }
        ],
        "echauffement": {
          "drum_pattern": "XX.XX.XX.XX.XX.XX.XX.XX."
        }
      }
    ],
    "special_parts": [
      {
        "type": "Intro",
        "name": "Intro",
        "drum_pattern": "TTTT.TT.TT.SSSS.SSSS...."
      },
      {
        "type": "Call",
        "name": "Call",
        "drum_pattern": "SSTSSS.................."
      },
      {
        "type": "Break",
        "name": "Break 1",
        "drum_pattern": "TTTT.TT.TT.SSSS.SSSS...."
      },
      {
        "type": "Solo",
        "name": "Djembé solo frase 1",
        "drum_pattern": "TTSTTS.TTS.S.SSSS.TSS..."
      },
      {
        "type": "Solo",
        "name": "Djembé solo frase 2",
        "drum_pattern": "SSTSSBSSTSS.SSTSSBSS.S.."
      },
      {
        "type": "Solo",
        "name": "Solo Accompagnement",
        "drum_pattern": "SSSSSSSSSSSSSSSSSSSTS..."
      }
    ]
  },
  {
    "rhythm_name": "Balakulandyan / Söli lent",
    "time_signature": "4/4",
    "step_count": 16,
    "groove_modifiers": {
      "swing_factor": 35,
      "swing_offsets": [0, -5, 0, 5]
    },
    "tracks": {
      "1_djembe": {
        "djembe_1_json": "B . T T . . S . B . T T . . S .",
        "djembe_2_json": "S . . S S . T T S . . S S . T T",
        "djembe_1_pdf": "S . S S . . T T S . . . S S . T T",
        "djembe_2_pdf": "B . T T . S T T . . . B S . . S",
        "djembe_solo_acc_pdf": "S S . S S . T . S . T T S S . ."
      },
      "2_kenkeni": "O . . . O . . . O . . . O . . .",
      "3_kenkeni_bell": "X . X . X . X . X . X . X . X .",
      "4_sangban": "C . . . C . . . C . O . O . . .",
      "5_sangban_bell": "X . X . X . X . X . X . X . X .",
      "6_dun_dun": "O . . . . . O . O . . . . . O .",
      "7_dun_dun_bell": "X . X X . X X . X . X X . X X .",
      "8_shekere": "X . . . X . . . X . . . X . . ."
    },
    "echauffement": {
      "4_sangban": "O O . O O . . . O O . O . . . .",
      "5_sangban_bell": "X . X X X . X X . X . X X . X .",
      "6_dun_dun": "O . O O . O . . O O . O . O . O",
      "7_dun_dun_bell": "X . X X . X . . X X . X . X . X"
    },
    "special_parts": [
      { "part_id": "Call_PDF", "type": "Call", "sequence": "T . T T . T . . T T . T . . T .", "accompaniment_link": "Standard_Accompaniment" },
      { "part_id": "Sangban_Variation_1_PDF", "type": "Variation", "sequence": ". . O . . . . . O . . O . . . .", "accompaniment_link": "Standard_Accompaniment" },
      { "part_id": "Solo1", "type": "Solo", "sequence": ". . . rt rs S S S S S T S S T S S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo2", "type": "Solo", "sequence": "S S . rs rt S S T T S T T S T T S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo3", "type": "Solo", "sequence": "T . T . S . S . T . T . S . S .", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo4", "type": "Solo", "sequence": "rs rs rs rs rs rs rs rs T . fs . T T . S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo5", "type": "Solo", "sequence": "S . S . T T S T T S T T S T T S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo6", "type": "Solo", "sequence": "rs rs T T S . S . rs rs T T S . S .", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo7", "type": "Solo", "sequence": "S S . T ts . S S . T ts . S S . T", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo8", "type": "Solo", "sequence": "T T S S T T S S T T S S T T S S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo9", "type": "Solo", "sequence": "rs rs rs rs S . S . rs rs rs rs S . S .", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo10", "type": "Solo", "sequence": "S . T . S . T . S . T . S . T .", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo11", "type": "Solo", "sequence": "T T . . S S . . T T . . S S . .", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo12", "type": "Solo", "sequence": "rs T rs T rs T rs T S S S S S S S S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo13", "type": "Solo", "sequence": "S S S S T T T T S S S S T T T T", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo14", "type": "Solo", "sequence": "fs fs fs fs S S S S fs fs fs fs S S S S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo15", "type": "Solo", "sequence": "T T T T S S S S T T T T S S S S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo16", "type": "Solo", "sequence": "rs rs rs rs rt rt rt rt S S S S S S S S", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo17", "type": "Solo", "sequence": "S . S . S . S . T . T . T . T .", "accompaniment_link": "djembe_solo_acc_pdf" },
      { "part_id": "Solo18", "type": "Solo", "sequence": "ts ts ts ts S S S S ts ts ts ts S S S S", "accompaniment_link": "djembe_solo_acc_pdf" }
    ],
    "practice_section": {
      "exercises": "Missing Data"
    },
    "ui_elements": {
      "intro_button": "Missing Data",
      "call_button": "Call_PDF",
      "break_button": "Missing Data",
      "solo_button": [
        "Solo1",
        "Solo2",
        "Solo3",
        "Solo4",
        "Solo5",
        "Solo6",
        "Solo7",
        "Solo8",
        "Solo9",
        "Solo10",
        "Solo11",
        "Solo12",
        "Solo13",
        "Solo14",
        "Solo15",
        "Solo16",
        "Solo17",
        "Solo18"
      ],
      "variation_button": [
        "Sangban_Variation_1_PDF"
      ]
    }
  }
];