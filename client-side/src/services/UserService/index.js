import Http from './../../utils/http';

class UserService {
  static async getAllUsers(query) {
      return await Http.get("/dashboard/users/?" + query);
  }

  static async getTopNUsers(query){
    return await Http.get("/dashboard/users/top-performers/?" + query);
  }

  static async getUser(id) {
    return await Http.get("/dashboard/users/" + id);
  }

  static async updateUser(id, data){
    return await Http.put("/dashboard/users/" + id, data);
  }
}
  
export default UserService;
  