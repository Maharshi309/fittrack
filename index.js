const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session'); // Import express-session for session management
const authRoutes = require('./routes/auth'); // Import the auth routes
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fit-track', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// Configure session middleware
app.use(session({
    secret: 'malo4323malo', // Replace 'your_secret_key' with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Use true if you're on HTTPS
}));

// Route for the homepage
app.get("/", (req, res) => {
    const user = req.session.user; // Access the logged-in user from the session
    res.render('index', { user }); // Pass user data to the view
});

// Route for the authentication page
app.get("/auth", (req, res) => {
    res.render("auth");
});

// Route for BMI calculator
app.get("/bmi", (req, res) => {
    const user = req.session.user;
    res.render("bmi", { user });
});

app.get("/cardio",(req,res)=>{
    const user = req.session.user;
    res.render("cardio", { user });
})

app.get("/blog",(req,res)=>{
    const user = req.session.user;
    res.render("blog", { user });
})

app.get("/zumba",(req,res)=>{
    const user = req.session.user;
    res.render("zumba", { user });
})

app.get("/calisthenics",(req,res)=>{
    const user = req.session.user;
    res.render("calisthenics", { user });
})

app.get("/gym",(req,res)=>{
    const user = req.session.user;
    res.render("gym", { user });
})


app.get("/swim",(req,res)=>{
    const user = req.session.user;
    res.render("swim", { user });
})


app.get("/yoga",(req,res)=>{
    const user = req.session.user;
    res.render("yoga", { user });
})
// Use authentication routes for /auth endpoint
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
