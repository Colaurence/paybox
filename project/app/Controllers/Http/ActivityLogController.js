'use strict'
const ActivityLog = use('App/Models/ActivityLog')
const ActivityLogTransformer = use('App/Transformers/ActivityLogTransformer')
const ActivityLogRepository = make('App/Models/Repositories/ActivityLogRepository')

class ActivityLogController {
  
  async index ({ request, transform, view }) {
    const filters = await request.only(['activity', 'transaction', 'created_at', 'keyword'])
    const logs = await ActivityLogRepository.getLogs(filters)
    return await transform.paginate(logs, ActivityLogTransformer)
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ActivityLogController
