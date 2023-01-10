import React from 'react'
import { Container } from 'reactstrap'
import Base from '../components/Base'
import SideNavMenu from '../components/SideNavMenu'

const  Dashboard=()=>{
  return (
    <Base>
       <Container className='mt-3'>
          <SideNavMenu />
       </Container>
    </Base>
  )
}

export default Dashboard
