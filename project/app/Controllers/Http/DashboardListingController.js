'use strict'
const PartnerMachinesDetail = use('App/Models/PartnerMachinesDetail')


class DashboardListingController {
    async machine_status_list ({response}) {
      const Deployed = await PartnerMachinesDetail.query().count('deployed as Deployed Machines').where('deployed', '=',1)
      const Online = await PartnerMachinesDetail.query().count('status as Active Machines').where('status', '=', 'active')
      const Offline = await PartnerMachinesDetail.query().count('status as Inactive Machines').where('status', '=', 'inactive')
      return response.json({
       Deployed, Online, Offline
      })
      
      
      }
    
      async status_list ({response}) {
        const Active = await PartnerMachinesDetail.query().select('created_at').orderBy('status').count('status as Active Machines').where('status', '=', 'active').groupBy('created_at')
        return Active
        // const Inactive = await PartnerMachinesDetail.query().count('status as Inactive Machines').where('status', '=', 'inactive')
        // return response.json({
        //  Active, Inactive
        // })
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

module.exports = DashboardListingController
