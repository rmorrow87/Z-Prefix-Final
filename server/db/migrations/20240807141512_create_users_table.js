exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('username').unique();
    table.string('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};