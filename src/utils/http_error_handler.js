/* eslint-disable no-prototype-builtins */
import { toaster } from "../helpers/reuseable";

// Define UnauthorizedError as a standalone class
class UnauthorizedError extends Error {
  constructor(message = "Unauthorized access") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export default class HttpErrorHandler {
  static spitHttpErrorMsg(e, errorCallback) {
    let errorMessage;
    //? Check if environment is development
    // const isDevelopment = import.meta.env.MODE === "development";
    const isDevelopment = typeof window !== "undefined";

    // Check network status only if not in development mode
    if (isDevelopment) {
      errorMessage = navigator.onLine
        ? "Sorry, something went wrong. Please try again later"
        : "Oops! An error occurred!.\nEnsure your data connection is still right.";
    }

    if (e !== undefined && e !== null) {
      if (e.hasOwnProperty("response")) {
        let response = e.response;
        console.log("err response: ", response);
        if (response !== undefined && response !== null) {
          if (response.hasOwnProperty("data")) {
            let responseData = response["data"];
            if (responseData && responseData.hasOwnProperty("message")) {
              errorMessage = responseData["message"];
            }
          }
        }
      }
      if (e.hasOwnProperty("data")) {
        let responseData = e["data"];
        if (responseData && responseData.hasOwnProperty("error")) {
          errorMessage = responseData["error"];
        }
      }
    }

    // Check if errorCallback is provided and error message is not empty
    if (errorCallback && errorMessage) {
      errorCallback(errorMessage);
    }

    // Display error message as toast if present
    if (errorMessage) {
      // toast.error(errorMessage, { theme: "colored" });
      toaster(errorMessage, true);
      return true;
    }

    // Throw UnauthorizedError if status code is 403
    if (e?.response?.status === 403) {
      throw new UnauthorizedError();
    }
  }
}
