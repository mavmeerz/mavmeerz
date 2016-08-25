"use strict"
const express     = require('express')
    , router      = express.Router()
    , expenseUtil = require('../util/expenseUtil.js')
    , tokenUtil   = require('../util/tokenUtil.js')
    , goalUtil    = require('../util/goalUtil.js')
    , subCatUtil  = require('../util/subCategoryUtil.js')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Request at /goals received!');
  next();
});

//get sub category totals for specific userID
router.get('/userBudgetData', (req,res,next) => {
  let result = [];
  let userID = tokenUtil.getUserIDFromToken(req.headers['x-access-token']);

  goalUtil.getUserBudgetData({id: userID}).then((budgetData) => res.status(200).send(budgetData));

});

/*
Post upated goals for specific user
in req.body, pass in the following
"goals": [
  {
     subCat: subcategory
     amount: amount that user wants to set as a goal
     essential: 1/0
  }
]
*/
router.post('/updateGoals', (req ,res, next) => {

  let userID = tokenUtil.getUserIDFromToken(req.body.token);

  const goals = req.body.goals

  if(goals){
    goalUtil.updateUserGoalsToDB(goals, userID)
    .then(success => goalUtil.getUserBudgetData({id: userID}))
    .then(budgetData => res.status(201).send(budgetData));
  } else {
    res.send('request body needs expenses!!');
  }
});

module.exports = router;
