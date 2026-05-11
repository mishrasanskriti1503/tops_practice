import './App.css'
import Theme1 from './Components/Context-API/Theme1'
import { ThemeProvider } from './Components/Context-API/ThemeContextTask1'
import AuthComponent from './Components/Context-API/AuthComponent'
import { AuthProvider } from './Components/Context-API/AuthContext'
import SMTask1 from './Components/State Management/SMTask1'
import SMTask2 from './Components/State Management/SMTask2'
import SMTask3 from './Components/State Management/SMTask3'
import Task1a from './Components/React jsonFirebase/Task1a'
import Routing from './Components/Routing/Routing'
import ApiCrud from './Components/React jsonFirebase/ApiCrud'
import Task2 from './Components/React jsonFirebase/Task2'
// import HooksTask1 from './Components/Hooks/HooksTask1'
// import HooksTask2 from './Components/Hooks/HooksTask2'
// import HooksTask3 from './Components/Hooks/HooksTask3'
// import HooksTask4 from './Components/Hooks/HooksTask4'

function App() {
  

  return (
    <>

      {/* ------ Hooks ------ */}
      {/* <HooksTask1/> */}
      {/* <HooksTask2/> */}
      {/* <HooksTask3/> */}
      {/* <HooksTask4/> */}

      {/* ------ Routing ------ */}
      {/* <Routing /> */}

      {/* ----- Auth (Context API) ----- */}
      {/* ----- Question 1 : Theme ----- */}
      {/* <ThemeProvider>
        <Theme1/>
      </ThemeProvider> */}

      {/* ----- Question 2 : Auth (Context API) ----- */}
      {/* <AuthProvider>
        <AuthComponent/>
      </AuthProvider> */}

      {/* State Management */}
      {/* <SMTask1 /> */}
      {/* <SMTask2 /> */}
      {/* <SMTask3/> */}

      {/* ----- JSON-server and Firebase Real Time Database ----- */}      
      {/* <Task1a /> */}
      {/* <ApiCrud /> */}
      <Task2 />

      
    </>
  )
}

export default App
