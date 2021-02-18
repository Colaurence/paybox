const MachineType = use('App/Models/MachineType')
const Machine = use('App/Models/Machine')
const MachinesComponents = use('App/Models/MachinesComponents')
const MachineTypeNotFoundException = use('App/Exceptions/MachineTypeNotFoundException')


class MachineTypeRepository {

    async getTypes (filters) {
        return await MachineType.query()
        .machineType(filters['machine_type'])
        .paginate()
     }

    async findBy(key, uuid) {
        try {
            return await MachineType.findByOrFail(key, uuid)
        } catch (error) {
            throw new MachineTypeNotFoundException('Machine type not found.')
        }
    }

    async componentFindBy(key, uuid) {
        try {
            return await MachinesComponents.findByOrFail(key, uuid)
        } catch (error) {
            throw new MachineTypeNotFoundException('Machine type not found.')
        }
    }

    async machineFindBy(uuid) {
            const checker = await Machine.query().where('machine_type_id',uuid).fetch()
            console.log(checker.rows.length)
            if(checker.rows == 0){
                return checker
            }
            throw new MachineTypeNotFoundException('Machine type is currently used')
    }
}

module.exports = MachineTypeRepository