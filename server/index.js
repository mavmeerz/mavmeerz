const express    = require('express')
    , app        = express()
    , port       = process.env.PORT || 3000
    , bodyParser = require('body-parser')
    , expressCSV = require('express-csv-middleware')
    , fs         = require('fs')

/// for development ///
const morgan = require('morgan');

app.use(morgan('dev'));
///      ////      ///

// to make parsing requests easier ///
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/// looks for 'index.html' in '/../build' by default ///
app.use(express.static(__dirname + '/../build'));

// ROUTES //
const router = express.Router();

// middleware for every request //
router.use((req, res, next) => {
  console.log('Every request goes through here!');
  next();
});

// modularized routes //

// TO-DO: figure out how to have /v1/api automatically be appended
// const apiRoute      = router.route('/v1/api')
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes    = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const goalRoutes    = require('./routes/goalRoutes');

app.use('/v1/api', userRoutes);
app.use('/v1/api/expenses', expenseRoutes);
app.use('/v1/api/accounts', accountRoutes);
app.use('/v1/api/goals', goalRoutes);

// redirect gets to root if address not found //
app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port);

console.log('Zenmo is now listening on port ' + port);

module.exports = app;
