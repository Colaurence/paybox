'use strict'

class UpdateProfileSuperAdministrator {
  get rules() {
    return {
      first_name: 'required',
      middle_name: 'required',
      last_name: 'required',
      profile_photo_url: 'required|url'
    }

  }

  get messages() {
    return {
      'first_name.required': 'You must provide a first name.',
      'middle_name.required': 'You must provide a middle name.',
      'last_name.required': 'You must provide a last name.',
      'profile_photo_url.url': 'You must provide a valid photo url.',
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = UpdateProfileSuperAdministrator
