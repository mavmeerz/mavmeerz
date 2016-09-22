const userController = require('../controllers/userController.js');

function addUserToDB(userInfo) {
  // console.log('sucess');
  return new Promise((resolve, reject) => {
    userController.addUser(userInfo)
      .then((user) => {
        resolve({
          id:        user.get('id'),
          firstName: user.get('firstName'),
          lastName:  user.get('lastName')
        });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
  });
}

function attemptLogin(userInfo) {
  return new Promise((resolve, reject) => {
    userController.getUser(userInfo.email)
      .then((user) => {
        user.comparePassword(userInfo.password, (matches) => {
          matches ? resolve({
            id:        user.get('id'),
            firstName: user.get('firstName'),
            lastName:  user.get('lastName')
          }) : reject('failure');
        });
      });
  });
}

module.exports = {
  addUserToDB: addUserToDB,
  attemptLogin: attemptLogin
};
