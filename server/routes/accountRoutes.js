"use strict"
const express     = require('express')
    , router      = express.Router()
    , accountUtil = require('../util/accountUtil.js');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Request at /accounts received!');
  next();
});

// send accounts for expenses
router.post('/', (req, res) => {
  accountUtil.addAccountToDB(req.body.account, req.body.userId).then(() => {
    res.send('account successfully added');
  });
});

module.exports = router;
