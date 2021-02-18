'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSuperAdministratorSchema extends Schema {
  up() {
    this.create('profile_super_administrators', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable();
      table.string('first_name', 80).notNullable().index();
      table.string('middle_name', 80).nullable().index();
      table.string('last_name', 80).notNullable().index();
      table.string('contact', 13).notNullable().unique().index();
      table.text('profile_photo_url').notNullable();
      table.timestamps()
      table.dateTime('deleted_at').nullable().index()
    })
  }

  down() {
    this.drop('profile_super_administrators')
  }
}

module.exports = ProfileSuperAdministratorSchema
