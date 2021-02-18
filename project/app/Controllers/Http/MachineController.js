'use strict'

const Machine = use('App/Models/Machine')
const MachinesComponents = use('App/Models/MachinesComponents')
const { v4: uuidv4 } = require('uuid');
const MachineTransformer = use('App/Transformers/MachineTransformer');
const MachineTypeTransformer = use('App/Transformers/MachineTypeTransformer');
const MachineRepository = make('App/Models/Repositories/MachineRepository')
const MachineTypeRepository = make('App/Models/Repositories/MachineTypeRepository')
const PartnerMachine = use('App/Models/PartnerMachine')
const PartnerMachinesDetail = use('App/Models/PartnerMachinesDetail')
const Database = use('Database')



class MachineController {
  async index ({ request, transform }) {

    const filters = await request.only(['uuid', 'machine_name', 'machine_type', 'keyword'])
    const results = await MachineRepository.getMachines(filters)
    return await transform.paginate(results, MachineTransformer)
  }

  
  async store ({ request, transform, response}) {
    const machine = request.only(Machine.fillables)
    const machine_type = request.input('machine_type')
    const initials = machine_type.split(" ").reduce((accu, word) => accu + word.charAt(0), "").toUpperCase()
    
    const machineData = await Machine.create({
      uuid: uuidv4(),
      machine_code: initials,
      ...machine
    })
    
    const resultData = await transform.item(machineData, MachineTransformer)
    const typeData = await MachineTypeRepository.findBy('uuid', machineData.machine_type_id)
    const components = await transform.include('type_component').item(typeData, MachineTypeTransformer)

    return response.json({
      results: resultData, components
    })
  }


  async show ({params, transform, response }) {

    const machine = await MachineRepository.findBy('uuid', params.uuid)
    const machineData =  await transform.item(machine, MachineTransformer)
    const typeData = await MachineTypeRepository.findBy('uuid', machine.machine_type_id)
    const components = await transform.include('type_component').item(typeData, MachineTypeTransformer)

    return response.json({
      results: machineData, components
    })
  }


  async update ({ request, transform, params, response}) {
    const machine = await MachineRepository.findBy('uuid', params.uuid)
    const machineData = request.only(Machine.fillables)

    machine.merge({
      ...machineData
    })
    machine.save()
    
    const resultData =  await transform.item(machine, MachineTransformer)
    const typeData = await MachineTypeRepository.findBy('uuid', machine.machine_type_id)
    const components = await transform.include('type_component').item(typeData, MachineTypeTransformer)

    return response.json({
      results: resultData, components
    })
  }

  async destroy({params, request, response}){
    const machine = await MachineRepository.findBy('uuid', params.uuid)
    await MachineRepository.is_deployed('partner_machine_id',params.uuid)
    await MachineRepository.is_assigned('machine_id',params.uuid)
    await machine.delete()
    await PartnerMachine.query().where('machine_id',params.uuid).delete()
    await PartnerMachinesDetail.query().where('partner_machine_id', machine.machine_type_id).delete()

    return response.json({
      message: "Deleted"
    })
  }

  async availablePartners({ params , response}){
    const partners = await Database.table('partners').select('uuid','name','contact','address','company_email','profile_photo_url')
    .whereNotIn('partners.uuid', Database.table('partner_machines').select('partner_id').where('machine_id', '=', params.uuid))
    return response.status(200).json({
      Partners: partners
    })
  }

}

module.exports = MachineController
