import "server-only";

import { db } from "@/db";
import { productImages, productReviews, products, type Product, type ProductImage, type ProductReview } from "@/db/schema";
import { asc, desc, eq, inArray, sql } from "drizzle-orm";

export type ProductWithImages = Product & {
  images: ProductImage[];
  reviews?: ProductReview[];
  reviewCount: number;
  averageRating: number;
};

const accentPalettes = [
  ["#111827", "#f2e8d8", "#c5a46d"],
  ["#25312b", "#ede7dc", "#9f7b50"],
  ["#3b3029", "#f4eee7", "#b8895b"],
  ["#1f2937", "#e7ded2", "#cfb083"],
  ["#312820", "#f6efe5", "#a57548"],
  ["#18251f", "#efe7da", "#d0a96d"],
];

function svgData(title: string, subtitle: string, index = 0) {
  const [dark, light, gold] = accentPalettes[index % accentPalettes.length];
  const escapedTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escapedSubtitle = subtitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="30" stdDeviation="28" flood-color="#111827" flood-opacity=".18"/></filter>
    </defs>
    <rect width="1200" height="900" fill="url(#bg)"/>
    <rect x="92" y="86" width="1016" height="728" rx="44" fill="#fffaf4" stroke="${gold}" stroke-width="4" opacity=".95"/>
    <path d="M168 735 C 323 642, 386 642, 532 735 S 824 829, 1032 706" fill="none" stroke="${gold}" stroke-width="18" stroke-linecap="round" opacity=".28"/>
    <g filter="url(#shadow)">
      <rect x="265" y="210" width="670" height="430" rx="28" fill="#ffffff"/>
      <rect x="310" y="250" width="580" height="350" rx="24" fill="${light}"/>
      <path d="M370 545 V344 h95 c48 0 78 29 78 71 0 45-34 73-83 73h-43v57z" fill="${dark}" opacity=".92"/>
      <circle cx="694" cy="430" r="92" fill="none" stroke="${dark}" stroke-width="24" opacity=".9"/>
      <path d="M724 514 L824 342 v203" fill="none" stroke="${dark}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/>
      <path d="M824 342 L893 514" fill="none" stroke="${gold}" stroke-width="18" stroke-linecap="round" opacity=".85"/>
    </g>
    <text x="600" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="48" fill="${dark}" letter-spacing="14">TCM deco</text>
    <text x="600" y="705" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="52" fill="${dark}">${escapedTitle}</text>
    <text x="600" y="765" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#6b5b4d">${escapedSubtitle}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const seedProducts = [
  {
    slug: "boiserie-mural-luxe",
    name: "Boiserie Mural Luxe",
    category: "ديكور الحائط",
    badge: "الأكثر طلباً",
    shortDescription: "بانوهات حائط أنيقة كتبدّل الصالون وتعطيه لمسة فخمة.",
    description:
      "Boiserie mural من TCM deco معمول باش يعطي للحائط طابع راقي، مناسب للصالون، غرف النوم، المداخل وحتى المحلات. التركيب نقي والتفاصيل كتخلي الدار تبان warm و chic.",
    price: 1290,
    oldPrice: 1590,
    dimensions: "حسب القياس ديال الحائط",
    material: "MDF/PU عالي الجودة مع finition مقاومة",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "miroir-organique-dore",
    name: "Miroir Organique Doré",
    category: "مرايات",
    badge: "ستايل 2026",
    shortDescription: "مراية بشكل organique كتوسع الفضاء وكتزيد الضوء.",
    description:
      "مراية ديكور بتصميم عصري، كتجي مع إطار ذهبي/أسود حسب الاختيار. مناسبة للمدخل، الصالون أو غرفة النوم، وكتعطي فخامة بلا ما تكون تقيلة.",
    price: 890,
    oldPrice: 1100,
    dimensions: "80x120cm أو حسب الطلب",
    material: "زجاج واضح + إطار معدني/خشبي premium",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "console-entree-marbre",
    name: "Console Entrée Marbre",
    category: "Meubles déco",
    badge: "Premium",
    shortDescription: "كونسول مدخل بستايل رخامي، عملي وفخم ف نفس الوقت.",
    description:
      "Console كتليق بالمداخل والصالونات الصغيرة، فيها سطح رخامي/رخامي صناعي وقاعدة أنيقة. كتقدر تبدل القياسات والألوان باش توافق الديكور ديالك.",
    price: 1750,
    oldPrice: 2100,
    dimensions: "120x35x85cm أو حسب الطلب",
    material: "حديد مطلي + سطح effet marbre",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "tableaux-texture-3d",
    name: "Tableaux Texture 3D",
    category: "لوحات حائط",
    badge: "Handmade",
    shortDescription: "لوحات texture 3D كتزيد العمق والدفء للحائط.",
    description:
      "لوحات فنية ب texture بارزة وألوان neutral، مناسبة للديكور العصري والمينيمال. كل لوحة كتقدر تكون personnalisée بالألوان والقياس اللي بغيتي.",
    price: 620,
    oldPrice: 790,
    dimensions: "60x90cm / 80x120cm",
    material: "Canvas + texture paste + حماية matte",
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "etagere-murale-design",
    name: "Étagère Murale Design",
    category: "رفوف و تنظيم",
    badge: "عملي",
    shortDescription: "رفوف حائط مصممة للديكور والتنظيم بلا ازدحام.",
    description:
      "Étagères murales كتجمع بين الجمال والاستعمال اليومي. مناسبة للكتب، النباتات، العطور أو accessoires ديال الديكور، وكتتركب بطريقة نظيفة.",
    price: 540,
    oldPrice: 690,
    dimensions: "مجموعة 3 قطع أو حسب الطلب",
    material: "MDF premium + supports مخفيين",
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "pack-decoration-salon",
    name: "Pack Décoration Salon",
    category: "Packs",
    badge: "عرض خاص",
    shortDescription: "Pack كامل باش تبدّل جو الصالون بسرعة وبذوق متناسق.",
    description:
      "Pack فيه اختيارات متناسقة من مراية، tableau، accessoires ورفوف صغيرة حسب المساحة. كنوجدو proposal مناسب ونوصلوه حتى لدارك.",
    price: 2490,
    oldPrice: 2990,
    dimensions: "Pack personnalisable حسب المساحة",
    material: "Mix premium حسب العناصر المختارة",
    featured: true,
    sortOrder: 6,
  },
];

const reviewSentences = [
  "وصلني المنتج حتى للدار، الجودة زوينة بزاف والتركيب كان نقي. شكراً TCM deco.",
  "الكوموند وصلات ف الوقت، صوّرت النتيجة حيث فعلاً بدلات ليا الصالون.",
  "خدمة محترفة والتواصل عبر واتساب كان سريع. المنتج جا حسن من الصور.",
];

const cities = ["Casablanca", "Rabat", "Tanger", "Marrakech", "Agadir", "Fès"];

export async function ensureTcmCatalog() {
  const [{ count: productCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products);

  if (productCount === 0) {
    await db.insert(products).values(seedProducts).onConflictDoNothing({ target: products.slug });
  }

  const catalog = await db
    .select({ id: products.id, slug: products.slug, name: products.name })
    .from(products)
    .where(
      inArray(
        products.slug,
        seedProducts.map((product) => product.slug),
      ),
    );

  const [{ count: imageCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productImages);

  if (imageCount === 0) {
    const imagesToInsert = catalog.flatMap((product, productIndex) =>
      ["الصورة الرئيسية", "تفاصيل المنتج", "مثال فالدار"].map((label, imageIndex) => ({
        productId: product.id,
        url: svgData(product.name, label, productIndex + imageIndex),
        alt: `${product.name} - ${label}`,
        position: imageIndex + 1,
      })),
    );

    if (imagesToInsert.length > 0) {
      await db.insert(productImages).values(imagesToInsert);
    }
  }

  const [{ count: reviewCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productReviews);

  if (reviewCount === 0) {
    const reviewsToInsert = catalog.flatMap((product, productIndex) =>
      [0, 1, 2].map((reviewIndex) => ({
        productId: product.id,
        customerName: ["سارة", "مريم", "يوسف", "نادية", "هند", "أيوب"][(productIndex + reviewIndex) % 6],
        city: cities[(productIndex + reviewIndex) % cities.length],
        rating: reviewIndex === 1 ? 4 : 5,
        comment: reviewSentences[(productIndex + reviewIndex) % reviewSentences.length],
        imageUrl: svgData("Review client", `${product.name} عند الزبون`, productIndex + reviewIndex + 2),
        position: reviewIndex + 1,
      })),
    );

    if (reviewsToInsert.length > 0) {
      await db.insert(productReviews).values(reviewsToInsert);
    }
  }
}

function averageRatingFor(productId: number, reviews: ProductReview[]) {
  const productReviewsOnly = reviews.filter((review) => review.productId === productId);
  if (productReviewsOnly.length === 0) return 0;
  return Number(
    (productReviewsOnly.reduce((total, review) => total + review.rating, 0) / productReviewsOnly.length).toFixed(1),
  );
}

export async function getProducts(): Promise<ProductWithImages[]> {
  await ensureTcmCatalog();

  const allProducts = await db.select().from(products).orderBy(asc(products.sortOrder), asc(products.id));
  const allImages = await db.select().from(productImages).orderBy(asc(productImages.position), asc(productImages.id));
  const allReviews = await db.select().from(productReviews).orderBy(asc(productReviews.position), asc(productReviews.id));

  return allProducts.map((product) => ({
    ...product,
    images: allImages.filter((image) => image.productId === product.id),
    reviewCount: allReviews.filter((review) => review.productId === product.id).length,
    averageRating: averageRatingFor(product.id, allReviews),
  }));
}

export async function getFeaturedProducts() {
  const catalog = await getProducts();
  return catalog.filter((product) => product.featured).slice(0, 4);
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  await ensureTcmCatalog();

  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) return null;

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, product.id))
    .orderBy(asc(productImages.position), asc(productImages.id));

  const reviews = await db
    .select()
    .from(productReviews)
    .where(eq(productReviews.productId, product.id))
    .orderBy(asc(productReviews.position), asc(productReviews.id));

  return {
    ...product,
    images,
    reviews,
    reviewCount: reviews.length,
    averageRating: averageRatingFor(product.id, reviews),
  };
}

export async function getLatestReviews(limit = 6) {
  await ensureTcmCatalog();

  return db
    .select({
      id: productReviews.id,
      customerName: productReviews.customerName,
      city: productReviews.city,
      rating: productReviews.rating,
      comment: productReviews.comment,
      imageUrl: productReviews.imageUrl,
      productName: products.name,
      productSlug: products.slug,
    })
    .from(productReviews)
    .innerJoin(products, eq(productReviews.productId, products.id))
    .orderBy(desc(productReviews.createdAt), asc(productReviews.id))
    .limit(limit);
}

export async function getRelatedProducts(currentSlug: string, category: string) {
  const catalog = await getProducts();
  const sameCategory = catalog.filter((product) => product.slug !== currentSlug && product.category === category);
  const fallback = catalog.filter((product) => product.slug !== currentSlug && product.category !== category);
  return [...sameCategory, ...fallback].slice(0, 3);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(price) + " DH";
}

export function whatsappNumber() {
  return (process.env.TCM_WHATSAPP || process.env.NEXT_PUBLIC_TCM_WHATSAPP || "212600000000").replace(/[^0-9]/g, "");
}
