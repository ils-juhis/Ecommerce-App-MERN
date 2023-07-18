import React from 'react'
import logo from "../../../assets/images/apneck.png"
import "./navbar.scss"
import { NavLink , useLocation,} from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineInfoCircle, AiOutlineHome, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import {GrContact} from 'react-icons/gr'
import { BiUserCircle } from 'react-icons/bi'
import {RxCross2} from 'react-icons/rx';

function Navbar({toggleBtn, hamburgerRef, state, navRef}) {
  return (
    <>
      <div className='navbar-top bg-light'>
        <div className="container-fluid">
          <div className="d-flex justify-content-between py-4 px-0 px-md-4">
            <div className="logo mx-2">
              <span className='d-inline d-lg-none' ref={hamburgerRef} onClick={toggleBtn}><FaBars/></span>
              <img src={logo} className='logo mx-3 mx-lg-0' alt="" />
            </div>

            <div className="navbar d-flex" ref={navRef} style={{left: state ? "0px": "-250px"}}>
              <div className='text-end px-4 d-block d-lg-none'>
                <RxCross2 onClick={toggleBtn}/>
              </div>
              <div className="logo text-center my-4 d-block d-lg-none">
                <img src={logo} className='logo' alt="" />
              </div>

              <div className="p-3">
                <div className='d-flex d-lg-none search shadow-sm px-3'>
                  <input type="text" />
                  <NavLink className="nav-link px-1" to=""><AiOutlineSearch/></NavLink>
                </div>
              </div>

              <NavLink end to="" className={({ isActive }) => isActive ? "link-box active" : "link-box"} onClick={toggleBtn}>
                <div className="aside-link"> 
                  <span className="aside-icon"><AiOutlineHome/></span> 
                  <span>Home</span>
                </div>
              </NavLink>

              <NavLink end to="/products" className={({ isActive }) => isActive ? "link-box active" : "link-box"} onClick={toggleBtn}>
                <div className="aside-link"> 
                  <span className="aside-icon"><AiOutlineSearch/></span> 
                  <span>Products</span>
                </div>
              </NavLink>

              <NavLink end to="/contact" className={({ isActive }) => isActive ? "link-box active" : "link-box"} onClick={toggleBtn}>
                <div className="aside-link"> 
                  <span className="aside-icon"><GrContact/></span> 
                  <span>Contact</span>
                </div>
              </NavLink>

              <NavLink end to="/about" className={({ isActive }) => isActive ? "link-box active" : "link-box"} onClick={toggleBtn}>
                <div className="aside-link"> 
                  <span className="aside-icon"><AiOutlineInfoCircle/></span> 
                  <span>About</span>
                </div>
              </NavLink>
            </div>

            <div className="icons d-flex align-items-start">
              <div className='d-none d-lg-flex search px-2 mx-3 shadow-sm'>
                <input type="text" />
                <NavLink className="nav-link px-1" to=""><AiOutlineSearch/></NavLink>
              </div>
              <div>
                <NavLink className="nav-link px-1" to=""><BiUserCircle/></NavLink>
              </div>
              <div>
                <NavLink className="nav-link px-1" to=""><AiOutlineHeart/></NavLink>
              </div>
              <div>
                <NavLink className="nav-link px-1" to=""><AiOutlineShoppingCart/> </NavLink>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar