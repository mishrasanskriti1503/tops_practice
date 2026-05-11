import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserCrud from './Usnpmercrud'
import Shortcutcrud from './Shortcutcrud'

function App() {
//  let[num,SetNum]= UseState(0)
//  const addCounter= ()=>{
//   SetNum(Num+1)
//  }

  return (
    <>
    {/* <ClassExample/>
     <h2> React Vite Project</h2>
    <h3> Number is--{num}</h3>
    <button onclick = {addcounter}>Add</button>
    <button onclick = {()=>SetNum (num-1)}>Minus</button> */}
    <UserCrud />
    {/* <Shortcutcrud /> */}
  
    </>
   
)
}

export default App
