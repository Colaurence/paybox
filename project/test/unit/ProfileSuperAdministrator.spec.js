'use strict'

const { test } = use('Test/Suite')('Profile Super Administrator Unit Test')
const ProfileSuperAdministrator = use('App/Models/ProfileSuperAdministrator')
const ace = use('@adonisjs/ace')
const faker = use('faker')
const Factory = use('Factory')

test('it should create the profile super administrator', async ({ assert }) => {

    const profileData = {
        uuid: faker.random.uuid(),
        first_name: faker.name.firstName(),
        middle_name: faker.name.findName(),
        last_name: faker.name.lastName(),
        profile_photo_url: faker.image.imageUrl()
    }

    const userData = {
        uuid: faker.random.uuid(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(),
    }

    const profileSuperAdministrator = await ProfileSuperAdministrator
        .create(profileData)

    const user = await profileSuperAdministrator.user()
        .create(userData)

    assert.equal(profileData.first_name, profileSuperAdministrator.first_name)
    assert.equal(profileData.last_name, profileSuperAdministrator.last_name)
    assert.equal(userData.email, user.email)
})
