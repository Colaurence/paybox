'use strict'
const PartnerMachine = use('App/Models/PartnerMachine')
const Partner = use('App/Models/Partner')
const Machine = use('App/Models/Machine')
const { v4: uuidv4 } = require('uuid')
const PartnerRepository = make('App/Models/Repositories/PartnerRepository')
const MachineRepository = make('App/Models/Repositories/MachineRepository')
const PartnerMachineRepository = make('App/Models/Repositories/PartnerMachineRepository')
const MachinePartnersTransformer = use('App/Transformers/MachinePartnersTransformer')
const PartnerMachinesTransformer = use('App/Transformers/PartnerMachinesTransformer')
const PartnerMachinesDetail = use('App/Models/PartnerMachinesDetail')
const Database = use('Database')


class PartnerMachineController {

  async partnerMachines ({ transform, params }) {
  const partner         = await PartnerRepository.findBy('uuid', params.uuid)
  const partnerMachines = await Partner.query().where('uuid', partner.uuid).first()
  const machines        = await partnerMachines.machines().fetch()

  return await transform.include('machine').collection(machines, PartnerMachinesTransformer)
  }

  async availablePartnerMachines ({ transform, params }) {
    const partner         = await PartnerRepository.findBy('uuid', params.uuid)
    const partnerMachines = await Partner.query().where('uuid', partner.uuid).first()
    const machines        = await partnerMachines.machines().where('quantity', '>', 0).fetch()
  
    return await transform.include('machine').collection(machines, PartnerMachinesTransformer)
    }

  async machinePartners ({ transform, params }) {
    const machine         = await MachineRepository.findBy('uuid', params.uuid)
    const machinePartners = await Machine.query().where('uuid', machine.uuid).first()
    const partners        = await machinePartners.partners().fetch()
    
    return await transform.include('partner').collection(partners, MachinePartnersTransformer)
    }

  
  async store ({ request, params, auth, transform}) {
    const machine_data = await MachineRepository.findBy('uuid', params.uuid)
    const payload = await request.only('assign_partner')
    let array = []
    payload['assign_partner'].forEach(function (value) {
      array.push({
        uuid: uuidv4(),
        quantity: value.quantity,
        total_quantity: value.quantity,
        machine_id: params.uuid,
        created_by: auth.user.uuid,
        updated_by: auth.user.uuid,
        partner_id: value.partner_id
      }) 
    })
    PartnerMachine.createMany(array)

    const machine         = await MachineRepository.findBy('uuid', machine_data.uuid)
    const machinePartners = await Machine.query().where('uuid', machine.uuid).first()
    const partners        = await machinePartners.partners().fetch()
    return await transform.include('partner').collection(partners, MachinePartnersTransformer)
  }

  
  async update ({ params, request, response, transform }) {
    const machine = await PartnerMachineRepository.PartnerFindBy('uuid', params.uuid)
    const quantityData =  request.input('quantity')

    const quantityRecord = await Database.table('partner_machines').select('quantity').where('uuid',params.uuid)
    const quantity = quantityRecord[0].quantity
    const checker = parseInt(quantity) + parseInt(quantityData)

    if(checker < 0){
      return response.status(403).json({
        message: "Machines are deployed"
      })
    }
    
    const partnerRecord = await Database.table('partner_machines').select('total_quantity').where('uuid',params.uuid)
    const total_quantity = partnerRecord[0].total_quantity


    await Database.table('partner_machines').where('uuid',params.uuid)
    .update({total_quantity: parseInt(total_quantity) + parseInt(quantityData), quantity: parseInt(total_quantity) + parseInt(quantityData)})

    const machinedata        = await MachineRepository.findBy('uuid', machine.machine_id)
    const machinePartners = await Machine.query().where('uuid', machinedata.uuid).first()
    const partners        = await machinePartners.partners().where('uuid', machine.uuid).fetch()
    return await transform.include('partner').collection(partners, MachinePartnersTransformer)
  }
  
  async destroy ({ params, response }) {
    const machine = await PartnerMachineRepository.PartnerFindBy('uuid', params.uuid)
    await MachineRepository.is_deployed('partner_machine_id',machine.uuid)
    await machine.delete()
    await PartnerMachinesDetail.query().where('partner_machine_id', machine.uuid).andWhere('deployed', 0).delete()
    return response.json({
      message: "deleted"
    })
  }
}

module.exports = PartnerMachineController


