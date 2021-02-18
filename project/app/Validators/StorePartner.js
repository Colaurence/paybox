'use strict'

class StorePartner {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|min:4|unique:partners,name',
      contact: 'required|max:13|min:11|unique:partners,contact|integer',
      address: 'required|min:10',
      company_email: 'required|email|unique:partners,company_email'
    }
  }

  get messages() {
    return{
      'name.required': 'You must provide a name',
      'name.unique': 'Partner already exist',
      'name.min': 'You must provide a name atleast 4 minimum characters',
      'contact.required': 'You must provide a contact number',
      'contact.max':'You must not exceed 13 digits',
      'contact.min':'You must provide a valid contact number',
      'contact.unique': 'Contact number already exist',
      'address.required': 'You must provide an address',
      'company_email.required': 'You must provide an email address',
      'company_email.email': 'You must provide a valid email address',
      'company_email.unique': 'This email is already exist'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = StorePartner
