'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Partner extends Model {

    static get table () { return 'partners' }

    static boot () {
        super.boot()
    
        this.addTrait('@provider:Lucid/SoftDeletes')
    }

    static get fillables() {
        return [
            'name',
            'contact',
            'address',
            'company_email',
            'profile_photo_url'
        ]
    }

    machines () {
        return this.hasMany(
            'App/Models/PartnerMachine',
            'uuid',
            'partner_id'
        )
    }

    static scopeName(query, name) {
        console.log(name)
        if(name) {
            return query.where('name', 'like' , '%' + name + '%')
        }
        return query
    }

    static scopeContact(query, contact) {
        if(contact) {
            return query.where('contact', contact)
        }
        return query
    }

    static scopeAddress(query, address) {
        if(address) {
            return query.where('address', address)
        }
        return query
    }

    static scopeCompany_email(query, company_email) {
        if(company_email) {
            return query.where('company_email', company_email)
        }
        return query
    }

    static scopeProfile_photo_url(query, profile_photo_url) {
        if(profile_photo_url) {
            return query.where('profile_photo_url', profile_photo_url)
        }
        return query
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

module.exports = Partner
