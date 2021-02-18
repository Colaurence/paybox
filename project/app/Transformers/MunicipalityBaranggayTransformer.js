'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class MunicipalityBaranggayTransformer extends BumblebeeTransformer {

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      name: model.name,
      municipality_code: model.mun_code,
    }
  }
}

module.exports = MunicipalityBaranggayTransformer
