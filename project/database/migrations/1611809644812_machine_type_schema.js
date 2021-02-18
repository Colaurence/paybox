'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MachineTypeSchema extends Schema {
  up () {
    this.create('machine_types', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable();
      table.string('machine_type').notNullable().index()
      table.timestamps()
      table.dateTime('deleted_at').nullable().index()
    })
  }

  down () {
    this.drop('machine_types')
  }
}

module.exports = MachineTypeSchema
