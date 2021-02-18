'use strict'

const { LogicalException } = use('@adonisjs/generic-exceptions')
const Config = use('Config')

class MachineNotFoundException extends LogicalException {
    constructor (message) {
        super({'message': message}, 404)
    }
}

module.exports = MachineNotFoundException
