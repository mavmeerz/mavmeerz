"use strict"
/**
 *   Creates our schema for storing our app's data. We create two tables,
 *   one to store users and one to store their messages.
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

knex.schema.hasTable('csv').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('csv', function(table) {
      table.increments('id').primary();
      table.string('csvTitle');
      table.timestamps();
    });
  }
});

knex.schema.hasTable('expenses').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('expenses', function(table) {
      table.increments('id').primary();
      table.string('csvId');
      table.string('description');
      table.string('cost');
      table.string('category');
      table.timestamps();
    });
  }
});

const Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
