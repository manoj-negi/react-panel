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
