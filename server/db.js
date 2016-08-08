"use strict"
/**
 *   Creates our schema for storing our app's data. We create two tables,
 *   one to store csv file names and one to store the expense data.
 */

 const knex = require('knex')({
   client: 'mysql',
   connection: {
     host     : '127.0.0.1',
     port     : '3306',
     user     : 'root',
     password : '',
     database : 'zenmoDB',
     charset  : 'utf8'
   }
 });

knex.schema.hasTable('users').then(function(exists) {
 if (!exists) {
   return knex.schema.createTable('users', function (user) {
     user.increments('id').primary();
     user.string('email', 100).unique();
     user.string('password', 100);
     user.string('firstName', 100);
     user.string('lastName', 100);
     user.timestamps();
     knex.schema
     console.log(`Created users table`);
   });//.then(function () {
     //console.log('Created users table');
   //});
 }
});

knex.schema.hasTable('statements').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('statements', function(table) {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.string('csvTitle');
      table.timestamps();
      console.log(`Created statements table`);
    });
  }
});

knex.schema.hasTable('categories').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('other');
      table.timestamps();
      console.log(`Created categories table`);
    });
  }
})

knex.schema.hasTable('expenses').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('expenses', function(table) {
      table.increments('id').primary();
      table.string('description');
      table.string('category');
      table.float('amount',6,2);
      table.date('date')
      table.integer('categoryId').unsigned().references('id').inTable('categories');
      table.integer('statementId').unsigned().references('id').inTable('statements');
      table.integer('userId').unsigned().references('id').inTable('users');
      table.timestamps();
      console.log(`Created expenses table`);
    });
  }
});


const Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
