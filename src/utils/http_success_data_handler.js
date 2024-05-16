import { toaster } from "../helpers/reusables";

export default class HttpSuccessDataHandler {
  static getSuccessResponseData(response) {
    if (response != null) {
      let responseMessage = "";
      if (response && response["data"] && response["data"]["message"]) {
        responseMessage = response["data"]["message"];
      } else if (response && response["message"]) {
        responseMessage = response["message"];
      }
      if (responseMessage) {
        toaster(responseMessage);
      }

      return response["data"] || response;
    } else {
      return {
        statusCode: 503,
        message:
          "A possible network error or another unresolvable error occurred",
      };
    }
  }
}
