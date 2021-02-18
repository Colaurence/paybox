'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const PartnerMachinesTransformer = use('App/Transformers/PartnerMachinesTransformer')


/**
 * ProfileTransformer class
 *
 * @class ProfileTransformer
 * @constructor
 */
class PartnerTransformer extends BumblebeeTransformer {

    static get availableInclude () {
        return [
          'machines'
        ]
      }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      uuid: model.uuid,
      name: model.name,
      contact: model.contact,
      address: model.address,
      company_email: model.company_email,
      profile_photo_url: model.profile_photo_url
    }
  }

  includeMachines (model) {
    return this.collection(model.getRelated('machines'), PartnerMachinesTransformer)
  }
}

module.exports = PartnerTransformer
