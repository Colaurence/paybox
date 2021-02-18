'use strict'

const ProfileInstaller = use('App/Models/ProfileInstaller')
const CustomException = use('App/Exceptions/CustomException')

class InstallerDeviceController {

  async store ({ request, response, params:{id} }) {

    const installer = await ProfileInstaller.find(id)

    if(!installer){
      return response.status(404).json({
        message: 'No installer found',
        data: installerDevices
      })
    }
    const installerDevices = await installer.installer().sync(request.input('device_id'))
    
    return response.status(201).json({
      message: 'Created',
      data: installerDevices
    })
  }

  
  async dettachDevice ({ params:{id}, request, response }) {
    const installer = await ProfileInstaller.find(id)
    const installerDevices = await installer.installer().sync(request.input('device_id'))
    
    return response.status(200).json({
      message: 'Unassigned.',
      data: installerDevices
    })
  }

}

module.exports = InstallerDeviceController
