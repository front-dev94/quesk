import Controller from './controller';
import UserService from './../services/UserService';

import User from '../models/User';

const userService = new UserService(User);

class UserController extends Controller {
  constructor(service) {
    super(service);

    this.getSpecificUser = this.getSpecificUser.bind(this);
  }

  async getSpecificUser(req, res){
    let response = await this.service.getSpecificUser(req.id);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }
}

export default new UserController(userService);