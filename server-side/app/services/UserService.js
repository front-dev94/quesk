import Service from './Service';

class UserService extends Service {
  constructor(model) {
    super(model);

    this.getUser = this.getUser.bind(this);
    this.getTopNUsers = this.getTopNUsers.bind(this);
  }

  async getUser(req, res){
    try {
      const item = await this.model.find({_id: req.params.id}).select('-password')
        if (!item){
          return {
            error: true,
            statusCode: 404,
            errors: "User not found."
          }
        }

        return {
          error: false,
          statusCode: 200,
          data: item
        }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to get user."
      };
    }
  }

  async getTopNUsers(req, res){
    try {
      let query = req.query;
      let { page, size } = query;

      page = page ? Number(page) : 1;
      size = size ? Number(size) : 10;

      delete query.page,
      delete query.size;

      let items = await this.model.find().select('-password')
        .sort(query)
        .skip((page - 1) * size)
        .limit(size)

      let count = await this.model.countDocuments();

      return {
        error: false,
        statusCode: 200,
        data: {
          page,
          size,
          count,
          payload: items
        }
      };
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to get users"
      };
    }
  }
};

export default UserService;