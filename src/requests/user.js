import API from "./index"

 export const AddUser = async data => {
   const response = await API.post('/users', data)
                   .then((res) => {
                     return res
                   })
                   .catch((error) => {return error})
   return response
 }

 export const GetUsers = async data => {
   const response = await API.get('/users', data)
                   .then((res) => {
                     return res
                   })
                   .catch((error) => {return error})
   return response
 }
