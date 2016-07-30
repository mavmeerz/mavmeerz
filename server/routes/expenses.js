const express = require('express');
const router  = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Request at /expenses received!');
  next();
});

// send expenses
router.post('/', (req, res) => {
  res.send('post expenses');
});

module.exports = router;
