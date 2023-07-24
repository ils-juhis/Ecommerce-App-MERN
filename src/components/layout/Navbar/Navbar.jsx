import React from 'react'
import logo from "../../../assets/images/logo.png"
import "./navbar.scss"
import { NavLink ,Link} from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import {RxCross2} from 'react-icons/rx';
import {PiShoppingCartThin, PiHeartStraightLight, PiUserCircleLight} from 'react-icons/pi'
import { sidebarData } from '../../../data/sidebarData';

function Navbar({toggleBtn, hamburgerRef, state, navRef}) {
  return (
    <>
      <div className='navbar-top'>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-2 px-0 px-md-4">
            <div className="logo mx-2 d-flex align-items-center">
              <span className='d-inline d-lg-none' ref={hamburgerRef} onClick={toggleBtn}><FaBars/></span>
              <img src={logo} className='ms-3 mx-lg-0' alt="" />
              &nbsp; BAZZAR.com
            </div>

            <div className="navbar d-flex " ref={navRef} style={{left: state ? "0px": "-250px"}}>
              <div className='text-end px-4 d-block d-lg-none'>
                <RxCross2 onClick={toggleBtn}/>
              </div>
              <div className="logo text-center my-4 d-flex justify-content-center align-items-center d-lg-none ">
                <img src={logo} className='ms-3 mx-lg-0' alt="" />
                &nbsp; BAZZAR.com
              </div>

              {
                sidebarData.map((item, index)=>{
                  return(
                    <NavLink end to={item.path} className={({ isActive }) => isActive ? "link-box active" : "link-box"} onClick={toggleBtn} key={index}>
                      <div className="aside-link"> 
                        <span className="aside-icon">{item.icon}</span> 
                        <span>{item.title}</span>
                      </div>
                    </NavLink>
                  )
                })
              }

              
            </div>

            <div className="right-icons d-flex ">
              <div className='d-flex align-items-center'>
                <Link className="nav-link px-1 fs-4" to=""><PiUserCircleLight/></Link>
                <Link className="nav-link px-1 fs-4" to=""><PiHeartStraightLight/></Link>
                <Link className="nav-link px-1 fs-4" to=""><PiShoppingCartThin/> </Link>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar