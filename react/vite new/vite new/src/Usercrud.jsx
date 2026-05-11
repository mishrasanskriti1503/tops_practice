import React, { useState } from 'react'

const Usercrud = () => {

  let [Name, setName] = useState('')
  let [Age, setAge] = useState('')
  let [id, setId] = useState('')
  let [Salary, setSalary] = useState('')
  let [Alldata, setAlldata] = useState([])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const saveData = (e) => {
    e.preventDefault()

    if (id != "") {
     let res = Alldata.map((i, index) => {
        if (index == id) {
          i.name = Name
          i.age = Age
          i.salary = Salary
        }
        return i
      })
      setAlldata(res)
    }

    else {
      setAlldata([
        ...Alldata,
        {
          'name': Name,
          'age': Age,
          'salary': Salary
        }
      ])
    }
    setId("")
    setName("")
    setAge ("")
    setSalary("")
  }

  const delData = (id) => {

    let res = Alldata.filter((i, index) => {
      return index != id


    })
    setAlldata(res)
  }

  const editData = (id) => {
    let res = Alldata.find((i, index) => {
      return index == id
    })
    setName(res.name)
    setAge(res.age)
    setSalary(res.salary)
    setId(id)
  }

  return (
    <div>
      <h2>User Crud</h2>

      <form action='#' method='post' onSubmit={saveData} >
        <label htmlFor=''>Name</label>
        <input type='text' name='name' id='' onChange={handleName} value={Name} /><br /><br />

        <label htmlFor=''>Age</label>
        <input type='number' name='age' id='' onChange={(e) => setAge(e.target.value)} value={Age} /><br /><br />

        <label htmlFor=''>Salary</label>
        <input type='number' name='salary' id='' onChange={(e) => setSalary(e.target.value)} value={Salary} /><br /><br />


        <input type='submit' value='save' /><br /><br />
      </form>

      <table border={5} width={400}>
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
          {
            Alldata.map((i, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.name}</td>
                  <td>{i.age}</td>
                  <td>{i.salary}</td>

                  <td><button onClick={() => editData(index)}>Edit</button>
                  <button onClick={() => delData(index)}>Delete</button></td>

                </tr>
              )
            })
          }

        </tbody>
      </table>
    </div>
  )
}

export default Usercrud
