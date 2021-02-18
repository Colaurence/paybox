'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MachineComponentsSchema extends Schema {
  up () {
    this.create('machine_components', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable();
      table.string('name', 80).notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('machine_components')
  }
}

module.exports = MachineComponentsSchema
