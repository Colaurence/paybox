'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MachinesComponentsSchema extends Schema {
  up () {
    this.create('machines_components', (table) => {
      table.string('type_id', 40).notNullable().index()
      table.string('type_component_id', 40).notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('machines_components')
  }
}

module.exports = MachinesComponentsSchema
