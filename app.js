const express = require('express');
let session = require('express-session');
const morgan = require('morgan');
let passport = require('passport');
const config = require('./helpers/config');
const app = express();
const port = process.env.PORT || 3000;



app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
  secret:'keyboardcat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));



app.get('/', (req, res) => {
  res.redirect('./index.html');
});

app.use('/',require('./controllers/'));

passport.use(require('./helpers/localStrategy'));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.listen(port);
