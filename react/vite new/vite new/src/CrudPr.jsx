import React from 'react'
import { useState } from 'react'

const CrudPr = () => {

    let [Name, setName] = useState('')
    let [Age, setAge] = useState('')
    let [Salary, setSalary] = useState('')
    let [Alldata, setAlldata] = useState([])
    let [id, setId] = useState('')

    const saveData = (e) => {
        e.preventDefault()

        setAlldata([
            ...Alldata,
            {
                name: Name,
                age: Age,
                salary: Salary
            }
        ])
        setName('')
        setAge('')
        setSalary('')
    }

   

    return (
        <>
            <div>

                <form onSubmit={saveData}>
                    <label>Name</label>
                    <input type='text' name='name' onChange={(e) => { setName(e.target.value) }} /><br /><br />
                    <label>Age</label>
                    <input type='number' name='age' onChange={(e) => { setAge(e.target.value) }} /><br /><br />
                    <label>Salary</label>
                    <input type='number' name='salary' onChange={(e) => { setSalary(e.target.value) }} /><br /><br />

                    <input type='submit' value='save' /><br /><br />
                </form>

                <table border={2} width={280}>
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
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{i.name}</td>
                                    <td>{i.age}</td>
                                    <td>{i.salary}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            )

                        })

                        }


                    </tbody>
                </table>

            </div>
        </>
    )
}

export default CrudPr
