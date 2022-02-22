import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Editor} from './editor';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Editor />
    </div>
  )
}

export default App
