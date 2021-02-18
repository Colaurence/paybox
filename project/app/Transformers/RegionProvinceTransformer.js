'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class RegionProvinceTransformer extends BumblebeeTransformer {

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      name: model.name,
      region_code: model.reg_code,
      province_code: model.prov_code,
    }
  }
}

module.exports = RegionProvinceTransformer
