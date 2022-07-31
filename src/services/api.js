import axios from "axios";
// import auth from "../auth";

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

class Api {
  execute(url,method, dataObject={}) {
    return new Promise(function (resolve, reject) {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
      })
      authAxios({
        method: method,
        url: url,
        data: dataObject,
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) =>{
        resolve(res);
      }).catch((err) =>{
        if (err.response.status === 401) {
          //navigate user to signin screen here
        }
        reject(err);
      })
    })
  }
}

export default new Api();
