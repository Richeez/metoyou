export default class HttpSuccessDataHandler {
  static getSuccessResponseData(response) {
    if (response != null) {
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
