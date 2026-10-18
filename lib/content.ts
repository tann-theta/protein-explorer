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
  model: string; // meshopt-compressed .glb in public/models
};

export const categories: Category[] = [
  {
    id: "protein-machines",
    name: "Protein Machines",
    blurb: "Cells build, fold, copy and recycle using these molecular machines.",
  },
  {
    id: "sustainable-future",
    name: "Sustainable Future",
    blurb: "Microbes have evolved enzymes that eat plastic and break down plant waste.",
  },
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
    id: "glow",
    name: "Glow",
    blurb: "Jellyfish, fireflies and corals make light with these proteins.",
  },
];

export const proteins: Protein[] = [
  {
    slug: "bacteriorhodopsin",
    name: "Bacteriorhodopsin",
    categoryId: "energy-light",
    organism: "Archaea",
    pdbId: "1C3W",
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
    organism: "Animals",
    pdbId: "1LYZ",
    model: "/models/lysozyme.glb",
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
    model: "/models/sars-cov-2-spike.glb",
    description: [
      "The spike protein studs the surface of SARS-CoV-2, the virus that causes COVID-19, and gives it its crown-like look. Spike is how the virus gets into cells. Its tip grabs a human protein called ACE2, and the spike then unfolds dramatically to merge the virus with the cell.",
      "The spike is made of three identical chains twisted together. Each chain has a top part that carries the tip, and a lower part that does the merging. The tips can sit “down” (closed and hidden) or flip “up” (open and ready to grab on).",
      "Its surface is covered in dozens of sugar chains that act like camouflage, making it harder for antibodies to reach the protein underneath. It is also spring-loaded. Before it meets a cell, spike sits in a stable, folded shape. Once the tip locks onto ACE2 and enzymes snip the protein, the top part falls away and the lower part springs into a long, thin rod that drags the virus and the cell together until their outer skins merge.",
    ],
  },
  {
    slug: "igg-antibody",
    name: "IgG Antibody",
    categoryId: "immune-defense",
    organism: "Animals",
    pdbId: "1IGT",
    model: "/models/igg-antibody.glb",
    description: [
      "Antibodies are the immune system's search-and-tag molecules. They drift through your blood looking for foreign molecules on viruses, bacteria and toxins. When an antibody locks on, it can block the invader or flag it for immune cells to destroy. Your body can make billions of different antibodies, each with a slightly different grip.",
      "An IgG antibody is shaped like a Y and built from four chains: two long and two short, held together by chemical bonds. The two arms of the Y have tips that recognise a target, and the stem signals to immune cells. A flexible joint lets the arms swing. This structure was one of the first views of a complete antibody, taken from a mouse.",
      "The tips of the arms are the part that changes. Immune cells shuffle and tweak the genes for the loops at each tip, which is how the body can make billions of different antibodies, and after an infection it keeps refining the best-fitting ones. IgG is the most common antibody in your blood. Its stem is the signal that calls in help: immune cells that swallow invaders recognise it, and so do blood proteins that can punch holes in some bacteria. IgG is also the only type that crosses the placenta, which is how a newborn arrives with protection borrowed from its mother.",
    ],
  },
  {
    slug: "groel-groes",
    name: "GroEL–GroES Chaperonin",
    categoryId: "protein-machines",
    organism: "Bacteria",
    pdbId: "1AON",
    model: "/models/groel-groes.glb",
    description: [
      "A newly made protein chain has to fold into exactly the right shape to work. In a crowded cell, chains can tangle and clump together. Helper proteins called chaperones prevent this, and GroEL–GroES from the gut bacterium *Escherichia coli* is the most famous. It works like a tiny pressure cooker: it traps a single unfolded protein in a private chamber where it can fold safely, powered by the cell's fuel.",
      "GroEL is two stacked rings of seven identical pieces, forming a hollow double barrel. GroES is a smaller seven-piece dome that caps one end like a lid. In total it has 21 pieces. When the lid clamps on, the chamber inside grows larger and its walls change from sticky to water-friendly, which coaxes the trapped protein to fold.",
      "The chamber works in cycles. The two rings take turns, a bit like the pistons of an engine: one ring holds a protein while the other gets ready for the next. Fuel binds, the lid clamps on, and within roughly 10 seconds the lid pops off and lets the protein go. If it has not folded properly, it can be caught and given another try. Hundreds of different proteins in the cell rely on its help. GroEL was first noticed in the 1970s, because viruses that infect bacteria could not build themselves without it.",
      "Chaperones are also called heat shock proteins. Heat makes proteins unfold, so cells make many more chaperones when they get too hot, to help refold them correctly.",
    ],
  },
  {
    slug: "dynein",
    name: "Dynein",
    categoryId: "protein-machines",
    organism: "Amoebae",
    pdbId: "3VKH",
    model: "/models/dynein.glb",
    description: [
      "Inside every cell runs a network of long, thin tracks called microtubules, a bit like a system of roads. Dynein is a motor protein that walks along them, hauling cargo such as packages of proteins, worn-out cell parts and even viruses that have sneaked in. It always walks in one direction, towards the centre of the cell. Its partner, kinesin, walks the opposite way.",
      "The part shown here is the motor, the engine of the machine. It is one of the largest single protein chains known, made of more than 3,000 building blocks. At its heart is a ring of six linked pieces that burns the cell's fuel. A long, thin stalk reaches out from the ring with a sticky tip that grips the track, and a flexible arm swings like a lever. Each time a fuel molecule is used, the arm swings, the ring pulls and the tip lets go and grips again further along.",
      "Its one-way route is also used by viruses. After a bite, the rabies virus enters nerve endings and rides dynein up the nerve towards the brain, a slow and silent trip that usually takes weeks to months. Once symptoms begin, rabies is almost always fatal, which is why treatment must start soon after a bite.",
      "Close relatives of dynein bend cilia, the tiny hairs on many cells. Dynein arms between the tubes inside a cilium make them slide, so the cilium bends. In a very early embryo, spinning cilia create a gentle flow towards the left, the first sign that tells cells which side is which. When dynein is faulty, the cilia stay still and the body picks sides at random. So in about half of people with this rare condition, called primary ciliary dyskinesia, the organs end up as a mirror image, with the heart on the right.",
    ],
  },
  {
    slug: "gfp",
    name: "Green Fluorescent Protein (GFP)",
    categoryId: "glow",
    organism: "Animals",
    pdbId: "1EMA",
    model: "/models/gfp.glb",
    description: [
      "GFP comes from the crystal jellyfish *Aequorea victoria*, which lives in the North Pacific. It turns blue light into a soft green glow. Scientists realised they could attach GFP's genetic instructions to almost any other protein and watch it light up inside living cells. That idea transformed biology and earned Osamu Shimomura, Martin Chalfie and Roger Tsien the 2008 Nobel Prize in Chemistry.",
      "GFP is a single chain folded into a barrel made of 11 strips, with a spiral running down the middle. The part that glows is not something added from outside. It builds itself from three of the protein's own building blocks once the protein has folded, using oxygen from the air. The barrel protects it from water, which is why it glows so brightly.",
      "Decades later, it was realised that any cell can make a working GFP from the gene alone. Stick the gene next to the gene for another protein and the cell builds a glowing name tag onto it, so researchers can watch where it goes. GFP has been used to follow cancer cells as they spread, to watch viruses assemble, and to light up single nerve cells in a living brain. Versions rewired to change brightness in the presence of calcium let scientists watch neurons fire.",
    ],
  },
  {
    slug: "petase",
    name: "PETase",
    categoryId: "sustainable-future",
    organism: "Bacteria",
    pdbId: "6EQE",
    model: "/models/petase.glb",
    description: [
      "In 2016, Japanese researchers reported a bacterium, *Ideonella sakaiensis*, living at a plastic-bottle recycling site that could eat PET, the plastic used in drink bottles and polyester clothing. It does this with two enzymes. PETase chops the long plastic chains into smaller pieces, and a partner enzyme, MHETase, breaks those down further into the basic ingredients the bacterium uses as food.",
      "PETase is a compact enzyme made of a single chain. Its cutting site uses a team of three building blocks that work together, a design found in many enzymes that cut fats and similar molecules.",
      "On its own, PETase is slow. In the original study, the bacterium needed about six weeks at a mild 30 °C to break down a thin film of PET. It also struggles with the tightly packed, crystal-like plastic found in real bottles, which is much harder to attack than the loose form used in many lab tests.",
      "Researchers have been redesigning it. By changing a handful of its building blocks, often guided by computer predictions, they have made versions that work faster, survive longer and cope with higher temperatures, where plastic softens and is easier to cut. One of them, called FAST-PETase, broke down a range of everyday plastic items in days to a week. The small pieces left behind can be cleaned up and rebuilt into new plastic, so in principle plastic could be recycled in a loop instead of piling up.",
      "PETase is not a magic fix, and using and wasting less plastic still matters. But it shows that a living thing can evolve a way to digest even a human-made material, and it gives scientists a blueprint for better recycling.",
    ],
  },
];

export const hero = {
  headline: "The Machines Inside Life.",
  subheadline:
    "Nature has built proteins for almost every job imaginable: powering cells, fighting diseases, capturing sunlight, and even breaking down plastic. Explore some of the most remarkable proteins out there.",
};
