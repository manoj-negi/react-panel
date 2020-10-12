import API from "./index"

 export const AddUser = async data => {
   const response = await API.post('/users', data)
                   .then((res) => {
                     return res
                   })
                   .catch((error) => {return error})
   return response
 }

 export const EditUser = async (data, id) => {
   const response = await API.put('/users/' + id, data)
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


  export const GetUserDetail = async (id) => {
    const response = await API.get('/users/' + id)
                    .then((res) => {
                      return res
                    })
                    .catch((error) => {return error})
    return response
  }

export const DeleteUser = async (id) => {
   const response = await API.delete('/users/' + id)
                   .then((res) => {
                     console.log(id)
                     return res
                   })
                   .catch((error) => {return error})
   return response
 }
