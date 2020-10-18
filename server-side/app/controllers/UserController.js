import Controller from './controller';
import User from './../models/User';
import UserService from './../services/UserService';

const userService = new UserService(User);

class UserController extends Controller {
  constructor(service) {
    super(service);

    this.getUser = this.getUser.bind(this);
    this.getTopNUsers = this.getTopNUsers.bind(this);
  }
  
  async getUser(req, res){
    let response = await this.service.getUser(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async getTopNUsers(req, res){
    let response = await this.service.getTopNUsers(req, res);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }
}

export default new UserController(userService);