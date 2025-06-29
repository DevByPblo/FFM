import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlayersList from './components/PlayersList'
 

 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <PlayersList/> 
    </>
  )
}

export default App
