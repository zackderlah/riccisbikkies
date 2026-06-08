export interface Product {
  id: string;
  name: string;
  nameLine2?: string;
  price: number;
  description: string;
  image: string;
  imagePosition?: string;
  tags: string[];
  soldOut?: boolean;
  /** Image has a transparent (background-removed) PNG, displayed contained over the page background. */
  cutout?: boolean;
}

export const getProduct = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

const wixImage = (file: string) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_800,h_1000,al_c,q_85,enc_auto/${file}`;

export const products: Product[] = [
  {
    id: "crispy-chilli-candied-garlic-455g",
    name: "Crispy Chilli &",
    nameLine2: "Candied Garlic 455g",
    price: 18.0,
    description:
      "Not another chilli oil. This small-batch condiment is packed with real texture and flavour — 21% slow-cooked garlic blended with crispy chilli, sesame oil and soy. Savoury, slightly sweet, gently spicy and seriously moreish, in a generous 455g jar.",
    image: wixImage("11d54a_a145f6329211495ca5018307dd79afd2~mv2.jpg"),
    tags: ["Bulk Jar", "455g", "Chilli Crisp"],
  },
  {
    id: "crispy-chilli-candied-garlic-3-pack",
    name: "Crispy Chilli &",
    nameLine2: "Candied Garlic 3-Pack",
    price: 30.0,
    description:
      "Our small-batch crispy chilli with candied garlic — 21% garlic slowly cooked for natural sweetness, then blended with crispy chilli, sesame oil and soy. Savoury, gently spicy and addictive. Three jars to keep and share.",
    image: "/products/crispy-chilli-candied-garlic-3-pack.png",
    cutout: true,
    tags: ["3-Pack", "Value Bundle", "Chilli Crisp"],
  },
  {
    id: "crispy-chilli-candied-garlic",
    name: "Crispy Chilli with",
    nameLine2: "Candied Garlic",
    price: 12.5,
    description:
      "Sweet, spicy and crunchy — our Crispy Chilli with Candied Garlic is the ultimate flavour hit for any dish. Spoon it over eggs, noodles, cheese or a grazing board.",
    image: wixImage("11d54a_90596f2eef0042eabc74168a47c20de2~mv2.jpg"),
    tags: ["Chilli Crisp", "Candied Garlic"],
  },
  {
    id: "sauces-wasabi-trio",
    name: "Ricci's Sauces",
    nameLine2: "Wasabi Trio",
    price: 25.0,
    description:
      "Craving a bold flavour boost? Our tangy, Asian-inspired wasabi sauces take your taste buds on a thrilling ride. Ideal as a marinade for all types of meat — especially good with prawns and roast pork. Only limited by your culinary creativity.",
    image: "/products/sauces-wasabi-trio.png",
    cutout: true,
    tags: ["Sauce Trio", "Wasabi", "Gift"],
  },
  {
    id: "pita-bits-chilli-cheese",
    name: "Pita Bits",
    nameLine2: "Chilli Cheese",
    price: 6.0,
    description:
      "Crispy, seasoned pita snacks with a chilli-cheese kick. All natural and free from additives — perfect for dipping or munching on their own.",
    image: "/products/pita-bits-chilli-cheese.png",
    cutout: true,
    tags: ["Pita Bits", "Chilli Cheese"],
  },
  {
    id: "pita-bits-mediterranean",
    name: "Pita Bits",
    nameLine2: "Mediterranean",
    price: 6.0,
    description:
      "Crispy, seasoned pita snacks with bright Mediterranean flavour. All natural and free from additives — perfect for dipping or munching on their own.",
    image: "/products/pita-bits-mediterranean.png",
    cutout: true,
    tags: ["Pita Bits", "Mediterranean"],
  },
  {
    id: "pita-bits-chipotle-cheese",
    name: "Pita Bits",
    nameLine2: "Chipotle Cheese",
    price: 6.0,
    description:
      "Crispy, seasoned pita snacks with smoky chipotle and cheese. All natural and free from additives — perfect for dipping or munching on their own.",
    image: "/products/pita-bits-chipotle-cheese.png",
    cutout: true,
    tags: ["Pita Bits", "Chipotle"],
  },
  {
    id: "baker-ricci-cinnamon-croissant-bites",
    name: "Baker Ricci",
    nameLine2: "Cinnamon Croissant Bites",
    price: 15.0,
    description:
      "Designed especially for Costco, this bulk pack of crispy Cinnamon Palmiettes de Croissant has quickly become a customer favourite. With their irresistible swirl, curl and crunch, they're perfect for sharing — or keeping all to yourself.",
    image: "/products/baker-ricci-cinnamon-croissant-bites.png",
    cutout: true,
    tags: ["As Seen in Costco", "Cinnamon"],
    soldOut: true,
  },
  {
    id: "palmiettes-espresso",
    name: "Palmiettes de Croissant",
    nameLine2: "Espresso",
    price: 6.0,
    description:
      "Swirled, curled and crispy flakes of croissant with an irresistible espresso flavour. A unique, delightful treat — add to a dessert platter or enjoy with a coffee. (They make a wonderful tiramisu, too.)",
    image: "/products/palmiettes-espresso.png",
    cutout: true,
    tags: ["Palmiettes", "Sweet", "Espresso"],
  },
  {
    id: "four-pillars-gin-cracker",
    name: "Four Pillars",
    nameLine2: "Botanical Gin Cracker",
    price: 7.5,
    description:
      "Twice-baked pita crackers infused with Four Pillars spent gin botanicals, adding a delightful tang to every bite. Perfectly crisp and flavourful — they pair beautifully with cheese or dip, and a refreshing Four Pillars G&T.",
    image: "/products/four-pillars-gin-cracker.png",
    cutout: true,
    tags: ["Botanical", "Pairs: Cheese", "Twice Baked"],
  },
  {
    id: "palmiettes-french-onion-tarragon",
    name: "Palmiettes de Croissant",
    nameLine2: "French Onion & Tarragon",
    price: 6.0,
    description:
      "A delightful base for hors d'oeuvres — top with crème fraîche, smoked salmon, capers and chives for an elegant bite. Add to a platter alongside terrine, cheese or your favourite dips, or simply enjoy them on their own.",
    image: "/products/palmiettes-french-onion-tarragon.png",
    cutout: true,
    tags: ["Palmiettes", "Savoury"],
  },
  {
    id: "palmiettes-aged-parmesan",
    name: "Palmiettes de Croissant",
    nameLine2: "Aged Parmesan",
    price: 6.0,
    description:
      "Versatile and perfect for elevating any occasion. A delightful base for hors d'oeuvres or a sophisticated addition to cheese and charcuterie boards — pairing well with terrine, fine cheeses or your favourite dips. Also found in the Coles Deli.",
    image: "/products/palmiettes-aged-parmesan.png",
    cutout: true,
    tags: ["Palmiettes", "Savoury", "Coles Deli"],
  },
  {
    id: "palmiettes-cinnamon",
    name: "Palmiettes de Croissant",
    nameLine2: "Cinnamon",
    price: 6.0,
    description:
      "Swirled, curled and perfectly crispy, our Cinnamon Palmiettes de Croissant offer irresistible taste in every bite. A fantastic addition to any dessert platter, or simply enjoyed with a cuppa for a comforting treat.",
    image: "/products/palmiettes-cinnamon.png",
    cutout: true,
    tags: ["Palmiettes", "Sweet", "Cinnamon"],
  },
  {
    id: "garlic-olive-parmesan",
    name: "Ricci's Bikkies",
    nameLine2: "Garlic, Olive & Parmesan",
    price: 7.5,
    description:
      "Our original pita crisps — a delightful blend of garlic, olive and parmesan. Hand-crafted from the finest local ingredients with no artificial colours, flavours or preservatives. Twice baked, never fried. 120g.",
    image: wixImage("1b6561_8324ba6808d543a481106f1462cfd290~mv2.jpg"),
    imagePosition: "center",
    tags: ["Original Pita Crisps", "Family Favourite"],
  },
  {
    id: "olive-oil-sea-salt",
    name: "Ricci's Bikkies",
    nameLine2: "Olive Oil & Sea Salt",
    price: 7.5,
    description:
      "Our original bikkies in a beautiful olive oil and sea salt flavour. Hand-made from the finest local ingredients with no artificial colours, flavours or preservatives. Twice baked, never fried. 120g.",
    image: wixImage("1b6561_1cb902a0ec1a4eb291ddea97c357ce15~mv2.jpg"),
    imagePosition: "center",
    tags: ["Original Pita Crisps", "Bestseller"],
  },
  {
    id: "herbed-bikkies",
    name: "Ricci's Bikkies",
    nameLine2: "Herbed Bikkies",
    price: 7.5,
    description:
      "The herb flavour of our original bikkies in a vegan pita crisp. Hand-crafted from the finest local ingredients with no artificial colours, flavours or preservatives. Twice baked, never fried. 100g.",
    image: wixImage("1b6561_62d0c9ab0c394bd989253ebafc767d40~mv2.jpg"),
    tags: ["Original Pita Crisps", "Vegan", "Great with Dips"],
  },
  {
    id: "stonebaker-wholemeal-olive-oil-sea-salt",
    name: "Stonebaker Wholemeal",
    nameLine2: "Olive Oil & Sea Salt",
    price: 7.5,
    description:
      "Ricci's favourite pita crisps, delicately sprinkled with sea salt. Vegan-friendly, made from the finest local ingredients and twice baked, never fried. No artificial colours, flavours or preservatives. 120g.",
    image: wixImage("1b6561_30914a21f73847e3a697008d6c1a6926~mv2.jpg"),
    tags: ["Stonebaker", "Wholemeal", "Vegan"],
  },
  {
    id: "stonebaker-garlic-olive-parmesan-rosemary",
    name: "Stonebaker",
    nameLine2: "Garlic, Olive, Parmesan & Rosemary",
    price: 7.5,
    description:
      "Mediterranean-inspired pita crisps with a blend of garlic, olive, rosemary and parmesan. Hand-crafted from the finest local ingredients with robust, natural flavour. Twice baked, never fried. 120g.",
    image: wixImage("1b6561_21a23b742968455aae1b6e615fe1f91a~mv2.jpg"),
    tags: ["Stonebaker", "Mediterranean"],
  },
];
