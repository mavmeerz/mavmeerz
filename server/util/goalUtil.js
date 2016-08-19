"use strict"
const goalController = require('../controllers/goalController.js');
const subCategoryController = require('../controllers/subCategoryController.js');
const expenseController = require('../controllers/expenseController.js');
const catData = require('../categoriesData.js');

// TODO change to update user goals instead of adding them
function addUserGoalsToDB(userGoals,userId) {
  userGoals.forEach((goal) => {
    goal.userId = userId;
    goalController.addGoal(goal);
  });
};

function updateUserGoalsToDB(userGoals,userId) {
  return new Promise((resolve, reject) => {
    let promises = [];
    userGoals.forEach((goal) => {
      goal.userId = userId;
      promises.push(goalController.updateGoal(goal));
    })
    Promise.all(promises).then(() => resolve('Success updating expenses!'));
  })
};

function initialGoalsTableFill(userId) {
  catData.forEach((catObj) => {
    for(var mainCat in catObj){
      catObj[mainCat].forEach((subCat) => {
        var initGoal = {
          userId: userId,
          subCat: subCat,
          amount: 0,
          essential: 0
        }
        goalController.addGoal(initGoal);
      });
    };
  });
};

function getUserGoals(user) {
  return goalController.getGoals(user)
};


function getUserBudgetData(user){
  return new Promise((resolve,reject) => {

    expenseController.getExpenses(user).then((expenses) => {
      getUserGoals(user).then((userGoals) => {
        subCategoryController.getAllSubCategories().then((sCats) => {

          var catArr = []
          sCats.forEach((sCat)=>{
            var catObj = {}
            var sum = 0;
            expenses.forEach((expObj) => {
              if(expObj.attributes.categoryId === sCat[0]){
                sum += expObj.attributes.amount;
              }
            });

            catObj['id'] = sCat[0];
            catObj['category'] = sCat[1];
            catObj['currAmount'] = sum;
            catObj['goalAmount'] = userGoals[sCat[0]][0];
            catObj['essential'] = userGoals[sCat[0]][1];
            catArr.push(catObj);

          });
          resolve(catArr)
        });
      });
    });
  });

}

module.exports = {
  addUserGoalsToDB: addUserGoalsToDB,
  updateUserGoalsToDB: updateUserGoalsToDB,
  initialGoalsTableFill: initialGoalsTableFill,
  getUserGoals: getUserGoals,
  getUserBudgetData: getUserBudgetData
}
