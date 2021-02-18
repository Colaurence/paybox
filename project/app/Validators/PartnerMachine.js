'use strict'

class PartnerMachine {
  get rules () {
    return {
      assign_partner: 'required|array',
    }
  }
}

module.exports = PartnerMachine
