import React from 'react'
import './Mycss.css'
import { Container } from 'react-bootstrap'
import { FaFacebookF,  FaInstagram } from "react-icons/fa";


const Hero = () => {
  return (
    <>  
  
    <div>
      <Container className='topbar topbar-content'>
        <span>94023-67890</span>
        <span>abc@gmail.com</span>
        <span>
        <FaFacebookF />
        < FaInstagram />
        </span>
      </Container>
    </div>

    
   </>
  )
}

export default Hero
