'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const MachineComponentsTransformer = use('App/Transformers/MachineComponentsTransformer')


/**
 * ProfileTransformer class
 *
 * @class ProfileTransformer
 * @constructor
 */
class MachineTypeTransformer extends BumblebeeTransformer {

    static get availableInclude () {
        return [
          'type_component'
        ]
      }

    transform (model) {
        return {
        uuid: model.uuid,
        machine_type: model.machine_type,
        machine_type_id: model.machine_type_id
        }
    }

    includeTypeComponent (model) {
        return this.collection(model.getRelated('type_component'), MachineComponentsTransformer)
    }
}


module.exports = MachineTypeTransformer
