'use strict'

const { LogicalException } = use('@adonisjs/generic-exceptions')
const Config = use('Config')

class MachineDeployedException extends LogicalException {
    constructor (message) {
        super({'message': message}, 422)
    }
}

module.exports = MachineDeployedException
