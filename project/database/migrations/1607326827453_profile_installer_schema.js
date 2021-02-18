'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileInstallerSchema extends Schema {
  up () {
    this.create('profile_installers', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable();
      table.string('first_name', 80).notNullable().index();
      table.string('middle_name', 80).nullable().index();
      table.string('last_name', 80).notNullable().index();
      table.text('profile_photo_url').notNullable();
      table.string('contact', 13).unique().index()
      table.integer('added_by').notNullable()
      table.boolean('is_first_login').default('true')
      table.timestamps()
      table.dateTime('deleted_at').nullable().index()
    })
  }

  down () {
    this.drop('profile_installers')
  }
}

module.exports = ProfileInstallerSchema
