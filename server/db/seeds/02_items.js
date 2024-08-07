exports.seed = function(knex) {
  return knex('items').del()
    .then(function () {
      return knex('items').insert([
        {user_id: 1, item_name: 'CAC', description: 'A Department of Defense Common Access Card.', quantity: 1},
        {user_id: 1, item_name: 'Dog Tags', description: 'Standard, military issue dog tags.', quantity: 2},
        {user_id: 2, item_name: 'A Will to Live', description: 'Probably a good thing to have.', quantity: 50},
      ]);
    });
};