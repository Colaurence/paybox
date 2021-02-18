'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ProfileTransformer class
 *
 * @class ProfileTransformer
 * @constructor
 */
class ProfileTransformer extends BumblebeeTransformer {

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      first_name: model.first_name,
      middle_name: model.middle_name,
      last_name: model.last_name,
      contact: model.contact,
      profile_photo_url: model.profile_photo_url
    }
  }
}

module.exports = ProfileTransformer
