exports.up = function(knex) {
  return knex.schema.createTable('items', function(table) {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.string('item_name');
    table.text('description');
    table.integer('quantity');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('items');
};