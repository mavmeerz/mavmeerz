"use strict"
const Category = require('../models/category.js');

exports.addCategory = (cat) => {
  new Category({category: cat}).save();
};

exports.checkCategoryTable = () => {
  return new Promise((resolve,reject) => {
      new Category().fetch().then((data) => resolve(data));
  });
}