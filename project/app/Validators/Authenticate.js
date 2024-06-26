'use strict'

class Authenticate {
  get rules() {
    return {
      email: 'required|email|exists:users,email',
      password: 'required'
    }

  }

  get messages() {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.exists': 'You must provide a valid email address.',
      'password.required': 'You must provide a password'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = Authenticate
