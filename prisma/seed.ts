import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function inr(amount: number) {
  return new Prisma.Decimal(amount);
}

function usd(amount: number) {
  return new Prisma.Decimal((amount / 83).toFixed(2));
}

const categories = [
  {
    name: "Wall Clocks",
    slug: "wall-clocks",
    description: "Handcrafted wall clocks blending tradition with modern design",
    imageUrl: IMG("photo-1563861826100-9cb868fdbe1c"),
  },
  {
    name: "Wall Paintings",
    slug: "wall-paintings",
    description: "Original hand-painted artworks for homes and gifting",
    imageUrl: IMG("photo-1541961017774-22349e4a1262"),
  },
  {
    name: "Alpana & Rangoli",
    slug: "alpana-rangoli",
    description:
      "Traditional Alpana (Alpona) and Rangoli art pieces, stencils and kits",
    imageUrl: IMG("photo-1589996448606-27d38c70f3bc"),
  },
  {
    name: "Terracotta Decor",
    slug: "terracotta-decor",
    description: "Earthy terracotta home décor handmade by local artisans",
    imageUrl: IMG("photo-1520408222757-6f9f95d87d5d"),
  },
  {
    name: "Wooden Crafts",
    slug: "wooden-crafts",
    description: "Carved and painted wooden decorative items",
    imageUrl: IMG("photo-1497219055242-93359eeed651"),
  },
];

type ProductSeed = {
  name: string;
  description: string;
  story?: string;
  priceInr: number;
  comparePriceInr?: number;
  weightGrams?: number;
  isFeatured?: boolean;
  images: { url: string; publicId: string; alt: string }[];
  variants?: { name: string; sku: string; priceInr: number; stock: number }[];
  stock: number;
};

const productsByCategory: Record<string, ProductSeed[]> = {
  "wall-clocks": [
    {
      name: "Madhubani Peacock Wall Clock",
      description:
        "A stunning 30 cm wall clock hand-painted in the traditional Madhubani style from Bihar. Features a vibrant peacock motif on a mango-wood base with a silent quartz movement.",
      story:
        "Crafted by artisans in Mithila, this clock carries centuries of folk-art tradition into your living room.",
      priceInr: 1299,
      comparePriceInr: 1599,
      weightGrams: 520,
      isFeatured: true,
      stock: 15,
      images: [
        {
          url: IMG("photo-1563861826100-9cb868fdbe1c"),
          publicId: "madhubani-clock-1",
          alt: "Madhubani Peacock Wall Clock front view",
        },
        {
          url: IMG("photo-1564091880021-bb02f2b2928d"),
          publicId: "madhubani-clock-2",
          alt: "Madhubani Peacock Wall Clock detail",
        },
      ],
    },
    {
      name: "Warli Art Round Wall Clock",
      description:
        "28 cm round wall clock featuring black-and-white Warli tribal art painted on a natural wood disc. Includes a sweep quartz mechanism for silent operation.",
      priceInr: 999,
      weightGrams: 420,
      stock: 20,
      images: [
        {
          url: IMG("photo-1594995846645-d58328c3ffa4"),
          publicId: "warli-clock-1",
          alt: "Warli Art Round Wall Clock",
        },
      ],
    },
    {
      name: "Dhokra Brass Dial Wall Clock",
      description:
        "Elegant 35 cm wall clock with a handcast Dhokra brass dial depicting tribal figurines. Dark teak wood frame with a polished finish.",
      story:
        "Dhokra is one of India's oldest metalcasting traditions, dating back over 4000 years.",
      priceInr: 2499,
      comparePriceInr: 2999,
      weightGrams: 870,
      isFeatured: true,
      stock: 8,
      images: [
        {
          url: IMG("photo-1558603655-491ecfa8324f"),
          publicId: "dhokra-clock-1",
          alt: "Dhokra Brass Dial Wall Clock",
        },
      ],
    },
    {
      name: "Gond Art Vintage Wall Clock",
      description:
        "A 30 cm wall clock adorned with Gond tribal art from Madhya Pradesh. Vibrant natural colours on a reclaimed-wood base.",
      priceInr: 1149,
      weightGrams: 480,
      stock: 12,
      images: [
        {
          url: IMG("photo-1609980775647-1fb1ef376268"),
          publicId: "gond-clock-1",
          alt: "Gond Art Vintage Wall Clock",
        },
      ],
    },
  ],

  "wall-paintings": [
    {
      name: "Pattachitra Lord Jagannath Canvas Painting",
      description:
        "Hand-painted Pattachitra artwork from Odisha depicting Lord Jagannath on a 12×16 inch canvas. Natural stone colours on cotton canvas.",
      story:
        "Pattachitra is a centuries-old cloth-based scroll painting from Odisha and West Bengal.",
      priceInr: 1899,
      comparePriceInr: 2199,
      weightGrams: 350,
      isFeatured: true,
      stock: 10,
      images: [
        {
          url: IMG("photo-1541961017774-22349e4a1262"),
          publicId: "pattachitra-jagannath",
          alt: "Pattachitra Lord Jagannath Canvas Painting",
        },
      ],
      variants: [
        { name: '12×16"', sku: "PAINT-PTCH-1216", priceInr: 1899, stock: 6 },
        { name: '18×24"', sku: "PAINT-PTCH-1824", priceInr: 2799, stock: 4 },
      ],
    },
    {
      name: "Tanjore Gold Leaf Ganesha Painting",
      description:
        "Traditional Tanjore painting of Lord Ganesha with 24-carat gold leaf embellishment and semi-precious stone inlay on an 18×24 inch board.",
      priceInr: 4999,
      comparePriceInr: 5999,
      weightGrams: 900,
      isFeatured: true,
      stock: 5,
      images: [
        {
          url: IMG("photo-1589996448606-27d38c70f3bc"),
          publicId: "tanjore-ganesha",
          alt: "Tanjore Gold Leaf Ganesha Painting",
        },
      ],
    },
    {
      name: "Madhubani Fish Pair Painting",
      description:
        "A 10×14 inch hand-painted Madhubani artwork depicting a pair of fish — a symbol of prosperity — in vibrant natural pigments on handmade paper.",
      priceInr: 699,
      weightGrams: 120,
      stock: 25,
      images: [
        {
          url: IMG("photo-1615184697985-c9bde1b07da7"),
          publicId: "madhubani-fish",
          alt: "Madhubani Fish Pair Painting",
        },
      ],
    },
    {
      name: "Kerala Mural Krishna Painting",
      description:
        "A 16×20 inch Kerala mural painting of Lord Krishna playing flute, rendered in traditional vegetable pigments on a textured canvas.",
      priceInr: 3299,
      weightGrams: 450,
      stock: 7,
      images: [
        {
          url: IMG("photo-1536849460588-696219a9e98d"),
          publicId: "kerala-mural-krishna",
          alt: "Kerala Mural Krishna Painting",
        },
      ],
    },
    {
      name: "Pichwai Lotus & Cows Painting",
      description:
        "An exquisite 12×18 inch Pichwai painting from Nathdwara (Rajasthan) featuring lotus flowers and cows in rich natural colours.",
      story:
        "Pichwai paintings are devotional artworks created as backdrops for the deity Srinathji.",
      priceInr: 2799,
      comparePriceInr: 3299,
      weightGrams: 300,
      stock: 9,
      images: [
        {
          url: IMG("photo-1605721911519-3dfeb3be25e7"),
          publicId: "pichwai-lotus",
          alt: "Pichwai Lotus Cows Painting",
        },
      ],
    },
    {
      name: "Warli Village Life Wall Art",
      description:
        "A large 24×30 inch Warli painting depicting village festivals and daily life on a black cotton canvas. Ideal statement piece for living rooms.",
      priceInr: 2199,
      weightGrams: 600,
      isFeatured: true,
      stock: 11,
      images: [
        {
          url: IMG("photo-1622542796254-5b9c46ab0d2f"),
          publicId: "warli-village",
          alt: "Warli Village Life Wall Art",
        },
      ],
    },
  ],

  "alpana-rangoli": [
    {
      name: "Traditional Bengali Alpana Stencil Set",
      description:
        "A set of 10 reusable Mylar stencils featuring classic Bengali Alpana (Alpona) motifs — lotuses, conch shells, footprints and geometric borders. Easy to apply with colour powder or acrylic.",
      story:
        "Alpana is a ritual floor-art tradition from Bengal, drawn during festivals like Lakshmi Puja and Durga Puja.",
      priceInr: 449,
      comparePriceInr: 549,
      weightGrams: 180,
      isFeatured: true,
      stock: 40,
      images: [
        {
          url: IMG("photo-1558452337-ca6e53836504"),
          publicId: "alpana-stencil-set",
          alt: "Traditional Bengali Alpana Stencil Set",
        },
      ],
    },
    {
      name: "Alpana DIY Kit with Natural Colours",
      description:
        "Complete Alpana kit including 5 stencils, 6 natural colour powders (white, yellow, red, green, blue, pink) and an instruction booklet.",
      priceInr: 799,
      comparePriceInr: 949,
      weightGrams: 550,
      stock: 30,
      images: [
        {
          url: IMG("photo-1613574714687-c33b9e90200d"),
          publicId: "alpana-kit",
          alt: "Alpana DIY Kit",
        },
      ],
    },
    {
      name: "Rangoli Mandala Stencil Set (12 pcs)",
      description:
        "Set of 12 mandala-pattern reusable Rangoli stencils in various sizes from 12 cm to 45 cm. Food-grade plastic, washable and durable.",
      priceInr: 599,
      weightGrams: 310,
      stock: 50,
      images: [
        {
          url: IMG("photo-1633887091273-a3bd71efddde"),
          publicId: "rangoli-stencil-set",
          alt: "Rangoli Mandala Stencil Set",
        },
      ],
    },
    {
      name: "Hand-Painted Alpana Door Hanging",
      description:
        "A 30×45 cm cloth hanging painted with intricate Alpana patterns in white and earth tones — perfect for doorways during pujas and festivals.",
      priceInr: 349,
      weightGrams: 90,
      stock: 35,
      images: [
        {
          url: IMG("photo-1541753866388-0b3c701627d3"),
          publicId: "alpana-door-hanging",
          alt: "Hand-Painted Alpana Door Hanging",
        },
      ],
    },
  ],

  "terracotta-decor": [
    {
      name: "Terracotta Ganesha Wall Plaque",
      description:
        "Hand-moulded terracotta wall plaque of Lord Ganesha, 20 cm × 25 cm, with a natural matte finish and hand-painted details.",
      priceInr: 599,
      weightGrams: 650,
      stock: 18,
      images: [
        {
          url: IMG("photo-1604264726154-26480e76f4e1"),
          publicId: "terracotta-ganesha",
          alt: "Terracotta Ganesha Wall Plaque",
        },
      ],
    },
    {
      name: "Bankura Horse Set of 2",
      description:
        "A pair of classic Bankura terracotta horses from West Bengal. Available in natural clay and painted variants. Height ≈ 18 cm.",
      story:
        "The Bankura horse is one of West Bengal's most iconic craft exports, made for over 500 years.",
      priceInr: 799,
      comparePriceInr: 999,
      weightGrams: 700,
      isFeatured: true,
      stock: 22,
      images: [
        {
          url: IMG("photo-1468531390554-9f62f9767a87"),
          publicId: "bankura-horse",
          alt: "Bankura Horse Set of 2",
        },
      ],
      variants: [
        {
          name: "Natural Clay",
          sku: "TERRA-BNK-NAT",
          priceInr: 799,
          stock: 12,
        },
        {
          name: "Hand-Painted",
          sku: "TERRA-BNK-PNT",
          priceInr: 999,
          stock: 10,
        },
      ],
    },
    {
      name: "Terracotta Wind Chime – Leaf Motif",
      description:
        "Handcrafted terracotta wind chime with 6 leaf-shaped chimes. Natural clay finish, suitable for indoor or covered outdoor use.",
      priceInr: 449,
      weightGrams: 320,
      stock: 28,
      images: [
        {
          url: IMG("photo-1528789386055-75c4b717bad1"),
          publicId: "terracotta-windchime",
          alt: "Terracotta Wind Chime Leaf Motif",
        },
      ],
    },
    {
      name: "Terracotta Owl Bookend Pair",
      description:
        "Charming pair of terracotta owl bookends, hand-painted in earthy tones. Each owl ≈ 14 cm tall. Adds a rustic touch to any bookshelf.",
      priceInr: 699,
      weightGrams: 880,
      stock: 14,
      images: [
        {
          url: IMG("photo-1510828561531-05a3388f6d3d"),
          publicId: "terracotta-owl-bookend",
          alt: "Terracotta Owl Bookend Pair",
        },
      ],
    },
  ],

  "wooden-crafts": [
    {
      name: "Carved Neem Wood Elephant Pair",
      description:
        "A pair of hand-carved neem wood elephants in a traditional trunk-up posture. Height 15 cm. Natural oil finish.",
      priceInr: 899,
      comparePriceInr: 1099,
      weightGrams: 600,
      isFeatured: true,
      stock: 16,
      images: [
        {
          url: IMG("photo-1497219055242-93359eeed651"),
          publicId: "wood-elephant-pair",
          alt: "Carved Neem Wood Elephant Pair",
        },
      ],
    },
    {
      name: "Sheesham Wood Lattice Wall Panel",
      description:
        "A 45×60 cm decorative lattice wall panel laser-cut from solid sheesham (rosewood). Geometric jali pattern, ready to hang.",
      priceInr: 1599,
      weightGrams: 1200,
      stock: 10,
      images: [
        {
          url: IMG("photo-1604478579007-70de3dee20cb"),
          publicId: "sheesham-lattice-panel",
          alt: "Sheesham Wood Lattice Wall Panel",
        },
      ],
    },
    {
      name: "Hand-Painted Kondapalli Parrot",
      description:
        "Iconic Kondapalli toy parrot from Andhra Pradesh, hand-carved from soft Tella Poniki wood and painted in vivid natural colours.",
      story:
        "Kondapalli toys are a GI-tagged craft from Krishna district, AP, carved by the Aryakshatriya community.",
      priceInr: 349,
      weightGrams: 120,
      stock: 30,
      images: [
        {
          url: IMG("photo-1700831213936-44bb92582be4"),
          publicId: "kondapalli-parrot",
          alt: "Kondapalli Parrot",
        },
      ],
    },
    {
      name: "Channapatna Wooden Spinning Top Set",
      description:
        "Set of 5 traditional Channapatna lacquered spinning tops in assorted colours. Safe, non-toxic lacquer — great for children and display.",
      priceInr: 499,
      weightGrams: 250,
      stock: 40,
      images: [
        {
          url: IMG("photo-1643944407305-82c5270e6fb3"),
          publicId: "channapatna-tops",
          alt: "Channapatna Wooden Spinning Top Set",
        },
      ],
    },
    {
      name: "Mango Wood Photo Frame – Dhokra Inlay",
      description:
        "A 5×7 inch mango-wood photo frame with Dhokra brass inlay border. Tabletop stand and wall hook included.",
      priceInr: 749,
      weightGrams: 380,
      stock: 20,
      images: [
        {
          url: IMG("photo-1561666200-e39dc07c989a"),
          publicId: "mango-wood-frame",
          alt: "Mango Wood Photo Frame Dhokra Inlay",
        },
      ],
    },
  ],
};

async function main() {
  console.log("🌱  Starting seed...\n");

  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap[cat.slug] = record.id;
    console.log(`  ✔ Category: ${record.name}`);
  }

  let productCount = 0;

  for (const [catSlug, products] of Object.entries(productsByCategory)) {
    const categoryId = categoryMap[catSlug];
    if (!categoryId) continue;

    for (const p of products) {
      const productSlug = slug(p.name);
      const baseSku = productSlug.toUpperCase().slice(0, 20);

      const existing = await prisma.product.findUnique({
        where: { slug: productSlug },
      });
      if (existing) {
        await prisma.productImage.deleteMany({
          where: { productId: existing.id },
        });
        await prisma.productVariant.deleteMany({
          where: { productId: existing.id },
        });
      }

      const product = await prisma.product.upsert({
        where: { slug: productSlug },
        update: {
          name: p.name,
          description: p.description,
          story: p.story ?? null,
          priceInr: inr(p.priceInr),
          priceUsd: usd(p.priceInr),
          comparePriceInr: p.comparePriceInr ? inr(p.comparePriceInr) : null,
          comparePriceUsd: p.comparePriceInr ? usd(p.comparePriceInr) : null,
          weightGrams: p.weightGrams ?? null,
          isFeatured: p.isFeatured ?? false,
          isActive: true,
          stock: p.stock,
          categoryId,
        },
        create: {
          name: p.name,
          slug: productSlug,
          description: p.description,
          story: p.story ?? null,
          priceInr: inr(p.priceInr),
          priceUsd: usd(p.priceInr),
          comparePriceInr: p.comparePriceInr ? inr(p.comparePriceInr) : null,
          comparePriceUsd: p.comparePriceInr ? usd(p.comparePriceInr) : null,
          sku: baseSku,
          stock: p.stock,
          weightGrams: p.weightGrams ?? null,
          isFeatured: p.isFeatured ?? false,
          isActive: true,
          categoryId,
        },
      });

      await prisma.productImage.createMany({
        data: p.images.map((img, i) => ({
          productId: product.id,
          url: img.url,
          publicId: img.publicId,
          alt: img.alt,
          position: i,
        })),
      });

      if (p.variants?.length) {
        await prisma.productVariant.createMany({
          data: p.variants.map((v) => ({
            productId: product.id,
            name: v.name,
            sku: v.sku,
            priceInr: inr(v.priceInr),
            priceUsd: usd(v.priceInr),
            stock: v.stock,
          })),
        });
      }

      console.log(`    ✔ Product: ${product.name}`);
      productCount++;
    }
  }

  console.log(
    `\n Seeded ${categories.length} categories and ${productCount} products.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
