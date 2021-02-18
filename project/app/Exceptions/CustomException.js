'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  handle(error, { response }){
    console.log("Handler ",error);
    switch (error.code) {
      case "noUser"://user define
        return response.status(401).json({message: "No user Logged in!"})
      case "userPrivilege":
        return response.status(401).json({message: "User Privilege not met!"})
      case "userNotFound":
        return response.status(401).json({message: "User not found!"})
      default:
        return response.status(500).json({message: "Something went wrong"})
    }
  }
}

module.exports = CustomException
