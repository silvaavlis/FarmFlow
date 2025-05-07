const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    res.status(200).json({
      success: true,
      product: product
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    res.status(200).json({
      success: true,
      product: product
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    res.status(200).json({ 
      success: true,
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Seed sample products
exports.seedProducts = async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    const sampleProducts = [
      {
        name: "Potato (Aloo)",
        description: "Fresh Indian potatoes, perfect for curries and snacks.",
        price: 35,
        category: "Root Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.5
      },
      {
        name: "Tomato (Tamatar)",
        description: "Juicy red tomatoes, essential for Indian cooking.",
        price: 40,
        category: "Fruit Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.6
      },
      {
        name: "Onion (Pyaaz)",
        description: "Fresh onions, a staple in every Indian kitchen.",
        price: 38,
        category: "Bulb Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.7
      },
      {
        name: "Spinach (Palak)",
        description: "Nutritious spinach leaves, rich in iron and vitamins.",
        price: 35,
        category: "Leafy Greens",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.6
      },
      {
        name: "Cauliflower (Phool Gobhi)",
        description: "Fresh white cauliflower, perfect for curries and stir-fries.",
        price: 40,
        category: "Cruciferous",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.5
      },
      {
        name: "Brinjal/Eggplant (Baingan)",
        description: "Glossy purple brinjals, great for bharta and curries.",
        price: 42,
        category: "Fruit Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.3
      },
      {
        name: "Okra/Ladyfinger (Bhindi)",
        description: "Tender okra pods, perfect for stir-fries and curries.",
        price: 45,
        category: "Pod Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.4
      },
      {
        name: "Bottle Gourd (Lauki/Doodhi)",
        description: "Fresh bottle gourd, great for curries and kofta.",
        price: 38,
        category: "Gourd Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.3
      },
      {
        name: "Carrot (Gajar)",
        description: "Sweet and crunchy carrots, perfect for salads and sabzi.",
        price: 38,
        category: "Root Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.7
      },
      {
        name: "Cucumber (Kheera)",
        description: "Fresh cucumbers, perfect for salads and raita.",
        price: 35,
        category: "Fruit Vegetables",
        subCategory: "Fresh",
        image: ["https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=2070&auto=format&fit=crop"],
        available: true,
        rating: 4.4
      }
    ];

    await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      message: 'Sample products added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 