import React, { useState } from 'react'

const Shotcut = () => {
    const [data, setData] = useState({
        Name: "",
        Age: "",
        Salary: ""
    })

    const [alldata, setAlldata] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const saveData = (e) => {
        e.preventDefault()
        setAlldata ([
            ...alldata,
            data])
    }
    const delData = (index) => {

    }
    const editData = (index) => {

    }

    return (
        <div>
            <form action="" method="post" onSubmit={saveData}>
                Name:
                <input type="text" name='Name' id='' value={data.Name} onChange={handleChange} /><br /><br />
                Age:
                <input type="number" name='Age' id='' value={data.Age} onChange={handleChange} /><br /><br />
                Salary:
                <input type="number" name='Salary' id='' value={data.Salary} onChange={handleChange} /><br /><br />
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
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{i.Name}</td>
                                <td>{i.Age}</td>
                                <td>{i.Salary}</td>
                                <td>
                                    <button onClick={() => editData(index)}>Edit </button>
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

export default Shotcut
