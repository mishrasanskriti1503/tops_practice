import React from 'react'
import { useState } from 'react'

const Shortcut = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    salary: ""
  })
  const [alldata, setAlldata] = useState([])
  const [id, setId] = useState("")

  const handleChange = (e) => {
    let { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const saveData = (e) => {
    e.preventDefault();
    if (id !== "") {
      let res = alldata.map((i, index) => {
        if (index == id) {
          i = data

        }
        return (i)
      })
      setAlldata(res)
    }

    else {
      setAlldata([
        ...alldata,
        data
      ])
    }
    setData({
      name: "",
      age: "",
      salary: ""
    })
    setId("")


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
    setData(res)
    setId(id)
  }



  return (
    <div>
      <form action="" method="post" onSubmit={saveData}>
        Name:
        <input type="text" name='name' id='name' value={data.name} onChange={handleChange} /><br /><br />
        Age:
        <input type="number" name='age' id='age' value={data.age} onChange={handleChange} /><br /><br />
        Salary:
        <input type="number" name='salary' id='salary' value={data.salary} onChange={handleChange} /><br /><br />
        <input type="submit" value="save" /><br /><br />
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
          {alldata.map((i, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>{i.age}</td>
                <td>{i.salary}</td>
                <td>
                  <button onClick={() => editData(index)}>Edit</button>
                  <button onClick={() => delData(index)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Shortcut
