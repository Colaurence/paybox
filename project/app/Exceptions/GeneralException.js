'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class GeneralException extends LogicalException {
  /**
   * Handle this exception by itself
   */
    constructor (message, status) {
        super({'message': message}, status)
  }
}

module.exports = GeneralException
