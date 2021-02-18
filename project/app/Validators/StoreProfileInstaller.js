'use strict'

class StoreProfileInstaller {
  get validateAll () {
    return true
  }

  get rules() {
    return {
      email: 'required|email|unique:users,email',
      password: 'required|min:8',
      first_name: 'required',
      middle_name: 'required',
      last_name: 'required',
      contact: 'required|unique:profile_installers',
      profile_photo_url: 'required|url'
    }
  }

  get messages() {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'first_name.required': 'You must provide a first name.',
      'middle_name.required': 'You must provide a middle name.',
      'last_name.required': 'You must provide a last name.',
      'contact.required': 'You must provide a contact number'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = StoreProfileInstaller
