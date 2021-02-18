'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PartnerMachine extends Model {

    static get fillables() {
        return [
            'quantity',
            'total_quantity'
        ]
    }


    machine () {
        return this.belongsTo(
            'App/Models/Machine',
            'machine_id',
            'uuid'
        )
    }

    partner () {
        return this.belongsTo(
            'App/Models/Partner',
            'partner_id',
            'uuid'
        )
    }
}

module.exports = PartnerMachine
