exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {first_name: 'Steve', last_name: 'Smith', username: 'ssmith', password: '123'},
        {first_name: 'Stephanie', last_name: 'Stevens', username: 'sstevens', password: '456'}
      ]);
    });
};