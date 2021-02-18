'use strict'

class UpdatePartner {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|min:4',
      contact: 'required|max:13|min:11|number',
      address: 'required|min:10',
      company_email: 'required|email'
    }
  }

  get messages() {
    return{
      'name.required': 'You must provide a name',
      'name.min': 'You must provide a name atleast 4 minimum characters',
      'contact.required': 'You must provide a contact number',
      'contact.max':'You must not exceed 13 digits',
      'contact.min':'You must provide atleast 11 digits',
      'contact.number': 'You must provide a valid contact number',
      'address.required': 'You must provide an address',
      'company_email.required': 'You must provide an email address',
      'company_email.email': 'You must provide a valid email address',
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = UpdatePartner
