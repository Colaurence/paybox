'use strict'

const User = use('App/Models/User')
const UserTransformer = use('App/Transformers/UserTransformer')
const UserRepository = make('App/Models/Repositories/UserRepository')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async index({ request, transform }) {
    const filters = await request.only(['first_name', 'last_name', 'email', 'keyword'])
    const users = await UserRepository.getUsersByProfileType(User.resourceKey, filters)

    return await transform.paginate(users, UserTransformer)
  }

  async show({params, transform}){
    const user = await UserRepository.findBy('uuid', params.uuid)
    return await transform.item(user, UserTransformer)
  }

  async delete({params, response}){
    const user = await UserRepository.findBy('uuid', params.uuid)
    user.delete()

    response.json({ message: 'User successfully deleted.' })
  }
}

module.exports = UserController
