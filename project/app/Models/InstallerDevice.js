'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InstallerDevice extends Model {

    static get fillables() {
        return [
            'device_id',
        ]
    }

    static boot () {
        super.boot()
    
        this.addTrait('@provider:Lucid/SoftDeletes')
    }


}

module.exports = InstallerDevice
