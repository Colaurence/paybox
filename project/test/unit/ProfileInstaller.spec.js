'use strict'

const { test } = use('Test/Suite')('Profile Installer Unit Test')
const ProfileInstaller = use('App/Models/ProfileInstaller')
const ace = use('@adonisjs/ace')
const faker = use('faker')
const Factory = use('Factory')

test('It should create the profile of installer', async ({ assert }) => {
  
  const profileInstallerData = {
    uuid: faker.random.uuid(),
    first_name: faker.name.firstName(),
    middle_name: faker.name.findName(),
    last_name: faker.name.lastName(),
    contact: faker.phone.phoneNumber(),
    profile_photo_url: faker.image.imageUrl(),
    added_by: 1
  }

  const userData = {
    uuid: faker.random.uuid(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(),
}

  const profileInstaller = await ProfileInstaller
      .create(profileInstallerData);
  
  const user = await profileInstaller.user()
      .create(userData)

      assert.equal(profileInstallerData.first_name, profileInstaller.first_name)
      assert.equal(profileInstallerData.last_name, profileInstaller.last_name)
      assert.equal(profileInstallerData.contact, profileInstaller.contact)
      assert.equal(userData.email, user.email)
})
