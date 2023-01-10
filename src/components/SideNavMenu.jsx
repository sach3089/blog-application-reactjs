import React, { Children, useState } from 'react'
import {Container, Nav,NavItem, NavLink} from "reactstrap"
import {
    FaRegChartBar,
    FaTh,
    FaBars
} from "react-icons/fa"
import { SlFire } from "react-icons/sl";
import { ImStack ,ImEye} from "react-icons/im";

const SideNavMenu=({children})=> {

    const[isOpen,setIsOpen] = useState(false);
    const toggle =() =>setIsOpen(!isOpen);
    const menuItem=[
        {
            path:"/post-dashboard",
            name:"Dashboard",
            icon:<FaTh />
        },
        {
            path:"/post-most-viewed",
            name:"MostViewed",
            icon:<ImEye />
        },
        {
            path:"/post-trending",
            name:"Trending",
            icon:<SlFire />
        },
        {
            path:"/post-analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/posts-all",
            name:"AllPost",
            icon:<ImStack />
        }
    ]
  return (

    

    <div className='container' style={{marginLeft: '2px'}}>
        <div style={{width:isOpen ?"300px" : "50px" }} className='sidebar'>
           <div className='top_section'>
                <h1  style={{display:isOpen ?"block" : "none" }} className="logo">Logo</h1>
                <div style={{marginLeft:isOpen ?"50px" : "0px" }}className="bars">
                    <FaBars onClick={toggle} />
                </div>
           </div>
           {
            menuItem.map((item,index)=>(
                 <NavLink to={item.path} key={index} className="link-side" activeClassName="active">
                    <div className='icon'>{item.icon}</div>
                    <div  style={{display:isOpen ?"block" : "none" }} className='link_text'>{item.name}</div>
                 </NavLink>
            ))
           }
        </div>
        {children}
    </div>
    
  )
}

export default SideNavMenu
