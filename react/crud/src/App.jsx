
import './App.css'
// import Usercrud from './Usercrud'
import New from './New'
import Props from './Props'

function App() {

  const Name= "Kriti"
  let Age = 27
 
  return (
    <>

    {/* <Usercrud/> */}
    {/* <New/> */}
    <Props myname={Name} myage={Age}/>
    </>
  )
}

export default App
