'use strict'

const { test } = use('Test/Suite')('Partner')
const Factory = use('Factory')
const Partner = use('App/Models/Partner')
const ace = use('@adonisjs/ace')
const faker = use('faker')

test('It should create Partner', async ({ assert }) => {
  
  const partnerData = {
    uuid: faker.random.uuid(),
    name: faker.name.findName(),
    address: faker.random.uuid(),
    contact: faker.name.findName(),
    company_email: faker.internet.email(),
    profile_photo_url: faker.internet.url(),
  }

  const partner = await Partner.create(partnerData);

  assert.equal(partnerData.uuid, partner.uuid)
  assert.equal(partnerData.name, partner.name)
  assert.equal(partnerData.address, partner.address)
  assert.equal(partnerData.contact, partner.contact)
  assert.equal(partnerData.company_email, partner.company_email)
  assert.equal(partnerData.profile_photo_url, partner.profile_photo_url)
  
})

test('It should update Partner', async ({ assert }) => {
  const createPartnerData = {
    uuid: '111222333',
    name: faker.name.findName(),
    address: faker.random.uuid(),
    contact: faker.name.findName(),
    company_email: faker.internet.email(),
    profile_photo_url: faker.internet.url(),
  }

  const createPartner = await Partner.create(createPartnerData);


  const partnerData = {
    name: faker.name.findName(),
    address: faker.random.uuid(),
    contact: faker.name.findName(),
    company_email: faker.internet.email(),
    profile_photo_url: faker.internet.url(),
  }

  const partner = await Partner.findBy('uuid', '111222333')

  await partner.merge({...partnerData})
  await partner.save()
  

  assert.equal(partnerData.name, partner.name)
  assert.equal(partnerData.address, partner.address)
  assert.equal(partnerData.contact, partner.contact)
  assert.equal(partnerData.company_email, partner.company_email)
  assert.equal(partnerData.profile_photo_url, partner.profile_photo_url)
})