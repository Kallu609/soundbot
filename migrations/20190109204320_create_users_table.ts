import * as Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('users', table => {
    table.bigInteger('id').notNullable();
    table.string('current_action').defaultTo('');
    table.jsonb('last_sound').defaultTo('{}');
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('users');
};
