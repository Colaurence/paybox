const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { response, session }) {
    if (error.name === 'ValidationException') {
      return response.status(422).send({errors: await error.messages})
    }
    switch (error.code) {
      case "ab513"://user define
        return response.status(401).send("No user Logged in!")
      case "ab123":
        return response.status(401).send("User Privilege not met!")
      default:
        return response.status(error.status).send(error.message)
    }
    
  }
}

module.exports = ExceptionHandler