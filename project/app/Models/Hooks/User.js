'use strict'

const Hash = use('Hash')

const UserHook = module.exports = {}

UserHook.hashPassword = async (userInstance) => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}
