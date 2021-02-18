'use strict'

const ActivityLog = use('App/Models/ActivityLog')
const UserNotFoundException = use('App/Exceptions/UserNotFoundException')

class ActivityLogRepository {
    async getLogs(filters) {
       return await ActivityLog.query()
       .activity(filters['activity'])
       .transaction(filters['transaction'])
       .keyword(filters['keyword'])
       .paginate()
    }

    async findBy(key, uuid) {
        try {
            return await User.findByOrFail(key, uuid)
        } catch (error) {
            throw new UserNotFoundException('User not found.')
        }
     }
}

module.exports = ActivityLogRepository