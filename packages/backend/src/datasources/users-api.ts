import { RESTDataSource } from "@apollo/datasource-rest";
import { User } from "../types";

class UsersAPI extends RESTDataSource {

  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  getAll() {
    return this.get<User>('/users');
  }

}

export default UsersAPI;
