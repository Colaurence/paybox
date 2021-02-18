'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProfileSuperAdministrator extends Model {
    static get resourceKey() {
        return 'profile_super_administrator'
    }

    static get traits() {
        return ['@provider:Morphable']
    }

    static get hidden() {
        return ['password']
    }

    static get fillables() {
        return [
            'first_name',
            'middle_name',
            'last_name',
            'contact',
            'profile_photo_url'
        ]
    }

    user() {
        return this.morphOne('App/Models/User', 'id', 'profile_id', 'profile_type')
    }

    static scopeFirstName(query, firstName) {
        if(firstName) {
            return query.where('first_name', firstName)
        }

        return query
    }

    static scopeMiddleName(query, middleName) {
        if(middleName) {
            return query.where('middle_name', middleName)
        }

        return query
    }

    static scopeLastName(query, lastName) {
        if(lastName) {
            return query.where('last_name', lastName)
        }

        return query
    }
}

module.exports = ProfileSuperAdministrator
