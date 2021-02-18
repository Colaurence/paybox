'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MachineSchema extends Schema {
  up () {
    this.create('machines', (table) => {
      table.increments()
      table.uuid('uuid', 80).unique().notNullable()
      table.uuid('machine_code').notNullable()
      table.string('machine_name', 80).notNullable().index()
      table.string('machine_type', 80).notNullable().index()
      table.string('machine_type_id', 80).notNullable()
      table.timestamps()
      table.dateTime('deleted_at').nullable().index()
    })
  }

  down () {
    this.drop('machines')
  }
}

module.exports = MachineSchema
