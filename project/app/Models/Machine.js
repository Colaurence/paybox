'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Machine extends Model {

    static get resourceKey() {
        return 'machine'
    }
    
    static boot () {
        super.boot()
    
        this.addTrait('@provider:Lucid/SoftDeletes')
    }

    static get fillables() {
        return [
            'machine_code',
            'machine_name',
            'machine_type',
            'machine_type_id'
        ]
    }

    partners () {
        return this.hasMany(
            'App/Models/PartnerMachine',
            'uuid',
            'machine_id'
        )
    }

    static scopeName(query, name) {
        if(name) {
            return query.where('machine_name', 'like' , '%' + name + '%')
        }
        return query
    }

    static scopeType(query, type) {
        if(type) {
            return query.where('machine_type', 'like' , '%' + type + '%')
        }
        return query
    }

    static scopeKeyword(query, keyword) {
        if(keyword) {
            return query.where('machine_name', 'like' , '%' + keyword + '%')
            .orWhere('machine_type', 'like' , '%' + keyword + '%')
        }
        return query
    }
}

module.exports = Machine
