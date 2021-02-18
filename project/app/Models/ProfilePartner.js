'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProfilePartner extends Model {
    static get resourceKey() {
        return 'profile_partner'
    }

    static get traits() {
        return ['@provider:Morphable']
    }
    
    static get fillables() {
        return [
            'first_name',
            'middle_name',
            'last_name',
            'profile_photo_url',
            'contact'
        ]
    }

    user() {
        return this.morphOne('App/Models/User', 'id', 'profile_id', 'profile_type')
    }
}

module.exports = ProfilePartner
