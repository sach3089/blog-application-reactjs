import { useEffect, useRef, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input } from "reactstrap"
import loadAllCategories from "../services/category-service"
import JoditEditor from 'jodit-react'
import { getCurrentUserDetail } from "../auth"
import {createPost} from "../services/post-service"
import { toast } from "react-toastify"

const AddPost=()=>{

    const editor = useRef(null)
    const [content, setContent] = useState('')
    // const config={
    //     placeholder:"Start Typing..."
    // }
    //get current loggedIn user
    const [user, setUser]= useState(undefined)
    //setting post for backend
   const [post, setPost]=useState({
        title:'',
        content:'',
        categoryId:'',
        userId:-1
    })

    //field changed 
    const fieldChanged=(event)=>{
        //console.log(event)
        setPost({...post,[event.target.name]:event.target.value})
    }

    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }

    //create new post 
    const doCreatePost = (event) =>{
        event.preventDefault();
        // console.log(post)
        if(post.title.trim()===''){
            toast.warning("Post title is required !!")
            return;
        }
        if(post.content.trim()===''){
            toast.warning("Write Something then submit !!")
            return;
        }
        if(post.categoryId===''){
            toast.warning("Please Select Post Category too !!")
            return;
        }
        post['userId']=user.id
        //if alright then submit for server
        createPost(post).then(data=>{
            toast.success("post created")
            console.log(post)
            setPost({
                title:'',
                content:'',
                categoryId:''
            })
        }).catch((error)=>{
            toast.error("error")
            console.log(error)
        })
    }

    const [categories, setCategories]=useState([])

    useEffect(
        ()=>{
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data)=>{
                console.log(data)
                setCategories(data)
            }).catch(error=>{
                console.log(error)
            })
        },
        []
    )
    return (
        <div className="wrapper">

          <Card className="shadow mt-5" >

           <CardBody>
            {/* {JSON.stringify(post)} */}
               <h3>What is going in your mind?</h3>
               <Form onSubmit={doCreatePost}>
                 <div className="my-3">
                    <label for="title">Post Title</label>
                    <Input 
                       type="text" 
                       id="title"
                       placeholder="Enter here"
                       className="rounded-0"
                       onChange={fieldChanged}
                       name="title"
                       />
                 </div>
                 <div className="my-3">
                    <label for="title">Post Conent</label>
                    {/* <Input 
                       type="textarea" 
                       id="content"
                       placeholder="Enter here"
                       className="rounded-0"
                       style={{height:'200px'}}
                       /> */}
                       <JoditEditor
                          ref={editor}
                          value={post.content}
                          onChange={contentFieldChanged}
                          //config={config}
                          />
                 </div>
                 <div className="my-3">
                    <label for="title">Category</label>
                    <Input 
                       type="select"
                       id="category"
                       className="rounded-0"
                       name="categoryId"
                       onChange={fieldChanged}
                       defaultValue={0}
                    >
                         <option disabled value={0}>---Select Category---</option>
                    { 
                       
                        categories.responseObject?.categories?.map((category)=>(
                            <option key={category.id} value={category.id}>
                                {category.categoryName}
                            </option>
                        ))
                    }
                    </Input>
                 </div>
                 <Container className="text-center">
                    <Button type="submit" className="rounded" color="primary">CreatePost</Button>
                    <Button className="ms-3" color="danger">Reset Post</Button>
                 </Container>

               </Form>
               

           </CardBody>

          </Card>

        </div>
    )
}

export default AddPost