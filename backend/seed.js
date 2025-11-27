require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Premium cotton basic white t-shirt, perfect for everyday wear",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 100
  },
  {
    name: "Slim Fit Jeans",
    description: "Modern slim fit denim jeans with stretch comfort",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 80
  },
  {
    name: "Leather Jacket",
    description: "Genuine leather jacket with classic biker style",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 50
  },
  {
    name: "Hooded Sweatshirt",
    description: "Comfortable cotton blend hoodie with kangaroo pocket",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 120
  },
  {
    name: "Polo Shirt",
    description: "Classic polo shirt in premium pique cotton",
    price: 45.99,
    imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 90
  },
  {
    name: "Chino Pants",
    description: "Versatile chino pants for smart casual occasions",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 70
  },
  {
    name: "Bomber Jacket",
    description: "Stylish bomber jacket with ribbed cuffs and hem",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 60
  },
  {
    name: "Floral Summer Dress",
    description: "Light and airy floral print dress perfect for summer",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 75
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket, a wardrobe essential",
    price: 99.99,
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 85
  },
  {
    name: "Black Pencil Skirt",
    description: "Elegant pencil skirt for professional settings",
    price: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 65
  },
  {
    name: "Silk Blouse",
    description: "Luxurious silk blouse in elegant design",
    price: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 55
  },
  {
    name: "Yoga Leggings",
    description: "High-waisted yoga leggings with moisture-wicking fabric",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 100
  },
  {
    name: "Knit Cardigan",
    description: "Cozy knit cardigan perfect for layering",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 70
  },
  {
    name: "Maxi Dress",
    description: "Flowing maxi dress for elegant occasions",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 60
  },
  {
    name: "Kids Graphic T-Shirt",
    description: "Fun graphic t-shirt for active kids",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 150
  },
  {
    name: "Kids Denim Shorts",
    description: "Comfortable denim shorts for summer play",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 120
  },
  {
    name: "Kids Hoodie",
    description: "Warm and cozy hoodie for outdoor activities",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 100
  },
  {
    name: "Kids Winter Jacket",
    description: "Insulated winter jacket to keep kids warm",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 80
  },
  {
    name: "Kids Dress",
    description: "Adorable dress for special occasions",
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 70
  },
  {
    name: "Kids Joggers",
    description: "Comfortable joggers for everyday wear",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 110
  },
  {
    name: "Striped Button-Down Shirt",
    description: "Classic striped button-down shirt for men",
    price: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 75
  },
  {
    name: "Women's Trench Coat",
    description: "Elegant trench coat for rainy days",
    price: 189.99,
    imageUrl: "https://images.unsplash.com/photo-1633821879282-0c4e91f96232?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 45
  },
  {
    name: "Cargo Shorts",
    description: "Practical cargo shorts with multiple pockets",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1740512922260-543b1b83c986?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 95
  },
  {
    name: "Kids Sneakers T-Shirt",
    description: "Cotton t-shirt with sneaker graphic print",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 130
  },
  {
    name: "Women's Blazer",
    description: "Professional blazer for business settings",
    price: 139.99,
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 50
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
