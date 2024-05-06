import HttpErrorHandler from "../../../utils/http_error_handler";
import HttpSuccessDataHandler from "../../../utils/http_success_data_handler";
import { axiosPrivate } from "../axios";
import EndPoints from "./endPoints";
// import { axiosPrivate } from "../axios";

export default class APIService {
  static async logUserIn(login, requestBody, cb) {
    try {
      const response = await login({
        user: requestBody.username.trim(),
        pwd: requestBody.password.trim(),
      }).unwrap();
      const responseData =
        HttpSuccessDataHandler.getSuccessResponseData(response);
      cb(responseData, null);
    } catch (error) {
      const errorMessage = HttpErrorHandler.spitHttpErrorMsg(error);
      cb(null, errorMessage);
    }
  }
  static async signUp(requestBody, cb) {
    try {
      const response = await axiosPrivate.post(
        `${EndPoints.ROOT_DOMAIN}/register`,
        JSON.stringify({
          user: requestBody.fullName.trim(),
          email: requestBody.email.trim(),
          pwd: requestBody.password.trim(),
        })
      );
      const responseData =
        HttpSuccessDataHandler.getSuccessResponseData(response);
      cb(responseData, null);
    } catch (error) {
      const errorMessage = HttpErrorHandler.spitHttpErrorMsg(error);
      cb(null, errorMessage);
    }
  }
  static async fetchPosts(isProfile, userPosts, usersPosts, userId, cb) {
    console.log("Fetching posts", isProfile, userPosts, usersPosts, userId);
    cb(true, null, null);
    try {
      //? Call the query function to get data

      const { data: response } = isProfile
        ? await userPosts(userId).unwrap()
        : await usersPosts().unwrap();
      cb(true, null, null);
      const responseData =
        HttpSuccessDataHandler.getSuccessResponseData(response);
      cb(false, responseData, null);
    } catch (error) {
      const errorMessage = HttpErrorHandler.spitHttpErrorMsg(error);
      cb(false, null, errorMessage);
    }
  }
}
