import React, { useState } from 'react'

const New = () => {

    const [Name,setName]=useState('')
    const [Age,setAge]=useState('')
    const [Salary,setSalary]=useState('')
    const [Id,setId]=useState('')
    const [Alldata,setAlldata]=useState([])

  const saveData = (e)=>{
    e.preventDefault();
    if(Id!=""){
      let res = Alldata.map((i,index)=>{
        if(index==Id){
          i.Name=Name,
          i.Age=Age
          i.Salary=Salary
          
        }
        return i;
      })
      setAlldata(res)
    }
    
    else{
      setAlldata([
      ...Alldata,
    {
      'Name':Name,
      'Age':Age,
      'Salary':Salary
    }
    ]) 
    }
    
    
    setId ("")
    setName ("")
    setAge ("")
    setSalary ("")
  }

  const delData =(id)=>{
   let res= Alldata.filter((i,index)=>{
        return index!=id
    })
    setAlldata(res)
  }

  const editData= (id)=>{
   let res= Alldata.find((i,index)=>{
      return index == id
       })
       setName(res.Name)
       setAge(res.Age)
       setSalary(res.Salary)
       setId(id)
  }
  return (
    <div>
      <form action="" method="post" onSubmit={saveData}>
            Name:
            <input type="text" name='Name'id='' value={Name} onChange={(e)=>setName(e.target.value)} /><br/><br/>
            Age:
            <input type="number" name='Age' id='' value={Age} onChange={(e)=>setAge(e.target.value)} /><br/><br/>
            Salary:
            <input type="number" name='Salary' id='' value={Salary} onChange={(e)=>setSalary(e.target.value)}/><br/><br/>
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
            {Alldata.map((i,index)=>{
              return(
                <tr>
                  <td>{index+1}</td>
                  <td>{i.Name}</td>
                  <td>{i.Age}</td>
                  <td>{i.Salary}</td>
                  <td>
                    <button onClick ={()=>editData(index)}>Edit </button>
                    <button onClick={()=>delData(index)}>Delete</button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default New
