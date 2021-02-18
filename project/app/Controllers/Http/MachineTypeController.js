'use strict'
const MachineTypeRepository = make('App/Models/Repositories/MachineTypeRepository')
const MachineType = use('App/Models/MachineType')
const MachineTypeTransformer = use('App/Transformers/MachineTypeTransformer')
const { v4: uuidv4 } = require('uuid');

class MachineTypeController {
  
  async index ({ request, transform }) {
    const filters = await request.only(['uuid', 'machine_type', 'keyword'])
    const results = await MachineTypeRepository.getTypes(filters)
    return await transform.include('type_component').collection(results, MachineTypeTransformer)
  }

  async store ({ request, transform }) {
    const type = request.only(MachineType.fillables)
    const typeData = await MachineType.create({
      uuid : uuidv4(),
      ...type
    })

    await typeData.type_component().sync(request.input('component'))
    return await transform.include('type_component').item(typeData, MachineTypeTransformer)

  }

  async show ({ params, transform }) {
    const type = await MachineTypeRepository.findBy('uuid', params.uuid)
    return await transform.include('type_component').item(type, MachineTypeTransformer)
  }

  async update ({ params, request, transform }) {
    const type = await MachineTypeRepository.findBy('uuid', params.uuid)
    const typeData = request.only(MachineType.fillables)
    
    type.merge({
      ...typeData
    })
    
    await type.save()
    await type.type_component().sync(request.input('component'))
    return await transform.include('type_component').item(type, MachineTypeTransformer)
  }

  async destroy ({ params, response }) {
    await MachineTypeRepository.machineFindBy(params.uuid)
    const type = await MachineTypeRepository.findBy('uuid', params.uuid)
    const component = await MachineTypeRepository.componentFindBy('type_id', type.id)
    await type.delete()
    await component.delete()

    return response.json({
      message: "Deleted."
    })
  }
}

module.exports = MachineTypeController
