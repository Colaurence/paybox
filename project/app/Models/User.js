'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    static boot() {
        super.boot()
        this.addTrait('@provider:Lucid/SoftDeletes')
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }

    static get resourceKey() {
        return 'profile_super_administrators'
    }

    static get fillables() {
        return [
            'email',
            'password'
        ]
    }

    static get hidden() {
        return ['password']
    }

    static get traits() {
        return ['@provider:Morphable']
    }

    profile() {
        return this.morphTo([
            'App/Models/ProfileSuperAdministrator',
        ], 'id', 'id', 'profile_id', 'profile_type')
    }

    static scopeSuperAdministrator(query, profileType) {
        return query.where('profile_type', profileType)
      }

    static scopeFilters(query, filters) {
        return query
            .email(filters['email'])
            .whereHas('profile', (builder) => {
                builder.firstName(filters['first_name'])
                       .middleName(filters['middle_name'])
                       .lastName(filters['last_name'])

            })
    }

    static scopeEmail(query, email) {
        if(email) {
            return query.where('email', email)
        }

        return query
    }
}

module.exports = User
