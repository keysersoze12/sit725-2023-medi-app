const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Import the User and Checkout models
const User = require('./models/userModel');
const Checkout = require('./models/checkoutModel');

// Initialize express app
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//MIME type definition
app.use('/public', (req, res, next) => {
  const filePath = path.join(__dirname, 'public', req.url);
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    } else {
      res.setHeader('Content-Type', contentType);
      res.end(content, 'utf-8');
    }
  });
});

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Passport local strategy for authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medi-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Handling connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define storage for prescription files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create upload instance
const upload = multer({ storage: storage });

// Custom middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Prescription upload route
app.post('/prescriptions', upload.single('prescription'), (req, res) => {
 
  res.send('Prescription received successfully!');
});

// Checkout route
app.post('/checkout', (req, res) => {
  const { name, medicineName, dosage } = req.body; // This is to include dosage in the request body

  // Check if all required fields are present
  if (!name || !medicineName || !dosage) {
    return res.status(400).send('Name, Medicine Name, and Dosage are required');
  }

  // Create a new Checkout entry
  const newCheckout = new Checkout({
    name: name,
    medicine: medicineName,
    dosage: dosage // Include dosage field
  });

  // Save the new Checkout entry to MongoDB
  newCheckout.save()
    .then(() => {
      console.log('Checkout details saved successfully');
      res.send('Checkout details saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving checkout details:', error);
      res.status(500).send('Error saving checkout details to MongoDB');
    });
});


// Login route
app.get('/login', (req, res) => {
  res.redirect('/public/login.html'); // To redirect unauthenticated users to login page
});

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/public/index.html');
});


app.get('/public/index.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Root path 
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
