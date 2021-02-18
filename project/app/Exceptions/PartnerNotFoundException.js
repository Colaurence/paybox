'use strict'

const { LogicalException } = use('@adonisjs/generic-exceptions')
const Config = use('Config')

class PartnerNotFoundException extends LogicalException {
    constructor (message) {
        super({'message': message}, 404)
    }
}

module.exports = PartnerNotFoundException
