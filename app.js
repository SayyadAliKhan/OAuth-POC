const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongo.dbUri, () => {
  console.log("Connect to db");
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});
