import { Product, Brand, Category } from "../types";

export const MAX_PRICE = 2400;

export const ALL_CATEGORIES: Category[] = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Shoes",
  "Bags",
  "Jewelry",
];

export const ALL_BRANDS: { name: Brand; count: number }[] = [
  { name: "Gucci", count: 1 },
  { name: "Dolce & Gabbana", count: 0 },
  { name: "Chanel", count: 0 },
  { name: "Louis Vuitton", count: 0 },
  { name: "Versace", count: 1 },
  { name: "Adidas", count: 1 },
  { name: "Nike", count: 1 },
  { name: "Apple", count: 9 },
  { name: "Sony", count: 1 },
  { name: "Samsung", count: 1 },
];

// In-memory data store (replaces MongoDB)
export let products: Product[] = [
  {
    id: 1,
    name: "Apple iMac 24-inch M3",
    brand: "Apple",
    category: "Electronics",
    price: 1299,
    rating: 4.8,
    reviews: 312,
    sku: "IMAC-M3-24",
    stock: 6,
    color: "Purple",
    description:
      "The all-new iMac with M3 chip delivers up to 2x faster performance than iMac with Intel Core i7. Features a stunning 24-inch 4.5K Retina display, 1080p FaceTime HD camera, and up to 24GB unified memory. Available in seven beautiful colors.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-purple-selection-hero-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830456",
    archived: false,
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Electronics",
    price: 999,
    rating: 4.7,
    reviews: 891,
    sku: "IP15-PRO-128",
    stock: 22,
    color: "Titanium",
    description:
      "iPhone 15 Pro features the A17 Pro chip, a customizable Action button, and the most advanced iPhone camera system ever. Pro camera system with 48MP main, ultrawide, and 3x telephoto. USB 3 speeds with the USB-C connector.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
    archived: false,
  },
  {
    id: 3,
    name: "MacBook Air M2",
    brand: "Apple",
    category: "Electronics",
    price: 1099,
    rating: 4.9,
    reviews: 654,
    sku: "MBA-M2-256",
    stock: 14,
    color: "Midnight",
    description:
      "MacBook Air with the powerful M2 chip. Supercharged by the next-generation Apple Silicon, the redesigned MacBook Air has up to 18 hours of battery life, a 13.6-inch Liquid Retina display, and a fanless design.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
    archived: false,
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Electronics",
    price: 1199,
    rating: 4.6,
    reviews: 432,
    sku: "SAM-S24U-256",
    stock: 18,
    color: "Titanium Gray",
    description:
      "Galaxy S24 Ultra is the ultimate smartphone with a built-in S Pen, 200MP camera with AI-powered zoom, Snapdragon 8 Gen 3 processor, and a 6.8-inch Dynamic AMOLED 2X display.",
    image:
      "https://images.samsung.com/us/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titaniumgray.jpg",
    archived: false,
  },
  {
    id: 5,
    name: "AirPods Max",
    brand: "Apple",
    category: "Electronics",
    price: 549,
    rating: 4.5,
    reviews: 278,
    sku: "APM-SLVR",
    stock: 10,
    color: "Silver",
    description:
      "AirPods Max feature Apple-designed dynamic driver for high-fidelity audio, Active Noise Cancellation powered by two computational audio chips, and Spatial Audio with dynamic head tracking.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-starlight-202409?wid=890&hei=1000&fmt=jpeg&qlt=90&.v=1724926322730",
    archived: false,
  },
  {
    id: 6,
    name: "Apple HomePod mini",
    brand: "Apple",
    category: "Electronics",
    price: 99,
    rating: 4.4,
    reviews: 189,
    sku: "HPM-ORG",
    stock: 35,
    color: "Orange",
    description:
      "HomePod mini delivers surprisingly rich 360-degree audio. It's a powerful smart speaker that works seamlessly with your iPhone, filling any room with clear, detailed sound.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-orange-202110?wid=892&hei=820&fmt=jpeg&qlt=90&.v=1632925512000",
    archived: false,
  },
  {
    id: 7,
    name: "AirPods Max (Green)",
    brand: "Apple",
    category: "Electronics",
    price: 549,
    rating: 4.5,
    reviews: 156,
    sku: "APM-GRN",
    stock: 8,
    color: "Green",
    description:
      "The same premium AirPods Max experience in a stunning green finish. High-fidelity audio, Active Noise Cancellation, and Transparency mode.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-green-202409?wid=890&hei=1000&fmt=jpeg&qlt=90&.v=1724926322962",
    archived: false,
  },
  {
    id: 8,
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    category: "Electronics",
    price: 249,
    rating: 4.8,
    reviews: 1204,
    sku: "APP2-WHT",
    stock: 40,
    color: "White",
    description:
      "AirPods Pro (2nd generation) deliver up to 2x more Active Noise Cancellation and Adaptive Transparency, plus Personalized Spatial Audio with dynamic head tracking.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
    archived: false,
  },
  {
    id: 9,
    name: "iPad Pro M4 11-inch",
    brand: "Apple",
    category: "Electronics",
    price: 999,
    rating: 4.9,
    reviews: 387,
    sku: "IPAD-PM4-11",
    stock: 12,
    color: "Space Gray",
    description:
      "iPad Pro with M4 chip. The thinnest Apple product ever. Features an Ultra Retina XDR display with nano-texture glass, ProMotion technology, and all-day battery life.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202405?wid=892&hei=820&fmt=jpeg&qlt=90&.v=1713920820145",
    archived: false,
  },
  {
    id: 10,
    name: "MacBook Pro 14-inch M3 Pro",
    brand: "Apple",
    category: "Electronics",
    price: 1999,
    rating: 4.9,
    reviews: 521,
    sku: "MBP-M3P-14",
    stock: 7,
    color: "Space Black",
    description:
      "MacBook Pro 14-inch with M3 Pro chip delivers exceptional performance for demanding workflows. Features a stunning Liquid Retina XDR display, up to 22 hours battery life, and the MagSafe charging port.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830404",
    archived: false,
  },
  {
    id: 11,
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "Accessories",
    price: 799,
    rating: 4.7,
    reviews: 234,
    sku: "AWU2-TIT",
    stock: 5,
    color: "Natural Titanium",
    description:
      "Apple Watch Ultra 2 is the most rugged and capable Apple Watch with a 49mm titanium case, precision dual-frequency GPS, up to 60 hours of battery life, and an Action button.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra2-49mm-titanium-alpine-loop-medium-orange-202309?wid=892&hei=820&fmt=jpeg&qlt=90&.v=1693329434618",
    archived: false,
  },
  {
    id: 12,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Electronics",
    price: 349,
    rating: 4.8,
    reviews: 678,
    sku: "SONY-XM5-BLK",
    stock: 20,
    color: "Black",
    description:
      "Industry-leading noise cancellation headphones with 30-hour battery life, multipoint connection to two devices, Speak-to-Chat technology, and crystal-clear hands-free calling.",
    image:
      "https://www.sony.com/image/5d02da5df552836db894cead731a9e5d?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320",
    archived: true,
  },
  {
    id: 13,
    name: "Gucci Horsebit Bag",
    brand: "Gucci",
    category: "Bags",
    price: 2400,
    rating: 4.6,
    reviews: 89,
    sku: "GCC-HB-TAN",
    stock: 3,
    color: "Tan",
    description:
      "The iconic Gucci Horsebit 1955 shoulder bag in GG canvas with leather trim. Features the iconic horsebit closure and adjustable leather strap.",
    image:
      "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1711964455/764191_FACXG_9762_001_100_0000_Light-Horsebit-1955-small-shoulder-bag.jpg",
    archived: true,
  },
  {
    id: 14,
    name: "Nike Air Max 270",
    brand: "Nike",
    category: "Shoes",
    price: 150,
    rating: 4.5,
    reviews: 445,
    sku: "NK-AM270-WHT",
    stock: 28,
    color: "White/Black",
    description:
      "The Nike Air Max 270 delivers visible cushioning under every step with the tallest Air unit yet, a heritage-inspired look, and all-day comfort.",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png",
    archived: false,
  },
  {
    id: 15,
    name: "Adidas Ultraboost 23",
    brand: "Adidas",
    category: "Shoes",
    price: 190,
    rating: 4.7,
    reviews: 362,
    sku: "ADI-UB23-BLK",
    stock: 16,
    color: "Core Black",
    description:
      "The Adidas Ultraboost 23 running shoes feature a full-length BOOST midsole for incredible energy return, a Primeknit+ upper for adaptive support, and a Continental rubber outsole.",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_23_Shoes_Black_HQ8596_01_standard.jpg",
    archived: false,
  },
  {
    id: 16,
    name: "Versace La Medusa Bag",
    brand: "Versace",
    category: "Bags",
    price: 1875,
    rating: 4.8,
    reviews: 67,
    sku: "VRS-LM-BLK",
    stock: 4,
    color: "Black",
    description:
      "The La Medusa small handbag in black calf leather with gold-tone hardware. Features the iconic Medusa head closure and detachable chain-link strap.",
    image:
      "https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw7a2c4b6e/original/90_1000745-1A00620_1B00V_1-La-Medusa-Small-Handbag.jpg",
    archived: false,
  },
];

let nextId = products.length + 1;

export const getNextId = (): number => nextId++;
