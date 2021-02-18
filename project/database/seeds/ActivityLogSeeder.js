'use strict'
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| MachinComponentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class MachineComponentSeeder {
  async run () {
    const activityLog = await Factory
  .model('App/Models/ActivityLog')
  .create()
  }
}

module.exports = MachineComponentSeeder
