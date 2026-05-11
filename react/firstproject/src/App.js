import logo from './logo.svg';
import './App.css';

import Practicecomponent from './Practicecomponent';
import Secondcomponent from './Secondcomponent';
import StateExample from './StateExample';
import Firstcomponent from './Firstcomponent';

function App() {
 
 let a = 10
 const name = "kriti"
 var age = 25

 return (

 <div>
  {/* { <h3> First React Project</h3> }
  <h4> Name is : {name}</h4>
  <h4> Age is : {age}</h4>
  { <h4> A is : {a}</h4> }
   
   {<h4> addition is {20 + 30 } </h4> } */}
   <hr/>
  {/* {<Practicecomponent myname ={name} myage = {age} mya={a}/>} */}

   {/* < Secondcomponent/> */}
    {/* {<Practicecomponent />} */}
   
    {<Firstcomponent /> }

 </div>
)
}

export default App;
