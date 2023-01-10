import {NavLink as ReactLink, useNavigate}  from "react-router-dom";
import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail , isLoggedIn} from "../auth";

function Example(args) {

  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin]=useState(false)
  const [user, setUser]=useState(undefined)

  useEffect(()=>{
     
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())

  },[login])

  const logout=()=>{
    doLogout(()=>{
      //logged out
      setLogin(false)
      navigate("/")
      
    })
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar 
         color='success'
         success
         expand="md"
         fixed=''
         className="px-4"
      {...args}>
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem  tag={ReactLink} to="/services">ContactUs</DropdownItem>
                <DropdownItem>Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {
              login &&(
                <>

                  <NavItem>
                     <NavLink tag={ReactLink} to="/user/profile-info" >
                        Profile Info
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink onClick={logout}>
                        Logout
                     </NavLink>
                   </NavItem>
                   <NavItem>
                     <NavLink tag={ReactLink} to="/user/dashboard" >
                       {user.email}
                     </NavLink>
                   </NavItem>
                
                </>
              )
            }
           {

             !login &&(

              <>
                <NavItem>
                   <NavLink tag={ReactLink} to="/login">
                     Login
                  </NavLink>
                </NavItem>
                <NavItem>
                   <NavLink tag={ReactLink} to="/signup">
                     Signup
                   </NavLink>
                </NavItem>
              
              </>
             )

           }
          </Nav>
          <NavbarText>Social-Handle</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;