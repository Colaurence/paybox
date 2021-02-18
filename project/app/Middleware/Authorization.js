'use strict'
const CustomException = use('App/Exceptions/CustomException')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authorization {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth }, next, props) {
    // call next to advance the request
    // console.log("condition:", !props.includes(auth.user.profile_type));
    // console.log(props);
    // console.log(auth.user.profile_type);
  if(!props.includes(auth.user.profile_type)){
    throw new CustomException("Unauthorized to do this", 401)
  }
    await next()
  }
}

module.exports = Authorization
