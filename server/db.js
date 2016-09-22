"use strict"
/**
 *   Creates our schema for storing our app's data. We create two tables,
 *   one to store csv file names and one to store the expense data.
 */

 // const localConnection = {
 //   host     : '127.0.0.1',
 //   port     : '3306',
 //   user     : 'root',
 //   password : '',
 //   database : 'zenmoDB',
 //   charset  : 'utf8'
 // }
// const deployedHerokuConnection = {
//   host     : 'us-cdbr-iron-east-04.cleardb.net',
//  //  port     : '8080',
//   user     : 'b54fca61493351',
//   password : '95b13c3b',
//   database : 'heroku_80053029a9135e3',
//   charset  : 'utf8'
// }

 const knex = require('knex')({
   client: 'mysql',
   connection: {
     host     : 'us-cdbr-iron-east-04.cleardb.net',
     user     : 'b54fca61493351',
     password : '95b13c3b',
     database : 'heroku_80053029a9135e3',
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

knex.schema.hasTable('accounts').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('accounts', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('userId').unsigned().references('id').inTable('users');
      table.timestamps();
      console.log('Created accounts table');
    });
  }
});

knex.schema.hasTable('categories').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('category');
      table.timestamps();
      console.log(`Created main categories table`);
    });
  }
})

// TODO - remove 'essential' column from this table and also from all of the functions that use it
knex.schema.hasTable('sub_categories').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('sub_categories', function(table) {
      table.increments('id').primary();
      table.string('sub_category');
      table.boolean('essential');
      table.timestamps();
      console.log(`Created sub categories table`);
    });
  }
})

knex.schema.hasTable('join_categories').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('join_categories', function(table) {
      table.integer('mainCatId').unsigned().references('id').inTable('categories');
      table.integer('subCatId').unsigned().references('id').inTable('sub_categories');;
      table.timestamps();
      console.log(`Created join categories table`);
    });
  }
})

knex.schema.hasTable('goals').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('goals', function(table) {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('subCatId').unsigned().references('id').inTable('sub_categories');
      table.float('amount',6,2);
      table.boolean('essential');
      table.timestamps();
      console.log(`Created goals table`);
    });
  }
});

knex.schema.hasTable('expenses').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('expenses', function(table) {
      table.increments('id').primary();
      table.string('description');
      table.float('amount',6,2);
      table.date('date');
      table.integer('categoryId').unsigned().references('id').inTable('sub_categories');
      table.integer('statementId').unsigned().references('id').inTable('statements');
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('accountId').unsigned().references('id').inTable('accounts');
      table.timestamps();
      console.log(`Created expenses table`);
    });
  }
});

const Bookshelf = require('bookshelf')(knex);

module.exports = {
  Bookshelf: Bookshelf,
  knex: knex
};
