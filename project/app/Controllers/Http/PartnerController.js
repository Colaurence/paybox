'use strict'

const Partner = use('App/Models/Partner')
const { v4: uuidv4 } = require('uuid');
const PartnerTransformer = use('App/Transformers/PartnerTransformer');
const PartnerRepository = make('App/Models/Repositories/PartnerRepository')


class PartnerController {
  
  async index ({ request, transform}) {
    const filters = await request.only(['uuid', 'name', 'contact', 'address', 'company_email', 'profile_photo_url', 'keyword'])
    const results = await PartnerRepository.getPartners(filters)

    return await transform.paginate(results, PartnerTransformer)
  }

  
  async store ({ request, transform }) {
    const partner = request.only(Partner.fillables)

    const createProfile = await Partner.create({
      uuid : uuidv4(),
      ...partner
    })
    const result = await Partner.findOrFail(createProfile.id)

    return await transform.item(result, PartnerTransformer)
    
  }

  
  async show ({ params, transform }) {
    const partner = await PartnerRepository.findBy('uuid', params.uuid)
    return await transform.item(partner, PartnerTransformer)
  }

  
  async update ({ params, request, transform }) {
    const partner = await PartnerRepository.findBy('uuid', params.uuid)
    const partnerData = request.only(Partner.fillables)
    
    partner.merge({
      ...partnerData
    })
    
    await partner.save()

    return await transform.item(partner, PartnerTransformer)
  }

  
  async destroy ({ params, response }) {
    const partner = await PartnerRepository.findBy('uuid', params.uuid)
    await PartnerRepository.PartnerFindBy('partner_id', partner.uuid)
    await partner.delete()
    return response.json({
      message: 'Deleted'
    })
  }
}

module.exports = PartnerController
