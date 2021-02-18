'use strict'

const User = use('App/Models/User')
const { v4: uuidv4 } = require('uuid');
const UserTransformer = use('App/Transformers/UserTransformer')
const UserRepository = make('App/Models/Repositories/UserRepository')
const ProfileSuperAdministrator = use('App/Models/ProfileSuperAdministrator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profilesuperadministrators
 */
class ProfileSuperAdministratorController {

  async store({ request, transform }){
    const profileData = request.only(await ProfileSuperAdministrator.fillables)
    const userData = request.only(await User.fillables)
    
    const createProfile = await ProfileSuperAdministrator.create({
      uuid : uuidv4(),
      ...profileData
    })
    const createUser = await createProfile.user().create({
      uuid : uuidv4(),
      ...userData
    })

    const user = await User.findOrFail(createUser.id)
    return await transform.item(user, UserTransformer)
  }

  async update({params, request, transform}){
    const profileData = request.only(await ProfileSuperAdministrator.fillables)
    const user = await UserRepository.findBy('uuid', params.uuid)
    await user.profile().update(profileData)

    return await transform.item(user, UserTransformer)
  }
}

module.exports = ProfileSuperAdministratorController
