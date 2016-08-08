"use strict"
const User = require('../models/user.js');


exports.addUser = (user) => {
  return new User({
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName
  }).save();
};


/**
  This function will take an email for input and return a
  'User' Bookshelf model 
 */
exports.getUser = (userEmail) => {
  return new Promise((resolve,reject) => {
    new User().fetch({email: userEmail}).then((user) => {
      resolve(user)
    })
  });
};
