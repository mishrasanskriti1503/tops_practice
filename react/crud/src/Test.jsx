import React from 'react'
import { useState } from 'react'

const Test = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [salary, setSalary] = useState('')
  const [id, setId] = useState('')
  const [alldata, setAlldata] = useState([])

  const saveData = (e) => {
    e.preventDefault()

    if(id!=""){
      let res= alldata.map((i,index)=>{
        if(index==id){
          i.name=name
          i.age=age
          i.salary=salary
        }
        return(i)
      })
      setAlldata(res)
    }
    else{ 
      //insert
    setAlldata([
      ...alldata,
      {
        "name": name,
        "age": age,
        "salary": salary
      }
    ])
  }

  setId("")
  setName("")
  setAge("")
  setSalary("")
}
   

  const delData = (id) => {
    let res = alldata.filter((i, index) => {
      return (index != id)
    })
    setAlldata(res)
  }

  const editData = (id) => {
    let res = alldata.find((i, index) => {
      return (index == id)
    })
    setId(id)
    setName(res.name)
    setAge(res.age)
    setSalary(res.salary)
  }


  return (
    <div>
      <form action="" method="post" onSubmit={saveData}>
        Name:
        <input type="text" name='name' id='name' value={name} onChange={(e) => { setName(e.target.value) }} /><br /><br />
        Age:
        <input type="text" name='age' id='age' value={age} onChange={(e) => { setAge(e.target.value) }} /><br /><br />
        Salary:
        <input type="text" name='salary' id='salary' value={salary} onChange={(e) => { setSalary(e.target.value) }} /><br /><br />
        <input type="submit" value='Save' />
      </form>

      <table border={2}>
        <thead>
          <tr >
            <td>Id</td>
            <td>Name</td>
            <td>Age</td>
            <td>Salary</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {/* display */}
          {alldata.map((i, index) => {
            return (
              
              <tr>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>{i.age}</td>
                <td>{i.salary}</td>
                <td>
                  <button onClick={() => delData(index)}>Delete</button>
                  <button onClick={() => editData(index)}>Edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}

export default Test
