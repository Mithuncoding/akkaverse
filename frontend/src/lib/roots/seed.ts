import type { Person, RootsData } from "@/lib/roots/store";

/**
 * The maker's own family — seeded as the default Roots tree so the experience
 * opens full of life. Villages default to Lakkahalli (Sidlaghatta taluk,
 * Chikkaballapura district) unless noted; Bagepalli-side elders speak Telugu.
 *
 * Great-grandparents are intentionally omitted to keep the tree within the
 * four-generation model (grandparents → parents → self → next).
 */

const CBP = "Chikkaballapura";

const P = (p: Person): Person => p;

export function seedFamily(): RootsData {
  const people: Person[] = [
    /* ---- Generation 0 · grandparents ---- */
    P({
      id: "gf-dad",
      name: "Chikka Bachappa",
      relation: "grandparent",
      parentId: null,
      spouseId: "gm-dad",
      gen: 0,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Farmer",
      languages: "Kannada",
      birthYear: "1940",
      festival: "Ugadi",
      proverb: "ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು",
      memory:
        "Dad's father. He walked me through the ragi fields at dawn and taught me that the land remembers everyone who tends it.",
    }),
    P({
      id: "gm-dad",
      name: "Rathnamma",
      relation: "grandparent",
      parentId: null,
      spouseId: "gf-dad",
      gen: 0,
      village: "Hosur (Sidlaghatta)",
      district: CBP,
      occupation: "Homemaker",
      languages: "Kannada",
      birthYear: "1946",
      festival: "Sankranti",
      memory:
        "Dad's mother, from Hosur. Her hands always smelled of jasmine and filter coffee, and no one ever left her doorstep hungry.",
    }),
    P({
      id: "gf-mom",
      name: "Baiyappa",
      relation: "grandparent",
      parentId: null,
      spouseId: "gm-mom",
      gen: 0,
      village: "Kothur (Bagepalli)",
      district: CBP,
      occupation: "Farmer",
      languages: "Telugu",
      birthYear: "1938",
      festival: "Ugadi",
      memory:
        "Mom's father, from Kothur. He told Telugu folk tales on the mud veranda until the oil lamp ran dry.",
    }),
    P({
      id: "gm-mom",
      name: "Ashwathamma",
      relation: "grandparent",
      parentId: null,
      spouseId: "gf-mom",
      gen: 0,
      village: "Guraldinne (Bagepalli)",
      district: CBP,
      occupation: "Homemaker",
      languages: "Telugu",
      birthYear: "1948",
      memory:
        "Mom's mother, from Guraldinne. She sang Telugu lullabies that still play in my head when I can't sleep.",
    }),

    /* ---- Generation 1 · parents, aunts, uncles & their spouses ---- */
    P({
      id: "muniyamma",
      name: "Muniyamma",
      relation: "relative",
      parentId: "gf-dad",
      spouseId: "krishnappa",
      gen: 1,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Homemaker",
      languages: "Kannada",
      birthYear: "1966",
      memory:
        "Dad's eldest sister — the one who kept every family secret and every family recipe safe.",
    }),
    P({
      id: "krishnappa",
      name: "Krishnappa",
      relation: "relative",
      parentId: null,
      spouseId: "muniyamma",
      gen: 1,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Farmer",
      languages: "Kannada",
      birthYear: "1963",
      memory: "Muniyamma's husband — he laughed louder than the Dasara drums.",
    }),
    P({
      id: "narayanamma",
      name: "Narayanamma",
      relation: "relative",
      parentId: "gf-dad",
      spouseId: "yerapareddy",
      gen: 1,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Homemaker",
      languages: "Kannada",
      birthYear: "1969",
      memory:
        "Dad's elder sister — she remembered every birthday in the family long before any calendar did.",
    }),
    P({
      id: "yerapareddy",
      name: "Yerapareddy",
      relation: "relative",
      parentId: null,
      spouseId: "narayanamma",
      gen: 1,
      village: "Bagepalli",
      district: CBP,
      occupation: "Farmer",
      languages: "Telugu",
      birthYear: "1966",
      memory:
        "Narayanamma's husband, from Bagepalli — he brought Telugu songs into our Kannada evenings.",
    }),
    P({
      id: "venkatesh",
      name: "Venkatesh",
      relation: "relative",
      parentId: "gf-dad",
      spouseId: "manjula",
      gen: 1,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Farmer",
      languages: "Kannada",
      birthYear: "1972",
      festival: "Ugadi",
      memory:
        "Dad's elder brother — he taught us that a joint family is only as strong as the eldest brother's patience.",
    }),
    P({
      id: "manjula",
      name: "Manjula",
      relation: "relative",
      parentId: null,
      spouseId: "venkatesh",
      gen: 1,
      village: "Bagepalli",
      district: CBP,
      occupation: "Homemaker",
      languages: "Telugu",
      birthYear: "1975",
      memory:
        "Venkatesh's wife — daughter of Narayanamma and Yerapareddy. Cousins who grew up close and became life partners.",
    }),
    P({
      id: "rajanna",
      name: "Rajanna CB",
      relation: "parent",
      parentId: "gf-dad",
      spouseId: "varalakshmi",
      gen: 1,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Agriculturist",
      languages: "Kannada",
      birthYear: "1976",
      festival: "Ugadi",
      proverb: "ಆರಂಭ ಶೂರತ್ವ ಬೇಡ, ಸತತ ಪ್ರಯತ್ನ ಬೇಕು",
      memory:
        "My father. He carried the whole family on quiet shoulders and never once let us see him tired.",
    }),
    P({
      id: "varalakshmi",
      name: "Varalakshmi",
      relation: "parent",
      parentId: "gf-mom",
      spouseId: "rajanna",
      gen: 1,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Homemaker",
      languages: "Telugu, Kannada",
      birthYear: "1980",
      festival: "Varamahalakshmi",
      memory:
        "My mother, from the Bagepalli side. She turned two languages and one small kitchen into a home full of festivals.",
    }),
    P({
      id: "anand",
      name: "Anand Kumar",
      relation: "relative",
      parentId: "gf-dad",
      spouseId: "maala",
      gen: 1,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Businessman",
      languages: "Kannada",
      birthYear: "1979",
      memory:
        "Dad's younger brother — the youngest uncle, and forever the family's favourite troublemaker.",
    }),
    P({
      id: "maala",
      name: "Maala",
      relation: "relative",
      parentId: null,
      spouseId: "anand",
      gen: 1,
      village: "Sarjapur",
      district: "Bengaluru Urban",
      occupation: "Homemaker",
      languages: "Kannada",
      birthYear: "1982",
      memory:
        "Anand Kumar's wife, from Sarjapur — she made Lakkahalli her own within a single Ugadi.",
    }),

    /* ---- Generation 2 · me & my cousins ---- */
    P({
      id: "mithun",
      name: "Mithun R",
      relation: "self",
      parentId: "rajanna",
      gen: 2,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Engineer",
      languages: "Kannada, English",
      birthYear: "2004",
      festival: "Ugadi",
      memory:
        "I left the village to study — and built Akkaverse so that none of these voices are ever lost.",
    }),
    P({
      id: "vinutha",
      name: "Vinutha",
      relation: "relative",
      parentId: "venkatesh",
      gen: 2,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Student",
      languages: "Kannada",
      birthYear: "2005",
      memory:
        "Venkatesh's elder daughter — born under the same Lakkahalli sky, the first of the next generation.",
    }),
    P({
      id: "nischitha",
      name: "Nischitha",
      relation: "relative",
      parentId: "venkatesh",
      gen: 2,
      village: "Lakkahalli",
      district: CBP,
      occupation: "Student",
      languages: "Kannada",
      birthYear: "2008",
      memory:
        "Venkatesh's younger daughter — the little one whose laughter fills the old house now.",
    }),
  ];

  return {
    version: 1,
    people,
    legacy: [
      {
        id: "seed-legacy-1",
        kind: "recipe",
        title: "Ajji's Ragi Mudde",
        body: "Boil water with a pinch of salt, rain in ragi flour while stirring, and work it into a smooth, warm ball. Eaten with soppu saaru — the taste of home.",
        from: "Rathnamma",
        createdAt: Date.now(),
      },
      {
        id: "seed-legacy-2",
        kind: "proverb",
        title: "The elders' words",
        body: "ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು — if your hands get muddy, your mouth gets curds. Honest work always feeds you.",
        from: "Chikka Bachappa",
        createdAt: Date.now() - 1,
      },
    ],
    createdAt: Date.now(),
  };
}
