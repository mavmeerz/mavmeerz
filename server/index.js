const express = require('express')
    , app     = express()
    , port    = process.env.PORT || 8080;

/// for development ///
const morgan = require('morgan');

app.use(morgan('dev'));
///      ////      ///


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
const expenseRoutes = require('./routes/expenses');

app.use('/v1/api/expenses', expenseRoutes);

app.listen(port);

console.log('Zenmo is now listening on port ' + port);

module.exports = app;
