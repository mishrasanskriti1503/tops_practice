import React, { useState } from 'react'

const StateExample = () => {

let [count , setCount]=useState(0);
  return (
    <>
    <div>
      <h4>State Example</h4>
      <h4> Count is : {count}</h4>
      <button>Add</button>
      <button>Minus</button>
     
    </div>
    </>
  )
}

export default StateExample
