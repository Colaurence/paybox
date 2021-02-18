'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class ProvinceMunicipalityTransformer extends BumblebeeTransformer {

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      name: model.name,
      province_code: model.prov_code,
      municipality_code: model.mun_code,
    }
  }
}

module.exports = ProvinceMunicipalityTransformer
