import { privateAxios } from "./helper"
import { myAxios } from "./helper"

//create post function 
export const createPost=(postData)=>{
    console.log(postData)
        return privateAxios.post('/post/createNewPost',postData).then(response=>response.data)
}


//get all Posts 
export const loadAllPosts=(startIndex,pageSize)=>{
    console.log("helper--loadAllposts")
      return myAxios.get('/post/getAllPosts?'+"startIndex="+startIndex+"&pageSize="+pageSize).then(response=>response.data)
};

export const loadSinglePost=(id)=>{
    return myAxios.get("/post/getPostById/"+id).then((response)=>response.data);
}

export const createComment=(commentData)=>{
    return myAxios.post("/comment/createNewComment",commentData).then(response=>response.data)
}


