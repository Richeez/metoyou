//create api services class

import { axiosPrivate } from "../src/app/api/axios";
import EndPoints from "../src/app/api/http/endPoints";

class ApiServices {
  static async getUser() {
    try {
      const response = await axiosPrivate.get(EndPoints?.USER);

      return response?.data;
    } catch (error) {
      return error?.response?.data || error;
    }
  }
}

export default ApiServices;
