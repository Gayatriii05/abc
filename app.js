require('dotenv').config();


const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit'); // Prevents too many requests

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/contact', apiLimiter, require('./routes/contactRoutes'));
app.use('/api/verify-email', apiLimiter, require('./routes/verifyEmail'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'views', 'services.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'views', 'blog.html')));
app.get('/contact', (req, res) => {
    res.render('contact');  // Renders 'contact.ejs' file from 'views' folder
});


app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
