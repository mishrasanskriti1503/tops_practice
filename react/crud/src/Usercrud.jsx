import React, { useState } from 'react'

const Usercrud = () => {
    const [Name,setName]=useState('')
    const [Age,setAge]=useState('')
    const [Salary,setSalary]=useState('')
    const [Alldata,setAlldata]=useState([])
    const handleName= (e)=>{
        setName (e.target.value)
    const saveData= (e)=>{
        e.preventDefault()
        
    }
    }
  return (
    <div>
      <h1>User Crud</h1>
      <form action="" method="post" onSubmit={savaData}>
      Name:
      <input type="text" name='name' onChange={handleName} /><br/><br/>
      Age:
      <input type="number" name='age' onChange={(e)=>setAge(e.target.value)} /><br/><br/>
      Salary:
      <input type="number" name='salary' onChange={(e)=> }/><br/><br/>
      <input type="button" value="save" /><br/><br/>
    </form>
    <table border={2}>
    <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
    </table>
    </div>
  )
}

export default Usercrud
