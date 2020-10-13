import Service from './Service';

class UserService extends Service {
  constructor(model) {
    super(model);

    this.getSpecificUser = this.getSpecificUser.bind(this);
  }

  async getSpecificUser(userId){
    try {
        const item = await this.model.findById({_id: userId}).populate('username firstName lastName email')
        
          if (!item){
            return {
              error: true,
              statusCode: 404,
              errors: "User not found!"
            }
          }
  
          return {
            error: false,
            statusCode: 200,
            data: item
          }
      } catch (errors) {
        return {
          error: true,
          statusCode: 500,
          errors
        };
      }
  }
};

export default UserService;