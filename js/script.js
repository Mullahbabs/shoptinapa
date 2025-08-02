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
      {
        id: 1017,
        title: "Xiaomi 13 Pro",
        vendor: "Tech Haven",
        price: 899999,
        originalPrice: 1099999,
        image: "img/phones/xiaomi/xiaomi13pro.jpg",
        rating: 4.5,
        reviews: 215,
        badge: "Popular",
        description: "Xiaomi flagship with Leica camera.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1018,
        title: "Redmi Note 12",
        vendor: "Gadget World",
        price: 249999,
        originalPrice: 299999,
        image: "img/phones/xiaomi/redminote12.jpg",
        rating: 4.2,
        reviews: 178,
        badge: "Best Value",
        description: "Affordable Xiaomi phone with AMOLED display.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1019,
        title: "Poco F5",
        vendor: "Mobile Express",
        price: 349999,
        originalPrice: 399999,
        image: "img/phones/xiaomi/pocof5.jpg",
        rating: 4.3,
        reviews: 156,
        badge: "Sale",
        description: "Powerful mid-range gaming phone.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1020,
        title: "Xiaomi 12T",
        vendor: "Tech Deals",
        price: 599999,
        originalPrice: 749999,
        image: "img/phones/xiaomi/xiaomi12t.png",
        rating: 4.4,
        reviews: 192,
        badge: "Limited Stock",
        description: "High-performance Xiaomi phone with 200MP camera.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1021,
        title: "Redmi 10C",
        vendor: "Budget Mobiles",
        price: 149999,
        originalPrice: 179999,
        image: "img/phones/xiaomi/redmi10c.jpg",
        rating: 4.0,
        reviews: 134,
        badge: "Essential",
        description: "Budget-friendly Xiaomi smartphone.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1022,
        title: "Black Shark 6",
        vendor: "Gaming Gear",
        price: 799999,
        originalPrice: 899999,
        image: "img/phones/xiaomi/blackshark6.jpg",
        rating: 4.6,
        reviews: 167,
        badge: "Gaming",
        description: "Xiaomi's ultimate gaming phone.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1023,
        title: "Xiaomi Mix Fold 2",
        vendor: "Luxury Tech",
        price: 1299999,
        originalPrice: 1499999,
        image: "img/phones/xiaomi/xiaomimixfold2.jpg",
        rating: 4.5,
        reviews: 89,
        badge: "Premium",
        description: "Foldable flagship by Xiaomi.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1024,
        title: "Redmi A2",
        vendor: "Everyday Phones",
        price: 89999,
        originalPrice: 99999,
        image: "img/phones/xiaomi/redmia2.jpg",
        rating: 3.9,
        reviews: 112,
        badge: "Budget",
        description: "Entry-level Xiaomi smartphone.",
        section: "smartphonesxiaomi",
      },
      {
        id: 1025,
        title: "OnePlus 11",
        vendor: "Elite Gadgets",
        price: 899999,
        originalPrice: 999999,
        image: "img/phones/oneplus/oneplus11.jpg",
        rating: 4.7,
        reviews: 231,
        badge: "Flagship",
        description: "OnePlus flagship with Hasselblad camera.",
        section: "smartphonesoneplus",
      },
      {
        id: 1026,
        title: "OnePlus Nord 3",
        vendor: "Tech Bazaar",
        price: 449999,
        originalPrice: 499999,
        image: "img/phones/oneplus/oneplusnord3.jpg",
        rating: 4.4,
        reviews: 187,
        badge: "Popular",
        description: "Premium mid-range OnePlus phone.",
        section: "smartphonesoneplus",
      },
      {
        id: 1027,
        title: "OnePlus 10T",
        vendor: "Gadget Hub",
        price: 699999,
        originalPrice: 799999,
        image: "img/phones/oneplus/oneplus10t.png",
        rating: 4.5,
        reviews: 154,
        badge: "Sale",
        description: "High-performance OnePlus device.",
        section: "smartphonesoneplus",
      },
      {
        id: 1028,
        title: "OnePlus Nord CE 3",
        vendor: "Mobile Deals",
        price: 349999,
        originalPrice: 399999,
        image: "img/phones/oneplus/oneplusnordce3.jpg",
        rating: 4.2,
        reviews: 132,
        badge: "Best Value",
        description: "Affordable OnePlus smartphone.",
        section: "smartphonesoneplus",
      },
      {
        id: 1029,
        title: "OnePlus Open",
        vendor: "Luxury Tech",
        price: 1399999,
        originalPrice: 1599999,
        image: "img/phones/oneplus/oneplusopen.jpg",
        rating: 4.6,
        reviews: 76,
        badge: "Premium",
        description: "OnePlus foldable flagship.",
        section: "smartphonesoneplus",
      },
      {
        id: 1030,
        title: "OnePlus 9RT",
        vendor: "Tech Discounts",
        price: 549999,
        originalPrice: 649999,
        image: "img/phones/oneplus/oneplus9rt.jpg",
        rating: 4.3,
        reviews: 143,
        badge: "Limited Stock",
        description: "Powerful OnePlus phone with Snapdragon 888.",
        section: "smartphonesoneplus",
      },
      {
        id: 1031,
        title: "OnePlus Nord N30",
        vendor: "Budget Mobiles",
        price: 299999,
        originalPrice: 349999,
        image: "img/phones/oneplus/oneplusnordn30.jpg",
        rating: 4.1,
        reviews: 98,
        badge: "Essential",
        description: "Budget-friendly OnePlus device.",
        section: "smartphonesoneplus",
      },
      {
        id: 1032,
        title: "OnePlus 8 Pro",
        vendor: "Refurbished Tech",
        price: 399999,
        originalPrice: 899999,
        image: "img/phones/oneplus/oneplus8pro.jpeg",
        rating: 4.4,
        reviews: 201,
        badge: "Refurbished",
        description: "Former flagship at a discount.",
        section: "smartphonesoneplus",
      },
      {
        id: 1033,
        title: "Google Pixel 8 Pro",
        vendor: "Tech Haven",
        price: 1099999,
        originalPrice: 1199999,
        image: "img/phones/google/pixel8pro.jpg",
        rating: 4.8,
        reviews: 245,
        badge: "Flagship",
        description: "Google's AI-powered flagship.",
        section: "smartphonesgoogle",
      },
      {
        id: 1034,
        title: "Google Pixel 7a",
        vendor: "Gadget World",
        price: 499999,
        originalPrice: 549999,
        image: "img/phones/google/pixel7a.jpg",
        rating: 4.5,
        reviews: 176,
        badge: "Best Value",
        description: "Affordable Pixel with great camera.",
        section: "smartphonesgoogle",
      },
      {
        id: 1035,
        title: "Google Pixel Fold",
        vendor: "Luxury Tech",
        price: 1499999,
        originalPrice: 1699999,
        image: "img/phones/google/pixelfold.jpg",
        rating: 4.6,
        reviews: 87,
        badge: "Premium",
        description: "Google's first foldable phone.",
        section: "smartphonesgoogle",
      },
      {
        id: 1036,
        title: "Google Pixel 6a",
        vendor: "Tech Deals",
        price: 399999,
        originalPrice: 449999,
        image: "img/phones/google/pixel6a.jpg",
        rating: 4.4,
        reviews: 198,
        badge: "Sale",
        description: "Compact and powerful Pixel.",
        section: "smartphonesgoogle",
      },
      {
        id: 1037,
        title: "Google Pixel 7",
        vendor: "Mobile Express",
        price: 799999,
        originalPrice: 899999,
        image: "img/phones/google/pixel7.png",
        rating: 4.7,
        reviews: 213,
        badge: "Popular",
        description: "Flagship Pixel with Tensor G2.",
        section: "smartphonesgoogle",
      },
      {
        id: 1038,
        title: "Google Pixel 5a",
        vendor: "Budget Mobiles",
        price: 349999,
        originalPrice: 399999,
        image: "img/phones/google/pixel5a.jpg",
        rating: 4.2,
        reviews: 145,
        badge: "Essential",
        description: "Budget Pixel with great battery life.",
        section: "smartphonesgoogle",
      },
      {
        id: 1039,
        title: "Google Pixel 4 XL",
        vendor: "Refurbished Tech",
        price: 299999,
        originalPrice: 799999,
        image: "img/phones/google/pixel4xl.jpeg",
        rating: 4.1,
        reviews: 132,
        badge: "Refurbished",
        description: "Classic Pixel with great camera.",
        section: "smartphonesgoogle",
      },
      {
        id: 1040,
        title: "Google Pixel 3a",
        vendor: "Everyday Phones",
        price: 199999,
        originalPrice: 299999,
        image: "img/phones/google/pixel3a.jpg",
        rating: 4.0,
        reviews: 167,
        badge: "Budget",
        description: "Older but reliable Pixel phone.",
        section: "smartphonesgoogle",
      },
      {
        id: 1041,
        title: "Oppo Find X6 Pro",
        vendor: "Elite Gadgets",
        price: 1099999,
        originalPrice: 1299999,
        image: "img/phones/oppo/oppofindx6pro.jpg",
        rating: 4.6,
        reviews: 189,
        badge: "Flagship",
        description: "Oppo's premium flagship with Hasselblad cameras.",
        section: "smartphonesoppo",
      },
      {
        id: 1042,
        title: "Oppo Reno 10 Pro",
        vendor: "Tech Bazaar",
        price: 549999,
        originalPrice: 649999,
        image: "img/phones/oppo/opporeno10pro.png",
        rating: 4.4,
        reviews: 156,
        badge: "Popular",
        description: "Sleek design with powerful cameras.",
        section: "smartphonesoppo",
      },
      {
        id: 1043,
        title: "Oppo A98",
        vendor: "Mobile Deals",
        price: 299999,
        originalPrice: 349999,
        image: "img/phones/oppo/oppoa98.png",
        rating: 4.1,
        reviews: 124,
        badge: "Best Value",
        description: "Mid-range Oppo with long battery life.",
        section: "smartphonesoppo",
      },
      {
        id: 1044,
        title: "Oppo Find N2 Flip",
        vendor: "Luxury Tech",
        price: 899999,
        originalPrice: 999999,
        image: "img/phones/oppo/oppofindn2flip.jpg",
        rating: 4.5,
        reviews: 98,
        badge: "Premium",
        description: "Oppo's stylish foldable phone.",
        section: "smartphonesoppo",
      },
      {
        id: 1045,
        title: "Oppo F21 Pro",
        vendor: "Gadget World",
        price: 349999,
        originalPrice: 399999,
        image: "img/phones/oppo/oppof21pro.jpg",
        rating: 4.2,
        reviews: 142,
        badge: "Sale",
        description: "Slim and stylish mid-ranger.",
        section: "smartphonesoppo",
      },
      {
        id: 1046,
        title: "Oppo A78",
        vendor: "Budget Mobiles",
        price: 249999,
        originalPrice: 279999,
        image: "img/phones/oppo/oppoa78.png",
        rating: 4.0,
        reviews: 112,
        badge: "Essential",
        description: "Affordable Oppo with decent specs.",
        section: "smartphonesoppo",
      },
      {
        id: 1047,
        title: "Oppo Reno 8T",
        vendor: "Tech Discounts",
        price: 399999,
        originalPrice: 449999,
        image: "img/phones/oppo/opporeno8t.jpg",
        rating: 4.3,
        reviews: 134,
        badge: "Limited Stock",
        description: "Great camera phone under budget.",
        section: "smartphonesoppo",
      },
      {
        id: 1048,
        title: "Oppo A58",
        vendor: "Everyday Phones",
        price: 179999,
        originalPrice: 199999,
        image: "img/phones/oppo/oppoa58.jpg",
        rating: 3.9,
        reviews: 87,
        badge: "Budget",
        description: "Entry-level Oppo smartphone.",
        section: "smartphonesoppo",
      },
      {
        id: 1049,
        title: "Tecno Phantom X2",
        vendor: "GadgetGear",
        price: 499999,
        originalPrice: 599999,
        image: "img/phones/tecno/tecnophantomx2.jpg",
        rating: 4.3,
        reviews: 145,
        badge: "Flagship",
        description: "Tecno's premium flagship phone.",
        section: "smartphonestecno",
      },
      {
        id: 1050,
        title: "Tecno Camon 20 Pro",
        vendor: "Tech Haven",
        price: 349999,
        originalPrice: 399999,
        image: "img/phones/tecno/tecnocamon20pro.jpg",
        rating: 4.2,
        reviews: 132,
        badge: "Popular",
        description: "Great camera phone for the price.",
        section: "smartphonestecno",
      },
      {
        id: 1051,
        title: "Tecno Spark 10 Pro",
        vendor: "Budget Mobiles",
        price: 149999,
        originalPrice: 179999,
        image: "img/phones/tecno/tecnospark10pro.jpeg",
        rating: 4.0,
        reviews: 98,
        badge: "Best Value",
        description: "Affordable Tecno with big display.",
        section: "smartphonestecno",
      },
      {
        id: 1052,
        title: "Tecno Pova 5",
        vendor: "Mobile Express",
        price: 199999,
        originalPrice: 229999,
        image: "img/phones/tecno/tecnopova5.jpg",
        rating: 4.1,
        reviews: 112,
        badge: "Essential",
        description: "Budget gaming phone with big battery.",
        section: "smartphonestecno",
      },
      {
        id: 1053,
        title: "Tecno Phantom V Fold",
        vendor: "Luxury Tech",
        price: 899999,
        originalPrice: 999999,
        image: "img/phones/tecno/tecnovfold.jpg",
        rating: 4.4,
        reviews: 76,
        badge: "Premium",
        description: "Tecno's first foldable phone.",
        section: "smartphonestecno",
      },
      {
        id: 1054,
        title: "Tecno Camon 18",
        vendor: "Tech Deals",
        price: 249999,
        originalPrice: 299999,
        image: "img/phones/tecno/tecnocamon18.jpg",
        rating: 4.0,
        reviews: 105,
        badge: "Sale",
        description: "Solid mid-range camera phone.",
        section: "smartphonestecno",
      },
      {
        id: 1055,
        title: "Tecno Spark Go",
        vendor: "Everyday Phones",
        price: 89999,
        originalPrice: 99999,
        image: "img/phones/tecno/tecnosparkgo.jpg",
        rating: 3.8,
        reviews: 89,
        badge: "Budget",
        description: "Ultra-affordable Tecno smartphone.",
        section: "smartphonestecno",
      },
      {
        id: 1056,
        title: "Tecno Pop 7",
        vendor: "Budget Mobiles",
        price: 69999,
        originalPrice: 79999,
        image: "img/phones/tecno/tecnopop7.jpeg",
        rating: 3.7,
        reviews: 67,
        badge: "Essential",
        description: "Basic smartphone for everyday use.",
        section: "smartphonestecno",
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
      {
        id: 3017,
        title: "Ekpe Mask",
        vendor: "Cross River Crafts",
        price: 45000,
        originalPrice: 60000,
        image: "img/mic/masks/ekpe.jpg",
        rating: 4.7,
        reviews: 56,
        badge: "Popular",
        description: "Hand-carved Ekpe secret society mask.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3018,
        title: "Ijebu Ancestral Mask",
        vendor: "Heritage Artisans",
        price: 38000,
        originalPrice: 50000,
        image: "img/mic/masks/ijebumask.jpg",
        rating: 4.5,
        reviews: 42,
        badge: "Traditional",
        description: "Ritual mask used in cultural ceremonies.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3019,
        title: "Efik Dance Mask",
        vendor: "Calabar Carvings",
        price: 32000,
        originalPrice: 45000,
        image: "img/mic/masks/efikmask.jpg",
        rating: 4.4,
        reviews: 38,
        badge: "Handmade",
        description: "Colorful ceremonial dance mask.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3020,
        title: "Leopard Spirit Mask",
        vendor: "Tribal Treasures",
        price: 55000,
        originalPrice: 75000,
        image: "img/mic/masks/leopardmask.jpg",
        rating: 4.8,
        reviews: 61,
        badge: "Premium",
        description: "Symbol of power and courage.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3021,
        title: "Miniature Warrior Mask",
        vendor: "Artisan Collective",
        price: 18000,
        originalPrice: 25000,
        image: "img/mic/masks/warriormask.jpg",
        rating: 4.2,
        reviews: 29,
        badge: "Small",
        description: "Decorative small mask for display.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3022,
        title: "Double-Faced Ritual Mask",
        vendor: "Mystic Carvings",
        price: 67000,
        originalPrice: 85000,
        image: "img/mic/masks/doublemask.jpg",
        rating: 4.6,
        reviews: 47,
        badge: "Rare",
        description: "Used in dual-purpose ceremonies.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3023,
        title: "Festival Celebration Mask",
        vendor: "Cross River Crafts",
        price: 42000,
        originalPrice: 55000,
        image: "img/mic/masks/festivalmask.jpg",
        rating: 4.3,
        reviews: 34,
        badge: "Colorful",
        description: "Worn during calabar carnival festivals.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3024,
        title: "Elder's Wisdom Mask",
        vendor: "Heritage Artisans",
        price: 60000,
        originalPrice: 80000,
        image: "img/mic/masks/elderlymask.jpg",
        rating: 4.7,
        reviews: 52,
        badge: "Sacred",
        description: "Represents ancestral wisdom.",
        section: "woodcarvingsmasks",
      },
      {
        id: 3025,
        title: "Wooden Wall Plaque",
        vendor: "Calabar Carvings",
        price: 25000,
        originalPrice: 35000,
        image: "img/mic/decor/wallplaque.jpg",
        rating: 4.5,
        reviews: 48,
        badge: "Wall Art",
        description: "Intricate African motifs for home decor.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3026,
        title: "Animal Figurine Set",
        vendor: "Tribal Treasures",
        price: 35000,
        originalPrice: 45000,
        image: "img/mic/decor/animalfigures.jpg",
        rating: 4.4,
        reviews: 37,
        badge: "Set of 3",
        description: "Elephant, lion, and giraffe carvings.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3027,
        title: "Royal Stool",
        vendor: "Heritage Artisans",
        price: 75000,
        originalPrice: 95000,
        image: "img/mic/decor/royalstool.jpg",
        rating: 4.8,
        reviews: 63,
        badge: "Premium",
        description: "Hand-carved stool for traditional settings.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3028,
        title: "Wooden Fruit Bowl",
        vendor: "Artisan Collective",
        price: 22000,
        originalPrice: 30000,
        image: "img/mic/decor/fruitbowl.jpg",
        rating: 4.3,
        reviews: 41,
        badge: "Functional",
        description: "Elegant handcrafted serving bowl.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3029,
        title: "Talking Drum Replica",
        vendor: "Cross River Crafts",
        price: 40000,
        originalPrice: 50000,
        image: "img/mic/decor/talkingdrum.jpg",
        rating: 4.6,
        reviews: 55,
        badge: "Decorative",
        description: "Miniature cultural drum for display.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3030,
        title: "Wooden Mirror Frame",
        vendor: "Mystic Carvings",
        price: 28000,
        originalPrice: 38000,
        image: "img/mic/decor/mirrorframe.jpg",
        rating: 4.4,
        reviews: 33,
        badge: "Handmade",
        description: "Ornate frame with tribal patterns.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3031,
        title: "Sculpted Bookends",
        vendor: "Tribal Treasures",
        price: 18000,
        originalPrice: 25000,
        image: "img/mic/decor/bookends.jpg",
        rating: 4.2,
        reviews: 27,
        badge: "Pair",
        description: "Carmel-shaped book holders.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3032,
        title: "Wooden Jewelry Box",
        vendor: "Calabar Carvings",
        price: 32000,
        originalPrice: 40000,
        image: "img/mic/decor/jewelrybox.jpg",
        rating: 4.5,
        reviews: 44,
        badge: "Gift",
        description: "Carved box with hidden compartments.",
        section: "woodcarvingsdecor",
      },
      {
        id: 3033,
        title: "Carved Wooden Spoon Set",
        vendor: "Artisan Collective",
        price: 15000,
        originalPrice: 20000,
        image: "img/mic/utensils/spoons.jpg",
        rating: 4.3,
        reviews: 39,
        badge: "Set of 5",
        description: "Eco-friendly kitchen utensils.",
        section: "woodcarvingsutensils",
      },
      {
        id: 3034,
        title: "Mortar & Pestle",
        vendor: "Heritage Artisans",
        price: 30000,
        originalPrice: 40000,
        image: "img/mic/utensils/mortar.png",
        rating: 4.6,
        reviews: 58,
        badge: "Traditional",
        description: "For grinding spices and herbs.",
        section: "woodcarvingsutensils",
      },
      {
        id: 3035,
        title: "Wooden Chopping Board",
        vendor: "Cross River Crafts",
        price: 20000,
        originalPrice: 28000,
        image: "img/mic/utensils/chopboard.jpg",
        rating: 4.4,
        reviews: 47,
        badge: "Durable",
        description: "Thick carved board for kitchens.",
        section: "woodcarvingsutensils",
      },
      {
        id: 3036,
        title: "Palm Wine Cup",
        vendor: "Tribal Treasures",
        price: 12000,
        originalPrice: 18000,
        image: "img/mic/utensils/palmwine.jpg",
        rating: 4.2,
        reviews: 31,
        badge: "Cultural",
        description: "Traditional cup for local wine.",
        section: "woodcarvingsutensils",
      },
      {
        id: 3037,
        title: "Wooden Salad Bowl",
        vendor: "Calabar Carvings",
        price: 25000,
        originalPrice: 35000,
        image: "img/mic/utensils/saladbowl.jpg",
        rating: 4.5,
        reviews: 42,
        badge: "Eco-Friendly",
        description: "Large serving bowl for meals.",
        section: "woodcarvingsutensils",
      },
      {
        id: 3038,
        title: "Carved Coconut Grater",
        vendor: "Mystic Carvings",
        price: 18000,
        originalPrice: 25000,
        image: "img/mic/utensils/coconutgrater.jpg",
        rating: 4.1,
        reviews: 28,
        badge: "Functional",
        description: "Traditional kitchen tool.",
        section: "woodcarvingsutensils",
      },
      {
        id: 3039,
        title: "Wooden Spice Rack",
        vendor: "Artisan Collective",
        price: 22000,
        originalPrice: 30000,
        image: "img/mic/utensils/spicerack.jpg",
        rating: 4.3,
        reviews: 35,
        badge: "Organizer",
        description: "Handy rack for kitchen spices.",
        section: "woodcarvingsutensils",
      },
      {
        id: 3040,
        title: "Carved Serving Tray",
        vendor: "Heritage Artisans",
        price: 35000,
        originalPrice: 45000,
        image: "img/mic/utensils/servingtray.jpg",
        rating: 4.7,
        reviews: 51,
        badge: "Luxury",
        description: "Elegant tray for hospitality.",
        section: "woodcarvingsutensils",
      },
    ],
    micbeadwork: [
      {
        id: 3200,
        title: "African Tribal Necklace",
        vendor: "Beads & Heritage",
        price: 15000,
        originalPrice: 20000,
        image: "img/beadworks/tribalnecklace.jpg",
        rating: 4.6,
        reviews: 68,
        badge: "Handmade",
        description: "Colorful traditional beaded necklace.",
        section: "beadworksnecklaces",
      },
      {
        id: 3201,
        title: "Crystal Elegance Necklace",
        vendor: "Glamour Beads",
        price: 25000,
        originalPrice: 35000,
        image: "img/beadworks/crystalnecklace.jpg",
        rating: 4.7,
        reviews: 92,
        badge: "Luxury",
        description: "Elegant crystal bead necklace for special occasions.",
        section: "beadworksnecklaces",
      },
      {
        id: 3202,
        title: "Wooden Bead Choker",
        vendor: "Eco Beads",
        price: 12000,
        originalPrice: 18000,
        image: "img/beadworks/woodenchoker.jpg",
        rating: 4.4,
        reviews: 57,
        badge: "Eco-Friendly",
        description: "Lightweight wooden bead choker.",
        section: "beadworksnecklaces",
      },
      {
        id: 3203,
        title: "Maasai-inspired Necklace",
        vendor: "Tribal Treasures",
        price: 18000,
        originalPrice: 25000,
        image: "img/beadworks/maasainecklace.jpg",
        rating: 4.5,
        reviews: 73,
        badge: "Cultural",
        description: "Vibrant Maasai-style beaded necklace.",
        section: "beadworksnecklaces",
      },
      {
        id: 3204,
        title: "Pearl & Bead Strand",
        vendor: "Classic Beads",
        price: 30000,
        originalPrice: 40000,
        image: "img/beadworks/pearlstrand.jpg",
        rating: 4.8,
        reviews: 85,
        badge: "Premium",
        description: "Sophisticated pearl and bead combination.",
        section: "beadworksnecklaces",
      },
      {
        id: 3205,
        title: "Leather Wrap Necklace",
        vendor: "Boho Beads",
        price: 22000,
        originalPrice: 30000,
        image: "img/beadworks/leatherwrap.jpg",
        rating: 4.3,
        reviews: 49,
        badge: "Bohemian",
        description: "Leather and bead wrap-around necklace.",
        section: "beadworksnecklaces",
      },
      {
        id: 3206,
        title: "Children's Beaded Necklace",
        vendor: "Little Treasures",
        price: 8000,
        originalPrice: 12000,
        image: "img/beadworks/kidsnecklace.jpg",
        rating: 4.2,
        reviews: 36,
        badge: "For Kids",
        description: "Colorful and safe beads for children.",
        section: "beadworksnecklaces",
      },
      {
        id: 3207,
        title: "Geometric Bead Necklace",
        vendor: "Modern Beads",
        price: 20000,
        originalPrice: 28000,
        image: "img/beadworks/geometricnecklace.jpg",
        rating: 4.5,
        reviews: 61,
        badge: "Contemporary",
        description: "Modern geometric bead design.",
        section: "beadworksnecklaces",
      },
      {
        id: 3208,
        title: "Stackable Bead Bracelets",
        vendor: "Beads & Heritage",
        price: 10000,
        originalPrice: 15000,
        image: "img/beadworks/stackablebracelets.jpg",
        rating: 4.5,
        reviews: 78,
        badge: "Set of 3",
        description: "Mix-and-match beaded bracelets.",
        section: "beadworksbracelets",
      },
      {
        id: 3209,
        title: "Healing Stone Bracelet",
        vendor: "Nature Beads",
        price: 18000,
        originalPrice: 25000,
        image: "img/beadworks/healingbracelet.jpg",
        rating: 4.6,
        reviews: 89,
        badge: "Spiritual",
        description: "Bracelet with natural healing stones.",
        section: "beadworksbracelets",
      },
      {
        id: 3210,
        title: "Friendship Bead Bracelet",
        vendor: "Boho Beads",
        price: 7000,
        originalPrice: 10000,
        image: "img/beadworks/friendshipbracelet.jpg",
        rating: 4.3,
        reviews: 54,
        badge: "Gift",
        description: "Handmade friendship bracelet.",
        section: "beadworksbracelets",
      },
      {
        id: 3211,
        title: "African Waist Beads",
        vendor: "Tribal Treasures",
        price: 12000,
        originalPrice: 18000,
        image: "img/beadworks/waistbeads.jpg",
        rating: 4.7,
        reviews: 102,
        badge: "Traditional",
        description: "Colorful waist beads for adornment.",
        section: "beadworksbracelets",
      },
      {
        id: 3212,
        title: "Leather Wrap Bracelet",
        vendor: "Eco Beads",
        price: 15000,
        originalPrice: 22000,
        image: "img/beadworks/leatherwrapbracelet.jpg",
        rating: 4.4,
        reviews: 67,
        badge: "Unisex",
        description: "Leather and bead wrap bracelet.",
        section: "beadworksbracelets",
      },
      {
        id: 3213,
        title: "Charm Bead Bracelet",
        vendor: "Glamour Beads",
        price: 20000,
        originalPrice: 28000,
        image: "img/beadworks/charmbracelet.jpg",
        rating: 4.5,
        reviews: 72,
        badge: "Fashion",
        description: "Bracelet with decorative charms.",
        section: "beadworksbracelets",
      },
      {
        id: 3214,
        title: "Adjustable Bead Bracelet",
        vendor: "Modern Beads",
        price: 9000,
        originalPrice: 13000,
        image: "img/beadworks/adjustablebracelet.jpg",
        rating: 4.2,
        reviews: 45,
        badge: "One Size",
        description: "Adjustable beaded bracelet for all.",
        section: "beadworksbracelets",
      },
      {
        id: 3215,
        title: "Bridal Bead Bracelet",
        vendor: "Classic Beads",
        price: 35000,
        originalPrice: 45000,
        image: "img/beadworks/bridalbracelet.jpg",
        rating: 4.8,
        reviews: 94,
        badge: "Wedding",
        description: "Elegant beads for bridal wear.",
        section: "beadworksbracelets",
      },
      {
        id: 3216,
        title: "Beaded Hoop Earrings",
        vendor: "Glamour Beads",
        price: 12000,
        originalPrice: 18000,
        image: "img/beadworks/hoopearrings.jpg",
        rating: 4.5,
        reviews: 63,
        badge: "Trendy",
        description: "Lightweight beaded hoop earrings.",
        section: "beadworksearrings",
      },
      {
        id: 3217,
        title: "Dangle Bead Earrings",
        vendor: "Beads & Heritage",
        price: 15000,
        originalPrice: 22000,
        image: "img/beadworks/dangleearrings.jpg",
        rating: 4.6,
        reviews: 78,
        badge: "Elegant",
        description: "Long dangle bead earrings.",
        section: "beadworksearrings",
      },
      {
        id: 3218,
        title: "Tribal Stud Earrings",
        vendor: "Tribal Treasures",
        price: 10000,
        originalPrice: 15000,
        image: "img/beadworks/tribalstuds.jpg",
        rating: 4.4,
        reviews: 56,
        badge: "Cultural",
        description: "Colorful tribal bead studs.",
        section: "beadworksearrings",
      },
      {
        id: 3219,
        title: "Beaded Tassel Earrings",
        vendor: "Boho Beads",
        price: 18000,
        originalPrice: 25000,
        image: "img/beadworks/tasselearrings.jpg",
        rating: 4.7,
        reviews: 82,
        badge: "Bohemian",
        description: "Playful tassel bead earrings.",
        section: "beadworksearrings",
      },
      {
        id: 3220,
        title: "Pearl Bead Earrings",
        vendor: "Classic Beads",
        price: 22000,
        originalPrice: 30000,
        image: "img/beadworks/pearlearrings.jpg",
        rating: 4.8,
        reviews: 91,
        badge: "Luxury",
        description: "Timeless pearl bead design.",
        section: "beadworksearrings",
      },
      {
        id: 3221,
        title: "Wooden Bead Earrings",
        vendor: "Eco Beads",
        price: 11000,
        originalPrice: 16000,
        image: "img/beadworks/woodenearrings.jpeg",
        rating: 4.3,
        reviews: 47,
        badge: "Eco-Friendly",
        description: "Lightweight wooden bead drops.",
        section: "beadworksearrings",
      },
      {
        id: 3222,
        title: "Bridal Bead Earrings",
        vendor: "Modern Beads",
        price: 28000,
        originalPrice: 38000,
        image: "img/beadworks/bridalearrings.png",
        rating: 4.9,
        reviews: 105,
        badge: "Wedding",
        description: "Elegant beads for bridal accessories.",
        section: "beadworksearrings",
      },
      {
        id: 3223,
        title: "Children's Bead Earrings",
        vendor: "Little Treasures",
        price: 7000,
        originalPrice: 10000,
        image: "img/beadworks/kidsearrings.jpg",
        rating: 4.2,
        reviews: 39,
        badge: "For Kids",
        description: "Safe and colorful bead earrings.",
        section: "beadworksearrings",
      },
      {
        id: 3224,
        title: "Sea Shell Anklet",
        vendor: "Nature Beads",
        price: 12000,
        originalPrice: 18000,
        image: "img/beadworks/seashellanklet.jpg",
        rating: 4.5,
        reviews: 67,
        badge: "Beach",
        description: "Natural shell and bead anklet.",
        section: "beadworksanklets",
      },
      {
        id: 3225,
        title: "Adjustable Bead Anklet",
        vendor: "Boho Beads",
        price: 10000,
        originalPrice: 15000,
        image: "img/beadworks/adjustableanklet.jpeg",
        rating: 4.4,
        reviews: 58,
        badge: "One Size",
        description: "Fits all ankle sizes.",
        section: "beadworksanklets",
      },
      {
        id: 3226,
        title: "African Waist Anklet",
        vendor: "Tribal Treasures",
        price: 15000,
        originalPrice: 22000,
        image: "img/beadworks/waistanklet.jpg",
        rating: 4.6,
        reviews: 74,
        badge: "Traditional",
        description: "Beaded anklet for cultural wear.",
        section: "beadworksanklets",
      },
      {
        id: 3227,
        title: "Charm Anklet",
        vendor: "Glamour Beads",
        price: 18000,
        originalPrice: 25000,
        image: "img/beadworks/charmanklet.jpg",
        rating: 4.5,
        reviews: 63,
        badge: "Fashion",
        description: "Anklet with decorative charms.",
        section: "beadworksanklets",
      },
      {
        id: 3228,
        title: "Leather Wrap Anklet",
        vendor: "Eco Beads",
        price: 14000,
        originalPrice: 20000,
        image: "img/beadworks/leatheranklet.jpg",
        rating: 4.3,
        reviews: 49,
        badge: "Bohemian",
        description: "Leather and bead wrap design.",
        section: "beadworksanklets",
      },
      {
        id: 3229,
        title: "Bridal Bead Anklet",
        vendor: "Classic Beads",
        price: 25000,
        originalPrice: 35000,
        image: "img/beadworks/bridalanklet.jpg",
        rating: 4.7,
        reviews: 81,
        badge: "Wedding",
        description: "Elegant anklet for brides.",
        section: "beadworksanklets",
      },
      {
        id: 3230,
        title: "Kids' Bead Anklet",
        vendor: "Little Treasures",
        price: 8000,
        originalPrice: 12000,
        image: "img/beadworks/kidsanklet.jpg",
        rating: 4.2,
        reviews: 42,
        badge: "For Kids",
        description: "Colorful and safe for children.",
        section: "beadworksanklets",
      },
      {
        id: 3231,
        title: "Healing Stone Anklet",
        vendor: "Nature Beads",
        price: 16000,
        originalPrice: 23000,
        image: "img/beadworks/healinganklet.jpg",
        rating: 4.6,
        reviews: 69,
        badge: "Spiritual",
        description: "Anklet with natural gemstones.",
        section: "beadworksanklets",
      },
      {
        id: 3232,
        title: "Beaded Curtain",
        vendor: "Boho Beads",
        price: 35000,
        originalPrice: 50000,
        image: "img/beadworks/beadedcurtain.jpg",
        rating: 4.5,
        reviews: 72,
        badge: "Decorative",
        description: "Colorful bead room divider.",
        section: "beadworkshome",
      },
      {
        id: 3233,
        title: "Beaded Lamp Shade",
        vendor: "Glamour Beads",
        price: 40000,
        originalPrice: 55000,
        image: "img/beadworks/lampshade.jpg",
        rating: 4.6,
        reviews: 65,
        badge: "Luxury",
        description: "Handmade beaded lamp cover.",
        section: "beadworkshome",
      },
      {
        id: 3234,
        title: "Beaded Wall Hanging",
        vendor: "Tribal Treasures",
        price: 28000,
        originalPrice: 40000,
        image: "img/beadworks/wallhanging.jpg",
        rating: 4.4,
        reviews: 58,
        badge: "Traditional",
        description: "Intricate bead wall art.",
        section: "beadworkshome",
      },
      {
        id: 3235,
        title: "Beaded Coaster Set",
        vendor: "Modern Beads",
        price: 15000,
        originalPrice: 22000,
        image: "img/beadworks/coasters.jpg",
        rating: 4.3,
        reviews: 47,
        badge: "Set of 6",
        description: "Colorful beaded coasters.",
        section: "beadworkshome",
      },
      {
        id: 3236,
        title: "Beaded Table Runner",
        vendor: "Classic Beads",
        price: 45000,
        originalPrice: 60000,
        image: "img/beadworks/tablerunner.jpg",
        rating: 4.7,
        reviews: 84,
        badge: "Premium",
        description: "Elegant beaded dining decor.",
        section: "beadworkshome",
      },
      {
        id: 3237,
        title: "Beaded Dream Catcher",
        vendor: "Nature Beads",
        price: 22000,
        originalPrice: 30000,
        image: "img/beadworks/dreamcatcher.jpg",
        rating: 4.5,
        reviews: 63,
        badge: "Spiritual",
        description: "Beaded dream catcher for walls.",
        section: "beadworkshome",
      },
      {
        id: 3238,
        title: "Beaded Key Holder",
        vendor: "Eco Beads",
        price: 12000,
        originalPrice: 18000,
        image: "img/beadworks/keyholder.jpeg",
        rating: 4.2,
        reviews: 39,
        badge: "Functional",
        description: "Decorative bead key organizer.",
        section: "beadworkshome",
      },
      {
        id: 3239,
        title: "Beaded Candle Holder",
        vendor: "Beads & Heritage",
        price: 18000,
        originalPrice: 25000,
        image: "img/beadworks/candleholder.jpg",
        rating: 4.4,
        reviews: 51,
        badge: "Handmade",
        description: "Bead-encrusted candle stand.",
        section: "beadworkshome",
      },
    ],
    textiles: [
      {
        id: 3248,
        title: "Ekpe Society Raffia Cloth",
        vendor: "Cross River Heritage",
        price: 45000,
        originalPrice: 60000,
        image: "img/textiles/ekperaffia.jpg",
        rating: 4.7,
        reviews: 68,
        badge: "Sacred",
        description: "Handwoven raffia textile used in Ekpe rituals.",
        section: "textilesekpe",
      },
      {
        id: 3249,
        title: "Indigo-Dyed Ekpe Wrap",
        vendor: "Tribal Weavers",
        price: 38000,
        originalPrice: 50000,
        image: "img/textiles/ekpeindigo.jpg",
        rating: 4.5,
        reviews: 52,
        badge: "Traditional",
        description: "Deep blue ceremonial wrapper with Ekpe motifs.",
        section: "textilesekpe",
      },
      {
        id: 3250,
        title: "Ekpe Initiation Shawl",
        vendor: "Calabar Crafts",
        price: 55000,
        originalPrice: 75000,
        image: "img/textiles/ekpeshawl.jpg",
        rating: 4.8,
        reviews: 73,
        badge: "Ritual",
        description: "White hand-embroidered shawl for new initiates.",
        section: "textilesekpe",
      },
      {
        id: 3251,
        title: "Beaded Ekpe Sash",
        vendor: "Heritage Artisans",
        price: 32000,
        originalPrice: 45000,
        image: "img/textiles/ekpesash.jpg",
        rating: 4.6,
        reviews: 47,
        badge: "Handmade",
        description: "Leather sash with glass beads and cowrie shells.",
        section: "textilesekpe",
      },
      {
        id: 3252,
        title: "Ekpe Masquerade Skirt",
        vendor: "Mystic Textiles",
        price: 42000,
        originalPrice: 55000,
        image: "img/textiles/ekpeskirt.jpg",
        rating: 4.4,
        reviews: 39,
        badge: "Performance",
        description: "Colorful raffia skirt for masquerade dances.",
        section: "textilesekpe",
      },
      {
        id: 3253,
        title: "Royal Ekpe Tunic",
        vendor: "Kingship Crafts",
        price: 75000,
        originalPrice: 95000,
        image: "img/textiles/ekpetunic.jpg",
        rating: 4.9,
        reviews: 85,
        badge: "Elite",
        description: "Hand-stitched tunic for high-ranking members.",
        section: "textilesekpe",
      },
      {
        id: 3254,
        title: "Ekpe Symbol Cloth",
        vendor: "Symbolic Weaves",
        price: 28000,
        originalPrice: 38000,
        image: "img/textiles/ekpesymbols.jpg",
        rating: 4.3,
        reviews: 34,
        badge: "Decorative",
        description: "Cotton fabric with woven Ekpe hieroglyphs.",
        section: "textilesekpe",
      },
      {
        id: 3255,
        title: "Mini Ekpe Banner",
        vendor: "Ritual Textiles",
        price: 18000,
        originalPrice: 25000,
        image: "img/textiles/ekpebanner.jpg",
        rating: 4.2,
        reviews: 28,
        badge: "Collector",
        description: "Small ceremonial banner with appliqué designs.",
        section: "textilesekpe",
      },
      {
        id: 3264,
        title: "Efik George Wrapper",
        vendor: "Calabar Royalty",
        price: 85000,
        originalPrice: 110000,
        image: "img/textiles/efikgeorge.jpg",
        rating: 4.9,
        reviews: 105,
        badge: "Luxury",
        description: "Exquisite brocade for brides and titled women.",
        section: "textilesefik",
      },
      {
        id: 3265,
        title: "Ndem God Cloth",
        vendor: "Sacred Textiles",
        price: 60000,
        originalPrice: 80000,
        image: "img/textiles/efikndem.jpg",
        rating: 4.7,
        reviews: 82,
        badge: "Sacred",
        description: "Ritual fabric with spiritual symbols.",
        section: "textilesefik",
      },
      {
        id: 3266,
        title: "Efik Beaded Blouse",
        vendor: "Beaded Elegance",
        price: 45000,
        originalPrice: 60000,
        image: "img/textiles/efikblouse.jpg",
        rating: 4.6,
        reviews: 67,
        badge: "Bridal",
        description: "Off-shoulder top with coral beadwork.",
        section: "textilesefik",
      },
      {
        id: 3267,
        title: "Fatake Print Fabric",
        vendor: "Modern Efik",
        price: 20000,
        originalPrice: 28000,
        image: "img/textiles/efikfatake.jpg",
        rating: 4.3,
        reviews: 53,
        badge: "Everyday",
        description: "Vibrant wax print with Efik proverbs.",
        section: "textilesefik",
      },
      {
        id: 3268,
        title: "Efik Raffia Dance Skirt",
        vendor: "Performance Textiles",
        price: 35000,
        originalPrice: 45000,
        image: "img/textiles/efikraffia.jpg",
        rating: 4.5,
        reviews: 61,
        badge: "Festival",
        description: "Rustling skirt for Ekombi dancers.",
        section: "textilesefik",
      },
      {
        id: 3269,
        title: "Royal Efik Umbrella",
        vendor: "Regal Accessories",
        price: 95000,
        originalPrice: 120000,
        image: "img/textiles/efikumbrella.jpg",
        rating: 4.8,
        reviews: 78,
        badge: "Prestige",
        description: "Hand-embroidered parasol for chiefs.",
        section: "textilesefik",
      },
      {
        id: 3270,
        title: "Efik Indigo Headwrap",
        vendor: "Heritage Dyers",
        price: 18000,
        originalPrice: 25000,
        image: "img/textiles/efikheadwrap.jpeg",
        rating: 4.4,
        reviews: 47,
        badge: "Classic",
        description: "Tie-dyed gele with intricate patterns.",
        section: "textilesefik",
      },
      {
        id: 3271,
        title: "Efik Children's Ceremonial Dress",
        vendor: "Little Royals",
        price: 30000,
        originalPrice: 40000,
        image: "img/textiles/efikkids.jpg",
        rating: 4.6,
        reviews: 55,
        badge: "Heirloom",
        description: "Miniature version of adult regalia.",
        section: "textilesefik",
      },
      {
        id: 3280,
        title: "Cross River Raffia Cloth",
        vendor: "Eco Weavers",
        price: 20000,
        originalPrice: 28000,
        image: "img/textiles/crraffia.jpg",
        rating: 4.5,
        reviews: 67,
        badge: "Eco-Friendly",
        description: "Sustainable handwoven raffia fabric.",
        section: "textilesgeneral",
      },
      {
        id: 3281,
        title: "Tie-Dye Adire Cross River",
        vendor: "Indigo Masters",
        price: 25000,
        originalPrice: 35000,
        image: "img/textiles/cradire.jpg",
        rating: 4.6,
        reviews: 73,
        badge: "Traditional",
        description: "Locally dyed cotton with unique patterns.",
        section: "textilesgeneral",
      },
      {
        id: 3282,
        title: "Batik Cross River Map",
        vendor: "Modern Heritage",
        price: 30000,
        originalPrice: 40000,
        image: "img/textiles/crmapbatik.jpg",
        rating: 4.4,
        reviews: 58,
        badge: "Decorative",
        description: "Fabric depicting Cross River landmarks.",
        section: "textilesgeneral",
      },
      {
        id: 3283,
        title: "Palm Fiber Cross River Mat",
        vendor: "Natural Crafts",
        price: 15000,
        originalPrice: 22000,
        image: "img/textiles/crmat.jpg",
        rating: 4.3,
        reviews: 49,
        badge: "Functional",
        description: "Durable woven mat for home use.",
        section: "textilesgeneral",
      },
      {
        id: 3284,
        title: "Cross River Festival Banner",
        vendor: "Celebration Textiles",
        price: 35000,
        originalPrice: 45000,
        image: "img/textiles/crbanner.jpg",
        rating: 4.5,
        reviews: 61,
        badge: "Event",
        description: "Colorful hanging for cultural festivals.",
        section: "textilesgeneral",
      },
      {
        id: 3285,
        title: "Cross River Story Quilt",
        vendor: "Narrative Arts",
        price: 55000,
        originalPrice: 70000,
        image: "img/textiles/crquilt.jpg",
        rating: 4.7,
        reviews: 82,
        badge: "Heirloom",
        description: "Patchwork telling community stories.",
        section: "textilesgeneral",
      },
      {
        id: 3286,
        title: "Cross River Jute Bag",
        vendor: "Eco Bags",
        price: 12000,
        originalPrice: 18000,
        image: "img/textiles/crbag.jpg",
        rating: 4.4,
        reviews: 53,
        badge: "Sustainable",
        description: "Handmade bag from natural fibers.",
        section: "textilesgeneral",
      },
      {
        id: 3287,
        title: "Cross River Ceremonial Curtain",
        vendor: "Ritual Textiles",
        price: 45000,
        originalPrice: 60000,
        image: "img/textiles/crcurtain.jpg",
        rating: 4.6,
        reviews: 67,
        badge: "Sacred",
        description: "Heavy fabric for traditional shrines.",
        section: "textilesgeneral",
      },
      {
        id: 3288,
        title: "Ankara-Efik Fusion Dress",
        vendor: "Fashion Fusion",
        price: 35000,
        originalPrice: 45000,
        image: "img/textiles/modernankara.jpg",
        rating: 4.7,
        reviews: 89,
        badge: "Contemporary",
        description: "Blend of traditional motifs with modern Ankara.",
        section: "textilesmodern",
      },
      {
        id: 3289,
        title: "Cross River Denim Jacket",
        vendor: "Urban Heritage",
        price: 45000,
        originalPrice: 60000,
        image: "img/textiles/modernjacket.jpg",
        rating: 4.6,
        reviews: 76,
        badge: "Streetwear",
        description: "Denim with embroidered Efik proverbs.",
        section: "textilesmodern",
      },
      {
        id: 3290,
        title: "Bridal Lace with Beads",
        vendor: "Modern Bridal",
        price: 65000,
        originalPrice: 85000,
        image: "img/textiles/modernlace.jpg",
        rating: 4.8,
        reviews: 102,
        badge: "Wedding",
        description: "Contemporary lace with traditional beadwork.",
        section: "textilesmodern",
      },
      {
        id: 3291,
        title: "Cross River Sneakers",
        vendor: "Fusion Footwear",
        price: 30000,
        originalPrice: 40000,
        image: "img/textiles/modernsneakers.jpg",
        rating: 4.5,
        reviews: 68,
        badge: "Trendy",
        description: "Canvas shoes with tribal fabric accents.",
        section: "textilesmodern",
      },
      {
        id: 3292,
        title: "Unisex Tribal Scarf",
        vendor: "Urban Nomad",
        price: 18000,
        originalPrice: 25000,
        image: "img/textiles/modernscarf.jpg",
        rating: 4.4,
        reviews: 57,
        badge: "Unisex",
        description: "Lightweight scarf with nsibidi prints.",
        section: "textilesmodern",
      },
      {
        id: 3293,
        title: "Cross River Throw Pillow",
        vendor: "Home Fusion",
        price: 22000,
        originalPrice: 30000,
        image: "img/textiles/modernpillow.jpg",
        rating: 4.6,
        reviews: 73,
        badge: "Decor",
        description: "Cushion cover with raffia-print fabric.",
        section: "textilesmodern",
      },
      {
        id: 3294,
        title: "Tote Bag with Proverbs",
        vendor: "Proverbial Designs",
        price: 15000,
        originalPrice: 22000,
        image: "img/textiles/modernbag.jpg",
        rating: 4.3,
        reviews: 49,
        badge: "Practical",
        description: "Cotton bag with Efik wisdom sayings.",
        section: "textilesmodern",
      },
      {
        id: 3295,
        title: "Cross River Tech Case",
        vendor: "Digital Tradition",
        price: 20000,
        originalPrice: 28000,
        image: "img/textiles/moderncase.jpg",
        rating: 4.5,
        reviews: 61,
        badge: "Gadget",
        description: "Laptop sleeve with tribal textile lining.",
        section: "textilesmodern",
      },
    ],
    mpottery: [
      {
        id: 3296,
        title: "Ekpe Society Offering Bowl",
        vendor: "Sacred Clay Arts",
        price: 35000,
        originalPrice: 45000,
        image: "img/pottery/ekpebowl.jpg",
        rating: 4.8,
        reviews: 72,
        badge: "Sacred",
        description:
          "Hand-coiled terracotta bowl for libations, adorned with nsibidi symbols.",
        section: "potteryritual",
      },
      {
        id: 3297,
        title: "Ancestral Spirit Vessel",
        vendor: "Heritage Pottery",
        price: 45000,
        originalPrice: 60000,
        image: "img/pottery/ancestralvessel.jpg",
        rating: 4.7,
        reviews: 65,
        badge: "Ritual",
        description:
          "Black-fired pottery with carved faces for communicating with ancestors.",
        section: "potteryritual",
      },
      {
        id: 3298,
        title: "Efik Healing Pot",
        vendor: "Clay Healers",
        price: 30000,
        originalPrice: 40000,
        image: "img/pottery/healingpot.jpg",
        rating: 4.6,
        reviews: 58,
        badge: "Medicinal",
        description: "Porous clay pot for preparing herbal remedies.",
        section: "potteryritual",
      },
      {
        id: 3299,
        title: "Efik Bride's Water Jar",
        vendor: "Marriage Traditions",
        price: 40000,
        originalPrice: 55000,
        image: "img/pottery/bridesjar.jpeg",
        rating: 4.5,
        reviews: 49,
        badge: "Bridal",
        description:
          "Slender-necked vessel used in pre-wedding purification rites.",
        section: "potteryritual",
      },
      {
        id: 3300,
        title: "Twin Memorial Effigy",
        vendor: "Spirit Clay",
        price: 60000,
        originalPrice: 80000,
        image: "img/pottery/twineffigy.jpg",
        rating: 4.9,
        reviews: 87,
        badge: "Commemorative",
        description:
          "Sculpted pottery honoring departed twins in Ibibio culture.",
        section: "potteryritual",
      },
      {
        id: 3301,
        title: "New Yam Festival Plate",
        vendor: "Harvest Pottery",
        price: 25000,
        originalPrice: 35000,
        image: "img/pottery/yamplate.jpg",
        rating: 4.4,
        reviews: 42,
        badge: "Festival",
        description:
          "Wide ceremonial dish for presenting first harvest offerings.",
        section: "potteryritual",
      },
      {
        id: 3302,
        title: "Divination Pot Set",
        vendor: "Oracle Clay",
        price: 55000,
        originalPrice: 75000,
        image: "img/pottery/divinationset.jpg",
        rating: 4.7,
        reviews: 63,
        badge: "Sacred",
        description:
          "Three-piece terracotta set for traditional fortune-telling.",
        section: "potteryritual",
      },
      {
        id: 3303,
        title: "Ancestor Staff Holder",
        vendor: "Lineage Pottery",
        price: 32000,
        originalPrice: 45000,
        image: "img/pottery/staffholder.jpg",
        rating: 4.5,
        reviews: 51,
        badge: "Ancestral",
        description:
          "Heavy base for displaying family staffs during ceremonies.",
        section: "potteryritual",
      },
      {
        id: 3304,
        title: "Calabar Pepper Soup Pot",
        vendor: "Spice Clay",
        price: 28000,
        originalPrice: 38000,
        image: "img/pottery/peppersouppot.jpg",
        rating: 4.6,
        reviews: 78,
        badge: "Classic",
        description: "Glazed interior pot for slow-cooking spicy broths.",
        section: "potteryculinary",
      },
      {
        id: 3305,
        title: "Palm Oil Storage Jar",
        vendor: "Village Potters",
        price: 35000,
        originalPrice: 48000,
        image: "img/pottery/palmoiljar.jpg",
        rating: 4.7,
        reviews: 85,
        badge: "Functional",
        description:
          "Wide-mouthed vessel with natural oil-preserving properties.",
        section: "potteryculinary",
      },
      {
        id: 3306,
        title: "Smoked Fish Grill Plate",
        vendor: "Fishermen Clay",
        price: 32000,
        originalPrice: 45000,
        image: "img/pottery/fishgrill.jpg",
        rating: 4.5,
        reviews: 63,
        badge: "Specialty",
        description:
          "Perforated plate for open-fire smoking of freshwater fish.",
        section: "potteryculinary",
      },
      {
        id: 3307,
        title: "Waterleaf Stew Pot",
        vendor: "Greens Pottery",
        price: 25000,
        originalPrice: 35000,
        image: "img/pottery/waterleafpot.jpg",
        rating: 4.4,
        reviews: 57,
        badge: "Traditional",
        description: "Short-handled pot for preparing native vegetable dishes.",
        section: "potteryculinary",
      },
      {
        id: 3308,
        title: "Pounded Yam Mortar",
        vendor: "Yam Pounders",
        price: 65000,
        originalPrice: 85000,
        image: "img/pottery/yammortar.jpg",
        rating: 4.8,
        reviews: 92,
        badge: "Heavy Duty",
        description:
          "Thick-walled mortar for pounding yam (not for sale outside CRS).",
        section: "potteryculinary",
      },
      {
        id: 3309,
        title: "Palm Wine Fermentation Vat",
        vendor: "Brewer's Clay",
        price: 45000,
        originalPrice: 60000,
        image: "img/pottery/palmwinevat.jpg",
        rating: 4.6,
        reviews: 71,
        badge: "Specialized",
        description: "Double-walled vessel for traditional wine fermentation.",
        section: "potteryculinary",
      },
      {
        id: 3310,
        title: "Community Serving Bowl",
        vendor: "Ubuntu Pottery",
        price: 38000,
        originalPrice: 50000,
        image: "img/pottery/communitybowl.jpg",
        rating: 4.5,
        reviews: 64,
        badge: "Feast",
        description: "Extra-large bowl for village gatherings (serves 15-20).",
        section: "potteryculinary",
      },
      {
        id: 3311,
        title: "Children's Learning Pot",
        vendor: "Little Potters",
        price: 15000,
        originalPrice: 22000,
        image: "img/pottery/kidspot.jpg",
        rating: 4.3,
        reviews: 42,
        badge: "Educational",
        description: "Miniature pot for teaching cooking traditions.",
        section: "potteryculinary",
      },
      {
        id: 3312,
        title: "Cross River Water Cooler",
        vendor: "Eco Clay",
        price: 30000,
        originalPrice: 40000,
        image: "img/pottery/watercooler.jpg",
        rating: 4.7,
        reviews: 89,
        badge: "Functional",
        description: "Porous clay vessel that naturally chills water.",
        section: "potterydomestic",
      },
      {
        id: 3313,
        title: "Oil Lamp Set",
        vendor: "Heritage Lighting",
        price: 22000,
        originalPrice: 30000,
        image: "img/pottery/oillamp.jpg",
        rating: 4.5,
        reviews: 67,
        badge: "Traditional",
        description: "Three-piece palm oil lamp set with spare reservoirs.",
        section: "potterydomestic",
      },
      {
        id: 3314,
        title: "Compound Decorative Urn",
        vendor: "Garden Clay",
        price: 45000,
        originalPrice: 60000,
        image: "img/pottery/compoundurn.jpg",
        rating: 4.6,
        reviews: 73,
        badge: "Ornamental",
        description: "Large outdoor urn with geometric relief patterns.",
        section: "potterydomestic",
      },
      {
        id: 3315,
        title: "Herb Drying Rack",
        vendor: "Medicinal Clay",
        price: 28000,
        originalPrice: 38000,
        image: "img/pottery/herbdryer.jpg",
        rating: 4.4,
        reviews: 58,
        badge: "Practical",
        description: "Tiered pottery rack for air-drying medicinal plants.",
        section: "potterydomestic",
      },
      {
        id: 3316,
        title: "Salt Storage Pot",
        vendor: "Preservation Pottery",
        price: 18000,
        originalPrice: 25000,
        image: "img/pottery/saltpot.jpg",
        rating: 4.3,
        reviews: 49,
        badge: "Functional",
        description: "Glazed interior to prevent clumping in humid climates.",
        section: "potterydomestic",
      },
      {
        id: 3317,
        title: "Compound Boundary Marker",
        vendor: "Architectural Clay",
        price: 55000,
        originalPrice: 75000,
        image: "img/pottery/boundarypot.jpg",
        rating: 4.5,
        reviews: 62,
        badge: "Structural",
        description: "Large inverted pots marking family compound borders.",
        section: "potterydomestic",
      },
      {
        id: 3318,
        title: "Chicken Feeding Trough",
        vendor: "Farm Pottery",
        price: 22000,
        originalPrice: 30000,
        image: "img/pottery/chickentrough.jpg",
        rating: 4.2,
        reviews: 41,
        badge: "Agricultural",
        description: "Long shallow dish for poultry feeding.",
        section: "potterydomestic",
      },
      {
        id: 3319,
        title: "Storytelling Candle Holder",
        vendor: "Oral Tradition Clay",
        price: 25000,
        originalPrice: 35000,
        image: "img/pottery/storyholder.jpg",
        rating: 4.6,
        reviews: 77,
        badge: "Cultural",
        description: "Perforated holder casting shadow stories when lit.",
        section: "potterydomestic",
      },
      {
        id: 3320,
        title: "Leopard Clan Sculpture",
        vendor: "Symbolic Clay",
        price: 75000,
        originalPrice: 95000,
        image: "img/pottery/leopardsculpture.jpg",
        rating: 4.8,
        reviews: 94,
        badge: "Prestige",
        description: "Mythological leopard-human hybrid figure.",
        section: "potterysculptural",
      },
      {
        id: 3321,
        title: "Mami Wata Votive",
        vendor: "Sacred Waters Pottery",
        price: 45000,
        originalPrice: 60000,
        image: "img/pottery/mamiwata.jpg",
        rating: 4.7,
        reviews: 82,
        badge: "Spiritual",
        description: "Mermaid deity sculpture with cowrie shell details.",
        section: "potterysculptural",
      },
      {
        id: 3322,
        title: "Ekpe Mask Wall Plaque",
        vendor: "Ritual Art Clay",
        price: 38000,
        originalPrice: 50000,
        image: "img/pottery/ekpeplaque.jpg",
        rating: 4.6,
        reviews: 71,
        badge: "Ceremonial",
        description: "Terracotta wall hanging of secret society mask.",
        section: "potterysculptural",
      },
      {
        id: 3323,
        title: "Fertility Mother Figure",
        vendor: "Ancestral Clay",
        price: 60000,
        originalPrice: 80000,
        image: "img/pottery/fertilityfigure.jpg",
        rating: 4.9,
        reviews: 103,
        badge: "Sacred",
        description: "Exaggerated feminine form symbolizing abundance.",
        section: "potterysculptural",
      },
      {
        id: 3324,
        title: "Warrior on Horseback",
        vendor: "Equestrian Clay",
        price: 55000,
        originalPrice: 75000,
        image: "img/pottery/warriorhorse.jpg",
        rating: 4.5,
        reviews: 63,
        badge: "Historical",
        description: "Depicting pre-colonial cavalry traditions.",
        section: "potterysculptural",
      },
      {
        id: 3325,
        title: "Twin Vessels Sculpture",
        vendor: "Duality Pottery",
        price: 48000,
        originalPrice: 65000,
        image: "img/pottery/twinsculpture.jpg",
        rating: 4.7,
        reviews: 78,
        badge: "Symbolic",
        description: "Interconnected pots representing spiritual twins.",
        section: "potterysculptural",
      },
      {
        id: 3326,
        title: "Fisherman's Totem",
        vendor: "River Clay",
        price: 42000,
        originalPrice: 55000,
        image: "img/pottery/fishermantotem.jpg",
        rating: 4.6,
        reviews: 67,
        badge: "Occupational",
        description: "Stacked fish and net motifs on vertical column.",
        section: "potterysculptural",
      },
      {
        id: 3327,
        title: "Ancestor Face Jug",
        vendor: "Lineage Pottery",
        price: 65000,
        originalPrice: 85000,
        image: "img/pottery/facejug.jpg",
        rating: 4.8,
        reviews: 89,
        badge: "Commemorative",
        description: "Storage vessel with sculpted facial features.",
        section: "potterysculptural",
      },
      {
        id: 3328,
        title: "Nsibidi-Inspired Coffee Set",
        vendor: "Urban Clay",
        price: 45000,
        originalPrice: 60000,
        image: "img/pottery/coffeeset.jpg",
        rating: 4.7,
        reviews: 85,
        badge: "Modern",
        description: "4-piece set with ancient script motifs.",
        section: "potterymodern",
      },
      {
        id: 3329,
        title: "Geometric Planter",
        vendor: "Designer Clay",
        price: 28000,
        originalPrice: 38000,
        image: "img/pottery/geoplanter.jpg",
        rating: 4.6,
        reviews: 73,
        badge: "Contemporary",
        description: "Angular succulent pot with tribal patterns.",
        section: "potterymodern",
      },
      {
        id: 3330,
        title: "Fusion Table Lamp",
        vendor: "Light & Clay",
        price: 55000,
        originalPrice: 75000,
        image: "img/pottery/tablelamp.jpg",
        rating: 4.8,
        reviews: 94,
        badge: "Functional Art",
        description: "Hand-thrown base with woven raffia shade.",
        section: "potterymodern",
      },
      {
        id: 3331,
        title: "Miniature Drum Stool",
        vendor: "Musical Clay",
        price: 22000,
        originalPrice: 30000,
        image: "img/pottery/drumstool.jpg",
        rating: 4.5,
        reviews: 61,
        badge: "Decorative",
        description: "Playable miniature ekpe drum as side table.",
        section: "potterymodern",
      },
      {
        id: 3332,
        title: "Wall Pocket Set",
        vendor: "Urban Pottery",
        price: 18000,
        originalPrice: 25000,
        image: "img/pottery/wallpockets.jpg",
        rating: 4.4,
        reviews: 53,
        badge: "Organizer",
        description: "Three hanging pockets for keys/mail.",
        section: "potterymodern",
      },
      {
        id: 3333,
        title: "Modern Incense Burner",
        vendor: "Aroma Clay",
        price: 25000,
        originalPrice: 35000,
        image: "img/pottery/incenseburner.jpg",
        rating: 4.6,
        reviews: 78,
        badge: "Wellness",
        description: "Perforated vessel for resin-based aromatics.",
        section: "potterymodern",
      },
      {
        id: 3334,
        title: "Coiled Statement Necklace",
        vendor: "Wearable Clay",
        price: 32000,
        originalPrice: 45000,
        image: "img/pottery/claynecklace.jpg",
        rating: 4.7,
        reviews: 82,
        badge: "Jewelry",
        description: "Lightweight ceramic beads on leather cord.",
        section: "potterymodern",
      },
      {
        id: 3335,
        title: "Textured Centerpiece Bowl",
        vendor: "Design Clay",
        price: 38000,
        originalPrice: 50000,
        image: "img/pottery/centerbowl.jpg",
        rating: 4.5,
        reviews: 67,
        badge: "Decor",
        description: "Organic ridges mimicking Cross River topography.",
        section: "potterymodern",
      },
      {
        id: 3336,
        title: "Storytelling Animal Set",
        vendor: "Clay Tales",
        price: 22000,
        originalPrice: 30000,
        image: "img/pottery/kidanimals.jpg",
        rating: 4.7,
        reviews: 89,
        badge: "Educational",
        description: "6 folklore characters for imaginative play.",
        section: "potterykids",
      },
      {
        id: 3337,
        title: "Mini Cooking Pot Set",
        vendor: "Little Chefs",
        price: 18000,
        originalPrice: 25000,
        image: "img/pottery/kidpots.jpg",
        rating: 4.6,
        reviews: 76,
        badge: "Roleplay",
        description: "Safe, durable replicas of traditional cookware.",
        section: "potterykids",
      },
      {
        id: 3338,
        title: "Piggy Bank with Proverbs",
        vendor: "Savings Clay",
        price: 15000,
        originalPrice: 22000,
        image: "img/pottery/kidbank.jpg",
        rating: 4.5,
        reviews: 63,
        badge: "Practical",
        description: "Teaches thrift through Efik wisdom sayings.",
        section: "potterykids",
      },
      {
        id: 3339,
        title: "Rainmaker Musical Pot",
        vendor: "Clay Sounds",
        price: 25000,
        originalPrice: 35000,
        image: "img/pottery/rainmaker.jpg",
        rating: 4.8,
        reviews: 94,
        badge: "Interactive",
        description: "Creates soothing water sounds when tilted.",
        section: "potterykids",
      },
      {
        id: 3340,
        title: "Ancestor Doll",
        vendor: "Heritage Toys",
        price: 20000,
        originalPrice: 28000,
        image: "img/pottery/ancestordoll.jpg",
        rating: 4.4,
        reviews: 57,
        badge: "Cultural",
        description: "Simplified elder figure teaching respect.",
        section: "potterykids",
      },
      {
        id: 3341,
        title: "Puzzle Pot Set",
        vendor: "Learning Clay",
        price: 30000,
        originalPrice: 40000,
        image: "img/pottery/puzzlepot.jpg",
        rating: 4.6,
        reviews: 71,
        badge: "Developmental",
        description: "Nesting pots with shape-matching challenges.",
        section: "potterykids",
      },
      {
        id: 3342,
        title: "Nameplate Bowl",
        vendor: "Personalized Clay",
        price: 22000,
        originalPrice: 30000,
        image: "img/pottery/namebowl.jpg",
        rating: 4.5,
        reviews: 64,
        badge: "Custom",
        description: "Child's name in nsibidi script around rim.",
        section: "potterykids",
      },
      {
        id: 3343,
        title: "First Tooth Container",
        vendor: "Milestone Pottery",
        price: 18000,
        originalPrice: 25000,
        image: "img/pottery/toothpot.jpg",
        rating: 4.3,
        reviews: 49,
        badge: "Keepsake",
        description: "Mini vessel for preserving baby teeth.",
        section: "potterykids",
      },
    ],
    marketlaptops: [
      {
        id: 4000,
        title: "Dell XPS 13",
        vendor: "Tech Haven",
        price: 899999,
        originalPrice: 999999,
        image: "img/laptops/dellxps13.jpg",
        rating: 4.8,
        reviews: 245,
        badge: "Flagship",
        description: "Ultra-thin laptop with InfinityEdge display.",
        section: "laptopsdell",
      },
      {
        id: 4001,
        title: "Dell Inspiron 15",
        vendor: "Gadget World",
        price: 549999,
        originalPrice: 649999,
        image: "img/laptops/dellinspiron15.jpg",
        rating: 4.5,
        reviews: 187,
        badge: "Best Value",
        description: "Powerful everyday laptop with SSD storage.",
        section: "laptopsdell",
      },
      {
        id: 4002,
        title: "Dell Alienware m15",
        vendor: "Gaming Gear",
        price: 1299999,
        originalPrice: 1499999,
        image: "img/laptops/alienwarem15.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "Gaming",
        description: "High-performance gaming laptop with RTX graphics.",
        section: "laptopsdell",
      },
      {
        id: 4003,
        title: "Dell Latitude 7420",
        vendor: "Business Tech",
        price: 799999,
        originalPrice: 899999,
        image: "img/laptops/delllatitude7420.jpg",
        rating: 4.6,
        reviews: 132,
        badge: "Business",
        description: "Secure and durable business laptop.",
        section: "laptopsdell",
      },
      {
        id: 4004,
        title: "Dell G15 Gaming",
        vendor: "GameZone",
        price: 749999,
        originalPrice: 849999,
        image: "img/laptops/dellg15.jpg",
        rating: 4.4,
        reviews: 143,
        badge: "Popular",
        description: "Affordable gaming laptop with 120Hz display.",
        section: "laptopsdell",
      },
      {
        id: 4005,
        title: "Dell Vostro 3510",
        vendor: "Office Solutions",
        price: 499999,
        originalPrice: 599999,
        image: "img/laptops/dellvostro3510.jpg",
        rating: 4.3,
        reviews: 98,
        badge: "Essential",
        description: "Reliable laptop for work and study.",
        section: "laptopsdell",
      },
      {
        id: 4006,
        title: "Dell Precision 5560",
        vendor: "Pro Tech",
        price: 1499999,
        originalPrice: 1699999,
        image: "img/laptops/dellprecision5560.jpg",
        rating: 4.9,
        reviews: 112,
        badge: "Workstation",
        description: "Professional-grade laptop for creators.",
        section: "laptopsdell",
      },
      {
        id: 4007,
        title: "Dell Chromebook 3110",
        vendor: "EduTech",
        price: 299999,
        originalPrice: 349999,
        image: "img/laptops/dellchromebook3110.jpg",
        rating: 4.2,
        reviews: 87,
        badge: "Education",
        description: "Lightweight Chromebook for students.",
        section: "laptopsdell",
      },
      {
        id: 4008,
        title: "HP Spectre x360",
        vendor: "Luxury Tech",
        price: 949999,
        originalPrice: 1099999,
        image: "img/laptops/hpspectrex360.jpg",
        rating: 4.7,
        reviews: 231,
        badge: "Premium",
        description: "Convertible laptop with OLED display.",
        section: "laptophp",
      },
      {
        id: 4009,
        title: "HP Envy 14",
        vendor: "Tech Bazaar",
        price: 699999,
        originalPrice: 799999,
        image: "img/laptops/hpenvy14.jpg",
        rating: 4.6,
        reviews: 176,
        badge: "Sleek",
        description: "Powerful laptop for creatives.",
        section: "laptophp",
      },
      {
        id: 4010,
        title: "HP Pavilion 15",
        vendor: "Gadget Hub",
        price: 549999,
        originalPrice: 649999,
        image: "img/laptops/hppavilion15.jpg",
        rating: 4.4,
        reviews: 154,
        badge: "Everyday Use",
        description: "Balanced performance for home and office.",
        section: "laptophp",
      },
      {
        id: 4011,
        title: "HP Omen 16",
        vendor: "Gaming Gear",
        price: 1099999,
        originalPrice: 1299999,
        image: "img/laptops/hpomen16.jpg",
        rating: 4.8,
        reviews: 167,
        badge: "Gaming",
        description: "High-refresh-rate gaming laptop.",
        section: "laptophp",
      },
      {
        id: 4012,
        title: "HP EliteBook 840",
        vendor: "Business Tech",
        price: 849999,
        originalPrice: 949999,
        image: "img/laptops/hpelitebook840.jpg",
        rating: 4.5,
        reviews: 143,
        badge: "Business",
        description: "Secure and lightweight corporate laptop.",
        section: "laptophp",
      },
      {
        id: 4013,
        title: "HP Chromebook 14",
        vendor: "EduTech",
        price: 249999,
        originalPrice: 299999,
        image: "img/laptops/hpchromebook14.png",
        rating: 4.3,
        reviews: 112,
        badge: "Budget",
        description: "Affordable Chromebook for browsing.",
        section: "laptophp",
      },
      {
        id: 4014,
        title: "HP ZBook Firefly",
        vendor: "Pro Tech",
        price: 1199999,
        originalPrice: 1399999,
        image: "img/laptops/hpzbookfirefly.jpg",
        rating: 4.7,
        reviews: 98,
        badge: "Workstation",
        description: "Mobile workstation for professionals.",
        section: "laptophp",
      },
      {
        id: 4015,
        title: "HP 15s",
        vendor: "Everyday Tech",
        price: 399999,
        originalPrice: 499999,
        image: "img/laptops/hp15s.png",
        rating: 4.2,
        reviews: 134,
        badge: "Essential",
        description: "Entry-level laptop for daily tasks.",
        section: "laptophp",
      },
      {
        id: 4016,
        title: "Lenovo ThinkPad X1 Carbon",
        vendor: "Business Tech",
        price: 1099999,
        originalPrice: 1299999,
        image: "img/laptops/thinkpadx1carbon.jpg",
        rating: 4.9,
        reviews: 215,
        badge: "Elite",
        description: "Ultra-light business laptop.",
        section: "laptoplenovo",
      },
      {
        id: 4017,
        title: "Lenovo Yoga 9i",
        vendor: "Luxury Tech",
        price: 999999,
        originalPrice: 1199999,
        image: "img/laptops/lenovoyoga9i.jpg",
        rating: 4.7,
        reviews: 187,
        badge: "Convertible",
        description: "2-in-1 laptop with rotating soundbar.",
        section: "laptoplenovo",
      },
      {
        id: 4018,
        title: "Lenovo Legion 5 Pro",
        vendor: "GameZone",
        price: 1199999,
        originalPrice: 1399999,
        image: "img/laptops/legion5pro.jpg",
        rating: 4.8,
        reviews: 176,
        badge: "Gaming",
        description: "QHD gaming laptop with Ryzen 7.",
        section: "laptoplenovo",
      },
      {
        id: 4019,
        title: "Lenovo IdeaPad 5",
        vendor: "Tech Haven",
        price: 599999,
        originalPrice: 699999,
        image: "img/laptops/ideapad5.jpeg",
        rating: 4.5,
        reviews: 154,
        badge: "Sleek",
        description: "Thin and light everyday laptop.",
        section: "laptoplenovo",
      },
      {
        id: 4020,
        title: "Lenovo ThinkBook 14",
        vendor: "Office Solutions",
        price: 649999,
        originalPrice: 749999,
        image: "img/laptops/thinkbook14.jpg",
        rating: 4.6,
        reviews: 132,
        badge: "Business",
        description: "Affordable business laptop.",
        section: "laptoplenovo",
      },
      {
        id: 4021,
        title: "Lenovo Chromebook Duet",
        vendor: "EduTech",
        price: 299999,
        originalPrice: 399999,
        image: "img/laptops/chromebookduet.jpg",
        rating: 4.3,
        reviews: 121,
        badge: "2-in-1",
        description: "Detachable Chromebook with keyboard.",
        section: "laptoplenovo",
      },
      {
        id: 4022,
        title: "Lenovo IdeaPad Gaming 3",
        vendor: "Gaming Gear",
        price: 749999,
        originalPrice: 899999,
        image: "img/laptops/ideapadgaming3.jpg",
        rating: 4.4,
        reviews: 143,
        badge: "Budget Gaming",
        description: "Entry-level gaming laptop.",
        section: "laptoplenovo",
      },
      {
        id: 4023,
        title: "Lenovo ThinkPad E14",
        vendor: "Pro Tech",
        price: 699999,
        originalPrice: 799999,
        image: "img/laptops/thinkpade14.jpg",
        rating: 4.5,
        reviews: 112,
        badge: "Durable",
        description: "Reliable laptop for professionals.",
        section: "laptoplenovo",
      },
      {
        id: 4024,
        title: "ASUS ROG Zephyrus G14",
        vendor: "Gaming Gear",
        price: 1299999,
        originalPrice: 1499999,
        image: "img/laptops/rogzephyrusg14.jpg",
        rating: 4.8,
        reviews: 198,
        badge: "Powerhouse",
        description: "Compact gaming laptop with Ryzen 9.",
        section: "laptopasus",
      },
      {
        id: 4025,
        title: "ASUS ZenBook 14",
        vendor: "Tech Haven",
        price: 899999,
        originalPrice: 1099999,
        image: "img/laptops/zenbook14.jpg",
        rating: 4.7,
        reviews: 176,
        badge: "Ultrabook",
        description: "Sleek and lightweight design.",
        section: "laptopasus",
      },
      {
        id: 4026,
        title: "ASUS TUF Dash F15",
        vendor: "GameZone",
        price: 999999,
        originalPrice: 1199999,
        image: "img/laptops/tufdashf15.jpg",
        rating: 4.6,
        reviews: 154,
        badge: "Gaming",
        description: "Military-grade durable gaming laptop.",
        section: "laptopasus",
      },
      {
        id: 4027,
        title: "ASUS VivoBook 15",
        vendor: "Gadget World",
        price: 499999,
        originalPrice: 599999,
        image: "img/laptops/vivobook15.jpg",
        rating: 4.4,
        reviews: 132,
        badge: "Everyday Use",
        description: "Affordable laptop for students.",
        section: "laptopasus",
      },
      {
        id: 4028,
        title: "ASUS ExpertBook B9",
        vendor: "Business Tech",
        price: 1199999,
        originalPrice: 1399999,
        image: "img/laptops/expertbookb9.jpg",
        rating: 4.7,
        reviews: 143,
        badge: "Business",
        description: "World's lightest business laptop.",
        section: "laptopasus",
      },
      {
        id: 4029,
        title: "ASUS Chromebook Flip",
        vendor: "EduTech",
        price: 349999,
        originalPrice: 449999,
        image: "img/laptops/chromebookflip.jpg",
        rating: 4.5,
        reviews: 121,
        badge: "2-in-1",
        description: "Convertible Chromebook for flexibility.",
        section: "laptopasus",
      },
      {
        id: 4030,
        title: "ASUS ROG Strix G17",
        vendor: "Gaming Gear",
        price: 1399999,
        originalPrice: 1599999,
        image: "img/laptops/rogstrixg17.jpg",
        rating: 4.9,
        reviews: 167,
        badge: "Gaming Beast",
        description: "17-inch gaming laptop with RGB.",
        section: "laptopasus",
      },
      {
        id: 4031,
        title: "ASUS ProArt StudioBook",
        vendor: "Pro Tech",
        price: 1599999,
        originalPrice: 1899999,
        image: "img/laptops/proartstudiobook.jpg",
        rating: 4.8,
        reviews: 98,
        badge: "Creator",
        description: "Designed for artists and designers.",
        section: "laptopasus",
      },
      {
        id: 4032,
        title: "Acer Predator Helios 300",
        vendor: "Gaming Gear",
        price: 1099999,
        originalPrice: 1299999,
        image: "img/laptops/predatorhelios300.jpg",
        rating: 4.7,
        reviews: 187,
        badge: "Gaming",
        description: "High-refresh-rate gaming laptop.",
        section: "laptopacer",
      },
      {
        id: 4033,
        title: "Acer Swift 3",
        vendor: "Tech Haven",
        price: 649999,
        originalPrice: 799999,
        image: "img/laptops/swift3.jpg",
        rating: 4.5,
        reviews: 154,
        badge: "Ultrabook",
        description: "Lightweight and powerful.",
        section: "laptopacer",
      },
      {
        id: 4034,
        title: "Acer Aspire 5",
        vendor: "Gadget World",
        price: 499999,
        originalPrice: 599999,
        image: "img/laptops/aspire5.jpg",
        rating: 4.4,
        reviews: 132,
        badge: "Budget",
        description: "Affordable laptop for everyday use.",
        section: "laptopacer",
      },
      {
        id: 4035,
        title: "Acer Nitro 5",
        vendor: "GameZone",
        price: 899999,
        originalPrice: 1099999,
        image: "img/laptops/nitro5.jpg",
        rating: 4.6,
        reviews: 176,
        badge: "Gaming",
        description: "Entry-level gaming laptop.",
        section: "laptopacer",
      },
      {
        id: 4036,
        title: "Acer Spin 5",
        vendor: "Tech Bazaar",
        price: 799999,
        originalPrice: 949999,
        image: "img/laptops/spin5.jpg",
        rating: 4.5,
        reviews: 143,
        badge: "2-in-1",
        description: "Convertible laptop with stylus support.",
        section: "laptopacer",
      },
      {
        id: 4037,
        title: "Acer Chromebook 314",
        vendor: "EduTech",
        price: 299999,
        originalPrice: 399999,
        image: "img/laptops/chromebook314.jpg",
        rating: 4.3,
        reviews: 112,
        badge: "Education",
        description: "Durable Chromebook for students.",
        section: "laptopacer",
      },
      {
        id: 4038,
        title: "Acer ConceptD 7",
        vendor: "Pro Tech",
        price: 1499999,
        originalPrice: 1799999,
        image: "img/laptops/conceptd7.jpg",
        rating: 4.8,
        reviews: 98,
        badge: "Creator",
        description: "Designed for creative professionals.",
        section: "laptopacer",
      },
      {
        id: 4039,
        title: "Acer TravelMate P6",
        vendor: "Business Tech",
        price: 999999,
        originalPrice: 1199999,
        image: "img/laptops/travelmatep6.jpg",
        rating: 4.6,
        reviews: 132,
        badge: "Business",
        description: "Ultraportable business laptop.",
        section: "laptopacer",
      },
      {
        id: 4040,
        title: "MSI GS66 Stealth",
        vendor: "Gaming Gear",
        price: 1499999,
        originalPrice: 1699999,
        image: "img/laptops/gs66stealth.jpg",
        rating: 4.9,
        reviews: 201,
        badge: "Premium",
        description: "Slim gaming laptop with RGB keyboard.",
        section: "laptopmsi",
      },
      {
        id: 4041,
        title: "MSI GE76 Raider",
        vendor: "GameZone",
        price: 1799999,
        originalPrice: 1999999,
        image: "img/laptops/ge76raider.jpg",
        rating: 4.8,
        reviews: 187,
        badge: "Beast",
        description: "17-inch gaming powerhouse.",
        section: "laptopmsi",
      },
      {
        id: 4042,
        title: "MSI Katana GF66",
        vendor: "Tech Haven",
        price: 999999,
        originalPrice: 1199999,
        image: "img/laptops/katanagf66.jpg",
        rating: 4.6,
        reviews: 154,
        badge: "Gaming",
        description: "Affordable gaming laptop with RTX.",
        section: "laptopmsi",
      },
      {
        id: 4043,
        title: "MSI Prestige 14",
        vendor: "Pro Tech",
        price: 1099999,
        originalPrice: 1299999,
        image: "img/laptops/prestige14.jpg",
        rating: 4.7,
        reviews: 132,
        badge: "Creator",
        description: "Ultrabook for professionals.",
        section: "laptopmsi",
      },
      {
        id: 4044,
        title: "MSI Bravo 15",
        vendor: "Gadget World",
        price: 799999,
        originalPrice: 999999,
        image: "img/laptops/bravo15.jpg",
        rating: 4.5,
        reviews: 121,
        badge: "Budget Gaming",
        description: "AMD-powered gaming laptop.",
        section: "laptopmsi",
      },
      {
        id: 4045,
        title: "MSI Modern 15",
        vendor: "Business Tech",
        price: 699999,
        originalPrice: 849999,
        image: "img/laptops/modern15.jpg",
        rating: 4.4,
        reviews: 98,
        badge: "Sleek",
        description: "Minimalist laptop for work.",
        section: "laptopmsi",
      },
      {
        id: 4046,
        title: "MSI Creator Z16",
        vendor: "Luxury Tech",
        price: 1899999,
        originalPrice: 2199999,
        image: "img/laptops/creatorz16.jpg",
        rating: 4.9,
        reviews: 112,
        badge: "Elite",
        description: "4K laptop for designers.",
        section: "laptopmsi",
      },
      {
        id: 4047,
        title: "MSI Summit E14",
        vendor: "Office Solutions",
        price: 1199999,
        originalPrice: 1399999,
        image: "img/laptops/summite14.jpg",
        rating: 4.7,
        reviews: 143,
        badge: "Business",
        description: "Convertible business laptop.",
        section: "laptopmsi",
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
      updateWishlistCount(); // Update badge immediately
      if (document.querySelector(".wishlist-modal.active")) {
        renderWishlistModal(); // Update modal if open
      }
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

  function updateWishlistCount() {
    const wishlistBadge = document.querySelector(
      ".action-icon.wishlist-btn .badge"
    );
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlist.length;
      wishlistBadge.setAttribute(
        "aria-label",
        `Wishlist contains ${wishlist.length} items`
      );
    }
  }

  function renderWishlistModal() {
    const wishlistItemsContainer = document.querySelector(".wishlist-items");
    if (!wishlistItemsContainer) return;

    wishlistItemsContainer.innerHTML = "";
    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = "<p>Your wishlist is empty.</p>";
      return;
    }

    wishlist.forEach((item) => {
      const wishlistItem = document.createElement("li");
      wishlistItem.className = "wishlist-item";
      wishlistItem.innerHTML = `
      <img src="${sanitizeInput(item.image)}" alt="${sanitizeInput(
        item.title
      )}" class="wishlist-item-image">
      <div class="wishlist-item-details">
        <h4>${sanitizeInput(item.title)}</h4>
        <p>${sanitizeInput(item.vendor)}</p>
        <p>${formatNaira(item.price)}</p>
      </div>
      <button class="remove-wishlist-item" data-id="${
        item.id
      }" aria-label="Remove ${sanitizeInput(item.title)} from wishlist">
        <i class="fas fa-trash" aria-hidden="true"></i>
      </button>
    `;
      wishlistItemsContainer.appendChild(wishlistItem);
    });
  }

  function removeFromWishlist(productId) {
    const id = Number(productId);
    wishlist = wishlist.filter((item) => item.id !== id);
    saveWishlist();
    updateWishlistCount();
    renderWishlistModal();
    showFlashMessage("Removed from Wishlist");
  }

  // Initialize wishlist elements
  const wishlistBtn = document.querySelector(".wishlist-btn");
  const wishlistModal = document.querySelector(".wishlist-modal");
  const closeWishlistModalBtn = document.querySelector(
    ".wishlist-modal .modal-close"
  );
  const wishlistModalOverlay = document.querySelector(
    ".wishlist-modal .modal-overlay"
  );

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", (e) => {
      e.preventDefault();
      wishlistModal.classList.add("active");
      document.body.style.overflow = "hidden";
      renderWishlistModal();
    });
  }

  if (closeWishlistModalBtn) {
    closeWishlistModalBtn.addEventListener("click", () => {
      wishlistModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (wishlistModalOverlay) {
    wishlistModalOverlay.addEventListener("click", () => {
      wishlistModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Event delegation for wishlist item removal
  document.addEventListener("click", (e) => {
    if (e.target.closest(".remove-wishlist-item")) {
      const itemId = e.target.closest(".remove-wishlist-item").dataset.id;
      removeFromWishlist(itemId);
    }
  });

  // Update wishlist count on page load
  updateWishlistCount();

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
