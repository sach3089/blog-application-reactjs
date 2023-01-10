import { privateAxios } from "./helper";

const loadAllCategories=()=>{
    return privateAxios.get('/category/getAllCategories').then(response=>{
        return response.data
    })
}

export default loadAllCategories