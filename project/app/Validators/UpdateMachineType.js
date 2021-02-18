'use strict'

class UpdateMachineType {
  get validateAll () {
    return true
  }

  get rules () {
    const userId = this.ctx.params.uuid
    return {
      machine_type: `required|min:6|unique:machine_types,machine_type,uuid,${userId}`,
      component: 'required|array',
      'component.*': 'exists:machine_components,id'
    }
  }

  get messages() {
    return {
      'machine_type.required': 'You must provide a machine type.',
      'component': 'You must atleast specify 1 component',
      'component.*.exists': 'Invalid machine component'
    }
  }
  
  async fails(errorMessages) {
    const messages = errorMessages.map(err => ({errors: err.message}));
		return this.ctx.response.status(422).json({error:errorMessages});
	}
}

module.exports = UpdateMachineType