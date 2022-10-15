import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DropDown from './DropDown'

function App() {
  const [count, setCount] = useState(0)
  const options = {
    role: ['Student', 'Professor'],
    class: ['APMA 1650', 'APMA 1651', 'APMA 1652'],
    university: ['Brown University', 'Harvard University', 'MIT'],
    action: ['Record', 'Watch'],
  }

  return (
    <div className="w-screen h-screen flex-col justify-center">
    <div className="App text-4xl">
    I am a &nbsp;
    <DropDown initialSelected="Student" options={options.role}></DropDown> 
     at &nbsp;<DropDown initialSelected="MIT" options={options.university}></DropDown>   
     in <DropDown initialSelected="APMA 1650" options={options.class}></DropDown>   
     looking to&nbsp;
     <DropDown initialSelected="Record" options={options.action}></DropDown>    
    <br></br>
    </div>
    </div>
  )
}

export default App
