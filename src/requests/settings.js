import API from "./index"

export const GetSettings = async data => {
  const response = await API.get('/settings', data)
                  .then((res) => {
                    return res
                  })
                  .catch((error) => {return error})
  return response
}

export const UpdateSettings = async data => {
  const response = await API.put('/settings', data)
                  .then((res) => {
                    return res
                  })
                  .catch((error) => {return error})
  return response
}
