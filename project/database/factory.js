'use strict'
const { v4: uuidv4 } = require('uuid');
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     uuid : uuidv4(),
//     profile_id: '1',
//     email: 'paybox-core@multisyscorp.com',
//     password: 'paybox1234',
//     profile_type: 'profile_super_administrators'
//   }
// })


// Factory.blueprint('App/Models/MachineComponent', (faker) => {
//   return {
//     id: 9,
//     uuid : uuidv4(),
//     name: 'NFC Reader',
//   }
// })

Factory.blueprint('App/Models/ActivityLog', (faker) => {
  return {
    id: 1,
    uuid : uuidv4(),
    activity: 'Created a User Account',
    transaction: 'Admin has created an account for Julian'
  }
})
