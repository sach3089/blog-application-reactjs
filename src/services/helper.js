import axios from "axios";
import { getToken } from "../auth";
export const BASE_URL='http://localhost:8000/api/v1';

export const myAxios=axios.create({
    baseURL:BASE_URL
});

export const privateAxios=axios.create({
    baseURL:BASE_URL
})

privateAxios.interceptors.request.use(config=>{
    const token = getToken()
    console.log(token)
    if(token){
        console.log(config)
        config.headers={
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            "Authorization":"Bearer ".concat(token),
            "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT,OPTIONS"
        }
        console.log(config)
        console.log(config.headers)
        console.log(config.headers.Authorization)
        return config
    }
}, error=>Promise.reject(error))