const User = use('App/Models/User')
const { v4: uuidv4 } = require('uuid')
const UserTransformer = use('App/Transformers/UserTransformer')
const ProfileInstaller = use('App/Models/ProfileInstaller')
const Database = use('Database')


class ProfileInstallerController {
  async index ({response }) {
    const userList = await Database.table('profile_installers')
      .select('profile_installers.uuid', 'first_name','middle_name', 'last_name', 'profile_photo_url', 'contact', 'users.email', 'profile_type' )
      .leftJoin('users', 'profile_installers.id', 'users.profile_id').where('profile_type', '=', 'profile_installers')

      if(userList.length == 0){
        return response.status(404).json({
          message: 'No installer found',
        })
      }
      
    return response.json({
      message: 'Here are the list of installers',
      data: userList
    })
  }

  async create ({ request, response, view }) {
  }
  
  async store({ request, response, transform, auth }) {
    const profileData = request.only(ProfileInstaller.fillables)
    const userData = request.only(User.fillables)
      const createProfile = await ProfileInstaller.create({
        uuid : uuidv4(),
        added_by: auth.user.id,
        ...profileData
      })
      const createUser = await createProfile.user().create({
        uuid : uuidv4(),
        ...userData
      })

      const user = await User.findOrFail(createUser.id);
      return response.created({
        message: 'Created.',
        data: await transform.item(user, UserTransformer)
      })
  }

  
  async show ({ params:{uuid}, request, response }) {
    const installer = await Database.from('profile_installers')
      .select('profile_installers.uuid', 'first_name','middle_name', 'last_name', 'profile_photo_url', 'contact', 'users.email', 'profile_type' )
      .leftJoin('users', 'profile_installers.id', 'users.profile_id').where('profile_installers.uuid', '=', uuid).andWhere('profile_type', '=', 'profile_installers')

    if(installer.length == 0){
      return response.status(404).json({
        message: 'No installer found',
      })
    }

    return response.status(200).json({
      message: 'Here is the installer',
      data: installer
    })
  }

  
  async update ({ params, request, response }) {
  }

  
  async destroy ({ params:{uuid}, request, response }) {
    const installer = await ProfileInstaller.findBy('uuid',uuid)
    if(installer){
      await installer.delete()

      return response.status(200).json({
        message: 'Successfully removed device',
        data: installer
      })
    }else{
      response.status(404).json({
        message: 'installer not found',
        data: uuid
      })
    }
  }
}

module.exports = ProfileInstallerController
