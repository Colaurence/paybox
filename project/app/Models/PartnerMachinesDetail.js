'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PartnerMachinesDetail extends Model {
    static get fillables() {
        return [
            'street',
            'latitude',
            'longitude',
            'region',
            'municipality',
            'province',
            'barangay',
        ]
    }

    static scopeKeyword(query, keyword) {
        if(keyword) {
            return query.where('name', 'like' , '%' + keyword + '%')
            .orWhere('contact', 'like' , '%' + keyword + '%')
            .orWhere('address', 'like' , '%' + keyword + '%')
            .orWhere('company_email', 'like' , '%' + keyword + '%')
            .orWhere('photo_profile_url', 'like' , '%' + keyword + '%')
        }
        return query
    }
}

module.exports = PartnerMachinesDetail
