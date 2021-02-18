'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivityLogsSchema extends Schema {
  up () {
    this.create('activity_logs', (table) => {
      table.increments()
      table.uuid('uuid', 80).notNullable();
      table.string('activity').notNullable().index()
      table.string('transaction').notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('activity_logs')
  }
}

module.exports = ActivityLogsSchema
