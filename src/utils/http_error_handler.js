/* eslint-disable no-prototype-builtins */
import { toaster } from "../constants/reusables";

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
        console.log("responseData: ", JSON.stringify(responseData));
        if (responseData && responseData.hasOwnProperty("message")) {
          errorMessage = responseData["message"];
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

//?CONSTRUCTION LOGIC

// static async getUserRoomMessages(userId, cb) {
//     try {
//       const response = await axios.get(
//         `${EndPoints.SOCIAL_INBOX_BASE}/${userId}/room_messages`,
//         {
//           withCredentials: true,
//         }
//       );

//       // Call the callback function with the success response data and no error
//       cb(HttpSuccessDataHandler.getSuccessResponseData(response), null);
//     } catch (error) {
//       // Call the callback function with null data and the error
//       cb(null, HttpErrorHandler.spitHttpErrorMsg(error));
//     }
//   }

//!============================================================================

//? USE CASE
// await Promise.all([
//     new Promise((resolve) => setTimeout(resolve, 2000)),
//     APIService.sendMessageFromSocialInbox(
//       chatRoomId,
//       requestData,
//       (response, error) => {
//         if (error) {
//           toast.error(error, { theme: "colored" });
//           return;
//         }
//         let message = response["message"];
//         toast.success(message, { theme: "colored" });
//       }
//     ),
//   ]);
