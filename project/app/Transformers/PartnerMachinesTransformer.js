'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const MachineTransformer = use('App/Transformers/MachineTransformer')
// const PartnerMachinesTransformer = use('App/Transformers/PartnerMachinesTransformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class PartnerMachinesTransformer extends BumblebeeTransformer {

  static get availableInclude () {
    return [
      'machine'
    ]
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {

    return {
      uuid: model.uuid,
      quantity: model.quantity,
    }
  }


  includeMachine (model) {
    return this.item(model.getRelated('machine'), MachineTransformer)
  }

}

module.exports = PartnerMachinesTransformer
