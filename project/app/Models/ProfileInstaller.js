'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProfileInstaller extends Model {
    static get resourceKey() {
        return 'profile_installer'
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
            'contact',
            'added_by'
        ]
    }

    user() {
        return this.morphOne('App/Models/User', 'id', 'profile_id', 'profile_type')
    }

    installer () {
        
        return this.belongsToMany(
            'App/Models/InstallerDevice', 
            'installer_id',
            'device_id'
            ).pivotTable('installer_devices').withTimestamps()
    }
}

module.exports = ProfileInstaller
