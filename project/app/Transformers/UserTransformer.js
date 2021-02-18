'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ProfileTransformer = use('App/Transformers/ProfileTransformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {

  static get defaultInclude () {
    return [
      'profile'
    ]
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      uuid: model.uuid,
      email: model.email,
      profile_type: model.profile_type
    }
  }


  includeProfile (model) {
    return this.item(model.getRelated('profile'), ProfileTransformer)
  }

}

module.exports = UserTransformer
