'use strict'

class StoreMachine {
  get validateAll () {
    return true
  }

  get rules () {

    return {
      machine_name: 'required|min:6',
    }
  }

  get messages() {
    return {
      'machine_name.required': 'You must provide a machine name.',
      'machine_name.min': 'You must provide a machine name atleast 6 characters',
    }
  }
  
  async fails(errorMessages) {
    const messages = errorMessages.map(err => ({errors: err.message}));
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = StoreMachine
