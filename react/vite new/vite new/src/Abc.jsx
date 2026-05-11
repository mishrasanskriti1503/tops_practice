import React from 'react'
import { useState } from 'react'

const Abc = () => {

    let [Name, setName] = useState('')
    let [Age, setAge] = useState('')
    let [Salary, setSalary] = useState('')
    let [id, setId] = useState('')
    let [Alldata, setAlldata] = useState([])

    const saveData = (e) => {
        e.preventDefault()

        if (id !== '') {
            let res = Alldata.map((i, index) => {
                if (index === id) {
                    return {
                    name : Name,
                    age :Age,
                    salary : Salary,
                    }
                }
                return i
            }
            )
            setAlldata(res)
        }

        

       
    
else {
    setAlldata([
        ...Alldata,
        {
            name: Name,
            age: Age,
            salary: Salary,

        }
    ])
}
setName('')
setAge('')
setSalary('')

}


const delData = (id) => {
    let res = Alldata.filter((i, index) => {
        return (
            index != id
        )
    })

    setAlldata(res)
}

const editData = (id) => {
  let res =  Alldata.find((i, index) => {
        return index === id
    })

    setName(res.name)
    setAge(res.age)
    setSalary(res.salary)
    setId(id)


}


return (
    <div>
        <h2>User Crud</h2>

        <form onSubmit={saveData}>
            <label>Name</label>
            <input type='text' name='name' onChange={(e) => setName(e.target.value)} value={Name} /><br /><br />
            <label>Age</label>
            <input type='number' name='age' onChange={(e) => setAge(e.target.value)}  value={Age} /><br /><br />
            <label>Salary</label>
            <input type='number' name='salary' onChange={(e) => setSalary(e.target.value)}  value={Salary} /><br /><br />

            <input type='submit' value='Save' /><br /><br />

        </form>

        <table border={2} width={550}>
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
                {Alldata.map((i, index) => {
                    return (
                        <tr key={index}>
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
                }
                )}

            </tbody>

        </table>
    </div>
)
}

export default Abc
