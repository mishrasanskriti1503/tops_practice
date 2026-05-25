import React from 'react'

const Shortcut = () => {
  const [data, satData]=useState({
    name:'',
    age:'',
    salary:''
  })

  const handleChange=(e)=>{
    let {name,value}=e.target
  }


  return (
     <div>
      <form action="" method="post" onSubmit={saveData}>
            Name:
            <input type="text" name='Name'id='' value={Name} onChange={handleChange} /><br/><br/>
            Age:
            <input type="number" name='Age' id='' value={Age} onChange={handleChange} /><br/><br/>
            Salary:
            <input type="number" name='Salary' id='' value={Salary} onChange={handleChange} /><br/><br/>
            <input type="submit" value="save"/><br/><br/>
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

export default Shortcut
