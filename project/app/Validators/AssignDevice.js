'use strict'

class AssignDevice {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      device_id: 'required'
    }
  }

  get messages () {
    return {
      'device_id.required': 'You must select a device.'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = AssignDevice
