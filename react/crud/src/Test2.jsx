import { Button } from 'react-bootstrap'
import React from 'react'
import { useState } from 'react'

const Test2 = () => {

    const [data, setData] = useState({
        name: "name",
        age: "age",
        salary: "salary"
    })

    const [alldata, setAlldata] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const saveData = (e) => {
        e.preventDefault()
        setAlldata([...alldata,
            data
        ])
    }

    const delData = (id)=>{
        let res= alldata.filter((i,index)=>{
            return(index!=id)
        })
        setAlldata(res)
    }
    return (
        <div>
            <form method='post' onSubmit={saveData}>
                Name:
                <input type="text" name="name" id="name" onChange={handleChange} /><br /><br />
                Age:
                <input type="number" name="age" id="age" onChange={handleChange} /><br /><br />
                Salary:
                <input type="number" name="salary" id="salary" onChange={handleChange} /><br /><br />
                <input type="submit" value="save" />

            </form>

            <table border={2}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Salary</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {alldata.map((i,index)=>{
                      return(
 <tr>
                        <td>{index+1}</td>
                        <td>{i.name}</td>
                        <td>{i.age}</td>
                        <td>{i.salary}</td>
                        <td>
                            <Button onClick={()=>delData(index)}> Delete</Button>
                        </td>
                    </tr>
                      )  
                    })
                    }
                   
                </tbody>
            </table>
        </div>
    )
}

export default Test2
