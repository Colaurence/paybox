const Partner = use('App/Models/Partner')
const PartnerNotFoundException = use('App/Exceptions/PartnerNotFoundException')


class PartnerRepository {

    async getPartners(filters) {
        return await Partner.query()
        .name(filters['name'])
        .contact(filters['contact'])
        .address(filters['address'])
        .company_email(filters['company_email'])
        .profile_photo_url(filters['profile_photo_url'])
        .keyword(filters['keyword'])
        .paginate()
     }

    async findBy(key, uuid) {
        try {
            return await Partner.findByOrFail(key, uuid)
        } catch (error) {
            throw new PartnerNotFoundException('Partner not found.')
        }
     }

     async PartnerFindBy(key, uuid) {
        await PartnerMachine.findByOrFail(key, uuid)
        throw new PartnerNotFoundException('partner is assigned to a machine')
     }
}

module.exports = PartnerRepository