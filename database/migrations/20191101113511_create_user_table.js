exports.up = function(knex) {
  return knex.schema.createTable('login_user', table => {
    table.increments('id').unsigned().primary();
    table.string('firstName').notNull();
    table.string('lastName').notNull();
    table.string('email').notNull();
    table.string('password_digest').notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('login_user')
};
