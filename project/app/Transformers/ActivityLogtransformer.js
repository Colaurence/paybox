'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

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
      acitvity: model.activity,
      transaction: model.transaction,
      created_at: model.created_at
      
    }
  }

}

module.exports = MachineTransformer
