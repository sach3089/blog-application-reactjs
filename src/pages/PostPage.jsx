import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardText, Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import { createComment, loadSinglePost } from "../services/post-service"
import { BASE_URL } from "../services/helper"
import { TiTag } from "react-icons/ti";
import {IconContext} from "react-icons";


const PostPage=()=>{

    const { id } = useParams()
    const [post, setPost]=useState(null)
    const [comment, setComment]=useState({
      content:'',
      postId:''

    })
    useEffect(()=>{
        //load post of postId
        loadSinglePost(id).then(data=>{
            console.log(data);
            setPost(data)
        }).catch(error=>{
            console.log(error)
            toast.error("Error in loading post")
        })
    },[])
    console.log(id)
    //hovering mouse over icons
      const [hover, setHover] = useState(false);
      const onHover = () => {
        setHover(true);
      };
    
      const onLeave = () => {
        setHover(false);
      };

      const submitComment=()=>{
        createComment(comment).then(data=>{
          console.log(data)
        }).catch(error=>{
          console.log(error)
        })
      }

    return(

        <Base>
        <Container className="mt-3">
            <Link to="/">Home</Link>
            <Row>
              <Col md={{
                size:12
              }}>
                <Card className="mt-3">
                    <CardBody>

                        <CardText>Posted By
                             {" "}
                             <b>{post?.responseObject?.user?.firstName.toUpperCase()}</b>{" "}
                             <b>{post?.responseObject?.user?.middleName.toUpperCase()}</b>{" "}
                             <b>{post?.responseObject?.user?.lastName.toUpperCase()}</b>
                             </CardText>
                             <CardText>
                              <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(0, 123, 255)"}}}>
                             <div
                                onMouseEnter={onHover}
                                onMouseLeave={onLeave}
                                role="button"
                                className=""
                              >
                              {hover ? 
                                  <h5 style={{color:"Highlight"}}>{post?.responseObject?.category?.categoryName}</h5> : <TiTag />}
                              </div>
                             </IconContext.Provider>
                               
                             </CardText>
                             <CardText>
                                <h3>{post?.responseObject?.title}</h3>
                             </CardText>
                             //image upload is pending--
                             <div className="image-container">
                                <img src={BASE_URL+'/post/uploadImage'} alt="" />
                             </div>
                             <CardText className="mt-5" dangerouslySetInnerHTML={{__html:post?.responseObject?.content}}>

                             </CardText>
                    </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="my-4">
                <Col md=
                   {{
                    size:9,
                    offset:1}}>
                    <Card className="mt-4 border-0" >
                            <CardBody>
                              <input type="textarea" placeholder="Enter comment here"
                              value={comment.content,
                                comment.postId:post?.responseObject?.id }
                              onChange={(event)=>setComment({content:event.target.value})}></input>
                            <Button onClick={submitComment} className="mt-2" color="primary">Submit</Button>
                              
                            </CardBody>
                         </Card>
                   <h3>Comments : ({post ? post?.responseObject?.comments?.length : 'no comments yet'})</h3>
                   {
                       post?.responseObject?.comments && post?.responseObject?.comments.map((c,index)=>(
                         <Card className="mt-2 border-0" key={index}>
                            <CardBody>
                              <CardText>
                                 {c.content}
                              </CardText>
                            </CardBody>
                         </Card>
                       ))
                   }
                </Col>
            </Row>
        </Container>
        </Base>
    )
}

export default PostPage