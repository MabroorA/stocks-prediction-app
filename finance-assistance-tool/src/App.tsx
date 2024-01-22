
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [count,setCount] = useState(0)

  


  return (
    <>
      <div className='app'>
        <h1 className="title">Stocks App</h1>
      </div>
      <div>
        <h3 className='Menu'>Pages menu</h3>
        <button onClick={() => setCount(count+1)}>
          {count}
        </button>
      </div>
      <div>
        <h3 className='search-box'>Search box</h3>
      </div>
    </>
  )
}

export default App
