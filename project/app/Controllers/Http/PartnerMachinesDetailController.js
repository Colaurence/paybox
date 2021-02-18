'use strict'
const PartnerMachineRepository = make('App/Models/Repositories/PartnerMachineRepository')
const { v4: uuidv4 } = require('uuid')
const Database = use('Database')
const MachineTypeRepository = make('App/Models/Repositories/MachineTypeRepository')
const MachineTypeTransformer = use('App/Transformers/MachineTypeTransformer')
const PartnerMachinesDetail = use('App/Models/PartnerMachinesDetail')
const MachineRepository = make('App/Models/Repositories/MachineRepository')
const moment = require('moment')



class PartnerMachinesDetailController {
  
  async index ({ params, request, response, view }) {
    const address = await PartnerMachineRepository.PartnerFindBy('partner_id', params.uuid)
    const machine_location = await Database.table('partner_machines')
    .select('partner_machines_details.uuid as uuid','partner_machines.uuid as partner_machine_uuid','machine_code', 'machine_name','machine_type' , 'serial_code','street','latitude','longitude','region','municipality','province','barangay','deployed', 'status')
    .innerJoin('partner_machines_details','partner_machines.uuid', 'partner_machine_id')
    .innerJoin('machines','partner_machines.machine_id', 'machines.uuid')
    .where('partner_id',params.uuid)
    
    return response.json({
      data: machine_location
    })
  }

  async show({params, response, transform}){
    const details = await PartnerMachineRepository.DetailsFindBy('uuid', params.uuid)
    const address = await PartnerMachineRepository.PartnerFindBy('uuid', details.partner_machine_id)
    const machine = await MachineRepository.findBy('uuid', address.machine_id)
    const type = await MachineTypeRepository.findBy('uuid', machine.machine_type_id)
    const components = await transform.include('type_component').item(type, MachineTypeTransformer)
    const machine_location = await Database.table('partner_machines')
    .select('partner_machines_details.uuid as uuid','partner_machines.uuid as partner_machine_uuid','machine_code',
    'machine_name','machine_type' , 'serial_code','street','latitude','longitude',
    'region','municipality','province','barangay','deployed', 'status')
    .innerJoin('partner_machines_details','partner_machines.uuid', 'partner_machine_id')
    .innerJoin('machines','partner_machines.machine_id', 'machines.uuid')
    .where('partner_machines_details.uuid',params.uuid)

    return response.json({
      data: machine_location , components
    })
  }

  async store ({ request, response, transform, params, auth }) {

    const date = moment().format('YYYY-MM-DD-SSSSSS')
    const address = await PartnerMachineRepository.PartnerFindBy('uuid', params.uuid)
    const addressData = request.only(PartnerMachinesDetail.fillables)
    const code = await Database.table('machines').select('machine_code').where('uuid',address.machine_id)
    const machine_code = code[0].machine_code

    const data = await PartnerMachinesDetail.create({
      uuid: uuidv4(),
      partner_machine_id: params.uuid,
      serial_code: machine_code + "-" + date,
      created_by: auth.user.uuid,
      updated_by: auth.user.uuid,
      ...addressData
    })
    address.save()
    
    const quantityRecord = await Database.table('partner_machines').select('quantity').where('uuid',params.uuid)
    const quantity = quantityRecord[0].quantity
    await Database.table('partner_machines').where('uuid',params.uuid)
    .update({quantity: parseInt(quantity) - 1})

    const machine_details = await Database.table('machines').select('machine_code','machine_name','machine_type').where('uuid',address.machine_id)
    const result = await PartnerMachinesDetail.findBy('uuid',data.uuid)
    return response.status(200).json({
      data: machine_details, result
    })
  }

  async update ({ params, request, response, auth }) {

  const address = await PartnerMachineRepository.DetailsFindBy('uuid', params.uuid)
  const addressData = request.only(PartnerMachinesDetail.fillables)

  await address.merge({
    updated_by: auth.user.uuid,
    ...addressData
  })
  await address.save()
  const partner_machine = await PartnerMachineRepository.PartnerFindBy('uuid', address.partner_machine_id)
  const machine_details = await Database.table('machines').select('machine_code','machine_name','machine_type').where('uuid',partner_machine.machine_id)
  
  return response.status(201).json({
    data: machine_details,address
  })
  }

  async destroy ({ params, response }) {
    const address = await PartnerMachineRepository.DetailsFindBy('uuid', params.uuid)
    await address.delete()
    const quantityRecord = await Database.table('partner_machines').select('quantity').where('uuid',address.partner_machine_id)
    const quantity = quantityRecord[0].quantity
    await Database.table('partner_machines').where('uuid',address.partner_machine_id)
    .update({quantity: parseInt(quantity) + 1})

    return response.json({
      message: "Deleted"
    })
  }

  async map_location({params, response}){
    const machine_location = await Database.table('partner_machines')
    .select('partner_machines.uuid as partner_machine_uuid','machine_code', 'machine_name','machine_type' , 'serial_code','street','latitude','longitude','region','municipality','province','barangay','deployed', 'status')
    .innerJoin('partner_machines_details','partner_machines.uuid', 'partner_machine_id')
    .innerJoin('machines','partner_machines.machine_id', 'machines.uuid')

    return response.json({
      data: machine_location
    })
  }

  
}

module.exports = PartnerMachinesDetailController
