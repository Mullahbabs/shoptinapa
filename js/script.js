document.addEventListener("DOMContentLoaded", function () {
  console.log("Tinapa E-Commerce JS initialized");

  // ==================== UTILITY FUNCTIONS ====================
  function formatNaira(amount) {
    const roundedAmount = Math.round(amount * 100) / 100;
    if (roundedAmount >= 1000000) {
      return `₦${Math.round(roundedAmount).toLocaleString("en-NG")}`;
    }
    return `₦${roundedAmount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  // ==================== PRODUCT DATA ====================
  const productCategories = {
    featured: [
      {
        id: 2201,
        title: "Pure Honey",
        vendor: "Ranch exports",
        price: 18500,
        originalPrice: 20000,
        image: "img/honey.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "5L Of Pure Obudu Mountain Honey",
      },
      {
        id: 2202,
        title: "Pepper Soup Spices",
        vendor: "Akamkpa Agro",
        price: 5598,
        originalPrice: 6784,
        image: "img/spices.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "1kg of Different Locally Made Pepper Soup Spices.",
      },
      {
        id: 2203,
        title: "Vit A Fortified Garri",
        vendor: "Apiapum Agro",
        price: 11500,
        originalPrice: 13000,
        image: "img/garri.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Full basin of garri.",
      },
      {
        id: 2204,
        title: "Locally Made Liquid Soap",
        vendor: "EmemNse",
        price: 3000,
        originalPrice: 3800,
        image: "img/local soap.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "10L Lemon Fragrance Liquid Soap .",
      },
      {
        id: 2205,
        title: "Sweet Potato ",
        vendor: "CR Agro",
        price: 9000,
        originalPrice: 10500,
        image: "img/potato.png",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Basket Of sweet potato.",
      },
      {
        id: 2206,
        title: "Ogoja New Yam",
        vendor: "Echeng Onah Ent.",
        price: 12500,
        originalPrice: 14000,
        image: "img/yam.png",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "7pcs Of Sweet Ogoja New Yams.",
      },
      {
        id: 2207,
        title: "Vit A Improved Cassava",
        vendor: "CR Agro",
        price: 8150,
        originalPrice: 9200,
        image: "img/cassava.png",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "One Big size basin of cassava.",
      },
      {
        id: 2208,
        title: "Ikom Cocoa",
        vendor: "CR Agro",
        price: 420000,
        originalPrice: 497000,
        image: "img/african-cocoa.png",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Two Bushels Of Expert Ready Ikom Cocoa",
      },
    ],
    trending: [
      {
        id: 101,
        title: "Wireless Earbuds",
        vendor: "TechGadgets",
        price: 95984,
        originalPrice: 127984,
        image: "img/nb2.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
        description: "High-quality wireless earbuds with noise cancellation.",
      },
      {
        id: 102,
        title: "Stanly Cup",
        vendor: "Vicki Home Essentials",
        price: 95984,
        originalPrice: 127984,
        image: "img/stanley.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
        description: "Durable stainless steel tumbler.",
      },
      {
        id: 103,
        title: "7000 puffs vape",
        vendor: "Unyime",
        price: 95984,
        originalPrice: 127984,
        image: "img/vape.png",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
        description: "Long-lasting vape device.",
      },
      {
        id: 104,
        title: "Nike Kyrie 4",
        vendor: "Appiah Apparel",
        price: 95984,
        originalPrice: 127984,
        image: "img/nike.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
        description: "Stylish athletic sneakers.",
      },
      {
        id: 105,
        title: "Two Piece Ankara Summer",
        vendor: "Oby's Couture",
        price: 95984,
        originalPrice: 127984,
        image: "img/oby.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
        description: "Vibrant summer outfit.",
      },
      {
        id: 106,
        title: "2021 Apple Macbook Pro",
        vendor: "TechGadgets",
        price: 95984,
        originalPrice: 127984,
        image: "img/eleco.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
        description: "Powerful laptop for professionals.",
      },
    ],
    local: [
      {
        id: 201,
        title: "Beaded String Crafts",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made1.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Intricate beaded crafts.",
      },
      {
        id: 202,
        title: "Handmade Storage Baskets",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made2.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Handwoven storage baskets.",
      },
      {
        id: 203,
        title: "Handcarved Wooden Bowl",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made3.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Artisanal wooden bowl.",
      },
      {
        id: 204,
        title: "Handcrafted Tapistry",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made4.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Decorative tapestry.",
      },
      {
        id: 205,
        title: "Handmade Shopping Basket",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made5.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Durable shopping basket.",
      },
      {
        id: 206,
        title: "Handcarved Wooden Kitchen Set",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made6.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
        description: "Wooden kitchen utensils.",
      },
    ],
    deals: [
      {
        id: 301,
        title: "Smart Headphones",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
        description: "Premium headphones with surround sound.",
      },
      {
        id: 302,
        title: "9th Gen Laptop PC",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad2.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
        description: "High-performance laptop.",
      },
      {
        id: 303,
        title: "Home Music Carryons",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad3.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
        description: "Portable music system.",
      },
      {
        id: 304,
        title: "Apple Gadget Set",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad4.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
        description: "Complete Apple accessory set.",
      },
      {
        id: 305,
        title: "Pink Apple Set For Him",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad5.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
        description: "Stylish Apple accessories.",
      },
      {
        id: 306,
        title: "Smart Watch",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad6.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
        description: "Feature-rich smartwatch.",
      },
    ],
    male: [
      {
        id: 401,
        title: "Men's Ankara Shirt",
        vendor: "CR Fashion",
        price: 63984,
        originalPrice: 79984,
        image: "img/male.jpg",
        rating: 4.6,
        reviews: 89,
        badge: "New",
        description: "Traditional Ankara shirt for men.",
      },
      {
        id: 402,
        title: "Leather Loafers",
        vendor: "StyleHub",
        price: 111984,
        originalPrice: 143984,
        image: "img/male1.png",
        rating: 4.8,
        reviews: 102,
        badge: "Popular",
        description: "Premium leather loafers.",
      },
      {
        id: 403,
        title: "Men's Blazer",
        vendor: "CR Fashion",
        price: 159984,
        originalPrice: 207984,
        image: "img/male2.jpg",
        rating: 4.7,
        reviews: 67,
        badge: "Trending",
        description: "Elegant blazer for formal occasions.",
      },
      {
        id: 404,
        title: "Casual Jeans",
        vendor: "StyleHub",
        price: 79984,
        originalPrice: 95984,
        image: "img/male3.jpg",
        rating: 4.5,
        reviews: 134,
        badge: "Bestseller",
        description: "Comfortable casual jeans.",
      },
      {
        id: 405,
        title: "Graphic Tee",
        vendor: "CR Fashion",
        price: 47984,
        originalPrice: 63984,
        image: "img/male4.jpg",
        rating: 4.4,
        reviews: 98,
        badge: "Sale",
        description: "Stylish graphic t-shirt.",
      },
      {
        id: 406,
        title: "Men's Watch",
        vendor: "StyleHub",
        price: 127984,
        originalPrice: 159984,
        image: "img/male5.jpg",
        rating: 4.9,
        reviews: 76,
        badge: "Luxury",
        description: "Luxury men's wristwatch.",
      },
    ],
    female: [
      {
        id: 501,
        title: "Ankara Dress",
        vendor: "CR Couture",
        price: 95984,
        originalPrice: 127984,
        image: "img/female.jpg",
        rating: 4.8,
        reviews: 112,
        badge: "New",
        description: "Elegant Ankara dress.",
      },
      {
        id: 502,
        title: "High Heels",
        vendor: "Elegance",
        price: 143984,
        originalPrice: 175984,
        image: "img/female1.jpg",
        rating: 4.7,
        reviews: 95,
        badge: "Popular",
        description: "Chic high heels.",
      },
      {
        id: 503,
        title: "Handbag",
        vendor: "CR Couture",
        price: 79984,
        originalPrice: 111984,
        image: "img/female2.jpg",
        rating: 4.6,
        reviews: 88,
        badge: "Trending",
        description: "Stylish handbag.",
      },
      {
        id: 504,
        title: "Maxi Skirt",
        vendor: "Elegance",
        price: 63984,
        originalPrice: 79984,
        image: "img/female3.jpg",
        rating: 4.5,
        reviews: 123,
        badge: "Bestseller",
        description: "Flowy maxi skirt.",
      },
      {
        id: 505,
        title: "Blouse",
        vendor: "CR Couture",
        price: 47984,
        originalPrice: 63984,
        image: "img/female4.jpg",
        rating: 4.4,
        reviews: 107,
        badge: "Sale",
        description: "Elegant blouse.",
      },
      {
        id: 506,
        title: "Necklace Set",
        vendor: "Elegance",
        price: 111984,
        originalPrice: 143984,
        image: "img/female5.jpg",
        rating: 4.9,
        reviews: 65,
        badge: "Luxury",
        description: "Luxury necklace set.",
      },
    ],
    unisex: [
      {
        id: 601,
        title: "Unisex Hoodie",
        vendor: "CR Trends",
        price: 79984,
        originalPrice: 95984,
        image: "img/uni.jpg",
        rating: 4.7,
        reviews: 145,
        badge: "New",
        description: "Cozy unisex hoodie.",
      },
      {
        id: 602,
        title: "Sneakers",
        vendor: "StyleZone",
        price: 127984,
        originalPrice: 159984,
        image: "img/uni1.jpg",
        rating: 4.8,
        reviews: 132,
        badge: "Popular",
        description: "Versatile sneakers.",
      },
      {
        id: 603,
        title: "Backpack",
        vendor: "CR Trends",
        price: 63984,
        originalPrice: 79984,
        image: "img/uni2.jpg",
        rating: 4.6,
        reviews: 99,
        badge: "Trending",
        description: "Durable backpack.",
      },
      {
        id: 604,
        title: "Cap",
        vendor: "StyleZone",
        price: 31984,
        originalPrice: 47984,
        image: "img/uni3.jpg",
        rating: 4.5,
        reviews: 156,
        badge: "Bestseller",
        description: "Stylish cap.",
      },
      {
        id: 605,
        title: "Sunglasses",
        vendor: "CR Trends",
        price: 47984,
        originalPrice: 63984,
        image: "img/uni4.jpg",
        rating: 4.4,
        reviews: 111,
        badge: "Sale",
        description: "Trendy sunglasses.",
      },
      {
        id: 606,
        title: "Wristband",
        vendor: "StyleZone",
        price: 23984,
        originalPrice: 31984,
        image: "img/uni5.jpg",
        rating: 4.3,
        reviews: 87,
        badge: "Casual",
        description: "Casual wristband.",
      },
    ],
    general: [
      {
        id: 701,
        title: "Smart TV",
        vendor: "TechZone",
        price: 639984,
        originalPrice: 799984,
        image: "img/gen.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "New",
        description: "High-definition smart TV.",
      },
      {
        id: 702,
        title: "Laptop",
        vendor: "GadgetsPro",
        price: 1279984,
        originalPrice: 1599984,
        image: "img/gen1.jpg",
        rating: 4.7,
        reviews: 165,
        badge: "Popular",
        description: "Powerful laptop for work and play.",
      },
      {
        id: 703,
        title: "Home Theater",
        vendor: "TechZone",
        price: 479984,
        originalPrice: 639984,
        image: "img/gen2.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
        description: "Immersive home theater system.",
      },
      {
        id: 704,
        title: "Desktop PC",
        vendor: "GadgetsPro",
        price: 959984,
        originalPrice: 1279984,
        image: "img/gen3.jpg",
        rating: 4.5,
        reviews: 122,
        badge: "Bestseller",
        description: "Reliable desktop PC.",
      },
      {
        id: 705,
        title: "Gaming Console",
        vendor: "TechZone",
        price: 639984,
        originalPrice: 799984,
        image: "img/gen4.jpg",
        rating: 4.9,
        reviews: 198,
        badge: "Hot",
        description: "Next-gen gaming console.",
      },
      {
        id: 706,
        title: "Projector",
        vendor: "GadgetsPro",
        price: 399984,
        originalPrice: 559984,
        image: "img/gen5.jpg",
        rating: 4.4,
        reviews: 109,
        badge: "Sale",
        description: "Portable projector for home entertainment.",
      },
    ],
    phones: [
      {
        id: 801,
        title: "Smartphone Pro",
        vendor: "TechTrend",
        price: 1119984,
        originalPrice: 1439984,
        image: "img/phone5.jpg",
        rating: 4.8,
        reviews: 234,
        badge: "New",
        description: "Premium smartphone with advanced features.",
      },
      {
        id: 802,
        title: "Budget Phone",
        vendor: "GadgetWorld",
        price: 319984,
        originalPrice: 399984,
        image: "img/phone.jpg",
        rating: 4.6,
        reviews: 178,
        badge: "Popular",
        description: "Affordable smartphone.",
      },
      {
        id: 803,
        title: "Flagship Phone",
        vendor: "TechTrend",
        price: 1599984,
        originalPrice: 1919984,
        image: "img/phone1.jpg",
        rating: 4.9,
        reviews: 256,
        badge: "Trending",
        description: "Top-tier flagship phone.",
      },
      {
        id: 804,
        title: "Midrange Phone",
        vendor: "GadgetWorld",
        price: 639984,
        originalPrice: 799984,
        image: "img/phone2.jpg",
        rating: 4.7,
        reviews: 199,
        badge: "Bestseller",
        description: "Balanced midrange phone.",
      },
      {
        id: 805,
        title: "Foldable Phone",
        vendor: "TechTrend",
        price: 2079984,
        originalPrice: 2399984,
        image: "img/phone3.jpg",
        rating: 4.8,
        reviews: 167,
        badge: "Luxury",
        description: "Innovative foldable phone.",
      },
      {
        id: 806,
        title: "Rugged Phone",
        vendor: "GadgetWorld",
        price: 479984,
        originalPrice: 639984,
        image: "img/phone4.jpg",
        rating: 4.5,
        reviews: 145,
        badge: "Durable",
        description: "Durable phone for tough conditions.",
      },
    ],
    accessories: [
      {
        id: 901,
        title: "Wireless Charger",
        vendor: "TechBits",
        price: 47984,
        originalPrice: 63984,
        image: "img/acc.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "New",
        description: "Fast wireless charger.",
      },
      {
        id: 902,
        title: "Bluetooth Earbuds",
        vendor: "GadgetGear",
        price: 79984,
        originalPrice: 111984,
        image: "img/acc1.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
        description: "Wireless earbuds with clear sound.",
      },
      {
        id: 903,
        title: "Phone Case",
        vendor: "TechBits",
        price: 31984,
        originalPrice: 47984,
        image: "img/acc2.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
        description: "Protective phone case.",
      },
      {
        id: 904,
        title: "Screen Protector",
        vendor: "GadgetGear",
        price: 23984,
        originalPrice: 31984,
        image: "img/acc3.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
        description: "Durable screen protector.",
      },
      {
        id: 905,
        title: "Smartwatch Band",
        vendor: "TechBits",
        price: 39984,
        originalPrice: 55984,
        image: "img/acc4.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "Stylish smartwatch band.",
      },
      {
        id: 906,
        title: "USB-C Cable",
        vendor: "GadgetGear",
        price: 15984,
        originalPrice: 23984,
        image: "img/acc5.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "High-speed USB-C cable.",
      },
    ],
    smartphonesapple: [
      {
        id: 1001,
        title: "Iphone 16 128GB",
        vendor: "Gigs & Gadgets",
        price: 2100000,
        originalPrice: 2300000,
        image: "img/phones/a1.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "New",
        description: "Latest iPhone with 128GB storage.",
        section: "smartphonesapple",
      },
      {
        id: 1002,
        title: "Iphone 13 pro 64GB",
        vendor: "GadgetGear",
        price: 699845,
        originalPrice: 724000,
        image: "img/phones/a2.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
        description: "UK used iPhone 13 Pro with 64GB.",
        section: "smartphonesapple",
      },
      {
        id: 1003,
        title: "IPhone 13 promax 256GB",
        vendor: "TechBits",
        price: 752000,
        originalPrice: 774000,
        image: "img/phones/a3.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
        description: "UK used iPhone 13 Pro Max with 256GB.",
        section: "smartphonesapple",
      },
      {
        id: 1004,
        title: "Iphone 8Plus 128GB",
        vendor: "GadgetGear",
        price: 289845,
        originalPrice: 319845,
        image: "img/phones/a4.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
        description: "UK used iPhone 8 Plus with 128GB.",
        section: "smartphonesapple",
      },
      {
        id: 1005,
        title: "Iphone 12",
        vendor: "TechBits",
        price: 69984,
        originalPrice: 559845,
        image: "img/phones/a5.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "iPhone 12 with vibrant display.",
        section: "smartphonesapple",
      },
      {
        id: 1006,
        title: "Iphone 11 64GB",
        vendor: "GadgetGear",
        price: 355984,
        originalPrice: 323984,
        image: "img/phones/a6.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "iPhone 11 with 64GB storage.",
        section: "smartphonesapple",
      },
      {
        id: 1007,
        title: "Iphone 14 promax 512GB",
        vendor: "Gigs & Gadgets",
        price: 1199845,
        originalPrice: 9255984,
        image: "img/phones/a7.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "iPhone 14 Pro Max with 512GB.",
        section: "smartphonesapple",
      },
      {
        id: 1008,
        title: "Iphone 13 promax 512GB",
        vendor: "GadgetGear",
        price: 765984,
        originalPrice: 6923984,
        image: "img/phones/a8.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "iPhone 13 Pro Max with 512GB.",
        section: "smartphonesapple",
      },
      {
        id: 1009,
        title: "Samsung Galaxy s23 Ultra",
        vendor: "Gigs & Gadgets",
        price: 600000,
        originalPrice: 630000,
        image: "img/phones/s1.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "New",
        description: "Samsung Galaxy S23 Ultra.",
        section: "smartphonessamsung",
      },
      {
        id: 1010,
        title: "Samsung",
        vendor: "GadgetGear",
        price: 699845,
        originalPrice: 724000,
        image: "img/phones/s2.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
        description: "Samsung smartphone with advanced features.",
        section: "smartphonessamsung",
      },
      {
        id: 1011,
        title: "Samsung Galaxy s23 Ultra",
        vendor: "TechBits",
        price: 752000,
        originalPrice: 774000,
        image: "img/phones/s3.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
        description: "New Samsung Galaxy S23 Ultra.",
        section: "smartphonessamsung",
      },
      {
        id: 1012,
        title: "Samsung",
        vendor: "GadgetGear",
        price: 289845,
        originalPrice: 319845,
        image: "img/phones/s4.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
        description: "Samsung smartphone.",
        section: "smartphonessamsung",
      },
      {
        id: 1013,
        title: "Samsung",
        vendor: "TechBits",
        price: 69984,
        originalPrice: 559845,
        image: "img/phones/s5.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "Samsung budget phone.",
        section: "smartphonessamsung",
      },
      {
        id: 1014,
        title: "Samsung",
        vendor: "GadgetGear",
        price: 355984,
        originalPrice: 323984,
        image: "img/phones/s6.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "Samsung midrange phone.",
        section: "smartphonessamsung",
      },
      {
        id: 1015,
        title: "Samsung",
        vendor: "Gigs & Gadgets",
        price: 1199845,
        originalPrice: 9255984,
        image: "img/phones/s7.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "Samsung premium phone.",
        section: "smartphonessamsung",
      },
      {
        id: 1016,
        title: "Samsung Flip 3",
        vendor: "GadgetGear",
        price: 765984,
        originalPrice: 6923984,
        image: "img/phones/s8.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "Samsung Flip 3 foldable phone.",
        section: "smartphonessamsung",
      },
    ],
    mic1wood: [
      {
        id: 3001,
        title: "African George",
        vendor: "Eddy's Sculptures",
        price: 120000,
        image: "img/sculpt1.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "New",
        description: "Giant African Elephant statue",
        section: "artscarvings",
      },
      {
        id: 3002,
        title: "Ekpe Efik",
        vendor: "Ebi Arts",
        price: 26000,
        image: "img/ekpeefik.png",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
        description: "Traditional Ekpe Efik Miniature Sculpture",
        section: "artscarvings",
      },
      {
        id: 3003,
        title: "Finger Nodes",
        vendor: "cross arts",
        price: 65200,
        originalPrice: 77400,
        image: "img/fingers.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "On Sale",
        description: "Miniature Finger Node Sculture.",
        section: "artscarvings",
      },
      {
        id: 3004,
        title: "Birdwing Ashtray",
        vendor: "Eddy's bar",
        price: 16000,
        image: "img/birdash.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
        description: "Hand crafted birdwing ashtray",
        section: "artscarvings",
      },
      {
        id: 3005,
        title: "Twisted Arms",
        vendor: "Calified Sculptures",
        price: 19984,
        originalPrice: 22800,
        image: "img/bumbum.png",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "Hand carved twisted arms.",
        section: "artscarvings",
      },
      {
        id: 3006,
        title: "Jessica Wildbick",
        vendor: "Wild wings arts",
        price: 12500,
        image: "img/pigeon.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "Wildwings Tamed Duck",
        section: "artscarvings",
      },
      {
        id: 3007,
        title: "Early Pheobe",
        vendor: "Arts acade",
        price: 21998,
        image: "img/earlyphib.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "The cross of the early men.",
        section: "artscarvings",
      },
      {
        id: 3008,
        title: "AntMan On The Wall",
        vendor: "Art acade",
        price: 26598,
        originalPrice: 29239,
        image: "img/antman.png",
        rating: 4.3,
        reviews: 198,
        badge: "Sale",
        description: "Ant Man Sculpture.",
        section: "artscarvings",
      },
      {
        id: 3009,
        title: "Angel Back Drop",
        vendor: "Angelyyn's Art",
        price: 250000,
        originalPrice: 275000,
        image: "img/chair1.png",
        rating: 4.7,
        reviews: 156,
        badge: "New",
        description: "Hand carved pillow+ backdrop",
        section: "chairs",
      },
      {
        id: 3010,
        title: "Chair 2",
        vendor: "CRS ART",
        price: 699845,
        originalPrice: 724000,
        image: "img/chair2.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
        description: "Single School chairs.",
        section: "chairs",
      },
      {
        id: 3011,
        title: "Chair3",
        vendor: "CRS ART",
        price: 752000,
        originalPrice: 774000,
        image: "img/chair3.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
        description: "Some fucktards chair.",
        section: "chairs",
      },
      {
        id: 3012,
        title: "chair 4",
        vendor: "CRS ART ",
        price: 289845,
        originalPrice: 319845,
        image: "img/chair4.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
        description: "stupid people chair",
        section: "chairs",
      },
      {
        id: 3013,
        title: "Furniture1",
        vendor: "CRS ART",
        price: 69984,
        originalPrice: 559845,
        image: "img/f1.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "Some Random Furniture",
        section: "chairs",
      },
      {
        id: 3014,
        title: "Furniture 2",
        vendor: "Art Art",
        price: 355984,
        originalPrice: 323984,
        image: "img/f2.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "Furniture from somewhere",
        section: "chairs",
      },
      {
        id: 3015,
        title: "Furniture",
        vendor: "CRS Art",
        price: 1199845,
        originalPrice: 9255984,
        image: "img/f3.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
        description: "Furniture premium phone.",
        section: "chairs",
      },
      {
        id: 3016,
        title: "Furniture 4",
        vendor: "GadgetGear",
        price: 765984,
        originalPrice: 6923984,
        image: "img/f4.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
        description: "Furniture From someones house.",
        section: "chairs",
      },
    ],
  };

  const detailedProducts = {
    1001: {
      id: 1001,
      title: "Iphone 16 128GB",
      vendor: "Gigs & Gadgets",
      price: 2100000,
      originalPrice: 2300000,
      image: "img/phones/a1.jpg",
      description: "Latest iPhone with 128GB storage.",
      images: [
        "img/phones/a1.jpg",
        "img/products/phone-a1-2.jpg",
        "img/products/phone-a1-3.jpg",
      ],
      rating: 4.7,
      reviews: 156,
    },
    1002: {
      id: 1002,
      title: "Iphone 13 pro 64GB",
      vendor: "GadgetGear",
      price: 699845,
      originalPrice: 724000,
      image: "img/phones/a2.jpg",
      description: "UK used iPhone 13 Pro with 64GB.",
      images: [
        "img/phones/a2.jpg",
        "img/products/phone-a2-2.jpg",
        "img/products/phone-a2-3.jpg",
      ],
      rating: 4.8,
      reviews: 189,
    },
    1003: {
      id: 1003,
      title: "IPhone 13 promax 256GB",
      vendor: "TechBits",
      price: 752000,
      originalPrice: 774000,
      image: "img/phones/a3.jpg",
      description: "UK used iPhone 13 Pro Max with 256GB.",
      images: [
        "img/phones/a3.jpg",
        "img/products/phone-a3-2.jpg",
        "img/products/phone-a3-3.jpg",
      ],
      rating: 4.6,
      reviews: 134,
    },
    1004: {
      id: 1004,
      title: "Iphone 8Plus 128GB",
      vendor: "GadgetGear",
      price: 289845,
      originalPrice: 319845,
      image: "img/phones/a4.jpg",
      description: "UK used iPhone 8 Plus with 128GB.",
      images: [
        "img/phones/a4.jpg",
        "img/products/phone-a4-2.jpg",
        "img/products/phone-a4-3.jpg",
      ],
      rating: 4.5,
      reviews: 167,
    },
  };

  // ==================== PRODUCT GRID LOADER ====================
  function loadProductGrids() {
    // Get all product grid containers on the page
    const productGrids = document.querySelectorAll("[data-product-grid]");

    productGrids.forEach((grid) => {
      const category = grid.dataset.productGrid;
      const section = grid.dataset.section || null;
      const isFeatured = grid.classList.contains("featured-grid");

      let products = [];

      if (isFeatured) {
        // For featured grids, combine products from featured categories
        featuredCategories.forEach((cat) => {
          if (productCategories[cat]) {
            products = products.concat(productCategories[cat]);
          }
        });
      } else if (category && productCategories[category]) {
        // For category-specific grids
        products = productCategories[category];

        // Filter by section if specified
        if (section) {
          products = products.filter((p) => p.section === section);
        }
      }

      // Display the products in this grid
      if (products.length > 0) {
        displayProductsInGrid(products, grid);
      }
    });
  }

  function displayProductsInGrid(products, container) {
    container.innerHTML = "";

    products.forEach((product) => {
      container.appendChild(createProductCard(product));
    });

    // Initialize any carousels within this grid if they exist
    const carousels = container.querySelectorAll(".products-carousel");
    carousels.forEach((carousel) => {
      initCarousel(carousel.closest(".tab-content") || container);
    });
  }

  // ==================== SEARCH AND FILTER SYSTEM ====================
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  const priceMinInput = document.querySelector(".price-min");
  const priceMaxInput = document.querySelector(".price-max");
  const applyFilterButton = document.querySelector(".apply-filter");
  const resetFilterButton = document.querySelector(".reset-filter");

  function getAllProducts() {
    const allProducts = [];
    for (const category in productCategories) {
      allProducts.push(...productCategories[category]);
    }
    return allProducts;
  }

  function searchProducts(products, searchTerm) {
    if (!searchTerm) return products;
    const searchLower = searchTerm.toLowerCase();
    return products.filter((product) =>
      [product.title, product.vendor, product.description || ""].some((field) =>
        field.toLowerCase().includes(searchLower)
      )
    );
  }

  function filterProductsByPrice(products, minPrice, maxPrice) {
    return products.filter((product) => {
      const price = product.price;
      const min =
        minPrice && !isNaN(minPrice) && Number(minPrice) >= 0
          ? Number(minPrice)
          : "";
      const max =
        maxPrice && !isNaN(maxPrice) && Number(maxPrice) >= 0
          ? Number(maxPrice)
          : "";
      return (min === "" || price >= min) && (max === "" || price <= max);
    });
  }

  function createProductCard(product) {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    const starsHtml = Array.from({ length: 5 }, (_, i) =>
      i < fullStars
        ? '<i class="fas fa-star" aria-hidden="true"></i>'
        : i === fullStars && hasHalfStar
        ? '<i class="fas fa-star-half-alt" aria-hidden="true"></i>'
        : '<i class="far fa-star" aria-hidden="true"></i>'
    ).join("");

    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.setAttribute(
      "aria-label",
      `Product: ${sanitizeInput(product.title)}`
    );

    const badge = product.badge
      ? `<span class="product-badge">${sanitizeInput(product.badge)}</span>`
      : "";
    const originalPrice = product.originalPrice
      ? `<span class="original-price">${formatNaira(
          product.originalPrice
        )}</span>`
      : "";

    productCard.innerHTML = `
      ${badge}
      <div class="product-image">
        <img src="${sanitizeInput(product.image)}" alt="${sanitizeInput(
      product.title
    )}" loading="lazy">
        <button class="quick-view-btn" data-product-id="${
          product.id
        }" aria-label="Quick view ${sanitizeInput(product.title)}">
          <i class="far fa-eye" aria-hidden="true"></i> Quick View
        </button>
      </div>
      <div class="product-info">
        <div class="product-vendor">${sanitizeInput(product.vendor)}</div>
        <h3 class="product-title">${sanitizeInput(product.title)}</h3>
        <div class="rating">
          <div class="rating-stars">${starsHtml}</div>
          <div class="rating-count">(${product.reviews})</div>
        </div>
        <div class="product-price">
          <span class="current-price">${formatNaira(product.price)}</span>
          ${originalPrice}
        </div>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${
            product.id
          }" aria-label="Add ${sanitizeInput(
      product.title
    )} to cart">Add to Cart</button>
          <button class="wishlist-btn" data-id="${
            product.id
          }" aria-label="Add ${sanitizeInput(
      product.title
    )} to wishlist"><i class="far fa-heart" aria-hidden="true"></i></button>
        </div>
      </div>
    `;
    return productCard;
  }

  function displayFilteredProducts(
    products,
    containerSelector = ".product-grid"
  ) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML =
      '<div class="loading" aria-live="polite">Loading products...</div>';

    setTimeout(() => {
      container.innerHTML = "";
      if (products.length === 0) {
        container.innerHTML = `
          <div class="no-results">
            <p>No products found matching your criteria.</p>
            <button class="reset-search-button" aria-label="Reset search and filters">Show All Products</button>
          </div>
        `;
        document
          .querySelector(".reset-search-button")
          ?.addEventListener("click", resetSearchAndFilters);
        return;
      }

      products.forEach((product) => {
        container.appendChild(createProductCard(product));
      });
    }, 100);
  }

  function applyAllFilters() {
    const searchTerm = searchInput.value.trim();
    const minPrice = priceMinInput.value.trim();
    const maxPrice = priceMaxInput.value.trim();

    let filteredProducts = getAllProducts();
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    filteredProducts = filterProductsByPrice(
      filteredProducts,
      minPrice,
      maxPrice
    );
    displayFilteredProducts(filteredProducts);
  }

  function resetSearchAndFilters() {
    searchInput.value = "";
    priceMinInput.value = "";
    priceMaxInput.value = "";
    loadProductGrids();
  }

  function initSearchAndFilter() {
    let debounceTimeout;
    if (searchButton) {
      searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        applyAllFilters();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("keyup", (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          if (e.key === "Enter") applyAllFilters();
        }, 300);
      });
    }

    if (applyFilterButton) {
      applyFilterButton.addEventListener("click", (e) => {
        e.preventDefault();
        applyAllFilters();
      });
    }

    if (resetFilterButton) {
      resetFilterButton.addEventListener("click", (e) => {
        e.preventDefault();
        resetSearchAndFilters();
      });
    }
  }

  // ==================== CART FUNCTIONALITY ====================
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage:", e);
    localStorage.removeItem("cart");
  }

  let wishlist = [];
  try {
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch (e) {
    console.error("Failed to parse wishlist from localStorage:", e);
    localStorage.removeItem("wishlist");
  }

  function saveCart() {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      if (document.querySelector(".cart-modal.active")) {
        renderCartModal();
      }
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
      showFlashMessage("Error saving cart. Please try again.");
    }
  }

  function saveWishlist() {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage:", e);
      showFlashMessage("Error saving wishlist. Please try again.");
    }
  }

  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      cartCount.setAttribute(
        "aria-label",
        `Cart contains ${cartCount.textContent} items`
      );
    } 
  }

  function showFlashMessage(message) {
    const flashMessage = document.querySelector(".flash-message");
    if (flashMessage) {
      flashMessage.textContent = message;
      flashMessage.classList.add("active");
      flashMessage.setAttribute("aria-live", "assertive");
      setTimeout(() => flashMessage.classList.remove("active"), 2000);
    }
  }

  function addToCart(product, quantity = 1) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    saveCart();
    showFlashMessage("Added to Cart");
  }

  function addToWishlist(product) {
    if (!wishlist.find((item) => item.id === product.id)) {
      wishlist.push(product);
      saveWishlist();
      showFlashMessage("Added to Wishlist");
    } else {
      showFlashMessage("Already in Wishlist");
    }
  }

  function renderCartModal() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalPrice = document.querySelector(".cart-total-price");
    if (!cartItemsContainer || !cartTotalPrice) return;

    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalPrice.textContent = "₦0.00";
      return;
    }

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${sanitizeInput(item.image)}" alt="${sanitizeInput(
        item.title
      )}" class="cart-item-image">
        <div class="cart-item-info">
          <h4>${sanitizeInput(item.title)}</h4>
          <p>${sanitizeInput(item.vendor)}</p>
          <p>${formatNaira(item.price)}</p>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-selector">
            <button class="quantity-minus" aria-label="Decrease quantity of ${sanitizeInput(
              item.title
            )}">-</button>
            <input type="number" value="${
              item.quantity
            }" min="1" aria-label="Quantity of ${sanitizeInput(item.title)}">
            <button class="quantity-plus" aria-label="Increase quantity of ${sanitizeInput(
              item.title
            )}">+</button>
          </div>
          <button class="remove-item" data-id="${
            item.id
          }" aria-label="Remove ${sanitizeInput(
        item.title
      )} from cart"><i class="fas fa-trash" aria-hidden="true"></i></button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotalPrice.textContent = formatNaira(total);
  }

  const cartBtn = document.querySelector(".cart-btn");
  const cartModal = document.querySelector(".cart-modal");
  const closeCartModalBtn = document.querySelector(".close-cart-modal");
  const clearCartBtn = document.querySelector(".clear-cart");
  const checkoutBtn = document.querySelector(".checkout");
  const cartModalOverlay = document.querySelector(".cart-modal .modal-overlay");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      cartModal.classList.add("active");
      document.body.style.overflow = "hidden";
      renderCartModal();
    });
  }

  if (closeCartModalBtn) {
    closeCartModalBtn.addEventListener("click", () => {
      cartModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (cartModalOverlay) {
    cartModalOverlay.addEventListener("click", () => {
      cartModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      saveCart();
    });
  }

  // ==================== CHECKOUT FUNCTIONALITY ====================
  const checkoutModal = document.querySelector(".checkout-modal");
  const closeCheckoutModalBtn = document.querySelector(".close-checkout-modal");
  const checkoutOverlay = document.querySelector(
    ".checkout-modal .modal-overlay"
  );
  const checkoutForms = document.querySelectorAll(".checkout-form");
  const checkoutSteps = document.querySelectorAll(".checkout-steps .step");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const cardDetails = document.querySelector(".card-details");
  const btnNextList = document.querySelectorAll(".btn-next");
  const btnPrevList = document.querySelectorAll(".btn-prev");
  const btnComplete = document.querySelector(".btn-complete");
  const summaryItemsContainer = document.querySelectorAll(".summary-items");
  const subtotalElements = document.querySelectorAll(".subtotal");
  const totalElements = document.querySelectorAll(".total");
  const shippingDetailsContent = document.querySelector(".details-content");

  function openCheckoutModal() {
    if (cart.length === 0) {
      showFlashMessage("Your cart is empty. Add some items first!");
      return;
    }

    checkoutModal.classList.add("active");
    document.body.style.overflow = "hidden";

    checkoutForms.forEach((form) => form.classList.remove("active"));
    document.getElementById("shipping-form").classList.add("active");

    checkoutSteps.forEach((step) => step.classList.remove("active"));
    checkoutSteps[0].classList.add("active");

    updateOrderSummary();
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateOrderSummary() {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const shipping = 1500; // Fixed shipping cost
    const total = subtotal + shipping;

    summaryItemsContainer.forEach((container) => {
      container.innerHTML = "";
      cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "summary-item";
        itemElement.innerHTML = `
          <span class="item-name">${sanitizeInput(item.title)}</span>
          <span class="item-quantity">x${item.quantity}</span>
          <span class="item-price">${formatNaira(
            item.price * item.quantity
          )}</span>
        `;
        container.appendChild(itemElement);
      });
    });

    subtotalElements.forEach((el) => {
      el.textContent = formatNaira(subtotal);
    });

    totalElements.forEach((el) => {
      el.textContent = formatNaira(total);
    });

    const orderNumber = `PAPRT-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    document.querySelector(".order-number span").textContent = orderNumber;

    updateShippingDetailsPreview();
  }

  function updateShippingDetailsPreview() {
    const form = document.getElementById("shipping-form");
    if (!form) return;

    const fields = {
      name: form.querySelector("#full-name")?.value || "Not provided",
      email: form.querySelector("#email")?.value || "Not provided",
      phone: form.querySelector("#phone")?.value || "Not provided",
      address: form.querySelector("#address")?.value || "Not provided",
      city: form.querySelector("#city")?.value || "Not provided",
      state: form.querySelector("#state")?.value || "Not provided",
    };

    shippingDetailsContent.innerHTML = `
      <p><strong>Name:</strong> ${sanitizeInput(fields.name)}</p>
      <p><strong>Email:</strong> ${sanitizeInput(fields.email)}</p>
      <p><strong>Phone:</strong> ${sanitizeInput(fields.phone)}</p>
      <p><strong>Address:</strong> ${sanitizeInput(fields.address)}</p>
      <p><strong>City:</strong> ${sanitizeInput(fields.city)}</p>
      <p><strong>State:</strong> ${sanitizeInput(fields.state)}</p>
    `;
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", openCheckoutModal);
  }

  if (closeCheckoutModalBtn) {
    closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
  }

  if (checkoutOverlay) {
    checkoutOverlay.addEventListener("click", closeCheckoutModal);
  }

  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("active"));
      this.classList.add("active");
      const methodType = this.dataset.method;
      cardDetails.classList.toggle("active", methodType === "card");
    });
  });

  btnNextList.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const currentForm = this.closest(".checkout-form");
      const nextFormId = this.dataset.next;
      const nextForm = document.getElementById(nextFormId);

      if (!nextForm) return;

      if (currentForm.id === "shipping-form") {
        let isValid = true;
        const requiredFields = currentForm.querySelectorAll("[required]");
        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = "red";
            field.addEventListener("input", function handler() {
              this.style.borderColor = "#ddd";
              this.removeEventListener("input", handler);
            });
          }
        });

        if (!isValid) {
          showFlashMessage("Please fill in all required fields");
          return;
        }

        updateShippingDetailsPreview();
      }

      const currentStep = Array.from(checkoutSteps).find((step) =>
        step.classList.contains("active")
      );
      const nextStepIndex = parseInt(currentStep.dataset.step);

      currentStep.classList.remove("active");
      checkoutSteps[nextStepIndex].classList.add("active");

      currentForm.classList.remove("active");
      nextForm.classList.add("active");

      nextForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  btnPrevList.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const currentForm = this.closest(".checkout-form");
      const prevFormId = this.dataset.prev;
      const prevForm = document.getElementById(prevFormId);

      if (!prevForm) return;

      const currentStep = Array.from(checkoutSteps).find((step) =>
        step.classList.contains("active")
      );
      const prevStepIndex = parseInt(currentStep.dataset.step) - 2;

      currentStep.classList.remove("active");
      checkoutSteps[prevStepIndex].classList.add("active");

      currentForm.classList.remove("active");
      prevForm.classList.add("active");

      prevForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (btnComplete) {
    btnComplete.addEventListener("click", function (e) {
      e.preventDefault();
      cart = [];
      saveCart();
      setTimeout(() => {
        closeCheckoutModal();
        showFlashMessage("Thank you for your order!");
      }, 1000);
    });
  }

  const cardNumberInput = document.getElementById("card-number");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function () {
      this.value = this.value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    });
  }

  const expiryDateInput = document.getElementById("expiry-date");
  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", function () {
      this.value = this.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2");
    });
  }

  // ==================== EVENT DELEGATION ====================
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-to-cart")) {
      const productId = e.target.closest(".add-to-cart").dataset.id;
      const product = getAllProducts().find((p) => p.id == productId);
      if (product) {
        const quantity = e.target.closest(".quick-view-modal")
          ? parseInt(
              document.querySelector(
                ".quick-view-modal .quantity-selector input"
              ).value
            ) || 1
          : 1;
        addToCart(product, quantity);
      }
    } else if (e.target.closest(".wishlist-btn")) {
      const productId = e.target.closest(".wishlist-btn").dataset.id;
      const product = getAllProducts().find((p) => p.id == productId);
      if (product) addToWishlist(product);
    } else if (e.target.closest(".quantity-minus")) {
      const input = e.target.nextElementSibling;
      const id = e.target.closest(".cart-item")?.querySelector(".remove-item")
        ?.dataset.id;
      if (input && id && input.value > 1) {
        const item = cart.find((item) => item.id == id);
        if (item) {
          item.quantity--;
          saveCart();
        }
      }
    } else if (e.target.closest(".quantity-plus")) {
      const input = e.target.previousElementSibling;
      const id = e.target.closest(".cart-item")?.querySelector(".remove-item")
        ?.dataset.id;
      if (input && id) {
        const item = cart.find((item) => item.id == id);
        if (item) {
          item.quantity++;
          saveCart();
        }
      }
    } else if (e.target.closest(".remove-item")) {
      const id = e.target.closest(".remove-item").dataset.id;
      cart = cart.filter((item) => item.id != id);
      saveCart();
    } else if (e.target.closest(".quick-view-btn")) {
      const productId = e.target.closest(".quick-view-btn").dataset.productId;
      openQuickViewModal(productId);
    } else if (e.target.closest(".close-modal")) {
      closeQuickViewModal();
    }
  });

  // ==================== DARK MODE ====================
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  darkModeToggle.addEventListener("change", function () {
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", this.checked ? "enabled" : "disabled");
  });

  // ==================== MOBILE MENU ====================
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");

  if (mobileMenuToggle && mobileMenu && mobileMenuOverlay && mobileMenuClose) {
    const mobileDropdowns = mobileMenu.querySelectorAll(".dropdown");
    mobileDropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector(".nav-link");
      link.setAttribute("tabindex", "0");
      link.setAttribute("aria-expanded", "false");
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const isActive = dropdown.classList.contains("active");
        mobileDropdowns.forEach((d) => {
          d.classList.remove("active");
          d.querySelector(".nav-link").setAttribute("aria-expanded", "false");
        });
        if (!isActive) {
          dropdown.classList.add("active");
          link.setAttribute("aria-expanded", "true");
        }
      });
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          link.click();
        }
      });
    });

    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      mobileMenuOverlay.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    function closeMobileMenu() {
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      mobileDropdowns.forEach((d) => {
        d.classList.remove("active");
        d.querySelector(".nav-link").setAttribute("aria-expanded", "false");
      });
      document.body.style.overflow = "";
    }

    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
    mobileMenuClose.addEventListener("click", closeMobileMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  }

  // ==================== CAROUSEL FUNCTIONALITY ====================
  const carouselIntervals = new Map();

  function initCarousel(tabContent) {
    const carousel = tabContent.querySelector(".products-carousel");
    if (!carousel) return;

    if (carouselIntervals.has(carousel)) {
      clearInterval(carouselIntervals.get(carousel));
      carouselIntervals.delete(carousel);
    }

    const items = carousel.querySelectorAll(".product-card");
    if (items.length > 0) {
      items.forEach((item) => {
        carousel.appendChild(item.cloneNode(true));
      });
    }

    const prevBtn = tabContent.querySelector(".carousel-prev");
    const nextBtn = tabContent.querySelector(".carousel-next");

    const getScrollAmount = () => {
      const card = carousel.querySelector(".product-card");
      return card ? card.offsetWidth + 20 : 300;
    };

    const scrollPrev = () => {
      carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    };

    const scrollNext = () => {
      carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      setTimeout(() => {
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth - 10
        ) {
          carousel.scrollTo({ left: 0, behavior: "instant" });
        }
      }, 500);
    };

    const updateButtons = () => {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = carousel.scrollLeft <= 10;
      nextBtn.disabled = false;
      prevBtn.setAttribute("aria-disabled", prevBtn.disabled);
      nextBtn.setAttribute("aria-disabled", nextBtn.disabled);
    };

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      pauseCarousel();
      scrollPrev();
      resetCarousel();
    });

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      pauseCarousel();
      scrollNext();
      resetCarousel();
    });

    carousel.addEventListener("scroll", updateButtons);
    updateButtons();

    const startCarousel = () => {
      if (carouselIntervals.has(carousel)) return;
      const interval = setInterval(scrollNext, 3000);
      carouselIntervals.set(carousel, interval);
    };

    const pauseCarousel = () => {
      if (carouselIntervals.has(carousel)) {
        clearInterval(carouselIntervals.get(carousel));
        carouselIntervals.delete(carousel);
      }
    };

    const resetCarousel = () => {
      pauseCarousel();
      startCarousel();
    };

    carousel.addEventListener("mouseenter", pauseCarousel);
    carousel.addEventListener("mouseleave", startCarousel);
    carousel.addEventListener("touchstart", pauseCarousel);
    carousel.addEventListener("touchend", startCarousel);

    startCarousel();
  }

  window.addEventListener("beforeunload", () => {
    carouselIntervals.forEach((interval) => clearInterval(interval));
    carouselIntervals.clear();
  });

  // ==================== TAB CAROUSELS ====================
  function initTabCarousels(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const tabBtns = section.querySelectorAll(".tab-btn");
    const tabContents = section.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        carouselIntervals.forEach((interval) => clearInterval(interval));
        carouselIntervals.clear();

        tabBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        this.setAttribute("aria-selected", "true");

        const tabId = this.dataset.tab;
        tabContents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === tabId) {
            content.classList.add("active");
            initCarousel(content);
          }
        });

        renderProducts(tabId, sectionSelector);
      });
    });

    const firstTab = section.querySelector(".tab-content.active");
    if (firstTab) {
      renderProducts(firstTab.id, sectionSelector);
      initCarousel(firstTab);
    }
  }

  function renderProducts(category, sectionSelector) {
    const products = productCategories[category];
    const carousel = document.querySelector(
      `${sectionSelector} #${category} .products-carousel`
    );
    if (!products || !carousel) return;

    carousel.innerHTML = "";
    products.forEach((product) => {
      carousel.appendChild(createProductCard(product));
    });
  }

  // ==================== QUICK VIEW FUNCTIONALITY ====================
  const quickViewModal = document.querySelector(".quick-view-modal");
  const modalOverlay = document.querySelector(".modal-overlay");

  function openQuickViewModal(productId) {
    let product = detailedProducts[productId];
    if (!product && productCategories) {
      for (const category in productCategories) {
        product = productCategories[category].find((p) => p.id == productId);
        if (product) {
          product.description =
            product.description || "No description available.";
          product.images = product.images || [product.image];
          break;
        }
      }
    }
    if (!product) {
      showFlashMessage("Product not found");
      return;
    }

    const modalInfo = document.querySelector(".modal-product-info");
    modalInfo.querySelector(".product-title").textContent = sanitizeInput(
      product.title
    );
    modalInfo.querySelector(".vendor").textContent = sanitizeInput(
      product.vendor
    );
    modalInfo.querySelector(".current-price").textContent = formatNaira(
      product.price
    );

    const originalPriceEl = modalInfo.querySelector(".original-price");
    if (product.originalPrice) {
      originalPriceEl.textContent = formatNaira(product.originalPrice);
      originalPriceEl.style.display = "inline";
    } else {
      originalPriceEl.style.display = "none";
    }

    modalInfo.querySelector(".product-description p").textContent =
      sanitizeInput(product.description);

    const ratingStars = modalInfo.querySelector(".rating-stars");
    ratingStars.innerHTML = "";
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      ratingStars.innerHTML +=
        i < fullStars
          ? '<i class="fas fa-star" aria-hidden="true"></i>'
          : i === fullStars && hasHalfStar
          ? '<i class="fas fa-star-half-alt" aria-hidden="true"></i>'
          : '<i class="far fa-star" aria-hidden="true"></i>';
    }

    modalInfo.querySelector(
      ".review-count"
    ).textContent = `(${product.reviews})`;

    const mainImage = document.querySelector(".main-image img");
    const thumbnailContainer = document.querySelector(".thumbnail-container");

    mainImage.src = sanitizeInput(product.images[0]);
    mainImage.alt = sanitizeInput(product.title);

    thumbnailContainer.innerHTML = "";
    product.images.forEach((img, index) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = `thumbnail ${index === 0 ? "active" : ""}`;
      thumbnail.innerHTML = `<img src="${sanitizeInput(
        img
      )}" alt="${sanitizeInput(product.title)} Thumbnail ${
        index + 1
      }" loading="lazy">`;
      thumbnail.addEventListener("click", () => {
        mainImage.src = sanitizeInput(img);
        document
          .querySelectorAll(".thumbnail")
          .forEach((t) => t.classList.remove("active"));
        thumbnail.classList.add("active");
      });
      thumbnailContainer.appendChild(thumbnail);
    });

    quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";

    const quickViewAddToCart = quickViewModal.querySelector(".add-to-cart");
    quickViewAddToCart.dataset.id = product.id;
  }

  function closeQuickViewModal() {
    quickViewModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && quickViewModal.classList.contains("active")) {
      closeQuickViewModal();
    }
  });

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeQuickViewModal);
  }

  // ==================== FONT AWESOME LOADING ====================
  if (typeof FontAwesome === "undefined") {
    console.warn("Font Awesome not loaded - loading from CDN");
    const faScript = document.createElement("script");
    faScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js";
    faScript.async = true;
    faScript.onload = () => {
      console.log("Font Awesome loaded successfully");
      loadProductGrids();
    };
    document.head.appendChild(faScript);
  }

  // ==================== INITIALIZATION ====================
  initSearchAndFilter();
  loadProductGrids();
  initTabCarousels(".featured-products");
  initTabCarousels(".fashion-products");
  initTabCarousels(".electronics-products");
  updateCartCount();

  // Global error handling
  window.addEventListener("error", (e) => {
    showFlashMessage("An error occurred. Please try again.");
    console.error("Global error:", e);
  });
});
