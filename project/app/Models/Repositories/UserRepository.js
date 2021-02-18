'use strict'

const User = use('App/Models/User')
const UserNotFoundException = use('App/Exceptions/UserNotFoundException')

class UserRepository {
    async getUsersByProfileType(profileType, filters) {
       return await User.query()
       .superAdministrator(profileType)
       .filters(filters)
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

module.exports = UserRepository