import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Col, Row, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap'
import {loadAllPosts} from '../services/post-service'
import Post from './Post'

 function NewFeed() {

    const [postContent, setPostContent] = useState({
        content:[],
        totalElements:'',
        totalPages:'',
        startIndex:'',
        pageSize:''
    })

useEffect(()=>{
//load all the posts from Server
   changePage(0)

},[]) 

const changePage=(startIndex=0,pageSize=5)=>{
    loadAllPosts(startIndex,pageSize).then(data=>{
        setPostContent(data)
        console.log(data)
    }).catch(error=>{
        toast.error("Error in loading posts")
    })
}

return (

    <div className="container-fluid">
        <Row>

            <Col md={
                {
                    size:10,
                    offset:1
                }
            }>
                <h1>Blog Posts {postContent?.responseObject?.totalElements}</h1>
                     {
                        postContent.responseObject?.post?.map((post)=>(
                            <Post post={post} key={post.id}/>
                        ))
                     }
                     <Container className='mt-3'>
                     <Pagination size='lg'>
                        <PaginationItem disabled={postContent.startIndex=0}>
                           <PaginationLink previous>
                                   Previous  
                           </PaginationLink>
                        </PaginationItem>
                           {
                            // [...Array(postContent.responseObject?.post)]
                           [...Array(postContent.responseObject?.totalPages)].map((item,index)=>(
                                
                                <PaginationItem onClick={()=>changePage(index)} active={index} key={index} >
                                   <PaginationLink 
                                       {...index+1}
                                    >
                                        {index+1}
                                   </PaginationLink>
                                </PaginationItem>
                           ))
                           }
                           <PaginationItem onClick={()=>changePage(postContent.startIndex++)} disabled={(postContent.startIndex===postContent.pageSize-1)}> 
                                <PaginationLink Next>
                                   Next
                                </PaginationLink>
                           </PaginationItem>
                        </Pagination>
                     </Container>
            </Col>
        </Row>
    </div>
    
  )
}

export default NewFeed
