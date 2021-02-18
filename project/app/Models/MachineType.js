'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MachineType extends Model {

    static boot () {
        super.boot()
    
        this.addTrait('@provider:Lucid/SoftDeletes')
    }

    static get fillables() {
        return [
            'machine_type',
        ]
    }

    static scopeMachineType(query, machine_type) {
        if(machine_type) {
            return query.where('machine_type', machine_type)
        }
        return query
    }

    type_component () {
        return this.belongsToMany(
            'App/Models/MachineComponent', 
            'type_id',
            'type_component_id'
            ).pivotTable('machines_components').withTimestamps()
    }
}

module.exports = MachineType
