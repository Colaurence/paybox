'use strict'
const Database = use('Database')
/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
  //   const user = await Factory
  // .model('App/Models/User')
  // .create()
  }
}

module.exports = UserSeeder
