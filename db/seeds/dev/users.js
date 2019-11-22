exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, api_key: '222'}),
        knex('users').insert({id: 2, api_key: '333'}),
        knex('users').insert({id: 3, api_key: '444'})
      ]);
    });
};
