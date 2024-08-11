const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const User = require('./models/UserSchema');
const Order = require('./models/Orders'); // Import the Order schema
const Product = require('./models/Product');
const Tag = require('./models/Tag');
const Category = require('./models/Category');
const app = express();
const PORT = 5174;
const bcrypt = require('bcrypt');
const allowedOrigins = ['http://localhost:5173', 'https://main--dapper-beijinho-216f7a.netlify.app'];

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from Netlify
  credentials: true,
}));
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files (Frontend)

// Fallback to index.html for non-API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
// MongoDB Connection
mongoose
  .connect('mongodb+srv://charzevg:OoUBGAMh2rlpVdgs@cluster0.dvogu42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB:', error));

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('productImage');


// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
app.get('/api/admin/orders', async (req, res) => {
  try {
    // Here you might want to check if the logged-in user is an admin.
    // Assuming you have some middleware to check for admin privileges:
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    const orders = await Order.find().populate('customerId', 'firstName lastName email');
    res.json(orders);
  } catch (err) {
    console.error('Failed to fetch orders', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
app.get('/api/my-orders', async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Fetch orders for the logged-in user
    const userId = req.session.userId;
    const orders = await Order.find({ customerId: userId });

    // Return orders as a JSON response
    res.json(orders);
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.delete('/api/clear-cart', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = []; // Clear the cart items
    await user.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/registerUser', async (req, res) => {
  const { email, firstName, lastName, mobilePhone, phone, password } = req.body;
  try {
    // Convert email to lowercase
    const lowerCaseEmail = email.toLowerCase();

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    const newUser = new User({
      email: lowerCaseEmail,
      firstName,
      lastName,
      mobilePhone,
      phone,
      password: hashedPassword
    });

    await newUser.save();
    res.send('User registered successfully');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send(err.message);
  }
});
// Route to get user details by userId
app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
      // Fetch the user from the database using the userId
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Send user details as a response
      res.json({
          name: user.firstName,
          email: user.email,
          lastName: user.lastName,
          // Add more user details as needed
      });
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Convert email to lowercase
    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });
    console.log('User found:', user);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      console.log('Password match result:', isPasswordCorrect);

      if (isPasswordCorrect) {
        req.session.userId = user._id;
        res.json({ message: 'Login successful', userId: user._id });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Server error');
  }
});


app.post('/api/upload-tag', async (req, res) => {
  console.log(req.body);  // Now this should log form data correctly
  const { name } = req.body;

  if (!name) {
      return res.status(400).send('Tag name is required.');
  }
  try {
      const newTag = new Tag({ name });
      await newTag.save();
      res.status(201).send('Tag uploaded successfully');
  } catch (error) {
      console.error('Failed to upload tag:', error);
      res.status(500).send('Server error');
  }
});
app.get('/api/auth', (req, res) => {
  if (req.session && req.session.userId) {
    res.status(200).json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

app.post('/api/upload-category', async (req, res) => {
  console.log(req.body);  // Now this should log form data correctly
  const { name } = req.body;

  if (!name) {
      return res.status(400).send('Category name is required.');
  }
  try {
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).send('Tag uploaded successfully');
  } catch (error) {
      console.error('Failed to upload tag:', error);
      res.status(500).send('Server error');
  }
});// Route to upload product
app.post('/api/upload-product', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { name, price, p_category, p_tag, p_brand, p_quantity, offer_price } = req.body;
    const productImage = req.file ? req.file.path : ''; // Handle the case where no file is uploaded

    // Process tags: Split, map "-" to null, and filter out empty tags
    const processedTags = p_tag.split(',').map(tag => tag.trim() === '-' ? null : tag.trim()).filter(tag => tag);

    try {
      const newProduct = new Product({
        product_name: name,
        p_price: price,
        p_category: p_category,
        p_tag: processedTags, // Use the processed tags array
        p_brand: p_brand,
        p_quantity: p_quantity,
        offer_price: offer_price,
        image: productImage
      });

      await newProduct.save(); // Save the new product to the database
      res.status(201).send('Product uploaded successfully');
    } catch (error) {
      console.error('Failed to upload product:', error);
      res.status(500).send('Server error');
    }
  });
});


// Define your logout route
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // Adjust the cookie name if different
    res.json({ message: 'Logout successful' });
  });
});


// PUT route for updating a product
app.put('/api/products/:productId', (req, res) => {
  uploadUpdate(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { productId } = req.params;
    const { name, price, p_category, p_tag, p_brand, p_quantity, offer_price } = req.body;
    const productImage = req.file ? req.file.path : null; // Handle the case where no file is uploaded

    try {
      const updateData = {
        product_name: name,
        p_price: price,
        p_category,
        p_tag,
        p_brand,
        p_quantity,
        offer_price
      };

      if (productImage) {
        updateData.image = productImage;
      }

      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Server error');
    }
  });
});


// DELETE route for deleting a product
app.delete('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Server error');
  }
});



app.get('/api/products', async (req, res) => {
  const { category, tag,productId,productName  } = req.query;

  try {
    let query = {};
    if (category) {
      query.p_category = category;
    }
    if (tag) {
      query.p_tag = { $regex: new RegExp(tag, 'i') };
    }
    if (productId) {
      query._id = productId;
    }
    if (productName) {
      query.product_name = { $regex: new RegExp(productName, 'i') };
    }
    const products = await Product.find(query);
    const productsWithWishlistInfo = products.map(product => ({
      ...product.toObject(),
    }));
    res.json(productsWithWishlistInfo);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server error');
  }
});


app.get('/api/products/offer', async (req, res) => {
  try {
    const products = await Product.find({ p_tag: { $regex: 'offers', $options: 'i' } });
    console.log(products);  // Check what the query returns
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found with the Offers tag" });
    }
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products with offer tag:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/products/new', async (req, res) => {
  try {
    const products = await Product.find({ p_tag: { $regex: 'new', $options: 'i' } });
    console.log(products);  // Check what the query returns
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found with the New tag" });
    }
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products with new tag:', error);
    res.status(500).send('Server error');
  }
});
app.get('/api/products/:categoryId', async (req, res) => {


  const { categoryId } = req.params;

  try {
    const products = await Product.find({ p_category: categoryId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).send('Server error');
  }
});
app.get('/api/tags', async (req, res) => {
  try {
    const tags = await Tag.find().distinct('name');  // Retrieve all unique tags
    res.json(tags);
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().distinct('name');  // Retrieve all unique tags
    res.json(categories);
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/cart-count', async (req, res) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      const cartCount = user.cart.reduce((total, item) => total + item.quantity, 0);
      res.json({ count: cartCount });
    } catch (error) {
      console.error('Error fetching cart count:', error);
      res.status(500).send('Unable to retrieve cart count');
    }
  } else {
    // Handle guest users by session cart count
    const cartCount = req.session.cart ? req.session.cart.reduce((total, item) => total + item.quantity, 0) : 0;
    res.json({ count: cartCount });
  }
});

// Define a new upload middleware for handling image updates
const uploadUpdate = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('productImage');

app.post('/api/add-to-cart', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Product ID and quantity are required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (!user.cart) {
        user.cart = [];
      }

      const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);
      if (productIndex > -1) {
        user.cart[productIndex].quantity += quantity;
      } else {
        user.cart.push({
          productId,
          name: product.product_name,
          price: product.p_price,
          image: product.image,
          quantity
        });
      }

      await user.save();

      // Calculate total items in the cart
      const totalItems = user.cart.reduce((sum, item) => sum + item.quantity, 0);

      res.json({ message: 'Product added/updated in cart', totalItems });
    } else {
      if (!req.session.cart) {
        req.session.cart = [];
      }

      const productIndex = req.session.cart.findIndex(item => item.productId === productId);
      if (productIndex > -1) {
        req.session.cart[productIndex].quantity += quantity;
      } else {
        req.session.cart.push({
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        });
      }

      const totalItems = req.session.cart.reduce((sum, item) => sum + item.quantity, 0);

      res.json({ message: 'Product added/updated in cart', totalItems });
    }
  } catch (error) {
    console.error('Server error in adding product to cart:', error);
    res.status(500).json({ error: 'Server error in adding product to cart' });
  }
});
app.get('/api/cart-items', async (req, res) => {
  try {
    let cartItems = [];

    if (req.session && req.session.userId) {
      // Authenticated user
      const user = await User.findById(req.session.userId).populate('cart.productId');
      cartItems = user.cart.map(item => ({
        productId: item.productId._id, // Ensure only the _id is sent
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      }));
    } else if (req.session.cart) {
      // Guest user
      const sessionCart = req.session.cart;
      for (const item of sessionCart) {
        const product = await Product.findById(item.productId);
        if (product) {
          cartItems.push({
            productId: product._id,
            name: product.product_name,
            image: product.image,
            price: product.p_price,
            quantity: item.quantity
          });
        } else {
          console.error(`Product with ID ${item.productId} not found`);
        }
      }
    }

    res.json({ items: cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).send('Unable to retrieve cart items');
  }
});

// DELETE route for deleting an item from the cart
// DELETE route for deleting an item from the cart
app.delete('/api/cart-items/:productId', async (req, res) => {
  const { productId } = req.params;

  console.log('Received productId:', productId);

  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('User cart:', user.cart);

      // Convert productId to ObjectId for comparison
      const productIdObj = new mongoose.Types.ObjectId(productId);

      const cartItemIndex = user.cart.findIndex(item => item.productId.equals(productIdObj));

      if (cartItemIndex === -1) {
        console.log('Product not found in user cart');
        return res.status(404).json({ error: 'Product not found in cart' });
      }

      user.cart.splice(cartItemIndex, 1);
      await user.save();

      const totalItems = user.cart.reduce((sum, item) => sum + item.quantity, 0);

      res.json({ message: 'Product removed from cart', totalItems });
    } catch (error) {
      console.error('Error removing product from user cart:', error);
      res.status(500).json({ error: 'Server error in removing product from cart' });
    }
  } else {
    if (!req.session.cart) {
      console.log('Session cart is empty');
      return res.status(404).json({ error: 'Cart is empty' });
    }

    const cartItemIndex = req.session.cart.findIndex(item => item.productId === productId);
    if (cartItemIndex === -1) {
      console.log('Product not found in session cart');
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    req.session.cart.splice(cartItemIndex, 1);

    const totalItems = req.session.cart.reduce((sum, item) => sum + item.quantity, 0);

    res.json({ message: 'Product removed from cart', totalItems });
  }
});
// Backend - Fetch product details for given IDs
app.post('/api/product-details', async (req, res) => {
  const { productIds } = req.body;
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).send('Unable to fetch product details');
  }
});

app.get('/api/wishlist-count', async (req, res) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      // Simply count the number of items in the wishlist
      const wishlistCount = user.wishlist.length;
      res.json({ count: wishlistCount });
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
      res.status(500).send('Unable to retrieve wishlist count');
    }
  } else {
    // Handle guest users by session wishlist count
    const wishlistCount = req.session.wishlist ? req.session.wishlist.length : 0;
    res.json({ count: wishlistCount });
  }
});

app.get('/api/wishlist-items', async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).populate('wishlist.productId');
      const wishlistProductIds = user.wishlist.map(item => item.productId._id.toString());
      res.json(wishlistProductIds);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      res.status(500).send('Server error');
    }
  } else {
    // Return wishlist for guests
    const wishlistProductIds = req.session.wishlist || [];
    res.json(wishlistProductIds);
  }
});

app.post('/api/add-to-wishlist', async (req, res) => {
  const { productId } = req.body;

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  if (req.session.userId) {
    // Handle logged-in users
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.wishlist.some(item => item.productId.equals(productId))) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      user.wishlist.push({ productId });
      await user.save();
      res.json({ message: 'Product added to wishlist', count: user.wishlist.length });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).json({ error: 'Server error in adding product to wishlist' });
    }
  } else {
    // Handle guests
    if (!req.session.wishlist) {
      req.session.wishlist = [];
    }
    if (req.session.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    req.session.wishlist.push(productId);
    res.json({ message: 'Product added to wishlist', count: req.session.wishlist.length });
  }
});

app.post('/api/remove-from-wishlist', async (req, res) => {
  const { productId } = req.body;

  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.wishlist = user.wishlist.filter(item => !item.productId.equals(productId));
      await user.save();
      res.json({ message: 'Product removed from wishlist' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ error: 'Server error in removing product from wishlist' });
    }
  } else {
    // Handle guest wishlist removal
    if (!req.session.wishlist) {
      req.session.wishlist = [];
    }
    req.session.wishlist = req.session.wishlist.filter(id => id !== productId);
    res.json({ message: 'Product removed from wishlist', count: req.session.wishlist.length });
  }
});
// Route to handle order creation
app.post('/api/create-order', async (req, res) => {
  const {
    formData,
    items,
  } = req.body;

  if (!req.session.userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const order = new Order({
      order_id: new mongoose.Types.ObjectId().toString(), // generate a unique ID
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      country: formData.country,
      totalPrice: formData.totalPrice,
      paymentMethod: formData.paymentMethod,
      deliveryMethod: formData.deliveryMethod,
      billingFirstName: formData.billingFirstName,
      billingLastName: formData.billingLastName,
      billingEmail: formData.billingEmail,
      billingAddress: formData.billingAddress,
      billingCity: formData.billingCity,
      billingZip: formData.billingZip,
      billingCountry: formData.billingCountry,
      customerId: user._id,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      status: 'pending',  // Set the default status to 'pending'
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const updateData = req.body;

  try {
    // Find the order by ID and update it with the new data
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Endpoint to get order details by ID
app.get('/api/order/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Middleware to validate ObjectId
const isValidObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    return res.status(400).send('Invalid Product ID');
  }
  next();
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
