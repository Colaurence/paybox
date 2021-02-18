'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartnerMachinesDetailsSchema extends Schema {
  up () {
    this.create('partner_machines_details', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable()
      table.string('partner_machine_id').notNullable()
      table.string('serial_code').notNullable().index()
      table.string('street', 80).nullable().index()
      table.string('latitude', 80).nullable()
      table.string('longitude', 80).nullable()
      table.string('region', 80).nullable().index()
      table.string('municipality', 80).nullable().index()
      table.string('province', 80).nullable().index()
      table.string('barangay', 80).nullable().index()
      table.bool('deployed').default('false').index()
      table.string('status').default('active').index()
      table.string('created_by').notNullable()
      table.string('updated_by').notNullable()
      table.timestamps()
      table.dateTime('deleted_at').nullable().index()

    })
  }

  down () {
    this.drop('partner_machines_details')
  }
}

module.exports = PartnerMachinesDetailsSchema
