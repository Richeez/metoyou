/* eslint-disable no-prototype-builtins */
export default class HttpErrorHandler {
  static spitHttpErrorMsg(e) {
    if (e !== undefined && e !== null) {
      if (e.hasOwnProperty("response")) {
        let response = e.response;
        if (response !== undefined && response !== null) {
          if (response.hasOwnProperty("data")) {
            let responseData = response["data"];
            if (responseData && responseData.hasOwnProperty("message")) {
              return responseData["message"];
            }
          }
        }
      }
    }
    return navigator.onLine
      ? "Sorry, something went wrong. Please try again later"
      : "Oops! An error occurred!.\nEnsure your data connection is still right.";
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
