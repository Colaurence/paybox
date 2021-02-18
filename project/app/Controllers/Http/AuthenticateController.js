'use strict'

const GeneralException = use('App/Exceptions/GeneralException')
const UserRepository = make('App/Models/Repositories/UserRepository')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with authenticate
 */
class AuthenticateController {
  async login ({ request, auth, response }) {
      try {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        const user = await UserRepository.findBy('email', email)

        return response.json({
            token: token.token
        })

    } catch (error){
        throw new GeneralException('Invalid credentials. Please try again', 400)
    }
  }
}

module.exports = AuthenticateController
