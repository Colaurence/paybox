'use strict'

const { get } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Super Administrator management
Route.group(() => {
    Route.post('/', 'ProfileSuperAdministratorController.store').validator(['StoreProfileSuperAdministrator'])
    Route.put(':uuid', 'ProfileSuperAdministratorController.update').validator(['UpdateProfileSuperAdministrator'])
}).prefix('api/v1/super-administrator')


//User management
Route.group(() => {
    Route.get('/', 'UserController.index')
    Route.get(':uuid', 'UserController.show')
    Route.delete(':uuid', 'UserController.delete')
}).prefix('api/v1/user')

//Machine type
Route.group(() => {
    Route.get('/', 'MachineTypeController.index')
    Route.post('/', 'MachineTypeController.store').validator(['MachineType'])
    Route.put('/:uuid', 'MachineTypeController.update').validator(['UpdateMachineType'])
    Route.get(':uuid', 'MachineTypeController.show')
    Route.delete('/:uuid', 'MachineTypeController.destroy')


    Route.delete(':uuid', 'MachineTypeController.delete')
}).prefix('api/v1/machineType')

// Machine management
Route.group(() => {
    Route.get('/', 'MachineController.index')
    Route.post('/', 'MachineController.store').validator(['StoreMachine'])
    Route.get('/type', 'MachineController.machineTypes')
    Route.get('/:uuid/partners', 'PartnerMachineController.machinePartners')
    Route.post('/:uuid/partners', 'PartnerMachineController.store').validator(['PartnerMachine'])
    Route.get('/:uuid', 'MachineController.show')
    Route.get('/:uuid/availablePartners', 'MachineController.availablePartners')
    Route.delete('/:uuid', 'MachineController.destroy')
    Route.put('/:uuid', 'MachineController.update').validator(['UpdateMachine'])
}).prefix('api/v1/machine').middleware(['auth'])


//installer management
Route.group(() => {
    Route.post('/', 'ProfileInstallerController.store').validator(['StoreProfileInstaller'])
    Route.get('/', 'ProfileInstallerController.index')
    Route.get('/:uuid', 'ProfileInstallerController.show')
    Route.delete('/:uuid', 'ProfileInstallerController.destroy')
    Route.post('/:id/device', 'InstallerDeviceController.store').validator(['AssignDevice'])
    Route.post('/:id/device', 'ProfileInstallerController.dettachDevice').validator(['AssignDevice'])
}).prefix('api/v1/installer-management').middleware(['auth','authorization:profile_super_administrators,profile_administrators'])

Route.group(() => {
    Route.post('login', 'AuthenticateController.login').validator(['Authenticate'])
}).prefix('api/v1')

//partner
Route.group(() => {
    Route.get('/', 'PartnerController.index')
    Route.post('/', 'PartnerController.store').validator(['StorePartner'])
    Route.put('/:uuid/PartnerMachines', 'PartnerMachineController.update')
    Route.delete('/:uuid/PartnerMachines', 'PartnerMachineController.destroy')
    Route.get('/:uuid/machines', 'PartnerMachineController.partnerMachines')
    Route.get('/:uuid/availableMachines', 'PartnerMachineController.availablePartnerMachines')
    Route.get('/:uuid', 'PartnerController.show')
    Route.put('/:uuid', 'PartnerController.update').validator(['UpdatePartner'])
    Route.delete('/:uuid', 'PartnerController.destroy')
}).prefix('api/v1/partner')

//add location
Route.group(() => {
    Route.get('/locations', 'PartnerMachinesDetailController.map_location')
    Route.post('/:uuid/location', 'PartnerMachinesDetailController.store')
    Route.put('/:uuid/location', 'PartnerMachinesDetailController.update')
    Route.delete('/:uuid/location', 'PartnerMachinesDetailController.destroy')
    Route.get('/:uuid/location', 'PartnerMachinesDetailController.index')
    Route.get('/:uuid', 'PartnerMachinesDetailController.show')
}).prefix('api/v1/partner-machine')

Route.group(() => {
    Route.get('/', 'AddressController.regions')
    Route.get('/:regionCode/province', 'AddressController.regionProvinces')
    Route.get('/:regionCode/province/:provinceCode/municipality', 'AddressController.provinceMunicipalities')
    Route.get('/:regionCode/province/:provinceCode/municipality/:municipalityCode/baranggay', 'AddressController.municipalityBaranggays')
}).prefix('api/v1/region')

/**
 * OLD ROUTES, PLEASE REMOVE ONCE DONE ON REFACTORING
 */
//Authentication

//     Route
//         .post('login', 'UserController.login')
//     Route
//         .post('logout', 'UserController.logout')
//     Route
//         .post('verifyUser', 'UserController.verifyUser')
//     Route
//         .post('resetPassword/:token', 'UserController.resetPassword')
//     Route
//         .get('validateToken/:token', 'UserController.validateToken')

Route.group(() => {
    Route.get('/', 'ActivityLogController.index')
    Route.get('/machineStatusList', 'DashboardListingController.machine_status_list')
    Route.get('/statusList', 'DashboardListingController.status_list')

}).prefix('api/v1/dashboard')


Route.on('/').render('welcome')
