import React from 'react'

const Usercrud = () => {
  return (
    <div>
      <h2> User Information</h2>
      <form action={'#'}>
        <caption>User Information</caption>
        <label htmlFor=""> Name</label>  
        <input type="text" name="name" id="" /><br/><br/>               
        <label htmlFor=""> Name</label>  
        <input type="number" name="age" id="" /><br/><br/>               
        <label htmlFor=""> Name</label>  
        <input type="number" name="salary" id="" /><br/><br/>               
        <input type="submit" value={'save'} /><br/><br/>               
                      
      </form>

      <table border={'5px'}> 
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Usercrud
