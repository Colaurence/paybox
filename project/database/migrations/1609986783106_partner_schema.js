'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartnerSchema extends Schema {
  up () {
    this.create('partners', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable();
      table.string('name', 80).notNullable().index().unique();
      table.string('contact', 13).notNullable().unique().index();
      table.string('address').notNullable()
      table.string('company_email', 40).notNullable().unique().index();
      table.text('profile_photo_url').notNullable();
      table.dateTime('deleted_at').nullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('partners')
  }
}

module.exports = PartnerSchema
