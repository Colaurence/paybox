'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstallerDeviceSchema extends Schema {
  up () {
    this.create('installer_devices', (table) => {
      table.increments() 
      table.integer('device_id')
      table.integer('installer_id')
      table.string('status').default('Not yet installed') //installed/not yet installed
      table.timestamps()
      table.dateTime('deleted_at').nullable().index()
    })
  }

  down () {
    this.drop('installer_devices')
  }
}

module.exports = InstallerDeviceSchema
