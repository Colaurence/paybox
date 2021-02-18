'use strict'

const Machine = use('App/Models/Machine')
const PartnerMachine = use('App/Models/PartnerMachine')
const PartnerMachinesDetail = use('App/Models/PartnerMachinesDetail')
const Database = use('Database')


const MachineNotFoundException = use('App/Exceptions/MachineNotFoundException')
const MachineDeployedException = use('App/Exceptions/MachineDeployedException')


class MachineRepository {

    async getMachines(filters) {
        return await Machine.query()
        .name(filters['machine_name'])
        .type(filters['machine_type'])
        .keyword(filters['keyword'])
        .paginate()
     }

    async is_deployed(key, uuid) {
        const checker = await PartnerMachinesDetail.query().where('deployed', 1).andWhere(key, uuid).fetch()
        if(checker.rows.length == 0){
        return checker
        }
        throw new MachineDeployedException('Machine is deployed')
    }

    async is_assigned(key, uuid) {
        const checker = await PartnerMachine.query().where(key, uuid).fetch()
        if(checker.rows.length == 0){
        return checker
        }
        throw new MachineDeployedException('Machine is assigned')
    }

     async findBy(key, uuid) {
        try {
            return await Machine.findByOrFail(key, uuid)
        } catch (error) {
            throw new MachineNotFoundException('Machine not found.')
        }
     }
}

module.exports = MachineRepository