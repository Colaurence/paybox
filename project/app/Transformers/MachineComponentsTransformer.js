'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ProfileTransformer class
 *
 * @class ProfileTransformer
 * @constructor
 */
class MachineComponentsTransformer extends BumblebeeTransformer {

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    console.log(model);
    return {
      id: model.id,
      uuid: model.uuid,
      name: model.name,
    }
  }
}

module.exports = MachineComponentsTransformer
