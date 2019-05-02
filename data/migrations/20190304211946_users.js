
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users =>{
    users.increments();
    users.string('username', 128 ).notNullable().unique();
    users.string('password', 128).notNullable();
    users.string('email').notNullable().unique();
    users.string('google_id', 128).unique();
    // If this account is also a client account then attach that ID to this
    users.integer('client_id').unsigned();
    users.integer('membership_id').unsigned().notNullable().references('id').inTable('memberships');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
