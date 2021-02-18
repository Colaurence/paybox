'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ActivityLog extends Model {
    static scopeActivity(query, activity) {
        if(activity) {
            return query.where('activity', activity)
        }

        return query
    }

    static scopeTransaction(query, transaction) {
        if(transaction) {
            return query.where('transaction', transaction)
        }
        return query
    }

    static scopeKeyword(query, keyword) {
        if(keyword) {
            return query.where('activity', 'like' , '%' + keyword + '%')
            .orWhere('transaction', 'like' , '%' + keyword + '%')
        }
        return query
    }
}

module.exports = ActivityLog
