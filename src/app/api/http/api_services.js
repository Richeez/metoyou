// export default class APIService {
//   static async connectOrDisconnectUserFromSocialInbox(requestBody, cb) {
//     try {
//       const response = await axios.post(
//         `${EndPoints.SOCIAL_INBOX_BASE}/connect_or_disconnect_account`,
//         requestBody
//       );
//       const responseData =
//         HttpSuccessDataHandler.getSuccessResponseData(response);
//       cb(responseData, null);
//     } catch (error) {
//       const errorMessage = HttpErrorHandler.spitHttpErrorMsg(error);
//       cb(null, errorMessage);
//     }
//   }
// }
