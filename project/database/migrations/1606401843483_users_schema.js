'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments('id');
      table.uuid('uuid', 80).notNullable();
      table.string('email', 80).notNullable().index().unique()
      table.string('password', 256).notNullable().index()
      table.integer('profile_id').unsigned().notNullable().index()
      table.string('profile_type', 80).notNullable().index()
      table.string('password_reset_token').nullable()
      table.string('password_reset_expires').nullable()
      table.timestamps()
      table.dateTime('deleted_at').nullable().index()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UsersSchema
