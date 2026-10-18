// Site content, from protein-explorer-website-content.md.
// Descriptions use *asterisks* for italic species names.

export type Category = {
  id: string; // also the section anchor, e.g. /#energy-light
  name: string;
  blurb: string;
};

export type Protein = {
  slug: string;
  name: string;
  categoryId: string;
  organism: string;
  pdbId: string;
  description: string[];
  video: string;
  model: string;
};

// Shared placeholders until each protein's own files are ready.
const PLACEHOLDER_VIDEO = "/videos/placeholder.mp4";
const PLACEHOLDER_MODEL = "/models/hemoglobin.glb";

export const categories: Category[] = [
  {
    id: "energy-light",
    name: "Energy & Light",
    blurb:
      "Life runs on energy. These proteins harvest sunlight and pump particles to keep cells charged.",
  },
  {
    id: "plant-life",
    name: "Plant Life",
    blurb: "Plants turn air, water and light into food for nearly all life on Earth.",
  },
  {
    id: "enzymes",
    name: "Enzymes",
    blurb:
      "Enzymes speed up chemical reactions by millions of times, from digesting food to breaking down wood.",
  },
  {
    id: "transport-delivery",
    name: "Transport & Delivery",
    blurb: "Moves things from one place to another depending on the needs of the body.",
  },
  {
    id: "signals-senses",
    name: "Signals & Senses",
    blurb:
      "Molecular messengers and sensors that dictate how cells communicate and experience the environment.",
  },
  {
    id: "viruses",
    name: "Viruses",
    blurb:
      "Viruses are microscopic protein shells enclosing genetic instructions. Their structure dictates how they bind to and infect host cells, hijacking the host's molecular machinery to replicate.",
  },
  {
    id: "immune-defense",
    name: "Immune Defense",
    blurb: "The body's security system that recognizes billions of invaders.",
  },
  {
    id: "protein-machines",
    name: "Protein Machines",
    blurb: "Cells build, fold, copy and recycle using these molecular machines.",
  },
  {
    id: "glow",
    name: "Glow",
    blurb: "Jellyfish, fireflies and corals make light with these proteins.",
  },
  {
    id: "sustainable-future",
    name: "Sustainable Future",
    blurb: "Microbes have evolved enzymes that eat plastic and break down plant waste.",
  },
];

export const proteins: Protein[] = [
  {
    slug: "bacteriorhodopsin",
    name: "Bacteriorhodopsin",
    categoryId: "energy-light",
    organism: "Archaea",
    pdbId: "1C3W",
    video: PLACEHOLDER_VIDEO,
    model: "/models/bacteriorhodopsin.glb",
    description: [
      "Bacteriorhodopsin is a tiny solar-powered machine. It is made by *Halobacterium salinarum*, a microbe that lives in ponds so salty they turn pink and purple. The protein sits in the cell's outer skin and uses green sunlight to push hydrogen particles out of the cell. These particles then flow back in through another protein, which uses their energy to make fuel for the cell.",
      "The protein is one long chain folded into seven spiral shapes that cross the cell's outer skin as a bundle. Tucked in the middle is retinal, a pigment related to vitamin A. When it catches light, it flips from a straight shape to a bent one, and this small twist drives the pump. In the living cell, these proteins sit in groups of three, forming the famous “purple membrane.”",
      "It is a close relative of the light-sensing proteins in your own eyes. Scientists have borrowed proteins like it to switch nerve cells on and off with light.",
    ],
  },
  {
    slug: "rubisco",
    name: "Rubisco",
    categoryId: "plant-life",
    organism: "Plants",
    pdbId: "8RUC",
    video: PLACEHOLDER_VIDEO,
    model: "/models/rubisco.glb",
    description: [
      "Rubisco is the enzyme that captures carbon dioxide from the air and turns it into sugar. It is the first step in nearly all the carbon that enters the food chain, and plant cells are packed with it. It is often called the most plentiful enzyme on Earth.",
      "The spinach version is a large complex of 16 pieces: eight large ones and eight small ones. The large pieces form a central core, capped at the top and bottom by rings of small ones. The result is a squat barrel with four-fold symmetry, meaning it looks the same after each quarter turn. Each working site holds a magnesium atom, and the enzyme is switched on by attaching an extra carbon dioxide molecule nearby.",
      "Rubisco is famously inefficient. It works slowly, and it sometimes grabs oxygen instead of carbon dioxide, wasting energy. Making it faster, or surrounding it with extra carbon dioxide as some microbes do, is a major goal for growing better crops.",
    ],
  },
  {
    slug: "lysozyme",
    name: "Lysozyme",
    categoryId: "enzymes",
    organism: "Animals (chicken)",
    pdbId: "2LZT",
    video: PLACEHOLDER_VIDEO,
    model: PLACEHOLDER_MODEL,
    description: [
      "Lysozyme is one of your body's first lines of defence. It is found in tears, saliva and mucus, and also in egg white, which is where the version shown here comes from. In the early 1920s, Alexander Fleming, who later discovered penicillin, noticed that human tears could dissolve bacteria. Lysozyme was the reason.",
      "Many bacteria protect themselves with a tough outer wall. Lysozyme cuts that wall, and without it the bacterium bursts. The enzyme is a single small chain folded into two lobes with a deep groove between them. A strand of the bacterial wall fits into the groove like a key in a lock, and is held in place while it is snipped. Four chemical bridges inside the protein keep it tightly folded, which makes it unusually tough.",
      "Lysozyme also made history. In 1965 it became the first enzyme whose 3D shape was worked out, showing for the first time how an enzyme grabs and cuts its target. Today it is also used to help preserve food and as a standard test protein in labs.",
    ],
  },
  {
    slug: "hemoglobin",
    name: "Hemoglobin",
    categoryId: "transport-delivery",
    organism: "Humans",
    pdbId: "4HHB",
    video: PLACEHOLDER_VIDEO,
    model: "/models/hemoglobin.glb",
    description: [
      "Hemoglobin fills your red blood cells and carries oxygen from your lungs to every part of your body. It was one of the first protein shapes ever worked out, a feat that earned Max Perutz a share of the 1962 Nobel Prize in Chemistry.",
      "It is made of four chains: two of one type and two of another. Each chain is folded into a bundle of spirals and holds a flat ring called a heme, with an iron atom at its centre where oxygen sticks. Here is the clever part: when one heme picks up oxygen, the whole protein shifts shape, and the other three grab oxygen more easily. That helps hemoglobin fill up in the lungs and let go of oxygen where the body needs it. This entry shows the form without oxygen.",
      "A tiny change in one of the chains causes sickle-cell disease. Before birth, babies use a slightly different version that holds oxygen more tightly, so they can draw it from their mother's blood.",
    ],
  },
  {
    slug: "kcsa-potassium-channel",
    name: "KcsA Potassium Channel",
    categoryId: "signals-senses",
    organism: "Bacteria",
    pdbId: "1K4C",
    video: PLACEHOLDER_VIDEO,
    model: "/models/kcsa-potassium-channel.glb",
    description: [
      "Every nerve signal depends on potassium channels, tiny tunnels that let potassium particles flow out of a cell to reset its electrical charge. Their great puzzle was how a tunnel can let potassium through while blocking sodium, which is even smaller. The answer came from KcsA, a simple channel from a soil bacterium called *Streptomyces lividans*. Roderick MacKinnon's work on it earned a share of the 2003 Nobel Prize in Chemistry.",
      "KcsA is made of four identical pieces arranged around a central tunnel, like an upside-down cone sitting in the cell's outer skin. At the narrow top is a short stretch lined with oxygen atoms, which holds potassium particles in single file. These oxygen atoms act like the water that normally surrounds potassium, so potassium slips through easily, while sodium does not fit. This structure was captured with extra antibody pieces attached, which helped the protein form a crystal.",
      "When channels like this fail, they can cause heart rhythm problems and brain disorders. Many venoms, such as scorpion venom, work by plugging them.",
    ],
  },
  {
    slug: "sars-cov-2-spike",
    name: "SARS-CoV-2 Spike",
    categoryId: "viruses",
    organism: "Viruses",
    pdbId: "6VXX",
    video: PLACEHOLDER_VIDEO,
    model: "/models/sars-cov-2-spike.glb",
    description: [
      "The spike protein studs the surface of SARS-CoV-2, the virus that causes COVID-19, and gives it its crown-like look. Spike is how the virus gets into cells. Its tip grabs a human protein called ACE2, and the spike then unfolds dramatically to merge the virus with the cell.",
      "The spike is made of three identical chains twisted together. Each chain has a top part that carries the tip, and a lower part that does the merging. The tips can sit “down” (closed and hidden) or flip “up” (open and ready to grab on).",
      "Spike's shape was worked out within weeks of the outbreak, and it became the blueprint for vaccines and antibody treatments.",
    ],
  },
  {
    slug: "igg-antibody",
    name: "IgG Antibody",
    categoryId: "immune-defense",
    organism: "Animals (mouse)",
    pdbId: "1IGT",
    video: PLACEHOLDER_VIDEO,
    model: "/models/igg-antibody.glb",
    description: [
      "Antibodies are the immune system's search-and-tag molecules. They drift through your blood looking for foreign molecules on viruses, bacteria and toxins. When an antibody locks on, it can block the invader or flag it for immune cells to destroy. Your body can make billions of different antibodies, each with a slightly different grip.",
      "An IgG antibody is shaped like a Y and built from four chains: two long and two short, held together by chemical bonds. The two arms of the Y have tips that recognise a target, and the stem signals to immune cells. A flexible joint lets the arms swing. This structure was one of the first views of a complete antibody, taken from a mouse.",
      "Lab-made antibodies are now among the best-selling medicines in the world, used against cancer, immune disorders and infections.",
    ],
  },
  {
    slug: "groel-groes",
    name: "GroEL–GroES Chaperonin",
    categoryId: "protein-machines",
    organism: "Bacteria",
    pdbId: "1AON",
    video: PLACEHOLDER_VIDEO,
    model: "/models/groel-groes.glb",
    description: [
      "A newly made protein chain has to fold into exactly the right shape to work. In a crowded cell, chains can tangle and clump together. Helper proteins called chaperones prevent this, and GroEL–GroES from the gut bacterium *Escherichia coli* is the most famous. It works like a tiny pressure cooker: it traps a single unfolded protein in a private chamber where it can fold safely, powered by the cell's fuel.",
      "GroEL is two stacked rings of seven identical pieces, forming a hollow double barrel. GroES is a smaller seven-piece dome that caps one end like a lid. In total it has 21 pieces. When the lid clamps on, the chamber inside grows larger and its walls change from sticky to water-friendly, which coaxes the trapped protein to fold.",
      "Chaperones are found in all forms of life, and human versions protect our own proteins too.",
    ],
  },
  {
    slug: "dynein",
    name: "Dynein",
    categoryId: "protein-machines",
    organism: "Amoebae (slime mould)",
    pdbId: "3VKH",
    video: PLACEHOLDER_VIDEO,
    model: "/models/dynein.glb",
    description: [
      "Inside every cell runs a network of long, thin tracks called microtubules, a bit like a system of roads. Dynein is a motor protein that walks along them, hauling cargo such as packages of proteins, worn-out cell parts and even viruses that have sneaked in. It always walks in one direction, towards the centre of the cell. Its partner, kinesin, walks the opposite way.",
      "The part shown here is the motor, the engine of the machine. It is one of the largest single protein chains known, made of more than 3,000 building blocks. At its heart is a ring of six linked pieces that burns the cell's fuel. A long, thin stalk reaches out from the ring with a sticky tip that grips the track, and a flexible arm swings like a lever. Each time a fuel molecule is used, the arm swings, the ring pulls and the tip lets go and grips again further along. That is one step, and dynein takes thousands of them.",
      "The version shown here, called dynein-2, works inside cilia, the tiny hair-like antennas on the surface of many cells. It carries material back from the tip of the cilium to the base. When it fails, cilia cannot form properly, which causes rare disorders that affect how bones grow. Other kinds of dynein help pull chromosomes apart when a cell divides, and power the beating tails of sperm.",
    ],
  },
  {
    slug: "gfp",
    name: "Green Fluorescent Protein (GFP)",
    categoryId: "glow",
    organism: "Animals (jellyfish)",
    pdbId: "1EMA",
    video: PLACEHOLDER_VIDEO,
    model: "/models/gfp.glb",
    description: [
      "GFP comes from the crystal jellyfish *Aequorea victoria*, which lives in the North Pacific. It turns blue light into a soft green glow. Scientists realised they could attach GFP's genetic instructions to almost any other protein and watch it light up inside living cells. That idea transformed biology and earned Osamu Shimomura, Martin Chalfie and Roger Tsien the 2008 Nobel Prize in Chemistry.",
      "GFP is a single chain folded into a barrel made of 11 strips, with a spiral running down the middle. The part that glows is not something added from outside. It builds itself from three of the protein's own building blocks once the protein has folded, using oxygen from the air. The barrel protects it from water, which is why it glows so brightly. The version shown here is a brighter lab-made variant that is widely used in research.",
      "GFP and its many colour variants are now standard tools in labs around the world.",
    ],
  },
  {
    slug: "petase",
    name: "PETase",
    categoryId: "sustainable-future",
    organism: "Bacteria",
    pdbId: "6EQE",
    video: PLACEHOLDER_VIDEO,
    model: "/models/petase.glb",
    description: [
      "In 2016, Japanese researchers reported a bacterium, *Ideonella sakaiensis*, living at a plastic-bottle recycling site that could eat PET, the plastic used in drink bottles and polyester clothing. It does this with two enzymes. PETase chops the long plastic chains into smaller pieces, and a partner enzyme, MHETase, breaks those down further into the basic ingredients the bacterium uses as food.",
      "PETase is a compact enzyme made of a single chain. Its cutting site uses a team of three building blocks that work together, a design found in many enzymes that cut fats and similar molecules. Compared with its closest relatives, which break down plant wax, PETase has a wider, more open groove that can fit the bulky plastic. This structure is so sharp that individual atoms can be seen.",
      "PET is useful because it is so tough, and that toughness is also why it lingers in the environment. Scientists are now improving PETase to recycle plastic in a more sustainable way.",
    ],
  },
];

export const hero = {
  headline: "The Machines Inside Life.",
  subheadline:
    "Explore the tiny machines that power cells, fight disease, capture sunlight and even break down plastic, from bacteria and plants to jellyfish and you.",
};
