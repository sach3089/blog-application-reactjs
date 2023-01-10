import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'

function Post({post={title:"This is default post title", content:"this is default content"}}) {

  return (
    <Card className='border-0 shadow-sm mt-3'>

        <CardBody>
            <h2>{post.title}</h2>
            <CardText>
                {post.content.substring(0,40)}...
            </CardText>
            <div>
                <Link className='btn btn-info' to={'/post/'+post.id}>Read More...</Link>
            </div>
        </CardBody>
    </Card>
  )
}

export default Post