'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartnerMachinesSchema extends Schema {
  up () {
    this.create('partner_machines', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable();
      table.string('machine_id', 80).notNullable().index()
      table.string('partner_id', 80).notNullable().index()
      table.integer('total_quantity').notNullable()
      table.integer('quantity').notNullable()
      table.string('created_by').notNullable()
      table.string('updated_by').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('partner_machines')
  }
}

module.exports = PartnerMachinesSchema
