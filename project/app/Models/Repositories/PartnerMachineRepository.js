const Partner = use('App/Models/Partner')
const PartnerMachine = use('App/Models/PartnerMachine')
const PartnerMachinesDetail = use('App/Models/PartnerMachinesDetail')
const PartnerNotFoundException = use('App/Exceptions/PartnerNotFoundException')
const MachineNotFoundException = use('App/Exceptions/MachineNotFoundException')

class PartnerMachineRepository {

    async getMachines(params) {
        return await Partner.query().select('uuid', 'name', 'contact', 'address', 'company_email', 'profile_photo_url')
        .where('uuid', params)
        .with('machines')
        .fetch()
     }

    async findBy(key, uuid) {
        try {
            return await Partner.findByOrFail(key, uuid)
        } catch (error) {
            throw new PartnerNotFoundException('Partner not found.')
        }
     }

     async PartnerFindBy(key, uuid) {
        try {
            return await PartnerMachine.findByOrFail(key, uuid)
        } catch (error) {
            throw new PartnerNotFoundException('machine not found.')
        }
     }

     async DetailsFindBy(key, uuid) {
        try {
            return await PartnerMachinesDetail.findByOrFail(key, uuid)
        } catch (error) {
            throw new MachineNotFoundException('record not found.')
        }
     }
     
}

module.exports = PartnerMachineRepository