import API from "./index"

export const AddMaster = async data => {
  const response = await API.post('/master', data)
                  .then((res) => {
                    return res
                  })
                  .catch((error) => {return error})
  return response
}

export const GetMasters = async data => {
  const response = await API.get('/master', data)
                  .then((res) => {
                    return res
                  })
                  .catch((error) => {return error})
  return response
}

export const DeleteMaster = async (id) => {
   const response = await API.delete('/master/' + id)
                   .then((res) => {
                     console.log(id)
                     return res
                   })
                   .catch((error) => {return error})
   return response
 }

 export const GetMasterDetails = async (id) => {
   const response = await API.get('/master/' + id)
                   .then((res) => {
                     return res
                   })
                   .catch((error) => {return error})
   return response
 }

 export const EditMaster = async (data, id) => {
   const response = await API.put('/master/' + id, data)
                   .then((res) => {
                     return res
                   })
                   .catch((error) => {return error})
   return response
 }
