// import useAuth from './useAuth'
// import axios from '../app/api/axios'

// const useLogOut = () => {

//   const { setAuth } = useAuth()

//   const logOut = async () => {
//     setAuth({})
//     try {
//       await axios.post('/logout', {
//         withCredentials: true
//       })

//     } catch (err) {
//       console.error(err)
//     }
//   }
//   return logOut
// }

// export default useLogOut