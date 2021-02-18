'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const PartnerTransformer = use('App/Transformers/PartnerTransformer')
// const PartnerMachinesTransformer = use('App/Transformers/PartnerMachinesTransformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class MachinePartnersTransformer extends BumblebeeTransformer {

  static get availableInclude () {
    return [
      'partner'
    ]
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      uuid: model.uuid,
      quantity: model.quantity
    }
  }


  includePartner (model) {
    return this.item(model.getRelated('partner'), PartnerTransformer)
  }

}

module.exports = MachinePartnersTransformer
