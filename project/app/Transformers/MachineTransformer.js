'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const MachineTypeTransformer = use('App/Transformers/MachineTypeTransformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class MachineTransformer extends BumblebeeTransformer {

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      uuid: model.uuid,
      machine_code: model.machine_code,
      machine_name: model.machine_name,
      machine_type: model.machine_type
    }
  }

}

module.exports = MachineTransformer
