import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
const Layout = () => {
  const [state, setState] = useState(false)
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [windowSize, windowSizeSet] = useState(null)

  const outsideClickHandler = (e)=>{
    console.log(e.target)
    if(navRef.current && state && !navRef.current.contains(e.target) && !hamburgerRef.current.contains(e.target)){
        setState(false)
    }
  }
  const toggleBtn =()=>{
    if(windowSize<992){
      if(state){
        setState(false)
      }else{
        setState(true)
      }
    }
  }

  useEffect(()=>{
      windowSizeSet(window.innerWidth)
      if(window.innerWidth <=992){
        document.addEventListener("click", outsideClickHandler);
        return () => {
            document.removeEventListener("click", outsideClickHandler);
          };
      }else{
        setState(true)
      }
  },[state])

  return <>
    <Navbar toggleBtn={toggleBtn} state={state} navRef={navRef} hamburgerRef={hamburgerRef}/>
      <Outlet />
    <Footer />
  </>;
}

export default Layout