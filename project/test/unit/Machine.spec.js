'use strict'

const { test } = use('Test/Suite')('Machine')
const Factory = use('Factory')
const Machine = use('App/Models/Machine')
const ace = use('@adonisjs/ace')
const faker = use('faker')

test('it should create machine', async ({ assert }) => {
  
  const machineData = {
    uuid: faker.random.uuid(),
    machine_name: faker.name.firstName(),
    machine_type: faker.name.findName(),
  }

  const componentsData = {
    name: [1,2,3,4,5]
  }

  const machine = await Machine
        .create(machineData)

  const components = await machine.machineComponent()
        .sync(componentsData)

    assert.equal(machineData.machine_name, machine.machine_name)
    assert.equal(machineData.machine_type, machine.machine_type)
    assert.equal(componentsData.component, components.component)
})
