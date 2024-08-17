const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { memory } = require('@feathersjs/memory');
const cors = require('cors');

// Initialize Feathers app with Express
const app = express(feathers());

// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register a memory-based products service
const productService = memory({
  paginate: {
    default: 10,
    max: 50
  }
});
app.use('/products', productService);

// Create some initial data
(async () => {
  const products = app.service('products');

  // Create each product individually
  await products.create({ id: 1, name: 'Loafer', image: 'product1.jpg', price: 100 });
  await products.create({ id: 2, name: 'Skechers', image: 'product2.jpg', price: 200 });

  console.log('Initial products created');
})();

// Define an explicit GET method to fetch all products
app.get('/products', async (req, res) => {
  const products = await productService.find();
  res.json(products);
});

// Error handling middleware
app.use(express.errorHandler());

// Start the server
app.listen(3030, () => {
  console.log('Feathers server running on http://localhost:3030');
});
