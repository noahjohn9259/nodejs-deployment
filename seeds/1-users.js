const bcrypt = require('bcrypt-nodejs')

const password = bcrypt.hashSync('test');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('users').insert({id: 1, email: 'test@gmail.com', password: password}),
    knex('users').insert({id: 2, email: 'test1@gmail.com', password: password}),
    knex('users').insert({id: 3, email: 'test2@gmail.com', password: password})
  ]);
};
