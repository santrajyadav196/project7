const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');
const Diam = require('./models/diam');


mongoose.connect('mongodb://localhost:27017/diam', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'This is secret!!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/register', (req, res) => {
    res.render('users/register')
})

app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.flash("success", 'Welocome to dhawani!!!')
        res.redirect('/diams')
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.render('users/login')
})

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash("success", "Welcome Back!!")
    res.redirect('/diams')
})

app.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "GoodBye!!")
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/diams', async (req, res) => {
    const diams = await Diam.find({});
    res.render('diams/index', { diams });
})

app.get('/diams/new', (req, res) => {
    res.render('diams/new')
})

app.post('/diams', async (req, res) => {
    const newDiam = new Diam(req.body);
    await newDiam.save();
    res.redirect(`/diams/${newDiam._id}`)
});

app.get('/diams/:id', async (req, res) => {
    const { id } = req.params;
    const diam = await Diam.findById(id);
    res.render('diams/show', { diam })
});

app.get('/diams/:id/edit', async (req, res) => {
    const { id } = req.params;
    const diam = await Diam.findById(id);
    res.render('diams/edit', { diam })
})

app.put('/diams/:id', async (req, res) => {
    const { id } = req.params;
    const diam = await Diam.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/diams/${diam._id}`);
})

app.delete('/diams/:id', async (req, res) => {
    const { id } = req.params;
    const deletedDiam = await Diam.findByIdAndDelete(id);
    res.redirect('/diams');
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
});
