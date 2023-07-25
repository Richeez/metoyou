// import axios from "../app/api/axios"
// export const useRefreshToken = () => {

//     const refresh = async () => {
//         try {
//             const response = await axios.get('/refresh', {
//                 withCredentials: true,
//             });
//             console.log("useRefresh:", response.data);

//             return response.data; // Return the refresh token
//         } catch (error) {
//             // Handle error during refresh token request
//             // For example, perform logout or display an error message
//             console.log('Error refreshing token:', error);
//             // Return null or handle the error accordingly based on your application's logic
//             return null;
//         }
//     };

//     return refresh;
// };
// export default useRefreshToken